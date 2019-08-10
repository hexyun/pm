<style scoped lang='less'>
input[type="checkbox"] {
  width: 100%;
  height: 100%;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  position: absolute;
  left:0;
  top:0;
  margin:0;
  padding:0;
  lint-height:12px;
}
input[type="checkbox"]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  height: 100%;
  lint-height:12px;
  border: 1px solid #03A9F4;
}
input[type="checkbox"]:checked::before {
  content: "\2713";
  width: 100%;
  border: none;
  color: #474747 ;
  font-size: 10px;
  line-height:12px;
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

