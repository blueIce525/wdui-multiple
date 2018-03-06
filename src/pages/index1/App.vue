<template>
  <div id="app">
    <wd-button type="default" @click.native="showToast1">弹层</wd-button>
    <p>test<a href="#"> w shi a</a></p>
     <wd-button type="default" @click.native="testproxy()">测试按钮</wd-button>
    <img src="./assets/logo.png">

    <img src="../../../static/tou.jpg" alt="">
    <div class="css-img"></div>
    <router-view></router-view>
  </div>
</template>

<script>

import axios from 'axios'
import utils from '../../util/util'

export default {
  name: "app",
  methods: {
    showToast1: function(){
      let toast1 = this.$Toast({
        content: 'Hello',
        autoClose: false
      })
      setTimeout(function(){
        toast1.close()
      }, 2000)
    },
    testproxy() {
      utils.sendRequest({
        url: utils.getApi('getdictbytype'),
        method: 'GET',
        data: {},
        callback: function(res) {
          console.log(res)
        }
      })
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
p{
  color: #f00;
  display: flex;
  font-size: 40px;/*px*/
  a {
    color: #00f;
  }
}
.css-img {
  width: 100px;
  height: 100px;
  background-image: url(../../../static/tou.jpg);
  background-repeat: no-repeat;
  background-size: cover;

}
</style>
