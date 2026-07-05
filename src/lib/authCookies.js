const isProduction = process.env.NODE_ENV === "production"

export const accessTokenCookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
    maxAge: 15 * 60,
}