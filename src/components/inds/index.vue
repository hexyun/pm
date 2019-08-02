<style scope lang='less'>
.inds{
  font-size: 12px;
  color: #999999;
  margin-left: 5px;
  min-width: 20px;
  text-align: center;
}
</style>
<template>
<!-- 序列号 -->
  <div class='inds'>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "inds"
};
</script>

