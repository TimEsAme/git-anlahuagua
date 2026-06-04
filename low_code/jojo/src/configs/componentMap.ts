// 业务组件
import singleSelect from '@/components/surveyComs/Materials/SelectComs/SingleSelect.vue';
import multipleSelect from '@/components/surveyComs/Materials/SelectComs/MultiSelect.vue';
import optionSelect from '@/components/surveyComs/Materials/SelectComs/OptionSelect.vue';
import singlePicSelect from '@/components/surveyComs/Materials/SelectComs/SinglePicSelect.vue';
import multiPicSelect from '@/components/surveyComs/Materials/SelectComs/MultiPicSelect.vue';
import textNote from '@/components/surveyComs/Materials/NoteComs/TextNote.vue';
import textInput from '@/components/surveyComs/Materials/InputComs/TextInput.vue';
import rateScore from '@/components/surveyComs/Materials/AdvancedComs/RateScore.vue';

// 编辑组件
import ColorEditor from '@/components/surveyComs/EditItems/ColorEditor.vue';
import DescEditor from '@/components/surveyComs/EditItems/DescEditor.vue';
import ItalicEditor from '@/components/surveyComs/EditItems/ItalicEditor.vue';
import OptionsEditor from '@/components/surveyComs/EditItems/OptionsEditor.vue';
import PicOptionsEditor from '@/components/surveyComs/EditItems/PicOptionsEditor.vue';
import PositionEditor from '@/components/surveyComs/EditItems/PositionEditor.vue';
import RateTextEditor from '@/components/surveyComs/EditItems/RateTextEditor.vue';
import SizeEditor from '@/components/surveyComs/EditItems/SizeEditor.vue';
import TextInputTypeEditor from '@/components/surveyComs/EditItems/TextInputTypeEditor.vue';
import TextTypeEditor from '@/components/surveyComs/EditItems/TextTypeEditor.vue';
import TitleEditor from '@/components/surveyComs/EditItems/TitleEditor.vue';
import WeightEditor from '@/components/surveyComs/EditItems/WeightEditor.vue';
import { defineAsyncComponent, markRaw } from 'vue';
import type { ComponentMap } from '@/types';

// export const componentMap: ComponentMap = {
//   // 业务组件
//   // 选择-单选
//   // 'single-select': markRaw(singleSelect),
//   'single-select': defineAsyncComponent(
//     () => import('@/components/surveyComs/Materials/SelectComs/SingleSelect.vue'),
//   ),
//   // 选择-多选
//   // 'multiple-select': markRaw(multipleSelect),
//   'multiple-select': defineAsyncComponent(
//     () => import('@/components/surveyComs/Materials/SelectComs/MultiSelect.vue'),
//   ),
//   // 下拉选择题
//   // 'option-select': markRaw(optionSelect),
//   'option-select': defineAsyncComponent(
//     () => import('@/components/surveyComs/Materials/SelectComs/OptionSelect.vue'),
//   ),
//   // 选择-图片单选
//   // 'single-pic-select': markRaw(singlePicSelect),
//   'single-pic-select': defineAsyncComponent(
//     () => import('@/components/surveyComs/Materials/SelectComs/SinglePicSelect.vue'),
//   ),
//   // 选择-图片多选
//   // 'multi-pic-select': markRaw(multiPicSelect),
//   'multi-pic-select': defineAsyncComponent(
//     () => import('@/components/surveyComs/Materials/SelectComs/MultiPicSelect.vue'),
//   ),
//   // 备注说明
//   // 'text-note': markRaw(textNote),
//   'text-note': defineAsyncComponent(
//     () => import('@/components/surveyComs/Materials/NoteComs/TextNote.vue'),
//   ),
//   // 文本输入
//   // 'text-input': markRaw(textInput),
//   'text-input': defineAsyncComponent(
//     () => import('@/components/surveyComs/Materials/InputComs/TextInput.vue'),
//   ),
//   // 评价打分
//   // 'rate-score': markRaw(rateScore),
//   'rate-score': defineAsyncComponent(
//     () => import('@/components/surveyComs/Materials/AdvancedComs/RateScore.vue'),
//   ),
//   // 个人信息
//   // 'personal-info-gender': markRaw(singleSelect),
//   'personal-info-gender': defineAsyncComponent(
//     () => import('@/components/surveyComs/Materials/SelectComs/SingleSelect.vue'),
//   ),
//   // 'personal-info-education': markRaw(singleSelect),
//   'personal-info-education': defineAsyncComponent(
//     () => import('@/components/surveyComs/Materials/SelectComs/SingleSelect.vue'),
//   ),
//   // 联系方式
//   // 'personal-info-tel': markRaw(textInput),
//   'personal-info-tel': defineAsyncComponent(
//     () => import('@/components/surveyComs/Materials/InputComs/TextInput.vue'),
//   ),

