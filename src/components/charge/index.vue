<style scope lang='less'>
.charge {
  width: 35%;
  text-align: right;
  padding-right: 10px;
  position: relative;
  font-size: 12px;
  .show {
    width: 100%;
  }
  .select{
    position: absolute;
    left: 0;
    z-index: 999;
    background: #fff;
    float:none;
    border: 1px solid #aaa;
    width:200px;
    .ivu-select-arrow{
      display:none;
    }
    .ivu-select-item{
      text-align:left;
      color:#aaa;
    }
    .name{
      text-align:left;
    }
    .tel{
      text-align:right;
      float:right;
    }
  }
  .ivu-select-selection {
    line-height: 30px;
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    color: 666666;
    width:100%;
    .ivu-select-input::placeholder{
      color:#aaa;
    }
  }
  .ivu-select-dropdown{
    top: 100%;
    left: 0;
  }
  .gray {
    color: #9ea7b4;
  }
}
</style>
<template>
  <div class="charge">
    <!-- 负责人的下拉框 -->
    <div class="show" :class="{'gray':selected==''}" @click='toggle'>
      {{selected==''?"请选择":selected}}
      <!-- <Icon type="arrow-down-b" class="ico"></Icon> -->
    </div>
    <div class="select" v-show="isShow" v-el:sel :style="{top:top}">
      <i-select
        :model.sync="select"
        filterable
        clearable
        @on-change="change"
        placeholder="搜索......."
      >
        <i-option
          v-for="(index,item) in chargeList"
          :key="index"
          :value="item.name"
          :label="item.name"
        >
          <span class='name'>{{item.name}}</span>
          <span class='tel'>{{item.tel}}</span>
        </i-option>
      </i-select>
    </div>
  </div>
</template>
<script>
import VueEvent from "../model/VueEvent.js";
export default {
  name: "charge",
  props: ["item", "chargeList"],
  data() {
    return {
      selected: "",
      select: "",
      isShow: false,
      top:'100%'
    };
  },
  ready() {
    // 初始赋值
    var self=this;
    if (this.item && this.item.charge) {
      this.selected = this.item.charge;
    }
    // 判断弹出应该出现的位置
    var sel=this.$els.sel;
    var dropDown=this.$els.sel.children[0].children[1];
    sel.style.visibility='hidden';
    sel.style.display='block';
    dropDown.style.setProperty('display','block','important');
    var h=dropDown.offsetHeight+sel.offsetHeight+10;
    var t=sel.getBoundingClientRect().top;
    var sh=window.innerHeight;
    sel.style.display='none';
    sel.style.visibility='inherit';
    // 如果元素距离屏幕上边+元素的高度》屏幕的高度，top=-元素高度
    if(t+h>sh){
      this.top=-h+'px';
    }
    // 如果元素的高度》元素距离屏幕上边的距离,还是在下边
    if(h>t){
      this.top='100%';
    }
    VueEvent.$on("charge-close",function(){
      self.isShow=false;
    })
  },
  methods: {
    // 选中负责人的时候触发事件
    change: function() {
      // 如果选择的不是空的，把已选择的数据改一下
      if(this.select!=''){
        this.selected=this.select;
        VueEvent.$emit("charge-change", this.selected, this.item);
        this.isShow=false;
      }
    },
    toggle:function(){
      // 展示弹出并把下拉框直接展示
      if(!this.isShow){
        console.log(this.isShow)
        VueEvent.$emit("charge-close");
        this.isShow=!this.isShow;
      }else{
        this.isShow=!this.isShow;
      }
      this.select='';
    }
  }
};
</script>

