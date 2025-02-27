/*
 * @Date:  2024-05-25 14:13:11
 * @LastEditors: LDH 574427343@qq.com
 * @LastEditTime: 2023-05-24 15:00:32
 * @FilePath: /flow-designer/src/store/index.js
 */
import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    flowId: '',
    isTried: false,
    promoterDrawer: false,
    flowPermission1: {},
    approverDrawer: false,
    approverConfig1: {},
    copyerDrawer: false,
    copyerConfig1: {},
    conditionDrawer: false,
    conditionsConfig1: {
      conditionNodes: [],
    },
  }),
  actions: {
    setFlowId(payload) {
      this.flowId = payload
    },
    setIsTried(payload) {
      this.isTried = payload
    },
    setPromoter(payload) {
      this.promoterDrawer = payload
    },
    setFlowPermission(payload) {
      this.flowPermission1 = payload
    },
    setApprover(payload) {
      this.approverDrawer = payload
    },
    setApproverConfig(payload) {
      this.approverConfig1 = payload
    },
    setCopyer(payload) {
      this.copyerDrawer = payload
    },
    setCopyerConfig(payload) {
      this.copyerConfig1 = payload
    },
    setCondition(payload) {
      this.conditionDrawer = payload
    },
    setConditionsConfig(payload) {
      this.conditionsConfig1 = payload
    },
  }
})
