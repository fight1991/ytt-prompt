import { RequestBodyType, RequestFunctionParams } from 'yapi-to-typescript';
import { fetch } from '@maxtropy/components';

export interface RequestOptions {
  /**
   * 使用的服务器。
   *
   * - `prod`: 生产服务器
   * - `dev`: 测试服务器
   * - `mock`: 模拟服务器
   *
   * @default prod
   */
  server?: 'prod' | 'dev' | 'mock';
}

export default function request<TResponseData>(
  payload: RequestFunctionParams,
  options: RequestOptions = {
    server: 'dev',
  }
): Promise<TResponseData> {
  // 基本地址
  const baseUrl =
    options.server === 'mock' ? payload.mockUrl : options.server === 'dev' ? payload.devUrl : payload.prodUrl;

  // 请求地址
  const url = `${baseUrl}${payload.path}`;
  const fetchOptions: RequestInit = {
    method: payload.method,
    body: payload.requestBodyType === RequestBodyType.json ? JSON.stringify(payload.data) : null,
  };
  // 具体请求逻辑
  return fetch(url, fetchOptions);
}