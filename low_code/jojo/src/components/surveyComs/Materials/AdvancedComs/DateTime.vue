<template>
  <div
    :class="{
      'text-center': computedState.position,
    }"
  >
    <MaterialsHeader
      :serialNum="serialNum"
      :title="computedState.title"
      :desc="computedState.desc"
      :titleSize="computedState.titleSize"
      :descSize="computedState.descSize"
      :titleWeight="computedState.titleWeight"
      :descWeight="computedState.descWeight"
      :titleItalic="computedState.titleItalic"
      :descItalic="computedState.descItalic"
      :titleColor="computedState.titleColor"
      :descColor="computedState.descColor"
    />
    <div>
      <el-date-picker
        v-model="datetimeValue"
        format="yyyy 第 WW 周"
        @click.stop
        placeholder="选择周"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import MaterialsHeader from '../../Common/MaterialsHeader.vue';
import type { TypeStatus } from '@/types';
import {
  getCurrentStatus,
  getStringStatusByCurrent,
  getTextStatus,
  getValueStatusByCurrentStatus,
} from '@/utils';

const props = defineProps<{
  serialNum: number;
  status: TypeStatus;
}>();

const datetimeValue = ref('');

const computedState = computed(() => ({
  type: getValueStatusByCurrentStatus(props.status.type),
  title: getTextStatus(props.status.title),
  desc: getTextStatus(props.status.desc),
  position: getCurrentStatus(props.status.position),
  titleSize: getStringStatusByCurrent(props.status.titleSize),
  descSize: getStringStatusByCurrent(props.status.descSize),
  titleWeight: getCurrentStatus(props.status.titleWeight),
  descWeight: getCurrentStatus(props.status.descWeight),
  titleItalic: getCurrentStatus(props.status.titleItalic),
  descItalic: getCurrentStatus(props.status.descItalic),
  titleColor: getTextStatus(props.status.titleColor),
  descColor: getTextStatus(props.status.descColor),
}));

// console.log(computedState.value.type);
</script>

<style scoped lang="scss">
.radio-group {
  height: 40px;
}
</style>
