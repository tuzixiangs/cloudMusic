<template>
  <div id="privateFmPage">
    <!-- 歌曲信息 -->
    <div class="privateFmPage_songInfo">
      <!-- 左边盒子区域 -->
      <div class="privateFmPage_songInfo_left">
        <!-- 图片盒子 -->
        <div class="privateFmPage_songInfo_left_imgBox">
          <!-- 小图片 -->
          <div class="privateFmPage_songInfo_left_minImgBox" v-if="minBox">
            <el-image fit="cover" :src="songsData[i-1].picUrl" style="width:100%;height=100%" lazy></el-image>
          </div>
          <!-- 大图片 -->
          <div class="privateFmPage_songInfo_left_maxImgBox">
            <el-image fit="cover" :src="songsData[i].picUrl" style="width:100%;height=100%" lazy>
              <div slot="error">
                <i class="el-icon-loading"></i>
              </div>
            </el-image>
          </div>
          <div class="privateFmPage_songInfo_left_playBox" @click="stop">
            <i class="el-icon-video-pause" v-if="play"></i>
            <i class="el-icon-video-play" v-else></i>
          </div>
        </div>
        <!-- 按钮盒子 -->
        <div class="privateFmPage_songInfo_left_btnBox">
          <i class="iconfont icon-xihuan">
            <div></div>
          </i>
          <i class="el-icon-delete">
            <div></div>
          </i>
          <i class="iconfont icon-icon_play_next" @click="nextSong">
            <div></div>
          </i>
          <i class="el-icon-more">
            <div></div>
          </i>
        </div>
      </div>
      <!-- 右边盒子 -->
      <div class="privateFmPage_songInfo_right">
        <!-- 歌曲信息 -->
        <div class="privateFmPage_songInfo_right_topBox">
          <div class="songName">
            <p>{{songsData[i].songName}}</p>
          </div>
          <div class="alias" v-if="songsData[i].alias.length !==0">
            <p :title="songsData[i].alias[0]">{{songsData[i].alias[0]}}</p>
          </div>
          <div class="albumArtists">
            <p class="albumName">
              专辑:
              <span :title="songsData[i].albumName">{{songsData[i].albumName}}</span>
            </p>
            <p class="artistsName">
              歌手:
              <span :title="isArtistsName">{{isArtistsName}}</span>
            </p>
          </div>
        </div>
        <!-- 歌词区域 -->
        <div
          class="privateFmPage_songInfo_right_lyrics"
          :style="songsData[i].alias.length === 0 ? 'height:370px' : 'height:340px'"
        ></div>
      </div>
    </div>
    <!-- audio -->
    <!-- <audio @ended="nextSong" ref="audio" controls autoplay :src="songsData[i].songUrl"></audio> -->
    <!-- 评论区域 -->
    <div class="privateFmPage_comment">
      <comment-item
        :hotComment="songsData[i].hotComment"
        :newComment="songsData[i].newComment"
        :total="songsData[i].total"
      ></comment-item>
      <!-- 分页栏 -->
      <a href="#gonew">
        <el-pagination
          @current-change="handleCurrentChange"
          layout=" prev, pager, next"
          :total="this.songsData[i].total"
          :current-page="pageData.offset"
          :page-size="20"
        ></el-pagination>
      </a>
    </div>

    <!-- <loading v-if="isLoading"></loading> -->
  </div>
</template>

<script>
import { get } from "../../network/http";
import commentItem from "../../components/common/comment";
// import Loading from "../../components/common/loading";

