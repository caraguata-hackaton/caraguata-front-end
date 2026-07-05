const API_URL = process.env.API_URL

export async function backendFetch(path, options = {}) {
    if (!API_URL) {
        throw new Error("API_URL não configurada no .env.local")
    }

    const headers = {
        "Content-Type": "application/json",
        ...(options.cookie ? { Cookie: options.cookie } : {}),
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
        ...options.headers,
    }

    const response = await fetch(`${API_URL}${path}`, {
        method: options.method || "GET",
        headers,
        body:
            options.body !== undefined
                ? JSON.stringify(options.body)
                : undefined,
        cache: "no-store",
    })

    const data = await response.json().catch(() => null)

    return {
        response,
        data,
    }
}