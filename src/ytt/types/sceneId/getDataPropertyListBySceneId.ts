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
 * @请求头 `GET /api/data-property-group/{sceneId}/getDataPropertyListBySceneId`
 */
export interface SceneIdGetDataPropertyListBySceneIdGetRequest {
  sceneId: string
}

/**
 * @分类 [数据属性组相关接口↗](http://10.50.16.213:40001/project/283/interface/api/cat_1978)
 * @请求头 `GET /api/data-property-group/{sceneId}/getDataPropertyListBySceneId`
 */
export type SceneIdGetDataPropertyListBySceneIdGetResponse = {
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
 * @分类 [数据属性组相关接口↗](http://10.50.16.213:40001/project/283/interface/api/cat_1978)
 * @请求头 `GET /api/data-property-group/{sceneId}/getDataPropertyListBySceneId`
 */
type ApiDataPropertyGroupSceneIdGetDataPropertyListBySceneIdGetRequestConfig = Readonly<
  RequestConfig<
    'http://10.50.16.213:40001/mock/283',
    '',
    'http://127.0.0.1',
    '/api/data-property-group/{sceneId}/getDataPropertyListBySceneId',
    'retdata',
    'sceneId',
    string,
    false
  >
>

/**
 * @分类 [数据属性组相关接口↗](http://10.50.16.213:40001/project/283/interface/api/cat_1978)
 * @请求头 `GET /api/data-property-group/{sceneId}/getDataPropertyListBySceneId`
 */
const apiDataPropertyGroupSceneIdGetDataPropertyListBySceneIdGetRequestConfig: ApiDataPropertyGroupSceneIdGetDataPropertyListBySceneIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_0,
    devUrl: devUrl_0_0_0_0,
    prodUrl: prodUrl_0_0_0_0,
    path: '/api/data-property-group/{sceneId}/getDataPropertyListBySceneId',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_0,
    paramNames: ['sceneId'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'apiDataPropertyGroupSceneIdGetDataPropertyListBySceneIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {},
  }

/**
 * @分类 [数据属性组相关接口↗](http://10.50.16.213:40001/project/283/interface/api/cat_1978)
 * @请求头 `GET /api/data-property-group/{sceneId}/getDataPropertyListBySceneId`
 */
export const apiDataPropertyGroupSceneIdGetDataPropertyListBySceneIdGet = /*#__PURE__*/ (
  requestData: SceneIdGetDataPropertyListBySceneIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SceneIdGetDataPropertyListBySceneIdGetResponse>(
    prepare(apiDataPropertyGroupSceneIdGetDataPropertyListBySceneIdGetRequestConfig, requestData),
    ...args,
  )
}

apiDataPropertyGroupSceneIdGetDataPropertyListBySceneIdGet.requestConfig =
  apiDataPropertyGroupSceneIdGetDataPropertyListBySceneIdGetRequestConfig

/* prettier-ignore-end */