export default {
  data() {
    return {
      // 歌曲数据
      songsData: [
        {
          // 封面
          picUrl: "",
          // 专辑名
          albumName: "",
          // 别名
          alias: "",
          // 歌手名字
          artistsName: [],
          // 歌曲名字
          songName: "",
          // 歌曲ID
          songId: "",
          // 歌曲url
          songUrl: "",
          // 歌词
          lyrics: "",

          // 歌曲评论
          newComment: "",
          // 热门评论
          hotComment: "",
          // 总的评论数
          total: 0
        },
        {
          // 封面
          picUrl: "",
          // 专辑名
          albumName: "",
          // 别名
          alias: "",
          // 歌手名字
          artistsName: [],
          // 歌曲名字
          songName: "",
          // 歌曲ID
          songId: "",
          // 歌曲url
          songUrl: "",
          // 歌词
          lyrics: "",
          // 歌曲评论
          newComment: "",
          // 热门评论
          hotComment: "",
          // 总的评论数
          total: 0
        },
        {
          // 封面
          picUrl: "",
          // 专辑名
          albumName: "",
          // 别名
          alias: "",
          // 歌手名字
          artistsName: [],
          // 歌曲名字
          songName: "",
          // 歌曲ID
          songId: "",
          // 歌曲url
          songUrl: "",
          // 歌词
          lyrics: "",
          // 最新评论
          newComment: "",
          // 热门评论
          hotComment: "",
          // 总的评论数
          total: 0
        },
        {
          // 封面
          picUrl: "",
          // 专辑名
          albumName: "",
          // 别名
          alias: "",
          // 歌手名字
          artistsName: [],
          // 歌曲名字
          songName: "",
          // 歌曲ID
          songId: "",
          // 歌曲url
          songUrl: "",
          // 歌词
          lyrics: "",
          // 歌曲评论
          newComment: "",
          // 热门评论
          hotComment: "",
          // 总的评论数
          total: 0
        }
      ],
      // // 控制显示歌曲的index
      // i: 1,
      // 播放按钮控制
      // play: true,
      // 控制minBox显示
      minBox: false,
      // 页面选择器数据
      pageData: {
        // 当前页码值
        offset: 1,
        // 上一页最后一项的 time
        before: ""
        //
      }
      // 控制显示加载动画
      // isLoading: true
    };
  },
  components: {
    commentItem
    // Loading
  },
  created() {
    this.getPrivateFmData();
  },
  methods: {
    // 获取歌曲信息
    async getPrivateFmData() {
      // this.i = this.$store.state.index;
      const res = await get("/personal_fm", {
        t: Date.parse(new Date())
      });
      if (res.status !== 200) {
        return console.log(res.statusText);
      }

      let data = res.data.data;
      for (let i = 1; i < 4; i++) {
        let b = i - 1;
        this.songsData[i].picUrl = data[b].album.picUrl;
        this.songsData[i].albumName = data[b].album.name;
        this.songsData[i].alias = data[b].alias;
        this.songsData[i].artistsName = data[b].artists;
        this.songsData[i].songName = data[b].name;
        this.songsData[i].songId = data[b].id;
        this.getMusicUrl(i);
        this.getLyrics(i);
        this.getHotComment(i);
      }
      // 恢复index初始值
      this.$store.commit("updatedIndex", 1);
    },
    // 获取音乐url
    async getMusicUrl(i) {
      const res = await get(`/song/url?id=${this.songsData[i].songId}`);
      if (res.status !== 200) {
        return console.log(res.statusText);
      }
      // console.log(res);
      // 判断url是否为空为空则添加url链接，实现自动播放
      if (this.$store.state.url.length === 0) {
        this.$store.commit("updatedUrl", res.data.data[0].url);
      }
      this.songsData[i].songUrl = res.data.data[0].url;
    },
    // 获取歌词
    async getLyrics(i) {
      const res = await get(`/lyric?id=${this.songsData[i].songId}`);
      if (res.status !== 200) {
        return console.log(res.statusText);
      }
      // console.log(res);

      this.songsData[i].lyrics = res.data;
    },
    // 获取评论
    async getHotComment(i) {
      const res = await get(
        `/comment/music?id=${this.songsData[i].songId}&limit=20`
      );
      if (res.status !== 200) {
        return console.log(res.statusText);
      }
      // console.log(res);
      this.songsData[i].hotComment = res.data.hotComments;
      this.songsData[i].newComment = res.data.comments;
      this.songsData[i].total = res.data.total;
    },
    // 监听 页码值 改变
    handleCurrentChange(newPage) {
      let i = this.$store.state.index;
      this.pageData.offset = newPage;
      this.pageData.before = this.songsData[i].newComment[19].time;
      this.getNextComment();
    },
    // 获取下一页评论
    async getNextComment() {
      let i = this.$store.state.index;
      const res = await get(
        `/comment/music?id=${this.songsData[i].songId}&limit=20&offset=${this.pageData.offset}&before${this.pageData.before}`
      );
      if (res.status !== 200) {
        return console.log(res.statusText);
      }
      // console.log(res);
      this.songsData[i].newComment = res.data.comments;
    },
    // 下一曲
    async nextSong() {
      if (!this.minBox) {
        this.minBox = true;
      }
      this.pageData.offset = 1;
      if (this.$store.state.index < 3) {
        return (
          this.$store.commit("updatedIndex", this.$store.state.index + 1),
          this.$store.commit(
            "updatedUrl",
            this.songsData[this.$store.state.index].songUrl
          )
        );
      }
      //索引值大于2时发起网络请求,并把最后一个歌曲数据深拷贝到第一个
      this.getPrivateFmData();
      this.songsData[0] = JSON.parse(JSON.stringify(this.songsData[3]));
    },
    // 暂停播放
    stop() {
      this.$store.commit("updatePlay", !this.$store.state.play);
    }
  },
  computed: {
    //处理歌手名字
    isArtistsName() {
      let i = this.$store.state.index;
      let data = this.songsData[i].artistsName;
      let artists = data.map(item => {
        return item.name + "/";
      });

      artists = artists.join("");
      artists = artists.slice(0, artists.length - 1);
      return artists;
    },
    // 获得state中index值
    i() {
      return this.$store.state.index;
    },
    // 获得state中play值
    play() {
      return this.$store.state.play;
    }
  },
  // 监听页面数据改变
  watch: {
    // 监听index值改变
    i(val) {
      if (!this.minBox) {
        this.minBox = true;
      }
      this.pageData.offset = 1;
      if (val < 4) {
        return this.$store.commit("updatedUrl", this.songsData[val].songUrl);
      }
      //索引值大于等于3时发起网络请求,并把最后一个歌曲数据深拷贝到第一个
      this.getPrivateFmData();
      this.songsData[0] = JSON.parse(JSON.stringify(this.songsData[3]));
    }
  },
  // 监听页面恢复
  activated() {
    console.log(this.songsData);
  },
  // 监听页面停用
  deactivated() {}
};
</script>

