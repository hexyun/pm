<style scope lang='less'>
input[type="checkbox"] {
  margin-top: 9px;
  width: 10px;
  height: 10px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: 10px;
  position: relative;
}
input[type="checkbox"]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  height: 100%;
  border: 1px solid #03A9F4;
}
input[type="checkbox"]:checked::before {
  content: "\2713";
  width: 100%;
  border: none;
  color: 474747 ;
  font-size: 10px;
  font-weight: bold;
}
</style>
<template>
  <div>
    <!-- 自定义多选框 -->
    <input type="checkbox" class="isCheck" :checked='isCheck'/>
  </div>
</template>
<script>
export default {
  name: "checkBox",
  props:['isCheck']
};
</script>

