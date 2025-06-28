<!--
 * @Date:  2024-05-25 14:05:59
 * @LastEditors: LDH 574427343@qq.com
 * @LastEditTime: 2023-05-24 15:20:53
 * @FilePath: /flow-designer/src/components/drawer/copyerDrawer.vue
-->
<template>
    <el-drawer :append-to-body="true" title="抄送人设置" v-model="visible" class="set_copyer" :show-close="false" :size="550"
        :before-close="saveCopyer">
        <div class="copyer_content">
            <el-button type="primary" @click="addCopyer">添加成员</el-button>
            <p class="selected_list">
                <span v-for="(item, index) in copyerConfig.nodeApproveList" :key="index">🙍‍♂️{{ item.name }}
                    <img src="@/assets/images/add-close1.png"
                        @click="$func.removeEle(copyerConfig.nodeApproveList, item, 'targetId')">
                </span>
                <a v-if="copyerConfig.nodeApproveList && copyerConfig.nodeApproveList.length != 0"
                    @click="copyerConfig.nodeApproveList = []">清除</a>
            </p>
            <el-checkbox-group v-model="ccFlag" class="clear">
                <el-checkbox :value="1">允许发起人自选抄送人</el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="flow-drawer__footer clear">
            <el-button type="primary" @click="saveCopyer">确 定</el-button>
            <el-button @click="closeDrawer">取 消</el-button>
        </div>
        <selectUser v-model:visible="copyerVisible" :data="checkedList" @change="sureCopyer" />
    </el-drawer>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
import selectUser from '../dialog/selectUserDialog.vue'
import { useStore } from '@/stores/index'
import $func from '@/utils/index'
let copyerConfig = ref({})
let ccFlag = ref([])
let copyerVisible = ref(false)
let checkedList = ref([])
let store = useStore()
let { setCopyerConfig, setCopyer } = store
let copyerDrawer = computed(()=> store.copyerDrawer)
let copyerConfig1 = computed(()=> store.copyerConfig1)
let visible = computed({
    get() {
        return copyerDrawer.value
    },
    set() {
        closeDrawer()
    }
})
watch(copyerConfig1, (val) => {
    copyerConfig.value = val.value;
    ccFlag.value = copyerConfig.value.ccFlag == 0 ? [] : [copyerConfig.value.ccFlag]
})

const addCopyer = () => {
    copyerVisible.value = true;
    checkedList.value = copyerConfig.value.nodeApproveList
}
const sureCopyer = (data) => {
    copyerConfig.value.nodeApproveList = data;
    copyerVisible.value = false;
}
const saveCopyer = () => {
    copyerConfig.value.ccFlag = ccFlag.value.length == 0 ? 0 : 1;
    copyerConfig.value.error = !$func.copyerStr(copyerConfig.value);
    setCopyerConfig({
        value: copyerConfig.value,
        flag: true,
        id: copyerConfig1.value.id
    })
    closeDrawer();
}
const closeDrawer = () => {
    setCopyer(false)
}    
</script>
<style lang="css" scoped>
.copyer_content {
    padding: 20px 20px 0;
    border-top: 1px solid rgba(220, 220, 220, 1);
    height: calc(100% - 75px);
}
.el-checkbox {
    margin-bottom: 20px;
}
.el-button {
    margin-bottom: 20px;
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
</style>