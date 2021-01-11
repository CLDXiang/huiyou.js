<template>
  <div class="content">
    <div class="title">
      设置
    </div>
    <div class="click-type-options">
      <div class="option">
        <span>气泡悬浮时长（秒）</span>
        <span>
          <input
            v-model="options.POPUP_DURATION"
            type="number"
            min="0"
          >
          <up-down-pin
            :show-down="parsedOptions.POPUP_DURATION > 0"
            @click-up="options.POPUP_DURATION = parsedOptions.POPUP_DURATION + 1"
            @click-down="options.POPUP_DURATION = parsedOptions.POPUP_DURATION - 1"
          />
        </span>
      </div>
      <div class="option">
        <span>推送视频播放量上限<tooltip>仅推送播放量不大于该值的视频</tooltip></span>
        <span>
          <input
            v-model="options.AMOUNT_OF_PLAY_UPPER_LIMIT"
            type="number"
            min="0"
          >
          <up-down-pin
            :show-down="parsedOptions.AMOUNT_OF_PLAY_UPPER_LIMIT > 0"
            @click-up="
              options.AMOUNT_OF_PLAY_UPPER_LIMIT = parsedOptions.AMOUNT_OF_PLAY_UPPER_LIMIT + 1
            "
            @click-down="
              options.AMOUNT_OF_PLAY_UPPER_LIMIT = parsedOptions.AMOUNT_OF_PLAY_UPPER_LIMIT - 1
            "
          />
        </span>
      </div>
      <div class="option">
        <span>推送视频时长下限（秒）<tooltip>仅推送时长不小于该值的视频</tooltip></span>
        <span>
          <input
            v-model="options.VIDEO_DURATION_LOWER_LIMIT"
            type="number"
            min="0"
          >
          <up-down-pin
            :show-down="parsedOptions.VIDEO_DURATION_LOWER_LIMIT > 0"
            @click-up="
              options.VIDEO_DURATION_LOWER_LIMIT = parsedOptions.VIDEO_DURATION_LOWER_LIMIT + 1
            "
            @click-down="
              options.VIDEO_DURATION_LOWER_LIMIT = parsedOptions.VIDEO_DURATION_LOWER_LIMIT - 1
            "
          />
        </span>
      </div>
    </div>
    <div class="input-type-options">
      <div>
        观看约
        <input
          v-model="options.VIDEO_COUNT_LOWER_LIMIT"
          type="number"
          min="1"
        >
        个视频后展示气泡
      </div>
      <div>
        视频长度超过
        <input
          v-model="options.DURATION_UPPER_LIMIT"
          type="number"
          min="1"
        >s 不计入观看视频数量
      </div>
      <div>
        视频播放比例超过
        <input
          v-model="options.PLAYED_TIME_PROPORTION_LOWER_LIMIT"
          type="number"
          min="0"
          max="99"
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
    <div
      v-show="hideSaveSuccessModelCoolDown > 0"
      class="save-success-model"
    >
      ✔ 保存设置成功！
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref, watch,
} from 'vue';
import { DEFAULT_USER_OPTIONS } from '@/config';
import logger from '@/utils/logger';
import { DEBUG_MODE } from '@/utils/config';
import { setSyncStorage } from '@/utils/options';
import { loadStorage, parseStringToNumber } from './utils';
import { UpDownPin, Tooltip } from './components';

// TODO: tips
// TODO: 值验证

