<style scoped lang='less'>
.task-select {
  position: relative;
  width: 65px;
}
.task-select .clearFix:after {
  display: block;
  clear: both;
  content: " ";
}
.task-select .showName {
  width: 100%;
  text-align: right;
  overflow: hidden;
  height: 28px;
}
.task-select .dropdown {
  background: #fff;
  width: 240px;
  padding: 10px;
  padding-top: 0;
  border: 1px solid #b9bcc0;
  border-radius: 4px;
  font-size: 12px;
  line-height: 30px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 3px;
  position: fixed;
  z-index: 99999;
}
.task-select .dropdown .search input {
  width: 100%;
  border: none;
  border-bottom: 1px solid #e5e5e5;
  line-height: 36px;
  outline: none;
}
.task-select .dropdown .searchList {
  padding: 5px;
}
.task-select .dropdown .searchList input[type="checkbox"] {
  width: 10px;
  height: 10px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: 10px;
  position: relative;
}
.task-select .dropdown .searchList input[type="checkbox"]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  height: 100%;
  border: 1px solid #03a9f4;
}
.task-select .dropdown .searchList input[type="checkbox"]:checked::before {
  content: "\2713";
  width: 100%;
  border: none;
  color: #404040;
  font-size: 10px;
  font-weight: bold;
}
.task-select .dropdown .searchList div {
  display: inline-block;
}
.task-select .dropdown .searchList .selectall,
.task-select .dropdown .searchList .list-item {
  width: 100%;
  padding: 0;
}
.task-select .dropdown .searchList .selectall .sure {
  width: 42px;
  height: 28px;
  background: #4a90e2;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  float: right;
}
.task-select .dropdown .searchList .list-item-group {
  height: 210px;
  width: 100%;
  overflow-y: auto;
}
.task-select .dropdown .searchList .list-item-group::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #e5e5e5;
  border-radius: 3px;
}
.task-select .dropdown .searchList .list-item-group::-webkit-scrollbar-thumb {
  background: #a0a0a0;
  border-radius: 3px;
}
.task-select .dropdown .searchList .list-item:hover {
  background: #0081c2;
}
.task-select .dropdown .searchList .list-item:hover div {
  color: #fff;
}
.task-select
  .dropdown
  .searchList
  .list-item:hover
  input[type="checkbox"]:checked::before {
  background: #0081c2;
}
.task-select
  .dropdown
  .searchList
  .list-item:hover
  input[type="checkbox"]::before {
  background: #0081c2;
}
.task-select .dropdown .searchList .nickname,
.task-select .dropdown .searchList .selectext,
.task-select .dropdown .searchList .mobile {
  margin-left: 10px;
  color: #aaaaaa;
  width: 40%;
}
.task-select .dropdown .searchList .selectext {
  color: #333333;
}
.task-select .dropdown .searchList .mobile {
  width: 40%;
  text-align: right;
}
</style>
<template>
  <div class="task-select" v-clickoutside="changeOff">
    <div class="showName" @click="dropdownShow" v-el:showname>{{ nickname ||'请选择'}}</div>
    <div class="dropdown" v-show="searchListShow" v-el:drop>
      <div class="search">
        <input type="text" placeholder="搜索....." v-model="searchValue" />
      </div>
      <div class="searchList">
        <div class="list-item-group">
          <div
            class="list-item clearFix"
            v-for="(index,item) in showItems"
            :key="index"
            @click="selectThis(item)"
          >
            <label>
              <div class="nickname">{{item.nickname }}</div>
              <div class="mobile">{{item.mobile}}</div>
            </label>
          </div>
          <div class="list-item clearFix" v-if="!members">
            <label>
              <div>暂时没有负责人</div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueEvent from "../model/VueEvent.js";
import clickoutside from "../../directives/clickoutside.js";
export default {
  name: "charge",
  props: {
    members: {},
    listItem: {},
    mainid:{}
  },
  directives: {
    clickoutside
  },
  data() {
    return {
      nickNameList: [],
      memberSelected: "",
      showItems: [],
      searchValue: "",
      searchListShow: false,
      selectedItem: this.listItem
    };
  },
  ready() {
    var self = this;
    this.showItems = this.members;
  },
  computed: {
    nickname() {
      const v = this.selectedItem
      const nick = this.members.find(t => v.leader_uid === t.user_id )
      return nick ? nick.nickname : ''
    }
  },
  methods: {
    changeOff: function() {
      this.searchListShow = false;
      this.$els.drop.display ='none';
    },
    dropdownShow: function() {
      this.searchListShow = true;
      var winHeight = 0;
      var winWidth = 0;
      var drop = this.$els.drop;
      drop.style.display ='block';
      var showName = this.$els.showname;
      var showTop = showName.getBoundingClientRect().top;
      var showLeft = showName.getBoundingClientRect().left;
      var showHeight = showName.clientHeight;
      var dropHeight = drop.clientHeight;
      var dropWidth = drop.clientWidth;
      if (window.innerHeight) {
        winHeight = window.innerHeight;
      } else if (document.body && document.body.clientHeight) {
        winHeight = document.body.clientHeight;
      }
      if (window.innerWidth) {
        winWidth = window.innerWidth;
      } else if (document.body && document.body.clientWidth) {
        winWidth = document.body.clientWidth;
      }
      if (winHeight - showTop - showHeight < dropHeight && showTop - 30 > dropHeight) {
        drop.style.top = showTop - dropHeight + "px";
      } else {
        drop.style.top = showTop + showHeight + "px";
      }
      if(winWidth-showLeft<dropWidth){
        drop.style.left = winWidth - dropWidth - 18 +'px';
      }else if(showLeft<dropWidth){
        drop.style.left ="10px";
      }else{
        drop.style.left = showLeft + "px";
      }
    },
    // 选中负责人的时候触发事件
    selectThis: function(item) {
      console.log('ssss', item)
      // 单选点击的事件，把需要的值传过去
      // this.memberSelected = item.nickname;
      Vue.set(item, 'leader_uid', item.user_id)
      this.selectedItem = item
      this.changeOff();
      VueEvent.$emit("charge-change_"+this.mainid, this.listItem, item);
    }
  },
  watch: {
    searchValue: function() {
      if (!this.members) {
        return;
      }
      let arr = [];
      for (let i = 0; i < this.members.length; i++) {
        if (
          this.members[i].nickname.indexOf(this.searchValue) !== -1 ||
          (this.members[i].mobile + "").indexOf(this.searchValue) !== -1
        ) {
          arr.push(this.members[i]);
        }
      }
      this.showItems = arr;
    },
    searchListShow: function() {
      this.searchValue = "";
    },
    members:function(){
      this.showItems = this.members;
    }
  }
};
</script>

