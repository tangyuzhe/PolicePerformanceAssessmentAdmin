<template>
  <div>
    <a-card :bordered="false">
      <a-input placeholder="请输入查询的部门id" style="width:150px" v-model="departmentId" />
      <a-button type="primary" style="margin-top:5px" @click="SearchDepartment">查询</a-button>
      <a-table :columns="columns" :data-source="loadData">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="departId" slot-scope="text,record">{{record===1?'y':'n'}}</span>
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
    title: "用户id",
    dataIndex: "uid"
  },
  {
    title: "姓名",
    dataIndex: "name"
    // scopedSlots: { customRender: 'status' }
  },
  {
    title: "手机号",
    dataIndex: "phone"
  },
  {
    title: "部门id",
    dataIndex: "departId"
    // scopedSlots: { customRender: 'description' }
  },
  {
    title: "顶层部门id",
    dataIndex: "topDepartId"
    // sorter: true,
    // needTotal: true,
    // customRender: text => text + ' 次'
  },
  {
    title: "总得分",
    dataIndex: "score"
    // sorter: true
  }
];

export default {
  name: "DepartmentMembers",
  components: {},
  data() {
    return {
      columns,
      loadData: [],
      departmentId: null
    };
  },
  methods: {
    async SearchDepartment() {
      if (!this.departmentId) {
        this.loadData = [];
      } else {
        this.loadData = [];
        await getRequest("/depart/getMember/" + this.departmentId).then(res => {
          this.loadData = res.data;
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
