<template>
  <div class="records">
    <div class="header">
      <h3>历史记录</h3>
    </div>
    <a-timeline>
      <a-timeline-item
        v-for="item in records"
        :key="item.uid"
      >
        {{ item.pubdate }}
        <push-record-item
          :bv="item.bv"
          :tag="item.tag"
          :play="item.play"
          :type="item.type"
          :author="item.author"
          :title="item.title"
          :img="item.pic"
        />
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PushRecordItem from '@/app/components/PushRecordItem.vue';
import { recordClient } from '@/apis';

export default defineComponent({
  name: 'PushRecords',
  components: { PushRecordItem },
  data() {
    return {
      records: {},
    };
  },
  mounted() {
    recordClient.getRecords().then((data) => {
      this.records = data;
    });
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .header {
        display: flex;
        margin-bottom: 24px;
    }

    .records {
        width: 800px;
        margin: 0 auto;
    }
</style>
