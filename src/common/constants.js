export const PAGE_LIMIT = 5;
export const BACKEND = "https://pern-todos-app.herokuapp.com";
//export const BACKEND = "http://localhost:4000";
export const INITIAL_LINK = `${BACKEND}/todos?page[offset]=0&page[limit]=${PAGE_LIMIT}`;