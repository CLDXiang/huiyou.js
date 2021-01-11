<template>
  <div
    v-if="videoInfo.pic && videoInfo.title"
    class="record"
    @click="handleClickItem"
  >
    <div
      v-if="isFirst"
      class="time-tag"
    >
      {{ createdAt.format('MM月DD日') }}
    </div>
    <div class="time">
      <div class="arrow" />
      {{ createdAt.format('HH:mm:ss') }}
    </div>
    <img
      class="img"
      alt="视频封面"
      :src="videoInfo.pic"
    >
    <div
      class="content"
      :class="{ last: isLast }"
    >
      <div class="title">
        {{ videoInfo.title }}
      </div>
      <div class="info">
        <div class="info__desc">
          {{ videoInfo.desc }}
        </div>
        <div class="info__bottom">
          <!-- eslint-disable max-len -->
          <span
            class="info__up"
          ><svg
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
          >
            <path
              d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z"
              fill="currentColor"
            />
            <path
              d="M419.2 544c0 51.2-3.2 108.8-83.2 108.8S252.8 595.2 252.8 544v-217.6H192v243.2c0 96 51.2 140.8 140.8 140.8 89.6 0 147.2-48 147.2-144v-240h-60.8V544zM710.4 326.4h-156.8V704h60.8v-147.2h96c102.4 0 121.6-67.2 121.6-115.2 0-44.8-19.2-115.2-121.6-115.2z m-3.2 179.2h-92.8V384h92.8c32 0 60.8 12.8 60.8 60.8 0 44.8-32 60.8-60.8 60.8z"
              fill="currentColor"
            /></svg>{{ videoInfo.owner.name }}</span>
          <span class="info__stats">
            <span><svg
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
            >
              <path
                d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z"
                fill="currentColor"
              />
              <path
                d="M684.8 483.2l-256-112c-22.4-9.6-44.8 6.4-44.8 28.8v224c0 22.4 22.4 38.4 44.8 28.8l256-112c25.6-9.6 25.6-48 0-57.6z"
                fill="currentColor"
              /></svg>{{ videoInfo.stat.view }}</span>
            <span><svg
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
            >
              <path
                d="M512 64c246.4 0 448 198.4 448 448 0 246.4-201.6 448-448 448-249.6 0-448-201.6-448-448C64 262.4 262.4 64 512 64z m28.8 300.8v70.4h172.8v230.4h-57.6v-176h-115.2V896c198.4-16 355.2-182.4 355.2-384 0-214.4-172.8-384-384-384C297.6 128 128 297.6 128 512c0 201.6 156.8 368 355.2 384V492.8h-115.2v176H310.4v-233.6h172.8v-67.2l-169.6 16-3.2-28.8-3.2-28.8 403.2-35.2 3.2 28.8 3.2 28.8-176 16z"
                fill="currentColor"
              /></svg>{{ videoInfo.stat.coin }}</span>
            <span><svg
              class="icon"
              viewBox="0 -64 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
            >
              <path
                d="M860.8 300.8h-297.6l6.4-67.2 9.6-118.4c3.2-16-6.4-32-22.4-35.2-9.6-3.2-22.4 0-28.8 9.6l-147.2 188.8-19.2 25.6h-192c-6.4 0-12.8 3.2-19.2 6.4-19.2 9.6-28.8 28.8-28.8 48v342.4c0 9.6 3.2 22.4 9.6 28.8 9.6 19.2 28.8 28.8 48 25.6h537.6c12.8 0 22.4-3.2 32-9.6 25.6-12.8 44.8-35.2 48-64l102.4-336 57.6 12.8-57.6-12.8c3.2-9.6 0-22.4-3.2-32-9.6-6.4-22.4-12.8-35.2-12.8l6.4-57.6-6.4 57.6z m-233.6-57.6h240c28.8 0 57.6 12.8 76.8 38.4 16 22.4 19.2 54.4 12.8 80l-102.4 339.2c-16 64-70.4 108.8-137.6 112H179.2c-41.6 3.2-80-19.2-99.2-54.4-9.6-19.2-16-38.4-16-57.6V358.4c0-41.6 22.4-80 57.6-99.2 19.2-9.6 38.4-12.8 57.6-16h144L480 48c32-35.2 89.6-38.4 124.8-6.4 19.2 19.2 32 44.8 28.8 73.6l-6.4 128z m-323.2 512h57.6V304H304v451.2z"
                fill="currentColor"
              /></svg>{{ videoInfo.stat.like }}</span>
            <span>
              <svg
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
              >
                <path
                  d="M905.6 355.2l-166.4-25.6c-41.6-6.4-80-35.2-96-73.6l-73.6-153.6c-22.4-51.2-92.8-51.2-118.4 0L380.8 256c-19.2 38.4-54.4 67.2-96 73.6l-166.4 25.6c-51.2 6.4-73.6 70.4-35.2 108.8l124.8 128c28.8 28.8 41.6 70.4 35.2 112l-28.8 179.2c-9.6 54.4 48 92.8 96 67.2l140.8-76.8c38.4-22.4 86.4-22.4 124.8 0l140.8 76.8c48 25.6 102.4-12.8 96-67.2l-32-179.2c-6.4-41.6 6.4-83.2 35.2-112l124.8-128c38.4-38.4 16-102.4-35.2-108.8z m-28.8 83.2l-105.6 108.8c-41.6 41.6-60.8 102.4-51.2 163.2l25.6 153.6c3.2 12.8-12.8 22.4-22.4 16l-118.4-64c-57.6-32-128-32-185.6 0l-118.4 64c-12.8 6.4-25.6-3.2-22.4-16l25.6-153.6c9.6-57.6-9.6-118.4-51.2-163.2l-105.6-108.8c-9.6-9.6-3.2-25.6 9.6-25.6l134.4-19.2c64-9.6 118.4-51.2 144-108.8l60.8-131.2c6.4-12.8 22.4-12.8 28.8 0l60.8 131.2c25.6 57.6 80 96 144 105.6l134.4 19.2c16 6.4 19.2 19.2 12.8 28.8z"
                  fill="currentColor"
                /></svg>{{ videoInfo.stat.favorite }}</span>
            <!-- eslint-enable max-len -->
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

