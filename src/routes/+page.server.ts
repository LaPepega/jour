import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
    if (cookies.get("Authorization") == undefined) {
        redirect(301, "/login");
    }
    else {
        redirect(301, "/home");
    }
}