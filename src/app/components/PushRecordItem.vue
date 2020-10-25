<template>
  <div class="wrap">
    <img
      class="img"
      :src="img"
    >
    <div class="content">
      <div
        class="title"
        @click="link"
      >
        {{ title }}
      </div>
      <div style="flex: 1" />
      <div class="desc">
        <span>播放量:{{ play }}</span>
        <span style="margin-left: 100px">{{ tag }}</span>
        <span style="margin-left:100px">作者:{{ author }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PushRecordItem',
  props: {
    img: String,
    title: String,
    author: String,
    pubdate: String,
    type: String,
    play: String,
    tag: String,
    bv: String,
  },
  methods: {
    link() {
      window.open(`https://www.bilibili.com/video/${this.bv}`);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .wrap{
    margin: 14px 0;
    display: flex;
    flex-direction: row;
    height: 100px;
    text-align: left;
    .img{
      width: 160px;
      background: red;
      border-radius: 4px;
      margin-right: 30px;
    }
    .content{
      flex: 1;
      border-bottom: 1px #eee solid;
      padding: 0 0 16px;
      display: flex;
      flex-direction: column;
      .title{
        font-size: 15px;
        font-weight: bold;
        color: black;
          cursor: pointer;
      }
      .desc{
        font-size: 13px;
      }
    }
  }
</style>
