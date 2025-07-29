const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Dashboard.vue') },
      { path: 'dashboard', name: 'Dashboard', component: () => import('src/pages/Dashboard.vue') },
      { path: 'posts', component: () => import('src/pages/Posts.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
