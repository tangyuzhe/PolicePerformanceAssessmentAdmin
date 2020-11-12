<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo.png" />
        <span class="title">公安绩效考核后台管理系统</span>
      </div>
      <div class="desc"></div>
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :autoFormCreate="(form) => (this.form = form)">
        <a-tabs
          size="large"
          :tabBarStyle="{ textAlign: 'center' }"
          style="padding: 0 2px"
        >
          <a-tab-pane tab="账户密码登录" key="1">
            <a-alert
              type="error"
              :closable="true"
              v-show="error"
              :message="error"
              showIcon
              style="margin-bottom: 24px"
            />
            <a-form-item
              fieldDecoratorId="name"
              :fieldDecoratorOptions="{
                rules: [
                  { required: true, message: '请输入账户名', whitespace: true },
                ],
              }"
            >
              <a-input size="large" placeholder="请输入账号">
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item
              fieldDecoratorId="password"
              :fieldDecoratorOptions="{
                rules: [
                  { required: true, message: '请输入密码', whitespace: true },
                ],
              }"
            >
              <a-input size="large" placeholder="请输入密码" type="password">
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button
                :loading="logging"
                style="width: 100%; margin-top: 24px"
                size="large"
                htmlType="submit"
                type="primary"
                >登录</a-button
              >
            </a-form-item>
          </a-tab-pane>

          <a-tab-pane tab="上报案件" key="2">
            <a-form>
              <a-form-item label="请选择案件类型">
                <a-select @change="selectType">
                  <a-select-option
                    :value="item.caseTypeName"
                    v-for="(item, index) in caseType"
                    :key="index"
                  >
                    {{ item.caseTypeName }}
                  </a-select-option>
                </a-select>
              </a-form-item>

              <a-form-item label="案件描述：">
                <a-textarea
                  placeholder="请详细说明案件"
                  :auto-size="{ minRows: 3 }"
                  v-model="Case.caseInfo"
                />
              </a-form-item>

              <a-form-item label="上传案件">
                <a-upload name="file" :multiple="true" @change="uploadFile">
                  <a-button> <a-icon type="upload" />上传文件 </a-button>
                </a-upload>
              </a-form-item>

              <a-form-item>
                <a-button
                  :loading="logging"
                  style="width: 100%; margin-top: 24px"
                  size="large"
                  @click="submitCase"
                  type="primary"
                  >上报案件</a-button
                >
              </a-form-item>
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from "@/layouts/CommonLayout";
import { postRequest, getRequestWithoutToken } from "../../api/request";
export default {
  name: "Login",
  components: { CommonLayout },
  data() {
    return {
      logging: false,
      error: "",
      caseType: [],
      Case: {
        caseTypeId: 0,
        caseTypeName: "",
        caseInfo: "",
        fileUrl: [],
        caseUpdateTime: new Date(),
      },
    };
  },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName;
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true;
          let data = {
            client_id: "pesystem",
            client_secret: "pesystem",
            grant_type: "password",
            username: this.form.getFieldValue("name"),
            password: this.form.getFieldValue("password"),
          };
          postRequest("/uaa/oauth/token", data).then((res) => {
            this.logging = false;
            console.log(res.status);
            if (res) {
              sessionStorage.setItem("access_token", res.access_token);
              localStorage.setItem("uid", res.uid);
              this.$message.success("登录成功");
              setTimeout(() => {
                this.$router.push("/personal");
              }, 1000);
            }
          });
        }
      });
    },
    async getCaseTypeList() {
      await getRequestWithoutToken("/case/getCaseType").then((res) => {
        this.caseType = res.data;
      });
    },
    selectType(value) {
      this.Case.caseTypeName = value;
      this.caseType.forEach((item) => {
        if (item.caseTypeName == value) {
          this.Case.caseTypeId = item.caseTypeId;
        }
      });
    },
    uploadFile() {},
    submitCase() {
      console.log(this.Case);
    },
  },
  mounted() {
    this.getCaseTypeList();
  },
};
</script>

<style lang="less" scoped>
.common-layout {
  .top {
    text-align: center;
    .header {
      height: 44px;
      line-height: 44px;
      a {
        text-decoration: none;
      }
      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
      }
      .title {
        font-size: 33px;
        color: @title-color;
        font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica,
          sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
    .desc {
      font-size: 14px;
      color: @text-color-second;
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }
  .login {
    width: 368px;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }
    .icon {
      font-size: 24px;
      color: @text-color-second;
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: @primary-color;
      }
    }
  }
}
</style>
