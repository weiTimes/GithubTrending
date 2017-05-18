/*
 * @Author: yewei 
 * @Date: 2017-05-18 22:07:48 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-18 22:19:31
 * 
 * 封装简易的fetch
 * GET, POST
 */
export default class HttpUtils {
    /**
     * get请求
     * 
     * @static
     * @param {any} url 接口地址
     * @returns Promise 处理后的结果
     * 
     * @memberof HttpUtils
     */
    static get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json()) // 对相应进行处理
                .then((result) => { // 成功返回数据
                    resolve(result); // 成功处理
                })
                .catch(error => { // 发生错误
                    reject(error); // 错误处理
                });
        });
    }
    /**
     * post请求
     * 
     * @static
     * @param {any} url 接口地址
     * @param {any} data 传递给后台的数据
     * @returns 
     * 
     * @memberof HttpUtils
     */
    static post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }
}
