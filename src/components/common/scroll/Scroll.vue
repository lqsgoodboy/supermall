<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    //创建vue实例之后就挂载
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //父组件控制这些操作
      // 2.监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }

      // 3.监听上拉事件
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      //不传入time默认为300
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>

<!--
    mounted() {
      //默认情况bscroll不能实时监控滚动
      //--ref: 绑定在组件上：this.$refs.refName获取到一个组件对象
      //ref: 绑定在元素上：this.$refs.refName获取到一个元素
      this.scroll = new BScroll(this.$refs.wrapper, {
        //0,1:什么都不侦测
        //2:会侦测手指滚动过程中侦测，手指离开后的惯性滚动不侦测
        //3:全部侦测
        probeType: 3,
        //默认屏蔽点击
        click: true,
        //用于做上拉加载功能，默认为false
        pullUpLoad: true
      })
      scroll.on('scroll', (position) => {
        console.log(position)
      })

      scroll.on('pullingUp', () => {
        console.log('上拉加载更多')
        //发送网络请求，请求更多页的数据

        //等数据请求完成，将新的数据展示出来之后
        bsscroll.finishPullDown()
      })
      this.scroll.scrollTo(0,0,500)
    }
-->
