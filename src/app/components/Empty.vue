<template>
  <div
    class="empty"
  >
    <img src="@/assets/empty.png">
    <div class="empty__text">
      {{ emptyText }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { getUid } from '@/utils/cookies';

export default defineComponent({
  setup() {
    const emptyText = ref<string>('这里空空的');

    onMounted(() => {
      getUid().then((uid) => {
        if (!uid) {
          emptyText.value = '要在 B 站登录后刷新才能看到哦';
        }
      });
    });

    return {
      emptyText,
    };
  },
});
</script>

<style scoped lang="less">
.empty {
  text-align: center;

  > .empty__text {
    color: #8594b7;
    font-size: 14px;
  }
}
</style>
