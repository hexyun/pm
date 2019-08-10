<template>
  <div>
    <task-list></task-list>
  </div>
</template>
<script>
import Vue from 'Vue';

export default {
  data() {
    return {};
  },
  ready() {},
  methods: {
    drag() {
      console.log('dragstart');
    }
  }
};
</script>
