<template>
  <Menu ref="sideMenu" :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu" accordion>
    <template v-for="item in menuList">
      <MenuItem v-if="item.childSysMenu.length < 1" :name="item.routeName" :key="item.url">
        <Icon :type="item.icon" :size="iconSize"></Icon>
        <span class="layout-text">{{ item.menuName }}</span>
      </MenuItem>

      <Submenu v-if="item.childSysMenu.length >= 1" :name="item.routeName" :key="item.url">
        <template slot="title">
          <Icon :type="item.icon" :size="iconSize"></Icon>
          <span class="layout-text">{{ item.menuName }}</span>
        </template>
        <template v-for="child in item.childSysMenu">
          <MenuItem :name="child.routeName" :key="child.url">
            <Icon :type="child.icon" :size="iconSize"></Icon>
            <span class="layout-text">{{ child.menuName }}</span>
          </MenuItem>
        </template>
      </Submenu>
    </template>
  </Menu>
</template>

<script>
  export default {
    name: 'SiderMenu',
    props: {
      menuList: Array,
      iconSize: Number,
      menuTheme: {
        type: String,
        default: 'dark'
      },
      openNames: {
        type: Array
      }
    },
    methods: {
      changeMenu (active) {
        this.$emit('on-change', active)
      }
    },
    updated () {
      this.$nextTick(() => {
        if (this.$refs.sideMenu) {
          this.$refs.sideMenu.updateOpened()
        }
      })
    }
  }
</script>

<style type="text/css" scoped>
  .layout-text {
    display: inline-block;
    white-space: nowrap;
    position: absolute;
    overflow: hidden;
    transform: translateX(0px);
    transition: width .2s ease .2s;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    background: #2d8cf0!important;
    color: #fff;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover {
    background: #363e4e;
    color: #fff;
  }
</style>
