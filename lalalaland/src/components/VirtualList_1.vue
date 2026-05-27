<template>
  <!-- 外层容器 -->
  <div ref="list" class="infinite-list-container">
    <!-- 该元素高度为总列表的高度，目的是为了形成滚动 -->
    <div class="infinite-list-phantom" ref="listHeight"></div>
    <!-- 该元素为可视区域，里面就是一个一个列表项 -->
    <div ref="content" class="infinite-list">
      <div
        ref="items"
        class="infinite-list-item"
        v-for="e in visibleData"
        :key="e.id"
      >
        {{ e.value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
import { computed, nextTick, onMounted, onUpdated, ref, watch } from "vue";

const props = defineProps({
  dataList: {
    type: Array,
    default: () => [],
  },
  itemSize: {
    type: Number,
    default: 150,
  },
  // 预估高度
  estimatedItemSize: {
    type: Number,
    required: true,
  },
  // 缓冲区
  bufferScale: {
    type: Number,
    default: 1,
  },
});

// 引用container元素
const list = ref(null);
// 可视区域高度
const screenHeight = ref(0);
// 开始索引
const startIndex = ref(0);
// 结束索引
const endIndex = ref(0);

// 用于创建列表项元素的引用
const items = ref([]);
// 用于引用phantom元素
const listHeight = ref(null);
// 用于引用list元素
const content = ref(null);

// 设置缓存列表,用于存储列表项的位置信息
let positions = [];
const init = () => {
  positions = props.dataList.map((_, index) => ({
    // 列表项的下标
    index,
    // 列表项的高度，这里采用预估的高度
    height: props.estimatedItemSize,
    // 列表项的顶部位置，根据下标和预估高度计算
    top: index * props.estimatedItemSize,
    // 列表项的底部位置，也是根据下标和预估高度计算
    bottom: (index + 1) * props.estimatedItemSize,
  }));
};

// 可显示的列表项数
const visibleCount = computed(() =>
  Math.ceil(screenHeight.value / props.itemSize),
);

const aboveCount = computed(() => {
  // 缓冲区列表项个数的计算，其实就是可视区显示个数 * 缓冲比例
  // 但是考虑到可能存在当前虚拟列表处于最顶端，所以需要和 startIndex 做一个比较，取最小值
  return Math.min(startIndex.value, props.bufferScale * visibleCount.value);
});

const belowCount = computed(() => {
  return Math.min(
    props.dataList.length - endIndex.value,
    props.bufferScale * visibleCount.value,
  );
});

// 列表显示数据
const visibleData = computed(() => {
  //   return props.dataList.slice(
  //     startIndex.value,
  //     Math.min(endIndex.value, props.dataList.length),
  //   );
  let startIdx = startIndex.value - aboveCount.value;
  let endIdx = endIndex.value + belowCount.value;
  return props.dataList.slice(
    startIdx,
    Math.min(endIdx, props.dataList.length),
  );
});

const getStartIndex = (scrollTop) => {
  // 找到第一个底部位置大于滚动高度的列表项
  let item = positions.find((i) => i && i.bottom > scrollTop);
  return item.index;
};

// const scrollHandler = () => {
//   // 这里要做的事情主要就是更新各项数据
//   let scrollTop = list.value.scrollTop;
//   startIndex.value = getStartIndex(scrollTop);
//   endIndex.value = startIndex.value + visibleCount.value;
//   setStartOffset();
// };

const observer = ref(null);
const createObserver = () => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let scrollTop = list.value.scrollTop;
          startIndex.value = getStartIndex(scrollTop);
          endIndex.value = startIndex.value + visibleCount.value;
          setStartOffset();
        }
      });
    },
    {
      root: list.value,
      rootMargin: "0px",
      threshold: 0.1,
    },
  );
};

const observerItems = () => {
  items.value.forEach((e) => {
    observer.value.observe(e);
  });
};

onMounted(() => {
  // 获取可视区域高度
  screenHeight.value = list.value.clientHeight;
  startIndex.value = 0;
  endIndex.value = startIndex.value + visibleCount.value;
  // 在组件挂载的时候，初始化列表项的位置信息
  init();
  // 在组件挂载的时候，创建IntersectionObserver实例
  createObserver();
});

const updateItemsSize = () => {
  items.value.forEach((node, index) => {
    // 获取列表项实际的高度
    let height = node.getBoundingClientRect().height;
    // 计算预估高度和真实高度的差值
    let oldHeight = positions[index].height; // 拿到该项的预估高度
    let dValue = oldHeight - height;
    if (dValue) {
      // 如果存在差值，那么就需要更新位置信息
      positions[index].bottom -= dValue;
      positions[index].height = height;
      // 接下来需要更新后续所有列表项的位置
      for (let i = index + 1; i < positions.length; i++) {
        positions[i].top = positions[i - 1].bottom;
        positions[i].bottom -= dValue;
      }
    }
  });
};

// 更新偏移量
const setStartOffset = () => {
  //   let startOffset =
  //     startIndex.value >= 1 ? positions[startIndex.value - 1].bottom : 0;
  //   content.value.style.transform = `translate3d(0, ${startOffset}px, 0)`;

  let startOffset;
  // 检查当前可视区域的第一个可见项索引是否大于等于1（即当前显示的内容不在列表最开始的地方）
  if (startIndex.value >= 1) {
    // 计算当前可视区域第一项的顶部位置与考虑上方缓冲区后的有效偏移量
    // positions[startIndex.value].top 是当前可视区域第一项的顶端位置
    // positions[startIndex.value - aboveCount.value].top 是考虑上方缓冲区后，开始位置的顶端位置
    // 如果上方缓冲区存在，则减去它的顶端位置；否则使用 0 作为初始偏移量
    let size =
      positions[startIndex.value].top -
      (positions[startIndex.value - aboveCount.value]
        ? positions[startIndex.value - aboveCount.value].top
        : 0);

    // 计算 startOffset：用当前可视区域第一个项的前一项的底部位置，减去上面计算出的 size，
    // 这个 size 表示的是在考虑缓冲区后需要额外平移的偏移量
    startOffset = positions[startIndex.value - 1].bottom - size;
  } else {
    // 如果当前的 startIndex 为 0，表示列表显示从最开始的地方开始，没有偏移量
    startOffset = 0;
  }

  // 设置内容容器的 transform 属性，使整个内容平移 startOffset 像素，以确保正确的项对齐在视口中
  content.value.style.transform = `translate3d(0,${startOffset}px,0)`;
};

onUpdated(() => {
  // 这里之所以使用 nextTick，是为了确保DOM更新完毕后再去获取列表项的位置信息
  nextTick(() => {
    if (!items.value || !items.value.length) return;
    // 1. 更新列表项的高度
    updateItemsSize();
    // 2. 更新虚拟列表的高度
    listHeight.value.style.height =
      positions[positions.length - 1].bottom + "px";
    // 3. 更新列表的偏移量
    setStartOffset();
    // 4.观察
    observerItems();
  });
});

watch(() => props.dataList, init);
</script>

<style scoped lang="scss">
.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>
