import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './app.vue';
import index from '../src/index';

Vue.use(VueRouter);
Vue.use(index);
// 开启debug模式
Vue.config.debug = true;

// 路由配置
var router = new VueRouter();

router.map({
  '/taskList': {
    component: function(resolve) {
      require(['./routers/taskList.vue'], resolve);
    }
  },
  '/taskListTwo': {
    component: function(resolve) {
      require(['./routers/taskListTwo.vue'], resolve);
    }
  }
});

router.beforeEach(function() {
  window.scrollTo(0, 0);
});

router.afterEach(function(transition) {

});

router.redirect({
  '*': "/taskListTwo"
});
router.start(App, '#app');
