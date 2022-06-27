export interface Rpc20Request {
  // https://www.jsonrpc.org/specification
  jsonrpc: string; // MUST be exactly "2.0"
  method: string; // 소수는(Fractional parts) 안됨
  id: number;
  params?: any;
}

export interface Rpc20Response {
  // https://www.jsonrpc.org/specification
  jsonrpc: string; // MUST be exactly "2.0"
  id: number; // 요청과 동일 값
  result?: any; // required for success response
  error?: any; // required for error response
}

export interface SteemitPost {
  category?: string;
  permlink: string;
  title: string;
  body: string;
  tags: string;
  appName?: string;
}

export interface SteemContent {
  id: number;
  author: string;
  permlink: string;
  category: string;
  parent_author: string;
  parent_permlink: string;
  title: string;
  body: string;
  json_metadata: string;
  last_update: string;
  created: string;
  active: string;
  last_payout: string;
  depth: number;
  children: number;
  net_rshares: number;
  abs_rshares: number;
  vote_rshares: number;
  children_abs_rshares: number;
  cashout_time: string;
  max_cashout_time: string;
  total_vote_weight: number;
  reward_weight: number;
  total_payout_value: string;
  curator_payout_value: string;
  author_rewards: number;
  net_votes: number;
  root_author: string;
  root_permlink: string;
  max_accepted_payout: string;
  percent_steem_dollars: number;
  allow_replies: boolean;
  allow_votes: boolean;
  allow_curation_rewards: boolean;
  beneficiaries: any[];
  url: string;
  root_title: string;
  pending_payout_value: string;
  total_pending_payout_value: string;
  active_votes: any[];
  replies: any[];
  author_reputation: string;
  promoted: string;
  body_length: number;
  reblogged_by: any[];
}

/**
 * 테스트용 : RPC20 응답 정보에서 개체 타입을 추론한다
 * any[] 된 부분은 추후 해당 타입이 확인되면 교체한다
 * @param res
 */
export function printTypeFromJson(res: Rpc20Response): void {
  let keys = Object.keys(res.result);
  for (let key of keys) {
    let type = typeof res.result[key];
    console.log(`${key}: ${type !== 'object' ? type : Array.isArray(res.result[key]) ? 'any[]' : 'object'};`);
  }
}
