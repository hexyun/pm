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
      }

      .rank {
        font-size: 9px;
        text-indent: 0.5rem;
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
          :key="index"
          @click="selectThis(listItem)"
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
              :style="{'text-indent':listItem.positionInd.split('.').length*0.8+'rem'}"
            >{{listItem.positionInd}}</div>
            <!-- <div class="open">{{listItem.hasChildren?listItem.isOpen?'-':'+':''}}</div> -->
            <div class="title">
              <input
                type="text"
                v-model="listItem.task_name"
                :readonly="!isTitleChange"
                @focus="savePreTitle(listItem.task_name)"
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
      onoff: true,
      searchListShow: false,
      selectXY: { left: 0, top: 0 },
      preTitle: "",
      mergedData: [],
      mergedDataCopy: [],
      dataType: ""
    };
  },
  filters: {
    // 转换剩余时间
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
    },
    // 转换nickname
    toNickName: function(id) {
      const nick = this.members.find(item => {
        if (item.user_id && item.user_id == id) {
          return true;
        } else {
          return false;
        }
      });
      return nick ? nick.nickname : "请选择";
    }
  },
  computed: {
    // 动态计算包裹滚动元素高度
    contentHeight: function() {
      if (this.onoff) {
        this.updateVisibleData();
        this.onoff = false;
      }
      return this.mergedData.length * this.itemsHeight;
    }
  },
  watch: {
    task: function() {
      console.log("tasklistv2task更改成功");
      this.mergeData();
      this.updateVisibleData();
    }
  },
  methods: {
    // 增加任务
    addTask(addItem) {
      if (this.changeGetItem(addItem._id)) {
        console.log("tasklistv2重复id");
      } else {
        // 添加数据
        this.mergedData.push(addItem);
        // 排序数据
        this.mergedData = this.taskListSort(this.mergedData);
        // 更改选中
        this.selectThis(addItem)
        // 更改滚动
        this.scrollTo(addItem._id);
        // 重新截取
        this.handleScroll();
      }
    },
    // 删除任务
    delTask(id) {
      var targetId = id;
      var father = "";
      var next = {};
      // 是否传了id
      if (!targetId) {
        // 没指定id，操作当前选中项目
        targetId = this.selectItem._id;
      }
      // 找到fatherid
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
      // 切掉数据
      this.mergedData.filter((item, index) => {
        if (item._id == targetId) {
          // 找到并切掉对应的
          this.mergedData.splice(index, 1);
          // 重新排序
          this.mergedData = this.taskListSort(this.mergedData);
          // 更新截取数据
          this.updateVisibleData();
          // 滚动一下滚动条触发截取事件
          if (this.$els.tasklisttwo.scrollTop == 0) {
            this.$els.tasklisttwo.scrollBy(0, 1);
          } else {
            this.$els.tasklisttwo.scrollBy(0, -1);
          }
        }
      });
      // 赋值下个选中的项目和滚动
      this.selectThis(next)
      this.scrollTo(next._id);
    },
    // 合并数据
    mergeData() {
      // 创建一个空数组
      var list = this.task;
      var arr = [];
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
            arr.forEach((item, index) => {
              if (item._id == list[i].father_id) {
                arr.insert(index + 1, list[i]);
              }
            });
          }
        }
        this.mergedData = arr;
      } else {
        console.log("tasklistv2数据覆盖");
        this.mergedData = list;
      }
      // 排序
      this.mergedData = this.taskListSort(this.mergedData);
      this.mergedDataCopy = this.deepCopy(this.mergedData);
      console.log("tasklistv2数据合并覆盖成功");
      // 存缓存
      this.setMemory();
      // 更新界面
      if (this.$els.tasklisttwo.scrollTop == 0) {
        this.$els.tasklisttwo.scrollBy(0, 1);
      } else {
        this.$els.tasklisttwo.scrollBy(0, -1);
      }
    },
    //排序接口
    taskListSortControl(type, fil) {
      this.mergedData = this.taskListSort(this.mergedDataCopy, type, fil);
      this.$els.tasklisttwo.scrollTo(0, 1);
      this.handleScroll();
    },
    // 排序事件
    taskListSort(list, type, fil) {
      this.islabel = false;
      this.isol = false;
      // 创建一个空数组用来储存结果
      var arr = [];
      this.dataType = type;
      if (fil == "done") {
        var done = [];
        list.forEach((item, index) => {
          if (item.finish_time) {
            done.push(item);
          }
        });
        list = done;
      } else if (fil == "undone") {
        var undone = [];
        list.forEach((item, index) => {
          if (!item.finish_time) {
            undone.push(item);
          }
        });
        list = undone;
      }
      // type默认是正常排序.
      switch (type) {
        case "create_uid":
          arr = this.sortData(list, "create_uid");
          arr = this.sortDataNickName(arr, "create_uid", "创建人以移除");
          break;
        case "complete_uid":
          arr = this.sortData(list, "complete_uid");
          arr = this.sortDataNickName(arr, "complete_uid", "没有完成人的任务");
          break;
        case "leader_uid":
          arr = this.sortData(list, "leader_uid");
          arr = this.sortDataNickName(arr, "leader_uid", "没有负责人的任务");
          break;
        case "create_time":
          arr = this.sortData(list, "create_time");
          arr = this.sortDataTime(arr, "create_time", "没有创建日期的任务");
          break;
        case "deadline":
          arr = this.sortData(list, "deadline");
          arr = this.sortDataTime(arr, "deadline", "没有截止日期的任务");
          break;
        case "finish_time":
          arr = this.sortData(list, "finish_time");
          arr = this.sortDataTime(arr, "finish_time", "没有完成日期的任务");
          break;
        case "status":
          var done = [{ type: "label", text: "完成的任务", num: "" }];
          var undone = [{ type: "label", text: "未完成的任务", num: "" }];
          list.forEach((item, index) => {
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
          list.forEach((item, index) => {
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
          this.islabel = true;
          this.isol = true;
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
          break;
      }
      return arr;
    },
    sortData(list, key) {
      var none = "none";
      if (key == "create_time" || key == "deadline" || key == "finish_time") {
        none = false;
      }
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
      for (let i = 0; i < list.length; i++) {
        console.log(list[i][key]);
      }
      return list;
    },
    sortDataNickName(list, type, noneTitle) {
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
          Vue.set(item, "nickname", "none");
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
        if (name == "none" || name == 0) {
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
      var target = [];
      var times = [];
      list.forEach(item => {
        if (item[type]) {
          Vue.set(item, "time", this.sortToTime(item[type]));
        } else {
          Vue.set(item, "time", "none");
        }

        if (!times[item.time]) {
          Vue.set(times, item.time, [item]);
        } else {
          times[item.time].push(item);
        }
      });
      Object.keys(times).forEach(item => {
        var name = item;
        if (name == "none" || name == 0) {
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
      return new Date(time).toJSON().substr(0, 10);
    },
    //过滤事件
    filterValue(val){
      var arr=this.mergedData.filter(item=>{
        if(item.task_name.indexOf(val)!==-1){
          return true;
        }
      })
      return arr;
    },
    // 操作缓存
    setMemory() {
      // 把数据存入缓存
      memory.set("hex_" + this.listId, this.mergedData);
      // 如果缓存满了，给个提示
      console.log("tasklistv2存入缓存");
      if (!memory.set("hex_" + this.listId, this.mergedData)) {
        console.log("tasklistv2缓存已经满了，请重新加载");
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
    // 滚动事件，调用更新位置
    handleScroll() {
      // 滚动的时候执行列表更新事件
      var scrollTop = event.target.scrollTop;
      if (scrollTop == 0) {
        this.$els.tasklisttwo.scrollBy(0, 1);
      }
      this.updateVisibleData(scrollTop);
    },
    // 更新列表和计算位置
    updateVisibleData(scrollTop) {
      scrollTop = scrollTop || 0;
      // 计算父级元素能渲染几个dom
      const visibleCount = Math.ceil(
        this.$els.tasklisttwo.offsetHeight / this.itemsHeight
      );
      // 根据滚动条计算第一个元素应该是哪个
      var start = Math.floor(scrollTop / this.itemsHeight);
      // 计算最后一个元素
      const end = start + visibleCount;
      // 获取需要渲染的列表
      this.visibleData = this.mergedData.slice(start, end);
      // 更改滚动元素的偏移值
      this.$els.content.style.webkitTransform = `translateY(${start *
        this.itemsHeight}px)`;
    },
    // 获取指定id元素和更改指定id属性
    changeGetItem(id, k, v) {
      var ind = 0;
      const tar = this.mergedData.filter((item, index) => {
        if (item._id == id) {
          if ((item, k, v)) {
            Vue.set(item, k, v);
          }
          ind = index;
          return true;
        }
      });
      if (tar.length !== 1) {
        console.log(
          "tasklistv2一共找到了" +
            tar.length +
            "条相同id的数据，请确认数据是否正确"
        );
      }
      return tar && tar.length == 1
        ? [tar[0], ind, this.mergedData]
        : undefined;
    },
    // 选中指定id
    selectId(id) {
      var a = this.changeGetItem(id);
      if (a) {
        this.selectItem = a[0];
      }
    },
    //滚动到指定id的位置
    scrollTo(id) {
      var a = this.changeGetItem(id);
      if (a) {
        this.$els.tasklisttwo.scrollTo(0, a[1] * this.itemsHeight);
      }
    },
    // 选中触发事件
    selectThis(item) {
      var self = this;
      this.selectItem = item;
      this.$emit("select-item_" + self.mainid, this.mergedData, item);
    },
    // 完成触发事件
    changeDone(item) {
      var self = this;
      if (item.finish_time) {
        Vue.set(item, "finish_time", null);
      } else {
        Vue.set(item, "finish_time", new Date().getTime());
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
        this.$emit("title-change_" + self.mainid, this.mergedData, item);
      }
    },
    // 负责人下拉框展示
    changeLeader(item) {
      console.log(123);
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
    }
  },
  created() {},
  ready() {
    var self = this;
    // 初始化
    Vue.nextTick(function() {
      self.mergeData();
      self.updateVisibleData();
      self.$emit("loaded-change_" + self.mainid);
    });
    // 负责人更改
    VueEvent.$on("charge-change_" + self.mainid, function(item) {
      Vue.set(self.selectItem, "leader_uid", item.user_id);
      self.searchListShow = false;
      self.$emit("charge-change_" + self.mainid, self.selectItem, item);
    });
  }
};
</script>
  
