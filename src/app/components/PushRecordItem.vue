<template>
  <div
    class="wrap"
    @click="handleClickItem"
  >
    <img
      class="img"
      :src="img"
    >
    <div class="content">
      <div
        class="title"
      >
        {{ title }}
      </div>
      <div style="flex: 1" />
      <div class="desc">
        <span>播放量:{{ play }}</span>
        <span class="item">{{ tag }}</span>
        <span class="item">作者:{{ author }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    /** 图片 */
    img: { type: String, required: true },
    /** 标题 */
    title: { type: String, required: true },
    /** 作者 */
    author: { type: String, required: true },
    /** 更新时间 */
    pubdate: { type: String, required: true },
    /** 播放量 */
    play: { type: String, required: true },
    /** 标签 */
    tag: { type: String, required: true },
    /** bv 号 */
    bvid: { type: String, required: true },
  },
  methods: {
    /** 处理点击纪录项 */
    handleClickItem() {
      window.open(`https://www.bilibili.com/video/${this.bvid}`);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .wrap {
    padding: 14px;
    display: flex;
    height: 128px;
    text-align: left;
    cursor: pointer;
    border-radius: 8px;
    &:hover {
      background: #eee;
    }

    .img {
      width: 160px;
      background: gray;
      border-radius: 4px;
      margin-right: 30px;
    }

    .content {
      flex: 1;
      border-bottom: 1px #eee solid;
      padding: 0 0 16px;
      display: flex;
      flex-direction: column;

      .title {
        font-size: 15px;
        font-weight: bold;
        color: black;
      }

      .desc {
        font-size: 13px;
        .item{
          margin-left: 100px;
        }
      }
    }
  }
</style>
