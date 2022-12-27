import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

import ptBR from "./locales/pt_br.json";

import "@/style.css";
import "@/assets/stylus/__colors.styl";

const i18n = createI18n({
  legacy: true,
  allowComposition: true,
  locale: "pt-br",
  messages: {
    "pt-br": ptBR,
  },
});
const pinia = createPinia();
const app = createApp(App);

app.use(i18n);
app.use(pinia);
app.mount("#app");
