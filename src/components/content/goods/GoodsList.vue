<template>
  <div class="goods">
    <!--从home ->goods-list -> goods-list-item-->
    <goods-list-item v-for="(item,index) in goods" :goods-item="item" :keys="index"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 2px;
  }

</style>
