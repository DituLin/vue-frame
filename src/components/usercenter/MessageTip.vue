<template>
  <div @click="showMessage" class="user-opt-btn-con message-tip">
    <Tooltip :content="value > 0 ? '有' + value + '条未读消息' : '无未读消息'" placement="bottom">
      <Badge :count="value" dot>
        <Icon type="ios-bell" :size="22"></Icon>
      </Badge>
    </Tooltip>
  </div>
</template>

<script>
  export default {
    name: 'MessageTip',
    props: {
      value: {
        type: Number,
        default: 0
      }
    },
    methods: {
      showMessage () {
        this.$router.push({
          name: 'usermessage'
        })
      }
    }
  }
</script>

<style type="text/css" scoped>
  .user-opt-btn-con .ivu-icon {
    vertical-align: middle;
  }
</style>
