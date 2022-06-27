/*
    FILE : 
      steem.client.ts 
    TITLE : 
      스팀 클라이언트 
    CREATED : 
      2022.06.27
*/

/////////////////////////////////////////////////////////////////////
//
//  IMPORT
//

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import 'dotenv/config';
import { Rpc20Request, Rpc20Response, SteemContent } from './steem.types';

/////////////////////////////////////////////////////////////////////
//
//  CONST
//
const STEEM_API_URL = process.env.STEEM_API_URL || 'https://api.steemit.com';
const AXIOS_RETRY_COUNT = parseInt(process.env.AXIOS_RETRY_TIME || '3');
const AXIOS_SLEEP_TIME = parseInt(process.env.AXIOS_RETRY_TIME || (1000 * 3).toString());
const AXIOS_TIMEOUT = parseInt(process.env.AXIOS_TIMEOUT || (1000 * 3).toString());
/////////////////////////////////////////////////////////////////////
//
//  VARIABLE
//

/////////////////////////////////////////////////////////////////////
//
//  TYPE & INTERFACE & CLASS
//

/////////////////////////////////////////////////////////////////////
//
//  PRIVATE FUNCTIONs
//

/////////////////////////////////////////////////////////////////////
//
//  EXPORTS
//

export default class SteemitAxiosClient {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: STEEM_API_URL,
      timeout: AXIOS_TIMEOUT,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  private async rpc20(method: string, params?: any, id?: number, retryCount: number = 0): Promise<Rpc20Response> {
    let data: Rpc20Request = { jsonrpc: '2.0', method, id: 1, params };
    let res: AxiosResponse<any, any> = await this.instance.post('/', data);

    // 정상일 경우
    if (res.status == 200) {
      return res.data as Rpc20Response;
    }

    // 오류 시, 최대 N회 재시도
    await new Promise(res => setTimeout(res, AXIOS_SLEEP_TIME));
    if (retryCount < AXIOS_RETRY_COUNT) {
      return this.rpc20(method, params, id, retryCount + 1);
    }

    // N회 재시도 후 오류 발생
    return res.data as Rpc20Response;
  }

  public async getContent(author: string, permlink: string): Promise<SteemContent> {
    let response = await this.rpc20('condenser_api.get_content', [author, permlink]);

    return response.result as SteemContent;
  }
}
