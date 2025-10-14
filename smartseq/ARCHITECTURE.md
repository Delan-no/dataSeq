# 📚 Documentation Architecture SmartSeq

## 🎯 Vue d'ensemble
Refonte complète de l'interface utilisateur avec une approche moderne, modulaire et responsive.

---

## 🏗️ Structure des composants

### 📁 `components/sequence/`

#### **SequenceInput.tsx**
**Logique :** Composant de saisie des nombres
- **État local :** `inputValue` pour la valeur temporaire
- **Validation :** Vérifie que l'input est un nombre valide
- **UX :** Auto-reset après ajout, validation en temps réel
- **Design :** Glassmorphism avec gradient indicator

```typescript
// Logique principale
const handleSubmit = (e) => {
  const num = parseFloat(inputValue);
  if (!isNaN(num)) {
    onAddNumber(num);     // Callback vers parent
    setInputValue('');    // Reset automatique
  }
};
```

#### **SequenceDisplay.tsx**
**Logique :** Affichage élégant des séquences
- **Props :** `sequence[]`, `title`, `className`
- **Rendu conditionnel :** État vide vs séquence remplie
- **Interaction :** Hover effects avec position des éléments
- **Performance :** Virtualisation pour grandes séquences

```typescript
// Logique d'affichage
{sequence.length > 0 ? (
  // Affichage avec badges animés + position au hover
) : (
  // État vide avec icône et message
)}
```

#### **SequenceManager.tsx**
**Logique :** Gestion complète des séquences
- **CRUD :** Créer, sélectionner, supprimer séquences
- **Statistiques :** Calculs en temps réel (total, moyenne)
- **Validation :** Empêche suppression dernière séquence
- **État :** Synchronisation avec IndexedDB

```typescript
// Logique de création
const handleCreate = (e) => {
  const name = formData.get('sequenceName');
  if (name?.trim()) {
    onCreateSequence(name.trim());
    e.currentTarget.reset();  // Reset form
  }
};
```

---

### 📁 `components/search/`

#### **SearchBar.tsx**
**Logique :** Barre de recherche interactive
- **Recherche temps réel :** `onChange` déclenche recherche
- **État local :** `searchValue` pour input contrôlé
- **UX :** Bouton clear, icônes, placeholder dynamique
- **Performance :** Debouncing implicite via parent

```typescript
// Logique de recherche
const handleChange = (e) => {
  const value = e.target.value;
  setSearchValue(value);
  onSearch(value);  // Callback immédiat vers parent
};
```

#### **SearchResults.tsx**
**Logique :** Affichage des résultats de recherche
- **Rendu conditionnel :** Résultats trouvés vs non trouvés
- **Mise en évidence :** Premier élément de chaque sous-séquence
- **Métadonnées :** Position, nom séquence, comptage
- **Design :** Cards avec gradient et animations

```typescript
// Logique de mise en évidence
className={index === 0 
  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-110'
  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
}
```

---

### 📁 `components/ui/`

#### **GradientBackground.tsx**
**Logique :** Fond animé moderne
- **Couches :** Gradient de base + formes géométriques animées
- **Animations :** `animate-pulse` avec délais différents
- **Z-index :** Stratification pour contenu au-dessus
- **Responsive :** Formes adaptatives selon écran

```typescript
// Structure en couches
<div className="absolute inset-0 bg-gradient-to-br...">  // Base
<div className="absolute inset-0 overflow-hidden">       // Formes animées
<div className="relative z-10">{children}</div>          // Contenu
```

#### **FloatingActionButton.tsx**
**Logique :** Menu d'actions rapides
- **État :** `isOpen` pour toggle menu
- **Animation :** Rotation bouton + slide actions
- **Actions :** Array d'objets {icon, label, onClick, color}
- **UX :** Fermeture auto après action

```typescript
// Logique d'animation
className={`transition-all duration-300 ${
  isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
}`}
```

#### **Toast.tsx + useToast.ts**
**Logique :** Système de notifications
- **Hook :** Gestion état global des toasts
- **Auto-dismiss :** Timer avec cleanup
- **Types :** success, error, info, warning
- **Animation :** Slide-in/out avec opacity

```typescript
// Logique du hook
const addToast = useCallback((message, type, duration = 3000) => {
  const id = Math.random().toString(36).substr(2, 9);
  setToasts(prev => [...prev, { id, message, type, duration }]);
}, []);
```

---

## 🎨 Logique de design

### **Système de couleurs**
```css
/* Gradients principaux */
blue-500 → purple-600    // Actions principales
green-500 → emerald-600  // Succès/validation
red-500 → red-600        // Erreurs/suppression
```

### **Glassmorphism**
```css
bg-white/80 backdrop-blur-sm    // Effet verre
border border-white/20          // Bordures subtiles
shadow-xl                       // Ombres profondes
```

### **Animations**
```css
transition-all duration-200     // Transitions rapides
transform hover:scale-[1.02]    // Micro-interactions
animate-pulse                   // Éléments vivants
```

---

## 📱 Logique responsive

### **Breakpoints**
- **Mobile :** `col-span-12` (stack vertical)
- **Tablet :** `md:col-span-6` (2 colonnes)
- **Desktop :** `lg:col-span-1` + `lg:col-span-2` (sidebar + main)

### **Layout principal**
```typescript
// Structure responsive
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-1">     // Sidebar contrôles
  <div className="lg:col-span-2">     // Zone principale
</div>
```

---

## 🔄 Flux de données

### **Page Home.tsx**
**Logique centrale :** Orchestration de tous les composants
1. **Hook IndexedDB :** Gestion état global séquences
2. **État local :** `searchValue`, `searchResults`
3. **Callbacks :** Transmission actions vers composants enfants
4. **Synchronisation :** Mise à jour automatique affichage

```typescript
// Flux de recherche
handleSearch(value) → searchInAllSequences(value) → setSearchResults(results)
                   ↓
            SearchResults component reçoit results
```

### **Communication parent-enfant**
- **Props down :** Données et callbacks
- **Events up :** Actions via callbacks
- **État partagé :** Via hooks personnalisés

---

## 🎯 Optimisations

### **Performance**
- **Composants purs :** Pas de re-render inutiles
- **Callbacks memoizés :** `useCallback` pour fonctions
- **Rendu conditionnel :** Évite DOM inutile

### **UX**
- **Feedback immédiat :** États loading, success, error
- **Validation temps réel :** Input validation
- **Raccourcis :** Enter pour submit, ESC pour cancel

### **Accessibilité**
- **Contrastes :** Respect WCAG
- **Focus :** Indicateurs visuels
- **Sémantique :** HTML approprié

---

## 🚀 Points clés de l'architecture

1. **Séparation des responsabilités :** Chaque composant a un rôle précis
2. **Réutilisabilité :** Composants UI génériques
3. **Maintenabilité :** Code modulaire et documenté
4. **Extensibilité :** Architecture ouverte pour nouvelles features
5. **Performance :** Optimisations React et CSS