'use client';
export const localStorageLib = {
    has: (cookieName) => localStorage.getItem(cookieName),

    getCookiePage: (cookieName, key) => {
        const pageData = localStorageLib.storage(cookieName);
        return (pageData && pageData[key]) ? pageData[key] : '';
    },

    cookie: (cname, cvalue, exdays) => {
        if (cvalue === undefined) {
            const name = cname + '=';
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i].trimStart();
                if (c.indexOf(name) === 0) {
                    try {
                        return JSON.parse(c.substring(name.length, c.length));
                    } catch {
                        return {};
                    }
                }
            }
            return {};
        } else {
            let d = new Date();
            d.setTime(d.getTime() + ((exdays === undefined ? 60 : exdays) * 24 * 60 * 60 * 1000));
            document.cookie = cname + '=' + JSON.stringify(cvalue) + ';expires=' + d.toUTCString() + ';path=/';
        }
    },
    storage: (cname, cvalue) => {
        if (cvalue != null) {
            localStorage.setItem(cname, JSON.stringify(cvalue));
        } else {
            try {
                return JSON.parse(localStorage.getItem(cname)) || {};
            } catch {
                return {};
            }
        }
    },

    pageKeyName: {
        pageNumber: 'N',
        pageSize: 'S',
        pageCondition: 'C',
        filter: 'F',
        advancedSearch: 'A'
    },

    getCookiePageCondition: cookieName => {
        const pageData = localStorageLib.storage(cookieName);
        return pageData && pageData[localStorageLib.pageKeyName.pageCondition] ? pageData[localStorageLib.pageKeyName.pageCondition] : '';
    },
    initPage: (cookieName) => {
        let initData = localStorageLib.storage(cookieName);
        if (initData[localStorageLib.pageKeyName.pageNumber] == null) initData[localStorageLib.pageKeyName.pageNumber] = 1;
        if (initData[localStorageLib.pageKeyName.pageSize] == null) initData[localStorageLib.pageKeyName.pageSize] = 50;
        if (initData[localStorageLib.pageKeyName.pageCondition] == null) initData[localStorageLib.pageKeyName.pageCondition] = '';
        if (initData[localStorageLib.pageKeyName.filter] == null) initData[localStorageLib.pageKeyName.filter] = {};
        if (initData[localStorageLib.pageKeyName.advancedSearch] == null) initData[localStorageLib.pageKeyName.advancedSearch] = false;
        localStorageLib.storage(cookieName, initData);
    },

    updatePage: (cookieName, pageNumber, pageSize, pageCondition, filter, advancedSearch) => {
        const updateStatus = {}, oldStatus = localStorageLib.storage(cookieName);
        updateStatus[localStorageLib.pageKeyName.pageNumber] = pageNumber ? pageNumber : oldStatus[localStorageLib.pageKeyName.pageNumber];
        updateStatus[localStorageLib.pageKeyName.pageSize] = pageSize ? pageSize : oldStatus[localStorageLib.pageKeyName.pageSize];
        updateStatus[localStorageLib.pageKeyName.pageCondition] = pageCondition != null || pageCondition == '' ? pageCondition : oldStatus[localStorageLib.pageKeyName.pageCondition];
        updateStatus[localStorageLib.pageKeyName.filter] = filter ? filter : oldStatus[localStorageLib.pageKeyName.filter];
        updateStatus[localStorageLib.pageKeyName.advancedSearch] = advancedSearch != null ? advancedSearch : oldStatus[localStorageLib.pageKeyName.advancedSearch];
        localStorageLib.storage(cookieName, updateStatus);
        return {
            pageNumber: updateStatus[localStorageLib.pageKeyName.pageNumber],
            pageSize: updateStatus[localStorageLib.pageKeyName.pageSize],
            pageCondition: updateStatus[localStorageLib.pageKeyName.pageCondition],
            filter: updateStatus[localStorageLib.pageKeyName.filter],
            advancedSearch: updateStatus[localStorageLib.pageKeyName.advancedSearch]
        };
    },

    onResize: () => {
        const marginTop = 6 + $('header').height(),
            marginBottom = 6 + $('footer').height();
        $('.site-content').css('margin', marginTop + 'px 0 ' + marginBottom + 'px 0');
    }
};