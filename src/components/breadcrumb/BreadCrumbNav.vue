<template>
  <Breadcrumb>
    <BreadcrumbItem
      v-for="item in currentPath"
      :href="item.path"
      :key="item.name"
    ><Icon :type="item.icon"></Icon> {{ item.title }}</BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
  export default {
    name: 'BreadCrumbNav',
    props: {
      currentPath: Array
    }
  }
</script>
