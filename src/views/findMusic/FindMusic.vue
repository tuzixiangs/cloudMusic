<template>
  <div id="findMusic" class="box">
    <div class="c-search-table beauty-Scroll">
      <el-scrollbar>
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
                <div class="songsListItem" v-for="item in songsListData" :key="item.id">
                  <song-list-box :songData="item"></song-list-box>
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

export default {
  name: "FindMusic",
  data() {
    return {
      // 轮播图数据
      bannerList: [],
      // 推荐歌单数据
      songsListData: []
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
        // console.log(res2);
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
      return await this.$http.get("/banner");
    },
    // 获得推荐歌单
    async getSongsList() {
      return await this.$http.get("/personalized?limit=10");
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
    // background-color: skyblue;
    margin-bottom: 10px;
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