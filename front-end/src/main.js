import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

Vue.config.productionTip = false

var data = {
  user: undefined,
};

const getUser = async (provided_user=undefined, nocall=false) => {
  if (provided_user || nocall) {
    data.user = provided_user;
  }
  if (!data.user && !nocall) {
    try {
      let response = await axios.get('/api/users/');
      if (response.data.user) {
        data.user = response.data.user;
      }
    } catch(error) {
      console.error(error);
      data.user = undefined;
    }
  }
  return data.user;
}

new Vue({
  router,
  data,
  methods: {
    getUser: getUser
  },
  render: h => h(App)
}).$mount('#app')
