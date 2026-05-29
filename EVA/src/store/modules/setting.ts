import { defineStore } from "pinia";
import { ref } from "vue";

const useSettingStore = defineStore(
  "setting",
  () => {
    let fold = ref(false);
    let refresh = ref(false);

    const changeIcon = () => {
      fold.value = !fold.value;
    };

    return { fold, refresh, changeIcon };
  },
  {
    persist: true, // ✅ 开启持久化
  },
);

export default useSettingStore;
