import express from "express"
import fs from "fs"
import path from "path"

const app = express();
const port = 80;
app.use(express.static('public'));

function renderPage(res, fileName, replacements = {}) {
    const filePath = path.join('views', `${fileName}.html`);
    let html = fs.readFileSync(filePath, 'utf-8');

    // function for making mask like <%= userId =%>
    Object.keys(replacements).forEach(key => {
        const placeholder = `<%= ${key} =%>`;
        html = html.replace(new RegExp(placeholder, 'g'), replacements[key]);
    });

    res.send(html);
}

app.get('/', (req, res) => {
    renderPage(res, 'index');
});

app.get('/about', (req, res) => {
    renderPage(res, 'about');
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    renderPage(res, 'user-profile', { userId });
});

app.use((req, res) => {
    renderPage(res, '404');
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));