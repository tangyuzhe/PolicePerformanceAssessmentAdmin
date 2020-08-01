<template>
  <div>
    <a-modal title="任务详情" :visible="show" @cancel="handleCancel" width="700px" destroyOnClose>
      <a-form>
        <a-row class="form-row">
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item :label="$t('案件id')">
              <a-input :value="task.caseId" />
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 8, offset: 4}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-item :label="$t('是否在进行成员招募')">
              <a-input :value="task.isRecruiting==1?'招募完成':'正在招募'" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row">
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item :label="$t('任务完成描述')">
              <a-input :value="task.taskCompletionInfo" />
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 8, offset: 4}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-item :label="$t('任务完成时间')">
              <a-input :value="task.taskCompletionTime" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row">
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item :label="$t('任务总分')">
              <a-input :value="task.taskScore" />
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 8, offset: 4}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-item :label="$t('任务进行情况')">
              <a-input :value="task.taskStatus=='completed'?'已完成':'正在进行'" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row">
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item :label="$t('任务进行id（自增）')">
              <a-input :value="task.taskStatusId" />
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 8, offset: 4}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-item :label="$t('团队id')">
              <a-input :value="task.teamId" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row">
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item :label="$t('附件')">
              <img :src="task.taskCompletionAttachmentsUrl" alt width="100%" height="100" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { getRequest } from "@/api/request";
export default {
  props: ["show", "task_id"],
  data() {
    return {
      task: {}
    };
  },
  methods: {
    handleCancel() {
      this.$emit("update:show", false);
    },

    async QueryTaskData(id) {
      this.task = {};
      await getRequest("/case/getTaskStatus/" + id).then(res => {
        console.log(res.data.length == 0);
        if (res.data.length == 0) {
          this.task = {};
        } else {
          this.task = res.data[0];
        }
      });
    }
  },
  watch: {
    task_id: function(newVal) {
      this.QueryTaskData(newVal);
    }
  }
};
</script>
