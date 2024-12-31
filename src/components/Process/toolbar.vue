<template>
    <!-- 底部组件栏 -->
    <div class="bottom-tray">
        <el-row>
            <el-col :span="8" v-for="item in items" :key="item.class">
                <div :class="'add-node-popover-item ' + item.class" 
                @dragstart="handleDragStart" 
                @dragend = "handleDragend"
                draggable="true">
                    <div class="item-wrapper">
                        <span class="iconfont">{{ item.icon }}</span>
                    </div>
                    <div class="icondesc">{{ item.desc }}</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const items = ref([
    { class: 'approver', icon: '', desc: '审批人' },
    { class: 'notifier', icon: '', desc: '抄送人' },
    { class: 'condition', icon: '', desc: '条件分支' }
]);
const handleDragStart = (e) => {
    //设置拖拽时的透明度
    // e.target.style.opacity=0.6;
    e.dataTransfer.setData('text', e.target.className);
    console.log('start drag', e.target.className);
};


</script>

<style lang="css" scoped>
.bottom-tray {
    position: fixed;
    bottom: 40px;
    left: 0;
    height: 75px;
    width: 60%;
    background-color: #e9e9e9;
    box-shadow: 0 10px 36px rgba(0, 0, 0, 0.1);
    padding: 10px;
    text-align: center;
    z-index: 1000;
    /* 居中显示 */
    margin-left: 20%;
    /* 圆角 */
    border-radius: 50px;
    /* 描边 */
    border: 1px solid #bababa;

}

.add-node-popover-item {
    margin-right: 10px;
    cursor: pointer;
    text-align: center;
    flex: 1;
    cursor: move;
    color: #191f25 !important;
    .icondesc {
        font-size: 12px;
        color: #191f25;
    }
    .item-wrapper {
        user-select: none;
        display: inline-block;
        width: 40px;
        height: 40px;
        margin-bottom: 5px;
        background: #fff;
        border: 1px solid #e2e2e2;
        border-radius: 50%;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);

        .iconfont {
            font-size: 25px;
            line-height: 35px
        }
    }

    &.approver {
        .item-wrapper {
            color: #ff943e
        }
    }

    &.notifier {
        .item-wrapper {
            color: #3296fa
        }
    }

    &.condition {
        .item-wrapper {
            color: #15bc83
        }
    }

    &:hover {
        .item-wrapper {
            background: #3296fa;
            box-shadow: 0 10px 20px 0 rgba(50, 150, 250, .4)
        }

        .iconfont {
            color: #fff
        }
    }

    &:active {
        .item-wrapper {
            box-shadow: none;
            background: #eaeaea
        }

        .iconfont {
            color: inherit
        }
    }
}
</style>