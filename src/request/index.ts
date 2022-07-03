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

interface RootResponse {
    readonly success: boolean;
    readonly status: number;
}

interface ProcessFailed extends RootResponse {
    readonly success: false;
}

interface ProcessSuccessValid<T> extends RootResponse {
    readonly success: true;
    readonly result: T;
}

interface ProcessSuccessVoid extends RootResponse {
    readonly success: true;
}

export type ProcessResponse<T = void> =
    Promise<ProcessFailed | ( T extends void ? ProcessSuccessVoid : ProcessSuccessValid<T> )>;

export * from './request-client';
export * from './status';