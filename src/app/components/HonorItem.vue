<template>
  <div
    v-if="videoInfo.pic && videoInfo.title"
    class="wrap"
    @click="handleClickItem"
  >
    <div class="content">
      <div class="time">
        <img
          src="@/assets/honor-time.png"
          alt="时间"
        >
        {{ createdAt.format('YYYY.MM.DD') }}
      </div>
      <div>
        <img
          class="img"
          alt="视频封面"
          :src="videoInfo.pic"
        >
        <div class="title">
          {{ videoInfo.title }}
        </div>
        <div class="info">
          <span>
            {{ createdAt.format('YYYY.MM.DD') }}
            <img
              src="@/assets/honor-zuji.png"
              alt="足迹"
            >
          </span>
          <span>
            {{ videoInfo.owner.name }}
            <img
              src="@/assets/honor-up.png"
              alt="UP"
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { defineComponent, PropType, ref } from 'vue';
import { RecordDetailItem } from '../types';
import { biliClient } from '../apis';

export default defineComponent({
  props: {
    /** 视频 BV 号 */
    bvid: { type: String, required: true },
    /** 创建时间 */
    createdAt: { type: Object as PropType<Dayjs>, required: true },
    /** 首条数据 */
    isFirst: { type: Boolean, required: true },
    /** 是否展示在左边 */
    isLeft: { type: Boolean, required: true },
  },
  setup(props) {
    /** 视频信息 */
    const videoInfo = ref<RecordDetailItem>({
      bvid: props.bvid,
      createdAt: props.createdAt,
      aid: 0,
      videos: 0,
      tid: 0,
      tname: '',
      copyright: 1,
      pic: '',
      title: '',
      pubdate: dayjs(),
      ctime: dayjs(),
      desc: '',
      state: 0,
      duration: 0,
      owner: {
        mid: 0,
        name: '',
        face: '',
      },
      stat: {
        aid: 0,
        view: 0,
        danmaku: 0,
        reply: 0,
        favorite: 0,
        coin: 0,
        share: 0,
        nowRank: 0,
        hisRank: 0,
        like: 0,
        dislike: 0,
        evaluation: '',
      },
      cid: 0,
      pages: [],
    });

    // 获取视频信息
    biliClient
      .getVideoInfo({ bvid: props.bvid, createdAt: props.createdAt })
      .then((data) => {
        videoInfo.value = data;
      });

    return {
      /** 视频信息 */
      videoInfo,
    };
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
