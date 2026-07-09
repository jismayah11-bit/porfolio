/**
 * Theme Manager - Gestion dynamique des thèmes
 * Système extensible avec sauvegarde localStorage et détection système
 */

class ThemeManager {
    constructor() {
        this.themes = {
            'dark': {
                name: 'Dark Mode',
                colors: {
                    'bg-primary': '#0a0e27',
                    'bg-secondary': '#111835',
                    'bg-tertiary': '#1a1f3a',
                    'text-primary': '#ffffff',
                    'text-secondary': '#b0b5c8',
                    'text-tertiary': '#7a7f95',
                    'primary': '#6366f1',
                    'primary-light': '#818cf8',
                    'primary-dark': '#4f46e5',
                    'secondary': '#06b6d4',
                    'accent': '#ec4899',
                    'accent-light': '#f472b6',
                    'success': '#10b981',
                    'warning': '#f59e0b',
                    'error': '#ef4444',
                    'glass-bg': 'rgba(255, 255, 255, 0.05)',
                    'glass-border': 'rgba(255, 255, 255, 0.1)',
                }
            },
            'light': {
                name: 'Light Mode',
                colors: {
                    'bg-primary': '#ffffff',
                    'bg-secondary': '#f8f9fc',
                    'bg-tertiary': '#f0f3f9',
                    'text-primary': '#0a0e27',
                    'text-secondary': '#4b5268',
                    'text-tertiary': '#7a7f95',
                    'primary': '#6366f1',
                    'primary-light': '#818cf8',
                    'primary-dark': '#4f46e5',
                    'secondary': '#06b6d4',
                    'accent': '#ec4899',
                    'accent-light': '#f472b6',
                    'success': '#10b981',
                    'warning': '#f59e0b',
                    'error': '#ef4444',
                    'glass-bg': 'rgba(255, 255, 255, 0.7)',
                    'glass-border': 'rgba(0, 0, 0, 0.05)',
                }
            },
            'dark-blue': {
                name: 'Dark Blue',
                colors: {
                    'bg-primary': '#0f1419',
                    'bg-secondary': '#1a2332',
                    'bg-tertiary': '#253047',
                    'text-primary': '#e0e6f2',
                    'text-secondary': '#a8b5d1',
                    'text-tertiary': '#7a84a0',
                    'primary': '#3b82f6',
                    'primary-light': '#60a5fa',
                    'primary-dark': '#1d4ed8',
                    'secondary': '#0ea5e9',
                    'accent': '#06b6d4',
                    'accent-light': '#22d3ee',
                    'success': '#10b981',
                    'warning': '#f59e0b',
                    'error': '#ef4444',
                    'glass-bg': 'rgba(59, 130, 246, 0.05)',
                    'glass-border': 'rgba(59, 130, 246, 0.1)',
                }
            },
            'purple-neon': {
                name: 'Purple Neon',
                colors: {
                    'bg-primary': '#0d0221',
                    'bg-secondary': '#1a0033',
                    'bg-tertiary': '#2d004d',
                    'text-primary': '#e0b3ff',
                    'text-secondary': '#b380ff',
                    'text-tertiary': '#8a5cff',
                    'primary': '#d946ef',
                    'primary-light': '#f472b6',
                    'primary-dark': '#be185d',
                    'secondary': '#a78bfa',
                    'accent': '#06b6d4',
                    'accent-light': '#22d3ee',
                    'success': '#10b981',
                    'warning': '#f59e0b',
                    'error': '#ef4444',
                    'glass-bg': 'rgba(217, 70, 239, 0.05)',
                    'glass-border': 'rgba(217, 70, 239, 0.1)',
                }
            },
            'emerald': {
                name: 'Emerald',
                colors: {
                    'bg-primary': '#0d1f18',
                    'bg-secondary': '#1a3a30',
                    'bg-tertiary': '#2d5a4a',
                    'text-primary': '#d1fae5',
                    'text-secondary': '#a7f3d0',
                    'text-tertiary': '#6ee7b7',
                    'primary': '#10b981',
                    'primary-light': '#34d399',
                    'primary-dark': '#059669',
                    'secondary': '#14b8a6',
                    'accent': '#06b6d4',
                    'accent-light': '#22d3ee',
                    'success': '#10b981',
                    'warning': '#f59e0b',
                    'error': '#ef4444',
                    'glass-bg': 'rgba(16, 185, 129, 0.05)',
                    'glass-border': 'rgba(16, 185, 129, 0.1)',
                }
            },
            'cyberpunk': {
                name: 'Cyberpunk',
                colors: {
                    'bg-primary': '#0a0e27',
                    'bg-secondary': '#1a1f3f',
                    'bg-tertiary': '#2d3561',
                    'text-primary': '#00ff88',
                    'text-secondary': '#00dd77',
                    'text-tertiary': '#00aa55',
                    'primary': '#ff006e',
                    'primary-light': '#ff3385',
                    'primary-dark': '#cc0056',
                    'secondary': '#00f5ff',
                    'accent': '#ffbe0b',
                    'accent-light': '#ffed4e',
                    'success': '#00ff88',
                    'warning': '#ffbe0b',
                    'error': '#ff006e',
                    'glass-bg': 'rgba(255, 0, 110, 0.05)',
                    'glass-border': 'rgba(255, 0, 110, 0.1)',
                }
            },
            'minimal-white': {
                name: 'Minimal White',
                colors: {
                    'bg-primary': '#fafafa',
                    'bg-secondary': '#f5f5f5',
                    'bg-tertiary': '#eeeeee',
                    'text-primary': '#1a1a1a',
                    'text-secondary': '#4d4d4d',
                    'text-tertiary': '#808080',
                    'primary': '#000000',
                    'primary-light': '#333333',
                    'primary-dark': '#000000',
                    'secondary': '#666666',
                    'accent': '#999999',
                    'accent-light': '#bbbbbb',
                    'success': '#2d6a4f',
                    'warning': '#d4a574',
                    'error': '#a1424d',
                    'glass-bg': 'rgba(0, 0, 0, 0.03)',
                    'glass-border': 'rgba(0, 0, 0, 0.1)',
                }
            }
        };

        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        this.init();
    }

