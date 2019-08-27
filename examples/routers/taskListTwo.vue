<template>
  <div style="height:300px;width:60%">
    <button @click="selectId">选中指定id</button>
    <button @click="scrollTo">滚动到指定id</button>
    <button @click="getId">获取id数据</button>
    <button @click="changeId">修改id数据</button>
    <button @click="addTask(addItem,1)">添加同级数据</button>
    <button @click="addTask(addItem,0)">添加子级数据</button>
    <button @click="delTask">删除数据</button>
    <button @click="changeTask">更改数据</button>
    <br />
    <button @click="taskListSortControl('create_uid')">创建人排序</button>
    <button @click="taskListSortControl('complete_uid')">完成人排序</button>
    <button @click="taskListSortControl('leader_uid')">负责人排序</button>
    <button @click="taskListSortControl('create_time')">创建时间排序</button>
    <button @click="taskListSortControl('deadline')">截止时间排序</button>
    <button @click="taskListSortControl('finish_time')">完成时间排序</button>
    <button @click="taskListSortControl('status')">完成状态排序</button>
    <button @click="taskListSortControl('priority','unone')">优先级排序</button>
    <input type="text" v-model="filters">
    <button @click='filtersValue'>过滤</button>
    <task-list-two
      v-ref:listTwo
      :task="task"
      :time-stamp="timeStamp"
      :members="members"
      :select-item="selectItem"
      :islabel="islabel"
      :mainid="mainid"
      :isol="isol"
      :is-title-change="isTitleChange"
      :list-id="listId"
      @select-item_qwertyuiop="selected"
      @check-change_qwertyuiop="changeDone"
      @title-change_qwertyuiop="changeTitle"
      @charge-change_qwertyuiop="chargeChange"
      @loaded-change_qwertyuiop="loadedChange"
    ></task-list-two>
  </div>
</template>
<script>
import Vue from "Vue";
import list from "../../assets/tasklist.js";
import list2 from "../../assets/tasklist2.js";
export default {
  data() {
    return {
      // 任务列表
      task: list,
      // task:[],
      // 人员列表
      timeStamp: 0,
      // timeStamp: 1566273596425,
      members: [
        { nickname: "1望京", mobile: 123, user_id: '593e44b855a86260805ba046' },
        { nickname: "2朝阳门", mobile: 234, user_id: '593e44b855a86260805ba047' },
        { nickname: "3大望路", mobile: 345, user_id: '593e44b855a86260805ba048' },
        { nickname: "4西直门", mobile: 456, user_id: "5a9f4ae9cca7de17b7bb7596" }
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
      listId: "5d53c99563e4ab4ec83d0f9b8",
      addItem: {
        _id: "5d53eba9571c63432db594c2412",
        archived: false,
        desc: "",
        type: "task",
        os: "web",
        status: "finished",
        priority: 1,
        hex_type: "flow",
        leader_uid: null,
        finish_time: 1565924176351,
        process_time: [],
        removed: 0,
        task_name: "adddd",
        workspace_id: "5d53d54eadffd65cd99b3477",
        inventory_id: "5d53e0e313c5491b655c5024",
        project_id: "5d53d9cc7d1cd15d2ae8e47c",
        app_id: "5d53d9eb681b815d3277965c",
        page_id: "5d53d9eb681b815d32779662",
        flow_id: "5d53d9ec681b815d32779722",
        create_uid: "593e44b855a86260805ba046",
        // father_id: "5d53eabd7b846b3ff53dbe69",
        path:
          "5d53e0e313c5491b655c5024/5d53e0e313c5491b655c5025/5d53eabd7b846b3ff53dbe69/5d53eabd7b846b3ff53dbe77/5d53eba9571c63432db594c2",
        __v: 0,
        complete_uid: "593e44b855a86260805ba046"
      },
      filters:''
    };
  },
  ready() {},
  methods: {
    // v2
    changeTask() {
      this.timeStamp = 123;
      this.task = list2;
    },
    selectId() {
      this.$refs.listtwo.selectId("5d53eabd7b846b3ff53dbe69");
    },
    scrollTo() {
      this.$refs.listtwo.scrollTo("5d53eabd7b846b3ff53dbe69");
    },
    getId() {
      console.log(this.$refs.listtwo.changeGetItem("5d53eabd7b846b3ff53dbe69"));
    },
    changeId() {
      this.$refs.listtwo.changeGetItem(
        "5d53eabd7b846b3ff53dbe69",
        "task_name",
        "修改后的标题"
      );
    },
    selected(list, item) {
      // console.log(item)
    },
    changeDone(list, item) {
      console.log(item.finish_time);
    },
    changeTitle(list, item) {
      console.log(item.task_name);
    },
    chargeChange(list, item) {
      console.log(list,item);
    },
    loadedChange(){
      console.log(123)
    },
    delTask() {
      this.$refs.listtwo.delTask();
    },
    addTask(item) {
      this.$refs.listtwo.addTask(item);
    },
    taskListSortControl(type,fil) {
      this.$refs.listtwo.taskListSortControl(type,fil);
    },
    filtersValue(){
      console.log(this.$refs.listtwo.filterValue(this.filters));
    }
  }
};
</script> 
