<template>
  <section>
    <div v-if="foods.length" class="food-list">
      <FoodCard 
        v-for="(food, idx) in foods" :key="idx"
        :food="food"
      />
    </div>
    <div v-else>
      <Loading />
    </div>
  </section>
</template>


<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import FoodCard from '@/components/cards/FoodCard.vue';
import Loading from '@/components/common/Loading.vue';

const store = useStore()
const foods = computed(() => store.getters.foods)

onMounted(() => {
  store.dispatch('fetchFoods')
});
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/pages/home.scss';
  @import '@/assets/scss/components/foodCard.scss';
</style>