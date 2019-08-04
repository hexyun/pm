<style scope lang='less'>
.taskListWrap {
  height: 100%;
  width:800px;
  overflowY: auto;
  border: 1px solid #ccc;
}
</style>
<template>
  <div class="taskListWrap" v-el:wrap>
    <!-- 添加功能 -->
    <add-items @item-adds="itemAdd" :charge-list="chargeList" @item-del="itemDel"></add-items>
    <!-- 整体的系统 -->
    <ul class="itemGroup">
      <menu :list="list" :charge-list="chargeList" :selected="selectItem"></menu>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import VueEvent from "../model/VueEvent.js";
import menu from "../menu";
import addItems from "../addItems";
export default {
  name:'taskList',
  components: {
    menu,
    addItems
  },
  data() {
    return {
      list: [
        {
          isCheck: true,
          title: "前后端分离1",
          urgency: "1",
          icon: "ionic",
          id: 1,
          children: [
            {
              isCheck: true,
              title: "前后端分离1.1",
              time: 1564474653127,
              urgency: "1",
              icon: "ionic",
              id: 2,
              children: [
                {
                  isCheck: false,
                  title: "前后端分离1.1.1",
                  time: 1564474653127,
                  urgency: "1",
                  icon: "ionic",
                  id: 3,
                  children: [
                    {
                      isCheck: false,
                      title: "前后端分离1.1.1.1",
                      time: 1564474653127,
                      urgency: "1",
                      charge: "伊泽瑞尔",
                      icon: "ionic",
                      id: 4
                    }
                  ]
                }
              ]
            },
            {
              isCheck: true,
              title: "前后端分离1.2",
              time: 1564474653127,
              urgency: "1",
              icon: "ionic",
              id: 5
            }
          ]
        },
        {
          isCheck: false,
          title: "前后端分离2",
          time: 1564474753127,
          urgency: "3",
          charge: "马尔扎哈",
          icon: "ionic",
          id: 6
        },
        {
          isCheck: true,
          title: "前后端分离3",
          time: 1564474683127,
          urgency: "2",
          charge: "古力娜扎",
          icon: "ionic",
          id: 7
        },
        {
          isCheck: false,
          title: "前后端分离4",
          time: 1564474953127,
          urgency: "3",
          charge: "卡布奇诺",
          icon: "ionic",
          id: 8
        },
        {
          isCheck: true,
          title: "前后端分离5",
          time: 1564474613127,
          urgency: "1",
          charge: "美式咖啡",
          id: 9
        },
        {
          isCheck: false,
          title: "前后端分离6",
          time: 1564424653127,
          charge: "焦糖",
          id: 10
        },
        {
          isCheck: true,
          title: "前后端分离7",
          time: 1564434653127,
          urgency: "1",
          charge: "php",
          id: 11
        },
        {
          isCheck: false,
          title: "前后端分离8",
          time: 1564574653127,
          urgency: "2",
          charge: "node",
          id: 12
        },
        {
          isCheck: true,
          title: "前后端分离9",
          time: 1564494653127,
          urgency: "3",
          charge: "c",
          id: 13
        },
        {
          isCheck: false,
          title: "前后端分离0",
          time: 1564374653127,
          charge: "安吉丽娜",
          id: 14
        }
      ],
      selectItem: {},
      selectId: "0",
      chargeList: [
        { name: "伊泽瑞尔", tel: "13812341234" },
        { name: "安吉丽娜", tel: "13812341234" },
        { name: "c", tel: "13812341234" },
        { name: "node", tel: "13812341234" },
        { name: "焦糖", tel: "13812341234" },
        { name: "php", tel: "13812341234" },
        { name: "美式咖啡", tel: "13812341234" },
        { name: "卡布奇诺", tel: "13812341234" },
        { name: "古力娜扎", tel: "13812341234" },
        { name: "马尔扎哈", tel: "13812341234" }
      ]
    };
  },
  methods: {
    // 添加的事件
    itemAdd: function(obj, level) {
      // 创建一个数组用来存储子元素切割后的位置
      var arr = [];
      var list = this.list;
      var self = this;
      // 判断是不是子元素
      var isChild = this.selectId.indexOf(".") !== -1;
      if (isChild) {
        // 存储一下子数组的位置
        arr = this.selectId.split(".").map(item => {
          return item * 1 - 1;
        });
        // 遍历找到这个位置对应的数据
        function map(item, ind) {
          // items代表的是点击这个同等级的数组
          var items = item[ind[0]].children;
          // inds是接下来的子元素的位置
          var inds = ind.slice(1);
          // 如果接下来的子元素的层级>1,遍历直到最后一层
          if (inds.length > 1) {
            map(items, inds);
          } else {
            // 这个是最后一层需要操作的数据
            if (level == 1) {
              // 如果是添加同级，在这个同等级数组的当前子元素的后面添加数据
              items.insert(inds[0] + 1, obj);
            } else {
              // 如果添加下级数组，判断这个子元素有没有children
              if (items[inds[0]].children) {
                // 如果有，在这个的children里添加
                items[inds[0]].children.push(obj);
              } else {
                // 如果没有，创建一个children并赋值
                Vue.set(items[inds[0]], "children", [obj]);
              }
            }
          }
        }
        map(list, arr);
      } else {
        // 如果不是子元素，存储一下下标
        let ind = this.selectId * 1 - 1;
        // 如果没有选中，直接就添加子元素,因为不确定父级元素，直接打断
        if (ind == -1 && level !== 1) {
          return;
        }
        if (level == 1) {
          // 如果是添加同级,在下标的下面插入数据
          list.insert(ind + 1, obj);
        } else {
          // 如果是添加子集
          if (list[ind].children) {
            // 如果子集有children属性的话在children末尾插入
            list[ind].children.push(obj);
          } else {
            // 如果没有的话创建children
            Vue.set(list[ind], "children", [obj]);
          }
        }
      }
    },
    // 删除的事件
    itemDel: function() {
      // 创建一个数组用来存储子元素切割后的位置
      var arr = [];
      var list = this.list;
      var self = this;
      // 判断是不是子元素
      var isChild = this.selectId.indexOf(".") !== -1;
      if (isChild) {
        // 存储一下子数组的位置
        arr = this.selectId.split(".").map(item => {
          return item * 1 - 1;
        });
        // 遍历找到这个位置对应的数据
        function map(item, ind) {
          // items代表的是点击这个同等级的数组
          var items = item[ind[0]].children;
          // inds是接下来的子元素的位置
          var inds = ind.slice(1);
          // 如果接下来的子元素的层级>1,遍历直到最后一层
          if (inds.length > 1) {
            map(items, inds);
          } else {
            // 这个是最后一层需要操作的数据
            items.splice(inds, 1);
            // self.selectItem=items[inds]||items[inds-1];
            // 删除之后清空选择项，防止操作下一个
            self.selectItem = {};
            self.selectId = "";
          }
        }
        map(list, arr);
      } else {
        // 如果不是子元素，存储一下下标
        let ind = this.selectId * 1 - 1;
        // 如果没有选中，直接就添加子元素,因为不确定父级元素，直接打断
        if (ind == -1) {
          return;
        }
        list.splice(ind, 1);
        // self.selectItem=list[ind]||list[ind-1];
        // 删除之后清空选择项，防止操作下一个
        self.selectItem = {};
        self.selectId = "";
      }
    }
  },
  ready() {
    var self = this;
    // 选择触发的事件
    VueEvent.$on("select-item", function(item, id) {
      self.selectItem = item;
      self.selectId = id + "";
    });
    // 完成触发的事件
    VueEvent.$on("check-change", function(item) {
      item.isCheck = !item.isCheck;
      console.log(self.list);
    });
    // 标题更改的事件
    VueEvent.$on("title-change", function(item, title) {
      item.title = title;
      console.log(self.list);
    });
    // 关注者更改的事件
    VueEvent.$on("charge-change", function(val, item) {
      if (item && val) {
        item.charge = val;
        console.log(self.list);
      }
    });
  }
};
</script>

