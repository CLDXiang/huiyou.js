<template>
  <div class="content">
    <div class="title">
      设置
    </div>
    <div class="click-type-options">
      <div>
        <span>气泡悬浮时长（秒）</span>
        <span>
          <input
            v-model="options.POPUP_DURATION"
            type="number"
          >
        </span>
      </div>
      <div>
        <span>推送视频播放量上限</span>
        <span>
          <input
            v-model="options.AMOUNT_OF_PLAY_UPPER_LIMIT"
            type="number"
          >
        </span>
      </div>
      <div>
        <span>推送视频长度下限（秒）</span>
        <span>
          <input
            v-model="options.VIDEO_DURATION_LOWER_LIMIT"
            type="number"
          >
        </span>
      </div>
      <div>
        <span>是否开启链式推送</span>
        <span><input
          v-model="options.USE_RECOMMEND_CHAIN"
          type="checkbox"
        ></span>
      </div>
    </div>
    <div class="input-type-options">
      <div>
        观看约 <input
          v-model="options.VIDEO_COUNT_LOWER_LIMIT"
          type="number"
        > 个视频后展示气泡
      </div>
      <div>
        视频长度超过 <input
          v-model="options.DURATION_UPPER_LIMIT"
          type="number"
        >s 不计入观看视频数量
      </div>
      <div>
        视频播放比例超过 <input
          v-model="options.PLAYED_TIME_PROPORTION_LOWER_LIMIT"
          type="number"
        >% 计入观看视频数量
      </div>
    </div>
    <div class="buttons">
      <button @click="() => setDefaultOptions()">
        默认值
      </button>
      <button @click="() => saveOptions()">
        保存
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { DEFAULT_USER_OPTIONS } from '@/config';
import logger from '@/utils/logger';
import { loadStorage, setStorage } from './utils/storage';

// TODO: tips

export default defineComponent({
  name: 'Options',
  setup() {
    const options = ref({ ...DEFAULT_USER_OPTIONS });

    // 读取 storage
    loadStorage(Object.keys(DEFAULT_USER_OPTIONS)).then((items) => {
      options.value = { ...options.value, ...items };
    });

    /** 保存设置 */
    const saveOptions = () => {
      logger.log('保存设置：', options.value);
      setStorage(options.value);
    };

    /** 设为默认值 */
    const setDefaultOptions = () => {
      logger.log('设为默认值：', DEFAULT_USER_OPTIONS);
      options.value = { ...DEFAULT_USER_OPTIONS };
    };

    watch(options, (newValue) => {
      logger.log(DEFAULT_USER_OPTIONS);
      logger.log(newValue);
    }, {
      deep: true,
    });

    return {
      options,
      saveOptions,
      setDefaultOptions,
    };
  },
});
</script>

<style lang="less">
@primary-color: #00a1d6;

body {
  margin: 0;
  height: 100vh;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica,
    Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e7e7e7;
}

.content {
  background: #fff;
  color: #000;
  font-size: 18px;
  box-sizing: border-box;
  padding: 20px 80px;
  border-radius: 4px;

  width: 100%;
  max-width: 1000px;

  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.title {
  font-size: 20px;
  color: @primary-color;
}

.click-type-options {
  > div {
    width: 400px;
    > span:last-child {
      float: right;
    }
  }
}
</style>
