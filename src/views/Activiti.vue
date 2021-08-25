<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import {getUrl} from '@/api/index.js';

export default {
  name: '',
  data () {
  },
  mounted() {
    this.getCompany();
  },
  methods: {
    getCompany() {
      getUrl("").then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      });
    },
  },
}
</script>

<style lang="less">
</style>
