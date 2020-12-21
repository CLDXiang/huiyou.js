<template>
  <svg
    v-bind="$attrs"
    class="tooltip-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="#999"
    viewBox="0 0 16 16"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <path
      fill-rule="evenodd"
      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
    />
    <!-- eslint-disable-next-line max-len -->
    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
  </svg>
  <teleport to="body">
    <div
      v-if="visible"
      class="tooltip"
      :style="{
        left: `${clientX}px`,
        top: `${clientY}px`,
      }"
    >
      <slot />
    </div>
  </teleport>
</template>

<script lang="ts">
import logger from '@/utils/logger';
import { defineComponent, PropType, ref } from 'vue';

// TODO: click
export default defineComponent({
  props: {
    /** 触发方式 */
    trigger: { type: String as PropType<'click' | 'hover'>, default: 'hover' },
  },
  setup() {
    const visible = ref<boolean>(false);
    const clientX = ref<number>(0);
    const clientY = ref<number>(0);

    const handleMouseEnter = (e: MouseEvent) => {
      logger.log({
        x: e.clientX,
        y: e.clientY,
      });
      // 往右下偏 20 px
      clientX.value = e.clientX + 20;
      clientY.value = e.clientY + 20;
      visible.value = true;
    };

    const handleMouseLeave = () => {
      visible.value = false;
    };

    return {
      visible,
      clientX,
      clientY,
      handleMouseEnter,
      handleMouseLeave,
    };
  },
});
</script>

<style lang="less" scoped>
.tooltip-icon {
  cursor: pointer;
  transition: all 0.3s ease-in;
  &:hover {
    opacity: 0.8;
  }
}

.tooltip {
  max-width: 300px;
  font-size: 14px;
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 3px 6px rgba(0,0,0,.3);
  position: fixed;
}
</style>
