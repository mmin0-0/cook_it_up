<template>
  <div class="food-card" @click="goToDetail">
    <div class="food-preview" :style="{backgroundImage: `url(${food.mainImg})`}"></div>
    <div class="food-info">
      <Typography as="span">{{ food.category }}</Typography>
      <Typography as="strong" size="md" weight="bold" lineHeight="medium">{{ food.name }}</Typography>
      <div class="tag-list">
        <Typography 
          as="span" 
          v-for="(tag, idx) in food.hashtag.slice(0, 4)"
          :key="idx"
        >{{ tag }}</Typography>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Typography from '@/components/common/Typography.vue';
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  food: {
    type: Object,
    required: true,
  }
});
const { food } = toRefs(props);

const goToDetail = () => {
  router.push(`/detail/${food.value.serialNum}`);
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/foodCard.scss';
</style>