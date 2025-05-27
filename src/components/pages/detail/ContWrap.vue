<template>
  <div :class="`cont-wrap ${ className }`">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps({
  className: String,
});

const { className } = toRefs(props);
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/detail.scss';
</style>