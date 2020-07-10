<template>
  <el-dialog title="登录网易云" :visible.sync="dialogVisible" width="20%" :before-close="cancel">
    <div class="loginPage">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="手机登录" name="first">
          <el-form :model="loginPageForm1" :rules="loginPageRules" ref="loginPageFormRef1">
            <el-form-item prop="phoneNumber">
              <el-input
                prefix-icon="el-icon-mobile-phone"
                clearable
                type="text"
                v-model="loginPageForm1.phoneNumber"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password1">
              <el-input
                prefix-icon="el-icon-lock"
                clearable
                type="password"
                show-password
                v-model="loginPageForm1.password1"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="tabsBtn">
            <span class="tabsBtnItem" @click="login1">登 录</span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="邮箱登录" name="second">
          <el-form :model="loginPageForm2" :rules="loginPageRules" ref="loginPageFormRef2">
            <el-form-item prop="email">
              <el-input
                prefix-icon="el-icon-message"
                clearable
                type="text"
                v-model="loginPageForm2.email"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password2">
              <el-input
                prefix-icon="el-icon-lock"
                clearable
                type="password"
                show-password
                v-model="loginPageForm2.password2"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="tabsBtn">
            <span class="tabsBtnItem" @click="login2">登 录</span>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script>
import { get, post } from "../../network/http";

export default {
  name: "loginPage",
  data() {
    // 设置邮箱验证规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/gi;
      if (regEmail.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };
    // 设置手机号验证规则
    var checkMobile = (rule, value, cb) => {
      const regMobile = /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/g;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    return {
      // 默认选中的选项卡
      activeName: "first",
      // 表单数据1
      loginPageForm1: {
        // 手机号
        phoneNumber: "",
        // 密码
        password1: ""
      },
      // 表单数据2
      loginPageForm2: {
        // 邮箱
        email: "",
        // 密码
        password2: ""
      },
      // 表单验证规则
      loginPageRules: {
        password1: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      }
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  methods: {
    handleClick() {
      this.loginPageForm1.password1 = "";
      this.loginPageForm2.password2 = "";
    },
    // 监听关闭窗口的事件
    cancel() {
      this.$emit("dialog-cancel");
      this.$refs.loginPageFormRef1.resetFields();
      this.$refs.loginPageFormRef2.resetFields();
      this.loginPageForm1.phoneNumber = "";
      this.loginPageForm2.email = "";
    },
    login1() {
      this.$refs.loginPageFormRef1.validate(async valid => {
        if (!valid) return;
        // 验证成功则发起网络请求
        const paw = encodeURIComponent(this.loginPageForm1.password1);
        const res = await post(
          `https://autumnfish.cn/login/cellphone?phone=${this.loginPageForm1.phoneNumber}&password=${paw}`
        );
        if (res.status !== 200) {
          console.log("登录失败");
        }
        console.log(res);
        // 关闭弹窗
        this.cancel();
      });
    },
    login2() {
      this.$refs.loginPageFormRef2.validate(async valid => {
        if (!valid) return;
        // 验证成功则发起网络请求
        const paw = encodeURIComponent(this.loginPageForm2.password2);
        const res = await post(
          `https://autumnfish.cn/login?email=${this.loginPageForm2.email}&password=${paw}`
        );
        if (res.status !== 200) {
          console.log("登录失败");
        }
        console.log(res);
        // 关闭弹窗
        this.cancel();
      });
    }
  }
};
</script>

<style lang="less" scoped>
// 登录对话框样式
.el-dialog__wrapper {
  /deep/ .el-dialog {
    background-color: rgba(255, 255, 255, 0.8);
    // width: px;
    height: 305px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 !important;
    .el-dialog__title {
      font-size: 20px;
    }
  }
}

.loginPage {
  margin: -25px 0 0 2px;
  width: 338px;
  height: 160px;

  .el-tabs {
    color: #333;
    .el-input {
      line-height: 0px;
    }
    .tabsBtn {
      text-align: center;
      .tabsBtnItem {
        margin-top: 1px;
        display: inline-block;
        width: 300px;
        line-height: 40px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
        background-color: rgba(198, 47, 47, 0.6);
      }
    }
    // 修改组件内部样式
    /deep/ .el-tabs__content {
      .el-input__inner {
        background-color: rgba(255, 255, 255, 0.4);
      }
      .el-input__inner:focus {
        border-color: #ccc;
      }
    }
    /deep/ .el-tabs__header {
      .el-tabs__item {
        color: #444;
      }
      .el-tabs__item:hover {
        color: rgba(198, 47, 47, 0.9);
      }
      .is-active {
        color: rgba(198, 47, 47, 0.9);
      }
      .el-tabs__active-bar {
        background-color: rgba(198, 47, 47, 0.8);
      }
      .el-tabs__nav-wrap::after {
        width: 0;
      }
    }
  }
}
</style>
