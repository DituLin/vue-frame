<template>
  <div class="layout">
    <Layout :style="{height: '100%'}">
      <Sider breakpoint="md" ref="menuSider" hideTrigger collapsible :collapsed-width="60" v-model="shrink">
        <shrink-sider-menu
          :shrink="shrink"
          @on-change="handleSubmenuChange"
          :before-push="beforePush"
          :open-names="openMenuList"
          :menu-list="menuList">
          <div slot="top" class="logo-con">
            <img src="../../static/img/logo.png"/>
          </div>
        </shrink-sider-menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Row>
            <i-col :xs="1" :sm="1" :lg="1">
              <Button @click.native="collapsedSider" type="text">
                <Icon :class="rotateIcon" type="navicon" size="32"></Icon>
              </Button>
            </i-col>
            <Col :xs="2" :sm="1" :lg="0"></Col>
            <i-col :xs="4" :sm="13" :lg="13">
              <bread-crumb-nav :currentPath="curPath"></bread-crumb-nav>
            </i-col>
            <i-col :xs="17" :sm="9" :lg="10">
              <Row type="flex" justify="end" align="middle">
                <i-col :xs="3" :sm="3" :lg="{span: 2, push: 1}"><full-screen v-model="ifFullScreen" @on-change="fullscreenChange"></full-screen></i-col>
                <i-col :xs="3" :sm="3" :lg="{span: 2, push: 1}"><lock-screen></lock-screen></i-col>
                <i-col :xs="3" :sm="3" :lg="{span: 2, push: 1}"><message-tip v-model="msgCount"></message-tip></i-col>
                <i-col :xs="3" :sm="3" :lg="{span: 2, push: 1}"><theme-switch></theme-switch></i-col>
                <i-col :xs="7" :sm="8" :lg="{span: 5, push: 1}"><user-center></user-center></i-col>
                <i-col :xs="1" :sm="2" :lg="2"/>
              </Row>
            </i-col>
          </Row>
        </Header>
        <Content :style="{background: '#f8f8f8', minHeight: '260px',height: '100%'}">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  import ShrinkSiderMenu from '../components/menu/ShrinkSiderMenu'
  import BreadCrumbNav from '../components/breadcrumb/BreadCrumbNav'
  import FullScreen from '../components/usercenter/FullScreen'
  import LockScreen from '../components/usercenter/LockScreen'
  import MessageTip from '../components/usercenter/MessageTip'
  import ThemeSwitch from '../components/usercenter/ThemeSwitch'
  import UserCenter from '../components/usercenter/UserCenter'

  import { mapActions, mapGetters } from 'vuex'
  import ICol from 'iview/src/components/grid/col'

  export default {
    name: 'DashView',
    components: {
      ICol,
      ShrinkSiderMenu,
      BreadCrumbNav,
      FullScreen,
      LockScreen,
      MessageTip,
      ThemeSwitch,
      UserCenter
    },
    data () {
      return {
        shrink: false,
        ifFullScreen: false,
        sideMenuStyle: 'sider_menu',
        toggleSider: this.shrink ? 'toggle_sider_s' : 'toggle_sider_w',
        winWidth: document.body.clientWidth,
        resize: false
      }
    },
    computed: {
      ...mapGetters([
        'user',
        'menuList',
        'currentPath',
        'openMenuList',
        'msgCount'
      ]),
      rotateIcon () {
        return [
          'menu-icon',
          this.shrink ? 'rotate-icon' : ''
        ]
      },
      curPath: {
        get () {
          if (this.winWidth < 510) {
            return []
          } else if (this.winWidth < 768) {
            return [this.currentPath[this.currentPath.length - 1]]
          } else {
            return this.currentPath
          }
        },
        set () {}
      }
    },
    methods: {
      ...mapActions([
        'addOpenMenuList',
        'setCurrentPath'
      ]),
      collapsedSider () {
        this.$refs.menuSider.toggleCollapse()
      },
      handleSubmenuChange (name) {
        console.log(this.$router.currentRoute)
      },
      beforePush (name) {
        this.addOpenMenuList(name)
        return true
      },
      fullscreenChange (isFullScreen) {
        console.log('全屏标识:' + isFullScreen)
      }
    },
    mounted () {
      const self = this
      window.onresize = () => {
        if (!self.resize) {
          self.resize = true
          setTimeout(function () {
            self.resize = false
            self.winWidth = document.body.clientWidth
          }, 400)
        }
      }
    },
    watch: {
      winWidth (val) {
        this.winWidth = val
      }
    }
  }
</script>

<style type="text/css" scoped>
  .layout {
    width: 100%;
    height: 100%;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    height: 60px;
    line-height: 60px;
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .menu-icon{
    transition: all .3s;
    cursor: pointer;
  }
  .rotate-icon{
    transform: rotate(-90deg);
    cursor: pointer;
  }
  .user-opt-btn-con {
    display: inline-block;
    text-align: center;
    cursor: pointer;
  }
  .logo-con {
    text-align: center;
    background: #363e4e;
  }
  .logo-con img {
    width: 40px;
    height: 40px;
    margin: 10px 0px 5px 0px;
  }
</style>
