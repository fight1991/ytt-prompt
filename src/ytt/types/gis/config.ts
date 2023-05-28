/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
// prettier-ignore
import { QueryStringArrayFormat, Method, RequestBodyType, ResponseBodyType, FileData, prepare } from 'yapi-to-typescript'
// @ts-ignore
// prettier-ignore
import type { RequestConfig, RequestFunctionRestArgs } from 'yapi-to-typescript'
// @ts-ignore
import request from '../../request'

type UserRequestRestArgs = RequestFunctionRestArgs<typeof request>

// Request: 目前 React Hooks 功能有用到
export type Request<
  TRequestData,
  TRequestConfig extends RequestConfig,
  TRequestResult,
> = (TRequestConfig['requestDataOptional'] extends true
  ? (requestData?: TRequestData, ...args: RequestFunctionRestArgs<typeof request>) => TRequestResult
  : (requestData: TRequestData, ...args: RequestFunctionRestArgs<typeof request>) => TRequestResult) & {
  requestConfig: TRequestConfig
}

const mockUrl_0_0_0_0 = 'http://10.50.16.213:40001/mock/283' as any
const devUrl_0_0_0_0 = '' as any
const prodUrl_0_0_0_0 = 'http://127.0.0.1' as any
const dataKey_0_0_0_0 = 'retdata' as any

/**
 * @分类 [GisController↗](http://10.50.16.213:40001/project/283/interface/api/cat_1997)
 * @请求头 `GET /api/gis/config`
 */
export interface GisConfigGetRequest {}

/**
 * @分类 [GisController↗](http://10.50.16.213:40001/project/283/interface/api/cat_1997)
 * @请求头 `GET /api/gis/config`
 */
export interface GisConfigGetResponse {
  key?: string
  securityJsCode?: string
  mapStyle?: string
}

/**
 * @分类 [GisController↗](http://10.50.16.213:40001/project/283/interface/api/cat_1997)
 * @请求头 `GET /api/gis/config`
 */
type ApiGisConfigGetRequestConfig = Readonly<
  RequestConfig<
    'http://10.50.16.213:40001/mock/283',
    '',
    'http://127.0.0.1',
    '/api/gis/config',
    'retdata',
    string,
    string,
    true
  >
>

/**
 * @分类 [GisController↗](http://10.50.16.213:40001/project/283/interface/api/cat_1997)
 * @请求头 `GET /api/gis/config`
 */
const apiGisConfigGetRequestConfig: ApiGisConfigGetRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_0_0_0,
  devUrl: devUrl_0_0_0_0,
  prodUrl: prodUrl_0_0_0_0,
  path: '/api/gis/config',
  method: Method.GET,
  requestHeaders: {},
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_0_0_0,
  paramNames: [],
  queryNames: [],
  requestDataOptional: true,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'apiGisConfigGet',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * @分类 [GisController↗](http://10.50.16.213:40001/project/283/interface/api/cat_1997)
 * @请求头 `GET /api/gis/config`
 */
export const apiGisConfigGet = /*#__PURE__*/ (requestData?: GisConfigGetRequest, ...args: UserRequestRestArgs) => {
  return request<GisConfigGetResponse>(prepare(apiGisConfigGetRequestConfig, requestData), ...args)
}

apiGisConfigGet.requestConfig = apiGisConfigGetRequestConfig

/* prettier-ignore-end */
