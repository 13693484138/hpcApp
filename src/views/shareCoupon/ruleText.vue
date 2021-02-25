<template>
  <div class="rule-text">
    <div class="header flex fcenter">
      <i class="xian left"></i>
      <span>活动规则</span>
      <i class="xian left"></i>
    </div>
    <div class="main">
      <div v-for="(v,i) in list"
           :key="i">
        <h2 class="title">{{v.title}}</h2>
        <p class="value"
           v-for='(t,idx) in v.value'
           :key="idx"><span v-if="t.indexOf('400-602-8399')==-1">{{t}}</span><span v-else>{{t.slice(0,14)}}<a href="tel:4006028399">{{t.slice(14,26)}}</a>{{t.substring(26,t.length)}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    default: ''
  },
  data () {
    return {
      list: [
        {
          title: '使用规则',
          // value: [
          //   '1、分享即可送优惠券给小伙伴，自己也能抢~',
          //   '2、每个链接仅限领取1次，每个账号每天限领3张',
          //   '3、每个链接随机发放优惠券，优惠券的有效期及使用范围等详见优惠券使用规则',
          //   '4、优惠券仅限本人使用，不得以任何方式滥用优惠券或用于商业用途。上述情形一经发现，则冻结账号处理',
          //   '5、如果您的小伙伴为（荟品仓APP）新用户，参与活动即可获赠新人专享大券包。【特别提示：如您邀请的好友已经在荟品仓APP注册，则不属于新用户】',
          //   '6、新用户首次登陆荟品仓APP，可领取新人专享大券包，同一手机设备、同一手机号码金科领取一次新人专享大券包。',
          //   '7、优惠券、新人专属大券包均不可转让、不开发票、不找零、不兑换现金。',
          //   '8、优惠券的使用规则以荟品仓APP公示规则为准。'
          // ]
           value: [
            '1、一位新用户只能使用一张代金券，仅限荟品嘉定店【FATA&MODA】云朵袜使用。',
            '2、本券不兑换现金、不找零。',
            '3、本券只使用截止到10月25日。',
            '4、本券金额不另开发票。',
            '5、使用本券订单支付后无法退回，如取消订单，使用本券金额将无法退回，由本券代销方退回购券款。',
          ]
        }
      ]
    };
  },
  watch: {
    'text': function (val) {
      if (!!this.text) {
        // this.list.push({
        //   title: '使用规则',
        //   value: [
        //     this.text
        //   ]
        // })
      }
    }
  },
};
</script>

<style scoped lang="scss">
.flex {
  display: flex;
}
input {
  outline: none;
}
img {
  display: block;
  width: 100%;
}
.imgH {
  height: 100%;
  object-fit: cover;
}
.column {
  display: flex;
  flex-direction: column;
}
.between {
  justify-content: space-between;
  align-items: center;
}
.fcenter {
  justify-content: center;
  align-items: center;
}
.pcenter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.rule-text {
  position: relative;
  z-index: 66;
  margin-top: 32px;
  .header {
    height: 40px;
    line-height: 40px;
    font-size: initial;
    span {
      font-size: 28px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: initial;
      margin: 0 24px;
    }
    i {
      width: 64px;
      height: 1px;
      background: #c7c7cb;
    }
  }
  .main {
    margin: 0 32px;
    margin-top: 8px;
    div {
      padding-bottom: 32px;
      h2 {
        padding-left: 20px;
        height: 40px;
        font-size: 28px;
        font-weight: 500;
        color: rgba(48, 46, 64, 1);
        line-height: 40px;
        margin-bottom: 18px;
        position: relative;
      }
      h2::before {
        position: absolute;
        width: 8px;
        height: 24px;
        content: " ";
        pointer-events: none;
        left: 0;
        top: 50%;
        background: #ffe456;
        transform: translateY(-50%);
      }
      p {
        font-size: 28px;
        font-weight: 400;
        color: rgba(72, 72, 88, 1);
        line-height: 40px;
        text-indent: -20px;
        margin-left: 20px;
      }
    }
  }
}
</style>
