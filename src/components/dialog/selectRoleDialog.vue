<template> 
   <el-dialog title="选择角色" v-model="visibleDialog" style="width: 800px !important;" append-to-body>
      <el-row  :gutter="10"> 
        <el-col :span="16">
            <p class="tip">角色列表</p>
            <div style="margin-top: 10px;"> 
                  <el-form :model="queryParams" ref="queryRef" :inline="true">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input
                          v-model="queryParams.roleName"
                          placeholder="请输入角色名称"
                          clearable
                          style="width: 150px"
                          @keyup.enter="handleQuery"
                        />
                    </el-form-item> 
                    <el-form-item>
                        <el-button type="primary" @click="handleQuery">搜索</el-button> 
                    </el-form-item>
                  </el-form>
                  <el-table ref="refTable" :data="roleList" border height="260px">
                    <el-table-column label="操作" width="60" align="center" class-name="small-padding fixed-width">
                      <template #default="scope"> 
                        <el-button link type="primary" @click="handleSelectUser(scope.row)" >
                          添加
                        </el-button>
                      </template>
                    </el-table-column>
                    <el-table-column label="角色名称" prop="roleName" :show-overflow-tooltip="true" /> 
                    <el-table-column label="描述" prop="description" :show-overflow-tooltip="true" /> 
                    <el-table-column label="状态" align="center" prop="status">
                      <template #default="scope">
                          <el-tag> {{ scope.row.status === '0' ? '正常' : '停用' }}</el-tag>
                      </template>
                    </el-table-column> 
                </el-table>          
              </div>
        </el-col>
        <el-col :span="8">
          <p class="tip">已选中列表</p>
          <el-table  ref="selectedTable" :data="checkedUsersList" border height="310px">   
            <el-table-column label="操作" width="60" align="center" class-name="small-padding fixed-width">
              <template #default="scope"> 
                <el-button link type="primary" @click="handleRemove(scope.row)" >移除</el-button>
              </template>
            </el-table-column>
            <el-table-column label="角色名称" prop="roleName" :show-overflow-tooltip="true" />  
          </el-table>
        </el-col>
      </el-row>
      <template #footer>
         <div class="dialog-footer">
            <el-button type="primary" @click="saveDialog">确 定</el-button>
            <el-button @click="closeDialog">取 消</el-button>
         </div>
      </template>
   </el-dialog>
</template>

<script setup name="selectUserDialog"> 
import { ref,reactive,watch,computed } from 'vue';
import { ElMessage } from 'element-plus';  
import { getRoles } from '@/api/index';
let emits = defineEmits(['update:visible','change']) 
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array,
    default:()=> []
  }
});  

const roleList = ref([]);
const total = ref(0); 
let checkedUsersList = ref([]);

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10, 
  roleName: undefined,
  phonenumber: undefined
});
let visibleDialog = computed({
  get() {
    return props.visible
  },
  set() {
    closeDialog()
  }
}); 
 
watch(()=> props.visible,(newVal) => { 
  if(newVal){ 
      checkedUsersList.value = props.data.map(item => {
              return {
                      roleId:item.targetId,
                      roleName:item.name
              }
          }) 
      } 
}) 
// 查询表数据
function getList() {
  getRoles(queryParams).then(res => { 
    roleList.value = res.data;
    total.value = res.total;
  });
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.pageNum = 1;
  getList();
} 

/** 选择授权角色操作 */
function handleSelectUser(row) {  
  if (!row || row.roleId == "") { 
    ElMessage.error("请选择角色");
    return;
  }   
  if (checkedUsersList.value.some(c=>c.roleId == row.roleId)) { 
    ElMessage.error("角色已被选中");
    
  }else {
    checkedUsersList.value.push(row); 
  } 
}
/** 移除选中角色操作 */
function handleRemove(row) {   
  if (checkedUsersList.value.some(c=>c.roleId == row.roleId)) {
    checkedUsersList.value = checkedUsersList.value.filter(item => item.roleId !=row.roleId); 
  }else { 
    ElMessage.error("角色已被移除");
  } 
}
/**
 * 确认/保存
 */
let saveDialog = ()=> {
  let checkedList = [ 
    ...checkedUsersList.value
  ].map(item=>({
    type: 3,
    targetId: item.roleId,
    name: item.roleName
  })) 
  emits('change',checkedList) 
}

getList();

/**
 * 关闭弹窗
 */
 const closeDialog = () => {
   checkedUsersList.value = []
   emits('update:visible', false) 
}

</script>
<style lang="css" scoped>
.tip {
    padding: 8px 16px;
    background-color: rgb(197.7, 225.9, 255); 
    border-left: 5px solid #409eff; 
}
</style>