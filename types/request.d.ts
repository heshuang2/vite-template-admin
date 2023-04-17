import { Method } from 'axios'

export type resultType = {
    accessToken?: string
}

export type requestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete'>

export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';

// 请求参数
export interface AxiosRequest {
    url: string,
    method: requestMethods,
    [key: string]: any
}

// 响应参数
export interface AxiosResponse {
    data: any;
    headers?: any;
    request?: any;
    status: number;
    message?: string;
    config: AxiosRequest;
}
