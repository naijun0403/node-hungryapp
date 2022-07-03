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

import * as FormData from 'form-data'

export function getWritingDataByObject(data: WritingObject): FormData {
    const formData = new FormData();

    formData.append('mode', 'bbs_insert');
    formData.append('bcode', data.target);
    formData.append('page', '1');
    formData.append('pid', '');
    formData.append('notice_chk', '');
    formData.append('tab_menu_name', data.menu);
    formData.append('tab_menu', '001');
    formData.append('subject', data.title);
    formData.append('contents', data.contents);

    return formData;
}

export interface WritingObject {
    target: string; // bcode
    menu: string; // tab_menu_name
    title: string; // subject
    contents: string;
}