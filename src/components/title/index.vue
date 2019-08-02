<style scope lang='less'>
.title {
  margin-left: 24px;
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
</style>

<template>
  <!-- 标题 -->
  <div class="title">
    <input type="text" v-model="title" @blur="save" @input="save" />
  </div>
</template>
<script>
import VueEvent from "../model/VueEvent.js";
import _ from 'lodash';
export default {
  name: "title",
  props: {
    title:{},
    item:{}
  },
  methods: {
    save: _.debounce(function() {
      VueEvent.$emit('title-change',this.item,this.title)
    },1000)
  }
};
</script>

