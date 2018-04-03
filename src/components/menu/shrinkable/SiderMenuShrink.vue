<template>
  <div>
    <template v-for="(item, index) in menuList">
      <div style="text-align: center" :key="index">
        <Dropdown transfer v-if="item.childSysMenu.length !== 0" placement="right-start" :key="index" @on-click="changeMenu">
          <Button :class="btnStyle" type="text">
            <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
          </Button>
          <DropdownMenu style="width: 200px;" slot="list">
            <template v-for="(child, i) in item.childSysMenu">
              <DropdownItem :name="child.routeName" :key="i"><Icon :type="child.icon"></Icon><span style="padding-left:10px;">{{ child.menuName }}</span></DropdownItem>
            </template>
          </DropdownMenu>
        </Dropdown>
        <Dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
          <Button :class="btnStyle" @click="changeMenu(item.routeName)" type="text">
            <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
          </Button>
          <DropdownMenu style="width: 200px;" slot="list">
            <DropdownItem :name="item.routeName" :key="'d' + index"><Icon :type="item.icon"></Icon><span style="padding-left:10px;">{{ item.menuName }}</span></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'SiderMenuShrink',
    data () {
      return {
        btnStyle: 'btn_style'
      }
    },
    props: {
      menuList: {
        type: Array
      },
      iconColor: {
        type: String,
        default: 'white'
      },
      menuTheme: {
        type: String,
        default: 'darck'
      }
    },
    methods: {
      changeMenu (active) {
        this.$emit('on-change', active)
      }
    }
  }
</script>

<style type="text/css" scoped>
  .btn_style {
    width: 60px;
    margin-left: -5px;
    padding:10px 0;
  }
</style>
