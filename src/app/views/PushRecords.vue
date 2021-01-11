<template>
  <div
    v-if="records.length"
    class="records"
  >
    <push-record-item
      v-for="record in records"
      :key="record.bvid"
      :bvid="record.bvid"
      :created-at="record.createdAt"
      :is-first="record.isFirst"
      :is-last="record.isLast"
    />
  </div>
  <Empty v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getUid } from '@/utils/cookies';
import { PushRecordItem, Empty } from '../components';
import { recordsClient } from '../apis';
import { RecordItem } from '../types';

export default defineComponent({
  components: { PushRecordItem, Empty },
  data() {
    return {
      records: [] as RecordItem[],
    };
  },
  mounted() {
    getUid().then((uid) => {
      if (!uid) return;
      recordsClient.getRecords({ uid }).then((data) => {
        const records = data.sort(
          (a, b) => b.createdAt.unix() - a.createdAt.unix(),
        );
        if (records.length > 0) {
          // 按天分隔，设置当前视频是否为第一条或最后一条
          records[0].isFirst = true;
          records[records.length - 1].isLast = true;
          let currentDay = records[0].createdAt.format('YYYYMMDD');
          for (let i = 1; i < records.length; i += 1) {
            const day = records[i].createdAt.format('YYYYMMDD');
            if (currentDay !== day) {
              currentDay = day;
              records[i - 1].isLast = true;
              records[i].isFirst = true;
            }
          }
        }
        // FIXME: 仅显示七条数据，此后改为懒加载
        this.records = records.slice(0, 7);
      });
    });
  },
});
</script>

<style scoped lang="less">
.records {
  width: 1000px;
  margin: 30px auto 0;
  position: relative;
}
</style>
