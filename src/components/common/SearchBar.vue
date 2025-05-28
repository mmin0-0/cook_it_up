<template>
  <div class="search-wrap">
    <form @submit.prevent="onSearch">
      <div class="input-wrap">
        <input
          v-model="searchQuery"
          type="text"
          id="search"
          placeholder="재료를 입력해주세요."
          @keydown.space.prevent
        />
        <label for="search" class="hide">검색영역</label>
        <base-button type="submit">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </base-button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const searchQuery = ref('');
const onSearch = async () => {
  if(searchQuery.value.trim()){
    await store.dispatch('fetchFoods', searchQuery.value);
    router.push({path: '/search', query: {query: searchQuery.value}});
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/searchBar.scss';
</style>