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
      <a-form @submit="onSubmit">
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
                  v-model="Case['caseInfo']"
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
import OSS from "ali-oss";
import {
  postRequest,
  getRequestWithoutToken,
  postRequestWithoutToken,
} from "../../api/request";
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
        fileUrl: "",
        caseUpdateTime: "",
      },
      ossConfig: {
        accessid: "LTAI4GKE4rTz34B75iwTrEkm",
        accesskey: "fJ8Jy9MT6J8LxHfoPnJbfguI6XUHRr",
        host: "https://pesystem.oss-cn-hangzhou.aliyuncs.com",
        bucket: "pesystem",
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
      this.Case["caseTypeName"] = value;
      this.caseType.forEach((item) => {
        if (item.caseTypeName == value) {
          this.Case["caseTypeId"] = item.caseTypeId;
        }
      });
    },
    async uploadFile(value) {
      const data = {
        fileName: value.fileList[0].name,
        fileType: "",
        uid: 0,
        priority: 6,
      };
      let url = "";
      if (value.fileList[0].type.substr(0, 5) == "video") {
        data.fileType = "video";
      } else {
        data.fileType = "file";
      }
      await postRequestWithoutToken("/case/uploadFile", data).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.Case.fileUrl =
            "https://pesystem.oss-cn-hangzhou.aliyuncs.com/" + res.data.fileUrl;
        }
        url = res.data.fileUrl;
      });
      let client = new OSS({
        accessKeyId: this.ossConfig.accessid,
        accessKeySecret: this.ossConfig.accesskey,
        bucket: this.ossConfig.bucket,
        success_action_status: "200",
        region: "oss-cn-hangzhou",
      });
      client
        .multipartUpload(url, value)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async submitCase() {
      this.Case["caseUpdateTime"] = this.formatTime(
        "YYYY-mm-dd HH:MM:SS",
        new Date()
      );
      await postRequestWithoutToken("/case/addCase", this.Case).then((res) => {
        if (res.code == 200) {
          this.$message.info(res.addtionalInfo);
          setTimeout(() => {
            this.Case = {};
          }, 1000);
        }
      });
    },
    formatTime(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
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
