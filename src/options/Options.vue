<template>
  <div class="content">
    自定义配置
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Option',
});
</script>

<style lang="less">
body {
  margin: 0;
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  > .content {
    background: #fb7299;
    color: #fff;
    padding: 20px;
    border-radius: 4px;
  }
}
</style>
