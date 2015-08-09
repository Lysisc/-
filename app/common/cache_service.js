'use strict';

qianXun.factory('cachePool', function () {

    var fetchItem = function (key) {
        if (!key) {
            return null;
        }

        var itemStr = localStorage.getItem('qianxun_' + key),
            item;

        try {
            item = JSON.parse(itemStr);
        } catch (e) {}

        if (!item) {
            return null;
        }

        return item;
    };

    var ONE_DAY = 24 * 3600 * 1000;

    /**
     * 设置本地存储的值
     * @param key 本地存储name
     * @param data 本地存储对象
     * @param expires 过期时间(可选)
     */
    var pushData = function (key, data, expires) {
        if (!key || !data) {
            return;
        }

        var item = fetchItem(key) || {};

        item.value = data || undefined; //暂时先取value键值，不做自定义处理

        item.expired = expires ? (Date.now() + ONE_DAY * expires) : undefined;

        localStorage.setItem('qianxun_' + key, JSON.stringify(item));
    };

    /**
     * 获取本地存储的值
     * @param key 本地存储name
     * expired如果存在，则判断是否过期，不存在就是永久值
     */
    var pullData = function (key) {
        var item = fetchItem(key),
            data;

        if (!item || item.expired && item.expired <= Date.now()) {
            return null;
        } else {
            data = item['value'];
        }

        return data;
    };

    var removeData = function (key, dataKey) {
        if (!key) {
            return;
        }

        var item = fetchItem(key);

        if (!item) {
            localStorage.removeItem('qianxun_' + key);
            return;
        }

        if (dataKey && item[dataKey]) {
            item[dataKey] = undefined;
            localStorage.setItem('qianxun_' + key, JSON.stringify(item));
        } else {
            localStorage.removeItem('qianxun_' + key);
        }

    };

    return {
        push: pushData,
        pull: pullData,
        remove: removeData,
    };
});