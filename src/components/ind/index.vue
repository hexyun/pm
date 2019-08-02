<style scope lang='less'>
.ind {
  color: #ccc;
  text-align: center;
  width: 30px;
}
.indAct{
  background: #fff;
}
</style>
<template>
<!-- 索引 -->
  <div class="ind">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "ind"
};
</script>

