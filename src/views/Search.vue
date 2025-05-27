<template>
  <section>
    <div class="title-wrap">
      <Typography size="md" line-height="medium" weight="medium">주재료 
        <Typography as="strong" size="lg" weight="bold">"{{ route.query.query }}"</Typography>
        에 대한 요리추천</Typography>
      <TabMenu :tabMenus="tabMenus" v-model:selected="selectMenu" />
    </div>
    <div v-if="filteredFoods.length > 0">
      <div class="food-list">
        <FoodCard 
          v-for="(food, idx) in visibleFoods" 
          :key="idx"
          :food="food"
        />
      </div>
      <base-button 
        v-if="visibleFoods.length < filteredFoods.length && visibleCount < 30"
        class="more-button"
        @click="loadMore"
      >+ 더보기</base-button>
    </div>
    <div v-else class="no-result">
      <Typography size="lg" weight="semibold">검색 결과가 없습니다 😢</Typography>
    </div>
  </section>
</template>

<script setup lang="ts">
import FoodCard from '@/components/cards/FoodCard.vue';
import TabMenu from '@/components/common/TabMenu.vue';
import Typography from '@/components/common/Typography.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { Food as IFood } from '@/types/food';

defineOptions({ name: 'searchPage' });

const store = useStore();
const route = useRoute();
const foods = computed<IFood[]>(() => store.getters.foods);
const query = computed(() => route.query.query || store.getters.searchQuery);
const tabMenus = ['전체', '밥', '국&찌개', '반찬', '후식'];
const selectMenu = ref('전체');
const visibleCount = ref(10);

const filteredFoods = computed<IFood[]>(() => {
  if(selectMenu.value === '전체') return foods.value;
  return foods.value.filter(food => food.category === selectMenu.value);
});

const visibleFoods = computed(() => {
  return filteredFoods.value.slice(0, visibleCount.value);
});

onMounted(() => {
  store.dispatch('fetchFoods');
});

watch(query, (newQuery) => {
  if(newQuery){
    store.dispatch('filterFoodsByQuery', newQuery);
  }
}, {immediate: true});

watch(selectMenu, () => { // 탭이 바뀔때마다 초기화
  visibleCount.value = 10;
});

const loadMore = () => { // 더보기 클릭시 list 10개씩 노출
  visibleCount.value = Math.min(visibleCount.value + 10, 30);
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/foodCard.scss';
@import '@/assets/scss/pages/search.scss';
</style>