import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { backendFetch } from "@/lib/backend"

export async function getAuthenticatedUser() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
        redirect("/login")
    }

    const { response, data } = await backendFetch("/users/me", {
        method: "GET",
        token: accessToken,
    })

    if (!response.ok) {
        redirect("/login")
    }

    const user = data?.user || data

    if (!user) {
        redirect("/login")
    }

    return user
}