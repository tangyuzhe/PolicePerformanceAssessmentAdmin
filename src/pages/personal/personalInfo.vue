<template>
  <page-layout>
    <detail-list size="small" :col="2" slot="headerContent">
      <detail-list-item term="用户姓名">
        <a-input v-model="personalInfo.name" style="width:100px;" />
      </detail-list-item>
      <detail-list-item term="手机号">
        <a-input v-model="personalInfo.phone" style="width:auto;" />
      </detail-list-item>
      <detail-list-item term="部门id">
        <a-input v-model="personalInfo.departId" style="width:100px;" />
      </detail-list-item>
      <detail-list-item term="顶级部门">{{!personalInfo.topDepartId?'没有部门':personalInfo.topDepartId}}</detail-list-item>
      <detail-list-item term="绩效">{{personalInfo.score}}</detail-list-item>
      <a-button type="primary" @click="UpdateInfo">修改</a-button>
    </detail-list>

    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="activeTabKey"
      @tabChange="(key) => {this.activeTabKey = key}"
    >
      <a-input
        v-model="myTeam"
        style="width:auto;"
        placeholder="请输入团队id"
        v-if="activeTabKey == '3'||activeTabKey =='4'"
      />
      <a-button type="primary" @click="QueryTeamTasksData" v-if="activeTabKey == '3'">查询</a-button>
      <a-button type="primary" @click="QueryTeamInfo" v-if="activeTabKey == '4'">查询</a-button>

      <a-button
        type="primary"
        @click="AddSubtask"
        v-if="activeTabKey === '3'"
        style="margin-left:20px;"
      >添加子任务</a-button>

      <a-table
        v-if="activeTabKey === '1'"
        :columns="column1"
        :dataSource="data1"
        :pagination="false"
      />

      <a-table
        v-if="activeTabKey === '2'"
        :columns="column2"
        :dataSource="data2"
        :pagination="false"
      >
        <a :href="text" slot="subtasksAttachmentsUrl" slot-scope="text">{{ text }}</a>
      </a-table>

      <a-table
        v-if="activeTabKey === '3'"
        :columns="column3"
        :dataSource="data3"
        :pagination="false"
      >
        <a :href="text" slot="subtasksAttachmentsUrl" slot-scope="text">{{ text }}</a>
        <span slot="action" slot-scope="text, record">
          <a-button-group style="float:left;">
            <a-button type="primary" @click="review(record)">任务详情</a-button>
          </a-button-group>
        </span>
      </a-table>

      <a-table
        v-if="activeTabKey === '4'"
        :columns="column4"
        :dataSource="data4"
        :pagination="false"
      >
        <span slot="user_type" slot-scope="text">{{text=='leader'?'队长':'成员'}}</span>
        <span slot="action" slot-scope="text, record">
          <a-button-group style="float:left;">
            <a-button
              type="primary"
              @click="WatchMemberSubtask(record)"
              :disabled="record.user_type=='leader'"
            >查看队员任务</a-button>
          </a-button-group>
        </span>
      </a-table>
    </a-card>

    <AddSubtask :show.sync="addsubtask_visible"></AddSubtask>
    <member-subtask-info :show.sync="memberSubtask_visible" :teamid="teamid" :uuid="uuid"></member-subtask-info>
  </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";
import DetailList from "@/components/tool/DetailList";
import AddSubtask from "./components/AddSubtask";
import MemberSubtaskInfo from "./components/MemberSubtaskInfo";
import { mapState } from "vuex";
import { getRequest, patchRequest } from "@/api/request";
const DetailListItem = DetailList.Item;

const tabList = [
  {
    key: "1",
    tab: "我的绩效"
  },
  {
    key: "2",
    tab: "未完成任务"
  },
  {
    key: "3",
    tab: "团队任务"
  },
  {
    key: "4",
    tab: "我的团队"
  }
];

