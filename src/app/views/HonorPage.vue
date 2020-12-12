<template>
  <div class="honor">
    <honor-item
      v-for="record in records"
      :key="record.bvid"
      :bvid="record.bvid"
      :created-at="record.createdAt"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HonorItem from '@/app/components/HonorItem.vue';
import { getUid } from '@/utils/cookies';
import dayjs from 'dayjs';
import { recordsClient } from '../apis';
import { RecordItem } from '../types';

export default defineComponent({
  components: { HonorItem },
  data() {
    return {
      records: [{ bvid: 'BV1za411A7wR', createdAt: dayjs() }, { bvid: 'BV1za411A7wR', createdAt: dayjs() }, { bvid: 'BV1za411A7wR', createdAt: dayjs() }, { bvid: 'BV1za411A7wR', createdAt: dayjs() }] as RecordItem[],
    };
  },
  mounted() {
    getUid().then((uid) => {
      if (!uid) return;
      recordsClient.getRecords({ uid }).then((data) => {
        const records = data.sort((a, b) => b.createdAt.unix() - a.createdAt.unix());
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
        this.records = records;
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
