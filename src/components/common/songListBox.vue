<template>
  <div class="songListBox">
    <div class="songListBox_imgBox">
      <el-image style="width: 100%; height: 100%" lazy :src="songData.picUrl"></el-image>
      <span class="songListBox_views">
        <i class="el-icon-headset"></i>
        {{isPlayCount}}
      </span>
      <i class="iconfont icon-play"></i>

      <slot></slot>
    </div>
    <div class="songListBox_title">
      <span>{{songData.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongListBox",
  props: ["songData"],
  data() {
    return {
      // 控制songsListItem-box的隐藏与出现
      isShow: true
    };
  },
  computed: {
    isPlayCount() {
      // console.log(this.songData);
      return this.songData.playcount > 100000
        ? (this.songData.playcount / 10000).toFixed() + "万"
        : this.songData.playcount;
    }
  }
};
</script>

<style lang="less" scoped>
.songListBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .songListBox_imgBox {
    position: relative;
    flex: 7.1;
    border: 1px solid rgba(255, 255, 255, 0.5);

    .songListBox_views {
      position: absolute;
      display: inline-block;
      font-size: 12px;
      color: #fff;
      top: 0;
      right: 0;
      line-height: 20px;
      padding-left: 40px;
      padding-right: 5px;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0),
        rgba(0, 0, 0, 0.18)
      );
    }
    .icon-play {
      display: none;
      position: absolute;
      right: 6px;
      bottom: 7px;
      font-size: 24px;
      color: rgba(255, 255, 255, 0.8);
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
    }
    .icon-play:hover {
      background-color: rgba(0, 0, 0, 0.38);
      color: #fff;
    }
  }
  .songListBox_imgBox:hover .icon-play {
    display: block;
  }
  .songListBox_title {
    flex: 2.6;
    font-size: 12px;
    line-height: 17px;
    color: #333;
    margin-top: 5px;

    span {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      // text-overflow: ellipsis;
    }
  }
}
</style>