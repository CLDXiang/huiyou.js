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
      <div class="info__wrap">
        <div class="info__left">
          <div class="desc">
            {{ videoInfo.desc }}
          </div>
        </div>
        <div class="info__right">
          <span>UP主:{{ videoInfo.owner.name }}</span>
          <div class="info__other">
            <span><svg
              class="icon view"
              width="24px"
              height="24px"
              viewBox="0 0 1024 1024"
              fill="#1296db"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- eslint-disable-next-line max-len -->
              <path d="M511.996 1.28C229.933 1.28 1.276 229.937 1.276 512s228.657 510.72 510.72 510.72c282.07 0 510.72-228.657 510.72-510.72 0.004-282.067-228.65-510.72-510.72-510.72z m249.46 520.727c-25.906 15.157-329.382 192.31-344.566 201.08-18.953 10.96-38.122-2.982-38.122-21.717V298.4c0-20.641 21.186-30.664 37.342-21.583 22.07 12.371 326.692 190.424 345.345 201.534 16.733 9.969 17.006 33.703 0 43.656z" />
            </svg>{{ videoInfo.stat.view }}</span>
            <span><svg
              class="icon coin"
              width="24px"
              height="24px"
              viewBox="0 0 1024 1024"
              fill="#1296db"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- eslint-disable-next-line max-len -->
              <path d="M512 0C228.693333 0 0 228.693333 0 512s228.693333 512 512 512 512-228.693333 512-512S795.306667 0 512 0z m204.8 423.253333v218.453334c0 34.133333-17.066667 51.2-47.786667 51.2h-47.786666l-10.24-40.96h47.786666c13.653333 0 20.48-6.826667 20.48-20.48v-174.08h-139.946666v300.373333h-40.96v-300.373333h-139.946667v232.106666H320.853333v-273.066666h177.493334V337.92c-64.853333 3.413333-133.12 6.826667-204.8 6.826667L279.893333 307.2c177.493333 0 327.68-17.066667 443.733334-44.373333l20.48 34.133333c-58.026667 17.066667-126.293333 27.306667-204.8 37.546667v88.746666H716.8z" />
            </svg>{{ videoInfo.stat.coin }}</span>
            <span><svg
              class="icon like"
              width="24px"
              height="24px"
              viewBox="0 0 1024 1024"
              fill="#1296db"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- eslint-disable-next-line max-len -->
              <path d="M939.358266 410.159945H666.684894C772.374573 19.898057 593.892003 0 593.892003 0c-75.592618 0-59.994141 59.794161-65.693585 69.793184 0 190.781369-202.680207 340.366761-202.680207 340.366761v541.147154c0 53.394786 72.792891 72.692901 101.390099 72.692901h409.659994c38.596231 0 69.993165-101.090128 69.993165-101.090128C1007.951567 578.243531 1007.951567 475.75354 1007.951567 475.75354c-0.09999-71.293038-68.593301-65.593594-68.593301-65.593595zM213.629138 410.259936H50.345083c-33.696709 0-34.19666 33.096768-34.19666 33.096767l33.696709 545.746705c0 34.696612 34.796602 34.696612 34.796602 34.696612h141.286203c29.397129 0 29.197149-22.997754 29.197148-22.997755V451.655893c0-41.895909-41.495948-41.395957-41.495947-41.395957z" />
            </svg>{{ videoInfo.stat.like }}</span>
            <span><svg
              class="icon favorite"
              width="24px"
              height="24px"
              viewBox="0 0 1064 1024"
              fill="#FE8932"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- eslint-disable-next-line max-len -->
              <path d="M744.257079 255.247571a8.432825 8.432825 0 0 0 5.421102 3.955397l227.605974 50.697343a109.606652 109.606652 0 0 1 58.387277 179.438478l-154.6018 175.402769a8.432825 8.432825 0 0 0-2.06805 6.364776l22.286753 232.826294a109.606652 109.606652 0 0 1-152.895156 110.911733l-213.812281-93.142565a7.669856 7.669856 0 0 0-6.103759 0l-213.83236 93.162643a109.606652 109.606652 0 0 1-152.855-110.931811l22.286753-232.826294a8.432825 8.432825 0 0 0-2.088128-6.364776l-154.6018-175.402769a109.606652 109.606652 0 0 1 58.387278-179.438478l227.585895-50.697343a8.432825 8.432825 0 0 0 5.441181-3.955397l118.260337-201.163043a109.606652 109.606652 0 0 1 188.935446 0l118.260338 201.163043z" />
            </svg>{{ videoInfo.stat.favorite }}</span>
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
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      .info__right {
        font-size: 12px;
        position: absolute;
        right: 16px;
        bottom: 16px;
        color: #99a2aa;
        text-align: right;

        .info__other {
          display: flex;
          flex-direction: row;
          margin-top: 4px;

          span {
            margin-right: 8px;
            display: flex;
            align-items: center;

            &:last-child {
              margin-right: 0;
            }
          }

          .icon {
            width: 20px;
            height: 20px;
            margin-right: 4px;
          }
        }
      }
    }
  }
}
</style>
