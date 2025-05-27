<template>
  <div :class="`img-wrap ${className}`">
    <img :src="getImageSrc(src)" :alt="alt" />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps({
  className: String,
  src: {type: String, required: true},
  alt: {type: String, required: true},
});
const { className, src, alt } = toRefs(props);

const getImageSrc = (src:string) => {
  if (typeof src !== 'string') return ''

  return src.startsWith('http') || src.startsWith('https') ? src : `/images/${src}`;
};
</script>
