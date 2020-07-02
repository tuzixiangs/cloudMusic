<template>
  <div id="app">
    <div class="music_box">
      <div class="header">
        <!-- logo -->
        <div class="header_logo">
          <span>
            <i class="el-icon-headset">&nbsp;&nbsp;ACG</i>
          </span>
        </div>
        <!-- 搜索模块 -->
        <div class="header_search">
          <div class="header_search_itemButton">
            <button class="el-icon-arrow-left" disabled></button>
            <button class="el-icon-arrow-right"></button>
          </div>
          <div class="header_search_itemInput">
            <input type="text" placeholder="搜索音乐、视频、歌词、电台" v-model="search" />
            <i class="el-icon-search"></i>
          </div>
        </div>
        <!-- 用户及设置模块 -->
        <div class="header_user">
          <div class="header_user_login">
            <span class="header_user_login_item1">
              <i class="el-icon-user"></i>
            </span>
            <span class="header_user_login_item2">
              未登录
              <i class="el-icon-arrow-down"></i>
            </span>
          </div>
          <div class="header_user_setUp">
            <i class="iconfont icon-pifu"></i>
            <i class="iconfont icon-sixin"></i>
            <i class="iconfont icon-shezhi"></i>
            <i class="iconfont icon-fangda"></i>
          </div>
        </div>
      </div>
      <div class="main">
        <!-- 侧边导航栏 -->
        <div class="listenList">
          <!-- 推荐 -->
          <div class="recommend listenList_item">
            <router-link to="/findMusic" class="listenList_item_color">
              <div
                class="iconfont icon-yinle"
                :class="activePath==='/findMusic' ? 'isRecommendStyle' : ''"
              >
                <span>发现音乐</span>
              </div>
            </router-link>
            <router-link to="/privateFm" class="listenList_item_color">
              <div
                class="iconfont icon-fm-copy"
                :class="activePath==='/privateFm' ? 'isRecommendStyle' : ''"
              >
                <span>私人FM</span>
              </div>
            </router-link>
            <router-link to="/likeMusic" class="listenList_item_color">
              <div
                class="iconfont icon-xihuan"
                :class="activePath==='/likeMusic' ? 'isRecommendStyle' : ''"
              >
                <span>我喜欢的音乐</span>
              </div>
            </router-link>
          </div>
          <!-- 歌曲信息 -->
          <div class="minMusicInfo">
            <img src alt class="minMusicAvatar" />
            <div class="minMusicInfo_item_Center">
              <div class="minMusicName"></div>
              <div class="singer"></div>
            </div>
            <div class="minMusicInfo_item_left"></div>
          </div>
        </div>
        <!-- 主体页面 -->
        <div class="mainPage">
          <!-- 路由站位符 -->
          <router-view></router-view>
        </div>
      </div>
      <div class="footer">
        <div class="musicPlay">
          <!-- <audio :src="musicSrc" @play="play" @pause="pause" controls="controls" autoplay="autoplay"></audio> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // 要搜索的数据
      search: "",
      // 动态保存激活状态的路由
      activePath: ""
    };
  },
  created() {
    // console.log(this.$route);
  },
  watch: {
    // 动态获取路由
    $route: {
      handler: function(route) {
        this.activePath = route.fullPath;
        // console.log(this.activePath);
      },
      immediate: true
    }
  }
};
</script>


<style lang="less">
.music_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1022px;
  height: 670px;
  user-select: none;
}
.header {
  width: 100%;
  height: 50px;
  background-color: rgba(198, 47, 47, 0.5);
  line-height: 50px;
  .header_logo {
    float: left;
    width: 100px;
    padding: 0 15px;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;

    .el-icon-headset {
      font-size: 26px;
      margin-right: 5px;
      vertical-align: middle;
    }
  }
  .header_search {
    margin-left: 60px;
    width: 320px;
    float: left;
    .header_search_itemButton {
      float: left;
      line-height: 55px;
      height: 45px;
      button {
        width: 26px;
        height: 22px;
        background: transparent; /*完全透明*/
        color: #fff;
        font-size: 14px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }
      .el-icon-arrow-left {
        border-radius: 3px 0 0 3px;
        border-right: 0;
        margin-right: -1px;
      }
      .el-icon-arrow-right {
        border-radius: 0 3px 3px 0px;
      }
    }
    .header_search_itemInput {
      position: relative;
      float: left;
      margin-left: 12px;
      input {
        width: 208px;
        height: 22px;
        padding-left: 12px;
        background: rgba(0, 0, 0, 0.15);
        color: #fff;
        font-size: 12px;
        border: 0;
        border-radius: 12.5px;
      }
      .el-icon-search {
        position: absolute;
        font-size: 12px;
        right: 12px;
        top: 50%;
        transform: translateY(-37%);
        color: rgba(255, 255, 255, 0.3);
        cursor: pointer;
      }
      .el-icon-search:hover {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
  .header_user {
    width: 340px;
    float: right;
    .header_user_login {
      float: left;
      position: relative;
      width: 110px;
      color: rgba(255, 255, 255, 0.5);
      text-align: center;
      cursor: pointer;
      .header_user_login_item1 {
        position: absolute;
        display: block;
        float: left;
        width: 25px;
        height: 25px;
        line-height: 25px;
        background-color: #e1e3e4;
        color: #fff;
        border-radius: 50%;
        top: 50%;
        transform: translateY(-50%);
        i {
          font-size: 16px;
        }
      }
      .header_user_login_item2 {
        margin-left: 10px;
      }
      .header_user_login_item2:hover {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    .header_user_setUp {
      float: right;
      width: 230px;
      height: 50px;
      i {
        margin: 0 18px;
        font-size: 20px;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
      }
      i:hover {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
.main {
  width: 100%;
  height: 570px;
  .listenList {
    float: left;
    width: 200px;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    .listenList_item_color {
      color: #5c5c5c;
    }
    .listenList_item div {
      padding-left: 18px;
      height: 35px;
      line-height: 35px;
      font-size: 16px;
      // cursor: pointer;
      span {
        margin-left: 12px;
        font-size: 14px;
      }
    }
    .listenList_item div:hover {
      color: #000;
    }
  }
  .mainPage {
    float: left;
    width: 822px;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
  }
}
.footer {
  width: 100%;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.5);
  // border-top: 1px solid #e1e1e2;
}

.isRecommendStyle {
  background: rgba(255, 255, 255, 0.6);
  color: #000;
}

*::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.3);
}
*:-moz-placeholder {
  color: rgba(255, 255, 255, 0.3);
}
*:-ms-input-placeholder {
  /* IE10+ */
  color: rgba(255, 255, 255, 0.3);
}
</style>
