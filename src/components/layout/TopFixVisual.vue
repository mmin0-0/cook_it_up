<template>
  <div class="fixed-menu">
    <base-button class="back-button" @click="goBack">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </base-button>
    <Typography as="strong" size="lg" weight="bold" class="title">{{ title }}</Typography>
    <base-button class="back-button" @click="toggleSave">
      <font-awesome-icon :icon="isSaved ? ['fas', 'heart'] : ['far', 'heart']" />
    </base-button>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import Typography from '@/components/common/Typography.vue';
import { useStore } from 'vuex';
import { Food as IFood } from '@/types/food'; 

  const store = useStore();
  const router = useRouter();
  const props = defineProps<{
    title: string;
    food: IFood | null;
  }>();
  const { title, food } = toRefs(props);
  
  const goBack = () => {router.back()};

  const isSaved = computed(() => {
    return store.getters.savedFoods.some((item: IFood) => item.serialNum === food.value?.serialNum);
  });

  const toggleSave = () => {
    if(!food.value) return;

    const currentSaved = store.getters.savedFoods as IFood[];
    const exists = currentSaved.some((item:IFood) => item.serialNum === food.value?.serialNum);

    const zzimList = exists 
    ? currentSaved.filter((item: IFood) => item.serialNum !== food.value?.serialNum)
    : [...currentSaved, food.value];

    store.commit('setSavedFoods', zzimList);

    if(exists){
      alert('찜 목록에서 제거되었습니다.');
    } else{
      alert('찜 목록에 추가되었습니다.');
    }
  };
</script>

<style scoped lang="scss">
@import '@/assets/scss/layout/topFixVisual.scss';
</style>