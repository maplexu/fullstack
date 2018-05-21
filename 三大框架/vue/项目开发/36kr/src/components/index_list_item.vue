<template lang="html">
  <li>
    <div class="am-cf inner_li inner_li_abtest">
      <span class="undefined mark h5_mark">{{data.tag}}</span>
      <router-link :to="{name: 'detail', params: {id: data.id}}">
        <div class="img_box list-img-loaded">
          <div>
            <img alt="标题" class="load-img fade" :src="getImgUrl(data)">
          </div>
          <span class=" undefined mark pc_mark">{{data.tag}}</span>
        </div>
        <div class="intro">
          <h3>{{data.title}}</h3>
          <div class="abstract">{{data.summary}}</div>
        </div>
      </router-link>
      <div class="info">
        <div class="info-list info-list-abtest">
          <div class="user-info">
            <a :href="data.author.href" class="name">{{data.author.title}}</a>
            <span class="oblique_line">·</span>
          </div>
          <div class="time-div">
            <span class="time" title="时间">时间</span>
            <span class="time h5_time">时间</span>
          </div>
        </div>
        <div class="tags-list">
          <i class="icon-tag">
          </i>
          <span>
            <a href="/tags/jinrong">标签1</a>
            <span>，</span>
          </span>
          <span>
            <a href="/tags/touzi">标签2</a>
          </span>
        </div>
        <div class="comments-list">
          <span class="comments">
          </span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'IndexListItem',
  data(){
    return {
      data: this.$attrs.data
    }
  },
  methods: {
    //将获取图片的地址封装成一个函数，这样子以后要改图片地址的话就会很方便
    getImgUrl(data){
      return `http://localhost:8090/img?src=${data.src}`;
    }
  }
}
</script>

<style lang="css">
</style>
