<template>
  <div class=".loading"></div>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style lang="less" scoped>
.loading {
  // position: fixed;
  // left: 0;
  // top: 0;
  background: url("../../assets/svg/tail-spin.svg") center center no-repeat
    rgba(255, 255, 255, 0.6);
  width: 100%;
  height: 100%;
  z-index: 1000;
}
</style>