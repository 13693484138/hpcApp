<template>
  <div class="memberSign">
    <div class="memberSign-head">超级荟员规则须知</div>
    <div class="memberSign-content" :style="{height:fullHeight-100+'px'}">
      <div class="memberSign-content-top"></div>
      <div class="memberSign-content-co">
        <div class="memberSign-content-warp">
          <div
            class="member-text"
          >欢迎使⽤荟品仓会员服务，为保障您的权益，请在进⾏下⼀步操作前，详细阅读本协议的所有内容，特别是加粗部分。当您勾选”同意《会员服务协议》”并点 击“⽴即开通”按钮或其他具有类似含义的按钮时，您的⾏为表示您同意并签署了本 协议中的约定。该协议构成您与荟品仓达成的协议，具有法律效益。 本协议内容包括协议正⽂、荟品仓已经发布的或将来可能发布的与会员服务相关的 各类规则。所有规则为本协议不可分割的组成部分，与协议正⽂具有同等法律效 ⼒。⼀旦相关内容发⽣变动，荟品仓将会通过电⼦邮件或⽹站公告等⽅式提示您。 如果您不同意对本协议内容所做的修改，则应⽴即停⽌使⽤本服务；如果您继续使 ⽤本服务的，则视为您同意对本协议内容所做的修改。</div>
        </div>

        <div class="memberSign-content-warp">
          <div class="bottom-title p-r">
            <span></span>
            <span>定义</span>
            <span class="title-english">Definition</span>
          </div>
          <div class="member-text">
            1.荟品仓会员：指在荟品仓具有良好消费记录的个⼈注册⽤户在签署本协议并根据荟品仓的收费标准⽀付相应的费⽤后获取的特殊资格。以下简称“会员”。
            2.会员服务：指会员所享有的特殊服务，包括全场9折（部分特殊商品不支持，请以详情页及门店标识价格宣导为准）等服务。
          </div>
        </div>

        <div class="memberSign-content-warp">
          <div class="bottom-title p-r">
            <span></span>
            <span>使用规范</span>
            <span class="title-english">Usage standard</span>
          </div>
          <div class="member-text">
            1.你申请开通会员服务时，需要提交您本⼈实名注册的⼿机号码等个⼈资料，并保证您提供的个⼈资料真实、准确、完整、合法有效，如有变动，您应及时更新。如您提供的资料不合法、不真实、不准确、不详尽，由此引起的损失及法律责任将由您⾃⾏承
            担，给荟品仓造成损失的，荟品仓保留要求您赔偿的权利。
            2.您申请开通会员服务时，须按照荟品仓公布的收费标准⽀付相应的会员服务费
            ⽤。荟品仓可能会基于业务发展，对收费标准进⾏调整，调整后的收费标准⾃公布
            之⽇起⽣效。如您在调整后的收费标准公布之前已开通会员服务的，您会员服务有
            效期的会员服务费⽤将不受影响，当会员服务有效期届满后，若您需要续费，则按
            照调整后的收费标准⽀付相应的会员服务费⽤。
            3.您知悉并确认，开通会员服务后，您有7日的反悔期（即您7日内（含）可反悔申请退款，退款⾦额为“超级荟员价格-已享受的福利” ，7日后不再接受退款。），7日后若您中途主动取消服务或终⽌资格的，荟品仓
            将不退还您已⽀付的会员服务费⽤。
            4.您知悉并同意，荟品仓有权通过邮件、短信或电话等形式，向您发送会员相关信
            息。
            5.荟品仓保留在法律法规允许的范围内⾃⾏决定是否接受您的会员服务申请、调整
            会员服务内容、取消会员资格等相关权利。
          </div>
        </div>

        <div class="memberSign-content-warp">
          <div class="bottom-title p-r">
            <span></span>
            <span>其他约定</span>
            <span class="title-english">Other agreements</span>
          </div>
          <div class="member-text">
            1.通知：所有发给您的通知都可通过电⼦邮件、常规的信件或在⽹站显著位置公告的⽅式进⾏传送，提醒您时刻留意相关通知。
            2.本协议使⽤中华⼈⺠共和国的法律。本协议的任何内容与中华⼈⺠共和国法律相
            抵触时，应当以法律规定为准，同事相关条款将按法律规定进⾏修改或重新解释，⽽本协议其他部分的法律效⼒不变。
            3.如使⽤会员服务过程中出现纠纷，您与荟品仓友好协商解决，若协商不成，应将纠纷提交至上海仲裁委员会，根据其现行有效仲裁规则进⾏仲裁。
          </div>
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
  .memberSign-content-co {
    overflow-x: hidden;
    overflow-y: auto;
    // height: 650px;
    height: calc(100% - 120px);
    .member-text {
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin: 0 auto;
      margin-top: 40px;
      line-height: 40px;

      width: 590px;
    }
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
          span {
            color: #ff3b30;
          }
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
            }
            .list-style {
              font-size: 0;
              font-weight: 400;
              font-size: 20px;
              display: flex;
              justify-content: flex-start;
              color: #999999;
              div {
                width: 244px;
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
        span:nth-child(2){
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