<style lang="less" scoped>
#privateFmPage {
  width: 100%;
  height: 100%;
  .privateFmPage_songInfo {
    padding: 30px 70px 30px 60px;
    height: 470px;
    .privateFmPage_songInfo_left {
      float: left;
      width: 335px;
      height: 100%;
      .privateFmPage_songInfo_left_imgBox {
        margin-top: 35px;
        position: relative;
        height: 300px;
        .privateFmPage_songInfo_left_minImgBox {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 240px;
          height: 240px;
        }
        .privateFmPage_songInfo_left_maxImgBox {
          position: absolute;
          right: 0;
          width: 300px;
          height: 300px;
        }
        .privateFmPage_songInfo_left_playBox {
          position: absolute;
          cursor: pointer;
          right: 4px;
          bottom: 4px;
          width: 38px;
          height: 38px;

          color: rgba(255, 255, 255, 0.7);
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          i {
            width: 38px;
            height: 38px;
            font-size: 38px;
            border-radius: 50%;
          }
        }
        .privateFmPage_songInfo_left_playBox :hover {
          color: rgba(255, 255, 255, 0.9);
          background-color: rgba(0, 0, 0, 0.5);
        }
      }
      .privateFmPage_songInfo_left_btnBox {
        float: right;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        width: 300px;
        height: 80px;
        i {
          position: relative;
          width: 42px;
          height: 42px;
          line-height: 42px;
          text-align: center;
          font-size: 20px;
          background-color: rgba(255, 255, 255, 0.6);
          border: 1px solid #ccc;
          border-radius: 50%;
          cursor: pointer;
          div {
            display: none;
            position: absolute;
            left: 0;
            top: 0;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.08);
          }
        }
        i:hover div {
          display: block;
        }
      }
    }
    .privateFmPage_songInfo_right {
      float: right;
      width: 320px;
      height: 100%;
      .privateFmPage_songInfo_right_topBox {
        div {
          margin-bottom: 14px;
        }
        .songName {
          color: #000;
          font-size: 22px;
          line-height: 28px;
          p {
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
        .alias {
          width: 100%;
          color: #555;
          p {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .albumArtists {
          font-size: 12px;
          p {
            height: 21px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            span {
              cursor: pointer;
              color: #4b7bc3;
            }
            span:hover {
              color: #0c4daf;
            }
          }
          .albumName {
            width: 180px;
            float: left;
          }
          .artistsName {
            width: 120px;
            float: right;
          }
        }
      }
      .privateFmPage_songInfo_right_lyrics {
        margin-top: 60px;
        width: 320px;

        border-right: 1px solid rgba(255, 255, 255, 0.6);
      }
    }
  }
  .privateFmPage_comment {
    width: 95%;
    margin: 0 auto;
    /deep/.el-pagination {
      margin-top: -32px;
      text-align: center;
      background: rgba(255, 255, 255, 0.3);
      .btn-prev,
      .el-pager,
      .btn-next {
        background: 0;
      }
      .el-pager li {
        background: 0;
      }
    }
  }
}
</style>