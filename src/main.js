import Vue from 'vue';
import App from './App.vue';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(ViewUI);
Vue.use(VueAxios, axios);

new Vue({
  el: '#app',
  render: h => h(App)
});