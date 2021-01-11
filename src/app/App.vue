<template>
  <div class="header">
    <img
      src="img/history-img.jpg"
      alt="logo"
      class="logo"
    >
    推送记录
  </div>
  <PushRecords />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PushRecords from './views/PushRecords.vue';

export default defineComponent({
  name: 'App',
  components: {
    PushRecords,
  },
});
</script>

<style lang="less">
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica,
    Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  margin: 0;
}
.header {
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 55px;
  font-size: 18px;
  .logo {
    margin: 0 8px 0 20px;
    width: 28px;
  }
}
</style>
