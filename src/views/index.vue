<template>
    <div class="my-nav">
        <div class="my-nav-left">
            <div class="my-nav-back">
                <i class="anticon anticon-left"></i>
            </div>
            <div class="my-nav-title">{{ title }}</div>
        </div>
        <div class="my-nav-center">
            <div class="step-tab">
                <div v-for="(item, index) in steps" :key="index" class="step"
                    :class="[activeStep == item.key ? 'active' : '']" @click="changeSteps(item)">
                    <span class="step-index">{{ index + 1 }}</span>
                    {{ item.label }}
                </div>
                <div class="ghost-step step" :style="{ transform: translateX }"></div>
            </div>
        </div>
        <div class="my-nav-right">
            <a style="background-color: #fff;border-radius:20px;margin-right: 50px;" href="https://gitee.com/ldhnet/AntFlow-Designer" target="_blank"> 
                <svg t="1671270284061" class="icon" style="margin-bottom:-6px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1920" width="30" height="30"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="1921"></path></svg>
            </a>
            <button type="button" class="ant-btn button-publish" @click="publish">
                <span>发 布</span>
            </button>
        </div>
    </div>
    <div v-if="processConfig" v-show="activeStep === 'basicSettingDesign'">
        <basicSetting ref="basicSettingDesign" :basicData="processConfig" @nextChange="changeSteps" />
    </div>
    <div v-show="activeStep === 'formDesign'">
        <dynamicForm ref="formDesign" />
    </div>
    <div v-if="nodeConfig" v-show="activeStep === 'processDesign'">
        <Process ref="processDesign" :processData="nodeConfig" @nextChange="changeSteps" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { ElMessage } from 'element-plus';
import { FormatUtils } from '@/utils/formatcommit_data';
import { NodeUtils } from '@/utils/nodeUtils';
import { FormatDisplayUtils } from '@/utils/formatdisplay_data';
import { showLoading, closeLoading } from '@/utils/loading';

const basicSettingDesign = ref(null);
const formDesign = ref(null);
const processDesign = ref(null);

let activeStep = ref("basicSettingDesign"); // 激活的步骤面板

let steps = ref([
    { label: "基础设置", key: "basicSettingDesign" },
    { label: "表单设计", key: "formDesign" },
    { label: "流程设计", key: "processDesign" },
]);

let translateX = computed({
    get() {
        return `translateX(${(steps.value.findIndex(t => t.key === activeStep.value) - 1) * 100}%)`
    }
})

const changeSteps = (item) => {
    activeStep.value = item.key;
};

let processConfig = ref(null);
let nodeConfig = ref(null);
let title = ref('');
onMounted(async () => {
    showLoading();
    let mockjson = NodeUtils.createStartNode();
    let data = FormatDisplayUtils.getToTree(mockjson.data);
    processConfig.value = data;
    title.value = data.bpmnName;
    nodeConfig.value = data.nodeConfig;
    closeLoading();
});

const publish = () => {
    const step1 = basicSettingDesign.value.getData();
    const step2 = formDesign.value.getData();
    const step3 = processDesign.value.getData();
    Promise.all([step1, step2, step3])
        .then((res) => {
            ElMessage.success("设置成功,F12控制台查看数据");
            let basicData = res[0].formData;
            let formData = res[1].formData;
            Object.assign(basicData, { formData: formData });
            var nodes = FormatUtils.formatSettings(res[2].formData);
            Object.assign(basicData, { nodes: nodes });
            return basicData;
        })
        .then((data) => {
            console.log("提交到API=data================================", JSON.stringify(data));
            // setApiWorkFlowData(data).then((resLog) => {
            //     if (resLog.code == 200) { 
            //         console.log("提交到API返回成功"); 
            //     }else {
            //         console.log("提交到API返回失败=",JSON.stringify(resLog));
            //     } 
            // });
        })
        .catch((err) => {
            if (err) {
                console.log("设置失败" + JSON.stringify(err.msg));
                ElMessage.error("至少配置一个有效审批人节点");
            }
        });
};

</script>
<style lang="css" scoped>
.step-tab {
    display: flex;
    justify-content: center;
    position: relative;
    height: 60px;
    font-size: 14px;
    border-right: 0px solid #1583f2;
    text-align: center;
    cursor: pointer;
}

.step {
    width: 140px;
    line-height: 100%;
    padding-left: 30px;
    padding-right: 30px;
    line-height: 60px;
    cursor: pointer;
    position: relative;
}

.step-index {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 1px solid #fff;
    border-radius: 8px;
    line-height: 18px;
    text-align: center;
    box-sizing: border-box;
}

.ghost-step {
    position: absolute;
    height: 60px;
    z-index: -1;
    background: #4483f2;
    transition: transform .5s;
}

.ghost-step::after {
    content: '';
    border-width: 6px 6px 6px;
    border-style: solid;
    border-color: transparent transparent white;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -6px;
}
</style>