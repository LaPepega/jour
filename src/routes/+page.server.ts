import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
    if (cookies.get("AuthToken") == undefined) {
        redirect(301, "/login");
    }
    else {
        redirect(301, "/home");
    }
}