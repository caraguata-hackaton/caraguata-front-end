export function getHomePathByRole(role) {
    const routes = {
        MANAGER: "/painelChamados",
        SCHOOL_USER: "/homeEscola",
    }

    return routes[role] || "/login"
}