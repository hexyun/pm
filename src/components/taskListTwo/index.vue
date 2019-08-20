<style lang="less" scoped>
.task-list-two {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 0;
  .task-list-two-wrap {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 1px solid #e8e8e8;
    position: relative;
    li {
      display: flex;
      line-height: 30px;
      height: 30px;
      border-bottom: 1px solid #e8e8e8;
      padding: 0 16px;
      position: relative;
      font-size: 12px;
      .itemIndex {
        font-size: 10px;
        padding: 0 5px;
        color: #cccccc;
      }
      .checkbox {
        width: 10px;
        height: 10px;
        box-sizing: border-box;
        border: 1px solid #1bb1f5;
        margin: auto 0;
        margin-left: 2px;
        position: relative;
      }

      .rank {
        font-size: 9px;
        margin-left: 9px;
        color: #999999;
      }
      .open {
        font-size: 16px;
        color: #81b9ff;
        font-weight: bold;
        margin-left: 12px;
        cursor: pointer;
      }
      .title {
        margin-left: 6px;
        flex-grow: 1;
        input {
          border: none;
          outline: none;
          color: #000;
          width: 100%;
          background: none;
        }
      }
      .right {
        display: flex;
        padding-left: 10px;
        .time {
          margin-right: 5px;
          overflow: hidden;
        }
        .over {
          color: red;
        }
        .priority {
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          color: rgba(0, 0, 0, 0);
          border-radius: 3px;
          margin: auto;
          vertical-align: middle;
          font-size: 14px;
        }
        .wary {
          color: black;
        }
        .warning {
          color: red;
        }
        .error {
          color: #fff;
          background: red;
        }
        .leader {
          color: #666666;
        }
      }
    }
    .done {
      .checkbox {
        border: none;
      }
      .checkbox:before {
        position: absolute;
        left: 0;
        top: 0;
        content: "\2713";
        width: 100%;
        height: 100%;
        color: #484848;
        font-size: 10px;
        line-height: 10px;
        font-weight: bold;
      }
      .title {
        input {
          color: #999999;
        }
      }
    }
    .selected {
      background: #e5e5e5;
    }
  }
}
.task-list-two::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #e5e5e5;
  border-radius: 3px;
}
.task-list-two::-webkit-scrollbar-thumb {
  background: #a0a0a0;
  border-radius: 3px;
}
</style> 

<template>
  <div class="task-list-two" v-el:taskListTwo @scroll="handleScroll">
    <div :style="{height: contentHeight + 'px'}">
      <ul class="task-list-two-wrap" v-el:content>
        <li
          v-for="(index , listItem) in visibleData"
          class="list-item"
          :class="{'done':listItem.finish_time,'selected':selectItem._id==listItem._id}"
          :key="index"
          @click="selectThis(listItem)"
        >
          <!-- visibleData -->
          <div class="itemIndex" v-if="isol">{{listItem.ind}}</div>
          <div class="checkbox" @click="changeDone(listItem)"></div>
          <div class="rank" v-if="islabel">{{listItem.positionInd}}</div>
          <div
            class="open"
            v-if="isOpen"
            @click="changeOpen(listItem)"
          >{{listItem.hasChildren?listItem.isOpen?'-':'+':''}}</div>
          <div class="title">
            <input
              type="text"
              v-model="listItem.task_name"
              :readonly="!isTitleChange"
              @blur="changeTitle(listItem)"
            />
          </div>
          <div class="right">
            <div
              class="time"
              v-if="!listItem.finish_time && listItem.deadline"
              :class="{'over':listItem.deadline<new Date().getTime()}"
            >{{listItem.deadline|totime}}</div>
            <div
              class="priority"
              :class="{'wary':listItem.priority==2,'warning':listItem.priority ==3,'error':listItem.priority==4}"
            >★</div>
            <div class="leader" @click="changeLeader(listItem)">
              <!-- {{listItem.nickname||'请选择'}} -->
              <charge :members="members" :list-Item="listItem" :mainid="mainid"></charge>
            </div>
          </div>
        </li>
      </ul>
      <!-- <charge-two :members="members" :list-Item="listItem" :mainid="mainid"></charge-two> -->
    </div>
  </div>
</template>

