<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!-- current 当前选中 -->
          <li
            :class="{current: index === currentIndex}"
            class="menu-item"
            v-for="(good,index) in goods"
            :key="index"
            @click="Menuitemclick(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li
            ref="foodstop"
            class="food-list-hook food-list"
            v-for="(good,index) in goods"
            :key="index"
          >
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food,index) in good.foods"
                :key="index"
                @click="ShowFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <!-- 商品数量加减组件 -->
                    <cart-control :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 详情页购物车组件 -->
      <shop-cart />
    </div>
    <food :food="food" ref="food" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
import CartControl from "../../../components/CartControl/CartControl";
import Food from "../../../components/Food/Food";
import ShopCart from "../../../components/ShopCart/ShopCart";

export default {
  name: "",
  data() {
    return {
      scrollY: 0, // 右侧滑动的Y轴坐标 (滑动过程时实时变化)
      tops: [], // 所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化)
      food: {} // 需要显示的food
    };
  },
  mounted() {
    this.$store.dispatch("getShopGoods", () => {
      // 数据更新后执行
      this.$nextTick(() => {
        // 页面更新完成后执行
        // 创建BScroll
        this._initScroll();
        this._initTops();
      });
    });
  },
  methods: {
    // 初始化滚动
    _initScroll() {
      // 左边分类列表scroll
      new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      // 右边商品列表scroll
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3 // 添加此属性才可以监听实时位置 3 惯性滑动的位置也会监听到
      });
      //给右边列表绑定监听scroll
      this.foodsScroll.on("scroll", ({ x, y }) => {
        // 获取Y值
        this.scrollY = Math.abs(y); // math.abs 方法会把负数变成正数
      });
    },
    // 初始化商品分类的tops
    _initTops() {
      // 1.初始化tops
      const tops = [];
      let top = 0;
      tops.push(top);
      // 2.收集tops
      const lis = this.$refs.foodstop;
      // Array.prototype.slice.call() 将伪数组变成真正的数组
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight;
        tops.push(top);
      });
      // 3.更新数据
      this.tops = tops;
    },
    // 点击分类滑动到对应的商品
    Menuitemclick(index) {
      const scrollY = this.tops[index];
      this.scrollY = scrollY;
      this.foodsScroll.scrollTo(0, -scrollY, 300);
    },
    // 点击显示food
    ShowFood(food) {
      this.food = food;
      this.$refs.food.toggleShow();
    }
  },
  computed: {
    ...mapState(["goods"]),
    // 计算得到当前分类的下标
    currentIndex() {
      const { scrollY, tops } = this;
      // 根据条件计算产生一个结果
      const index = tops.findIndex((top, index) => {
        return scrollY >= top && scrollY < tops[index + 1];
      });

      return index;
    }
  },
  components: {
    CartControl,
    Food,
    ShopCart
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>