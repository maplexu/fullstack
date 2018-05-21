<template>
  <div id="app">
    <p>111</p>
    <router-link to="/user">用户</router-link>
    <router-link to="/article">文章</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {

}
</style>
