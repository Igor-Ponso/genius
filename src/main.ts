import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { BiLinkedin } from 'oh-vue-icons/icons';
import ptBR from './locales/pt_br.json';

import '@/style.css';
import '@/assets/stylus/__colors.styl';
import '@/assets/stylus/__spacing.styl';

addIcons(BiLinkedin);

const i18n = createI18n({
  legacy: true,
  allowComposition: true,
  locale: 'pt-br',
  messages: {
    'pt-br': ptBR,
  },
});
const pinia = createPinia();
const app = createApp(App);

app.component('v-icon', OhVueIcon);
app.use(i18n);
app.use(pinia);
app.mount('#app');