<script>
import Vue from "Vue";
// import chargeTwo from "../chargeTwo";
import charge from "../charge";
import memory from "../model/memory.js";
import dragAndDrop from "vue-drag-and-drop";
import { setTimeout } from "timers";
Vue.use(dragAndDrop);
export default {
  name: "taskListTwo",
  components: {
    // chargeTwo
    charge
  },
  props: {
    task: {},
    timeStamp: {},
    members: {},
    selectItem: {},
    islabel: {},
    mainid: {},
    isol: {},
    isTitleChange: {},
    isOpen: {},
    listId: {}
  },
  data() {
    return {
      visibleData: [],
      itemsHeight: 30,
      searchListShow: false
    };
  },
  filters: {
    totime: function(val) {
      var leftTime, d, h, m, s, times;
      leftTime = val - new Date().getTime();
      if (leftTime >= 0) {
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        m = Math.floor((leftTime / 1000 / 60) % 60);
        s = Math.floor((leftTime / 1000) % 60);
        times = d + "天" + h + "小时";
      } else {
        d = Math.ceil(leftTime / 1000 / 60 / 60 / 24);
        h = Math.ceil((leftTime / 1000 / 60 / 60) % 24);
        m = Math.ceil((leftTime / 1000 / 60) % 60);
        s = Math.ceil((leftTime / 1000) % 60);
        times = "超期 " + -d + "天" + -h + "小时";
      }
      return times;
    }
  },
  computed: {
    contentHeight: function() {
      return this.tasks.length * this.itemsHeight;
    },
    tasks: function() {
      var list = this.task;
      var arr = [];
      // 如果是新增数据，并且本地有存储
      if (this.timeStamp && memory.get("hex_" + this.listId)) {
        // 获取本地存储
        arr = memory.get("hex_" + this.listId);
        // 遍历新增数据
        for (let i = 0; i < list.length; i++) {
          // 遍历渲染数组，查找有没有同一条数据的id
          var target = arr.filter((item, index) => {
            if (list[i]._id == item._id) {
              // 如果removed，是删除的数据
              if (list[i].removed > 0) {
                arr.splice(index, 1);
              } else {
                // 如果没有removed，是修改的
                arr.splice(index, 1, list[i]);
              }
              return true;
            } else {
              return false;
            }
          });
          // 如果没有的话，证明是新添加的数据
          if (!target || !target.length) {
            arr.forEach((item, index) => {
              if (item._id == list[i].father_id) {
                arr.insert(index + 1, list[i]);
              }
            });
          }
        }
        arr = this.taskListSort(arr);
      } else {
        // 数据排序处理
        arr = this.taskListSort(this.task);
      }
      // 把修改和排序后的数据存入缓存
      memory.set("hex_" + this.listId, arr);
      // 存储一个字典
      var taskSlist = memory.get("taskSlist");
      // 如果有这个字典
      if (taskSlist) {
        // 如果字典内没有这个id
        if (taskSlist.indexOf(this.listId) == -1) {
          // 如果字典长度没超过5，直接加上
          if(taskSlist.length<5){
            taskSlist.push(this.listId)
            memory.set("taskSlist", taskSlist);
          }else{
            // 如果超过了，删除第一个
            let a=taskSlist[0];
            taskSlist.push(this.listId)
            taskSlist.shift();
            memory.remove("hex_" + a);
            memory.set("taskSlist", taskSlist);
          }
        }
      } else {
        // 如果没有，创建字典
        memory.set("taskSlist", [this.listId]);
      }
      // 如果缓存满了，给个提示
      if (!memory.set("hex_" + this.listId, arr)) {
        console.log("缓存已经满了，请重新加载");
      }
      // memory.clear();
      return arr;
    }
  },
  methods: {
    updateVisibleData(scrollTop) {
      scrollTop = scrollTop || 0;
      // 计算父级元素能渲染几个dom
      const visibleCount = Math.ceil(
        this.$els.tasklisttwo.offsetHeight / this.itemsHeight
      );
      // 根据滚动条计算第一个元素应该是哪个
      const start = Math.floor(scrollTop / this.itemsHeight);
      // 计算最后一个元素
      const end = start + visibleCount;
      // 获取需要渲染的列表
      this.visibleData = this.tasks.slice(start, end);
      // 更改滚动元素的偏移值
      this.$els.content.style.webkitTransform = `translate3d(0, ${start *
        this.itemsHeight}px, 0)`;
    },
    handleScroll() {
      // 滚动的时候执行列表更新事件
      const scrollTop = event.target.scrollTop;
      this.updateVisibleData(scrollTop);
    },
    taskListSort(list) {
      // 创建一个空数组用来储存结果
      var arr = [];
      const getChildren = (list, k, v, positionInd) => {
        // 找到fatherid是这个id的任务
        const children = list.filter(item => {
          if (item[k] && v._id) {
            return item[k] + "" === v._id + "";
          }
          return item[k] === v._id;
        });
        // 如果有子任务
        if (children.length) {
          v.hasChildren = true;
          children.map((item, index) => {
            // 拼接序列号
            item.positionInd = positionInd + "." + (index + 1);
            arr.push(item);
            getChildren(list, k, item, item.positionInd);
          });
        } else {
          // 如果没有赋值没有子任务
          v.hasChildren = false;
        }
        return arr;
      };
      // 存储第一级任务
      var listOne = [];
      for (let i = 0; i < list.length; i++) {
        if (!list[i].father_id) {
          listOne.push(list[i]);
        }
      }
      // 遍历第一级任务，并获取所有子集任务
      for (let i = 0; i < listOne.length; i++) {
        // 赋值序列号
        listOne[i].positionInd = i + 1;
        arr.push(listOne[i]);
        // 遍历获取子任务
        getChildren(list, "father_id", listOne[i], i + 1);
      }
      // 赋值任务序号
      for (let i = 0; i < arr.length; i++) {
        arr[i].ind = i + 1;
      }
      return arr;
    },
    // changeOpen(item) {
    //   console.log(item);
    //   Vue.set(item, "isOpen", true);
    // },
    selectThis(item) {
      this.selectItem = item;
    },
    changeDone(item) {
      if (item.finish_time) {
        item.finish_time = null;
      } else {
        item.finish_time = new Date().getTime();
      }
      console.log(item.finish_time);
    },
    changeTitle(item) {
      console.log(item.task_name);
    },
    changeLeader(item) {
      // this.searchListShow=true;
    }
  },
  created() {},
  ready() {
    var self = this;
    self.updateVisibleData();
  }
};
</script>
  