    /**
     * Initialiser le gestionnaire de thème
     */
    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
        this.setupSystemThemeListener();
    }

    /**
     * Obtenir le thème stocké en localStorage
     */
    getStoredTheme() {
        try {
            return localStorage.getItem('portfolio-theme');
        } catch (e) {
            console.warn('localStorage non disponible:', e);
            return null;
        }
    }

    /**
     * Obtenir le thème système
     */
    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    /**
     * Sauvegarder le thème en localStorage
     */
    saveTheme(theme) {
        try {
            localStorage.setItem('portfolio-theme', theme);
        } catch (e) {
            console.warn('Impossible de sauvegarder le thème:', e);
        }
    }

    /**
     * Appliquer un thème
     */
    applyTheme(themeName) {
        const theme = this.themes[themeName];
        
        if (!theme) {
            console.warn(`Thème "${themeName}" non trouvé`);
            return;
        }

        // Déterminer si c'est le thème light
        const isLightMode = themeName === 'light' || themeName === 'minimal-white';
        
        // Ajouter/Retirer la classe light-mode
        const htmlElement = document.documentElement;
        if (isLightMode) {
            htmlElement.classList.add('light-mode');
        } else {
            htmlElement.classList.remove('light-mode');
        }

        // Appliquer les couleurs CSS
        Object.entries(theme.colors).forEach(([colorName, colorValue]) => {
            document.documentElement.style.setProperty(
                `--color-${colorName}`,
                colorValue
            );
        });

        // Mettre à jour le thème courant
        this.currentTheme = themeName;

        // Sauvegarder le choix
        this.saveTheme(themeName);

        // Émettre un événement personnalisé
        this.dispatchThemeChangeEvent(themeName, theme.name);

        // Mettre à jour l'icône du toggle
        this.updateThemeToggleIcon();
    }

    /**
     * Basculer entre les thèmes
     */
    toggleTheme() {
        const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(nextTheme);
    }

    /**
     * Mettre à jour l'icône du toggle
     */
    updateThemeToggleIcon() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const isLight = this.currentTheme === 'light' || this.currentTheme === 'minimal-white';
            themeToggle.querySelector('.theme-icon').textContent = isLight ? '🌙' : '☀️';
            themeToggle.title = isLight ? 'Passer au mode sombre' : 'Passer au mode clair';
        }
    }

    /**
     * Configurer les écouteurs d'événements
     */
    setupEventListeners() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Ajouter un menu de sélection de thème si désiré
        this.createThemeMenu();
    }

    /**
     * Créer un menu de sélection de thème (optionnel)
     */
    createThemeMenu() {
        // Vous pouvez ajouter ici un menu contextuel ou une modale pour choisir les thèmes
        // Pour l'instant, le simple toggle suffit
    }

    /**
     * Écouter les changements de thème système
     */
    setupSystemThemeListener() {
        if (!window.matchMedia) return;

        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addEventListener('change', (e) => {
            // Seulement appliquer le changement système si l'utilisateur n'a pas choisi manuellement
            if (!this.getStoredTheme()) {
                const newTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(newTheme);
            }
        });
    }

    /**
     * Émettre un événement personnalisé de changement de thème
     */
    dispatchThemeChangeEvent(themeName, themeFriendlyName) {
        const event = new CustomEvent('themechange', {
            detail: {
                theme: themeName,
                name: themeFriendlyName,
                timestamp: new Date()
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * Ajouter un nouveau thème personnalisé
     */
    addCustomTheme(name, colors) {
        if (this.themes[name]) {
            console.warn(`Un thème "${name}" existe déjà`);
            return false;
        }

        this.themes[name] = {
            name: colors.displayName || name,
            colors: colors
        };

        return true;
    }

    /**
     * Obtenir la liste de tous les thèmes disponibles
     */
    getAvailableThemes() {
        return Object.entries(this.themes).map(([key, value]) => ({
            id: key,
            name: value.name
        }));
    }

    /**
     * Obtenir le thème courant
     */
    getCurrentTheme() {
        return {
            id: this.currentTheme,
            name: this.themes[this.currentTheme].name,
            colors: this.themes[this.currentTheme].colors
        };
    }
}

/**
 * Initialiser le gestionnaire de thème au chargement du DOM
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.themeManager = new ThemeManager();
    });
} else {
    window.themeManager = new ThemeManager();
}

// Export pour utilisation en modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}
