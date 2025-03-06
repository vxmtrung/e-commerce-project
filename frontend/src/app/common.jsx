'use client';
// import io from 'socket.io-client';
import { client } from '@/core/fetch/fetch_api';
import { message } from 'antd';
import *  as lodash from 'lodash-es';
import dateformat from 'dateformat';
import { localStorageLib } from './common/local_storage';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const hostname = typeof location !== 'undefined' ? location.hostname : null;
// const socket = io(backendUrl);
//TODO: Tiến
const T = {
    debug:
        hostname === 'localhost' || hostname === '127.0.0.1',
    //fetch API--------------------------------------------------------------------------------
    client,
    //Date--------------------------------------------------------------------------------
    dateToText: (date, format) => dateformat(date, format ? format : 'dd/mm/yyyy HH:MM:ss'),
    dateToNumber: (date, h = 0, m = 0, s = 0, ms = 0) => {
        if (isNaN(new Date(date).getTime())) return null;
        date.setHours(h, m, s, ms);
        return date.getTime();
    },
    //Alert--------------------------------------------------------------------------------
    message: {
        ...message,
        error: (e) => {
            if (typeof e === 'string') message.error(e);
            else message.error(e.message || 'Lỗi hệ thống!');
        }
    },
    //Lodash lib--------------------------------------------------------------------------------
    lodash,
    localStorage: localStorageLib,
    //String lib-------------------------------------------------------------------------------
    string: {
        toUpperCase: (str, type = 'all') => {
            if (!str) return '';
            if (type == 'all') return lodash.toUpper(str);
            if (type == 'sentence') return str.charAt(0).toUpperCase() + str.slice(1);
            if (type == 'word') return lodash.upperFirst(str);
            if (type == 'words') return lodash.words(str).map(word => lodash.upperFirst(word)).join(' ');
        }
    },
    //download---------------------------------------------------------------
    download: (path, name, query) => {
        const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`);
        if (query) {
            Object.keys(query).forEach((key) =>
                url.searchParams.append(key, typeof query[key] === 'object' ? JSON.stringify(query[key]) : query[key]?.toString())
            );
        }
        let link = document.createElement('a');
        link.target = '_blank';
        link.download = name;
        link.href = url.href;
        link.click();
    },
};

// T.socket = socket;

export { T };