export default defineComponent({
  name: 'Options',
  components: {
    UpDownPin,
    Tooltip,
  },
  setup() {
    /**
     * 用于 input 元素的 options，用于写入
     * FIXME: 在 input 中被修改后 number 字段会变为 string，需要指明类型
     * 或者想办法用 Proxy / computed 的 set/get 实现？
     */
    const options = ref({ ...DEFAULT_USER_OPTIONS });
    /** 读取出来的选项 */
    const cachedOptions = ref({ ...DEFAULT_USER_OPTIONS });

    /** 将 options 的字段转为 number，用于读取 */
    const parsedOptions = computed(() => {
      const {
        AMOUNT_OF_PLAY_UPPER_LIMIT,
        DURATION_UPPER_LIMIT,
        PLAYED_TIME_PROPORTION_LOWER_LIMIT,
        POPUP_DURATION,
        VIDEO_DURATION_LOWER_LIMIT,
        VIDEO_COUNT_LOWER_LIMIT,
      } = options.value;
      return {
        AMOUNT_OF_PLAY_UPPER_LIMIT: parseStringToNumber(
          AMOUNT_OF_PLAY_UPPER_LIMIT,
          cachedOptions.value.AMOUNT_OF_PLAY_UPPER_LIMIT,
        ),
        DURATION_UPPER_LIMIT: parseStringToNumber(
          DURATION_UPPER_LIMIT,
          cachedOptions.value.DURATION_UPPER_LIMIT,
        ),
        PLAYED_TIME_PROPORTION_LOWER_LIMIT: parseStringToNumber(
          PLAYED_TIME_PROPORTION_LOWER_LIMIT,
          cachedOptions.value.PLAYED_TIME_PROPORTION_LOWER_LIMIT,
        ),
        POPUP_DURATION: parseStringToNumber(POPUP_DURATION, cachedOptions.value.POPUP_DURATION),
        VIDEO_DURATION_LOWER_LIMIT: parseStringToNumber(
          VIDEO_DURATION_LOWER_LIMIT,
          cachedOptions.value.VIDEO_DURATION_LOWER_LIMIT,
        ),
        VIDEO_COUNT_LOWER_LIMIT: parseStringToNumber(
          VIDEO_COUNT_LOWER_LIMIT,
          cachedOptions.value.VIDEO_COUNT_LOWER_LIMIT,
        ),
      };
    });

    if (DEBUG_MODE) {
      watch(
        options,
        () => {
          logger.log({
            options: options.value,
            parsedOptions: parsedOptions.value,
          });
        },
        { deep: true },
      );
    }

    // 读取 storage
    loadStorage(Object.keys(DEFAULT_USER_OPTIONS)).then((items) => {
      options.value = { ...options.value, ...items };
      cachedOptions.value = { ...cachedOptions.value, ...items };
    });

    /** 成功提示冷却时间 */
    const hideSaveSuccessModelCoolDown = ref<number>(0);
    const hideSaveSuccessModelCoolDownTimeout = ref<number>(-1);

    /** 显示成功提示 */
    const showSaveSuccessModel = () => {
      hideSaveSuccessModelCoolDown.value = 2;
      clearInterval(hideSaveSuccessModelCoolDownTimeout.value);
      hideSaveSuccessModelCoolDownTimeout.value = setInterval(() => {
        hideSaveSuccessModelCoolDown.value -= 1;
        if (hideSaveSuccessModelCoolDown.value === 0) {
          clearInterval(hideSaveSuccessModelCoolDownTimeout.value);
        }
      }, 1000);
    };

    /** 保存设置 */
    const saveOptions = () => {
      logger.log('保存设置：', parsedOptions.value);
      setSyncStorage(parsedOptions.value);
      showSaveSuccessModel();
    };

    /** 设为默认值 */
    const setDefaultOptions = () => {
      logger.log('设为默认值：', DEFAULT_USER_OPTIONS);
      options.value = { ...DEFAULT_USER_OPTIONS };
    };

    return {
      options,
      cachedOptions,
      parsedOptions,
      saveOptions,
      setDefaultOptions,
      hideSaveSuccessModelCoolDown,
    };
  },
});
</script>

<style lang="less">
@primary-color: #00a1d6;

body {
  margin: 0;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e7e7e7;
}

.content {
  background: #fff;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  box-sizing: border-box;
  padding: 20px 80px;
  border-radius: 4px;

  width: 95%;
  max-width: 1000px;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  user-select: none;

  input[type='number'] {
    border: 0;
    outline: 0;
    color: @primary-color;
    text-align: right;
    width: 32px;
    font-weight: 600;
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
}

.title {
  font-size: 18px;
  color: @primary-color;
  margin-bottom: 10px;
}

.click-type-options,
.input-type-options {
  > div {
    margin: 32px 0 32px;
  }
}

.click-type-options {
  .tooltip-icon {
    align-self: flex-end;
    margin-left: 8px;
  }

  > .option {
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > span {
      display: flex;
      align-items: center;
    }

    > span:last-child > input[type='number'] {
      padding-right: 16px;
    }
  }

  > .option.checkbox > span:last-child > span {
    color: #aaa;
    font-weight: 600;
    margin-right: 16px;

    &.active {
      color: @primary-color;
    }
  }
}

.input-type-options {
  input[type='number'] {
    text-align: center;
  }
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 70px;
    height: 32px;
    outline: none;
    background-color: @primary-color;
    font-size: 13px;
    line-height: 33px;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 20px;

    transition: all 0.3s ease-in;

    &:hover {
      opacity: 0.8;
    }
  }
}

.save-success-model {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  font-size: 14px;
  padding: 8px;
  border-radius: 6px;
  box-shadow: 1px 3px 6px rgba(0,0,0,.3);
}
</style>
