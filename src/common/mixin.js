import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";
import {BACK_POSITION} from "./const";

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener: null,
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
}


export const backTopMixin = {
  components: {
    BackTop
  },
  data(){
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0,0,200)
    },
    listenShowBackTop(position){
      this.isShowBackTop = (-position.y) > BACK_POSITION
    }
  }
}
