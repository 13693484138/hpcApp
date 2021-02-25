<template>
    <div class="head-nav" style=""><i class="van-icon van-icon-arrow-left title-icon"></i><div class="head-nav-title">{{navName}}</div></div>
</template>
<script>
export default {
    name:"headNav",
    props:{
        navName:String
    }, 
}
</script>
<style scoped lang="scss">
    .head-nav{
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    font-size: 16px;
       color: #ffffff;
    height: 165px;
    .title-icon{
        font-size: 22px;
        position: absolute;
        left: 16px;
    }
    .head-nav-title{
        font-size: 18px;
     
       
    }
    }
</style>