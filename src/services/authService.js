import { apiFetch } from "./api"

export function loginRequest(registration, pass) {
    return apiFetch("/auth/login", {
        method: "POST",
        body: {
            registration,
            pass,
        },
    })
}

export function logoutRequest() {
    return apiFetch("/auth/logout", {
        method: "POST",
    })
}

export function getMeRequest() {
    return apiFetch("/users/me")
}