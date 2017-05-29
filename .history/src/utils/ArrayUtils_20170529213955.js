/*
 * @Author: yewei 
 * @Date: 2017-05-21 19:17:08 
 * @Last Modified by: yewei
 * @Last Modified time: 2017-05-25 22:02:57
 * 
 * 记录用户在自定义标签中所作的修改
 */
export default class ArrayUtils {
    /**
     * 更新数组，若item已存在，则从数组中将它移除
     * 若不存在，则添加进数组
     * 
     * @static
     * @param {any} array 数组
     * @param {any} item 对比项(用户的操作内容)
     * @returns 
     * 
     * @memberof ArrayUtils
     */
    static updateArray(array, item) {
        for (let i = 0, len = array.length; i < len; i++) {
            let temp = array[i];
            /**
             * 数组中已经有相同的项了，说明此时已经回到了未更改状态，
             * 因为默认是没有更改(数组中没有该项)，如果有该项则表示已经更改过了
             * 点击一次 => 更改
             * 点击两次 => 回到未更改状态
             */
            if (temp === item) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(item);
    }

    /**
     * 克隆数组
     * 
     * @static
     * @param {any} from 源数组
     * @returns 返回克隆后的新数组
     * 
     * @memberof ArrayUtils
     */
    static clone(from) {
        if (!from) {
            return [];
        }
        let newArray = [];
        from.map(function (value, key) {
            newArray.push(value);
        });
        return newArray;
    }

    /**
     * 判断两个数组是否相等
     * 
     * @static
     * @param {any} arr1 
     * @param {any} arr2 
     * @returns 返回true | false
     * 
     * @memberof ArrayUtils
     */
    static isEqual(arr1, arr2) {
        if (!(arr1 && arr2)) {
            return false;
        }
        if (arr1.length != arr2.length) {
            return false;
        }
        for (let i = 0, len = arr2.length; i < len; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * 从指定数组中移除数组项
     * 
     * @static
     * @param {any} arr 
     * @param {any} item 
     * 
     * @memberof ArrayUtils
     */
    static remove(arr, item) {
        // 如果数组不存在，则不进行任何操作
        if (!arr) {
            return;
        }
        for (let i = 0, len = arr.length; i < len; i++) {
            if (item === arr[i]) {
                arr.splice(i, 1);
            }
        }
    }
}
