<template>
  <component
    :is="as"
    :class="[`typography`, `size-${size}`, `weight-${weight}`, `lineHeight-${lineHeight}`, color, className]"
  >
    <slot />  
  </component>
</template>

<script setup lang="ts">
  const props = defineProps({
    as: {
      type: String,
      default: 'p'
    },
    size: {
      type: String,
      default: 'base'
    },
    weight: {
      type: String,
      default: 'normal'
    },
    lineHeight: {
      type: String,
      default: 'regular'
    },
    color: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
  });
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.size{
  &-sm{font-size: $size-sm;}
  &-base{font-size: $size-base;}
  &-md{font-size: $size-md;}
  &-lg{font-size: $size-lg;}
  &-xg{font-size: $size-xg;}
}

.weight{
  &-normal{font-weight: $weight-normal;}
  &-medium{font-weight: $weight-medium;}
  &-semibold{font-weight: $weight-semibold;}
  &-bold{font-weight: $weight-bold;}
}

.lineHeight{
  &-small{line-height: $lh-small;}
  &-regular{line-height: $lh-regular;}
  &-medium{line-height: $lh-medium;}
  &-large{line-height: $lh-large;}
}
</style>