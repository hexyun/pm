<style scoped lang='less'>
.clear:after{
  display: block;
  clear: both;
  content: ' ';
}
.label1,.label2,.label3{
  color:#fff;
  border-radius:0 5px 5px 0;
}
.label1{
  line-height:30px;
  background:#999999;
  width:50%;
  text-indent:1rem;
}
.label2{
  line-height:30px;
  background:#4d4c4c;
  width:20%;
  text-indent:2rem;
}
.label3{
  margin-top:5px;
  line-height:30px;
  background:#a8a8a8;
  width:20%;
  text-align:center;
}
.item{
  line-height:28px;
  font-size:12px;
  color:#1d1f1f;
  border-top:1px solid #ededed; 
  cursor:pointer;
  padding:2px 0 2px 2%;
  list-style: decimal inside !important;
    div{
      display:inline-block;
      box-sizing:border-box;
    }
    .left{
      width:65%;
      .icon{
        width:28px;
        text-align:center;
      }
      .checkboxs{
        width:12px;
        height:12px;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        position:relative;
        top:-3px;
      }
      .inds{
        font-size: 12px;
        color: #999999;
        margin-left: 5px;
        min-width: 20px;
        text-align: left;
      }
      .title {
        margin-left:2px;
        input {
          line-height: 30px;
          height: 30px;
          padding: 0;
          margin: 0;
          border: none;
          outline: none;
          background: none;
        }
      }
      .done {
        input {
          color: #999999;
        }
      }
    }
    .right{
      width:30%;
      .time{
        width:50%;
        text-align:center;
      }
      .over {
        color: #ff0000;
      }
      .urgency{
        color: #fff;
        width: 10%;
        text-align:center;
        border-radius:3px;
      }
      .wary{
        color: black;
      }
      .warning{
        color: red;
      }
      .error{
        color: #fff;
        background: red;
      }
      .charge{
        width:35%;
      }
    }
}
.item:first-child{
  border:none;
}
.active{
  background:#e5e5e5;
}
.done .title input{
  color: #999;
}
</style>
<template>
    <!-- 整个列表 -->
    <template v-for="(listInd,listItem) in task">
      <div v-if='listItem.type=="label1"' class='label1'>{{listItem.text}}</div>
      <div v-if='listItem.type=="label2"' class='label2'>{{listItem.text}}</div>
      <div v-if='listItem.type=="label3"' class='label3'>{{listItem.text}}</div>
      <li v-if='listItem.type=="task"' class="item " :key="listInd" :id="listItem._id" v-drag-and-drop drop="handleDrop" @click='selectNewItem(listItem,fatherId?fatherId+"."+(listInd+1):listInd+1)' :class='{"active":selectItem==listItem,"done":listItem.finish_time?true:false}'>
          <!-- 左半部分 -->
          <div class="left"> 
            <!-- 图标 -->
            <div class="icon">
              <b>▲</b>
            </div>
            <!-- 复选框 -->
            <check-box class='checkboxs' :is-check='listItem.finish_time' @click='checkChange(listItem,fatherId?fatherId+"."+(listInd+1):listInd+1)'></check-box>
            <!-- 序列号 -->
            <div v-if='!islabel' style='visibility:hidden;'>{{fatherId}}</div>
            <div v-if='!islabel' class='inds'> {{fatherId?fatherId+"."+(listInd+1):listInd+1}} </div>
            <!-- 标题 -->
            <div class='title'>
              <input type="text" v-model="listItem.task_name" @input='titleChange(listItem,fatherId?fatherId+"."+(listInd+1):listInd+1)'/>
            </div>
          </div>
          <!-- 右半部分 -->
          <div class="right">
            <!-- 截止时间 -->
            <div class='time' v-show=' !listItem.finish_time && listItem.deadline ' :class='{"over": listItem.deadline < new Date().getTime()}'>
              {{listItem.deadline|totime}}
            </div>
            <div class='time' v-show=' !listItem.finish_time && !listItem.deadline ' :class='{"over": listItem.deadline < new Date().getTime()}'>
              &nbsp;
            </div>
            <div class='time' v-show='listItem.finish_time'>
              已完成
            </div>
            <!-- 紧急度 -->
            <div class='urgency' :class='{"wary":listItem.priority==2,"warning":listItem.priority==3,"error":listItem.priority==4}'>☆</div>
            <!-- 负责人 -->
            <div class='charge' >
              <charge :members='members' :list-Item='listItem'></charge>
            </div>
          </div>
      </li>
      <menu v-if="listItem.children" :task="listItem.children" :members="members" :father-id='fatherId?fatherId+"."+(listInd+1):listInd+1' :select-item='selectItem' :islabel='islabel'></menu>
    </template>
</template>
<script>
import Vue from "Vue";
import VueEvent from "../model/VueEvent.js";
import checkBox from "../checkBox";
import charge from "../charge";
import _debounce from 'lodash/debounce';
import dragAndDrop from 'vue-drag-and-drop';
Vue.use(dragAndDrop);

export default {
  name: "menu",
  components: {
    checkBox,
    charge
  },
  ready(){},
  props:{
    task:{ 

    },
    members:{
      
    },
    selectItem:{

    },
    fatherId:{

    },
    islabel:{

    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    // 复选框选中更改
    checkChange: function(item) {
      VueEvent.$emit('check-change',item)
    },
    // 选中任务的事件
    selectNewItem:function(item,id){
      VueEvent.$emit("select-item",item,id+'')
    },
    titleChange:_debounce(function(item,id) {
      VueEvent.$emit('title-change',item,item.task_name,id)
    },300),
    handleDrop:function(itemOne, itemTwo){
      this.loggedEvent = 'handleDrop';
      VueEvent.$emit('drag-change',itemOne.id,itemTwo.id)
    }
  },
  filters:{
    totime:function(val){
      var leftTime, d, h, m, s, times;
      leftTime = val-new Date().getTime();
      if (leftTime >= 0) {
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        m = Math.floor((leftTime / 1000 / 60) % 60);
        s = Math.floor((leftTime / 1000) % 60);
        times = d + "天" + h + "小时" ;
      } else {
        d = Math.ceil(leftTime / 1000 / 60 / 60 / 24);
        h = Math.ceil((leftTime / 1000 / 60 / 60) % 24);
        m = Math.ceil((leftTime / 1000 / 60) % 60);
        s = Math.ceil((leftTime / 1000) % 60);
        times = "超期" + -d + "天" + -h + "小时";
      }
      return times;
    }
  }
};
</script>

