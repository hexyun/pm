/*
 * @Author: yangzhenfeng 
 * @Date: 2019-08-31 20:52:26 
 * @Last Modified by: 杨振峰
 * @Last Modified time: 2019-09-17 11:35:33
 */
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
      box-sizing: border-box;
      cursor: pointer;
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
        flex-shrink: 0;
      }

      .rank {
        font-size: 9px;
        text-indent: 0.5rem;
        color: #999999;
      }
      .open,
      .close {
        font-size: 16px;
        color: #81b9ff;
        font-weight: bold;
        margin-left: 12px;
        cursor: pointer;
      }
      .open::before {
        position: relative;
        left: 0;
        top: 0;
        content: "-";
        width: 100%;
        height: 100%;
        color: #484848;
        font-size: 10px;
        line-height: 10px;
        font-weight: bold;
      }
      .close::before {
        position: relative;
        left: 0;
        top: 0;
        content: "+";
        width: 100%;
        height: 100%;
        color: #484848;
        font-size: 10px;
        line-height: 10px;
        font-weight: bold;
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
        flex-shrink: 0;
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
          margin-right: 5px;
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
      .label {
        width: 50%;
        margin-left: -16px;
        background: #999;
        color: #fff;
        border-radius: 0 4px 4px 0;
        font-size: 16px;
        padding-left: 10px;
        div {
          float: left;
        }
      }
      .priority {
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: rgba(0, 0, 0, 0);
        border-radius: 3px;
        margin: auto;
        margin-right: 5px;
        vertical-align: middle;
        font-size: 14px;
        margin: 5px;
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
          track-by="$index"
          class="list-item"
          :class="{'done':listItem.finish_time,'selected':selectItem._id==listItem._id&&listItem.type!=='label'}"
          :id="'c'+listItem._id"
          :key="index"
          @click="selectThis(listItem)"
          v-show="typeof listItem.show === 'undefined' || listItem.isShow"
        >
          <div v-if="listItem.type=='label'" class="label">
            <div>{{listItem.text}}</div>
            <div
              v-if="listItem.priority"
              class="priority"
              :class="{'wary':listItem.priority==2,'warning':listItem.priority ==3,'error':listItem.priority==4}"
            >★</div>
            <div>{{listItem.num}}</div>
          </div>
          <template v-if="listItem.type!=='label'">
            <!-- visibleData -->
            <div class="itemIndex" v-if="isol">{{listItem.ind}}</div>
            <div class="checkbox" @click="changeDone(listItem)"></div>
            <div
              class="rank"
              v-if="islabel"
              :style="{'text-indent':listItem.positionInd&&listItem.positionInd.length?listItem.positionInd.split('.').length*0.8+'rem':'.5rem'}"
            >{{listItem.positionInd}}</div>
            <div
              :class="{'open': listItem.isOpen, 'close': !listItem.isOpen}"
              v-show="listItem.hasChildren"
              @click="showSwitch(listItem)"
            ></div>
            <div class="title">
              <input
                type="text"
                v-model="listItem.task_name"
                :readonly="!isTitleChange"
                :id="'c'+listItem._id+'_input'"
                @focus="savePreTitle(listItem.task_name)"
                @blur="changeTitle(listItem)"
                placeholder="任务名称"
                v-el:taskName
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
              <div class="leader" @click="changeLeader(listItem)">{{listItem.leader_uid|toNickName}}</div>
            </div>
          </template>
        </li>
      </ul>
      <charge-two
        v-el:dropdown
        v-show="searchListShow"
        class="dropDown"
        :style="selectXY"
        :members="members"
        :mainid="mainid"
        v-clickoutside="changeOff"
      ></charge-two>
    </div>
  </div>
</template>

<script>
import Vue from "Vue";
import VueEvent from "../model/VueEvent.js";
import chargeTwo from "../chargeTwo";
import memory from "../model/memory.js";
import dragAndDrop from "vue-drag-and-drop";
import clickoutside from "../../directives/clickoutside.js";
import { setTimeout } from "timers";
Vue.use(dragAndDrop);
export default {
  name: "taskListTwo",
  components: {
    chargeTwo
  },
  directives: {
    clickoutside
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
    listId: {}
  },
  data() {
    return {
      visibleData: [],
      itemsHeight: 30,
      searchListShow: false,
      selectXY: { left: 0, top: 0 },
      preTitle: "",
      mergedData: [],
      mergedDataCopy: [],
      halfTask: 0,
      start: 0,
      end: 10,
      lastInput:''
    };
  },
  filters: {
    // 转换剩余时间
    totime: function(val) {
      var leftTime, d, h, m, s, times;
      //获取时间差
      leftTime = val - new Date().getTime();
      // 判断时间差
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
    },
    // 转换nickname
    toNickName: function(id) {
      // 遍历人员列表，查找匹配项
      const nick = this.members.find(item => {
        if (item.user_id && item.user_id == id) {
          return true;
        } else {
          return false;
        }
      });
      // 如果没有匹配项，等于请选择
      return nick ? nick.nickname : "请选择";
    }
  },
  computed: {
    // 动态计算包裹滚动元素高度
    contentHeight: function() {
      return this.mergedData.length * this.itemsHeight;
    }
  },
  watch: {
    task: function() {
      if(this.task === undefined){
        this.task=[];
        return;
      }
      // 每次task改变的时候动态合并数据，同时更新一下视图防止卡顿，触发加载完成事件
      console.log("tasklistv2task更改成功");
      this.mergeData();
      this.$emit("loaded-change_" + this.mainid);
    }
  },
  methods: {
    // 深拷贝
    deepCopy(obj) {
      var result = Array.isArray(obj) ? [] : {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === "object" && obj[key] !== null) {
            result[key] = this.deepCopy(obj[key]);
          } else {
            result[key] = obj[key];
          }
        }
      }
      return result;
    },
    // 合并数据
    mergeData() {
      // 创建一个空数组
      var list = this.task;
      var arr = [];
      var finalData = [];
      // 如果有时间戳
      if (this.timeStamp) {
        console.log("tasklistv2数据合并");
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
            // arr.forEach((item, index) => {
            //   if (item._id == list[i].father_id) {
            //     arr.insert(index + 1, list[i]);
            //   }
            // });
            arr.push(list[i]);
          }
        }
        for (let i = 0; i < arr.length; i++) {
          arr[i].isShow = true;
        }
        finalData = arr;
      } else {
        console.log("tasklistv2数据覆盖");
        for (let i = 0; i < list.length; i++) {
          list[i].isShow = true;
        }
        finalData = list;
      }
      //拷贝一份数据，用作排序的备份
      this.mergedDataCopy = this.deepCopy(finalData);
      // 排序
      this.taskListSortControl();
      console.log("tasklistv2数据合并覆盖成功");
      // 存缓存
      this.setMemory();
    },
    // 操作缓存
    setMemory() {
      var self = this;
      // 把数据存入缓存
      memory.set("hex_" + this.listId, this.mergedData);
      // 如果缓存满了，给个提示
      console.log("tasklistv2存入缓存");
      if (!memory.set("hex_" + this.listId, this.mergedData)) {
        console.log("tasklistv2缓存已经满了，请重新加载");
        this.$emit(
          "memory-out_" + self.mainid,
          "hex_" + this.listId,
          this.mergedData
        );
      }

      // 存储一个字典
      var taskSlist = memory.get("taskSlist");
      // 如果有这个字典
      if (taskSlist) {
        // 如果字典内没有这个id
        if (taskSlist.indexOf(this.listId) == -1) {
          // 如果字典长度没超过5，直接加上
          if (taskSlist.length < 5) {
            taskSlist.push(this.listId);
            memory.set("taskSlist", taskSlist);
            console.log("tasklistv2更新缓存字典成功");
          } else {
            // 如果超过了，删除第一个
            let a = taskSlist[0];
            taskSlist.push(this.listId);
            taskSlist.shift();
            memory.remove("hex_" + a);
            memory.set("taskSlist", taskSlist);
            console.log("tasklistv2替换缓存字典成功");
          }
        }
      } else {
        // 如果没有，创建字典
        memory.set("taskSlist", [this.listId]);
        console.log("tasklistv2创建缓存字典成功");
      }
    },
    //排序接口
    taskListSortControl(type, fil) {
      // 排序数据，给显示的数据赋值
      var self = this;
      this.mergedData = this.taskListSort(this.mergedDataCopy, type, fil);
      // 如果是type更新，滚动到最上
      if (type) {
        this.$els.tasklisttwo.scrollTo(0, 1);
      }
      // 更新视图
      Vue.nextTick(function() {
        self.updateVisibleData();
      });
    },
    // 排序事件
    taskListSort(list, type, fil) {
      // 创建一个空数组用来储存结果
      var self = this;
      var arr = [];
      // 把备份数据拷贝一下，防止篡改
      var filList = self.deepCopy(list) || [];
      // 根据已完成未完成过滤
      if (fil == "done") {
        filList = list.filter((item, index) => {
          return item.finish_time ? true : false;
        });
      } else if (fil == "undone") {
        filList = list.filter((item, index) => {
          return !item.finish_time ? true : false;
        });
      }
      //默认清除序号和索引
      this.islabel = false;
      this.isol = false;
      // 根据相应的排序类型调用
      switch (type) {
        case "create_uid":
          // 第一个排序是从大到小，第二个是归类取值
          filList = this.sortData(filList, "create_uid");
          arr = this.sortDataNickName(filList, "create_uid", "创建人以移除");
          break;
        case "complete_uid":
          filList = this.sortData(filList, "complete_uid");
          arr = this.sortDataNickName(
            filList,
            "complete_uid",
            "没有完成人的任务"
          );
          break;
        case "leader_uid":
          filList = this.sortData(filList, "leader_uid");
          arr = this.sortDataNickName(
            filList,
            "leader_uid",
            "没有负责人的任务"
          );
          break;
        case "create_time":
          filList = this.sortData(filList, "create_time");
          arr = this.sortDataTime(filList, "create_time", "没有创建日期的任务");
          break;
        case "deadline":
          filList = this.sortData(filList, "deadline");
          arr = this.sortDataTime(filList, "deadline", "没有截止日期的任务");
          break;
        case "finish_time":
          filList = this.sortData(filList, "finish_time");
          arr = this.sortDataTime(filList, "finish_time", "没有完成日期的任务");
          break;
        case "status":
          // 按照创建事件排序，防止多次点击混乱
          filList = this.sortData(filList, "create_time");
          var done = [{ type: "label", text: "完成的任务", num: "" }];
          var undone = [{ type: "label", text: "未完成的任务", num: "" }];
          filList.forEach((item, index) => {
            if (item.finish_time) {
              done.push(item);
            } else {
              undone.push(item);
            }
          });
          done[0].num = "（" + (done.length - 1) + "）个";
          undone[0].num = "（" + (undone.length - 1) + "）个";
          undone.length > 1 ? (arr = arr.concat(undone)) : null;
          done.length > 1 ? (arr = arr.concat(done)) : null;
          break;
        case "priority":
          filList = this.sortData(filList, "create_time");
          var priority1 = [
            { type: "label", text: "优先级:普通", num: "", priority: 1 }
          ];
          var priority2 = [
            { type: "label", text: "优先级:重要", num: "", priority: 2 }
          ];
          var priority3 = [
            { type: "label", text: "优先级:紧急", num: "", priority: 3 }
          ];
          var priority4 = [
            { type: "label", text: "优先级:重要紧急", num: "", priority: 4 }
          ];
          filList.forEach((item, index) => {
            switch (item.priority) {
              case 1:
                priority1.push(item);
                break;
              case 2:
                priority2.push(item);
                break;
              case 3:
                priority3.push(item);
                break;
              default:
                priority4.push(item);
                break;
            }
          });
          priority1[0].num = "（" + (priority1.length - 1) + "）个";
          priority2[0].num = "（" + (priority2.length - 1) + "）个";
          priority3[0].num = "（" + (priority3.length - 1) + "）个";
          priority4[0].num = "（" + (priority4.length - 1) + "）个";
          priority4.length > 1 ? (arr = arr.concat(priority4)) : null;
          priority3.length > 1 ? (arr = arr.concat(priority3)) : null;
          priority2.length > 1 ? (arr = arr.concat(priority2)) : null;
          priority1.length > 1 ? (arr = arr.concat(priority1)) : null;
          break;
        default:
          // 打开样式
          this.islabel = true;
          this.isol = true;
          // 遍历获取子任务
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
              v.isOpen = true;
              // 排序，拼接，插值
              self
                .sortData(children, "create_time")
                .reverse()
                .map((item, index) => {
                  // 拼接序列号
                  item.positionInd = positionInd + "." + (index + 1);
                  arr.push(item);
                  getChildren(list, k, item, item.positionInd);
                });
              v.children = children;
            } else {
              // 如果没有赋值没有子任务
              v.hasChildren = false;
            }
            return arr;
          };
          // 存储第一级任务
          var listOne = filList.filter(item => {
            return !item.father_id ? true : false;
          });
          // 按照创建事件排序，防止多次点击错乱
          listOne = this.sortData(listOne, "create_time").reverse();
          // 遍历第一级任务，并获取所有子集任务
          listOne.forEach((item, index) => {
            item.positionInd = index + 1;
            arr.push(item);
            getChildren(filList, "father_id", item, index + 1);
          });
          // 赋值任务序号
          for (let i = 0; i < arr.length; i++) {
            arr[i].ind = i + 1;
          }
          break;
      }
      return arr;
    },
    sortData(list, key) {
      // 大到小排序
      // 根据不同的排序类型，对空进行处理
      var none = ".";
      if (key == "create_time" || key == "deadline" || key == "finish_time") {
        none = 0;
      }
      // 递归排序和出里空值
      for (let i = 0; i < list.length; i++) {
        if (!list[i][key]) {
          list[i][key] = none;
        }
        for (let j = i + 1; j < list.length; j++) {
          if (!list[j][key]) {
            list[j][key] = none;
          }
          var temp = {};
          if (list[i][key] < list[j][key]) {
            temp = list[j];
            list[j] = list[i];
            list[i] = temp;
          }
        }
      }
      return list;
    },
    sortDataNickName(list, type, noneTitle) {
      // 名字类型的排序
      var nickname = {};
      var target = [];
      list.forEach(item => {
        // 遍历列表
        var hasNickName = this.members.find(people => {
          // 找到有没有id对应的昵称
          return people.user_id == item[type];
        });
        // 有的话nickname等于昵称，没有的话等于none
        if (hasNickName) {
          Vue.set(item, "nickname", hasNickName.nickname);
        } else {
          Vue.set(item, "nickname", ".");
        }
        // 查看昵称列表有没有这个
        if (!nickname[item.nickname]) {
          Vue.set(nickname, item.nickname, [item]);
        } else {
          nickname[item.nickname].push(item);
        }
      });
      // 遍历昵称列表拼接
      Object.keys(nickname).forEach(item => {
        var name = item;
        if (!name || name == ".") {
          name = noneTitle;
        }
        var names = [
          {
            type: "label",
            text: name,
            num: "（" + nickname[item].length + "）个"
          }
        ];
        target = target.concat(names);
        target = target.concat(nickname[item]);
      });
      return target;
    },
    sortDataTime(list, type, noneTitle) {
      // 时间戳类型的排序
      var target = [];
      var times = [];
      list.forEach(item => {
        if (item[type]) {
          Vue.set(item, "time", this.sortToTime(item[type]));
        } else {
          Vue.set(item, "time", ".");
        }

        if (!times[item.time]) {
          Vue.set(times, item.time, [item]);
        } else {
          times[item.time].push(item);
        }
      });
      Object.keys(times).forEach(item => {
        var name = item;
        if (!name || name == ".") {
          name = noneTitle;
        }
        var names = [
          {
            type: "label",
            text: name,
            num: "（" + times[item].length + "）个"
          }
        ];
        target = target.concat(names);
        target = target.concat(times[item]);
      });
      return target;
    },
    sortToTime(time) {
      // 截取日期
      return new Date(time).toJSON().substr(0, 10);
    },

    // 滚动事件，调用更新位置
    handleScroll() {
      // 滚动的时候执行列表更新事件
      var scrollTop = event.target.scrollTop || 0;
      this.updateVisibleData(scrollTop);
    },
    // 更新列表和计算位置
    updateVisibleData(scrollTop) {
      scrollTop = scrollTop || this.$els.tasklisttwo.scrollTop || 0;
      // 计算父级元素能渲染几个dom
      const visibleCount = Math.ceil(
        this.$els.tasklisttwo.offsetHeight / this.itemsHeight
      );
      // 计算一半的位置，滚动用
      this.halfTask = Math.floor(
        this.$els.tasklisttwo.offsetHeight / this.itemsHeight / 2
      );
      // 根据滚动条计算第一个元素应该是哪个
      this.start = Math.floor(scrollTop / this.itemsHeight);
      this.end = this.start + visibleCount;
      for (let i = this.start; i < this.end; i++) {
        if (this.mergedData[i] && this.mergedData[i].isShow === false) {
          this.end++;
        }
      }
      // 获取需要渲染的列表
      this.visibleData = this.mergedData.slice(this.start, this.end);
      // 清除 visibleDate 中不显示的元素
      this.visibleData = this.visibleData.filter(item => {
        if (item.type === "label") return true;
        return item.isShow;
      });
      // this.mergedData = this.mergedData.filter( (item) => {
      //   if (item.type === 'label') return true;
      //   return item.isShow;
      // });
      // 更改滚动元素的偏移值
      this.$els.content.style.webkitTransform = `translateY(${this.start *
        this.itemsHeight}px)`;
    },
    // 获取指定id元素或者子元素和更改指定id属性
    changeGetItem(id, k, v) {
      var ind = 0;
      // 遍历查找合并后的数组
      const tar = this.mergedData.filter((item, index) => {
        if (item._id == id) {
          if (id && k) {
            // 如果有k，更改相应的数据，显示的和备份的都要改
            Vue.set(item, k, v);
            this.mergedDataCopy.find(itemCopy =>
              itemCopy._id == id ? Vue.set(itemCopy, k, v) : null
            );
          }
          ind = index;
          return true;
        }
      });
      if (tar.length !== 1) {
        console.log(
          "tasklistv2一共找到了" +
            tar.length +
            "条相同id的数据，请确认数据是否正确,如果是添加任务请无视"
        );
      }
      return tar && tar.length == 1
        ? [tar[0], ind, this.mergedData]
        : undefined;
    },
    changeGetChildrenItem(id, k, v) {
      var self = this;
      var tarArr = [];
      // 如果id是false，说明是所有任务
      if (!id) {
        id = undefined;
      }
      // 递归获取子元素
      (function getChildrens(id) {
        if (id === undefined) {
          // 如果id是false，所有的任务都是子元素
          tarArr = self.mergedData;
        } else {
          // 根据father_id过滤相应的子元素
          var children = self.mergedData.filter(item => {
            return item.father_id && item.father_id == id ? true : false;
          });
          if (children.length) {
            children.map(item => {
              tarArr.push(item);
              getChildrens(item._id);
            });
          }
        }
        return tarArr;
      })(id);
      // 如果有K，遍历获取的子元素赋值，两个都是
      if (k) {
        tarArr.forEach(item => {
          Vue.set(item, k, v);
          // 找到跟显示数据相同的这个数据并更改
          this.mergedDataCopy.find(itemCopy =>
            itemCopy._id == item._id ? Vue.set(itemCopy, k, v) : null
          );
        });
      }
      return tarArr;
    },
    // 选中指定id
    selectId(id) {
      // 调用获取任务方法，如果能找到调用选中触发的方法
      this.changeGetItem(id)
        ? this.selectThis(this.changeGetItem(id)[0])
        : null;
    },
    //滚动到指定id的位置
    scrollTo(id) {
      // 调用获取任务方法
      var a = this.changeGetItem(id);
      if (a) {
        var tarTask = 0;
        // 如果目标减去一屏任务的一般《0，第一个就是0
        if (a[1] - this.halfTask < 0) {
          tarTask = 0;
        } else {
          tarTask = a[1] - this.halfTask;
        }
        // 控制滚动条滚动到相应位置
        this.$els.tasklisttwo.scrollTo(0, tarTask * this.itemsHeight);
      }
    },

    // 增加任务
    addTask(addItem) {
      var self = this;
      //判断这个id是否重复
      if (this.changeGetItem(addItem._id)) {
        console.log("tasklistv2重复id");
      } else {
        // 添加数据
        addItem.isShow = true;
        this.mergedDataCopy.push(addItem);
        // 延迟更改滚动，等到计算完成后
        self.taskListSortControl();
        Vue.nextTick(function() {
          // 排序数据
          // 判断是否需要滚动
          self.changeGetItem(addItem._id)[1] < self.start ||
          self.changeGetItem(addItem._id)[1] >= self.end - 1
            ? self.scrollTo(addItem._id)
            : null;
          // 更改选中
          self.selectThis(addItem);
        });
      }
    },
    // 删除任务
    delTask(id) {
      var targetId = id;
      var father = "";
      var son = [];
      var next = {};
      var self = this;
      // 是否传了id
      if (!targetId) {
        // 没指定id，操作当前选中项目
        targetId = this.selectItem._id;
      }

      // 找到fatherid，判断下一个应该是哪个任务
      if (this.changeGetItem(targetId)) {
        // 获得fatherid,第一级的id是undefined
        father = this.changeGetItem(targetId)[0].father_id || undefined;
        // 判断fatherid下面有几个子集
        var brother = this.mergedData.filter((item, index) => {
          if (item.father_id == father) {
            return true;
          }
          return false;
        });
        // 如果大于一个，next等于上一个子集
        if (brother.length > 1) {
          // 判断上一个是谁
          brother.filter((item, index) => {
            // 在兄弟数组中找到这个
            if (item._id == targetId) {
              // 判断是不是第一个
              if (index == 0) {
                // 是的话下一个就是现在的第二个
                next = brother[1];
              } else {
                // 不是的话下一个就是现在的上一个
                next = brother[index - 1];
              }
            }
          });
        } else {
          // 如果没有兄弟
          // 如果能找到fatherid对应的
          if (this.changeGetItem(father)) {
            // 下一个就是fatherid对应的
            next = this.changeGetItem(father)[0];
          } else {
            // 否则下一个是空,可能是删光了或者数据错误
            next = {};
            console.log("tasklistv2没有找到同级或者父级任务");
          }
        }
      }
      // 获取它的所有子任务
      son = this.changeGetChildrenItem(targetId);
      // 找到并切掉子任务和当前任务
      this.mergedDataCopy.filter((item, index) => {
        if (item._id == targetId) {
          // 找到并切掉对应的
          this.mergedDataCopy.splice(index, 1);
        }
      });
      son.forEach(sonitem => {
        this.mergedDataCopy.filter((item, index) => {
          if (item._id == sonitem._id) {
            // 找到并切掉对应的
            this.mergedDataCopy.splice(index, 1);
          }
        });
      });
      // 排序
      this.taskListSortControl();
      // 赋值下个选中的项目和滚动
      this.selectThis(next);
      // 更新截取数据
      if (this.mergedDataCopy && this.mergedDataCopy.length) {
        self.changeGetItem(next._id)[1] < self.start ||
        self.changeGetItem(next._id)[1] >= self.end - 1
          ? self.scrollTo(next._id)
          : null;
      }
    },

    //过滤事件
    filterValue(val) {
      var arr = this.mergedData.filter(item => {
        if (item.task_name && item.task_name.indexOf(val) !== -1) {
          return true;
        }
      });
      return arr;
    },
    // 选中触发事件
    selectThis(item) {
      var self = this;
      if(self.lastInput){
        var tar=document.getElementById("c" + self.lastInput + "_input");
        tar&&tar.blur?tar.blur():null;
      }
      this.selectItem = item;
      self.lastInput = item._id;
      // var targetInput = document.querySelector("#c" + item._id + "_input");
      Vue.nextTick(function() {
        setTimeout(function(){
          var targetInput = document.getElementById("c" + item._id + "_input");
          targetInput&&targetInput.focus?targetInput.focus():null;
        },200)
      });
      this.$emit("select-item_" + self.mainid, this.mergedData, item);
    },
    // 完成触发事件
    changeDone(item) {
      var self = this;
      if (item.finish_time) {
        this.changeGetItem(item._id, "finish_time", null);
      } else {
        this.changeGetItem(item._id, "finish_time", new Date().getTime());
      }
      this.$emit("check-change_" + self.mainid, this.mergedData, item);
    },
    // 储存之前的标题
    savePreTitle(title) {
      this.preTitle = title;
    },
    // 标题更改触发事件
    changeTitle(item) {
      var self = this;
      if (item.task_name !== this.preTitle) {
        this.changeGetItem(item._id, "task_name", item.task_name);
        this.$emit("title-change_" + self.mainid, this.mergedData, item);
      }
    },
    // 负责人下拉框展示
    changeLeader(item) {
      var target = event.path[0];
      var el = this.$els.dropdown;
      el.style.visibility = "visible";
      el.style.display = "block";
      this.searchListShow = true;
      var targetTop = target.getBoundingClientRect().top;
      var targetLeft = target.getBoundingClientRect().left;
      var targetWidth = target.offsetWidth;
      var targetHeight = target.offsetHeight;
      var elWidth = el.offsetWidth;
      var elHeight = el.offsetHeight;
      var screenWidth = document.documentElement.clientWidth;
      var screenHeight = document.documentElement.clientHeight;
      var elX = 0;
      var elY = 0;
      elX = targetLeft + targetWidth / 2 - elWidth / 2;
      elY = targetTop + targetHeight + 10;
      elX < 0 ? (elX = 0) : null;
      elY < 0 ? (elY = 0) : null;
      elX > screenWidth - elWidth ? (elX = screenWidth - elWidth) : null;
      elY > screenHeight - elHeight ? (elY = screenHeight - elHeight) : null;
      Vue.set(this.selectXY, "left", elX + "px");
      Vue.set(this.selectXY, "top", elY + "px");
    },
    // 负责人下拉框关闭
    changeOff() {
      if (event.path[0].className.indexOf("leader") == -1) {
        this.searchListShow = false;
      }
    },
    showSwitch(listItem) {
      if (!listItem.hasChildren) return;
      Vue.set(listItem, "isOpen", !listItem.isOpen);
      for (let i = 0; i < listItem.children.length; i++) {
        this.isShowChildren(listItem.children, listItem.isOpen);
      }
      this.$els.tasklisttwo.scrollTo(0, this.start * this.itemsHeight);
      this.updateVisibleData();
    },
    isShowChildren(childrenList, bool) {
      for (let i = 0; i < childrenList.length; i++) {
        childrenList[i].isShow = bool;
        if (childrenList[i].hasChildren) {
          this.isShowChildren(childrenList[i].children, bool);
        }
      }
    }
  },
  created() {},
  ready() {
    var self = this;
    // 初始化
    Vue.nextTick(function() {
      self.mergeData();
      self.$emit("loaded-change_" + self.mainid);
    });
    // 负责人更改
    VueEvent.$on("charge-change_" + self.mainid, function(item) {
      self.changeGetItem(self.selectItem._id, "leader_uid", item.user_id);
      self.searchListShow = false;
      self.$emit("charge-change_" + self.mainid, self.selectItem, item);
    });
  }
};
</script>
  
