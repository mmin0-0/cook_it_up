<template>
  <div class="visual">
    <router-link to="/" class="logo">
      <img src="@/assets/logo.png" alt="cook it up" />
    </router-link>
    <div class="title-wrap">
      <Typography as="h2" size="lg" weight="bold">오늘 뭐 먹지?</Typography>
      <Typography lineHeight="medium">주 재료를 입력하여 메뉴 추천을 받아보세요!</Typography>
    </div>
    <SearchBar />
  </div>
</template>

<script setup lang="ts">
import Typography from '@/components/common/Typography.vue';
import SearchBar from '@/components/common/SearchBar.vue';
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/layout/visual.scss';
</style>