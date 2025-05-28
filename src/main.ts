import { createApp } from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'
import '@/assets/scss/_index.scss';
import { createHead } from '@vueuse/head';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass, faArrowLeft, faArrowUp, faHouse, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as noneHeart } from '@fortawesome/free-regular-svg-icons' 
import BaseButton from '@/components/common/BaseButton.vue';

const app = createApp(App);

const head = createHead();
head.addHeadObjs({
  title: 'Cook It UP',
  meta: [
    {name: 'description', content: '재료 기반 요리 추천 서비스. 냉장고 속 재료를 입력하면 만들 수 있는 다양한 레시피를 추천해드립니다.'},
    {property: 'og:title', content: 'Cook It Up'},
    {property: 'og:description', content: '재료 기반 요리 추천 서비스. 냉장고 속 재료를 입력하면 만들 수 있는 다양한 레시피를 추천해드립니다.'},
    {property: 'og:image', content: '/logo.png'},
    {property: 'og:type', content: 'website'},
  ]
});

library.add(faMagnifyingGlass, faArrowLeft, faArrowUp, faHouse, faHeart, noneHeart);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('base-button', BaseButton);

app.use(store).use(router).use(head).mount('#app');