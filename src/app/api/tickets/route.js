import { proxyWithAuth } from "@/lib/proxyWithAuth"

export async function GET(request) {
    return proxyWithAuth(request, "/tickets", {
        method: "GET",
        hasBody: false,
    })
}

export async function POST(request) {
    return proxyWithAuth(request, "/tickets", {
        method: "POST",
    })
}