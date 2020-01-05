<template>
  <section class="msite">
    <!--首页头部-->
    <herder-top :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo' : '/login'">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </herder-top>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorysArr.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="categorys in categorysArr" :key="categorys.id">
            <a
              href="javascript:"
              class="link_to_food"
              v-for="category in categorys"
              :key="category.id"
            >
              <div class="food_container">
                <img v-lazy="baseImageUrl + category.image_url" />
              </div>
              <span>{{ category.title }}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt v-else />
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <!-- 商家列表 -->
      <shop-list />
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

import HerderTop from "../../components/HerderTop/HerderTop";
import ShopList from "../../components/ShopList/ShopList";

export default {
  name: "",
  components: {
    HerderTop,
    ShopList
  },
  data() {
    return {
      baseImageUrl: "https://fuss10.elemecdn.com"
    };
  },
  mounted() {},
  computed: {
    ...mapState(["address", "categorys", "userInfo"]),

    categorysArr() {
      // 准备空的二维数组
      const arr = [];
      // 准备小的空数组
      let minArr = [];
      // 遍历出每个分类
      this.categorys.forEach(c => {
        // 当小数组的长度是8时说明，已达到最大长度,重新创建一个新数组
        if (minArr.length === 8) {
          minArr = [];
        }
        // 当小数组长度为空，说明是一个新数组，将小数组保存到大数组中
        if (minArr.length === 0) {
          arr.push(minArr);
        }
        // 将当前分类保存到小数组中
        minArr.push(c);
      });
      // 返回处理好的二维数组
      return arr;
    }
  },
  watch: {
    // 属性监听 当属性发生变化执行函数
    categorys(value) {
      // 因为界面更新是异步的，$nextTick中的回调函数 一旦完成界面更新, 立即调用(此条语句要写在数据更新之后)
      this.$nextTick(() => {
        // 创建轮播图对象
        new Swiper(".swiper-container", {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination"
          }
        });
      });
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.msite { // 首页
  width: 100%;

  .miste-content-wrapper {
    position: fixed;
    top: 45px;
    bottom: 46px;
    width: 100%;

    .msite_nav {
      bottom-border-1px(#e4e4e4);
      margin-top: 15px;
      height: 200px;
      background: #fff;

      .swiper-container {
        width: 100%;
        height: 100%;

        .swiper-wrapper {
          width: 100%;
          height: 100%;

          .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;

            .link_to_food {
              width: 25%;

              .food_container {
                display: block;
                width: 100%;
                text-align: center;
                padding-bottom: 10px;
                font-size: 0;

                img {
                  display: inline-block;
                  width: 50px;
                  height: 50px;
                }
              }

              span {
                display: block;
                width: 100%;
                text-align: center;
                font-size: 13px;
                color: #666;
              }
            }
          }
        }

        .swiper-pagination {
          >span.swiper-pagination-bullet-active {
            background: #02a774;
          }
        }
      }
    }

    .msite_shop_list {
      top-border-1px(#e4e4e4);
      margin-top: 10px;
      background: #fff;

      .shop_header {
        padding: 10px 10px 0;

        .shop_icon {
          margin-left: 5px;
          color: #999;
        }

        .shop_header_title {
          color: #999;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
