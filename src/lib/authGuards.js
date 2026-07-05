import { redirect } from "next/navigation"
import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser"
import { getHomePathByRole } from "@/lib/getHomePathByRole"

export async function requireAuth() {
    return getAuthenticatedUser()
}

export async function requireRole(allowedRoles = []) {
    const user = await getAuthenticatedUser()

    if (!user?.role) {
        redirect("/login")
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        redirect(getHomePathByRole(user.role))
    }

    return user
}