import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
    let token = cookies.get("AuthToken");
    if (token != undefined) {
        return { tkn:token };
    } else {
        redirect(301, "/login");
    }
}