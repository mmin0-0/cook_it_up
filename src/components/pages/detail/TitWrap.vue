<template>
  <div :class="`tit-wrap ${ className }`">
    <Typography size="md" weight="medium">🍳 {{ title }}</Typography>
  </div>
</template>

<script setup lang="ts">
import Typography from '@/components/common/Typography.vue';
import { toRefs } from 'vue';

const props = defineProps({
  title: String,
  className: String,
});

const { title, className } = toRefs(props);
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/detail.scss';
</style>