import { proxyWithAuth } from "@/lib/proxyWithAuth"

export async function GET(request) {
    return proxyWithAuth(request, "/users/me", {
        method: "GET",
        hasBody: false,
    })
}