// TODO: 播放量格式化：@/src/videoInfo

export default defineComponent({
  props: {
    /** 视频 BV 号 */
    bvid: { type: String, required: true },
    /** 创建时间 */
    createdAt: { type: Object as PropType<Dayjs>, required: true },
    /** 按天分隔首条数据 */
    isFirst: { type: Boolean, required: true },
    /** 按天分隔最后一条数据 */
    isLast: { type: Boolean, required: true },
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
@item-height: 140px;
@title-height: 20px;

.record {
  position: relative;
  display: flex;
  height: @item-height;
  text-align: left;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background: #eee;
  }

  transition: background 0.3s ease-in-out;

  .time-tag {
    position: absolute;
    left: -86px;
    top: 24px;
    background: #58b3e6;
    color: #fff;
    font-size: 14px;
    padding: 0 8px;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;

    &::before {
      content: ' ';
      position: absolute;
      right: -10px;
      width: 0;
      height: 0;
      border: 5px solid;
      border-color: transparent transparent transparent #58b3e6;
    }
  }

  .time {
    line-height: @item-height;
    padding: 0 36px;
    color: #99a2aa;
    border-left: 1px solid #e5e9ef;
    position: relative;

    .arrow {
      position: absolute;
      left: 0;
      top: calc(@item-height / 2 - 6px);
      width: 0;
      height: 0;
      border: 6px solid;
      border-color: transparent transparent transparent #e5e9ef;
    }
  }

  .img {
    width: 160px;
    background: gray;
    border-radius: 4px;
    margin: 16px 0;
  }

  .content {
    flex: 1;
    padding: 16px 32px;

    &.last {
      border-bottom: 2px dashed #58b3e6;
    }

    .title {
      height: @title-height;
      font-size: 14px;
      font-weight: bold;
      color: #222;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }

    .info {
      height: calc(100% - @title-height);
      display: flex;
      flex-direction: column;
      color: #99a2aa;

      .info__desc {
        flex: 1;
        margin-top: 10px;
        // height: 40px;
        font-size: 12px;
        overflow: hidden;
      }

      .info__bottom {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        margin-top: 8px;

        .icon {
          width: 18px;
          height: 18px;
          margin-right: 4px;
          color: #999;
        }

        .info__up {
          display: flex;
          align-items: center;
        }

        .info__stats {
          display: flex;
          > span {
            display: flex;
            align-items: center;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
