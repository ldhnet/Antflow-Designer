/*
 * @Date:  2024-05-25 11:58:11
 * @LastEditors: LDH 574427343@qq.com
 * @LastEditTime: 2024-06-30 15:19:57
 * @FilePath: /src/main.js
 */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router'; 
import ElementPlus from 'element-plus'; 
import 'element-plus/dist/index.css';
import "./assets/css/base.css";
import "./assets/css/workflow.css"; 
import './assets/css/override-element-ui.css'; 
import { parseTime,goBack } from "@/utils/hsharpUtils";

import VForm3 from '@/./lib/vform/designer.umd.js';
import './lib/vform/designer.style.css';

const app = createApp(App).use(createPinia()).use(router);
app.use(ElementPlus);
app.use(VForm3); 
// 全局方法挂载
app.config.globalProperties.parseTime = parseTime;
app.config.globalProperties.goBack = goBack; 
// 全局组件挂载
import addNode from '@/components/addNode.vue';
import nodeWrap from '@/components/nodeWrap.vue';
app.component('nodeWrap', nodeWrap); 
app.component('addNode', addNode);

app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});
app.mount('#app');

let debounce = (fn, delay) => {
  var delay = delay || 100;
  var timer;
  return function() {
    var th = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      timer = null;
      fn.apply(th, args);
    }, delay);
  };
}

app.directive('enterNumber', {
  mounted(el, { value = 100 }, vnode) {
    el = el.nodeName == "INPUT" ? el : el.children[0]
    var RegStr = value == 0 ? `^[\\+\\-]?\\d+\\d{0,0}` : `^[\\+\\-]?\\d+\\.?\\d{0,${value}}`;
    el.addEventListener('input', debounce(() => {
      el.value = el.value.match(new RegExp(RegStr, 'g'));
      el.dispatchEvent(new Event('input'))
    }));
  }
});