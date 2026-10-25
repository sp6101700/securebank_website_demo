# SecureBank – Online Banking (Demo)
Fictional demo project. No real data. Currency: INR (₹).

## Run
Open `index.html` in a browser (double-click), or in VS Code use the Live Server extension,
or run `python -m http.server 8000` inside this folder and visit http://localhost:8000

Demo login: `demo` / `demo123`. Data is kept in browser localStorage (clear site data to reset).

## Structure
- `index.html` – page shell (header, footer, script tags)
- `css/style.css` – all styles (responsive, light/dark)
- `js/core.js` – data store, helpers, sidebar, router, events
- `js/pages/` – one file per page: open, overview, transfer, bill, find, contact, loan, logout, auth (login/register)
- `js/main.js` – starts the app
