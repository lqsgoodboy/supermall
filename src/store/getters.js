export default {
  cartLength(state){
    let allCount = 0
    for(let i=0; i < state.cartList.length; i++){
      allCount += state.cartList[i].count
    }
    return allCount
    // return state.cartList.length
  },
  cartList(state){
    return state.cartList
  }

}
