import { NextResponse } from "next/server"
import { backendFetch } from "@/lib/backend"

export async function POST(request) {
    const cookieHeader = request.headers.get("cookie") || ""

    await backendFetch("/auth/logout", {
        method: "POST",
        cookie: cookieHeader,
    }).catch(() => null)

    const response = NextResponse.json({
        message: "Logout realizado com sucesso.",
    })

    response.cookies.delete("accessToken")
    response.cookies.delete("refreshToken")

    return response
}