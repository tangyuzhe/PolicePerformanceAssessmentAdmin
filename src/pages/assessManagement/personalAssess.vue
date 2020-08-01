<template>
  <div>
    <a-card :bordered="false">
      <a-input placeholder="查询用户id" style="width:150px" v-model="uid" />
      <a-button type="primary" style="margin-top:5px" @click="SearchDepartment">查询</a-button>
      <a-table :columns="columns" :data-source="loadData">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
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
    title: "部门",
    dataIndex: "departName"
  },
  {
    title: "姓名",
    dataIndex: "userName"
  },
  {
    title: "绩效id",
    dataIndex: "perform_id"
  },
  {
    title: "绩效得分",
    dataIndex: "perform_score"
  },
  {
    title: "录入时间",
    dataIndex: "update_time"
  }
];

export default {
  name: "PersonalAssess",
  components: {},
  data() {
    return {
      columns,
      loadData: [],
      uid: null
    };
  },
  methods: {
    async SearchDepartment() {
      if (!this.uid) {
        this.queryData();
      } else {
        this.loadData = [];
        await getRequest("/depart/queryPersonalMark/" + this.uid).then(res => {
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
