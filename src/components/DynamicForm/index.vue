<template>
  <div class="vform-content">
    <v-form-designer ref="formDesign"></v-form-designer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const formDesign = ref(null)
const getData = () => {
  let exportData = formDesign.value.getFormJson();
  //console.log('exportData=========',JSON.stringify(exportData)) 
  return new Promise((resolve, reject) => {
    resolve({ formData: exportData })
  })
}
defineExpose({
  getData
})
</script>
<style lang="css" scoped>
body {
  margin: 0 !important;
  /* 如果页面出现垂直滚动条，则加入此行CSS以消除之 */
}

.vform-content {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    padding:0 30px; 
    overflow-x: hidden;
    overflow-y: auto; 
}
</style>