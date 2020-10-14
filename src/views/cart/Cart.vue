<template>
  <div class="cart">
    <!--导航栏-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!--商品列表-->
    <cart-list/>

    <!--底部汇总-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <cart-total/>
  </div>
</template>

<script>
    import Scroll from "../../components/common/scroll/Scroll";
    import NavBar from "../../components/common/navbar/NavBar";
    import {mapGetters} from 'vuex'
    import CartList from "./childComps/CartList";
    import CartTotal from "./childComps/CartTotal";
    import {backTopMixin} from "../../common/mixin";

    export default {
      name: "Cart",
      data(){
        return {
          AllCount: 0
        }
      },
      mixins: [backTopMixin],
      components: {
        CartTotal,
        CartList,
        NavBar,
        Scroll
      },
      computed: {
        // ...mapGetters(['cartLength', 'cartList'])
        //两种写法
        ...mapGetters({
          length: 'cartLength',
          list: 'cartList'
        })
      }
    }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
