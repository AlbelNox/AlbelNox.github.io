"use strict";
class App {
    constructor() {
        this.contentElement = document.getElementById('content');
        this.initEvents();
        this.loadContent('content/aboutMe.html'); // Startseite
    }
    initEvents() {
        var _a, _b, _c;
        (_a = document.getElementById('home-link')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            this.loadContent('content/aboutMe.html');
        });
        (_b = document.getElementById('cv-link')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            this.loadContent('content/resume.html');
        });
        (_c = document.getElementById('projects-link')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
            this.loadContent('content/projekte.html');
        });
    }
    loadContent(file) {
        fetch(file)
            .then(response => {
            if (!response.ok) {
                throw new Error(`Fehler beim Laden: ${response.statusText}`);
            }
            return response.text();
        })
            .then(html => {
            this.contentElement.innerHTML = html;
        })
            .catch(error => {
            this.contentElement.innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
    }
}
new App();
