<template>
  <div class="records">
    <div class="records__header">
      <h3>历史记录</h3>
    </div>
    <div class="records__list">
      <push-record-item
        v-for="record in records"
        :key="record.bvid"
        :bvid="record.bvid"
        :created-at="record.createdAt"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PushRecordItem from '@/app/components/PushRecordItem.vue';
import { recordsClient } from '../apis';
import { RecordItem } from '../types';

export default defineComponent({
  components: { PushRecordItem },
  data() {
    return {
      records: {} as RecordItem[],
    };
  },
  mounted() {
    // FIXME: 获取当前用户 uid 并传入该方法
    recordsClient.getRecords({ uid: 'zwh' }).then((data) => {
      this.records = data;
    });
  },
});
</script>

<style scoped lang="less">
.records {
  width: 800px;
  margin: 0 auto;
}

.records__header {
  display: flex;
  margin-bottom: 24px;
}
</style>
