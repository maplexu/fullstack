import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

function sleep(t){
  return new Promise((resolve, rject) => {
    setTimeout(function(){
      resolve();
    }, t);
  })
}

const store = new Vuex.Store({
  strict: true,
  state: {
    loading: false,
    article_list: [],
    cur_page: 0,
    load_more: false,
    article_data: null
  },
  mutations: {
    startLoading (state) {
      state.loading = true
    },
    endLoading (state) {
      state.loading = false
    },
    appendArticleList (state, arg) {
      state.article_list = state.article_list.concat(arg)
    },
    addPage (state) {
      state.cur_page++
    },
    startLoadingMore (state) {
      state.load_more = true
    },
    endLoadingMore (state) {
      state.load_more = false
    },
    setArticleData (state, arg) {
      state.article_data = arg
    }
  },
  actions: {
    async loadOneMorePage ({state, commit}, arg) {
      commit('startLoading');
      commit('startLoadingMore');
      //await sleep(2000);
      let data = await (await fetch(`http://localhost:8090/list?page=${state.cur_page}`)).json()
      commit('endLoading');
      commit('endLoadingMore');
      commit('appendArticleList', data);
      commit('addPage');
    },
    async loadArticle({commit}, arg){
      let data = await (await fetch(`http://localhost:8090/detail?id=${arg}`)).json();
      commit('setArticleData', data);
    }
  },
  getters: {
    list_data(state){
        if(state.cur_page == 0){
          store.dispatch('loadOneMorePage');
        }

        return state.article_list;
    }
  }
})

export default store
