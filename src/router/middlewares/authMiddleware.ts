import {useAuthStore} from "@/stores/useAuthStore";
import type {MiddlewareParams} from "@/router/MidddlewareParams";

export default function authMiddleware({to, from, next}: MiddlewareParams) {
    const authStore = useAuthStore();

    if (!authStore.isLoggedIn) {
        return next({name: 'login'});
    } else {
        return next();
    }
}
