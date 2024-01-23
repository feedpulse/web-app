import type {NavigationGuardNext, RouteLocationNormalized} from "vue-router";

export type MiddlewareParams = { to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext }
