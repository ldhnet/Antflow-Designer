//import {  NodeUtils } from '@/utils/nodeUtils'

export class NodeUtils {
  /**
   * 根据自增数生成64进制id
   * @returns 64进制id字符串
   */
  static idGenerator() {
    let qutient = new Date() - new Date("2024-05-01");
    qutient += Math.ceil(Math.random() * 1000); // 防止重複
    const chars =
      "0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz";
    const charArr = chars.split("");
    const radix = chars.length;
    const res = [];
    do {
      let mod = qutient % radix;
      qutient = (qutient - mod) / radix;
      res.push(charArr[mod]);
    } while (qutient);
    return res.join("").toUpperCase();
  }
  /**
   * 初始化流程数据
   * @returns object
   */
  static createStartNode() {
    let startObj = {
      data: {},
    };
    let startNode = {
      bpmnName: "请假申请流程",
      bpmnCode: "BIZ_RTWHMN",
      bpmnType: null,
      flowGroup: 1,
      formCode: "LEAVE_WMA",
      remark: "",
      effectiveStatus: 0,
      deduplicationType: 1,
      isLowCodeFlow: 0, // 0、自定义表单 1、低代码表单 演示环境默认为0
      formData: {
        widgetList: [
          {
            key: 21993,
            type: "grid",
            category: "container",
            icon: "grid",
            cols: [
              {
                type: "grid-col",
                category: "container",
                icon: "grid-col",
                internal: true,
                widgetList: [
                  {
                    key: 31925,
                    type: "input",
                    icon: "text-field",
                    formItemFlag: true,
                    options: {
                      name: "input73847",
                      label: "姓名",
                      labelAlign: "",
                      type: "text",
                      defaultValue: "",
                      placeholder: "",
                      columnWidth: "200px",
                      size: "",
                      labelWidth: null,
                      labelHidden: false,
                      readonly: false,
                      disabled: false,
                      hidden: false,
                      clearable: true,
                      showPassword: false,
                      required: false,
                      requiredHint: "",
                      validation: "",
                      validationHint: "",
                      customClass: "",
                      labelIconClass: null,
                      labelIconPosition: "rear",
                      labelTooltip: null,
                      minLength: null,
                      maxLength: null,
                      showWordLimit: false,
                      prefixIcon: "",
                      suffixIcon: "",
                      appendButton: false,
                      appendButtonDisabled: false,
                      buttonIcon: "custom-search",
                      onCreated: "",
                      onMounted: "",
                      onInput: "",
                      onChange: "",
                      onFocus: "",
                      onBlur: "",
                      onValidate: "",
                      onAppendButtonClick: "",
                      fieldTypeName: "input",
                      fieldType: "1",
                    },
                    id: "input73847",
                  },
                ],
                options: {
                  name: "gridCol96743",
                  hidden: false,
                  span: 12,
                  offset: 0,
                  push: 0,
                  pull: 0,
                  responsive: false,
                  md: 12,
                  sm: 12,
                  xs: 12,
                  customClass: "",
                },
                id: "grid-col-96743",
              },
              {
                type: "grid-col",
                category: "container",
                icon: "grid-col",
                internal: true,
                widgetList: [
                  {
                    key: 31925,
                    type: "input",
                    icon: "text-field",
                    formItemFlag: true,
                    options: {
                      name: "input51574",
                      label: "年龄",
                      labelAlign: "",
                      type: "text",
                      defaultValue: "",
                      placeholder: "",
                      columnWidth: "200px",
                      size: "",
                      labelWidth: null,
                      labelHidden: false,
                      readonly: false,
                      disabled: false,
                      hidden: false,
                      clearable: true,
                      showPassword: false,
                      required: false,
                      requiredHint: "",
                      validation: "",
                      validationHint: "",
                      customClass: "",
                      labelIconClass: null,
                      labelIconPosition: "rear",
                      labelTooltip: null,
                      minLength: null,
                      maxLength: null,
                      showWordLimit: false,
                      prefixIcon: "",
                      suffixIcon: "",
                      appendButton: false,
                      appendButtonDisabled: false,
                      buttonIcon: "custom-search",
                      onCreated: "",
                      onMounted: "",
                      onInput: "",
                      onChange: "",
                      onFocus: "",
                      onBlur: "",
                      onValidate: "",
                      onAppendButtonClick: "",
                      fieldTypeName: "input",
                      fieldType: "1",
                    },
                    id: "input51574",
                  },
                ],
                options: {
                  name: "gridCol29220",
                  hidden: false,
                  span: 12,
                  offset: 0,
                  push: 0,
                  pull: 0,
                  responsive: false,
                  md: 12,
                  sm: 12,
                  xs: 12,
                  customClass: "",
                },
                id: "grid-col-29220",
              },
            ],
            options: {
              name: "grid48769",
              hidden: false,
              gutter: 12,
              colHeight: null,
              customClass: "",
            },
            id: "grid48769",
          },
          {
            key: 92385,
            type: "textarea",
            icon: "textarea-field",
            formItemFlag: true,
            options: {
              name: "textarea81541",
              label: "备注",
              labelAlign: "",
              rows: 3,
              defaultValue: "",
              placeholder: "",
              columnWidth: "200px",
              size: "",
              labelWidth: null,
              labelHidden: false,
              readonly: false,
              disabled: false,
              hidden: false,
              required: false,
              requiredHint: "",
              validation: "",
              validationHint: "",
              customClass: "",
              labelIconClass: null,
              labelIconPosition: "rear",
              labelTooltip: null,
              minLength: null,
              maxLength: null,
              showWordLimit: false,
              onCreated: "",
              onMounted: "",
              onInput: "",
              onChange: "",
              onFocus: "",
              onBlur: "",
              onValidate: "",
              fieldTypeName: "textarea",
              fieldType: "1",
            },
            id: "textarea81541",
          },
        ],
        formConfig: {
          modelName: "formData",
          refName: "vForm",
          rulesName: "rules",
          labelWidth: 80,
          labelPosition: "left",
          size: "",
          labelAlign: "label-left-align",
          cssCode: "",
          customClass: [],
          functions: "",
          layoutType: "PC",
          jsonVersion: 3,
          onFormCreated: "",
          onFormMounted: "",
          onFormDataChange: "",
          onFormValidate: "",
        },
      },
      nodes: [
        {
          nodeId: "S2MHMN",
          nodeName: "审核人",
          nodeType: 4,
          nodeFrom: "4FIHMN",
          nodeTo: [],
          setType: 1,
          directorLevel: 1,
          signType: 1,
          noHeaderAction: 1,
          error: false,
          property: {
            emplIds: [1001],
            emplList: [{ id: 1001, name: "管理员" }],
            roleIds: [],
            roleList: [],
            hrbpConfType: 0,
            assignLevelGrade: 0,
            signType: 1,
          },
          buttons: { startPage: [1], approvalPage: [3, 4], viewPage: [0] },
          nodeProperty: 1,
        },
        {
          nodeId: "ABHHMN",
          nodeName: "审核人",
          nodeType: 4,
          nodeFrom: "L5IHMN",
          nodeTo: ["S2MHMN"],
          setType: 1,
          directorLevel: 1,
          signType: 1,
          noHeaderAction: 1,
          error: false,
          property: {
            emplIds: [1],
            emplList: [{ id: 1, name: "张三" }],
            roleIds: [],
            roleList: [],
            hrbpConfType: 0,
            assignLevelGrade: 0,
            signType: 1,
          },
          buttons: { startPage: [1], approvalPage: [3, 4], viewPage: [0] },
          nodeProperty: 1,
        },
        {
          nodeId: "L5IHMN",
          nodeName: "条件1",
          nodeDisplayName: "请假时长 ≥ 32",
          nodeType: 3,
          nodeFrom: "4FIHMN",
          nodeTo: ["ABHHMN"],
          priorityLevel: 1,
          nodeApproveList: [],
          error: false,
          isDefault: 0,
          property: {
            conditionList: [
              {
                formId: "2",
                columnId: "2",
                showType: "1",
                type: 2,
                showName: "请假时长",
                optType: "5",
                zdy1: "32",
                opt1: "<",
                zdy2: "",
                opt2: "<",
                columnDbname: "leaveHour",
                fieldTypeName: "input-number",
                columnType: "Double",
                fixedDownBoxValue: "",
              },
            ],
            sort: 1,
            isDefault: 0,
          },
        },
        {
          nodeId: "38IHMN",
          nodeName: "条件2",
          nodeDisplayName: "其他条件进入此流程",
          nodeType: 3,
          nodeFrom: "4FIHMN",
          nodeTo: ["S2MHMN"],
          priorityLevel: 2,
          nodeApproveList: [],
          error: false,
          isDefault: 1,
          property: { conditionList: [], sort: 2, isDefault: 1 },
        },
        {
          nodeId: "4FIHMN",
          nodeName: "网关",
          nodeType: 2,
          nodeFrom: "Gb2",
          nodeTo: ["L5IHMN", "38IHMN"],
          error: true,
          property: null,
        },
        {
          confId: 35,
          nodeId: "Gb2",
          nodeType: 1,
          nodeProperty: 1,
          nodePropertyName: null,
          nodeFrom: "",
          nodeFroms: null,
          prevId: [],
          batchStatus: 0,
          approvalStandard: 2,
          nodeName: "发起人",
          nodeDisplayName: "发起人",
          annotation: null,
          isDeduplication: 0,
          isSignUp: 0,
          orderedNodeType: null,
          remark: "",
          isDel: 0,
          nodeTo: ["4FIHMN"],
          property: null,
          params: null,
          buttons: { startPage: [], approvalPage: [2], viewPage: null },
          templateVos: null,
          approveRemindVo: null,
          conditionNodes: [],
        },
      ],
    };
    startObj.data = startNode;
    return startObj;
  }
  /**
   * 创建审批人对象
   */
  static createApproveNode() {
    let approveNode = {
      nodeId: this.idGenerator(),
      nodeName: "审核人",
      nodeDisplayName: "审核人",
      nodeType: 4,
      nodeFrom: "",
      nodeTo: [],
      setType: 1,
      directorLevel: 1,
      signType: 1,
      noHeaderAction: 1,
      childNode: {},
      error: true,
      property: {
        afterSignUpWay: 1,
      },
      buttons: {
        startPage: [1],
        approvalPage: [3, 4],
        viewPage: [0],
      },
      nodeApproveList: [],
    };
    return approveNode;
  }
  /**
   * 创建抄送人对象
   * @returns object
   */
  static createCopyNode() {
    let copyNode = {
      nodeId: this.idGenerator(),
      nodeName: "抄送人",
      nodeDisplayName: "抄送人",
      nodeType: 6,
      nodeFrom: "",
      nodeTo: [],
      setType: 1,
      error: true,
      ccFlag: 1,
      childNode: {},
      property: {},
      buttons: {
        startPage: [],
        approvalPage: [],
        viewPage: [],
      },
      nodeApproveList: [],
    };
    return copyNode;
  }
  /**
   * 创建网关对象
   * @returns object
   */
  static createGatewayNode() {
    let gatewayNode = {
      nodeId: this.idGenerator(),
      nodeName: "网关",
      nodeType: 2,
      nodeFrom: "",
      nodeTo: [],
      childNode: null,
      error: true,
      property: null,
      conditionNodes: [],
    };
    return gatewayNode;
  }
  /**
   * 创建网关对象
   * @returns object
   */
  static createGatewayNode(child) {
    let gatewayNode = {
      nodeId: this.idGenerator(),
      nodeName: "网关",
      nodeType: 2,
      nodeFrom: "",
      nodeTo: [],
      childNode: null,
      isDynamicCondition: false, //true 动态条件 false 非动态条件
      isParallel: false, //true 是并行条件 false 非并行条件
      error: true,
      property: null,
      conditionNodes: [
        this.createConditionNode("条件1", child, 1, 0),
        this.createConditionNode("条件2", null, 2, 1),
      ],
    };
    return gatewayNode;
  }
  /**
   * 创建动态网关对象
   * @returns object
   */
  static createDynamicConditionWayNode(child) {
    let gatewayNode = {
      nodeId: this.idGenerator(),
      nodeName: "动态网关",
      nodeType: 2,
      nodeFrom: "",
      nodeTo: [],
      childNode: null,
      isDynamicCondition: true, //true 动态条件 false 非动态条件
      isParallel: false, //true 是并行条件 false 非并行条件
      error: false,
      property: null,
      conditionNodes: [
        this.createConditionNode("动态条件1", child, 1, 0),
        this.createConditionNode("动态条件2", null, 2, 1),
      ],
    };
    return gatewayNode;
  }
  /**
   * 创建条件并行网关对象
   * @returns object
   */
  static createParallelConditionWayNode(child) {
    let gatewayNode = {
      nodeId: this.idGenerator(),
      nodeName: "条件并行网关",
      nodeType: 2,
      nodeFrom: "",
      nodeTo: [],
      childNode: this.createParallelNode("条件并行聚合审批人", null, 1, 0),
      isDynamicCondition: false, //true 动态条件 false 非动态条件
      isParallel: true, //true 是并行条件 false 非并行条件
      error: false,
      property: null,
      conditionNodes: [
        this.createConditionNode("并行条件1", child, 1, 0),
        this.createConditionNode("并行条件2", null, 2, 0),
      ],
    };
    return gatewayNode;
  }
  /**
   * 创建条件对象
   * @returns object
   */
  static createConditionNode(name, childNode, priority, isDefault) {
    let conditionNode = {
      nodeId: this.idGenerator(),
      nodeName: name || "条件1",
      nodeDisplayName: name || "条件1",
      nodeType: 3,
      nodeFrom: "",
      nodeTo: [],
      priorityLevel: priority,
      conditionList: [],
      nodeApproveList: [],
      error: true,
      childNode: childNode,
      isDefault: isDefault || 0,
    };
    return conditionNode;
  }

