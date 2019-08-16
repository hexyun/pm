<template>
  <div>
    <task-list :task="task" :members='members' :select-item='selectItem' :select-id='selectId' :islabel='islabel' mainid='qwe' ></task-list>
  </div>
</template>
<script>
import Vue from "Vue";

export default {
  data() {
    return {
      task: [
        {
          archived: false,
          desc: "树状任务第1级",
          //数据的类型（task/label1/label2/label3）
          type: "task",
          status: "normal",
          //紧急度
          priority: 1,
          hex_type: "app",
          attach: [],
          comments: [],
          //完成任务的时间戳
          finish_time: 1234567891234,
          //任务截止时间
          deadline: 1234567891234,
          logs: [],
          leader_uid: null,
          followers: [],
          process_time: [],
          removed: 0,
          //负责人姓名
          nickname: "123",
          _id: Math.ceil(Math.random() * 100000000),
          //任务名
          task_name: "树状任务第1级1",
          inventory_id: "5d1addf758402127d8d5a262",
          workspace_id: "5d1addf758402127d8d5a262",
          father_id: "5d4aa076136f553a0489e549",
          path:
            "/5d1addf758402127d8d5a262/5d4a9109fb33cb3df85ce76a/5d4a9182fb33cb3df85ce76d/5d4aa076136f553a0489e549",
          os: "web",
          create_uid: "5d1addf758402127d8d5a262",
          update_time: 1565340813154,
          create_time: 1565340813154,
          __v: 0,
          //子集
          children: [
            {
              archived: false,
              desc: "树状任务第1级",
              type: "task",
              status: "normal",
              priority: 1,
              hex_type: "app",
              attach: [],
              comments: [],
              logs: [],
              leader_uid: null,
              followers: [],
              finish_time: null,
              process_time: [],
              removed: 0,
              _id: Math.ceil(Math.random() * 100000000),
              task_name: "树状任务第1级1",
              inventory_id: "5d1addf758402127d8d5a262",
              workspace_id: "5d1addf758402127d8d5a262",
              father_id: "5d4aa076136f553a0489e549",
              path:
                "/5d1addf758402127d8d5a262/5d4a9109fb33cb3df85ce76a/5d4a9182fb33cb3df85ce76d/5d4aa076136f553a0489e549",
              os: "web",
              create_uid: "5d1addf758402127d8d5a262",
              update_time: 1565340813154,
              create_time: 1565340813154,
              __v: 0,
              children: [
                {
                  archived: false,
                  desc: "树状任务第1级",
                  type: "task",
                  status: "normal",
                  priority: 1,
                  hex_type: "app",
                  attach: [],
                  comments: [],
                  logs: [],
                  leader_uid: null,
                  followers: [],
                  finish_time: null,
                  process_time: [],
                  removed: 0,
                  _id: Math.ceil(Math.random() * 100000000),
                  task_name: "树状任务第1级1",
                  inventory_id: "5d1addf758402127d8d5a262",
                  workspace_id: "5d1addf758402127d8d5a262",
                  father_id: "5d4aa076136f553a0489e549",
                  path:
                    "/5d1addf758402127d8d5a262/5d4a9109fb33cb3df85ce76a/5d4a9182fb33cb3df85ce76d/5d4aa076136f553a0489e549",
                  os: "web",
                  create_uid: "5d1addf758402127d8d5a262",
                  update_time: 1565340813154,
                  create_time: 1565340813154,
                  __v: 0
                }
              ]
            }
          ]
        },
        {
          archived: false,
          desc: "树状任务第1级",
          //数据的类型（task/label1/label2/label3）
          type: "task",
          status: "normal",
          //紧急度
          priority: 1,
          hex_type: "app",
          attach: [],
          comments: [],
          //完成任务的时间戳
          finish_time: 1234567891234,
          //任务截止时间
          deadline: 1234567891234,
          logs: [],
          leader_uid: null,
          followers: [],
          process_time: [],
          removed: 0,
          //负责人姓名
          nickname: "123",
          _id: Math.ceil(Math.random() * 100000000),
          //任务名
          task_name: "树状任务第1级2",
          inventory_id: "5d1addf758402127d8d5a262",
          workspace_id: "5d1addf758402127d8d5a262",
          father_id: "5d4aa076136f553a0489e549",
          path:
            "/5d1addf758402127d8d5a262/5d4a9109fb33cb3df85ce76a/5d4a9182fb33cb3df85ce76d/5d4aa076136f553a0489e549",
          os: "web",
          create_uid: "5d1addf758402127d8d5a262",
          update_time: 1565340813154,
          create_time: 1565340813154,
          __v: 0
        }
      ],
      members: [{ nickname: "第一个1", mobile: 123 },{ nickname: "第一个2", mobile: 234 }]
    };
  },
  ready() {},
  methods: {
    
  }
};
</script>
