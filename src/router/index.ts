import {createRouter, createWebHistory} from 'vue-router'

import authMiddleware from "@/router/middlewares/authMiddleware";
import middlewarePipeline from "@/router/middlewarePipeline";
import type {MiddlewareParams} from "@/router/MidddlewareParams";

import DefaultLayout from "@/layouts/DefaultLayout.vue"
import LoginLayout from "@/layouts/LoginLayout.vue"

import FavouriteEntriesView from "@/views/FavouriteEntriesView.vue";
import BookmarkedEntriesView from "@/views/BookmarkedEntriesView.vue";
import FeedEntriesView from "@/views/FeedEntriesView.vue";
import AllEntriesView from '../views/AllEntriesView.vue'
import LoginView from "@/views/auth/LoginView.vue";
import AboutView from "@/views/AboutView.vue";
import SettingsView from "@/views/SettingsView.vue";
import InfoSettingsView from "@/views/settings/InfoSettingsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import SearchView from "@/views/SearchView.vue";
import LogoutView from "@/views/auth/LogoutView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: "/all",
        },
        {
            path: '/all',
            name: 'all',
            component: AllEntriesView,
            meta: {
                layout: DefaultLayout,
                middleware: [authMiddleware]
            }
        },
        {
            path: '/favourites',
            name: 'favourites',
            component: FavouriteEntriesView,
            meta: {
                layout: DefaultLayout,
                middleware: [authMiddleware]
            }
        },
        {
            path: '/bookmarks',
            name: 'bookmarks',
            component: BookmarkedEntriesView,
            meta: {
                layout: DefaultLayout,
                middleware: [authMiddleware]
            }
        },
        {
            path: '/feed/:feedId',
            name: 'feed',
            component: FeedEntriesView,
            meta: {
                layout: DefaultLayout,
                middleware: [authMiddleware]
            }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: {
                layout: LoginLayout
            }
        },
        {
            path: '/logout',
            name: 'logout',
            component: LogoutView,
            meta: {
                layout: LoginLayout,
                middleware: [authMiddleware]
            }
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView,
            meta: {
                layout: DefaultLayout,
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingsView,
            meta: {
                layout: DefaultLayout,
                middleware: [authMiddleware]
            },
            children: [
                {
                    path: 'info',
                    name: 'info-settings',
                    component: InfoSettingsView,
                    meta: {
                        layout: DefaultLayout,
                        middleware: [authMiddleware]
                    }
                }
            ],
        },
        {
            path: '/search',
            name: 'search',
            component: SearchView,
            meta: {
                layout: DefaultLayout,
                middleware: [authMiddleware]
            }
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView,
            meta: {
                layout: DefaultLayout,
                middleware: [authMiddleware]
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundView,
        }
        // {
        //   path: '/about',
        //   name: 'about',
        //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
        // },
        // {
        //   path: '/:pathMatch(.*)*',
        //   name: 'not-found',
        //   component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFoundView.vue')
        // }
    ]
})
router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]
    const context: MiddlewareParams = {to, from, next}

    const nextMiddleware = middleware[0]
    return nextMiddleware({...context, next: middlewarePipeline(context, middleware, 1)})
})

export default router
