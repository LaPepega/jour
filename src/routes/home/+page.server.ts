import { redirect } from '@sveltejs/kit';

export function load({ cookies, url }) {
    let token = cookies.get("AuthToken");
    let date = url.searchParams.get("date")
    let today = new Date;

    if (token == undefined) {
        redirect(301, "/login");
    } 
        if (date == undefined) {
            redirect(301, `/home?date=${today.toISOString().slice(0,10)}`);
        }
        return { tkn:token, date:date};
    
}