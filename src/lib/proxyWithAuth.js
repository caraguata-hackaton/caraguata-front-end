import { NextResponse } from "next/server"
import { backendFetch } from "@/lib/backend"

export async function proxyWithAuth(request, backendPath, options = {}) {
    const accessToken = request.cookies.get("accessToken")?.value

    if (!accessToken) {
        return NextResponse.json(
            { message: "Usuário não autenticado." },
            { status: 401 },
        )
    }

    const method = options.method || request.method

    const hasBody =
        options.hasBody === false
            ? false
            : !["GET", "DELETE"].includes(method)

    const body = hasBody
        ? await request.json().catch(() => undefined)
        : undefined

    const searchParams = request.nextUrl.search || ""

    const { response, data } = await backendFetch(`${backendPath}${searchParams}`, {
        method,
        token: accessToken,
        body,
    })

    return NextResponse.json(data, {
        status: response.status,
    })
}