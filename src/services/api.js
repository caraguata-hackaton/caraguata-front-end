export async function apiFetch(path, options = {}) {
    const response = await fetch(`/api${path}`, {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        body:
            options.body !== undefined
                ? JSON.stringify(options.body)
                : undefined,
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
        throw new Error(data?.message || "Erro na requisição.")
    }

    return data
}