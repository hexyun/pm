<style scope lang='less'>
.clear:after{
  display: block;
  clear: both;
  content: ' ';
}
.itemGroup {
  margin: 0;
  padding: 0;
  .act {
    background: #e5e5e5;
  }
  .item {
    line-height: 30px;
    font-size: 14px;
    list-style: none;
    .left,
    .right {
      float: left;
      div {
        float: left;
      }
      input {
        float: left;
      }
    }
    .right {
      float: right;
      width: 38%;
    }
    .icon {
      width: 30px;
      text-align: center;
      font-size: 15px;
      color:#ccc;
    }
  }
  .item:after {
    display: block;
    clear: both;
    content: " ";
  }
  .item {
    border-top: 1px solid #e8e8e8;
  }
}
</style>
<template>
    <!-- 整个列表 -->
    <template v-for="(listInd,item) in list">
      <li class="item" :key="listInd" @click='selectNewItem(item,fatherId?fatherId+"."+(listInd+1):listInd+1)' :class="{'act':item.id==selected.id}">
        <div class="clear">
          <!-- 左半部分 -->
          <div class="left">
            <!-- 索引 -->
            <!-- <ind :class="{'indAct':item.id==selected.id}">1</ind> -->
            <!-- 图标 -->
            <div class="icon">
              <Icon :type="item.icon"></Icon>
            </div>
            <!-- 复选框 -->
            <check-box :is-check="item.isCheck" @click="isCheck(item)"></check-box>
            <!-- 序列号 -->
            <inds :style='{"text-indent":textIndentSize}'>{{fatherId?fatherId+"."+(listInd+1):listInd+1}}</inds>
            <!-- 标题 -->
            <title :class="[item.isCheck?'done':'']" :title="item.title" :item='item'></title>
          </div>
          <!-- 右半部分 -->
          <div class="right">
            <!-- 截止时间 -->
            <time :time="item.time" :check='item.isCheck'></time>
            <!-- 紧急度 -->
            <urgency :urgency="item.urgency"></urgency>
            <!-- 负责人 -->
            <charge :item="item" :charge-list="chargeList"></charge>
          </div>
        </div>
      </li>
      <menu v-if="item.children" :list="item.children" :charge-list="chargeList" :father-id='fatherId?fatherId+"."+(listInd+1):listInd+1' :selected='selected'></menu>
    </template>
</template>
<script>
import VueEvent from "../model/VueEvent.js";
import ind from "../ind";
import checkBox from "../checkBox";
import inds from "../inds";
import title from "../title";
import time from "../time";
import urgency from "../urgency";
import charge from "../charge";

export default {
  name: "menu",
  components: {
    ind,
    checkBox,
    inds,
    title,
    time,
    urgency,
    charge
  },
  props:{
    list:{

    },
    chargeList:{
      
    },
    fatherId:{

    },
    selected:{

    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    // 复选框选中更改
    isCheck: function(item) {
      VueEvent.$emit('check-change',item)
    },
    // 选中任务的事件
    selectNewItem:function(item,id){
      VueEvent.$emit("select-item",item,id)
    }
  },
  computed:{
    // 根据传递的序列判断需要递进的层级
    textIndentSize:function(){
      if(this.fatherId&&this.fatherId.length>1){
        return (this.fatherId.split('.').length)*0.5+"rem";
      }else if(this.fatherId){
        return "0.5rem";
      }else{
        return 0;
      }
    }
  }
};
</script>

