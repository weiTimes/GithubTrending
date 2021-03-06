/*
 * @Author: yewei 
 * @Date: 2017-05-18 23:10:34 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-18 23:13:17
 * 
 * 进行网络请求，返回相应的数据
 */
import {
    AsyncStorage
} from 'react-native';

export default class DataRepository {
    /**
     * 离线缓存
     * 先从数据库中读取
     * 
     * @returns 
     * 
     * @memberof DataRepository
     */
    fetchRepository() {
        return new Promise((resolve, reject) => {
            // 获取本地的数据
            this.fetchLocaleRepository(url)
                .then(result => {
                    if (result) {
                        resolve(result);
                    }
                })
        });
    }
    /**
     * 获取本地数据
     * 
     * @param {any} url 
     * @returns 
     * 
     * @memberof DataRepository
     */
    fetchLocaleRepository(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject(error);
                }
            });
        });
    }
    /**
     * 抓取网络数据
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