import taskList from './components/taskList';

const Components = {
  taskList
};

const install = function(Vue) {
  Object.keys(Components).forEach((key) => {
    Vue.component(Components[key].name || key, Components[key]);
  });
};

// auto install
if(typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = Object.assign(Components, {install});   // eslint-disable-line no-undef
// 定义一个全局的数组指定位置插入方法
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};
