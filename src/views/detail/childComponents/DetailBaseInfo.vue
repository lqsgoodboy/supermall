<template>
  <!--对象不为空才显示-->
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length - 1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" :key="index"
            v-for="index in goods.services.length - 1">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index -1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title {
    color: #222;
  }
  .info-price {
    margin-top: 10px;
  }
  .info-price .n-price {
    font-size: 24px;
    color: var(--color-high-text);
  }
  .info-price .o-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }
  .info-price .discount {
    font-size: 12px;
    position: relative;
    top: -4px;
    margin-left: 5px;
    padding: 3px 6px;
    color: #ffffff;
    border-radius: 8px;
    background-color: #ff5777;
  }
  .info-other {
    font-size: 13px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  }
  .info-service {
    line-height: 60px;
    display: flex;
    justify-content: space-between;
  }
  .info-service-item img {
    position: relative;
    top: 2px;
    width: 14px;
    height: 14px;
  }
  .info-service-item span {
    font-size: 13px;
    margin-left: 5px;
    color: #333333;
  }
</style>
