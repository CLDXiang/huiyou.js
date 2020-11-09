<template>
  <div
    class="wrap"
    @click="handleClickItem"
  >
    <img
      class="img"
      :src="videoInfo.pic"
    >
    <div class="content">
      <div
        class="title"
      >
        {{ videoInfo.title }}
      </div>
      <div style="flex: 1" />
      <div class="desc">
        <span>播放量:{{ videoInfo.stat.view }}</span>
        <span class="item">作者:{{ videoInfo.owner.name }}</span>
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
    biliClient.getVideoInfo({ bvid: props.bvid, createdAt: props.createdAt }).then((data) => {
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
    transition: background 0.3s ease-in-out;

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
