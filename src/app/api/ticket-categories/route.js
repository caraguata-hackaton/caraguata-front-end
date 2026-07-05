import { proxyWithAuth } from "@/lib/proxyWithAuth"

export async function GET(request) {
    return proxyWithAuth(request, "/ticket-categories", {
        method: "GET",
        hasBody: false,
    })
}

export async function POST(request) {
    return proxyWithAuth(request, "/ticket-categories", {
        method: "POST",
    })
}