<template>
  <q-page padding>
    <h2>{{ artigo?.title?.rendered }}</h2>
    <div class="row" v-if="artigo">
      <div class="col" v-html="artigo?.content?.rendered"></div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { usePostsStore } from 'src/stores/posts'
import { useRoute } from 'vue-router'

const store = usePostsStore()
const route = useRoute()
const id = route.params.id

const artigo = ref([]);

onMounted(() => {
  const $q = useQuasar()

  $q.loading.show()

  store.setDetalhes(id).then(() => {
    artigo.value = store.detalhes;
    $q.loading.hide()
  }).catch(error => {
    $q.loading.hide()
    console.error('Error ao carregar detalhes do artigo:', error);
  });
});
</script>
