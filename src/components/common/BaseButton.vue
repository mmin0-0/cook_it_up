<template>
  <button :type="type" :class="className">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset',
  className?: string,
};

const props = defineProps<ButtonProps>();
const { type, className } = toRefs(props);
</script>

<style lang="scss" scoped>
button{background-color: transparent;}
</style>