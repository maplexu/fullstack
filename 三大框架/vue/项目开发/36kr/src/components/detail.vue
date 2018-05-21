<template lang="html">
  <div class="">
    <Header />
    <div class="pagewrap pagewrap-full">
      <div class="article-detail">
        <div class="post-wrapper">
          <div class="post-detail-con-box full-reading mainlib_flex_wrapper">
            <ArticleMain :data="article_data"/>
            <ArticleRight :data="article_data"/>
          </div>
        </div>
      </div>
      <ArticleShare />
      <ArticleDetail />
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from './inc/header';
import Footer from './inc/footer';
import ArticleMain from './article_main';
import ArticleRight from './article_right';
import ArticleShare from './article_share';
import ArticleDetail from './article_detail';
import '../assets/test.css';

export default {
  mounted() {
    let id = this.$route.params.id;
    console.log(id);
    this.$store.dispatch('loadArticle', id);
  },
  computed: {
    article_data(){
      return this.$store.state.article_data;
    }
  },
  components: {
    Header, Footer, ArticleMain, ArticleRight, ArticleShare, ArticleDetail
  }
}
</script>

<style lang="css">
</style>
