<template>
  <div
    class="checkbox"
    :style="{
      height: `${height}px`,
      width: `${width}px`,
      borderRadius: `${width}px`,
      background: active ? color : '#aaa',
    }"
  >
    <span
      class="checkbox-circle"
      :style="{
        height: `${height - 2}px`,
        width: `${height - 2}px`,
        borderRadius: `${height - 2}px`,
        left: active ? `${width - height}px` : '0',
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    /** 激活态 */
    active: { type: Boolean, default: false },
    /** 宽度 */
    width: { type: Number, default: 28 },
    /** 高度 */
    height: { type: Number, default: 16 },
    /** 颜色 */
    color: { type: String, default: '#00a1d6' },
  },
});
</script>

<style lang="less" scoped>
.checkbox {
  background: #aaa;
  position: relative;
  cursor: pointer;

  transition: all 0.3s ease-in;

  &:hover {
    opacity: 0.9;
  }
}

.checkbox-circle {
  position: absolute;
  left: 0;
  background: #fff;
  box-sizing: border-box;
  margin: 1px;

  transition: all 0.1s ease-in;
}
</style>
