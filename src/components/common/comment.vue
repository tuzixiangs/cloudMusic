<template>
  <div class="commentItem">
    <el-card :body-style="{padding:'10px'}">
      <!-- 热门评论区 -->
      <div class="hot" v-if="hotComment.length !==0">
        <div class="hotCommentHeader">
          <span style="font-size:18px;">热门评论</span>
        </div>
        <!-- 热门评论 -->
        <div class="hotComment">
          <div class="comment_item" v-for="(item,i) in hotComment" :key="i">
            <!-- 头像 -->
            <div class="comment_item_avatar">
              <el-image :src="item.user.avatarUrl" style="width:100%;height=100%" lazy></el-image>
            </div>
            <!-- 评论内容 -->
            <div class="comment_item_text">
              <p>
                <!-- 用户名 -->
                <span style="color:#0C73C2">{{item.user.nickname}}:</span>
                {{item.content}}
              </p>
              <!-- 回复的评论 -->
              <div class="beRepliedComment" v-if="item.beReplied.length !== 0">
                <div
                  style="background-color:rgba(255, 255, 255, 0.6);color:#666;line-height:16px;padding:8px;margin-top:2px"
                >
                  <span style="color:#0C73C2">{{item.beReplied[0].user.nickname}}:</span>
                  {{item.beReplied[0].content}}
                </div>
                <div class="clearfloat"></div>
              </div>
              <!-- 评论时间 -->
              <div class="comment_item_date">
                <span class="float:left">{{item.time | date}}</span>
                <i class="iconfont icon-like" style="font-size:13px;float:right; cursor: pointer;">
                  <span style="font-size:12px;">&nbsp;{{item.likedCount}}</span>
                </i>
              </div>
            </div>
            <!-- 清除浮动 -->
            <div class="clearfloat"></div>
          </div>
        </div>
      </div>

      <!-- 最新评论区 -->
      <div class="new" id="gonew">
        <!-- 最新评论头部 -->
        <div class="newCommentHeader">
          <span style="font-size:18px;">
            最新评论
            <span style="font-size:14px;color:#444">({{total}})</span>
          </span>
        </div>
        <div class="newComment">
          <div class="comment_item" v-for="(item,i) in newComment" :key="i">
            <!-- 用户头像 -->
            <div class="comment_item_avatar">
              <el-image :src="item.user.avatarUrl" style="width:100%;height=100%" lazy></el-image>
            </div>
            <!-- 用户的评论 -->
            <div class="comment_item_text">
              <p>
                <!-- 用户昵称 -->
                <span style="color:#0C73C2">{{item.user.nickname}}:</span>
                {{item.content}}
              </p>
              <!-- 回复的评论 -->
              <div class="beRepliedComment" v-if="item.beReplied.length !== 0">
                <div
                  style="background-color:rgba(255, 255, 255, 0.6);color:#666;line-height:16px;padding:8px;margin-top:2px"
                >
                  <span style="color:#0C73C2">{{item.beReplied[0].user.nickname}}:</span>
                  {{item.beReplied[0].content}}
                </div>
                <!-- 清除父盒子浮动让父盒子自适应高度 -->
                <div class="clearfloat"></div>
              </div>
              <!-- 评论时间 -->
              <div class="comment_item_date">
                <span class="float:left">{{item.time | date}}</span>
                <i class="iconfont icon-like" style="font-size:13px;float:right; cursor: pointer;">
                  <span style="font-size:12px;">&nbsp;{{item.likedCount}}</span>
                </i>
              </div>
            </div>
            <!-- 清除父盒子浮动让父盒子自适应高度 -->
            <div class="clearfloat"></div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { get } from "../../network/http";
export default {
  name: "commentItem",
  props: ["hotComment", "newComment", "total"],
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.commentItem {
  width: 100%;
  .hotComment,
  .newComment {
    width: 100%;
    .comment_item {
      margin: 20px 0;
      width: 100%;
      height: 100%;
      font-size: 12px;
      color: #333;
      cursor: text;
      .comment_item_avatar {
        float: left;
        margin-right: 12px;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        overflow: hidden;
      }
      .comment_item_text {
        float: left;
        width: 710px;
        p {
          line-height: 18px;
        }
        .comment_item_date {
          line-height: 22px;
          margin: 5px 0 10px 0;
          color: #666;
        }
      }
    }
  }
  .hotCommentHeader,
  .newCommentHeader {
    line-height: 38px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  }
  .newCommentHeader {
    margin-top: 40px;
  }

  // 修改卡片内部样式
  /deep/ .el-card {
    margin-top: 0;
    box-shadow: 0;
    border: 0;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0;

    .el-card__body {
      padding: 10px 0;
    }
  }
}
</style>