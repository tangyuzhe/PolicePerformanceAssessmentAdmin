<template>
  <div>
    <a-modal
      title="子任务添加"
      :visible="show"
      @cancel="handleCancel"
      @ok="handleOk"
      width="700px"
      destroyOnClose
    >
      <a-form>
        <a-row class="form-row">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item :label="$t('团队id')">
              <a-input v-model="subtask.teamId" />
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 6, offset: 2}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-item :label="$t('队员id')">
              <a-input v-model="subtask.uuid" />
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 6, offset: 2}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-item :label="$t('任务完成权重')">
              <a-input v-model="subtask.weights" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row">
          <a-col>
            <a-form-item :label="$t('任务完成描述')">
              <a-textarea
                v-model="subtask.subtasksDesciption"
                :auto-size="{ minRows: 2, maxRows: 6 }"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item :label="$t('创建时间')">
              <a-date-picker show-time @change="changeTime" />
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 6, offset: 2}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-item :label="$t('是否有提交结果')">
              <a-input v-model="subtask.isSubmit" />
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 6, offset: 2}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-item :label="$t('是否已完成')">
              <a-input v-model="subtask.isCompleted" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row">
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item :label="$t('附件')">
              <a-upload
                name="file"
                :multiple="true"
                action="https://api.pesystem.linaxhua.cn/api/case/uploadFile"
                :headers="headers"
                @change="handleChange"
              >
                <a-button>
                  <a-icon type="upload" />Click to Upload
                </a-button>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
// import { getRequest } from "@/api/request";
export default {
  props: ["show"],
  data() {
    return {
      subtask: {},
      headers: {
        authorization: "authorization-text"
      }
    };
  },
  methods: {
    handleCancel() {
      this.$emit("update:show", false);
    },
    handleOk(info) {
      console.log(info);
    },
    changeTime(date, dateString) {
      this.subtask.updateTime = dateString;
    },
    handleChange(info) {
      console.log(info);
    }
  }
};
</script>
