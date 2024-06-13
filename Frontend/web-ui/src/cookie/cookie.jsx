export function saveToken(token) {
    const oneHour = 60 * 60; 
    const expires = new Date(Date.now() + oneHour * 1000); 
    document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/`;
}

export function getToken() {
    const cookies = Object.fromEntries(
        document.cookie.split("; ").map((cookie) => cookie.split("=")),
    );
    return cookies.token;
}

export function removeToken() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
