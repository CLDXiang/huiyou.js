<template>
  <img
    alt="Vue logo"
    src="../assets/logo.png"
  >
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { testClient } from '@/apis';
import logger from '@/utils/logger';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
  mounted() {
    // FIXME: 测试用，过后删去
    testClient.test({ uid: 'bili_5249176387' }).then((data) => {
      logger.log(data);
    });
  },
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
