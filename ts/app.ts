class App {
    private contentElement: HTMLElement;

    constructor() {
        this.contentElement = document.getElementById('content')!;
        this.initEvents();
        this.loadContent('content/aboutMe.html'); // Startseite
    }

    private initEvents(): void {
        document.getElementById('home-link')?.addEventListener('click', () => {
            this.loadContent('content/aboutMe.html');
        });

        document.getElementById('cv-link')?.addEventListener('click', () => {
            this.loadContent('content/resume.html');
        });

        document.getElementById('projects-link')?.addEventListener('click', () => {
            this.loadContent('content/projekte.html');
        });
    }

    private loadContent(file: string): void {
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