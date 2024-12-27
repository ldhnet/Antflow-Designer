<template>
    <el-drawer :append-to-body="true" title="审批人" v-model="visible" class="set_promoter" :with-header="false"
        :show-close="false" :size="550" :before-close="saveApprover">
        <div class="el-drawer__header" style="border-bottom: 1px solid rgba(220, 220, 220, 1);">
            <span class="drawer-title">审批人</span>
        </div>
        <el-tabs v-model="activeName" class="set-tabs" @tab-click="handleTabClick">
            <el-tab-pane label="基础设置" name="baseTab">
                <span class="approver_content-title">💁设置审批人</span>
                <div class="approver_content">
                    <el-radio-group v-model="approverConfig.setType" class="clear" @change="changeType">
                        <el-radio v-for="({ value, label }) in setTypes" :key="value" :value="value">{{ label
                            }}</el-radio>
                    </el-radio-group>
                    <el-button type="primary" @click="addApprover"
                        v-if="approverConfig.setType == 1">添加/修改成员</el-button>
                    <p class="selected_list" v-if="approverConfig.setType == 1">
                        <span v-for="(item, index) in approverConfig.nodeApproveList" :key="index">🙍‍♂️{{ item.name
                            }}
                            <img src="@/assets/images/add-close1.png"
                                @click="$func.removeEle(approverConfig.nodeApproveList, item, 'targetId')">
                        </span>
                        <a v-if="approverConfig.nodeApproveList.length != 0"
                            @click="approverConfig.nodeApproveList = []">清除</a>
                    </p>

                    <div class="approver_manager" v-if="approverConfig.setType == 2">
                        <p>
                            <span>发起人的：</span>
                            <select v-model="approverConfig.directorLevel">
                                <option v-for="item in directorMaxLevel" :value="item" :key="item">
                                    {{ item == 1 ? '直接' : '第' + item + '级' }}主管</option>
                            </select>
                        </p>
                        <p class="tip">找不到主管时，由上级主管代审批</p>
                    </div>

                    <div class="approver_self_select" v-show="approverConfig.setType == 3">

                        <el-button type="primary" @click="addRoleApprover">添加/修改角色</el-button>
                        <p class="selected_list">
                            <span v-for="(item, index) in approverConfig.nodeApproveList" :key="index">{{ item.name
                                }}
                                <img src="@/assets/images/add-close1.png"
                                    @click="$func.removeEle(approverConfig.nodeApproveList, item, 'targetId')">
                            </span>
                            <a v-if="approverConfig.nodeApproveList.length != 0"
                                @click="approverConfig.nodeApproveList = []">清除</a>
                        </p>
                    </div>
                    <div class="approver_self_select" v-show="approverConfig.setType == 4">

                        <el-button type="primary" @click="addRoleApprover">添加/修改部门</el-button>
                        <p class="selected_list">
                            <span v-for="(item, index) in approverConfig.nodeApproveList" :key="index">{{ item.name
                                }}
                                <img src="@/assets/images/add-close1.png"
                                    @click="$func.removeEle(approverConfig.nodeApproveList, item, 'targetId')">
                            </span>
                            <a v-if="approverConfig.nodeApproveList.length != 0"
                                @click="approverConfig.nodeApproveList = []">清除</a>
                        </p>
                    </div>
                    <div class="approver_self" v-if="approverConfig.setType == 5">
                        <p>该审批节点设置“发起人自己”后，审批人默认为发起人</p>
                    </div>
                </div>
                <div class="approver_some">
                    <p>✍多人审批时采用的审批方式</p>
                    <el-radio-group v-model="approverConfig.signType" class="clear">
                        <el-radio :value="1">会签（需所有审批人同意，不限顺序）</el-radio>
                        <br />
                        <el-radio :value="2">或签（只需一名审批人同意或拒绝即可）</el-radio>
                    </el-radio-group>
                </div>
                <div class="approver_some">
                    <p>✍审批人为空时</p>
                    <el-radio-group v-model="approverConfig.noHeaderAction" class="clear">
                        <el-radio :value="1">自动审批通过/不允许发起</el-radio>
                        <br />
                        <el-radio :value="2">转交给审核管理员</el-radio>
                    </el-radio-group>
                </div>
            </el-tab-pane>
            <el-tab-pane label="按钮设置" name="btnTab">
                <div class="approver_some">
                    <p>🚩审批页面按钮权限显示控制</p>
                    <el-checkbox v-model="checkedOk" label="同意" border
                        style="margin: 6px 0;width: 100%;height: 45px;" />
                    <el-checkbox v-model="checkedNot" label="不同意" border
                        style="margin: 6px 0;width: 100%;height: 45px;" />
                    <el-checkbox v-model="checkedBack" label="打回" border
                        style="margin: 6px 0;width: 100%;height: 45px;" />
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="demo-drawer__footer clear">
            <el-button type="primary" @click="saveApprover">确 定</el-button>
            <el-button @click="closeDrawer">取 消</el-button>
        </div>
        <selectUser v-model:visible="approverVisible" :data="checkedList" @change="sureApprover" />
        <role-dialog v-model:visible="approverRoleVisible" :data="checkedRoleList" @change="sureRoleApprover" />
    </el-drawer>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
