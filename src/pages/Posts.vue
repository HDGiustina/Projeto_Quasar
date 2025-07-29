<template>
  <q-page class="container q-pa-lg">
    <!-- content -->
    <h1>Posts</h1>

    <section class="row q-gutter-lg" v-if="posts.length">
      <div class="col-md-4 col-xs-12 width-custom shadow-5" v-for="(post, ind) in posts" :key="ind">
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
            <q-btn push color="dark" class="full-width">Detalhes</q-btn>
          </q-card-actions>
        </q-card>

      </div>
    </section>

  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

const posts = ref([]);

const getPosts = async () => {
  const $q = useQuasar()

  $q.loading.show()
  await api.get('v2/posts')
    .then(response => {
      console.log(response.data);
      if (response.data) {
        posts.value = response.data;
      } else {
        console.error('No posts found');
      }

      $q.loading.hide()
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
      $q.loading.hide()
    });
}

onMounted(() => {
  getPosts();
});

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

@media (max-width: 1024px) {
  .width-custom {
    width: 100%;
  }
}
</style>