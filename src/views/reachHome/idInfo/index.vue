<template>
  <div class="id-info">
    <div class="go-bottom"
         v-show="titleIndex!=3"
         @click="titleClick">
      <img class="jiantou"
           :src="common.goBottomImg">
      <div class="bottom flex center">
        <img :src="common.BottomJianTouImg">
      </div>
    </div>
    <van-progress :show-pivot="false"
                  color="#F5A243"
                  :percentage="titleIndexNum"
                  track-color="#FEE002" />
    <div class="pagination">{{titleIndex+1}}/4</div>
    <div class="swiper-container"
         id="swiper-container1">
      <div class="swiper-wrapper">
        <div class="swiper-slide slide1">
          <div class="id-select">
            <h2 class="title">身份卡</h2>
            <div class="icon-list flex">
              <dl class="icon-item"
                  @click="selectId(index)"
                  v-for="(item,index) in idList"
                  :key="item.text">
                <dt><img class="icon"
                       :src="idSelectIndex===index?item.selectImg:item.img" /><img v-show="idSelectIndex===index"
                       class="duihao"
                       :src="common.duihaoImg" /></dt>
                <dd>
                  {{item.text}}
                </dd>
              </dl>

            </div>
          </div>
          <div class="gender-select">
            <h2 class="title">性别</h2>
            <div class="icon-list flex">
              <dl class="icon-item"
                  @click="selectGender(index)"
                  v-for="(item,index) in genderList"
                  :key="item.text">
                <dt><img class="icon"
                       :src="genderIndex===index?item.selectImg:item.img" /><img v-show="genderIndex===index"
                       class="duihao"
                       :src="common.duihaoImg" /></dt>
                <dd>
                  {{item.text}}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="swiper-slide slide2">
          <div class="age-select">
            <h2 class="title">你的年龄</h2>
            <div class="body">
              <div class="head flex between">
                <span class="text">年龄</span>
                <span></span>
                <span class="text">岁</span>
              </div>
              <div class="ruler"
                   id="age-ruler">
                <span>{{ageSelect}}</span></div>
            </div>
          </div>
          <div class="height-select">
            <h2 class="title">你的身高</h2>
            <div class="body">
              <div class="head flex between">
                <span class="text">高度</span>
                <span></span>
                <span class="text">CM</span>
              </div>
              <div class="ruler"
                   id="height-ruler">
                <span>{{selectData.height}}</span></div>
            </div>
          </div>
        </div>
        <div class="swiper-slide slide3">
          <div class="weight-select">
            <h2 class="title">你的体重</h2>
            <div class="body">
              <div class="head flex between">
                <span class="text">重量</span>
                <span></span>
                <span class="text">kg</span>
              </div>
              <div class="ruler"
                   id="weight-ruler">
                <span>{{selectData.weight}}</span></div>
            </div>
          </div>
          <div class="shoe-select">
            <h2 class="title">你的鞋码</h2>
            <div class="body">
              <div class="head flex between">
                <span class="text">码数</span>
                <span></span>
                <span class="text">码</span>
              </div>
              <div class="ruler"
                   id="shoe-ruler">
                <span>{{selectData.shoeSize}}</span></div>
            </div>
          </div>
        </div>
        <div class="swiper-slide slide4">
          <div class="swiper-container"
               id="swiper-container2">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="top">*此处为选填信息</div>
                <div class="main">
                  <div class="status-list">
                    <div class="status-item "
                         :class="{'active':statusListB[0]}">
                      <div class="head flex between">
                        <div class="left flex center">
                          <div class="icon"><img :src="statusImgs[0]" /></div> <span>婚姻</span>
                        </div>
                        <div class="right flex center"
                             @click="$set(statusListB,0,!statusListB[0])"><img :class="{'active':statusListB[0]}"
                               :src="common.jiantouImg" /></div>
                      </div>
                      <div class="body hunyin">
                        <div class="marriage-list flex">
                          <div class="marriage-item flex center"
                               :class="{'active':marriageIndex===index}"
                               @click="selectMarriage(index)"
                               v-for="(item,index) in marriageArr"
                               :key="item">{{item}}</div>
                        </div>

                      </div>
                    </div>

                    <div class="status-item"
                         :class="{'active':statusListB[1]}">
                      <div class="head flex between">
                        <div class="left flex center">
                          <div class="icon flex center"><img :src="statusImgs[1]" /></div> <span>职业</span>
                        </div>
                        <div class="right flex center"
                             @click="$set(statusListB,1,!statusListB[1])"><img :class="{'active':statusListB[1]}"
                               :src="common.jiantouImg" /></div>
                      </div>
                      <div class="body zhiye">
                        <div class="top">职业</div>
                        <div class="ruler"
                             id="profession-ruler">
                          <span>{{selectData.profession}}</span></div>
                      </div>
                    </div>
                    <div class="status-item"
                         :class="{'active':statusListB[2]}">
                      <div class="head flex between">
                        <div class="left flex center">
                          <div class="icon"><img :src="statusImgs[2]" /></div> <span>学历</span>
                        </div>
                        <div class="right flex center"
                             @click="$set(statusListB,2,!statusListB[2])"><img :class="{'active':statusListB[2]}"
                               :src="common.jiantouImg" /></div>
                      </div>
                      <div class="body xueli">
                        <div class="top">学历</div>
                        <div class="ruler"
                             id="education-ruler">
                          <span>{{selectData.education}}</span></div>
                      </div>
                    </div>
                    <div class="status-item"
                         :class="{'active':statusListB[3]}">
                      <div class="head flex between">
                        <div class="left flex center">
                          <div class="icon"><img :src="statusImgs[3]" /></div> <span>腰裤围</span>
                        </div>
                        <div class="right flex center"
                             @click="$set(statusListB,3,!statusListB[3])"><img :class="{'active':statusListB[3]}"
                               :src="common.jiantouImg" /></div>
                      </div>
                      <div class="body">
                        <div class="top">尺码</div>
                        <div class="ruler"
                             id="waist-ruler">
                          <span>{{selectData.waistline}}</span></div>
                      </div>
                    </div>
                    <div class="status-item"
                         :class="{'active':statusListB[4]}">
                      <div class="head flex between">
                        <div class="left flex center">
                          <div class="icon"><img :src="statusImgs[4]" /></div> <span>上衣尺码</span>
                        </div>
                        <div class="right flex center"
                             @click="$set(statusListB,4,!statusListB[4])"><img :class="{'active':statusListB[4]}"
                               :src="common.jiantouImg" /></div>
                      </div>
                      <div class="body">
                        <div class="top">尺码</div>
                        <div class="ruler"
                             id="tops-ruler">
                          <span>{{selectData.topSize}}</span></div>
                      </div>
                    </div>
                    <div class="status-item"
                         :class="{'active':statusListB[5]}">
                      <div class="head flex between">
                        <div class="left flex center">
                          <div class="icon"><img :src="statusImgs[5]" /></div> <span>裤装尺码</span>
                        </div>
                        <div class="right flex center"
                             @click="$set(statusListB,5,!statusListB[5])"><img :class="{'active':statusListB[5]}"
                               :src="common.jiantouImg" /></div>
                      </div>
                      <div class="body">
                        <div class="top">尺码</div>
                        <div class="ruler"
                             id="pants-ruler">
                          <span>{{selectData.pantsSize}}</span></div>
                      </div>
                    </div>
                    <div class="status-item no-overflow"
                         :class="{'active':statusListB[6]}">
                      <div class="head flex between">
                        <div class="left flex center">
                          <div class="icon"><img :src="statusImgs[6]" /></div> <span>上传照片</span>
                        </div>
                        <div class="right flex center"
                             @click="$set(statusListB,6,!statusListB[6])"><img :class="{'active':statusListB[6]}"
                               :src="common.jiantouImg" /></div>
                      </div>
                      <div class="body  tupian">
                        <div class="desc">请参照例图上传您的全身照</div>
                        <div class="wish-photo-wrap flex">
                          <div class="item">
                            <div class="jiahao"
                                 v-show="selectData.frontSide==''">
                              <img :src="common.jiahaoImg"
                                   alt="">
                            </div>
                            <div v-show="selectData.frontSide!=''"
                                 class="set-img"><img :src="selectData.frontSide+common.OSS"
                                   alt=""></div>
                            <div v-show="selectData.frontSide!=''"
                                 class="close"
                                 @click="selectData.frontSide=''"><img :src="common.closeImg"
                                   alt=""></div>
                            <span class="item-text">正面</span>
                            <van-uploader accept='image/jpg,image/png,image/jpeg'
                                          :before-read="beforeRead"
                                          :after-read="(file)=>{return afterRead(file,'frontSide')}">
                            </van-uploader>
                          </div>
                          <div class="item">
                            <div class="jiahao"
                                 v-show="selectData.reverseSide==''">
                              <img :src="common.jiahaoImg"
                                   alt="">
                            </div>
                            <div v-show="selectData.reverseSide!=''"
                                 class="set-img"><img :src="selectData.reverseSide+common.OSS"
                                   alt=""></div>
                            <div v-show="selectData.reverseSide!=''"
                                 class="close"
                                 @click="selectData.reverseSide=''"><img :src="common.closeImg"
                                   alt=""></div>
                            <span class="item-text">背面</span>
                            <van-uploader  accept='image/jpg,image/png,image/jpeg'
                                          :before-read="beforeRead"
                                          :after-read="(file)=>{return afterRead(file,'reverseSide')}">
                            </van-uploader>
                          </div>
                          <div class="item"
                               data-type="sideFace">
                            <div class="jiahao"
                                 v-show="selectData.sideFace==''">
                              <img :src="common.jiahaoImg"
                                   alt="">
                            </div>
                            <div v-show="selectData.sideFace!=''"
                                 class="set-img"><img :src="selectData.sideFace+common.OSS"
                                   alt=""></div>
                            <div v-show="selectData.sideFace!=''"
                                 class="close"
                                 @click="selectData.sideFace=''"><img :src="common.closeImg"
                                   alt=""></div>
                            <span class="item-text">侧面</span>
                            <van-uploader  accept='image/jpg,image/png,image/jpeg'
                                          :before-read="beforeRead"
                                          :after-read="(file)=>{return afterRead(file,'sideFace')}">
                            </van-uploader>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="status-item"
                         :class="{'active':statusListB[7]}">
                      <div class="head flex between">
                        <div class="left flex center">
                          <div class="icon"><img :src="statusImgs[7]" /></div> <span>添加备注</span>
                        </div>
                        <div class="right flex center"
                             @click="$set(statusListB,7,!statusListB[7])"><img :class="{'active':statusListB[7]}"
                               :src="common.jiantouImg" /></div>
                      </div>
                      <div class="body beizhu">
                        <textarea v-model="selectData.remark"
                                  class="remark"
                                  cols="30"
                                  rows="10"
                                  placeholder="如您有特别喜欢的款式或颜色请备注"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="footer flex between"
                     v-if="edit==true">
                  <div class="footer-item flex center"
                       @click="deleteData"><span>删除</span></div>
                  <div @click="save"
                       class="footer-item  flex center"><span>保存</span></div>
                </div>
                <div class="footer-new flex center"
                     v-if="edit==false"
                     @click="save">
                  <span>保存</span>
                </div>
              </div>
            </div>
            <div class="swiper-scrollbar"></div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Swiper from "swiper";
