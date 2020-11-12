import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './theme/index.less'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import axios from 'axios'
import '@/mock'
import store from './store'
import PouchDB from 'pouchdb'
import 'animate.css/source/animate.css'
import VueI18n from 'vue-i18n'
import Plugins from '@/plugins'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Antd)
Vue.use(VueI18n)
Vue.use(Plugins)

const i18n = new VueI18n({
  locale: 'CN',
  fallbackLocale: 'US',
  silentFallbackWarn: true
})

// router.beforeEach((to, from, next) => {
//   console.log(to.meta);
//   const token = sessionStorage.getItem("access_token")
//   if (to.meta.requireAuth) {
//     console.log(token);
//     if (token) {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })
// export default router;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted() {
    let db = new PouchDB('adminDb')
    db.get('currUser').then(doc => {
      this.$store.commit('account/setUser', doc.user)
    })
  },
}).$mount('#app')
