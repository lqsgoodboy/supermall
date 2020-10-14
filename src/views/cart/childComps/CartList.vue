<template>
  <div id="cart_list">
    <scroll ref="scroll" class="content"
            :probeType="3" >
        <cart-list-item
          v-for="(item, index) in cartList"
          :key="index"
          :item="item">
        </cart-list-item>
    </scroll>
  </div>
</template>
<script>
  import Scroll from "components/common/scroll/Scroll.vue";
  import {mapGetters} from 'vuex'
  import CartListItem from "./CartListItem.vue";

  export default {
    data() {
      return {};
    },
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    methods: {},
    activated() {
      this.$refs.scroll.refresh();
    }
  };
</script>
<style scoped>
  #cart_list {
    font-size: 0.68rem;
    /*height: calc(100vh - 1.9rem - 2.09rem - 1.9rem);*/
    height: calc(100% - 44px - 49px - 40px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }

</style>
