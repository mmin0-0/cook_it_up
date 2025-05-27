import { createApp } from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'
import '@/assets/scss/_index.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass, faArrowLeft, faArrowUp, faHouse, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as noneHeart } from '@fortawesome/free-regular-svg-icons' 
import BaseButton from '@/components/common/BaseButton.vue';

const app = createApp(App);

library.add(faMagnifyingGlass, faArrowLeft, faArrowUp, faHouse, faHeart, noneHeart);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('base-button', BaseButton);

app.use(store).use(router).mount('#app');