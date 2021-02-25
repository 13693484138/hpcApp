<template>
    <div class="accountConflict">
        <div class="accountConflict-title">
            <div>此微信已被其他荟品仓账号绑定，是否要将微信绑定至本帐号，并解除另一荟品仓帐号？</div>
           
        </div>
        <!-- 第一个列表 -->
        <div class="accountConflict-item">
            <div class="accountConflict-item-warp">
                  <div class="item-warp-head">
                    <!-- <img src="" alt="头像"> -->
                      <div class="header-img"></div>
                  </div>
                  <div class="item-warp-text">
                        <div class="text-list">当前帐号:<span>荟品仓111</span></div>
                        <div class="text-list-detail">该账号下有11笔订单</div>
                  </div>
            </div>
            <div class="accountConflict-item-phone">
                <span>手机</span>
                <span>13000000000</span>
            </div>
        </div>
        <!-- 第二个列表 -->
         <div class="accountConflict-item list-h">
            <div class="accountConflict-item-warp">
                  <div class="item-warp-head">
                    <!-- <img src="" alt="头像"> -->
                      <div class="header-img"></div>
                  </div>
                  <div class="item-warp-text">
                        <div class="text-list">当前帐号:<span>荟品仓111</span></div>
                        <div class="text-list-detail">该账号下有11笔订单</div>
                  </div>
            </div>
            <div class="accountConflict-item-phone">
                <span>手机</span>
                <span>13000000000</span>
            </div>
            <div class="accountConflict-item-phone mt10">
                <span>微信</span>
                <span>13000000000</span>
            </div>
        </div>
        <!-- 底部按钮 -->
        <div class="accountConflict-bottom">
            <van-button type="default" block color="rgba(254,224,2,1)"><span>换绑</span></van-button>
            <van-button type="default" block><span>暂不换绑</span></van-button>
        </div>
    </div>
</template>
<script>
export default {
    name:"accountConflict",
    data(){
        return{

        }
    }
}
</script>
<style scoped lang="scss">
.accountConflict{
    
    background:rgba(245,245,245,1);
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
    right: 0;
    bottom: 0;
    font-family:PingFangSC-Regular,PingFang SC;
    &-title{
        text-align: center;
        font-size:30px;
        font-weight:600;
        color:rgba(51,51,51,1);
        width: 630px;
        height: 84px;
        margin: 0 auto;
        margin-top: 60px;
        line-height:42px;
        margin-bottom: 20px;
    }
    &-item{
        margin: 0 auto;
        margin-top: 60px;
        width: 600px;
        height: 182px;
        background:rgba(255,255,255,1);
        box-shadow:0px 4px 16px 0px rgba(0,0,0,0.1);
        border-radius:16px;
        &-warp{
            display: flex;
            justify-content: start;
            align-items: center;
            padding-top: 31px;
            .item-warp-head{
                .header-img{
                    width:68px;
                    height:68px;
                    background:rgba(223,223,223,1);
                    border-radius: 50%;
                    margin-left: 30px;
                }
            }
            .item-warp-text{
                font-size:30px;
                 font-weight:400;
                 margin-left: 20px;
                color:rgba(51,51,51,1);
                span{
                font-weight:600;
                }
                .text-list-detail{
                    margin-top: 13px;
                    font-size:24px;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    text-align: left;
                }
            }
        
        }
        &-phone{
                margin-left: 30px;
                margin-top: 30px;
                font-size:24px;
                font-weight:400;
                color:rgba(154,154,154,1);
                span:last-child{
                    margin-left: 16px;
                }
            }
            .mt10{
                margin-top:10px;
            }
    }
    .list-h{
         height: 216px;
    }
    .accountConflict-bottom{
        width: 600px;
        margin: 0 auto;
        margin-top: 100px;
        font-size:32px;
        font-weight:600;
        span{
            color:rgba(51,51,51,1);
        }
        .van-button:last-child{
                 margin-top: 40px;
        }
    }
}
</style>
