import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'boot/axios'

export const usePostsStore = defineStore('posts', {
    state: () => ({
        posts: [],
    }),

    actions: {
        async setPosts() {
            try {
                this.posts = await api.get('v2/posts').then(response => {
                    if (response.data) {
                        return response.data;
                    } else {
                        return false;
                    }
                })
            } catch (error) {
                return error
            }
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePostsStore, import.meta.hot))
}
