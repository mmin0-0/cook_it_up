<template>
  <TopFixVisual :title="food?.name ?? ''" :food="food" />
  <section class="w-100">
    <div class="detail-info" v-if="food">
      <ImgWrap className="preview-img w-100" :src="food.mainImg" alt="요리 이미지" />
      <div class="info-wrap">
        <div class="nutrition">
          <TitWrap title="영양정보"/>
          <ContWrap class="nutrition-list">
            <div class="nutrition-item" v-for="item in nutritionList" :key="item.label">
              <div>
                <Typography size="sm">{{ item.key }}</Typography>
                <Typography weight="medium" size="sm">{{ item.label }}</Typography>
              </div>
            </div>
          </ContWrap>
        </div>
        <div>
          <TitWrap title="재료"/>
          <ContWrap>
            <ul class="decimal-list">
              <li v-for="(item, idx) in food.cookItem" :key="idx">{{item}}</li>
            </ul>
          </ContWrap>
        </div>
        <div class="make">
          <TitWrap title="만드는 법"/>
          <ContWrap class="make-list">
            <div class="make-item" v-for="(item, idx) in food.make" :key="idx">
              <ImgWrap :src="food.makeImg[idx]" alt="만드는 법" class="w-100" />
              <Typography lineHeight="medium">{{ item }}</Typography>
            </div>
          </ContWrap>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ImgWrap from '@/components/common/ImgWrap.vue';
import TopFixVisual from '@/components/layout/TopFixVisual.vue';
import Typography from '@/components/common/Typography.vue';
import TitWrap from '@/components/pages/detail/TitWrap.vue';
import { Food as IFood } from '@/types/food';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ContWrap from '@/components/pages/detail/ContWrap.vue';

const store = useStore();
const route = useRoute();
const food = ref<IFood | null>(null);

const nutritionList = computed(() => {
  if(!food.value) return [];

  return [
    {label: '탄수화물', key: food.value.tan},
    {label: '단백질', key: food.value.dan},
    {label: '지방', key: food.value.ji},
    {label: '나트륨', key: food.value.na},
  ];
});

async function loadFood() {
  const id = route.params.id;
  
  if (!store.getters.foods.length) {
    await store.dispatch('fetchFoods');
  }

  food.value = store.getters.foods.find(
    (item: IFood) => String(item.serialNum) === String(id)
  ) || null;
}

onMounted(() => {
  loadFood();
});

watch(() => route.params.id, () => {
  loadFood();
});

watch(() => store.getters.foods, (newFoods) => {
    const id = route.params.id;
    food.value = newFoods.find(
      (item: IFood) => String(item.serialNum) === String(id)
    ) || null;
  }
);
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/pages/detail.scss';
</style>