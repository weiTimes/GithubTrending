/*
 * @Author: yewei 
 * @Date: 2017-05-18 23:10:34 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-18 23:13:17
 * 
 * 进行网络请求，返回相应的数据
 */

export default class DataRepository {
    /**
     * 抓取下一个仓库的数据
     * 
     * @param {any} url 接口地址
     * @returns 返回Promise
     * 
     * @memberof DataRepository
     */
    fetchNextRepository(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }
}