<template>
<div style="height:500px">
    <task-list-two
      :task="task"
      :members="members"
      :select-item="selectItem"
      :islabel="islabel"
      :mainid="mainid"
      :isol="isol"
      :is-title-change="isTitleChange"
    ></task-list-two>
</div>
</template>
<script>
import Vue from "Vue";

export default {
  data() {
    return {
      task: [
        {
          _id: "5d54bf17a751c5137438ed29",
          archived: false,
          desc: "",
          type: "task",
          os: "web",
          status: "normal",
          priority: 1,
          hex_type: "app",
          leader_uid: "5d1addf758402127d8d5a262",
          finish_time: 1565835347745,
          deadline: 1608131461000,
          removed: 0,
          task_name: "新人的任务一级",
          inventory_id: "5d53c99563e4ab4ec83d0f9b",
          path: "5d53c99563e4ab4ec83d0f9b/5d54bf17a751c5137438ed29",
          create_uid: "5d23f8a531d54637685bbe1d",
          complete_uid: "5d23f8a531d54637685bbe1d",
          update_time: 1565835031803,
          create_time: 1565835031803,
          nickname: 123
        },
        {
          _id: "6664bf17a751c5137438ed29",
          archived: false,
          desc: "",
          type: "task",
          os: "web",
          status: "normal",
          priority: 2,
          hex_type: "app",
          leader_uid: "5d1addf758402127d8d5a262",
          finish_time: null,
          deadline: 1566202353288,
          removed: 0,
          task_name: "新人的任务一级",
          inventory_id: "5d53c99563e4ab4ec83d0f9b",
          path:
            "5d53c99563e4ab4ec83d0f9b/5d54bf17a751c5137438ed29/6664bf17a751c5137438ed29",
          create_uid: "5d23f8a531d54637685bbe1d",
          father_id: "5d54bf17a751c5137438ed29",
          complete_uid: "5d23f8a531d54637685bbe1d",
          update_time: 1565835031803,
          create_time: 1565835031803,
          nickname: 456
        },
        {
          _id: "7774bf17a751c5137438ed29",
          archived: false,
          desc: "",
          type: "task",
          os: "web",
          status: "normal",
          priority: 4,
          hex_type: "app",
          leader_uid: "5d1addf758402127d8d5a262",
          finish_time: 1565835347745,
          deadline: 1608131461000,
          removed: 0,
          task_name: "新人的任务一级",
          inventory_id: "5d53c99563e4ab4ec83d0f9b",
          path:
            "5d53c99563e4ab4ec83d0f9b/5d54bf17a751c5137438ed29/6664bf17a751c5137438ed29/7774bf17a751c5137438ed29",
          create_uid: "5d23f8a531d54637685bbe1d",
          father_id: "6664bf17a751c5137438ed29",
          complete_uid: "5d23f8a531d54637685bbe1d",
          update_time: 1565835031803,
          create_time: 1565835031803,
          nickname: 789
        }
      ],
      members: [
        { nickname: "望京", mobile: 123 },
        { nickname: "朝阳门", mobile: 234 },
        { nickname: "大望路", mobile: 345 },
        { nickname: "西直门", mobile: 456 }
      ],
      selectItem: {},
      islabel: true,
      mainid: "qwertyuiop",
      isol: true,
      isTitleChange: true
    };
  },
  ready() {
    for (let i = 0; i < 50000; i++) {
      var obj = {
        _id: Math.ceil(Math.random()*1000000000000),
        archived: false,
        desc: "",
        type: "task",
        os: "web",
        status: "normal",
        priority: 1,
        hex_type: "app",
        leader_uid: "5d1addf758402127d8d5a262",
        deadline: 1608131461000,
        removed: 0,
        task_name: "新人的任务一级"+i,
        inventory_id: "5d53c99563e4ab4ec83d0f9b",
        path: "5d53c99563e4ab4ec83d0f9b/5d54bf17a751c5137438ed29",
        create_uid: "5d23f8a531d54637685bbe1d",
        complete_uid: "5d23f8a531d54637685bbe1d",
        update_time: 1565835031803,
        create_time: 1565835031803,
        nickname: 'test'
      };
      this.task.push(obj);
    }
  },
  methods: {}
};
</script> 
