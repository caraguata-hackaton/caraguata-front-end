export function appendBackendCookies(nextResponse, backendResponse) {
    const getSetCookie = backendResponse.headers.getSetCookie?.()

    const cookies = getSetCookie?.length
        ? getSetCookie
        : backendResponse.headers.get("set-cookie")
            ? [backendResponse.headers.get("set-cookie")]
            : []

    for (const cookie of cookies) {
        nextResponse.headers.append("Set-Cookie", cookie)
    }
}