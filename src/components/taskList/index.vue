<style scoped lang='less'>
.taskListWrap {
  border: 1px solid #e8e9ea;
  .itemGroup{
    margin:0;
    padding:0;
    list-style: decimal inside !important;
    .none {
      text-align: center;
      line-height: 30px;
      list-style: none;
    }
  }
}
</style>
<template>
  <div class="taskListWrap">
    <ol class="itemGroup" type='1'>
      <li v-if="!task||task.length==0" class="none">点击添加按钮，开始添加第一个项目</li>
      <menu :task="task" :members="members" :select-item="selectItem" :islabel='islabel'></menu>
    </ol>
  </div>
</template>

<script>
import VueEvent from "../model/VueEvent.js";
import menu from "../menu";
export default {
  name: "taskList",
  components: {
    menu
  },
  props: {
    task: {
     
    },
    selectItem: {},
    members: {},
    selectId: {},
    islabel:{
      default:false
    }
  },
  methods: {},
  ready() {
    var self = this;
    // 选择触发的事件
    VueEvent.$on("select-item", function(item, id) {
      self.$emit("select-item", self.task, item, id);
    });
    // 完成触发的事件
    VueEvent.$on("check-change", function(item) {
      self.$emit("check-change", self.task, item);
    });
    // 标题更改的事件
    VueEvent.$on("title-change", function(item, title,id) {
      self.$emit("title-change", self.task, item, title);
    });
    // 关注者更改的事件
    VueEvent.$on("charge-change", function(item, val) {
      if (item && val) {
        self.$emit("charge-change", self.task, item, val);
      }
    });
    // 拖拽事件
    VueEvent.$on("drag-change", function(itemOne, itemTwo) {
      self.$emit("drag-change", self.task, itemOne, itemTwo);
    });
  }
};
</script>

