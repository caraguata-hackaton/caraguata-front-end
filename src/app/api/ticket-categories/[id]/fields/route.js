import { proxyWithAuth } from "@/lib/proxyWithAuth"

export async function GET(request, { params }) {
    return proxyWithAuth(request, `/ticket-categories/${params.id}/fields`, {
        method: "GET",
        hasBody: false,
    })
}