<template>
  <div>
    <a-card :bordered="false">
      <a-input placeholder="请输入查询的部门id" style="width:150px" v-model="departmentId" />
      <a-button type="primary" style="margin-top:5px" @click="SearchDepartment">查询</a-button>
      <a-table :columns="columns" :data-source="loadData">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="finished" slot-scope="text">{{ text===0?'进行中':'已结束'}}</span>
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
    title: "部门id",
    dataIndex: "depart_id"
  },
  {
    title: "部门名称",
    dataIndex: "depart_name"
    // scopedSlots: { customRender: 'status' }
  },
  {
    title: "部门负责人",
    dataIndex: "userName"
  },
  {
    title: "部门地址",
    dataIndex: "depart_address"
    // scopedSlots: { customRender: 'description' }
  },
  {
    title: "部门描述",
    dataIndex: "depart_info"
  },
  {
    title: "上级部门",
    dataIndex: "parentName"
  }
];

export default {
  name: "Department",
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
      await getRequest("/depart/getAllDepart").then(res => {
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
