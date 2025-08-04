<template>
  <q-page class="container q-pa-lg">
    <!-- content -->
    <h1>Posts</h1>

    <section class="cards-posts q-gutter-lg" v-if="posts.length">
      <div class="shadow-5" v-for="(post, ind) in posts" :key="ind">
        <q-card class="card-fill-height column">
          <img :src="post.jetpack_featured_media_url" class="image-post" />

          <q-card-section>
            <div class="text-h6">{{ post.title.rendered }}</div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pt-none q-pb-none q-mb-auto post-excerpt full-width">
            <div class="text-subtitle1 post-subtext" v-html="post.excerpt.rendered"></div>
          </q-card-section>

          <q-card-actions>
            <q-btn push color="dark" class="full-width" @click="detalhar(post.id)">Detalhes</q-btn>
          </q-card-actions>
        </q-card>

      </div>
    </section>

  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { usePostsStore } from 'src/stores/posts'
import { useRouter } from 'vue-router'
const store = usePostsStore()
const posts = ref([]);
const router = useRouter();
onMounted(() => {
  const $q = useQuasar()

  $q.loading.show()

  store.setPosts().then(() => {
    posts.value = store.posts;
    $q.loading.hide()
  }).catch(error => {
    $q.loading.hide()
    console.error('Error fetching posts from store:', error);
  });
});

const detalhar = (id) => {
  router.push({ path: '/artigo/' + id });
}

</script>

<style scoped>
.width-custom {
  width: 30.5%;
}

.image-post {
  aspect-ratio: 6 / 4;
  object-fit: cover;
}

.card-fill-height {
  height: 100%;
}

.post-excerpt {
  flex-grow: 1;
  overflow: hidden;
}

.post-subtext :nth-child(n) {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cards-posts {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

@media (max-width: 1024px) {
  .width-custom {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .cards-posts {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>