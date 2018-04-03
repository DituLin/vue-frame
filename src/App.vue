<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style type="text/css">
  html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
  }
  body {
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
    font-size: 12px;
    line-height: 1.5;
    color: #495060;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #app {
    width: 100%;
    height: 100%;
  }
  *, :after, :before {
    box-sizing: border-box;
  }
  * {
    -webkit-tap-highlight-color: transparent;
  }
  input {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  }
</style>
