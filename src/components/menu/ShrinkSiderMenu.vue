<template>
  <div>
    <slot name="top"></slot>
    <sider-menu
      v-show="!shrink"
      :menu-theme="theme"
      :menu-list="menuList"
      :open-names="openNames"
      @on-change="handleChange"
    ></sider-menu>
    <sider-menu-shrink
      v-show="shrink"
      :menu-theme="theme"
      :menu-list="menuList"
      :icon-color="shrinkIconColor"
      @on-change="handleChange"
    ></sider-menu-shrink>
  </div>
</template>

<script>
  import SiderMenu from './shrinkable/SiderMenu'
  import SiderMenuShrink from './shrinkable/SiderMenuShrink'

  export default {
    name: 'ShrinkSiderMenu',
    components: {
      SiderMenu,
      SiderMenuShrink
    },
    props: {
      shrink: {
        type: Boolean,
        default: false
      },
      menuList: {
        type: Array,
        required: true
      },
      theme: {
        type: String,
        default: 'dark'
      },
      beforePush: {
        type: Function
      },
      openNames: {
        type: Array
      }
    },
    computed: {
      bgColor () {
        return this.theme === 'dark' ? '#495060' : '#fff'
      },
      shrinkIconColor () {
        return this.theme === 'dark' ? '#fff' : '#495060'
      }
    },
    methods: {
      handleChange (name) {
        let willpush = true
        if (this.beforePush !== undefined) {
          if (!this.beforePush(name)) {
            willpush = false
          }
        }
        if (willpush) {
          this.$router.push({
            name: name
          })
        }
        this.$emit('on-change', name)
      }
    }
  }
</script>
