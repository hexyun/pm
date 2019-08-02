<style lang="less" scoped>
</style>
<template>
  <div>
    <label>
      任务标题
      <input type="text" v-model="addTitle" />
    </label>
    <label>
      紧急度
      <select v-model="addUrgency">
        <option value="0" selected>普通</option>
        <option value="1">重要</option>
        <option value="2">紧急</option>
        <option value="3">非常紧急</option>
      </select>
    </label>
    <label>
      截止时间
      <input type="datetime-local" v-model="addTime" />
    </label>
    <label>
      icon
      <input type="text" v-model="addIcon" />
    </label>
    <charge :charge-list='chargeList' style='display:inline-block;width:10%' ></charge>
    <button @click="itemAdd(1)">添加同级</button>
    <button @click="itemAdd(0)">添加子级</button>
    <button @click="del">删除</button>
  </div>
</template>
<script>
import charge from '../charge';
import VueEvent from "../model/VueEvent.js";
export default {
  name: "addItems",
  components:{charge},
  props:{chargeList:{}},
  data() {
    return {
      addTitle: "",
      addUrgency: "",
      addIcon: "",
      charge:'',
      addTime: 0
    };
  },
  methods: {
    itemAdd: function(level) {
      var self=this;
      if (self.addTitle) {
        var obj = {};
        obj["title"] = this.addTitle;
        obj["urgency"] = this.addUrgency;
        obj["icon"] = this.addIcon;
        obj["time"] = new Date(this.addTime).getTime();
        console.log(obj["time"]);
        obj["id"] = Math.round(Math.random() * 1000000);
        obj["isCheck"] = false;
        if(this.charge){
          obj["charge"] = this.charge;
        }else{
          obj["charge"] = null;
        }
        self.$emit("item-adds",obj,level);
      }
    },
    del:function(){
      this.$emit('item-del');
    }
  },
  ready(){
    var self=this;
    VueEvent.$on("charge-change", function(val) {
      self.charge = val;
    });
  }
};
</script>


