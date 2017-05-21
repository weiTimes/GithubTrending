/*
 * @Author: yewei 
 * @Date: 2017-05-18 23:10:34 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-21 21:01:48
 * 
 * popular, trending的数据层
 * 从asyncStorage中读取
 */
'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage
} from 'react-native';

import keys from '../../../res/data/keys.json'; // 默认文件中的自定义标签的数据 

/**
 * 设定一个flag用来表示这个dao层是trending模块在用，还是popular模块在用
 * flag_language => trending模块中的语言, flag_key => 自定义模块标签
 */
export const FLAG_LANGUAGE = { flag_language: 'flag_language', flag_key: 'flag_key' }; // 表示是popular模块在用还是trending模块再用
export default class LanguageDao {
    constructor(flag) {
        this.flag = flag;
    }
    /**
     * 将数据存储到数据库中
     * 
     * @param {any} data 
     * 
     * @memberof LanguageDao
     */
    save(data) {
        AsyncStorage.setItem(this.flag, JSON.stringify(data), (error) => {

        });
    }

    /**
     * 从默认文件中或者数据库中获取数据
     * 
     * @returns 
     * 
     * @memberof LanguageDao
     */
    fetch() {
        return new Promise((resolve, reject) => {
            /**
             * 从数据库中获取数据
             */
            AsyncStorage.getItem(this.flag, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    /**
                     * 首次进入app的时候，数据库中是没有数据的
                     * 如果没有数据，则从默认的数据文件中读取，即keys.json
                     * 并且将数据返回
                     */
                    if (result) {
                        // 解析的过程中可能会出错 try...catch来捕获异常
                        try {
                            resolve(JSON.parse(result)); // 解析拿到的数据并返回Promise
                        } catch (e) {
                            reject(e);
                        }
                    } else {
                        /**
                         * 首次进入的时候加载的时候文件中的数据
                         * 第二次进来读取的就是数据库中的数据(读取默认文件的时候就已经将数据存储到数据库中了)
                         * 加载默认的数据项
                         * 语言 || 标签
                         */
                        let data = this.flag === FLAG_LANGUAGE.flag_key ? keys : null; // keys 文件中存储的默认数据
                        this.save(data); // 将数据保存到数据库中
                        resolve(data); // 返回Promise
                    }
                }
            });
        });
    }
}