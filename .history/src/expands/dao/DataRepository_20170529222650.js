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
     * 数据库中没有则从获取远程数据
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
                    } else {
                        // 不存在本地数据，则获取网络数据
                        this.fetchNextRepository(url)
                            .then(result => {
                                resolve(result);
                            })
                            .catch(error => {
                                reject(error);
                            });
                    }
                })
                .catch(error => { //获取本地数据失败，从网络获取
                    this.fetchNextRepository(url)
                        .then(result => {
                            resolve(result);
                        })
                        .catch(error => {
                            reject(error);
                        });
                });
        });
    }
    /**
     * 获取本地数据
     * 
     * @param {any} url key值为接口的url
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
     * 判断数据是否过时
     * 
     * @param {any} time 数据的创建时间 时间戳
     * @returns 
     * 
     * @memberof DataRepository
     */
    checkDate(time) {
        let oldDate = new Date(); // 本地数据的创建时间
        let nowDate = new Date(); // 当前时间
        oldDate.setTime(time);
        // 如果不是在同一个月，则时间过时
        if (oldDate.getMonth() !== nowDate.getMonth()) {
            return false;
        }
        if (oldDate.getDay() !== nowDate.getDay()) {
            return false;
        }
        if (nowDate.getHours() - oldDate.getHours() > 4) {
            return false;
        }
        return true;
    }

    /**
     * 将从网络中获取的数据数组保存到本地数据ku
     * 
     * @param {any} url 
     * @param {any} items 
     * @param {any} callback 
     * @returns 
     * 
     * @memberof DataRepository
     */
    saveRepository(url, items, callback) {
        if (!url || !items) {
            return;
        }
        // 包装数据，加入时间戳，以便判断数据是否过期
        let wrapData = {
            items: items,
            update_date: new Date().getTime()
        };
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callback);

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
                    if (!result) {
                        reject(new Error('responseData is null'));
                        return;
                    }
                    resolve(result.items); // 取出数据中的数组
                    this.saveRepository(url, result.items); // 将数组保存到数据库中

                })
                .catch(error => {
                    reject(error);
                })
        });
    }
}