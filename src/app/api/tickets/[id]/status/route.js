import { proxyWithAuth } from "@/lib/proxyWithAuth"

export async function PATCH(request, { params }) {
    return proxyWithAuth(request, `/tickets/${params.id}/status`, {
        method: "PATCH",
    })
}