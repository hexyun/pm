<style scoped lang='less'>
.clear:after{
  display: block;
  clear: both;
  content: ' ';
}
.label1,.label2,.label3{
  color:#fff;
  border-radius:0 5px 5px 0;
  line-height:30px;
  padding: 0 20px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.label1{
  background:#999999;
  width:50%;
}
.label2{
  background:#4d4c4c;
  width:20%;
}
.label3{
  margin-top:5px;
  background:#a8a8a8;
  width:20%;
}
.item{
  line-height:33px;
  height: 33px;
  font-size:12px;
  color:#1d1f1f;
  border-top:1px solid #ededed; 
  cursor:pointer;
  padding:2px 0 2px 15px;
  box-sizing:border-box;
  overflow:hidden;
  list-style: decimal inside !important;
  position: relative;
  .itemWrap{
    display: flex;
    position: absolute;
    top: 0;
    left: 50px;
    right: 0;
    height: 100%;
  }
    .left{
      display: flex;
      flex-grow:1;
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
        margin: auto;
        flex-shrink: 0;
      }
      .inds{
        font-size: 12px;
        color: #999999;
        margin-left: 5px;
        min-width: 20px;
        text-align: left;
      }
      .open{
        transition: all 200ms ease-in;
        color: #5db9ff;
        cursor: pointer;
        text-decoration: none;
        font-size: 20px;
        vertical-align: middle;
        line-height: 25px;
        min-width: 20px;
        text-align: center;
      }
      .title {
        margin-left:2px;
        flex-grow:1;
        line-height:33px;
        input {
          line-height: 30px;
          height: 30px;
          padding: 0;
          margin: 0;
          border: none;
          outline: none;
          background: none;
          width: 100%;
        }
      }
      .done {
        input {
          color: #999999;
        }
      }
    }
    .right{
      position: absolute;
      right: 1px;
      background: #fff;
      padding: 0 10px;
      display: flex;
      .time{
        text-align:center;
        margin-right: 10px;
        justify-content: flex-end;
      }
      .over {
        color: #ff0000;
      }
      .urgency{
        color: rgba(0, 0, 0, 0);
        width: 28px;
        line-height: 28px;
        text-align:center;
        border-radius:3px;
        font-size: 20px;
        margin-right: 10px;
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
      }
    }
}
.ulList{
  list-style: none !important;
  .itemWrap{
    left: 10px;
  }
}
.item:first-child{
  border:none;
}
.active{
  background:#e5e5e5;
  .right{
    background:#e5e5e5;
  }
}
.done .title input{
  color: #999;
}
</style>
<template>
    <!-- 整个列表 -->
    <template v-for="(listInd,listItem) in tasks">
      <div v-if='listItem.type=="label1"' class='label1'>{{listItem.text}}</div>
      <div v-if='listItem.type=="label2"' class='label2'>{{listItem.text}}</div>
      <div v-if='listItem.type=="label3"' class='label3'>{{listItem.text}}</div>
      <li v-if='listItem.type=="task"' class="item " :key="listInd" :id="listItem._id" v-drag-and-drop drop="handleDrop" @click='selectNewItem(listItem,fatherId?fatherId+"."+(listInd+1):listInd+1)' :class='{"active":selectItem==listItem,"done":listItem.finish_time?true:false,"ulList":!isol}'>
        <div class="itemWrap">
          <!-- 左半部分 --> 
          <div class="left"> 
            <!-- 图标 -->
            <!-- <div class="icon">
              <b>▲</b>
            </div> -->
            <!-- 复选框 -->
            <check-box class='checkboxs' :is-check='listItem.finish_time' @click='checkChange(listItem,fatherId?fatherId+"."+(listInd+1):listInd+1)'></check-box>
            <!-- 序列号 -->
            <div v-if='islabel' style='visibility:hidden;'>{{fatherId}}</div>
            <div v-if='islabel' class='inds'> {{fatherId?fatherId+"."+(listInd+1):listInd+1}} </div>
            <!-- 展开按钮 -->
            <div class="open" v-if='listItem.children&&listItem.children.length>0' @click='openThis(listItem)'>{{listItem.isOpen?'-':'+'}}</div>
            <!-- 标题 -->
            <div class='title'>
              <div v-if='!isTitleChange'>{{listItem.task_name}}</div>
              <input type="text" v-if='isTitleChange' v-model="listItem.task_name" @focus="savePreTitle(listItem.task_name)" @blur='titleChange(listItem,fatherId?fatherId+"."+(listInd+1):listInd+1)'/>
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
              &nbsp;
            </div>
            <!-- 紧急度 -->
            <div class='urgency' :class='{"wary":listItem.priority==2,"warning":listItem.priority==3,"error":listItem.priority==4}'>★</div>
            <!-- 负责人 -->
            <div class='charge' >
              <charge :members='members' :list-Item='listItem' :mainid='mainid'></charge>
            </div>
          </div>
        </div>
      </li>
      <menu v-if="listItem.children&&listItem.children.length>0&&listItem.isOpen" :task="listItem.children" :members="members" :father-id='fatherId?fatherId+"."+(listInd+1):listInd+1' :select-item='selectItem' :islabel='islabel' :mainid='mainid' :isol='isol' :is-title-change='isTitleChange'></menu>
    </template>
</template>
<script>
import Vue from "Vue";
import VueEvent from "../model/VueEvent.js";
import checkBox from "../checkBox";
import charge from "../charge";
import dragAndDrop from 'vue-drag-and-drop';
Vue.use(dragAndDrop);

export default {
  name: "menu",
  components: {
    checkBox,
    charge
  },
  props:{
    task:{},
    members:{},
    selectItem:{},
    fatherId:{},
    islabel:{},
    mainid:{},
    isol:{},
    isTitleChange:{}
  },
  data() {
    return {
      preTitle:''      
    };
  },
  computed:{
    tasks:function(){
      function each(list){
        for(let i=0;i<list.length;i++){
          if(list[i].children && !list[i].isOpen){
            Vue.set(list[i],'isOpen',false)
            each(list[i].children)
          }
        }
      }
      each(this.task)
      return this.task;
    }
  },
  methods: {
    // 复选框选中更改
    checkChange: function(item) {
      VueEvent.$emit('check-change_'+this.mainid,item)
    },
    // 选中任务的事件
    selectNewItem:function(item,id){
      VueEvent.$emit("select-item_"+this.mainid,item,id+'')
    },
    titleChange:function(item,id) {
      if(item.task_name!==this.preTitle){
        VueEvent.$emit('title-change_'+this.mainid,item,item.task_name,id)
      }
    },
    handleDrop:function(itemOne, itemTwo){
      this.loggedEvent = 'handleDrop';
      VueEvent.$emit('drag-change_'+this.mainid,itemOne.id,itemTwo.id)
    },
    savePreTitle:function(title){
      this.preTitle=title;
    },
    openThis:function(item){
      item.isOpen=!item.isOpen;
    }
  },
  watch:{

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

