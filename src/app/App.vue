<template>
  <div class="header">
    <img
      src="@/assets/history-img.jpg"
      class="logo"
    >
    <div
      :class="{ unchecked: page !== 'PushRecords' }"
      @click="setPage('PushRecords')"
    >
      <img
        v-if="page === 'PushRecords'"
        src="@/assets/lishi.png"
      >
      <img
        v-else
        src="@/assets/lishi2.png"
      >
      历史记录
    </div>
    <div
      :class="{ unchecked: page !== 'HonorPage' }"
      @click="setPage('HonorPage')"
    >
      <img
        v-if="page !== 'HonorPage'"
        src="@/assets/rongyubiaozhang2.png"
      >
      <img
        v-else
        src="@/assets/rongyubiaozhang.png"
      >
      荣誉墙
    </div>
  </div>
  <PushRecords v-show="page === 'PushRecords'" />
  <HonorPage v-show="page === 'HonorPage'" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PushRecords from './views/PushRecords.vue';
import HonorPage from './views/HonorPage.vue';

export default defineComponent({
  name: 'App',
  components: {
    PushRecords,
    HonorPage,
  },
  data() {
    return {
      page: 'PushRecords',
    };
  },
  methods: {
    setPage(page: string) {
      this.page = page;
    },
  },
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
  background: #eee;
  font-weight: bold;
  line-height: 55px;
  font-size: 18px;
  .logo {
    margin: 0 100px 0 20px;
    width: 28px;
  }
  img {
    width: 24px;
    vertical-align: -0.34em;
  }
  & > div {
    margin-left: 10px;
    cursor: pointer;
  }
  .unchecked {
    color: gray;
  }
}
</style>
