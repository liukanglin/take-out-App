export default {
  totalCount(state) {
    return state.cartfoods.reduce((total, food) => {
      return total + food.count
    }, 0)
  },
  totalPrice(state) {
    return state.cartfoods.reduce((total, food) => {
      return total + food.count * food.price
    }, 0)
  },

  positiveSize(state) {
    return state.ratings.reduce((total, rating) => {
      return total + (rating.rateType === 0 ? 1 : 0)
    }, 0)
  }
}