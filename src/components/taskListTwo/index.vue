<style lang="less" scoped>
.task-list-two {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
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
      }
      .title {
        margin-left: 6px;
        flex-grow: 1;
        input {
          border: none;
          outline: none;
          color: #000;
          width: 100%;
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
          :class="{'done':listItem.finish_time}"
          :key="index"
        >
          <!-- visibleData -->
          <!-- <div class="itemIndex" v-if="isol">{{index+1}}</div> -->
          <div class="checkbox"></div>
          <div class="rank" v-if="islabel">{{1}}</div>
          <div class="open">+</div>
          <div class="title">
            <input type="text" :value="listItem.task_name" :readonly="!isTitleChange" />
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
            <div class="leader">
              <charge :members="members" :list-Item="listItem" :mainid="mainid"></charge>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "Vue";
import charge from "../charge";
import dragAndDrop from "vue-drag-and-drop";
import { setTimeout } from "timers";
Vue.use(dragAndDrop);
export default {
  name: "taskListTwo",
  components: {
    charge
  },
  props: {
    task: {},
    members: {},
    selectItem: {},
    islabel: {},
    mainid: {},
    isol: {},
    isTitleChange: {},
    rank: 1
  },
  data() {
    return {
      visibleData: [],
      itemsHeight: 30
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
  itemSizeGetter: {
    type: Function
  },
  computed: {
    contentHeight: function() {
      return this.task.length * this.itemsHeight;
      console.log(this.task.length);
    }
  },
  methods: {
    updateVisibleData(scrollTop) {
      scrollTop = scrollTop || 0;
      const visibleCount = Math.ceil(
        this.$els.tasklisttwo.offsetHeight / this.itemsHeight
      );
      const start = Math.floor(scrollTop / this.itemsHeight);
      const end = start + visibleCount;
      this.visibleData = this.task.slice(start, end);
      this.$els.content.style.webkitTransform = `translate3d(0, ${start *
        this.itemsHeight}px, 0)`;
      // this.$els.content.style.transform = `translateY(${start * this.itemsHeight}px)`;
    },
    handleScroll() {
      const scrollTop = event.target.scrollTop;
      this.updateVisibleData(scrollTop);
    }
  },
  ready() {
    var self = this;
    setTimeout(function() {
      self.updateVisibleData();
    }, 500);
  }
};
</script>
  
