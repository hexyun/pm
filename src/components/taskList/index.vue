<style scoped lang='less'>
.taskListWrap {
  border: 1px solid #e8e9ea;
  position: relative;
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
      <menu :task="task" :members="members" :select-item="selectItem" :islabel='islabel' :mainid='mainid' :isol='isol' :is-title-change='isTitleChange'></menu>
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
    task: {},
    selectItem: {},
    members: {},
    selectId: {},
    islabel:{default:false},
    mainid:{},
    isol:{},
    isTitleChange:{}
  },
  methods: {},
  ready() {
    var self = this;
    // 选择触发的事件
    VueEvent.$on("select-item_"+self.mainid, function(item, id) {
      self.$emit("select-item_"+self.mainid, self.task, item, id);
    });
    // 完成触发的事件
    VueEvent.$on("check-change_"+self.mainid, function(item) {
      self.$emit("check-change_"+self.mainid, self.task, item);
    });
    // 标题更改的事件
    VueEvent.$on("title-change_"+self.mainid, function(item, title,id) {
      self.$emit("title-change_"+self.mainid, self.task, item, title);
    });
    // 关注者更改的事件
    VueEvent.$on("charge-change_"+self.mainid, function(listitem, item) {
      self.$emit("charge-change_"+self.mainid, self.task, listitem, item);
    });
    // 拖拽事件
    VueEvent.$on("drag-change_"+self.mainid, function(itemOne, itemTwo) {
      self.$emit("drag-change_"+self.mainid, self.task, itemOne, itemTwo);
    });
  }
};
</script>

