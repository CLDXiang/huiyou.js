<template>
  <div
    v-if="records.length"
    class="honor"
  >
    <honor-item
      v-for="record in records"
      :key="record.bvid"
      :bvid="record.bvid"
      :created-at="record.createdAt"
    />
  </div>
  <Empty v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getUid } from '@/utils/cookies';
import { HonorItem, Empty } from '../components';
import { recordsClient } from '../apis';
import { HonorItemType } from '../types';

export default defineComponent({
  components: { HonorItem, Empty },
  data() {
    return {
      records: [] as HonorItemType[],
    };
  },
  mounted() {
    getUid().then((uid) => {
      if (!uid) return;
      recordsClient.getHonors({ uid }).then((data) => {
        this.records = data;
      });
    });
  },
});
</script>

<style scoped lang="less">
.honor {
  width: 1000px;
  margin: 30px auto 0;
}
</style>
