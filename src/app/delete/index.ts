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

import * as FormData from 'form-data';
import { generateSecureNumber } from "../../util/secure-number";

export function getDeletingDataByObject(object: DeletingObject): FormData  {
    const formData = new FormData();

    const secureNumber = String(generateSecureNumber());

    formData.append('c_mode', 'delete');
    formData.append('mode', 'bbs_del');
    formData.append('pid', object.pid);
    formData.append('edittype', '');
    formData.append('repid', '');
    formData.append('page', '1');
    formData.append('point', '');
    formData.append('rpage', '1');
    formData.append('bcode', object.target);
    formData.append('btype', '');
    formData.append('bcode2', object.target);
    formData.append('short_llink', object.target);
    formData.append('pgcode', '');
    formData.append('chamidx', '');
    formData.append('indexss', '');
    formData.append('scode', '');
    formData.append('catecode', '');
    formData.append('searchtype', '');
    formData.append('searchstr', '');
    formData.append('tcnt', '');
    formData.append('tbcnt', '');
    formData.append('block', '1');
    formData.append('mn', '');
    formData.append('mx', '');
    formData.append('bcont', '');
    formData.append('itemcode', '');
    formData.append('areatype', '');
    formData.append('del_number', secureNumber);
    formData.append('del_number_user', secureNumber);
    formData.append('del_nomember_pw', '');
    formData.append('edit_nomember_pw', '');
    formData.append('reply_del_nomember_pw', '');
    formData.append('mapname', '');

    return formData;
}

export interface DeletingObject {
    pid: string;
    target: string;
}