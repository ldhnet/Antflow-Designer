<template>
  <div class="my-nav-content">
    <section class="dingflow-design" ref="dingflowDesignRef">
      <div class="zoom">
        <div class="zoom-out" @click="zoomOut" title="缩小"></div>
        <span>{{ nowVal }}%</span>
        <div class="zoom-in" @click="zoomIn" title="放大"></div>
        <!--刷新图标代码-->
        <div class="zoom-reset" @click="zoomReset" title="还原缩放比例">&#10227</div>
      </div>
      <div class="box-scale" ref="boxScaleRef">
        <nodeWrap v-model:nodeConfig="nodeConfig"/>
        <div class="end-node">
          <div class="end-node-circle"></div>
          <div class="end-node-text">流程结束</div>
        </div>
      </div>
    </section>
  </div>
  <errorDialog v-model:visible="tipVisible" :list="tipList"/>
  <promoterDrawer/>
  <approverDrawer :directorMaxLevel="directorMaxLevel"/>
  <copyerDrawer/>
  <conditionDrawer/>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useStore} from '@/stores/index'
import {nodeTypeList} from '@/utils/const'
import errorDialog from "@/components/dialog/errorDialog.vue";
import promoterDrawer from "@/components/drawer/promoterDrawer.vue";
import approverDrawer from "@/components/drawer/approverDrawer.vue";
import copyerDrawer from "@/components/drawer/copyerDrawer.vue";
import conditionDrawer from "@/components/drawer/conditionDrawer.vue";
import {resetImage, wheelZoomFunc, zoomInit} from "@/utils/zoom.js";

let {setFlowId, setIsTried} = useStore()
const emit = defineEmits(['nextChange'])
let props = defineProps({
  processData: {
    type: Object,
    default: () => (null),
  }
});

const dingflowDesignRef = ref(null);
const boxScaleRef = ref(null);
let tipList = ref([]);
let tipVisible = ref(false);
let nowVal = ref(100);
let nodeConfig = ref({});
let directorMaxLevel = ref(3);
onMounted(async () => {
  if (props.processData) {
    nodeConfig.value = props.processData;
  }

  zoomInit(dingflowDesignRef, boxScaleRef, (val) => { 
    nowVal.value = val
  })
});
/**
 * 判断流程中是否有审批节点
 * @param treeNode
 */
const preTreeIsApproveNode = (treeNode) => {
  if (!treeNode) return false;
  if (treeNode.nodeType == 4) {
    return true;
  } else {
    return preTreeIsApproveNode(treeNode.childNode);
  }
}
/** 节点验证 */
const validateErr = ({childNode}) => {
  if (childNode) {
    let {nodeType, error, nodeName, conditionNodes} = childNode;
    if (nodeType == 1) {
      validateErr(childNode);
    } else if (nodeType == 2) {
      validateErr(childNode);
      for (var i = 0; i < conditionNodes.length; i++) {
        if (conditionNodes[i].error) {
          tipList.value.push({name: conditionNodes[i].nodeName, nodeType: "条件"});
        }
        validateErr(conditionNodes[i]);
      }
    } else if (nodeType == 3) {
      validateErr(childNode);
    } else if (nodeType == 4 || nodeType == 6) {
      if (error) {
        tipList.value.push({
          name: nodeName,
          nodeType: nodeTypeList[nodeType],
        });
      }
      validateErr(childNode);
    }
  } else {
    childNode = null;
  }
};

/** 页面放大 */
function zoomIn() {
  wheelZoomFunc({scaleFactor: parseInt(nowVal.value) / 100 + 0.1, isExternalCall: true})
}

/** 页面缩小 */
function zoomOut() {
  wheelZoomFunc({scaleFactor: parseInt(nowVal.value) / 100 - 0.1, isExternalCall: true})
}

function zoomReset() {
  resetImage()
}

const getJson = () => {
  setIsTried(true);
  let isApproveNode = preTreeIsApproveNode(nodeConfig.value);
  if (!nodeConfig.value || !nodeConfig.value.childNode || !isApproveNode) {
    emit('nextChange', {label: "流程设计", key: "processDesign"});
    return false;
  }
  tipList.value = [];
  validateErr(nodeConfig.value);
  if (tipList.value.length != 0) {
    emit('nextChange', {label: "流程设计", key: "processDesign"});
    tipVisible.value = true;
    return false;
  }
  let submitData = JSON.parse(JSON.stringify(nodeConfig.value));
  return submitData;
};

// 给父级页面提供得获取本页数据得方法
const getData = () => {
  return new Promise((resolve, reject) => {
    let resData = getJson();
    if (!resData) {
      reject({formData: null});
    }
    resolve({formData: resData})
  })
};
defineExpose({
  getData
})
</script>
<style lang="css" scoped>

</style>
