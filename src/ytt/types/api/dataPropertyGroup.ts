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
 * @分类 [数据属性组相关接口↗](http://10.50.16.213:40001/project/283/interface/api/cat_1978)
 * @请求头 `PUT /api/data-property-group`
 */
export interface ApiDataPropertyGroupPutRequest {
  /**
   * 场景id
   */
  sceneId: number
  /**
   * 属性组名称
   */
  name: string
  /**
   * 数据属性列表
   */
  dataPropertyList: {
    /**
     * 属性id
     */
    id?: number
    /**
     * 属性名称
     */
    name?: string
  }[]
  /**
   * 属性组Id
   */
  id: number
}

/**
 * @分类 [数据属性组相关接口↗](http://10.50.16.213:40001/project/283/interface/api/cat_1978)
 * @请求头 `PUT /api/data-property-group`
 */
export type ApiDataPropertyGroupPutResponse = boolean

/**
 * @分类 [数据属性组相关接口↗](http://10.50.16.213:40001/project/283/interface/api/cat_1978)
 * @请求头 `PUT /api/data-property-group`
 */
type ApiDataPropertyGroupPutRequestConfig = Readonly<
  RequestConfig<
    'http://10.50.16.213:40001/mock/283',
    '',
    'http://127.0.0.1',
    '/api/data-property-group',
    'retdata',
    string,
    string,
    false
  >
>

/**
 * @分类 [数据属性组相关接口↗](http://10.50.16.213:40001/project/283/interface/api/cat_1978)
 * @请求头 `PUT /api/data-property-group`
 */
const apiDataPropertyGroupPutRequestConfig: ApiDataPropertyGroupPutRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_0_0_0,
  devUrl: devUrl_0_0_0_0,
  prodUrl: prodUrl_0_0_0_0,
  path: '/api/data-property-group',
  method: Method.PUT,
  requestHeaders: {},
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_0_0_0,
  paramNames: [],
  queryNames: [],
  requestDataOptional: false,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'apiDataPropertyGroupPut',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * @分类 [数据属性组相关接口↗](http://10.50.16.213:40001/project/283/interface/api/cat_1978)
 * @请求头 `PUT /api/data-property-group`
 */
export const apiDataPropertyGroupPut = /*#__PURE__*/ (
  requestData: ApiDataPropertyGroupPutRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ApiDataPropertyGroupPutResponse>(prepare(apiDataPropertyGroupPutRequestConfig, requestData), ...args)
}

apiDataPropertyGroupPut.requestConfig = apiDataPropertyGroupPutRequestConfig

/* prettier-ignore-end */
