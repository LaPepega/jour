import { redirect } from '@sveltejs/kit';

export function load({ cookies, url }) {
    let token = url.searchParams.get("token");
    // Expires on the next day
    // TODO: find out how long it really lives
    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1)

    if (token != null) {
        cookies.set("AuthToken", token, { path: "/", expires: expirationDate })
        redirect(301, "/home");
    }
    if (url.searchParams.has("revoke")) {
        cookies.delete("AuthToken", { path: "/" });
        redirect(301, "/login");
    }
}