import $func from '@/utils/index'
import { setTypes } from '@/utils/const'
import { useStore } from '@/stores/index'
import selectUser from '../dialog/selectUserDialog.vue'
import roleDialog from '../dialog/selectRoleDialog.vue'

let props = defineProps({
    directorMaxLevel: {
        type: Number,
        default: 0
    }
});
let approverConfig = ref({})
let approverVisible = ref(false)
let approverRoleVisible = ref(false)
let checkedRoleList = ref([])
let checkedList = ref([])
let store = useStore()
let { setApproverConfig, setApprover } = store
let approverConfig1 = computed(() => store.approverConfig1)
let approverDrawer = computed(() => store.approverDrawer)
let visible = computed({
    get() {
        return approverDrawer.value
    },
    set() {
        closeDrawer()
    }
})
let checkedOk = ref(true)
let checkedNot = ref(true)
let checkedBack = ref(false)
const activeName = ref('baseTab')

const handleTabClick = (tab, event) => {
    //console.log(tab, event)
}
watch(approverConfig1, (val) => {
    approverConfig.value = val.value
})

const changeType = (val) => {
    approverConfig.value.nodeApproveList = [];
    approverConfig.value.signType = 1;
    approverConfig.value.noHeaderAction = 2;
    if (val == 2) {
        approverConfig.value.directorLevel = 1;
    } else {

    }
}
const addApprover = () => {
    approverVisible.value = true;
    checkedList.value = approverConfig.value.nodeApproveList
}
const addRoleApprover = () => {
    approverRoleVisible.value = true;
    checkedRoleList.value = approverConfig.value.nodeApproveList
}
const sureApprover = (data) => {
    approverConfig.value.nodeApproveList = data;
    approverVisible.value = false;
}
const sureRoleApprover = (data) => {
    approverConfig.value.nodeApproveList = data;
    approverRoleVisible.value = false;
}
const saveApprover = () => {
    approverConfig.value.error = !$func.setApproverStr(approverConfig.value)
    setApproverConfig({
        value: approverConfig.value,
        flag: true,
        id: approverConfig1.value.id
    })
    closeDrawer()
}
const closeDrawer = () => {
    setApprover(false)
}
</script>
<style lang="css" scoped>
.el-tabs {
    margin-left: 20px !important;
    margin-right: 20px !important;
    height: calc(100% - 110px);
}

.selected_list {
    margin-bottom: 20px;
    line-height: 30px;
}

.selected_list span {
    margin-right: 10px;
    padding: 3px 6px 3px 9px;
    line-height: 12px;
    white-space: nowrap;
    border-radius: 5px;
    border: 1px solid rgba(220, 220, 220, 1);
}

.selected_list img {
    margin-left: 5px;
    width: 7px;
    height: 7px;
    cursor: pointer;
}

.approver_content {
    padding: 20px 20px 0; 
    border-bottom: 1px solid #f2f2f2;
    min-height: 260px;
    overflow: hidden;
    margin-bottom: 20px;
    border: 1px solid var(--el-border-color);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.approver_content-title {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: inline-block;
    padding: 5px;
    width: 100%;
    background-color: var(--el-border-color);
}

.approver_self_select,
.approver_content {
    .el-button {
        margin-bottom: 20px;
    }
}

.approver_content,
.approver_some,
.approver_self_select {
    .el-radio-group {
        display: unset;
    } 
    .el-radio {
        width: 25%;
        margin-bottom: 20px;
        height: 16px;
    }
}

.approver_manager p {
    line-height: 32px;
}

.approver_manager select {
    width: 420px;
    height: 32px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(217, 217, 217, 1);
}

.approver_manager p.tip {
    margin: 10px 0 22px 0;
    font-size: 12px;
    line-height: 16px;
    color: #f8642d;
}

.approver_self {
    padding: 28px 20px;
    color: #f8642d;
} 
.approver_manager p:first-of-type,
.approver_some p {
    line-height: 19px;
    font-size: 15px;
    margin-bottom: 14px;
    font-weight: 600;
}

</style>