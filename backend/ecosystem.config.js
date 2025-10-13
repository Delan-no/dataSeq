module.exports = {
    apps: [{
        name: 'dev-manager-backend',            // Nom de l'application
        script: './index.js',       // Point d'entrée de l'application
        // watch: ["."],              // Activer la surveillance des fichiers pour le redémarrage automatique
        watch: true,              // Activer la surveillance des fichiers pour le redémarrage automatique
        ignore_watch: ['node_modules', 'storage', 'logs'], // Dossiers à ignorer lors de la surveillance
        autorestart: true,        // Redémarrer automatiquement l'application en cas de crash
        max_restarts: 100,          // Nombre maximum de redémarrages en cas de crash
        restart_delay: 1000,      // Délai (en ms) entre les tentatives de redémarrage
        instances: 'max',         // Nombre d'instances à lancer (ici 'max' utilise tous les cœurs du CPU)
        exec_mode: 'cluster',     // Mode d'exécution : 'fork' pour un processus, 'cluster' pour plusieurs
        env: {                    // Variables d'environnement pour le mode développement
            NODE_ENV: 'development'
        },
        env_production: {         // Variables d'environnement pour le mode production
            NODE_ENV: 'production'
        }
    }]
};
