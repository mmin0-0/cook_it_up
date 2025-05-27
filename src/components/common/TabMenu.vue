<template>
  <div :class="`tab-menu ${className}`">
    <base-button
      type="button"
      v-for="(tabMenu, idx) in tabMenus" 
      :key="idx"
      :class="{on : tabMenu === selected}"
      @click="onSelect(tabMenu)"
    >
    {{ tabMenu }}
    </base-button>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps<{
  tabMenus: string[];
  selected: string;
  className?: string;
}>();
const { tabMenus, selected, className } = toRefs(props);

const emit = defineEmits<{
  (e: 'update:selected', value: string): void;
}>();

const onSelect = (tab: string) => {
  emit('update:selected', tab);
};
</script>
