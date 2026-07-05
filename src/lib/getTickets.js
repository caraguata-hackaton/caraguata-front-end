import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { backendFetch } from "@/lib/backend"

function getTicketsFromResponse(data) {
    if (Array.isArray(data)) return data
    if (Array.isArray(data?.tickets)) return data.tickets
    if (Array.isArray(data?.data)) return data.data
    if (Array.isArray(data?.result)) return data.result

    return []
}

function getTotalFromResponse(data) {
    return (
        data?.pagination?.total ??
        data?.pagination?.totalItems ??
        data?.total ??
        getTicketsFromResponse(data).length
    )
}

async function getAccessTokenOrRedirect() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
        redirect("/login")
    }

    return accessToken
}

export async function getLatestTickets(limit = 4) {
    const accessToken = await getAccessTokenOrRedirect()

    const searchParams = new URLSearchParams({
        page: "1",
        limit: String(limit),
    })

    const { response, data } = await backendFetch(`/tickets?${searchParams}`, {
        method: "GET",
        token: accessToken,
    })

    if (response.status === 401 || response.status === 403) {
        redirect("/login")
    }

    if (!response.ok) {
        throw new Error(data?.message || "Erro ao buscar chamados.")
    }

    return getTicketsFromResponse(data).slice(0, limit)
}

export async function getTicketCountByStatus(status) {
    const accessToken = await getAccessTokenOrRedirect()

    const searchParams = new URLSearchParams({
        status,
        page: "1",
        limit: "1",
    })

    const { response, data } = await backendFetch(`/tickets?${searchParams}`, {
        method: "GET",
        token: accessToken,
    })

    if (response.status === 401 || response.status === 403) {
        redirect("/login")
    }

    if (!response.ok) {
        return 0
    }

    return getTotalFromResponse(data)
}