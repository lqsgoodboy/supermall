<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll"
            @scroll="contentScroll" :probe-type="3">
      <!--父子通信数据绑定：驼峰或-均可，事件绑定@必须保持一致-->
      <!--商品-->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>

      <!--评论-->
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>

      <!--参数-->
      <detail-shop-info :shop="shop" ref="shop"/>
      <detail-param-info :param-info="paramInfo" />
      <detail-introduce :images-info="imagesInfo" @imageLoad="imageLoad"/>

      <!--推荐-->
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  import DetailNavBar from "./childComponents/DetailNavBar";
  import DetailSwiper from "./childComponents/DetailSwiper";
  import DetailBaseInfo from "./childComponents/DetailBaseInfo";
  import DetailCommentInfo from "./childComponents/DetailCommentInfo";
  import DetailShopInfo from "./childComponents/DetailShopInfo";
  import DetailBottomBar from "./childComponents/DetailBottomBar";
  import DetailParamInfo from "./childComponents/DetailParamInfo";
  import DetailIntroduce from "./childComponents/DetailIntroduce";

  import {getDetail,Goods,Shop,GoodsParams,getRecommend} from "network/detail";
  import {itemListenerMixin,backTopMixin} from "../../common/mixin";
  import {debounce} from "common/utils";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  import GoodsListItem from "components/content/goods/GoodsListItem";

  export default {
    name: "Detail",
    components: {
      DetailBottomBar,
      GoodsListItem,
      GoodsList,
      DetailParamInfo,
      DetailIntroduce,
      DetailCommentInfo,
      Scroll,
      DetailShopInfo,
      DetailBaseInfo,
      DetailNavBar,
      DetailSwiper,
    },
    mixins: [itemListenerMixin,backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        imagesInfo: {},
        commentInfo: {},
        paramInfo: {},
        recommends: [],
        themeTops: [],
        getThemeTop: null,
        currentIndex: 0,
      }
    },
    created() {
      //1、保存传入的iid
      this.iid = this.$route.params.iid

      //2、根据iid获取详情数据
      getDetail(this.iid).then(res => {
        //1、获取数据
        const data = res.result
        //2、获取轮播图图片
        this.topImages = data.itemInfo.topImages
        //3、获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //4、创建店铺信息
        this.shop = new Shop(data.shopInfo)
        // console.log(data.shopInfo)
        //5、保存商品详情数据
        this.imagesInfo = data.detailInfo
        // console.log(data)
        //6、获取商品尺码数据
        this.paramInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule)
        //7、获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })


      //3、请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      this.getThemeTop = debounce(() => {
        this.themeTops = []
        this.themeTops.push(0)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.shop.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        this.themeTops.push(Number.MAX_VALUE)
        console.log(this.themeTops)
      },500)
      //4、给getThemeTop赋值
     /* this.getThemeTop = (() => {

      })*/
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTop()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 300)
      },
      contentScroll(scroll) {
        const positionY = -scroll.y
        //positionY与对比
        for(let i = 0; i < this.themeTops.length - 1; i++){
          if(positionY > this.themeTops[i] && positionY < this.themeTops[i + 1]){
            this.currentIndex = i
          }
        }
      //是否展示回到顶部
      this.listenShowBackTop(scroll)
      },
      addToCart(){
        //获取需要的商品信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.newPrice
        product.iid = this.iid
        product.count = 0
        product.checked = false
        //将商品添加进购物车
        // this.$store.cartList.p(product)
        // this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product)
      }

    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;

  }
</style>
