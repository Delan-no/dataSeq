# Documentation - Application de Séquences Numériques

## Vue d'ensemble
Application web permettant de créer et gérer plusieurs séquences de nombres (entiers et décimaux) avec recherche globale et sauvegarde automatique.

## Fonctionnalités principales

### 1. Gestion des séquences
- **Créer une séquence** : Saisissez un nom et cliquez "Créer"
- **Sélectionner une séquence** : Utilisez le menu déroulant
- **Supprimer une séquence** : Bouton "Supprimer" (minimum 1 séquence)

### 2. Saisie de nombres
- **Types supportés** : Entiers (1, 2, 3) et décimaux (1.5, 2.3, 0.2)
- **Méthodes de saisie** :
  - Tapez le nombre → Cliquez "Ajouter"
  - Tapez le nombre → Appuyez sur "Entrée"
- **Affichage temps réel** : La séquence s'affiche immédiatement

### 3. Recherche globale
- **Fonctionnement** : Recherche dans toutes les séquences simultanément
- **Ordre de priorité** : Résultats triés par position d'apparition (plus tôt = priorité)
- **Affichage** :
  - Nom de la séquence trouvée
  - Position du nombre dans la séquence
  - Sous-séquence à partir de la première occurrence
  - Premier nombre en vert (trouvé), autres en gris

### 4. Sauvegarde automatique
- **Technologie** : IndexedDB (navigateur)
- **Capacité** : Illimitée pour usage personnel
- **Persistance** : Données conservées après fermeture

## Guide d'utilisation

### Démarrage rapide
1. **Première utilisation** : Une séquence "Séquence 1" est créée automatiquement
2. **Ajouter des nombres** : Tapez `1.5` puis "Ajouter"
3. **Rechercher** : Tapez `1.5` dans le champ de recherche
4. **Créer une nouvelle séquence** : Tapez "Ma séquence" puis "Créer"

### Exemples pratiques

#### Créer plusieurs séquences
```
Séquence A : 1.5, 2.3, 0.2, 1.5, 3.1
Séquence B : 0.5, 1.5, 2.8, 4.2
Séquence C : 3.3, 1.5, 0.9
```

#### Recherche de 1.5
**Résultat affiché par ordre de priorité :**
1. **Séquence A** (Position: 1) → `1.5, 2.3, 0.2, 1.5, 3.1`
2. **Séquence B** (Position: 2) → `1.5, 2.8, 4.2`  
3. **Séquence C** (Position: 2) → `1.5, 0.9`

### Raccourcis clavier
- **Entrée** : Ajouter un nombre ou créer une séquence
- **Reset** : Vider la séquence active

### Interface
- **Thème** : Adaptation automatique clair/sombre
- **Responsive** : Fonctionne sur mobile et desktop
- **Scroll** : Défilement automatique pour longues séquences

## Cas d'usage

### Personnel
- Suivi de mesures (poids, température, etc.)
- Séquences mathématiques
- Données expérimentales

### Professionnel
- Analyse de données numériques
- Suivi de métriques
- Comparaison de séquences

## Limitations
- **Navigateur uniquement** : Pas d'accès depuis d'autres appareils
- **Nombres uniquement** : Pas de texte ou caractères spéciaux
- **Recherche exacte** : Pas de recherche approximative

## Dépannage

### Données perdues
- Vérifiez que vous êtes sur le même navigateur
- Les données sont liées au domaine/port de l'application

### Performance
- L'application reste fluide même avec des milliers de nombres
- IndexedDB gère automatiquement l'optimisation

### Compatibilité
- **Navigateurs supportés** : Chrome, Firefox, Safari, Edge (versions récentes)
- **Prérequis** : JavaScript activé

## Support technique
Pour toute question ou problème, vérifiez :
1. Console du navigateur (F12) pour les erreurs
2. Compatibilité IndexedDB de votre navigateur
3. Espace de stockage disponible