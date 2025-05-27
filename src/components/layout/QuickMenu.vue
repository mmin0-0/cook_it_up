<template>
  <div class="quick">
    <div class="quick-controls">
      <base-button @click="goToTop" v-show="isVisibleTop" class="top-button">
        <font-awesome-icon :icon="['fas', 'arrow-up']" />
      </base-button>
      <base-button class="zzim-button" @click="zzimToggle">
        <font-awesome-icon :icon="['far', 'heart']" />
      </base-button>
    </div>
    <div class="zzim" :class="{on : isVisibleZzim}" @click="zzimToggle">
      <div class="zzim-list" @click.stop>
        <div v-for="food in savedFoods" :key="food.serialNum" class="food-info" @click="goToDetail(food)">
          <ImgWrap className="contain preview-img" :src="food.mainImg" alt="음식이미지" />
          <Typography size="sm" weight="medium">{{ food.name }}</Typography>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';
import ImgWrap from '@/components/common/ImgWrap.vue';
import Typography from '@/components/common/Typography.vue';
import { useRouter } from 'vue-router';
import { Food as IFood } from '@/types/food';

  const store = useStore();
  const router = useRouter();
  const isVisibleTop = ref(false);
  const isVisibleZzim = ref(false);
  const savedFoods = computed(() => store.getters.savedFoods);

  const handleScroll = () => {
    isVisibleTop.value = window.scrollY > 200;
  };

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const zzimToggle = () => {
    isVisibleZzim.value = !isVisibleZzim.value;
  };

  const goToDetail = (food: IFood) => {
    router.push(`/detail/${food.serialNum}`);
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/layout/quickMenu.scss';
</style>