const column1 = [
  {
    title: "部门id",
    dataIndex: "depart_id"
  },
  {
    title: "部门",
    dataIndex: "departName"
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
const column2 = [
  {
    title: "子任务id",
    dataIndex: "subtasksId"
  },
  {
    title: "团队id",
    dataIndex: "teamId"
  },
  {
    title: "创建时间",
    dataIndex: "updateTime"
  },
  {
    title: "子任务描述",
    dataIndex: "subtasksDesciption"
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
const column3 = [
  {
    title: "指派成员id",
    dataIndex: "uid"
  },
  {
    title: "子任务id",
    dataIndex: "subtasksId"
  },
  {
    title: "子任务描述",
    dataIndex: "subtasksDesciption"
  },
  {
    title: "是否已完成",
    dataIndex: "isCompleted"
  },
  {
    title: "创建时间",
    dataIndex: "updateTime"
  },
  {
    title: "任务完成权重",
    dataIndex: "weights"
  },
  {
    title: "是否有提交结果",
    dataIndex: "isSubmit"
  },
  {
    title: "附件",
    dataIndex: "subtasksAttachmentsUrl",
    scopedSlots: { customRender: "subtasksAttachmentsUrl" }
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "action" }
  }
];
const column4 = [
  {
    title: "成员id",
    dataIndex: "uid"
  },
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "职务",
    dataIndex: "user_type",
    scopedSlots: { customRender: "user_type" }
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  name: "AdvancedDetail",
  components: {
    DetailListItem,
    DetailList,
    PageLayout,
    AddSubtask,
    MemberSubtaskInfo
  },
  data() {
    return {
      tabList,
      activeTabKey: "1",
      personalInfo: {},
      column1,
      data1: [],
      column2,
      data2: [],
      column3,
      data3: [],
      column4,
      data4: [],
      myTeam: null,
      addsubtask_visible: false,
      memberSubtask_visible: false,
      teamid: null,
      uuid: null
    };
  },
  computed: {
    ...mapState("setting", ["isMobile"])
  },
  methods: {
    onTabChange(key) {
      console.log(key);
    },

    async QueryInfo(uid) {
      getRequest("/user/get/" + uid).then(res => {
        this.personalInfo = res.data;
      });
    },

    async UpdateInfo() {
      let data = {
        departId: this.personalInfo.departId,
        name: this.personalInfo.name,
        phone: this.personalInfo.phone
      };
      await patchRequest("/user/updateInfo", data).then(res => {
        if (res.code == 200) {
          this.$message.success(res.addtionalInfo);
        } else {
          this.$message.error("修改失败");
        }
      });
    },

    async QueryAssessments(uid) {
      await getRequest("/depart/queryPersonalMark/" + uid).then(res => {
        this.data1 = res.data;
      });
    },

    async QuerySubtasks() {
      await getRequest("/case/getSelfUnDoneSubtasks").then(res => {
        this.data2 = res.data;
      });
    },

    async QueryTeamTasksData() {
      await getRequest("/case/getTeamUnDoneSubtasks?", {
        teamId: this.myTeam
      }).then(res => {
        if (res.code == 403) {
          this.$message.error(res.addtionalInfo);
        }
        if (res.code == 200) {
          if (res.data.length == 0) {
            this.$message.warning("查询的数据为空");
            this.data3 = [];
          } else {
            this.$message.success(res.addtionalInfo);
            this.data3 = res.data;
          }
        }
      });
      // console.log("11", this.data2);
    },

    AddSubtask() {
      this.addsubtask_visible = true;
    },

    async QueryTeamInfo() {
      getRequest("/case/team/getTeamInfo/" + this.myTeam).then(res => {
        this.data4 = res.data;
      });
    },

    WatchMemberSubtask(record) {
      console.log(record);
      this.memberSubtask_visible = true;
      this.teamid = record.team_id;
      this.uuid = record.uid;
    }
  },
  mounted() {
    let uid = localStorage.getItem("uid");
    this.QueryInfo(uid);
    this.QueryAssessments(uid);
    this.QuerySubtasks();
  }
};
</script>

