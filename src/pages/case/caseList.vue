<template>
  <div>
    <a-card :bordered="false">
      <a-table :columns="columns" :data-source="loadData">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="caseAttachmentsUrl" slot-scope="text">
          <img :src="text" alt width="50" height="50" />
        </span>
        <span slot="action" slot-scope="text, record">
          <a-button-group>
            <a-button type="primary" @click="edit(record)">修改</a-button>
            <a-button type="danger" @click="remove(record)" style="{margin-top:5px}">删除</a-button>
          </a-button-group>
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
    title: "案件id",
    dataIndex: "caseId"
  },
  {
    title: "案件类型id",
    dataIndex: "caseTypeId"
    // scopedSlots: { customRender: 'status' }
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
    dataIndex: "caseUpdateTime"
    // sorter: true,
    // needTotal: true,
    // customRender: text => text + ' 次'
  },
  {
    title: "案件当前状态",
    dataIndex: "caseStatus"
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
  components: {},
  data() {
    return {
      columns,
      loadData: []
    };
  },
  methods: {
    async queryData() {
      await getRequest("/case/getCase").then(res => {
        this.loadData = res.data;
      });
    },

    edit(record) {
      console.log(record);
    },

    remove(record) {
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
