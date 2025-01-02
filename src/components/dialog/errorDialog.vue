<!--
 * @Date:  2024-05-25 14:05:59
 * @LastEditors: LDH 574427343@qq.com
 * @LastEditTime: 2023-03-29 16:05:54
 * @FilePath: /flow-designer/src/components/dialog/errorDialog.vue
-->
<template>
  <el-dialog title="提示" v-model="visibleDialog" :width="520">
    <div class="flow-confirm-body">
      <i class="flowicon flowicon-exclamation-circle" style="color: #f00;"></i>
      <span class="flow-confirm-title">当前无法发布</span>
      <div class="flow-confirm-content">
        <div>
          <p class="error-modal-desc">以下内容不完善，需进行修改</p>
          <div class="error-modal-list">
            <div class="error-modal-item" v-for="(item,index) in list" :key="index">
              <div class="error-modal-item-label">流程设计</div>
              <div class="error-modal-item-content">{{item.nodeName}} 未选择{{item.nodeType}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <el-button @click="visibleDialog = false">我知道了</el-button>
      <el-button type="primary" @click="visibleDialog = false">前往修改</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'
let props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  visible: {
    type: Boolean,
    default: false
  }
})
let emits = defineEmits(['update:visible'])

let visibleDialog = computed({
  get() {
    return props.visible
  },
  set(val) {
    emits('update:visible', val)
  }
})
</script>

<style lang="css" scoped>
.flow-confirm-body .flow-confirm-title {
  color: rgba(0, 0, 0, .85);
  font-weight: 700;
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.4;
  display: block;
  overflow: hidden
}

.flow-confirm-body .flow-confirm-content {
  margin-left: 38px;
  font-size: 14px;
  color: red;
  margin-top: 8px
}

.flow-confirm-body>.flowicon {
  font-size: 22px;
  margin-right: 16px;
  float: left;
  margin-left: 30px;
  margin-top: 2px;
}
</style>