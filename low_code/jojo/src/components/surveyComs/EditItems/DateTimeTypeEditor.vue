<template>
  <div key="id">
    <div class="flex space-between mb-10 mt-30">
      <div class="flex align-items-center">
        <div class="mr-20">日期类型</div>
        <div class="currentStatus">
          {{ status[currentStatus]?.status }}
        </div>
      </div>
      <div>
        <el-select
          style="width: 100px"
          placeholder="日期类型"
          v-model="selectValue"
          @change="selectValueChangeHandle"
        >
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.status"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ComType, valueStatusArr } from '@/types';
import { inject, ref } from 'vue';

const props = defineProps<{
  configKey: string;
  id: string;
  name: string;
  currentStatus: number;
  status: valueStatusArr;
  isShow: boolean;
  editCom: ComType;
}>();

const selectValue = ref('');

const updateStatus = inject('updateStatus') as (
  configKey: string,
  payload?: string | number | boolean | object,
) => void;

const selectValueChangeHandle = (val: string) => {
  updateStatus(props.configKey, val);
};
</script>

<style scoped lang="scss">
.currentStatus {
  color: var(--info-color);
  font-size: var(--font-size-base);
}
</style>
