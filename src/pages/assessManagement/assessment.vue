<template>
  <div>
    <a-card :bordered="false">
      <a-input placeholder="请输入查询的部门id" style="width:150px" v-model="departmentId" />
      <a-button type="primary" style="margin-top:5px" @click="SearchDepartment">查询</a-button>
      <a-table :columns="columns" :data-source="loadData">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="updateTime" slot-scope="index">{{ index+'aa'}}</span>
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
    title: "通知id",
    dataIndex: "noticeId"
  },
  {
    title: "通知标题",
    dataIndex: "noticeTitle"
    // scopedSlots: { customRender: 'status' }
  },
  {
    title: "通知内容",
    dataIndex: "noticeInfo"
  },
  {
    title: "创建时间",
    dataIndex: "updateTime"
    // scopedSlots: { customRender: 'description' }
  },
  {
    title: "部门描述",
    dataIndex: "departInfo"
    // sorter: true,
    // needTotal: true,
    // customRender: text => text + ' 次'
  },
  {
    title: "附件",
    dataIndex: "noticeAttachmentsUrl"
    // sorter: true
  }
];

export default {
  name: "Assessment",
  components: {},
  data() {
    return {
      columns,
      loadData: [],
      departmentId: null
    };
  },
  methods: {
    async queryData() {
      await getRequest("/depart/getAllNotice").then(res => {
        this.loadData = res.data;
      });
    },
    async SearchDepartment() {
      if (!this.departmentId) {
        this.queryData();
      } else {
        this.loadData = [];
        await getRequest("/depart/getDepart/" + this.departmentId).then(res => {
          this.loadData.push(res.data);
        });
      }
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
