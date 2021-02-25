<template>
  <div class="sales-wrapper">
    <div class="sales-nav">
      <van-tabs
        v-model="active"
        color="#FFE456"
        animated
        @change="selcetTabs"
        sticky
      >
        <van-tab title="全部" class="ys-tab ys-tab-item">
          <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
          >
            <div class="shouhou" v-if="afterList.length == 0 && afterListShow">
              <img src="../../images/afterSale/shouhouw.png" alt />
              <div class="shouhou-text">暂时没有任何售后单</div>
            </div>
            <div class="nav-item-warp" v-show="afterList.length != 0">
              <div
                class="nav-item-content"
                v-for="item in afterList"
                :key="item.id"
              >
                <!-- header -->
                <div class="nav-item-content-header">
                  <div class="header-text">售后编号：{{ item.id }}</div>
                  <div class="header-icon">
                    <img
                      src="../../images/afterSale/tuikuan.png"
                      v-if="item.afterType != 2"
                    />
                    <img
                      src="../../images/afterSale/tuihuo.png"
                      v-if="item.afterType == 2"
                    />
                    <span>{{ item.afterTypeCN }}</span>
                  </div>
                </div>
                <!-- main -->
                <div
                  class="nav-item-main"
                  v-for="goodsItem in item.productList"
                  :key="goodsItem.id"
                >
                  <div class="nav-item-main-img">
                    <img :src="goodsItem.productSkuImage" />
                  </div>
                  <div class="nav-item-main-list">
                    <div>
                      <div class="main-list-title">
                        <span class="main-list-title-text">{{
                          goodsItem.productName
                        }}</span>
                        <span class="main-list-title-num"
                          >X {{ goodsItem.refundQuantity }}</span
                        >
                      </div>
                      <div class="main-list-label">
                        {{ goodsItem.specColor }}{{ goodsItem.specSize }}
                      </div>
                    </div>
                    <div class="main-list-money">
                      退款：¥{{ item.refundAmount }}
                    </div>
                  </div>
                </div>

                <!-- msg -->
                <div class="msg">
                  <span class="msg-type">{{ item.afterStatusCN }}</span>
                  <span class="msg-text">{{ item.afterStatusText }}</span>
                </div>
                <!-- button -->
                <div class="button-list">
                  <van-button
                    plain
                    type="primary"
                    round
                    color="#DFDFDF"
                    @click="cancelApply(item.id)"
                    v-if="item.afterStatus == 0 || item.afterStatus == 10"
                  >
                    <span style="color: #302e40">撤销申请</span>
                  </van-button>
                  <!-- <van-button plain type="primary" round color="#DFDFDF">
                <span style="color: #302E40;">修改申请</span>
                  </van-button>-->
                  <van-button
                    plain
                    type="primary"
                    v-if="item.statusName == 1"
                    round
                    color="#DFDFDF"
                    @click="
                      fillLogistics(
                        item.id,
                        item.orderMasterId,
                        item.productList[0].orderProductId
                      )
                    "
                  >
                    <span style="color: #302e40">填写运单号</span>
                  </van-button>
                  <van-button
                    @click="
                      queryDetails(
                        item.id,
                        item.afterType,
                        item.productList[0].orderProductId
                      )
                    "
                    type="primary"
                    round
                    color="#FFE456"
                  >
                    <span style="color: #302e40">查看详情</span>
                  </van-button>
                </div>
              </div>
            </div>
            <!--  -->
          </van-pull-refresh>
        </van-tab>
        <van-tab title="处理中" class="ys-tab">
          <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
          >
            <div
              class="shouhou"
              v-if="afterList1.length == 0 && afterList1Show"
            >
              <img src="../../images/afterSale/shouhouw.png" alt />
              <div class="shouhou-text">暂时没有任何售后单</div>
            </div>
            <div class="nav-item-warp" v-if="afterList1.length != 0">
              <div
                class="nav-item-content"
                v-for="item in afterList1"
                :key="item.id"
              >
                <!-- header -->
                <div class="nav-item-content-header">
                  <div class="header-text">售后编号：{{ item.id }}</div>
                  <div class="header-icon">
                    <img
                      src="../../images/afterSale/tuikuan.png"
                      v-if="item.afterType != 2"
                    />
                    <img
                      src="../../images/afterSale/tuihuo.png"
                      v-if="item.afterType == 2"
                    />
                    <span>{{ item.afterTypeCN }}</span>
                  </div>
                </div>
                <!-- main -->
                <div
                  class="nav-item-main"
                  v-for="goodsItem in item.productList"
                  :key="goodsItem.id"
                >
                  <div class="nav-item-main-img">
                    <img :src="goodsItem.productSkuImage" alt />
                  </div>
                  <div class="nav-item-main-list">
                    <div>
                      <div class="main-list-title">
                        <span class="main-list-title-text">{{
                          goodsItem.productName
                        }}</span>
                        <span class="main-list-title-num"
                          >X {{ goodsItem.refundQuantity }}</span
                        >
                      </div>
                      <div class="main-list-label">
                        {{ goodsItem.specColor }}{{ goodsItem.specSize }}
                      </div>
                    </div>
                    <div class="main-list-money">
                      退款：¥{{ item.refundAmount }}
                    </div>
                  </div>
                </div>

                <!-- msg -->
                <div class="msg">
                  <span class="msg-type">{{ item.afterStatusCN }}</span>
                  <span class="msg-text">{{ item.afterStatusText }}</span>
                </div>
                <!-- button -->
                <div class="button-list">
                  <van-button
                    plain
                    type="primary"
                    round
                    v-if="item.afterStatus == 0 || item.afterStatus == 10"
                    color="#DFDFDF"
                    @click="cancelApply(item.id)"
                  >
                    <span style="color: #302e40">撤销申请</span>
                  </van-button>
                  <!-- <van-button plain type="primary" round color="#DFDFDF">
                <span style="color: #302E40;">修改申请</span>
                  </van-button>-->
                  <van-button
                    plain
                    type="primary"
                    round
                    color="#DFDFDF"
                    v-if="item.statusName == 1"
                    @click="
                      fillLogistics(
                        item.id,
                        item.orderMasterId,
                        item.productList[0].orderProductId
                      )
                    "
                  >
                    <span style="color: #302e40">填写运单号</span>
                  </van-button>
                  <van-button
                    type="primary"
                    round
                    color="#FFE456"
                    @click="
                      queryDetails(
                        item.id,
                        item.afterType,
                        item.productList[0].orderProductId
                      )
                    "
                  >
                    <span style="color: #302e40">查看详情</span>
                  </van-button>
                </div>
              </div>
            </div>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="已驳回" class="ys-tab">
          <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
          >
            <div
              class="shouhou"
              v-if="afterList2.length == 0 && afterList2Show"
            >
              <img src="../../images/afterSale/shouhouw.png" alt />
              <div class="shouhou-text">暂时没有任何售后单</div>
            </div>
            <div class="nav-item-warp" v-if="afterList2.length != 0">
              <div
                class="nav-item-content"
                v-for="item in afterList2"
                :key="item.id"
              >
                <!-- header -->
                <div class="nav-item-content-header">
                  <div class="header-text">售后编号：{{ item.id }}</div>
                  <div class="header-icon">
                    <img
                      src="../../images/afterSale/tuikuan.png"
                      v-if="item.afterType != 2"
                    />
                    <img
                      src="../../images/afterSale/tuihuo.png"
                      v-if="item.afterType == 2"
                    />
                    <span>{{ item.afterTypeCN }}</span>
                  </div>
                </div>
                <!-- main -->
                <div
                  class="nav-item-main"
                  v-for="goodsItem in item.productList"
                  :key="goodsItem.id"
                >
                  <div class="nav-item-main-img">
                    <img :src="goodsItem.productSkuImage" alt />
                  </div>
                  <div class="nav-item-main-list">
                    <div>
                      <div class="main-list-title">
                        <span class="main-list-title-text">{{
                          goodsItem.productName
                        }}</span>
                        <span class="main-list-title-num"
                          >X {{ goodsItem.refundQuantity }}</span
                        >
                      </div>
                      <div class="main-list-label">
                        {{ goodsItem.specColor }}{{ goodsItem.specSize }}
                      </div>
                    </div>
                    <div class="main-list-money">
                      退款：¥{{ item.refundAmount }}
                    </div>
                  </div>
                </div>

                <!-- msg -->
                <div class="msg">
                  <span class="msg-type">{{ item.afterStatusCN }}</span>
                  <span class="msg-text">{{ item.afterStatusText }}</span>
                </div>
                <!-- button -->
                <div class="button-list">
                  <van-button
                    plain
                    type="primary"
                    v-if="item.afterStatus == 0 || item.afterStatus == 10"
                    round
                    color="#DFDFDF"
                    @click="cancelApply(item.id)"
                  >
                    <span style="color: #302e40">撤销申请</span>
                  </van-button>
                  <!-- <van-button plain type="primary" round color="#DFDFDF">
                <span style="color: #302E40;">修改申请</span>
                </van-button>-->
                  <van-button
                    plain
                    type="primary"
                    round
                    color="#DFDFDF"
                    v-if="item.statusName == 1"
                    @click="
                      fillLogistics(
                        item.id,
                        item.orderMasterId,
                        item.productList[0].orderProductId
                      )
                    "
                  >
                    <span style="color: #302e40">填写运单号</span>
                  </van-button>
                  <van-button
                    type="primary"
                    @click="
                      queryDetails(
                        item.id,
                        item.afterType,
                        item.productList[0].orderProductId
                      )
                    "
                    round
                    color="#FFE456"
                  >
                    <span style="color: #302e40">查看详情</span>
                  </van-button>
                </div>
              </div>
            </div>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="已取消" class="ys-tab">
          <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
          >
            <div
              class="shouhou"
              v-if="afterList3.length == 0 && afterList3Show"
            >
              <img src="../../images/afterSale/shouhouw.png" alt />
              <div class="shouhou-text">暂时没有任何售后单</div>
            </div>
            <div class="nav-item-warp" v-if="afterList3.length != 0">
              <div
                class="nav-item-content"
                v-for="item in afterList3"
                :key="item.id"
              >
                <!-- header -->
                <div class="nav-item-content-header">
                  <div class="header-text">售后编号：{{ item.id }}</div>
                  <div class="header-icon">
                    <img
                      src="../../images/afterSale/tuikuan.png"
                      v-if="item.afterType != 2"
                    />
                    <img
                      src="../../images/afterSale/tuihuo.png"
                      v-if="item.afterType == 2"
                    />
                    <span>{{ item.afterTypeCN }}</span>
                  </div>
                </div>
                <!-- main -->
                <div
                  class="nav-item-main"
                  v-for="goodsItem in item.productList"
                  :key="goodsItem.id"
                >
                  <div class="nav-item-main-img">
                    <img :src="goodsItem.productSkuImage" alt />
                  </div>
                  <div class="nav-item-main-list">
                    <div>
                      <div class="main-list-title">
                        <span class="main-list-title-text">{{
                          goodsItem.productName
                        }}</span>
                        <span class="main-list-title-num"
                          >X {{ goodsItem.refundQuantity }}</span
                        >
                      </div>
                      <div class="main-list-label">
                        {{ goodsItem.specColor }}{{ goodsItem.specSize }}
                      </div>
                    </div>
                    <div class="main-list-money">
                      退款：¥{{ item.refundAmount }}
                    </div>
                  </div>
                </div>

                <!-- msg -->
                <div class="msg">
                  <span class="msg-type">{{ item.afterStatusCN }}</span>
                  <span class="msg-text">{{ item.afterStatusText }}</span>
                </div>
                <!-- button -->
                <div class="button-list">
                  <van-button
                    plain
                    type="primary"
                    v-if="item.afterStatus == 0 || item.afterStatus == 10"
                    round
                    color="#DFDFDF"
                    @click="cancelApply(item.id)"
                  >
                    <span style="color: #302e40">撤销申请</span>
                  </van-button>
                  <!-- <van-button plain type="primary" round color="#DFDFDF">
                <span style="color: #302E40;">修改申请</span>
                </van-button>-->
                  <van-button
                    plain
                    type="primary"
                    round
                    color="#DFDFDF"
                    v-if="item.statusName == 1"
                    @click="
                      fillLogistics(
                        item.id,
                        item.orderMasterId,
                        item.productList[0].orderProductId
                      )
                    "
                  >
                    <span style="color: #302e40">填写运单号</span>
                  </van-button>
                  <van-button
                    type="primary"
                    @click="
                      queryDetails(
                        item.id,
                        item.afterType,
                        item.productList[0].orderProductId
                      )
                    "
                    round
                    color="#FFE456"
                  >
                    <span style="color: #302e40">查看详情</span>
                  </van-button>
                </div>
              </div>
            </div>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="已完成" class="ys-tab ys-tab-item">
          <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
          >
            <div
              class="shouhou"
              v-show="afterList4.length == 0 && afterList4Show"
            >
              <img src="../../images/afterSale/shouhouw.png" alt />
              <div class="shouhou-text">暂时没有任何售后单</div>
            </div>
            <div class="nav-item-warp" v-if="afterList4.length != 0">
              <div
                class="nav-item-content"
                v-for="item in afterList4"
                :key="item.id"
              >
                <!-- header -->
                <div class="nav-item-content-header">
                  <div class="header-text">售后编号：{{ item.id }}</div>
                  <div class="header-icon">
                    <img
                      src="../../images/afterSale/tuikuan.png"
                      v-if="item.afterType != 2"
                    />
                    <img
                      src="../../images/afterSale/tuihuo.png"
                      v-if="item.afterType == 2"
                    />
                    <span>{{ item.afterTypeCN }}</span>
                  </div>
                </div>
                <!-- main -->
                <div
                  class="nav-item-main"
                  v-for="goodsItem in item.productList"
                  :key="goodsItem.id"
                >
                  <div class="nav-item-main-img">
                    <img :src="goodsItem.productSkuImage" alt />
                  </div>
                  <div class="nav-item-main-list">
                    <div>
                      <div class="main-list-title">
                        <span class="main-list-title-text">{{
                          goodsItem.productName
                        }}</span>
                        <span class="main-list-title-num"
                          >X {{ goodsItem.refundQuantity }}</span
                        >
                      </div>
                      <div class="main-list-label">
                        {{ goodsItem.specColor }}{{ goodsItem.specSize }}
                      </div>
                    </div>
                    <div class="main-list-money">
                      退款：¥{{ item.refundAmount }}
                    </div>
                  </div>
                </div>

                <!-- msg -->
                <div class="msg">
                  <span class="msg-type">{{ item.afterStatusCN }}</span>
                  <span class="msg-text">{{ item.afterStatusText }}</span>
                </div>
                <!-- button -->
                <div class="button-list">
                  <van-button
                    plain
                    type="primary"
                    round
                    color="#DFDFDF"
                    v-if="item.afterStatus == 0 || item.afterStatus == 10"
                    @click="cancelApply(item.id)"
                  >
                    <span style="color: #302e40">撤销申请</span>
                  </van-button>
                  <!-- <van-button plain type="primary" round color="#DFDFDF">
                <span style="color: #302E40;">修改申请</span>
                </van-button>-->
                  <van-button
                    plain
                    type="primary"
                    round
                    color="#DFDFDF"
                    v-if="item.statusName == 1"
                    @click="
                      fillLogistics(
                        item.id,
                        item.orderMasterId,
                        item.productList[0].orderProductId
                      )
                    "
                  >
                    <span style="color: #302e40">填写运单号</span>
                  </van-button>
                  <van-button
                    type="primary"
                    @click="
                      queryDetails(
                        item.id,
                        item.afterType,
                        item.productList[0].orderProductId
                      )
                    "
                    round
                    color="#FFE456"
                  >
                    <span style="color: #302e40">查看详情</span>
                  </van-button>
                </div>
              </div>
            </div>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0, //当前标签页数-全部0而
      afterList: [], //全部
      afterList1: [], //处理中
      afterList2: [], //已驳回
      afterList3: [], //已取消
      afterList4: [], //已完成
      afterListShow: false,
      afterList1Show: false,
      afterList2Show: false,
      afterList3Show: false,
      afterList4Show: false,
      isLoading: false, //下拉刷新
      arefundIndex: "", //当前标签页数-全部是""
      listArr: [], //用于判断是否还需要加载
      parameterArr: [],
    };
  },
  mounted() {
    this.arefundListInit([]);
  },
  methods: {
    //标签页初始化
    arefundListInit(arr) {
      let name = "afterList" + this.arefundIndex;
      let afterName = "afterList" + this.arefundIndex + "Show";
      let requestData = {
        pageNum: 1,
        pageSize: 1000,
        afterStatus: arr,
      };
      this.$api.afterSaleDetail
        .getAfterPageList(requestData)
        .then((res) => {
          this[name] = res.list;
          this[afterName] = true;
        })
        .catch(() => {
    
           this[afterName] = true;
        });
    },
    // 标签请求
    selectInit(index, arr) {
      let afterStatus = index == 0 ? "" : index;
      this.arefundIndex = afterStatus;
      if (this.listArr.indexOf(index) == -1) {
        this.listArr.push(index);
        this.arefundListInit(arr);
      } else {
        return;
      }
    },
    //标签页切换
    selcetTabs(index, title) {
      switch (index) {
        case 0:
          this.parameterArr = [];
          this.selectInit(0, []);
          break;
        case 1:
          this.parameterArr = [0, 10, 15];
          this.selectInit(1, [0, 10, 15]);
          break;
        case 2:
          this.parameterArr = [40];
          this.selectInit(2, [40]);
          break;
        case 3:
          this.parameterArr = [30];
          this.selectInit(3, [30]);
          break;
        case 4:
          this.parameterArr = [20];
          this.selectInit(4, [20]);
          break;
      }
    },
    //下拉刷新
    onRefresh() {
      let name = "afterList" + this.arefundIndex;
      let afterName = "afterList" + this.arefundIndex + "Show";
      let requestData = {
        pageNum: 1,
        pageSize: 1000,
        afterStatus: this.parameterArr,
      };
      this.$api.afterSaleDetail
        .getAfterPageList(requestData)
        .then((res) => {
          this[name] = res.list;
          this[afterName] = true;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this[afterName] = true;
    
        });
    },
    //填写物流单号
    fillLogistics(afterSaleId, orderMasterId, orderProductId) {
      this.$router.push({
        path: "/makeCourier",
        query: {
          afterSaleId: afterSaleId,
          orderMasterId: orderMasterId,
          id: orderProductId,
        },
      });
    },
    //撤销请求发起
    undoServe(afterSaleId) {
      let requestData = {
        afterSaleId: afterSaleId,
      };
      this.$api.afterSaleDetail
        .cancelAfterSaleById(requestData)
        .then((res) => {
          this.onRefresh();
          this.$toast("撤销成功");
        })
       
    },
    //撤销动作发起
    cancelApply(afterSaleId) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定撤销申请？",
        })
        .then(() => {
          this.undoServe(afterSaleId);
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    //查看售后详情
    queryDetails(id, type, orderProductId) {
      if (type == 1 || type == 0) {
        this.$router.push({
          path: "/afterSaleDetail",
          query: {
            afterSaleId: id,
            orderProductId: 1,
          },
        });
      } else {
        this.$router.push({
          path: "/afterSaleDetail",
          query: {
            afterSaleId: id,
            orderProductId: orderProductId,
          },
        });
      }

      // if (afterType == 5 || afterType == 3 || afterType == 2) {
      //   this.$router.push({
      //     path: "/afterSaleDetail",
      //     query: {
      //       orderMasterId: orderMasterId,
      //       orderProductId: orderProductId,
      //     },
      //   });
      // } else {
      //   this.$router.push({
      //     path: "/afterSaleDetail",
      //     query: {
      //       orderMasterId: orderMasterId,
      //       orderProductId: 1,
      //     },
      //   });
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
.sales-wrapper {
  background: #f9f9f9;
  height: 100vh;
  .nav-item-warp {
    background: #f9f9f9;
  }
  .shouhou img {
    width: 360px;
    height: 360px;
  }
  .nav-flio {
    overflow: hidden;
  }
  .shouhou {
    background-color: #f9f9f9;
    text-align: center;
    padding-top: 117px;
    overflow: hidden;
  }
  .shouhou-text {
    font-size: 26px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #302e40;
  }
  .nav-item-content {
    margin-top: 16px;
    padding: 0 24px;
    padding-top: 24px;
    background: #ffffff;
    overflow: auto;
    .nav-item-content-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-text {
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #7a7a84;
      }
      .header-icon {
        display: flex;
        align-items: center;
      }
      .header-icon img {
        width: 40px;
        height: 40px;
      }
      .header-icon span {
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #302e40;
        margin-left: 8px;
      }
    }
  }
  .nav-item-main {
    margin-top: 24px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .nav-item-main-img {
      img {
        width: 224px;
        height: 224px;
      }
    }
    .nav-item-main-list {
      margin-left: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 224px;
      width: 100%;
      .main-list-title {
        font-size: 32px;
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        color: #302e40;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
        .main-list-title-text {
          display: inline-block;
          width: 326px;
          line-height: 45px;
        }
        .main-list-title-num {
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #302e40;
          line-height: 33px;
        }
      }
      .main-list-label {
        font-size: 24px;
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        color: #9c9ca4;
        margin-top: 12px;
      }
      .main-list-money {
        font-size: 34px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ff3b30;
        line-height: 48px;
        letter-spacing: 4px;
      }
    }
  }
  .msg {
    width: 100%;
    height: 80px;
    margin-top: 24px;
    font-size: 28px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    display: flex;
    align-items: center;
    color: #7a7a84;
    background: #f9f9f9;
    .msg-type {
      color: #ff3b30;
      padding: 0 32px 0 35px;
    }
  }
  .button-list {
    text-align: right;
    margin-top: 24px;
    padding-bottom: 40px;
  }
  .button-list button {
    margin-right: 32px;
  }
  .button-list button:last-child {
    margin-right: 0;
  }
}
</style>