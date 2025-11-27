"use strict";
class App {
    constructor() {
        this.contentElement = document.getElementById('content');
        this.sidebarElement = document.getElementById('sidebar-content');
        this.currentPage = 'home';
        this.certificates = [
            { name: 'Regex', file: 'assets/Zertificates/Regex.pdf' },
            { name: 'NG Network', file: 'assets/Zertificates/Urkunde_NG_network.pdf' }
        ];
        this.references = [
            // { name:'Zeugnis 1', file:'assets/Arbeitszeugnisse/UseCase.pdf' },
        ];
        this.initEvents();
        this.loadContent('content/aboutMe.html', 'home');
    }

    initEvents() {
        // Navigation buttons
        document.getElementById('home-link')?.addEventListener('click', () => {
            this.setActive('home-link');
            this.loadContent('content/aboutMe.html', 'home');
        });

        document.getElementById('cv-link')?.addEventListener('click', () => {
            this.setActive('cv-link');
            this.loadContent('content/resume.html', 'cv');
        });

        document.getElementById('projects-link')?.addEventListener('click', () => {
            this.setActive('projects-link');
            this.loadContent('content/projekte.html', 'projects');
        });
    }

    setActive(buttonId) {
        // Entferne active-Klasse von allen nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        // Füge active-Klasse zum geklickten button hinzu
        document.getElementById(buttonId)?.classList.add('active');
    }

    loadContent(file, page) {
        this.currentPage = page;
        
        // Lade hauptseite
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Fehler beim Laden: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                this.contentElement.innerHTML = html;
                
                // Lade Sidebar basierend auf Seite
                if (page === 'cv') {
                    this.loadCertificateSidebar();
                } else if (page === 'projects') {
                    this.loadProjectsSidebar();
                } else {
                    this.clearSidebar();
                }
            })
            .catch(error => {
                this.contentElement.innerHTML = `<p style="color:red;">Fehler: ${error.message}</p>`;
                this.clearSidebar();
            });
    }

    loadCertificateSidebar() {
        let html = '<div class="sidebar-title">📄 Lebenslauf & Dokumente</div>';
        html += `<button class="sidebar-btn active" id="resume-btn">Lebenslauf</button>`;
        
        // Arbeitszeugnisse Sektion
        if (this.references.length > 0) {
            html += '<div class="sidebar-title" style="margin-top: 10px; font-size: 12px; opacity: 0.8;">📋 Arbeitszeugnisse</div>';
            this.references.forEach((ref) => {
                html += `<button class="sidebar-btn" data-reference="${ref.file}">${ref.name}</button>`;
            });
        }
        
        // Zertifikate Sektion
        html += '<div class="sidebar-title" style="margin-top: 10px; font-size: 12px; opacity: 0.8;">🏆 Zertifikate</div>';
        this.certificates.forEach((cert) => {
            html += `<button class="sidebar-btn" data-cert="${cert.file}">${cert.name}</button>`;
        });
        this.sidebarElement.innerHTML = html;
        
        // Event listener für Lebenslauf-button
        document.getElementById('resume-btn')?.addEventListener('click', () => {
            document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
            document.getElementById('resume-btn').classList.add('active');
            this.loadContent('content/resume.html', 'cv');
        });
        
        // Event listener für Arbeitszeugnisse-buttons
        document.querySelectorAll('[data-reference]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.loadDocument(btn.getAttribute('data-reference'));
            });
        });
        
        // Event listener für Zertifikats-buttons
        document.querySelectorAll('[data-cert]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.loadCertificate(btn.getAttribute('data-cert'));
            });
        });
    }

    loadCertificate(certFile) {
        // Überprüfe ob es eine PDF oder ein Bild ist
        if (certFile.toLowerCase().endsWith('.pdf')) {
            // Für PDF: Verwende iframe
            this.contentElement.innerHTML = `
                <h2>Zertifikat</h2>
                <iframe src="${certFile}" style="width: 100%; height: 600px; border: none; border-radius: 8px;"></iframe>
                <p><a href="${certFile}" download style="color: #667eea; text-decoration: none; font-weight: 600;">📥 PDF herunterladen</a></p>
            `;
        } else {
            // Für Bilder
            this.contentElement.innerHTML = `
                <h2>Zertifikat</h2>
                <img src="${certFile}" alt="Zertifikat" class="certificate-display">
            `;
        }
    }

    loadDocument(docFile) {
        // Zeige Arbeitszeugnisse (PDFs oder Bilder)
        if (docFile.toLowerCase().endsWith('.pdf')) {
            this.contentElement.innerHTML = `
                <h2>Arbeitszeugnis</h2>
                <iframe src="${docFile}" style="width: 100%; height: 600px; border: none; border-radius: 8px;"></iframe>
                <p><a href="${docFile}" download style="color: #667eea; text-decoration: none; font-weight: 600;">📥 PDF herunterladen</a></p>
            `;
        } else {
            this.contentElement.innerHTML = `
                <h2>Arbeitszeugnis</h2>
                <img src="${docFile}" alt="Arbeitszeugnis" class="certificate-display">
            `;
        }
    }

    loadProjectsSidebar() {
        // Placeholder für zukünftige Projekte
        let html = '<div class="sidebar-title">🚀 Projekte</div>';
        html += '<p style="padding: 15px; color: #999; font-size: 13px;">Keine Projekte hinzugefügt</p>';
        this.sidebarElement.innerHTML = html;
    }

    clearSidebar() {
        this.sidebarElement.innerHTML = '';
    }
}

// Initialisiere App wenn DOM fertig ist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new App();
    });
} else {
    new App();
}
