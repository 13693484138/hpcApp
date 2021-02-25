<template>
  <div class="id-list">
    <h2 class="defaut-title"
        v-if="isShow==false">您还没有建立身份卡哦！</h2>
    <div class="list"
         v-if="isShow==true">
      <div class="list-item"
           @click.stop="selectDefaultId(item.id)"
           v-for="(item) in list"
           :key="item.id">
        <img class="logo"
             :src="imgs.logoImg">
        <div class="head flex between">
          <div class="left flex">
            <img :src="getImg(item.role)" /> <strong>{{item.role}}</strong><span>资料完整度{{item.integrityRatio*100}}%</span>
          </div>
          <div class="right flex between"
               @click.stop="idCard(item.id)"><span>编辑</span><img :src="imgs.bianjiImg"></div>
        </div>
        <div class="body">
          <div class="info-list flex align-items">
            <div class="info-item">
              <span>身高</span>
              <strong>{{item.height}}</strong>
            </div>
            <div class="info-item">
              <span>体重</span>
              <strong>{{item.weight}}</strong>
            </div>
            <div class="info-item">
              <span>鞋码</span>
              <strong>{{item.pantsSize}}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="action-button flex center"
         @click="idCard('')">
      新建身份卡
    </div>
  </div>
</template>

<script>
import { isInApp } from '@/utils/index.js'
import { appUrl } from '@/utils/config.js'
export default {
  name: 'idList',
  data () {
    return {
      isApp: isInApp(),
      isShow: true,
      list: [],
      idList: [
        {
          text: '自己',
          img: require('@/images/reachHome/zj.png'),
        },
        {
          text: '子女',
          img: require('@/images/reachHome/zinv.png'),
        },
        {
          text: '配偶',
          img: require('@/images/reachHome/peiou.png'),
        },
        {
          text: '父母',
          img: require('@/images/reachHome/fumu.png'),
        },
      ],
      imgs: {
        logoImg: require('@/images/reachHome/logo.png'),
        bianjiImg: require('@/images/reachHome/bianji.png'),
      }
    };
  },
  created () {
    this.getList()
  },
  mounted () {

  },
  watch: {

  },
  methods: {
    getImg (val) {
      let data = this.idList.filter(item => item.text == val);
      if (!!data) {
        return data[0].img
      }
      return require('@/images/reachHome/zj.png')
    },
    selectDefaultId (id) {
      this.$api.reachHome.setDefaultIdentityCard({ id })
        .then(res => {
          this.goIndex()
        })
    },
    getList () {
      this.$api.reachHome.listIdentityCard({})
        .then(res => {
          if ((res == undefined || res == null) || (res.length == 0)) {
            this.isShow = false;
          } else {
            this.isShow = true;
          }
          // 获取默认信息
          this.list = res;
        })
    },
    idCard (id = '') {
      if (id != '') {
        this.$router.push({ path:'/idInfo',query:{id}});
      } else {
        this.$router.push({ path:'/idInfo'});
      }
    },
    goIndex () {
      window.hpcapi.backAction(true);
      this.$router.push({ path:'/reachHomeIndex'});
    }
  },
  components: {

  },
};
</script>

<style scoped lang="scss">
.flex {
  display: flex;
}
.center {
  justify-content: center;
  align-items: center;
}
.between {
  justify-content: space-between;
  align-items: center;
}
.align-items {
  align-items: center;
}
.id-list {
  .defaut-title {
    margin-top: 60px;
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    color: rgba(51, 51, 51, 1);
    line-height: 46px;
    text-align: center;
    height: 46px;
  }
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  img {
    display: block;
    width: 100%;
  }
  height: 100%;
  background: #f5f5f5;
  .logo {
    position: absolute;
    right: 20px;
    bottom: 0;
    width: 183px;
    height: 176px;
  }
  .list {
    flex: 1;
    padding: 60px 32px 220px 32px;
    overflow-y: auto;
    .list-item {
      position: relative;
      width: 686px;
      height: 255px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
      border-radius: 16px;
      padding-top: 35px;
      margin-bottom: 40px;
      .head {
        margin-bottom: 35px;
        padding: 0 60px;
        height: 70px;
        line-height: 70px;
        font-size: initial;
        .left {
          img {
            height: 70px;
            width: 70px;
            margin-right: 15px;
          }
          strong {
            font-size: 32px;
            color: rgba(51, 51, 51, 1);
            margin-right: 15px;
          }
          span {
            font-size: 20px;
          }
        }
        .right {
          font-size: initial;
          span {
            font-size: 26px;
            color: rgba(51, 51, 51, 1);
            margin-right: 12px;
          }
          img {
            width: 10px;
            height: 18px;
          }
        }
      }
      .body {
        .info-list {
          .info-item {
            flex: 1;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            span {
              display: block;
              height: 28px;
              font-size: 20px;
              color: rgba(153, 153, 153, 1);
              line-height: 28px;
              margin-bottom: 10px;
            }
            strong {
              height: 42px;
              font-size: 30px;
              color: rgba(51, 51, 51, 1);
              line-height: 42px;
            }
          }
        }
      }
    }
  }
  .list::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .action-button {
    width: 702px;
    height: 122px;
    background: #ffde04;
    font-size: 36px;
    border-radius: 54px;
    position: absolute;
    bottom: 69px;
    font-weight: bold;
    left: 24px;
  }
}
</style>
