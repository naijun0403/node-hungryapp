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

import * as thoughCookie from 'tough-cookie'
import {getWritingDataByObject, WritingObject} from "../app/wrtie";
import {ProcessResponse, RequestClient} from "../request";
import {DefaultConfig} from "../config";
import {CookiesUtil} from "../cookies/cookies-util";

export class HungryAppClient {

    private client: RequestClient;

    constructor(
        private userCookie: thoughCookie.CookieJar
    ) {
        CookiesUtil.setAuthCookies(userCookie);
        this.client = new RequestClient('https', DefaultConfig.host, userCookie);
    }

    async write(data: WritingObject): ProcessResponse {
        const formData = getWritingDataByObject(data);

        const res = await this.client.request(
            'POST',
            '/bbs/bbs_upload.php',
            formData,
            {
                Accept: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
                Referer: 'https://www.hungryapp.co.kr/bbs/bbs_form.php?bcode=kart&page=1',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Safari/605.1.15',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'multipart/form-data',
            }
        );

        return { success: true, status: 0 };
    }

}