<template>
  <div class="records">
    <div class="records__header">
      <img src="../../assets/history-img.jpg">
      <h3>历史记录</h3>
    </div>
    <div class="records__list">
      <push-record-item
        v-for="record in records"
        :key="record.bvid"
        :bvid="record.bvid"
        :created-at="record.createdAt"
        :is-first="record.isFirst"
        :is-last="record.isLast"
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
      records: [] as RecordItem[],
    };
  },
  mounted() {
    // FIXME: 获取当前用户 uid 并传入该方法
    recordsClient.getRecords({ uid: 'zwh' }).then((data) => {
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
  },
});
</script>

<style scoped lang="less">
.records {
  width: 80vw;
  max-width: 1000px;
  margin: 0 auto;
}

.records__header {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  img{
    width: 32px;
    height: 32px;
  }
}

.records__list{
  position: relative;
  padding: 0 70px;
}
</style>
