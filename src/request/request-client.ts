/*
 * MIT License
 *
 * Copyright (c) 2022 naijun0403
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {AxiosInstance, AxiosRequestConfig, Method} from "axios"
import axios from 'axios'
import * as qs from 'node:querystring'
import {CookieJar} from "tough-cookie";
import {wrapper} from "axios-cookiejar-support";
import * as FormData from 'form-data'
import {ProcessResponse} from "./";

export class RequestClient {
    private readonly jar: CookieJar;
    private client: AxiosInstance

    constructor(
        public scheme: 'http' | 'https',
        public host: string,
        private setCookies?: CookieJar
    ) {
        if (setCookies) {
            this.jar = setCookies;
        } else {
            this.jar = new CookieJar();
        }
        this.client = wrapper(axios.create({ jar: this.jar }));
    }

    get url(): string {
        return `${this.scheme}://${this.host}`;
    }

    getApiURL(path: string): string {
        return `${this.url}${path}`;
    }

    get cookies(): CookieJar {
        return this.jar;
    }

    async request(
        method: Method,
        path: string,
        form?: Record<string, unknown> | FormData,
        headers?: Record<string, string>
    ): ProcessResponse<string> {
        try {
            const reqData = this.build(method, headers);
            reqData['url'] = this.getApiURL(path);

            if(form) {
                if (form instanceof FormData) {
                    reqData['data'] = form;
                } else {
                    if (method === 'GET' || method === 'get') {
                        reqData['params'] = form;
                    } else {
                        reqData['data'] = qs.stringify(form as NodeJS.Dict<string>);
                    }
                }
            }

            const res = await this.client.request(reqData);

            if(res.status !== 200) {
                return { success: false, status: res.status }
            }

            return { success: true, status: res.status, result: res.data };
        } catch (e) {
            return { success: false, status: -100 };
        }
    }

    async requestData<T = Record<string, unknown>>(
        method: Method,
        path: string,
        form?: Record<string, unknown>,
        headers?: Record<string, string>
    ): Promise<T> {
        const res = await this.request(method, path, form, headers);

        if (!res.success) {
            throw new Error(`Web Request Error with status: ${res.status}`);
        }

        return JSON.parse(res.result);
    }

    private build(method: Method, header?: Record<string, string>): AxiosRequestConfig {
        const headers: Record<string, string> = {};
        headers['Host'] = this.host;
        if(header) Object.assign(headers, header);
        return {
            headers,
            method,
            transformResponse: (data) => data,
            responseType: 'text',
            withCredentials: true
        }
    }

}