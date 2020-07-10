<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item,i) in dataList" :key="i" class="carouselItem">
        <a :href="item.url">
          <img :src="item.imageUrl" alt />
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "swiper",
  props: ["dataList"],
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.carouselItem {
  width: 550px;
  left: -75px;
  img {
    // width: 100%;
    height: 100%;
  }
}
</style>