import { add, uploadOne, isInApp, getUrlParameter, getAppInfo } from '@/utils/index.js'
import { ruler } from '../ruler.js';
import { appUrl } from "@/utils/config.js";
import "@/assets/css/swiper.css";
export default {
  name: 'idInfo',
  data () {
    return {
      edit: false,
      watch: true,
      userId: getAppInfo() != null ? (getAppInfo().userID ? getAppInfo().userID : '') : '',
      selectData: {
        role: '自己',
        sex: '男',
        age: '',
        profession: '自由职业',
        education: '本科',
        maritalStatus: '已婚',
        height: '',
        weight: '',
        waistline: '2.2尺',
        topSize: '',
        shoeSize: '',
        pantsSize: '',
        remark: '',
        frontSide: '',
        sideFace: '',
        reverseSide: '',
      },
      common: {
        duihaoImg: require('@/images/reachHome/duihao.png'),
        jiantouImg: require('@/images/reachHome/jiantou.png'),
        goBottomImg: require('@/images/reachHome/bottom.png'),
        BottomJianTouImg: require('@/images/reachHome/bottom-jiantou.png'),
        closeImg: require('@/images/reachHome/close.png'),
        jiahaoImg: require('@/images/reachHome/jiahao.png'),
        OSS: '?x-oss-process=image/resize,h_280,w_280'
      },
      // 身份数据
      idSelectIndex: 0,
      idList: [
        {
          text: '自己',
          img: require('@/images/reachHome/icon-zj.png'),
          selectImg: require('@/images/reachHome/icon-zj-select.png'),
        },
        {
          text: '子女',
          img: require('@/images/reachHome/icon-zinv.png'),
          selectImg: require('@/images/reachHome/icon-zinv-select.png'),
        },
        {
          text: '配偶',
          img: require('@/images/reachHome/icon-peiou.png'),
          selectImg: require('@/images/reachHome/icon-peiou-select.png'),
        },
        {
          text: '父母',
          img: require('@/images/reachHome/icon-fumu.png'),
          selectImg: require('@/images/reachHome/icon-fumu-select.png'),
        },
      ],
      // 性别数据
      genderIndex: 0,
      genderList: [
        {
          text: '男',
          img: require('@/images/reachHome/nan.png'),
          selectImg: require('@/images/reachHome/nan-select.png'),
        },
        {
          text: '女',
          img: require('@/images/reachHome/nv.png'),
          selectImg: require('@/images/reachHome/nv-select.png'),
        },
      ],
      // 年龄数据
      ageSelect: 35,
      ageData: this.createData(90, 0, 1),
      // 身高数据
      heightList: [
        this.createData(41, 69, 1, 'cm'),
        this.createData(51, 109, 1, 'cm'),
        this.createData(41, 149, 1, 'cm'),
      ],
      // 体重数据
      weightList: [
        this.createData(28, 7, 1, 'kg'),
        this.createData(56, 44, 1, 'kg'),
      ],
      // 鞋码数据
      shoeSizeList: [
        ["16-17", "19-20", "20-21", "22-23"],
        ["23-24", "24-25", "25-26", "27-28", "29-30", "31-32", "32-34", "33-35", "35-36"],
        this.createData(21, 37.5, 0.5),
        this.createData(15, 34.5, 0.5),
      ],
      // 婚姻数据
      marriageIndex: 0,
      marriageArr: ["已婚", "未婚", "其他"],
      // 职业数据
      professionArr: ["学生", "职场白领", "企业高管", "务工人员", "离休人员", "自由职业", "其他",],
      // 学历数据
      educationArr: ["初中", "高中", "本科", "硕士", "博士", "海归", "其它"],
      // 腰裤围数据
      waistSize: this.createData(24, 1.6, 0.1, '尺'),
      // 上衣尺码
      topsSize: [
        ["45/40", "52/40", "59/40", "66/44", "73/48", "80/48", "90/48", "90/52", "100/56", "110/56"],
        ["110/60", "120/60", "120/64", "130/64", "135/68", "140/68"],
        ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"],
        ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      ],
      // 裤装尺码
      pantsSize: [
        ["45/40", "52/40", "59/40", "66/44", "44/48", "73/48", "80/48", "90/48", "90/52", "100/56", "110/56"],
        ["110/53", "120/53", "120/56", "130/59", "135/60", "140/68"],
        ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"],
        ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
      ],
      mySwiper1: null,
      mySwiper2: null,
      titleIndex: 0, //默认第一个 轮播页数
      titleIndexNum: 25, //默认第一个 和上方页数绑定
      statusListB: [true, true, true, true, true, true, true, true],
      statusImgs: [
        require('@/images/reachHome/status-hy.png'),
        require('@/images/reachHome/status-zy.png'),
        require('@/images/reachHome/status-xl.png'),
        require('@/images/reachHome/status-kyw.png'),
        require('@/images/reachHome/status-sycm.png'),
        require('@/images/reachHome/status-kzcc.png'),
        require('@/images/reachHome/status-zp.png'),
        require('@/images/reachHome/status-bj.png')
      ]
    };
  },
  computed: {

  },
  created () {

  },
  mounted () {
    if (getUrlParameter('id') || this.$route.query.id) {
      this.getEditData();
    } else {
      document.title = '新建身份卡';
      this.initdata();
    }
  },
  watch: {
    'titleIndex': function (val) {
      this.titleIndexNum = ((100 / 4) * (val + 1));
    },
    'idSelectIndex': function (val) {
      this.selectData['role'] = this.idList[val].text;

    },
    'genderIndex': function (val) {
      this.selectData['sex'] = this.genderList[val].text;
      if (this.watch) {
        if (this.ageSelect > 10) {
          if (this.selectData.sex == '男') {
            this.selectData.shoeSize = this.shoeSizeList[2][8];
            this.selectShoe({ arr: this.shoeSizeList[2], startValue: 8 });
            //上衣
            this.selectData.topSize = this.topsSize[2][4];
            this.selectTops({ arr: this.topsSize[2], startValue: 4 });
            //裤装
            this.selectData.pantsSize = this.pantsSize[2][4];
            this.selectPants({ arr: this.pantsSize[2], startValue: 4 });
          } else {
            this.selectData.shoeSize = this.shoeSizeList[3][4];
            this.selectShoe({ arr: this.shoeSizeList[3], startValue: 4 });
            //上衣
            this.selectData.topSize = this.topsSize[3][2];
            this.selectTops({ arr: this.topsSize[3], startValue: 2 });
            //裤装
            this.selectData.pantsSize = this.pantsSize[3][2];
            this.selectPants({ arr: this.pantsSize[3], startValue: 2 });
          }
        }
      }
    },
    'ageSelect': function (val) {
      if (this.watch) {
        if (this.ageSelect <= 3) {
          //身高
          this.selectData.height = this.heightList[0][30];
          this.selectHeight({ arr: this.heightList[0], startValue: 30 });
          //鞋码
          this.selectData.shoeSize = this.shoeSizeList[0][2];
          this.selectShoe({ arr: this.shoeSizeList[0], startValue: 2 });
          //上衣
          this.selectData.topSize = this.topsSize[0][8];
          this.selectTops({ arr: this.topsSize[0], startValue: 8 });
          //裤装
          this.selectData.pantsSize = this.pantsSize[0][9];
          this.selectPants({ arr: this.pantsSize[0], startValue: 9 });
        } else if (this.ageSelect <= 10) {
          this.selectData.height = this.heightList[1][40];
          this.selectHeight({ arr: this.heightList[1], startValue: 40 });
          this.selectData.shoeSize = this.shoeSizeList[1][6];
          this.selectShoe({ arr: this.shoeSizeList[1], startValue: 6 });
          //上衣
          this.selectData.topSize = this.topsSize[1][4];
          this.selectTops({ arr: this.topsSize[1], startValue: 4 });
          //裤装
          this.selectData.pantsSize = this.pantsSize[1][4];
          this.selectPants({ arr: this.pantsSize[1], startValue: 4 });
        } else {
          this.selectData.height = this.heightList[2][20];
          this.selectHeight({ arr: this.heightList[2], startValue: 20 });
          if (this.selectData.sex == '男') {
            this.selectData.shoeSize = this.shoeSizeList[2][8];
            this.selectShoe({ arr: this.shoeSizeList[2], startValue: 8 });
            //上衣
            this.selectData.topSize = this.topsSize[2][4];
            this.selectTops({ arr: this.topsSize[2], startValue: 4 });
            //裤装
            this.selectData.pantsSize = this.pantsSize[2][4];
            this.selectPants({ arr: this.pantsSize[2], startValue: 4 });
          } else {
            this.selectData.shoeSize = this.shoeSizeList[3][4];
            this.selectShoe({ arr: this.shoeSizeList[3], startValue: 4 });
            //上衣
            this.selectData.topSize = this.topsSize[3][2];
            this.selectTops({ arr: this.topsSize[3], startValue: 2 });
            //裤装
            this.selectData.pantsSize = this.pantsSize[3][2];
            this.selectPants({ arr: this.pantsSize[3], startValue: 2 });
          }
        }
        // 体重
        if (this.ageSelect <= 7) {
          this.selectData.weight = this.weightList[0][22];
          this.selectWeight({ arr: this.weightList[0], startValue: 22 })
        } else {
          this.selectData.weight = this.weightList[1][0];
          this.selectWeight({ arr: this.weightList[1] })
        }
      }
    },
    'marriageIndex': function (val) {
      this.selectData['maritalStatus'] = this.marriageArr[val];
    },
  },
  methods: {
    initSwiper () {
      let that = this;
      this.mySwiper1 = new Swiper('#swiper-container1', {
        direction: 'vertical',
        initialSlide: this.titleIndex,
        paginationClickable: true,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        on: {
          slideChange: function () {
            that.titleIndex = this.activeIndex; //切换结束时，告诉我现在是第几个slide
          },
        },
      })
      this.mySwiper2 = new Swiper('#swiper-container2', { // 子swiper
        direction: 'vertical',
        nested: true,
        slidesPerView: 'auto',
        freeMode: true,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        scrollbar: { el: '.swiper-scrollbar' }
      });
    },
    initdata (res) {
      console.log('编辑', res)
      if (res) {
        this.watch = false;
        let role = this.idList.findIndex(item => item.text == res.role);
        this.idSelectIndex = role;
        let sex = this.genderList.findIndex(item => item.text == res.sex);
        this.genderIndex = sex;
        this.ageSelect = res.age;
        this.selectAge({ arr: this.ageData, startValue: (res.age - 1) });
        if (res.age <= 3) {
          //身高
          let height = this.heightList[0].findIndex(item => item == res.height);
          this.selectData.height = this.heightList[0][height];
          this.selectHeight({ arr: this.heightList[0], startValue: height });
          //鞋码
          let shoeSize = this.shoeSizeList[0].findIndex(item => item == res.shoeSize);
          this.selectData.shoeSize = this.shoeSizeList[0][shoeSize];
          this.selectShoe({ arr: this.shoeSizeList[0], startValue: shoeSize });
          //上衣
          let topSize = this.topsSize[0].findIndex(item => item == res.topSize);
          this.selectData.topSize = this.topsSize[0][topSize];
          this.selectTops({ arr: this.topsSize[0], startValue: topSize });
          //裤装
          let pantsSize = this.pantsSize[0].findIndex(item => item == res.pantsSize);
          this.selectData.pantsSize = this.pantsSize[0][pantsSize];
          this.selectPants({ arr: this.pantsSize[0], startValue: pantsSize });
        } else if (res.age <= 10) {
          let height = this.heightList[1].findIndex(item => item == res.height);
          this.selectData.height = this.heightList[1][height];
          this.selectHeight({ arr: this.heightList[1], startValue: height });
          let shoeSize = this.shoeSizeList[1].findIndex(item => item == res.shoeSize);
          this.selectData.shoeSize = this.shoeSizeList[1][shoeSize];
          this.selectShoe({ arr: this.shoeSizeList[1], startValue: shoeSize });
          //上衣
          let topSize = this.topsSize[1].findIndex(item => item == res.topSize);
          this.selectData.topSize = this.topsSize[1][topSize];
          this.selectTops({ arr: this.topsSize[1], startValue: topSize });
          //裤装
          let pantsSize = this.pantsSize[1].findIndex(item => item == res.pantsSize);
          this.selectData.pantsSize = this.pantsSize[1][pantsSize];
          this.selectPants({ arr: this.pantsSize[1], startValue: pantsSize });
        } else {
          let height = this.heightList[2].findIndex(item => item == res.height);
          this.selectData.height = this.heightList[2][height];
          console.log(this.selectData.height)
          this.selectHeight({ arr: this.heightList[2], startValue: height });
          if (res.role == '男') {
            let shoeSize = this.shoeSizeList[2].findIndex(item => item == res.shoeSize);
            this.selectData.shoeSize = this.shoeSizeList[2][shoeSize];
            this.selectShoe({ arr: this.shoeSizeList[2], startValue: shoeSize });
            //上衣
            let topSize = this.topsSize[2].findIndex(item => item == res.topSize);
            this.selectData.topSize = this.topsSize[2][topSize];
            this.selectTops({ arr: this.topsSize[2], startValue: topSize });
            //裤装
            let pantsSize = this.pantsSize[2].findIndex(item => item == res.pantsSize);
            this.selectData.pantsSize = this.pantsSize[2][pantsSize];
            this.selectPants({ arr: this.pantsSize[2], startValue: pantsSize });
          } else {
            let shoeSize = this.shoeSizeList[3].findIndex(item => item == res.shoeSize);
            this.selectData.shoeSize = this.shoeSizeList[3][shoeSize];
            this.selectShoe({ arr: this.shoeSizeList[3], startValue: shoeSize });
            //上衣
            let topSize = this.topsSize[3].findIndex(item => item == res.topSize);
            this.selectData.topSize = this.topsSize[3][topSize];
            this.selectTops({ arr: this.topsSize[3], startValue: topSize });
            //裤装
            let pantsSize = this.pantsSize[3].findIndex(item => item == res.pantsSize);
            this.selectData.pantsSize = this.pantsSize[3][pantsSize];
            this.selectPants({ arr: this.pantsSize[3], startValue: pantsSize });
          }
          const timer = setTimeout(() => { this.watch = true; }, 60)
        }
        // 体重
        if (res.age <= 7) {
          let weight = this.weightList[0].findIndex(item => item == res.weight);
          this.selectData.weight = this.weightList[0][weight];
          this.selectWeight({ arr: this.weightList[0], startValue: weight })
        } else {
          let weight = this.weightList[1].findIndex(item => item == res.weight);
          this.selectData.weight = this.weightList[1][weight];
          this.selectWeight({ arr: this.weightList[1], startValue: weight })
        }
        let maritalStatus = this.marriageArr.findIndex(item => item == res.maritalStatus);
        this.marriageIndex = maritalStatus;
        // 职业
        let profession = this.professionArr.findIndex(item => item == res.profession);
        this.selectData.profession = this.professionArr[profession];
        this.selectProfession({ arr: this.professionArr, startValue: profession });
        // 学历
        let education = this.educationArr.findIndex(item => item == res.education);
        this.selectData.education = this.educationArr[education];
        this.selectEducation({ arr: this.educationArr, startValue: education });
        //  腰裤围
        let waistline = this.waistSize.findIndex(item => item == res.waistline);
        this.selectData.waistline = this.waistSize[waistline];
        this.selectWaistSize({ arr: this.waistSize, startValue: waistline });
        if (!!res.frontSide) {
          this.selectData.frontSide = res.frontSide;
        }
        if (!!res.sideFace) {
          this.selectData.sideFace = res.sideFace;
        }
        if (!!res.reverseSide) {
          this.selectData.reverseSide = res.reverseSide;
        }
        if (!!res.remark) {
          this.selectData.remark = res.remark;
        }
      } else {
        this.selectAge({ arr: this.ageData, startValue: 34 });
        if (this.ageSelect <= 3) {
          //身高
          this.selectData.height = this.heightList[0][30];
          this.selectHeight({ arr: this.heightList[0], startValue: 30 });
          //鞋码
          this.selectData.shoeSize = this.shoeSizeList[0][2];
          this.selectShoe({ arr: this.shoeSizeList[0], startValue: 2 });
          //上衣
          this.selectData.topSize = this.topsSize[0][8];
          this.selectTops({ arr: this.topsSize[0], startValue: 8 });
          //裤装
          this.selectData.pantsSize = this.pantsSize[0][9];
          this.selectPants({ arr: this.pantsSize[0], startValue: 9 });
        } else if (this.ageSelect <= 10) {
          this.selectData.height = this.heightList[1][40];
          this.selectHeight({ arr: this.heightList[1], startValue: 40 });
          this.selectData.shoeSize = this.shoeSizeList[1][6];
          this.selectShoe({ arr: this.shoeSizeList[1], startValue: 6 });
          //上衣
          this.selectData.topSize = this.topsSize[1][4];
          this.selectTops({ arr: this.topsSize[1], startValue: 4 });
          //裤装
          this.selectData.pantsSize = this.pantsSize[1][4];
          this.selectPants({ arr: this.pantsSize[1], startValue: 4 });
        } else {
          this.selectData.height = this.heightList[2][20];
          this.selectHeight({ arr: this.heightList[2], startValue: 20 });
          if (this.selectData.sex == '男') {
            this.selectData.shoeSize = this.shoeSizeList[2][8];
            this.selectShoe({ arr: this.shoeSizeList[2], startValue: 8 });
            //上衣
            this.selectData.topSize = this.topsSize[2][4];
            this.selectTops({ arr: this.topsSize[2], startValue: 4 });
            //裤装
            this.selectData.pantsSize = this.pantsSize[2][4];
            this.selectPants({ arr: this.pantsSize[2], startValue: 4 });
          } else {
            this.selectData.shoeSize = this.shoeSizeList[3][4];
            this.selectShoe({ arr: this.shoeSizeList[3], startValue: 4 });
            //上衣
            this.selectData.topSize = this.topsSize[3][2];
            this.selectTops({ arr: this.topsSize[3], startValue: 2 });
            //裤装
            this.selectData.pantsSize = this.pantsSize[3][2];
            this.selectPants({ arr: this.pantsSize[3], startValue: 2 });
          }
        }
        // 体重
        if (this.ageSelect <= 7) {
          this.selectData.weight = this.weightList[0][22];
          this.selectWeight({ arr: this.weightList[0], startValue: 22 })
        } else {
          this.selectData.weight = this.weightList[1][0];
          this.selectWeight({ arr: this.weightList[1] })
        }
        // 职业
        this.selectProfession({ arr: this.professionArr, startValue: 5 });
        // 学历
        this.selectEducation({ arr: this.educationArr, startValue: 2 });
        //  腰裤围
        this.selectWaistSize({ arr: this.waistSize, startValue: 5 })
      }
      this.$nextTick(() => {
        this.initSwiper();
      })
    },
    titleClick () {
      this.titleIndex += 1;
      this.mySwiper1.slideTo(this.titleIndex);
    },
    // 生成数据
    createData (len, min, sum, prop = '') {
      var arr = [];
      for (var i = 0; i < len; i++) {
        min = add(min, sum);
        arr.push(min + prop)
      }
      return arr
    },
    // 选择身份
    selectId (idx) {
      this.idSelectIndex = idx;
    },
    //选择性别
    selectGender (idx) {
      this.genderIndex = idx;
    },
    // 选择婚姻状态
    selectMarriage (idx) {
      this.marriageIndex = idx;
    },
    // 选择年龄
    selectAge (options) {
      let that = this;
      ruler.initPlugin({
        el: "age-ruler", //容器id
        height: 68, //刻度尺高度
        maxScale: options.arr.length, //最大刻度
        startValue: options.startValue || 0, //刻度开始的初始值
        textArray: options.arr,
        region: [0, options.arr.length], //选择刻度的区间范围
        background: "#F5F5F5", //刻度尺背景色
        color: "#979797", //刻度线和字体的颜色
        markColor: "#F5A243", //中心刻度标记颜色
        isConstant: true, //是否不断地获取值
        success: function (res) {
          that.ageSelect = res + 1;
        }
      });
    },
    //选择身高
    selectHeight (options) {
      let that = this;
      ruler.initPlugin({
        el: "height-ruler", //容器id
        height: 68, //刻度尺高度
        maxScale: options.arr.length, //最大刻度
        startValue: options.startValue || 0, //刻度开始的初始值
        textArray: options.arr,
        region: [0, options.arr.length], //选择刻度的区间范围
        background: "#F5F5F5", //刻度尺背景色
        color: "#979797", //刻度线和字体的颜色
        markColor: "#F5A243", //中心刻度标记颜色
        isConstant: true, //是否不断地获取值
        success: function (res) {
          if (that.ageSelect <= 3) {
            that.selectData.height = that.heightList[0][res];
          } else if (that.ageSelect <= 10) {
            that.selectData.height = that.heightList[1][res];
          } else {
            that.selectData.height = that.heightList[2][res];
          }
        }
      });
    },
    // 选择体重
    selectWeight (options) {
      let that = this;
      ruler.initPlugin({
        el: "weight-ruler", //容器id
        height: 68, //刻度尺高度
        maxScale: options.arr.length, //最大刻度
        startValue: options.startValue || 0, //刻度开始的初始值
        textArray: options.arr,
        region: [0, options.arr.length], //选择刻度的区间范围
        background: "#F5F5F5", //刻度尺背景色
        color: "#979797", //刻度线和字体的颜色
        markColor: "#F5A243", //中心刻度标记颜色
        isConstant: true, //是否不断地获取值
        success: function (res) {
          if (that.ageSelect <= 7) {
            that.selectData.weight = that.weightList[0][res];
          } else {
            that.selectData.weight = that.weightList[1][res];
          }
        }
      });
    },
    // 选择鞋码
    selectShoe (options) {
      let that = this;
      ruler.initPlugin({
        el: "shoe-ruler", //容器id
        height: 68, //刻度尺高度
        maxScale: options.arr.length, //最大刻度
        startValue: options.startValue || 0, //刻度开始的初始值
        textArray: options.arr,
        region: [0, options.arr.length], //选择刻度的区间范围
        background: "#F5F5F5", //刻度尺背景色
        color: "#979797", //刻度线和字体的颜色
        markColor: "#F5A243", //中心刻度标记颜色
        isConstant: true, //是否不断地获取值
        success: function (res) {
          if (that.ageSelect <= 3) {
            that.selectData.shoeSize = that.shoeSizeList[0][res];
          } else if (that.ageSelect <= 10) {
            that.selectData.shoeSize = that.shoeSizeList[1][res];
          } else {
            if (that.selectData.sex == '男') {
              that.selectData.shoeSize = that.shoeSizeList[2][res];
            } else {
              that.selectData.shoeSize = that.shoeSizeList[3][res];
            }
          }
        }
      });
    },
    // 选择职业
    selectProfession (options) {
      let that = this;
      ruler.initPlugin({
        el: "profession-ruler", //容器id
        height: 68, //刻度尺高度
        maxScale: options.arr.length, //最大刻度
        startValue: options.startValue || 0, //刻度开始的初始值
        textArray: options.arr,
        region: [0, options.arr.length], //选择刻度的区间范围
        background: "#F5F5F5", //刻度尺背景色
        color: "#979797", //刻度线和字体的颜色
        markColor: "#F5A243", //中心刻度标记颜色
        isConstant: true, //是否不断地获取值
        success: function (res) {
          that.selectData.profession = that.professionArr[res];
        }
      });
    },
    // 选择学历
    selectEducation (options) {
      let that = this;
      ruler.initPlugin({
        el: "education-ruler", //容器id
        height: 68, //刻度尺高度
        maxScale: options.arr.length, //最大刻度
        startValue: options.startValue || 0, //刻度开始的初始值
        textArray: options.arr,
        region: [0, options.arr.length], //选择刻度的区间范围
        background: "#F5F5F5", //刻度尺背景色
        color: "#979797", //刻度线和字体的颜色
        markColor: "#F5A243", //中心刻度标记颜色
        isConstant: true, //是否不断地获取值
        success: function (res) {
          that.selectData.education = that.educationArr[res];
        }
      });
    },
    // 腰裤围
    selectWaistSize (options) {
      let that = this;
      ruler.initPlugin({
        el: "waist-ruler", //容器id
        height: 68, //刻度尺高度
        maxScale: options.arr.length, //最大刻度
        startValue: options.startValue || 0, //刻度开始的初始值
        textArray: options.arr,
        region: [0, options.arr.length], //选择刻度的区间范围
        background: "#F5F5F5", //刻度尺背景色
        color: "#979797", //刻度线和字体的颜色
        markColor: "#F5A243", //中心刻度标记颜色
        isConstant: true, //是否不断地获取值
        success: function (res) {
          that.selectData.waistline = that.waistSize[res];
        }
      });
    },
    // 上衣尺码
    selectTops (options) {
      let that = this;
      ruler.initPlugin({
        el: "tops-ruler", //容器id
        height: 68, //刻度尺高度
        maxScale: options.arr.length, //最大刻度
        startValue: options.startValue || 0, //刻度开始的初始值
        textArray: options.arr,
        region: [0, options.arr.length], //选择刻度的区间范围
        background: "#F5F5F5", //刻度尺背景色
        color: "#979797", //刻度线和字体的颜色
        markColor: "#F5A243", //中心刻度标记颜色
        isConstant: true, //是否不断地获取值
        success: function (res) {
          if (that.ageSelect <= 3) {
            that.selectData.topSize = that.topsSize[0][res];
          } else if (that.ageSelect <= 10) {
            that.selectData.topSize = that.topsSize[1][res];
          } else {
            if (that.selectData.sex == '男') {
              that.selectData.topSize = that.topsSize[2][res];
            } else {
              that.selectData.topSize = that.topsSize[3][res];
            }
          }
        }
      });
    },
    // 裤装尺码
    selectPants (options) {
      let that = this;
      ruler.initPlugin({
        el: "pants-ruler", //容器id
        height: 68, //刻度尺高度
        maxScale: options.arr.length, //最大刻度
        startValue: options.startValue || 0, //刻度开始的初始值
        textArray: options.arr,
        region: [0, options.arr.length], //选择刻度的区间范围
        background: "#F5F5F5", //刻度尺背景色
        color: "#979797", //刻度线和字体的颜色
        markColor: "#F5A243", //中心刻度标记颜色
        isConstant: true, //是否不断地获取值
        success: function (res) {
          if (that.ageSelect <= 3) {
            that.selectData.pantsSize = that.pantsSize[0][res];
          } else if (that.ageSelect <= 10) {
            that.selectData.pantsSize = that.pantsSize[1][res];
          } else {
            if (that.selectData.sex == '男') {
              that.selectData.pantsSize = that.pantsSize[2][res];
            } else {
              that.selectData.pantsSize = that.pantsSize[3][res];
            }
          }
        }
      });
    },
    beforeRead (file) {
      if (!/(jpg|JPG|jpeg|JPEG|png|PNG)$/.test(file.type)) {
        this.$toast('不符合的图片格式!')
        return false
      }
      return true
    },
    afterRead (file, type) {
      uploadOne(file.file, 'arriveHome/figure', (url) => {
        this.selectData[type] = url;
      })
    },
    save () {
      this.selectData.age = this.ageSelect;
      if (!this.edit) {
        //新增
        this.newData(this.selectData)
      } else {
        //编辑
        this.editData(this.selectData)
      }
    },
    newData (obj) {
      this.$api.reachHome.saveIdentityBaseInfo(obj)
        .then(res => {
          // 获取默认信息
          this.$toast('创建身份卡成功!');
          this.goList();
        })
    },
    async getEditData () {
      const res = await this.$api.reachHome.getIdentityCardDetail({
        id: getUrlParameter('id') || this.$route.query.id,
        userId: this.userId
      })
      document.title = '编辑身份卡';
      this.edit = true;
      this.initdata(res);
    },
    editData (obj) {
      obj.id = getUrlParameter('id') || this.$route.query.id;
      this.$api.reachHome.editIdentityCardDetail(obj)
        .then(res => {
          // 获取默认信息
          this.$toast('编辑身份卡成功!');
          this.goList();
        })
    },
    deleteData () {
      const id = getUrlParameter('id') || this.$route.query.id;
      this.$api.reachHome.removeIdentityCard({ id })
        .then(res => {
          // 获取默认信息
          this.$toast('删除身份卡成功!');
          this.goList();
        })
    },
    goList () {
      window.hpcapi.backAction(true);
      this.$router.push({ path: '/idList' });
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
.van-progress {
  height: 16px;
  margin: 0 30px;
  background: #fee002;
}
.go-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 70px;
  width: 84px;
  left: 50%;
  transform: translateX(-50%);
  height: 200px;
  z-index: 99;
  .jiantou {
    width: 36px;
    height: auto;
    animation: bottom 0.5s linear infinite alternate;
  }
  @keyframes bottom {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(60px);
    }
  }
  .bottom {
    width: 84px;
    height: 84px;
    box-shadow: 0px 0px 4px 0px rgba(254, 179, 2, 0.66);
    border: 0.0226rem solid rgba(254, 224, 2, 1);
    border-radius: 50%;
    img {
      width: 17px;
      height: auto;
    }
  }
  .bottom:active {
    border: 0.0226rem solid #feb302;
  }
}
.id-info {
  padding-top: 28px;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .pagination {
    height: 32px;
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    color: rgba(122, 122, 132, 1);
    line-height: 32px;
    margin-top: 10px;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .slide1,
  .slide2,
  .slide3 {
    .title {
      padding-left: 20px;
      height: 48px;
      font-size: 34px;
      color: rgba(51, 51, 51, 1);
      display: flex;
      align-items: center;
      position: relative;
    }
    .title::before {
      position: absolute;
      width: 8px;
      height: 24px;
      content: " ";
      pointer-events: none;
      left: 0;
      top: 50%;
      background: #ffe631;
      transform: translateY(-50%);
    }
  }
  .ruler {
    position: relative;
    width: 690px;
    span {
      position: absolute;
      top: -68px;
      left: 50%;
      transform: translateX(-50%);
      height: 42px;
      display: block;
      line-height: 42px;
      font-size: 30px;
      font-weight: 600;
      color: rgba(245, 162, 67, 1);
    }
  }
  .ruler::before {
    width: 0;
    height: 0;
    content: " ";
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-top: 12px solid #f5a243;
  }
  // 共4个模块 第一页
  .slide1 {
    padding: 65px 30px 200px 30px;
    .icon-list {
      margin-top: 40px;
      .icon-item {
        width: 110px;
        margin-right: 83px;
        dt {
          width: 110px;
          height: 110px;
          position: relative;
          .icon {
            width: 110px;
            height: 110px;
          }
          .duihao {
            width: 30px;
            height: 30px;
            position: absolute;
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        dd {
          text-align: center;
          margin-top: 25px;
          height: 45px;
          font-size: 32px;
          color: rgba(51, 51, 51, 1);
          line-height: 45px;
        }
      }
      .icon-item:last-child {
        margin-right: 0;
      }
    }
    .id-select {
      margin-top: 40px;
      margin-bottom: 108px;
    }
  }
  // 第二页
  .slide2 {
    padding: 65px 30px 200px 30px;
    .body {
      margin-top: 40px;
      .head {
        height: 68px;
        padding-top: 25px;
        .text {
          display: block;
          height: 22px;
          font-size: 16px;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
        }
      }
    }
    .height-select {
      margin-top: 100px;
    }
  }
  // 第三页
  .slide3 {
    padding: 65px 30px 200px 30px;
    .body {
      margin-top: 40px;
      .head {
        height: 68px;
        padding-top: 25px;
        .text {
          display: block;
          height: 22px;
          font-size: 16px;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
        }
      }
    }
    .shoe-select {
      margin-top: 100px;
    }
  }
  // 第四页
  .slide4 {
    .top {
      margin-top: 57px;
      height: 28px;
      font-size: 20px;
      color: rgba(153, 153, 153, 1);
      line-height: 28px;
      margin-bottom: 30px;
      margin-left: 30px;
    }
    .main {
      width: 690px;
      margin-left: 30px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.16);
      border-radius: 10px;
      padding: 39px 0 59px 0;
      .status-list {
        .status-item {
          position: relative;
          max-height: 84px;
          transition: all 0.3s ease;
          overflow: hidden;
          .head {
            padding: 0 20px 0 30px;
            height: 84px;
            .left {
              height: 100%;
              .icon {
                width: 40px;
                margin-right: 20px;
              }
              img {
                max-height: 51px;
                max-width: 40px;
              }
              span {
                font-size: 32px;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
              }
            }
            .right {
              height: 100%;
              img {
                width: 30px;
                height: 30px;
                transition: all 0.2s ease;
              }
              img.active {
                transform: rotate(180deg);
              }
            }
          }
          .body {
            padding-bottom: 40px;
            .top {
              margin-top: 58px;
              margin-bottom: 20px;
              height: 22px;
              font-size: 16px;
              color: rgba(51, 51, 51, 1);
              line-height: 22px;
            }
          }
          .hunyin {
            margin-left: 30px;
            padding-top: 0;
            margin-top: 16px;
            .marriage-list {
              .marriage-item {
                width: 157px;
                height: 50px;
                background: rgba(255, 255, 255, 1);
                border-radius: 36px;
                border: 0.0226rem solid rgba(153, 153, 153, 1);
                margin-right: 21px;
              }
              .marriage-item.active {
                background: rgba(254, 224, 2, 1);
                border: none;
              }
            }
          }
          .tupian {
            .desc {
              margin-top: 19px;
              margin-bottom: 55px;
              height: 40px;
              font-size: 28px;
              font-weight: 400;
              color: rgba(118, 118, 118, 1);
              line-height: 40px;
            }
            .wish-photo-wrap {
              .item {
                width: 212px;
                height: 212px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                z-index: 1;
                box-sizing: border-box;
                margin-right: 27px;
                margin-bottom: 50px;
                .van-uploader {
                  width: 212px;
                  height: 212px;
                  position: absolute;
                  right: 0;
                  top: 0;
                  z-index: 7;
                  opacity: 0;
                }
                .item-text {
                  color: #767676;
                  font-size: 0.37rem;
                  position: absolute;
                  left: 50%;
                  bottom: -0.6rem;
                  transform: translateX(-50%);
                }
                .set-img img {
                  width: 213px;
                  height: 213px;
                  object-fit: cover;
                }
                .item-ipt {
                  width: 212px;
                  height: 212px;
                  position: absolute;
                  right: 0;
                  top: 0;
                  z-index: 7;
                  opacity: 0;
                }
                .jiahao {
                  width: 54px;
                  height: 54px;
                  img {
                    display: block;
                    width: 100%;
                  }
                }
                .close {
                  width: 1rem;
                  height: 1rem;
                  position: absolute;
                  right: -0.2rem;
                  top: -0.2rem;
                  z-index: 99;
                  img {
                    width: 30px;
                    height: 30px;
                    float: right;
                  }
                }
              }
              .item:nth-child(1) {
                background: url("../../../images/reachHome/zheng.png") no-repeat
                  center center;
                background-size: 100% 100%;
              }
              .item:nth-child(2) {
                background: url("../../../images/reachHome/bei.png") no-repeat
                  center center;
                background-size: 100% 100%;
              }
              .item:nth-child(3) {
                background: url("../../../images/reachHome/ce.png") no-repeat
                  center center;
                background-size: 100% 100%;
                margin-right: 0;
              }
            }
          }
          .beizhu {
            .remark {
              width: 690px;
              height: 248px;
              border-radius: 8px;
              background-color: rgba(241, 240, 240, 1);
              border: none;
              outline-style: none;
              color: #333;
              padding: 16px 26px;
              font-size: 28px;
              box-sizing: border-box;
            }
            .remark::-webkit-input-placeholder {
              /* WebKit browsers */
              color: #8f8f8f;
            }
          }
        }

        .status-item.active {
          max-height: 9rem;
        }
        .status-item.active.no-overflow {
          overflow: visible;
        }
        .status-item::after {
          position: absolute;
          box-sizing: border-box;
          content: " ";
          pointer-events: none;
          bottom: 0;
          left: 50%;
          width: 640px;
          border-bottom: 1px solid #e5e5e5;
          transform: scaleY(0.5) translateX(-50%);
        }
      }
    }
    .footer {
      width: 690px;
      height: 122px;
      margin-bottom: 101px;
      margin-top: 40px;
      margin-left: 30px;
      .footer-item {
        width: 338px;
        height: 122px;
        background: rgba(254, 224, 2, 1);
        border-radius: 61px;
        font-size: initial;
        span {
          font-weight: 600;
          font-size: 36px;
        }
      }
    }
    .footer-new {
      width: 690px;
      height: 122px;
      margin-bottom: 101px;
      margin-top: 40px;
      margin-left: 30px;
      background: rgba(254, 224, 2, 1);
      border-radius: 61px;
      font-size: initial;
      span {
        font-weight: 600;
        font-size: 36px;
      }
    }
  }
}

.swiper-slide {
  // background: #fff;
}
#swiper-container2 .swiper-slide {
  font-size: 18px;
  height: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  background: #fff;
  overflow: scroll; //该属性随着手指离开立即停止
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  transform: translate3d(0, 0, 0); //开启硬件加速
}
.swiper-scrollbar {
  opacity: 0;
}
</style>
