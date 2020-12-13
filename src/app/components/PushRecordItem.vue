<template>
  <div
    v-if="videoInfo.pic && videoInfo.title"
    class="wrap"
    @click="handleClickItem"
  >
    <div
      v-if="isFirst"
      class="time__tag"
    >
      {{ createdAt.format('MM月DD日') }}
    </div>
    <div class="time">
      <div class="arrow" />
      {{ createdAt.format('YYYY.MM.DD') }}
    </div>
    <img
      class="img"
      :src="videoInfo.pic"
    >
    <div
      class="content"
      :class="{ last: isLast }"
    >
      <div class="title">
        {{ videoInfo.title }}
      </div>
      <div class="info__wrap">
        <div class="info__left">
          <div class="desc">
            {{ videoInfo.desc }}
          </div>
        </div>
        <div class="info__right">
          <span>UP主:{{ videoInfo.owner.name }}</span>
          <div class="info__other">
            <span><i class="view" />{{ videoInfo.stat.view }}</span>
            <span><i class="coin" />{{ videoInfo.stat.coin }}</span>
            <span
              style="margin-right: 0"
            ><i class="like" />{{ videoInfo.stat.like }}</span>
            <span><i class="favorite" />{{ videoInfo.stat.favorite }}</span>
          </div>
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
@item-height: 140px;

.wrap {
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

  .time__tag {
    position: absolute;
    left: -100px;
    top: 24px;
    background: #58b3e6;
    color: white;
    font-size: 13px;
    padding: 8px;

    &::before {
      content: ' ';
      position: absolute;
      right: -20px;
      width: 0;
      height: 0;
      border: 10px solid;
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
    display: flex;
    flex-direction: column;
    position: relative;

    &.last {
      border-bottom: 2px dashed #58b3e6;
    }

    .title {
      font-size: 15px;
      font-weight: bold;
      color: black;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      width: 503px;
    }

    .info__wrap {
      flex: 1;

      .info__left {
        margin-right: 200px;

        .desc {
          color: #99a2aa;
          margin-top: 10px;
          height: 40px;
          font-size: 13px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      .info__right {
        font-size: 13px;
        position: absolute;
        right: 16px;
        bottom: 16px;
        color: #99a2aa;

        & > span:first-child {
          margin-left: 16px;
        }

        .info__other {
          display: flex;
          flex-direction: row;
          span {
            margin-right: 8px;
          }
          i {
            width: 24px;
            height: 24px;
            vertical-align: -6px;
            display: inline-block;
            background-image: url('../../assets/icons.png');
            background-repeat: no-repeat;
          }
          .view {
            background-position-x: -648px;
            background-position-y: -1300px;
            width: 36px;
            height: 36px;
            transform: scale(0.75);
            vertical-align: -17px;
          }
          .coin {
            background-position-x: -724px;
            background-position-y: -2003px;
          }
          .like {
            background-position-x: -722px;
            background-position-y: -2194px;
          }
          .favorite {
            width: 36px;
            height: 36px;
            transform: scale(0.75);
            background-position-x: -715px;
            background-position-y: -403px;
            vertical-align: -18px;
          }
        }
      }
    }
  }
}
</style>
