import { createApp } from 'vue';
import { Quasar } from 'quasar';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';

import 'quasar/src/css/index.sass';



const app = createApp(App);

const pinia = createPinia();

app.use(Quasar, {
  plugins: {}, 
});
app.use(pinia);
app.use(router);

app.mount('#app');
