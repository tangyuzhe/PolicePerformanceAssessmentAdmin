<template>
  <div>
    <a-card :bordered="false">
      <a-button type="primary">
        上传案件
        <a-icon type="upload"></a-icon>
      </a-button>
      <a-table :columns="columns" :data-source="loadData">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="caseUpdateTime" slot-scope="text">{{text}}</span>
        <span slot="caseAttachmentsUrl" slot-scope="text">
          <img :src="text" alt width="50" height="50" />
        </span>
        <span slot="caseStatus" slot-scope="text">{{selectCaseStatus(text)}}</span>
        <span slot="action" slot-scope="text, record">
          <a-button-group style="float:left;">
            <a-button type="primary" @click="review(record)">任务详情</a-button>
            <a-button
              type="primary"
              @click="receiveCase(record)"
              :disabled="record.caseStatus!='noTreatment'?true:false"
            >接受案件</a-button>
          </a-button-group>
        </span>
      </a-table>
    </a-card>

    <TaskInfo :show.sync="taskinfo_visible" :task_id="task_id"></TaskInfo>
  </div>
</template>

<script>
import { getRequest } from "../../api/request";
import TaskInfo from "./components/taskInfo";
const columns = [
  {
    title: "序号",
    scopedSlots: { customRender: "serial" }
  },
  {
    title: "案件id",
    dataIndex: "caseId"
  },
  {
    title: "案件种类名称",
    dataIndex: "caseTypeName"
  },
  {
    title: "案件详细描述",
    dataIndex: "caseInfo"
    // scopedSlots: { customRender: 'description' }
  },
  {
    title: "更新时间",
    dataIndex: "caseUpdateTime",
    scopedSlots: { customRender: "caseUpdateTime" }
  },
  {
    title: "案件当前状态",
    dataIndex: "caseStatus",
    scopedSlots: { customRender: "caseStatus" }
    // sorter: true
  },
  {
    title: "审核时间",
    dataIndex: "reviewTime"
  },
  {
    title: "案件",
    dataIndex: "caseAttachmentsUrl",
    scopedSlots: { customRender: "caseAttachmentsUrl" }
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  name: "Assessment",
  components: {
    TaskInfo
  },
  data() {
    return {
      columns,
      loadData: [],
      taskinfo_visible: false,
      task_id: null
    };
  },
  methods: {
    async queryData() {
      await getRequest("/case/getCase").then(res => {
        this.loadData = res.data;
      });
    },

    review(record) {
      this.taskinfo_visible = true;
      this.task_id = record.caseId;
    },

    selectCaseStatus(caseStatus) {
      if (caseStatus == "noTreatment") {
        return "暂无人接受";
      } else if (caseStatus == "pendingReview") {
        return "待审核";
      } else if (caseStatus == "ongoing") {
        return "正在进行";
      } else if (caseStatus == "completed") {
        return "已完成";
      } else if (caseStatus == "notApproved") {
        return "未通过审核";
      }
    },

    receiveCase(record) {
      console.log(record);
    }
  },
  created() {
    console.log(this.queryData());
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      };
    }
  }
};
</script>

<style lang="less" scoped>
.task-group {
  margin: 0 48px;
}
.dragable-ghost {
  border: 1px dashed red;
  opacity: 1;
}
.dragable-chose {
  border: 1px dashed red;
  opacity: 0.8;
}
.dragable-drag {
  border: 1px dashed red;
  opacity: 1;
}
</style>
