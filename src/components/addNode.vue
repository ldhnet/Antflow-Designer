<template>
    <div class="add-node-btn-box">
        <div class="add-node-btn">
            <el-popover placement="right-start" v-model="visible" width="auto">
                <div class="add-node-popover-body">
                    <a class="add-node-popover-item approver" @click="addType(4)">
                        <div class="item-wrapper">
                            <span class="iconfont">
                                <img src="../assets/svg/nodeSvg/approve.svg" width="35" height="35"/>
                            </span>
                        </div>
                        <p>审批人</p>
                    </a>
                    <a class="add-node-popover-item notifier" @click="addType(5)">
                        <div class="item-wrapper">
                            <span class="iconfont">
                                <img src="../assets/svg/nodeSvg/copy-user.svg" width="35" height="35"/>
                            </span> 
                        </div>
                        <p>抄送人</p>
                    </a>
                    <a class="add-node-popover-item condition" @click="addType(2)">
                        <div class="item-wrapper">
                            <span class="iconfont">
                                <img src="../assets/svg/nodeSvg/condition.svg" width="35" height="35"/>
                            </span> 
                        </div>
                        <p>条件分支</p>
                    </a>
                </div>
                <template #reference>
                    <button class="btn" type="button">
                        <span class="iconfont"></span>
                    </button>
                </template>
            </el-popover>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { NodeUtils } from '@/utils/nodeUtils'
let props = defineProps({
    childNodeP: {
        type: Object,
        default: ()=> (null)
    }
})
let emits = defineEmits(['update:childNodeP'])
let visible = ref(false)
const addType = (type)=> {
    visible.value = false;
    if (type != 2 && type != 3) { 
        let data;
        if (type == 4) { 
            data = NodeUtils.createApproveNode();  
            data.childNode = props.childNodeP; 
        } else if (type == 5) {
            data = NodeUtils.createCopyNode();  
            data.childNode = props.childNodeP;  
        }
        emits("update:childNodeP", data)
    } else {
        let gatewayNode= NodeUtils.createGatewayNode(props.childNodeP); 
        emits("update:childNodeP", gatewayNode)
    }
}
</script>
<style lang="css" scoped>
.add-node-btn-box {
    width: 240px;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    position: relative;
    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        margin: auto;
        width: 2px;
        height: 100%;
        background-color: #cacaca
    }
    .add-node-btn {
        user-select: none;
        width: 240px;
        padding: 20px 0 32px;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        flex-shrink: 0;
        -webkit-box-flex: 1;
        flex-grow: 1;
        .btn {
            outline: none;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
            width: 30px;
            height: 30px;
            background: #3296fa;
            border-radius: 50%;
            position: relative;
            border: none;
            line-height: 30px;
            -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
            transition: all .3s cubic-bezier(.645, .045, .355, 1);
            .iconfont {
                color: #fff;
                font-size: 16px
            }
            &:hover {
                transform: scale(1.3);
                box-shadow: 0 13px 27px 0 rgba(0, 0, 0, .1)
            }
            &:active {
                transform: none;
                background: #1e83e9;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1)
            }
        }
    }
}

.add-node-popover-body {
    display: flex;
    .add-node-popover-item {
        margin-right: 10px;
        cursor: pointer;
        text-align: center;
        flex: 1;
        color: #191f25!important;
        .item-wrapper {
            user-select: none;
            display: inline-block;
            width: 65px;
            height: 65px;
            margin-bottom: 5px;
            background: #fff;
            border: 1px solid #e2e2e2;
            border-radius: 10%;
            transition: all .3s cubic-bezier(.645, .045, .355, 1);
            .iconfont {
                font-size: 35px;
                line-height: 65px
            }
        } 
        &:hover{
            .item-wrapper {
                background: #284a6b;
                box-shadow: 0 10px 20px 0 rgba(50, 150, 250, .4)
            } 
        } 
    }
}
</style>