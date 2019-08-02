<style scope lang='less'>
.urgency{
  color: #fff;
  width: 10%;
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
  padding: 2px;
}
</style>
<template>
  <div class="urgency">
    <!-- 紧急度，根据不同的数值添加类 -->
    <Icon type="ios-star-outline" :class='[urgency==1?"wary":urgency==2?"warning":urgency==3?"error":""]'></Icon>
  </div>
</template>
<script>
export default {
  name:'urgency',
  props:['urgency']
}
</script>

