<template>
  <div
    class="up-down-pin"
  >
    <div
      class="up-pin"
      :class="{ hidden: !showUp }"
      :style="{ height: `${height}px` }"
      @click="$emit('click-up')"
    >
      <svg
        :width="`${width}px`"
        :height="`${height}px`"
        :fill="color"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <polygon :points="`0,${height} ${width},${height} ${width / 2},0`" />
      </svg>
    </div>
    <div
      class="gap"
      :style="{ height: `${gap}px` }"
    />
    <div
      class="down-pin"
      :class="{ hidden: !showDown }"
      :style="{ height: `${height}px` }"
      @click="$emit('click-down')"
    >
      <svg
        :width="`${width}px`"
        :height="`${height}px`"
        :fill="color"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <polygon :points="`0,0 ${width},0 ${width / 2},${height}`" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    /** 显示上箭头 */
    showUp: { type: Boolean, default: true },
    /** 显示下箭头 */
    showDown: { type: Boolean, default: true },
    /** 每个箭头宽度 */
    width: { type: Number, default: 14 },
    /** 每个箭头高度 */
    height: { type: Number, default: 12 },
    /** 箭头间隔 */
    gap: { type: Number, default: 6 },
    /** 颜色 */
    color: { type: String, default: '#00a1d6' },
  },
  emits: ['click-up', 'click-down'],
});
</script>

<style lang="less" scoped>
.up-down-pin {
  display: flex;
  flex-direction: column;
}
.hidden {
  visibility: hidden;
}

.gap {
  background: transparent,
}

.up-pin, .down-pin {
  cursor: pointer;

  transition: opacity 0.3s ease-in;

  &:hover {
    opacity: 0.6;
  }
}
</style>
