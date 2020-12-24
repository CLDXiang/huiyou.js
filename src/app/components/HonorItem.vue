<template>
  <div
    v-if="pic && title"
    class="wrap"
    @click="handleClickItem"
  >
    <div class="content">
      <div class="time">
        <img
          src="img/honor-time.png"
          alt="时间"
        >
        {{ createdAt.format('YYYY.MM.DD') }}
      </div>
      <div>
        <img
          class="img"
          alt="视频封面"
          :src="pic"
        >
        <div class="title">
          {{ title }}
        </div>
        <div class="info">
          <span>
            {{ createdAt.format('YYYY.MM.DD') }}
            <img
              src="img/honor-zuji.png"
              alt="足迹"
            >
          </span>
          <span>
            {{ author }}
            <img
              src="img/honor-up.png"
              alt="UP"
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Dayjs } from 'dayjs';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    /** 视频 BV 号 */
    bvid: { type: String, required: true },
    /** 视频封面 */
    pic: { type: String, required: true },
    author: { type: String, required: true },
    title: { type: String, required: true },
    /** 创建时间 */
    createdAt: { type: Object as PropType<Dayjs>, required: true },
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
@item-height: 250px;

.wrap:first-child {
  margin-left: 50%;
}
.wrap:nth-child(2n + 1) {
  border-left: 2px solid #00a1d6;
}
.wrap:nth-child(2n) {
  top: -@item-height / 2;
  text-align: right;
  .content {
    flex-direction: row-reverse;
  }
}
.wrap {
  width: 50%;
  position: relative;
  display: inline-block;
  height: @item-height;
  cursor: pointer;
  box-sizing: border-box;
  transition: background 0.3s ease-in-out;
  &:hover {
    background: #eee;
  }
  .content {
    display: flex;
    flex-direction: row;
  }
  .time {
    border-bottom: 1px dashed #58b3e6;
    line-height: 32px;
    height: 32px;
    color: #58b3e6;
    width: 100px;
    font-size: 14px;
    margin: 20px 12px;
    text-align: center;
    img {
      width: 18px;
    }
  }
  .img {
    width: 200px;
    background: gray;
    border-radius: 4px;
    margin: 16px 0;
  }
  .title {
    text-align: left;
    font-size: 15px;
    font-weight: bold;
    color: black;
    width: 370px;
    height: 40px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .info {
    font-size: 14px;
    margin-top: 16px;
    & > span {
      margin-right: 20px;
      img {
        width: 16px;
        vertical-align: -0.125em;
        margin-left: 6px;
      }
    }
  }
}
</style>
