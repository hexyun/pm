<style scope lang='less'>
.time {
  width: 55%;
  font-size: 12px;
}
.over {
  color: #ff0000;
}
</style>
<template>
<!-- 剩余时间 -->
  <div class="time" :class="[now>time?'over':'']">
    <div>{{check?'　':timer}}</div>
  </div>
</template>
<script>
export default {
  name: "time",
  data() {
    return {
      timer: "",
      now:new Date().getTime()
    };
  },
  props: {
    time:{},
    check:{}
  },
  over: false,
  ready() {
    // 如果有传递过来的截止时间,判断还差多少
    if(this.time){
      var leftTime, d, h, m, s, times;
      leftTime = this.time-this.now;
      if (leftTime >= 0) {
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        m = Math.floor((leftTime / 1000 / 60) % 60);
        s = Math.floor((leftTime / 1000) % 60);
        times = d + "天" + h + "小时" + m + "分钟" + s + "秒";
        this.over = false;
      } else {
        d = Math.ceil(leftTime / 1000 / 60 / 60 / 24);
        h = Math.ceil((leftTime / 1000 / 60 / 60) % 24);
        m = Math.ceil((leftTime / 1000 / 60) % 60);
        s = Math.ceil((leftTime / 1000) % 60);
        times = "超期" + -d + "天" + -h + "小时" + -m + "分钟" + -s + "秒";
        this.over = true;
      }
      this.timer = times;
    }else{
      this.timer = '　';
    }
  }
};
</script>