  /**
   * 条件判断对象
   * @param {*} formId  条件表单Id
   * @param {*} columnId 条件判断id
   * @param {*} type 类型 1，发起人 2，其他表单条件
   * @param {*} showName 显示名称.
   * @param {*} showType //1,值类型（>,>=,<,<=,=）,2单选下拉, 3多选(checkbox) 其他
   * @param {*} columnName  DB字段名称
   * @param {*} columnType  DB字段类型
   * @param {*} fixedDownBoxValue 条件选项
   * @returns
   */
  static createJudgeNode(
    formId,
    type,
    showName,
    showType,
    columnName,
    columnType,
    fixedDownBoxValue
  ) {
    let judgeNode = {
      formId: formId,
      columnId: formId,
      showType: showType,
      type: type, //1，发起人 2，其他表单条件
      showName: showName,
      optType: "5",
      zdy1: "",
      opt1: "<",
      zdy2: "",
      opt2: "<",
      columnDbname: columnName,
      columnType: columnType,
      fixedDownBoxValue: fixedDownBoxValue,
    };
    return judgeNode;
  }

  /**
   * 创建并行网关对象
   * @returns object
   */
  static createParallelWayNode(child) {
    let parallelwayNode = {
      nodeId: this.idGenerator(),
      nodeName: "并行审核网关",
      nodeType: 7,
      nodeFrom: "",
      nodeTo: [],
      childNode: this.createParallelNode("并行聚合节点", null, 1, 0),
      error: false,
      property: null,
      parallelNodes: [
        this.createParallelNode("并行审核人1", child, 1, 0),
        this.createParallelNode("并行审核人2", null, 2, 0),
      ],
    };
    return parallelwayNode;
  }
  /**
   * 创建并行审批人对象
   * @returns object
   */
  static createParallelNode(name, childNode, priority, isDefault) {
    let parallelNode = {
      nodeId: this.idGenerator(),
      nodeName: name || "并行审核人1",
      nodeDisplayName: "",
      nodeType: 4, //节点类型 4、审批人
      nodeFrom: "",
      nodeTo: [],
      priorityLevel: priority,
      nodeApproveList: [],
      setType: 5, //审批人类型 5、指定人员
      signType: 1, //审批方式 1:会签-需全部同意，2:或签-一人同意即可，3：顺序会签
      isSignUp: 0, //是否加批 0:否，1:是
      noHeaderAction: 1,
      lfFieldControlVOs: [],
      property: {
        afterSignUpWay: 2, //是否回到加批人 1:是，2:否
        signUpType: 1, //加批类型 1:顺序会签，2:会签 特别 3指: 回到加批人，afterSignUpWay赋值为1，signUpType赋值为1
      },
      buttons: {
        startPage: [1],
        approvalPage: [3, 4, 18, 21],
        viewPage: [0],
      },
      error: true,
      childNode: childNode,
      isDefault: isDefault || 0,
    };
    return parallelNode;
  }
}

/**
 * 添模拟数据
 */
export function getMockData() {
  let startNode = ""; //NodeUtils.createNode("start", "");
  return startNode;
}
