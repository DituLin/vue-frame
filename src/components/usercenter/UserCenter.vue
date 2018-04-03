<template>
  <div class="user-dropdown-menu-con">
    <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
      <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
        <a href="javascript:void(0)">
          <span class="main-user-name">{{ user.name }}</span>
          <Avatar :src="user.head" style="background: #619fe7; margin-left: 10px;"></Avatar>
          <Icon type="arrow-down-b"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="ownspace">个人中心</DropdownItem>
          <DropdownItem name="logout" divided>退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Row>
  </div>

</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import {userLogout} from '../../service/userService'

  export default {
    name: 'UserCenter',
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      ...mapActions([
        'setLoading',
        'logout'
      ]),
      async handleClickUserDropdown (name) {
        if (name === 'ownspace') {
          this.$router.push('/ownspace')
        } else if (name === 'logout') {
          // 只发送退出请求就行
          await userLogout(this.user.account)
          this.setLoading(false)
          this.logout()
          this.$router.push('/login')
        }
      }
    }
  }
</script>

<style scoped>

</style>
