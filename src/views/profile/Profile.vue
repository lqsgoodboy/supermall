<template>
  <div>
    {{hello}}
  </div>
</template>

<script>
  import Scroll from "../../components/common/scroll/Scroll";
  import {getProfile} from "../../network/profile";
  import {Dog} from "../../network/profile";

  export default {
    name: "Profile",
    components: {Scroll},
    data(){
      return {
        hello: {},
      }
    },
    created() {
      getProfile().then(res => {
        this.hello = res
      })
    }
  }
</script>

<style scoped>
  .content {
    height: 300px;
  }
</style>
