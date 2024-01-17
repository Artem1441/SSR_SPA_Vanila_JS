console.log('Client-side code executed.');

const route = async (e) => {
    e.preventDefault()
    const url = e.target.getAttribute('href');
    const response = await fetch(url);
    const html = await response.text();
    document.documentElement.innerHTML = html
    window.history.pushState({}, "", e.target.href)
}

window.onpopstate = async () => {
    const url = window.location.pathname;
    const response = await fetch(url);
    const html = await response.text();
    document.documentElement.innerHTML = html
}