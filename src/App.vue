<template>
  <div id="container">
    <Visual v-if="!isDetailPage" />
    <main id="content">
      <router-view/>
    </main>
    <QuickMenu v-if="!isDetailPage" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Visual from '@/components/layout/Visual.vue';
import QuickMenu from '@/components/layout/QuickMenu.vue';

const route = useRoute();
const isDetailPage = computed(() => route.path.startsWith('/detail'));
</script>