<template>
  <div style="height:300px;width:60%">
    <task-list-two
      :task="task"
      :time-stamp="timeStamp"
      :members="members"
      :select-item="selectItem"
      :islabel="islabel"
      :mainid="mainid"
      :isol="isol"
      :is-title-change="isTitleChange"
      :is-open="isOpen"
      :list-id="listId"
    ></task-list-two>
  </div>
</template>
<script>
import Vue from "Vue";
import list from '../../assets/tasklist.js'
// import list from '../../assets/tasklist2.js'
export default {
  data() {
    return {
      // 任务列表
      task: list,
      // task:[],
      // 人员列表
      // timeStamp: 0,
      timeStamp: 1566273596425,
      members: [
        { nickname: "望京", mobile: 123 },
        { nickname: "朝阳门", mobile: 234 },
        { nickname: "大望路", mobile: 345 },
        { nickname: "西直门", mobile: 456 }
      ],
      // 选中的任务
      selectItem: {},
      // 是否展示层级序号
      islabel: true,
      // 组件id
      mainid: "qwertyuiop",
      // 是否展示任务序号
      isol: true,
      // 是否可以更改标题
      isTitleChange: true,
      // 是否展开打开符号
      isOpen: true,
      // 清单id,必填项
      listId: "5d53c99563e4ab4ec83d0f9b8"
    };
  },
  ready() {
  },
  methods: {}
};
</script> 