//   // 编辑组件
//   // 颜色编辑器
//   // 'color-editor': markRaw(ColorEditor),
//   'color-editor': defineAsyncComponent(
//     () => import('@/components/surveyComs/EditItems/ColorEditor.vue'),
//   ),
//   // 描述编辑器
//   // 'desc-editor': markRaw(DescEditor),
//   'desc-editor': defineAsyncComponent(
//     () => import('@/components/surveyComs/EditItems/DescEditor.vue'),
//   ),
//   // 斜体编辑器
//   // 'italic-editor': markRaw(ItalicEditor),
//   'italic-editor': defineAsyncComponent(
//     () => import('@/components/surveyComs/EditItems/ItalicEditor.vue'),
//   ),
//   // 选项编辑器
//   // 'options-editor': markRaw(OptionsEditor),
//   'options-editor': defineAsyncComponent(
//     () => import('@/components/surveyComs/EditItems/OptionsEditor.vue'),
//   ),
//   // 图片选项编辑器
//   // 'pic-options-editor': markRaw(PicOptionsEditor),
//   'pic-options-editor': defineAsyncComponent(
//     () => import('@/components/surveyComs/EditItems/PicOptionsEditor.vue'),
//   ),
//   // 位置编辑器
//   // 'position-editor': markRaw(PositionEditor),
//   'position-editor': defineAsyncComponent(
//     () => import('@/components/surveyComs/EditItems/PositionEditor.vue'),
//   ),
//   // 评分文本编辑器
//   // 'rate-text-editor': markRaw(RateTextEditor),
//   'rate-text-editor': defineAsyncComponent(
//     () => import('@/components/surveyComs/EditItems/RateTextEditor.vue'),
//   ),
//   // 尺寸编辑器
//   // 'size-editor': markRaw(SizeEditor),
//   'size-editor': defineAsyncComponent(
//     () => import('@/components/surveyComs/EditItems/SizeEditor.vue'),
//   ),
//   // 文本输入类型编辑器
//   // 'text-input-type-editor': markRaw(TextInputTypeEditor),
//   'text-input-type-editor': defineAsyncComponent(
//     () => import('@/components/surveyComs/EditItems/TextInputTypeEditor.vue'),
//   ),
//   // 文本类型编辑器
//   // 'text-type-editor': markRaw(TextTypeEditor),
//   'text-type-editor': defineAsyncComponent(
//     () => import('@/components/surveyComs/EditItems/TextTypeEditor.vue'),
//   ),
//   // 标题编辑器
//   // 'title-editor': markRaw(TitleEditor),
//   'title-editor': defineAsyncComponent(
//     () => import('@/components/surveyComs/EditItems/TitleEditor.vue'),
//   ),
//   // 粗细编辑器
//   // 'weight-editor': markRaw(WeightEditor),
//   'weight-editor': defineAsyncComponent(
//     () => import('@/components/surveyComs/EditItems/WeightEditor.vue'),
//   ),
// };

// 创建 markRaw 包装的异步组件
const markAsyncComponent = (loader: () => Promise<any>) => {
  return markRaw(defineAsyncComponent(loader));
};

export const componentMap:ComponentMap = {
  // 业务组件 - 全部用 markAsyncComponent 包装
  'single-select': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/SelectComs/SingleSelect.vue'),
  ),
  'multiple-select': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/SelectComs/MultiSelect.vue'),
  ),
  'option-select': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/SelectComs/OptionSelect.vue'),
  ),
  'single-pic-select': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/SelectComs/SinglePicSelect.vue'),
  ),
  'multi-pic-select': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/SelectComs/MultiPicSelect.vue'),
  ),
  'text-note': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/NoteComs/TextNote.vue'),
  ),
  'text-input': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/InputComs/TextInput.vue'),
  ),
  'rate-score': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/AdvancedComs/RateScore.vue'),
  ),
  'date-time': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/AdvancedComs/DateTime.vue'),
  ),
  'personal-info-gender': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/SelectComs/SingleSelect.vue'),
  ),
  'personal-info-education': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/SelectComs/SingleSelect.vue'),
  ),
  'personal-info-tel': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/InputComs/TextInput.vue'),
  ),

  // 编辑组件
  'color-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/ColorEditor.vue'),
  ),
  'desc-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/DescEditor.vue'),
  ),
  'italic-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/ItalicEditor.vue'),
  ),
  'options-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/OptionsEditor.vue'),
  ),
  'pic-options-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/PicOptionsEditor.vue'),
  ),
  'position-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/PositionEditor.vue'),
  ),
  'rate-text-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/RateTextEditor.vue'),
  ),
  'size-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/SizeEditor.vue'),
  ),
  'text-input-type-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/TextInputTypeEditor.vue'),
  ),
  'text-type-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/TextTypeEditor.vue'),
  ),
  'title-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/TitleEditor.vue'),
  ),
  'weight-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/WeightEditor.vue'),
  ),
};
