import { apiFetch } from "./api"

export function getTickets(params = {}) {
    const searchParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            searchParams.set(key, value)
        }
    })

    const query = searchParams.toString()

    return apiFetch(`/tickets${query ? `?${query}` : ""}`)
}

export function createTicket(data) {
    return apiFetch("/tickets", {
        method: "POST",
        body: data,
    })
}

export function getTicketById(id) {
    return apiFetch(`/tickets/${id}`)
}

export function updateTicketStatus(id, status) {
    return apiFetch(`/tickets/${id}/status`, {
        method: "PATCH",
        body: {
            status,
        },
    })
}

export function getTicketCategories() {
    return apiFetch("/ticket-categories")
}

export function getTicketCategoryFields(categoryId) {
    return apiFetch(`/ticket-categories/${categoryId}/fields`)
}