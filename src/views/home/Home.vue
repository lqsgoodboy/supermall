<template>
  <div id="home">
    <!---->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabfixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recomends="recommends"/>
      <feature-views/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods" />
    </scroll>
    <!--组件监听原生事件时必须添加native属性-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import FeatureViews from "./childComps/FeatureViews";
  import RecommendView from "./childComps/RecommendView";

  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";

  import {getHomeMultiData, getHomeGoods} from "../../network/home";
  import {itemListenerMixin,backTopMixin} from "../../common/mixin";

  export default {
    name: "Home",
    components: {
      RecommendView,
      NavBar,
      HomeSwiper,
      FeatureViews,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins: [itemListenerMixin,backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page:0, list: []},
          'new': {page:0, list: []},
          'sell': {page:0, list: []},
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabfixed: false,
        saveY: 0,
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      //created只写主要逻辑，要执行的方法封装在methods中，外面需要嵌套函数名
      //1、请求多个数据
      this.getHomeMultiData()
      //2、请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    //这两个函数让tabcontrol能保持位置
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY)
    },
    deactivated() {
      //保存y值
      this.saveY = this.$refs.scroll.getScrollY()
    },

    methods: {
      /*事件监听方法==========*/

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      contentScroll(position) {
        //是否展示回到顶部
        this.listenShowBackTop(position)
      },
      loadMore() {
        //按照类型加载更多
        console.log('加载更多')
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /*网络请求相关方法==========*/
      getHomeMultiData() {
        //1、请求多个数据
        getHomeMultiData().then(res => {
          console.log(res)
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        //2、请求商品数据
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
    },

  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    position: relative;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #f6f6f6;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  .content {
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
    overflow: hidden;
    position: absolute;
    /*确定高度*/
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
