<template>
  <div>
    <a-card :bordered="false">
      <a-table :columns="columns" :data-source="loadData">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="newsFrom" slot-scope="text">
          <a :href="text">{{text}}</a>
        </span>
        <span slot="picUrl" slot-scope="text">
          <img :src="text" alt width="50" height="50" />
        </span>
        <span slot="editTime" slot-scope="text">{{text}}</span>
        <span slot="action">
          <a-button-group style="float:left;"></a-button-group>
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { getRequest } from "../../api/request";
const columns = [
  {
    title: "序号",
    scopedSlots: { customRender: "serial" }
  },
  {
    title: "新闻id",
    dataIndex: "newsId"
  },
  {
    title: "新闻标题",
    dataIndex: "title"
  },
  {
    title: "新闻作者id",
    dataIndex: "editorId"
  },
  {
    title: "记者姓名id",
    dataIndex: "reporterId"
  },
  {
    title: "类型id",
    dataIndex: "sectionId"
  },
  {
    title: "时间",
    dataIndex: "editTime"
  },
  {
    title: "浏览次数",
    dataIndex: "clickNum"
  },
  {
    title: "新闻",
    dataIndex: "picUrl",
    scopedSlots: { customRender: "picUrl" }
  },
  {
    title: "新闻来源",
    dataIndex: "newsFrom",
    scopedSlots: { customRender: "newsFrom" }
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  name: "NewsList",
  components: {},
  data() {
    return {
      columns,
      loadData: []
    };
  },
  methods: {
    async queryData() {
      await getRequest("/news/listNews").then(res => {
        this.loadData = res.data;
      });
    },

    formateDate(time) {
      return time * 10;
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
    console.log(Date("Y-m-d H:i:s", 1156219870));
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
