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
import { Client } from 'dsteem';
import 'dotenv/config';
import SteemitAxiosClient from './steem.client.axios';

/////////////////////////////////////////////////////////////////////
//
//  CONST
//
const STEEM_API_URL = process.env.STEEM_API_URL || 'https://api.steemit.com';

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

export default class SteemitClient extends SteemitAxiosClient {
  private readonly client: Client;

  constructor() {
    super();
    this.client = new Client(STEEM_API_URL);
  }

  // post(content: SteemitPost): Promise<any> {
  //   return this.client.broadcast.comment(
  //     content.parentAuthor,
  //     content.parentPermlink,
  //     content.author,
  //     content.permlink,
  //     content.title,
  //     content.body,
  //     content.jsonMetadata,
  //   );
  // }
}
