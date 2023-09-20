import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.$socket_domain = `${process.env.VUE_APP_SOCKET_DOMAIN}`;
app.config.globalProperties.$api_url = `${process.env.VUE_APP_API_DOMAIN}/api`;

app.mount('#app');
