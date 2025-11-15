class App {
    private contentElement: HTMLElement;

    constructor() {
        this.contentElement = document.getElementById('content')!;
        this.initEvents();
    }

    private initEvents(): void {
        document.getElementById('home-link')?.addEventListener('click', () => {
            this.updateContent('Willkommen!', 'Hier findest du meinen Lebenslauf und meine Projekte.');
        });

        document.getElementById('cv-link')?.addEventListener('click', () => {
            this.updateContent('Lebenslauf', 'Hier steht dein Lebenslauf.');
        });

        document.getElementById('projects-link')?.addEventListener('click', () => {
            this.updateContent('Projekte', 'Hier findest du deine Projekte.');
        });
    }

    private updateContent(title: string, text: string): void {
        this.contentElement.innerHTML = `<h2>${title}</h2><p>${text}</p>`;
    }
}

new App();