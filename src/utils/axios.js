/*
 * @Date:  2024-05-25 14:43:53
 * @LastEditors: LDH 574427343@qq.com
 * @LastEditTime: 2022-09-21 14:37:02
 * @FilePath: /flow-designer/src/plugins/axios.js
 */
"use strict";

import axios from "axios"; 
let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};
 
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
const _axios = axios.create(config); 
_axios.interceptors.request.use(
  function (config) { 
    config.headers = config.headers || {};   
    return config;
  },
  function (error) { 
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) { 
    return response.data;
  },
  function (error) { 
    return Promise.reject(error);
  }
);

export default _axios;
