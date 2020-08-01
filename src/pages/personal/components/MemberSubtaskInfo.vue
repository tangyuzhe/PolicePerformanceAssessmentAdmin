<template>
  <div>
    <a-modal
      title="队员任务情况"
      :visible="show"
      @cancel="handleCancel"
      @ok="handleOk"
      width="800px"
      destroyOnClose
    >
      <a-table :columns="column" :dataSource="data" :pagination="false">
        <span slot="subtasksAttachmentsUrl" slot-scope="text">
          <a :href="subtasksAttachmentsUrl">{{text}}</a>
        </span>
      </a-table>
    </a-modal>
  </div>
</template>
<script>
import { getRequest } from "../../../api/request";
// import { getRequest } from "@/api/request";
const column = [
  {
    title: "任务id",
    dataIndex: "subtasksId"
  },
  {
    title: "任务描述",
    dataIndex: "subtasksDesciption"
  },
  {
    title: "更新时间",
    dataIndex: "updateTime"
  },
  {
    title: "任务权重",
    dataIndex: "weights"
  },
  {
    title: "是否有提交结果",
    dataIndex: "isSubmit"
  },
  {
    title: "是否已完成",
    dataIndex: "isCompleted"
  },
  {
    title: "附件",
    dataIndex: "subtasksAttachmentsUrl",
    scopedSlots: { customRender: "subtasksAttachmentsUrl" }
  }
];
export default {
  props: ["show", "teamid", "uuid"],
  data() {
    return {
      column,
      data: []
    };
  },
  methods: {
    handleCancel() {
      this.$emit("update:show", false);
    },
    handleOk() {
      this.$emit("update:show", false);
    },
    async QuerySubtask(teamid, uuid) {
      await getRequest(
        "/case/getTeamUnDoneSubtasksById/" + teamid + "/" + uuid
      ).then(res => {
        this.data = res.data;
        console.log(res.data);
      });
    }
  },
  watch: {
    uuid: function(newVal) {
      this.QuerySubtask(this.teamid, newVal);
    }
  },
  created() {
    console.log(this.teamid);
  }
};
</script>
