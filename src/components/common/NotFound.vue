<template>
  <section class="not-found">
    <Typography weight="medium" line-height="medium">
      404 Not Found <br />
      요청하신 페이지 정보가 없습니다 :(
    </Typography>
    <base-button class="secondry-button" @click="goToHome">메인으로</base-button>
  </section>
</template>

<script setup lang="ts">
  import Typography from '@/components/common/Typography.vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const goToHome = () => {router.push('/')};
</script>