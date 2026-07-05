import { NextResponse } from "next/server"
import { backendFetch } from "@/lib/backend"
import { accessTokenCookieOptions } from "@/lib/authCookies"

function appendBackendCookies(nextResponse, backendResponse) {
    const setCookies =
        typeof backendResponse.headers.getSetCookie === "function"
            ? backendResponse.headers.getSetCookie()
            : [backendResponse.headers.get("set-cookie")].filter(Boolean)

    for (const cookie of setCookies) {
        nextResponse.headers.append("Set-Cookie", cookie)
    }
}

export async function POST(request) {
    const body = await request.json()

    const { response: backendResponse, data } = await backendFetch("/auth/login", {
        method: "POST",
        body,
    })

    if (!backendResponse.ok) {
        return NextResponse.json(
            data || { message: "Erro ao fazer login." },
            { status: backendResponse.status },
        )
    }

    const nextResponse = NextResponse.json(
        {
            message: data.message,
            user: data.user,
        },
        { status: 200 },
    )

    nextResponse.cookies.set(
        "accessToken",
        data.accessToken,
        accessTokenCookieOptions,
    )

    appendBackendCookies(nextResponse, backendResponse)

    return nextResponse
}