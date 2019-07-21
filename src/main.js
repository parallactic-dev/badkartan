import Vue from 'vue'
import App from './App.vue'
import './gmap'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
