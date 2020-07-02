<template>
  <div id="findMusic">
    <div class="c-search-table beauty-Scroll">
      <el-scrollbar :native="true">
        <!-- tabs标签栏 -->
        <el-tabs tab-position="top" style="height: 200px;">
          <!-- 个性推荐页 -->
          <el-tab-pane label="个性推荐">
            <!-- 轮播图 -->
            <swiper :dataList="bannerList"></swiper>
            <!-- 歌单推荐区 -->
            <el-card :body-style="{padding:'10px'}">
              <div slot="header">
                <span style="font-size:18px;">推荐歌单</span>
                <span
                  style="float: right; padding: 3px 0; cursor: pointer;font-size:12px"
                  class="card_header_right_item"
                >
                  <span>更多</span>
                  <i class="el-icon-arrow-right"></i>
                </span>
              </div>
              <!-- 推荐歌单列表 -->
              <div class="songsList">
                <div class="songsListItem">
                  <div class="dayRecommendBox" @mouseover="isShow=true" @mouseout="isShow=false">
                    <div class="dayRecommendBox_week">{{getWeek}}</div>
                    <div class="dayRecommendBox_day">{{getDay}}</div>
                    <el-collapse-transition>
                      <div class="songsListItem-box" v-show="isShow">
                        <p>根据您的音乐口味生成每日更新</p>
                      </div>
                    </el-collapse-transition>
                  </div>
                  <div class="dayRecommendBox_title">每日歌曲推荐</div>
                </div>
                <div
                  class="songsListItem"
                  v-for="item in songsListData"
                  :key="item.id"
                  @mouseover="showSongItemBox(item.id)"
                  @mouseout="activeID= -1"
                >
                  <song-list-box :songData="item">
                    <el-collapse-transition>
                      <div class="songsListItem-box" v-show="activeID==item.id">
                        <p>{{item.copywriter}}</p>
                      </div>
                    </el-collapse-transition>
                  </song-list-box>
                </div>
              </div>
            </el-card>
          </el-tab-pane>
          <!-- 歌单页 -->
          <el-tab-pane label="歌单">歌单</el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import swiper from "components/common/swiper.vue";
import songListBox from "components/common/songListBox.vue";
import { get, post } from "../../network/http";

export default {
  name: "FindMusic",
  data() {
    return {
      // 轮播图数据
      bannerList: [],
      // 推荐歌单数据
      songsListData: [],
      // 获得每个songsListItem-box的ID
      activeID: -1,
      // 控制显示
      isShow: false
    };
  },
  components: {
    swiper,
    songListBox
  },
  created() {
    const that = this;
    this.$http.all([that.getBannerList(), that.getSongsList()]).then(
      that.$http.spread((res1, res2) => {
        // console.log(res1);
        console.log(res2);
        if (res1.status !== 200) {
          return console.log(res1.statusText);
        } else if (res2.status !== 200) {
          return console.log(res2.statusText);
        }
        that.bannerList = res1.data.banners;
        that.songsListData = res2.data.result;
      })
    );
  },
  methods: {
    // 获得banner
    async getBannerList() {
      return await get("/banner");
    },
    // 获得推荐歌单
    async getSongsList() {
      return await get("/personalized?limit=29");
    },
    showSongItemBox(id) {
      this.activeID = id;
    }
  },
  computed: {
    // 获得星期几
    getWeek() {
      let nowDate = new Date();
      let weekDay = [
        "星期天",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      return weekDay[nowDate.getDay()];
    },
    // 获得现在是几日
    getDay() {
      let nowDate = new Date();
      return nowDate.getDate();
    }
  }
};
</script>

<style lang="less" scoped>
.card_header_right_item {
  color: #666;
}
.card_header_right_item:hover {
  color: #444;
}
/deep/ .el-card {
  margin-top: -5px;
  box-shadow: 0;
  border: 0;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 0;
  .el-card__header {
    padding: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  }
  .el-card__body {
    padding: 10px 0;
  }
}
.songsList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .songsListItem {
    width: 140px;
    height: 195px;
    margin-bottom: 10px;
    .songsListItem-box {
      // display: none;
      position: absolute;
      top: 0;
      left: 0;
      height: 48px;
      width: 100%;
      font-size: 12px;
      color: #fff;
      // padding: 5px;
      background-color: rgba(0, 0, 0, 0.3);
      p {
        padding: 5px 5px 0 7px;
        line-height: 18px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        // text-overflow: ellipsis;
      }
    }
    .dayRecommendBox {
      position: relative;
      width: 138px;
      height: 144px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      background-color: rgba(255, 255, 255, 0.5);
      .dayRecommendBox_week {
        color: #666666;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
      }
      .dayRecommendBox_day {
        color: #c62f2f;
        font-size: 100px;
        text-align: center;
        line-height: 84px;
      }
    }
    .dayRecommendBox_title {
      padding-top: 5px;
      width: 140px;
      height: 39px;
      line-height: 17px;
      font-size: 12px;
      color: #333;
    }
  }
}

// 修改ui组件内部样式
/deep/ .el-tabs {
  padding: 0 20px;
  .el-tabs__header {
    .el-tabs__nav {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .el-tabs__item {
        display: flex;
        flex: 1;
        justify-content: center;
        // margin: 0 50px;
      }
    }
  }

  .el-tabs__nav-wrap::after {
    width: 0;
    height: 0;
  }
  .el-tabs__item {
    color: #333;
  }
  .el-tabs__active-bar {
    // width: 100px !important;
    background-color: rgba(198, 47, 47, 0.6);
  }
  .is-active,
  .el-tabs__item:hover {
    color: rgba(198, 47, 47, 0.9);
  }
}
</style>