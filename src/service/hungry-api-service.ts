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

import {InternalApiStatus, ProcessResponse, RequestClient} from "../request";
import {DefaultConfig} from "../config";
import {CookieJar} from "tough-cookie";
import {Buffer} from "buffer";

export class HungryApiService {

    private client: RequestClient;

    constructor() {
        this.client = new RequestClient('https', DefaultConfig.host);
    }

    async login(data: AuthData): ProcessResponse<CookieJar> {
        if (!data.hasOwnProperty('type')) {
            data.type = LoginType.COMMON;
        }

        if (data.type !== LoginType.COMMON) {
            return { success: false, status: InternalApiStatus.NOT_SUPPORT_LOGIN_TYPE }
        }

        const res = await this.client.request(
            'POST',
            '/join/loginProc.php',
            {
                returns: Buffer.from('/index.php').toString('base64'),
                qs: '',
                channel: 'hungryapp',
                user_id: data.email,
                user_pwd: data.password
            },
            {
                Referer: 'https://www.hungryapp.co.kr/join/login.php?returns=L2luZGV4LnBocA==&qs=',
                Origin: 'https://www.hungryapp.co.kr',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        )

        return { success: true, status: 0, result: this.client.cookies };
    }

}

export enum LoginType {
    COMMON,
    GOOGLE,
    FACEBOOK
}

export interface AuthData {
    email: string;
    password: string;
    type?: LoginType;
}