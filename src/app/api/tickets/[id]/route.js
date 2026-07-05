import { proxyWithAuth } from "@/lib/proxyWithAuth"

export async function GET(request, { params }) {
    return proxyWithAuth(request, `/tickets/${params.id}`, {
        method: "GET",
        hasBody: false,
    })
}