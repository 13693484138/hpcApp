<template>
  <div class="memberSign">
    <div class="memberSign-head">超级荟员规则说明</div>
    <div
      class="memberSign-content"
      :style="{ height: fullHeight - 100 + 'px' }"
    >
      <div class="memberSign-content-top"></div>
      <div class="memberSign-content-co">
        <div class="memberSign-content-warp">
          <div class="bottom-title p-r">
            <span></span>
            <span>购买说明</span>
            <span class="title-english">Description</span>
          </div>
          <ul>
            <li>
              <span> 1.会员价格：</span>
              <span class="red">￥199.00</span><span>/年</span>
            </li>
            <li>
              <span>2.会员有效期：从购买</span>
              <span class="red">当日</span><span>算起，一年有效。</span>
            </li>
            <li>
              <span>3.续费规则：购买成功后，有效期延长</span>
              <span class="red">一年</span><span>。</span>
            </li>
          </ul>
        </div>

        <div class="memberSign-content-warp">
          <div class="bottom-title p-r">
            <span></span>
            <span>使用说明</span>
            <span class="title-english">Instructions</span>
          </div>
          <ul>
            <li>
              <span> 1.线上 app 、线下门店购买可</span>
              <span class="red">同享</span><span>超级荟员福利。</span>
            </li>
            <li>
              2.全场9折（部分特殊商品不支持）
              <ul class="list-item">
                <li>
                  <span>线上app付款时会享受</span>
                  <span class="red">9</span
                  ><span>折权益，支付金额为商家原价的</span>
                  <span class="red">90%</span>
                </li>
                <li>
                  <span>商品订单退款只退实付款,</span>
                  <span class="red">不计息</span>
                  <span>。</span>
                </li>
              </ul>
            </li>
            <li>
              3.会员专属商品
              <ul class="list-item">
                <li>
                  <span>专属商品只能</span>
                  <span class="red">超级荟员</span>
                  <span>能买。</span>
                </li>
                <li>
                  <span>专属商品</span>
                  <span class="red">不参与</span>
                  <span>9折、满减活动。</span>
                </li>
                <li>会员专享开放时间以APP页面及店铺陈列为准。</li>
              </ul>
            </li>
            <li>
              <span>
                4.超级荟员各项权益仅限荟员本人使用，不支持转赠及转借他人使用</span
              >
            </li>
            <li>
              5.解除超级荟员规则
              <ul class="list-item">
                <li>
                  <span>超级荟员到期，</span>
                  <span>自动解除。</span>
                </li>
                <li>
                  <span>本产品为增值服务，付款成功7日内</span>
                  <span class="red">（含）</span>
                  <span
                    >可申请退款，退款⾦额为“超级荟员价格-已享受的福利”
                    ，7日后不再接受退款。</span
                  >
                </li>
                <li>
                  <span>会员专享开放时间以APP页面及店铺陈列为准。</span>
                </li>
                <li class="list-style">
                  超级荟员价格：客户购买超级荟员时支付的价格。
                </li>
                <li class="list-style">
                  <div>已享受的福利：</div>
                  <ul>
                    <li>1.全场9折，享受的优惠福利（部分特殊商品不支持）。</li>
                    <li>
                      2.到家服务，享受12次专业搭配及免快递费配送服务（配送范围以门店为中心直线距离5公里）。
                    </li>
                    <li>3.专属商品，按吊牌价与实付款的差额。</li>
                    <li>4.特别定制，享受的服务折算（即将开启）。</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "memberSign",
  data() {
    return {
      fullHeight: document.documentElement.clientHeight,
    };
  },
};
</script>
<style scoped lang="scss">
.memberSign {
  .red {
    color: #ff3b30;
  }
  .memberSign-content-co {
    overflow-x: hidden;
    overflow-y: auto;
    // height: 650px;
    height: calc(100% - 120px);
  }
  background: rgba(255, 248, 239, 1);
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  &-head {
    text-align: center;
    margin-top: 30px;
    font-size: 80px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    background: linear-gradient(
      135deg,
      rgba(246, 192, 150, 1) 0%,
      rgba(180, 106, 64, 1) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  &-content {
    width: 670px;
    height: 1062px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 20px;
    position: relative;
    margin-top: 30px;
    &-top {
      width: 100%;
      background: url("../../assets/img/xiaobanyuan.png") no-repeat;
      background-size: cover;
      z-index: 1000;
      height: 100px;
    }
    &-warp {
      ul {
        width: 574px;
        margin: 0 auto;
        margin-top: 40px;
        li {
          font-size: 24px;
          font-weight: 400;
          color: #333333;
          line-height: 43px;
          margin-top: 14px;

          .list-item {
            margin-top: 0;
            li {
              color: #666666;
              font-size: 22px;
              margin-left: 10px;
              margin-top: 5px;
            }
            li:before {
              content: "";
              display: inline-block;
              width: 5px;
              height: 5px;
              background-color: #666;
              border-radius: 50%;
              margin-bottom: 5px;
              margin-right: 6px;
            }
            .list-style {
              font-size: 0;
              font-weight: 400;
              font-size: 20px;
              display: flex;
              justify-content: flex-start;
              color: #999999;
              div {
                white-space: nowrap;
              }
              ul {
                margin-top: 0;
                li {
                  font-size: 20px;
                  list-style: none;
                  color: #999999;
                  margin-left: 0;
                  margin-top: 0;
                }
                li:before {
                  display: none;
                }
              }
            }
            .list-style:before {
              display: none;
            }
          }
        }
      }
      .bottom-title {
        margin-top: 30px;
        .title-english {
          position: absolute;
          font-size: 40px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(246, 244, 245, 1);
          left: 50px;
          bottom: -18px;
        }
        span:first-child {
          width: 4px;
          display: inline-block;
          height: 24px;
          background: rgba(232, 190, 145, 1);
          border-radius: 2px;
          margin-left: 40px;
        }
        span:nth-child(2) {
          font-size: 34px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          margin-left: 10px;
          position: relative;
          z-index: 1000;
        }
      }
    }
  }
}
</style>