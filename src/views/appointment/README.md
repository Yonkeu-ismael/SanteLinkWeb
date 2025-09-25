# Vue Appointment

Cette vue affiche la liste des rendez-vous médicaux avec filtrage par période.

## Fonctionnalités

- **Filtrage par période** : Upcoming, Ongoing, Archives
- **Affichage des rendez-vous** : Nom du médecin, spécialité, date, heure, statut
- **Navigation** : Intégration avec la sidebar et navigation mobile
- **États de chargement** : Loading, erreur, liste vide
- **Responsive** : Adaptation mobile et desktop

## API

### Endpoint utilisé
```
POST /api/v1/appointment/filter-appointment-by-period
```

### Paramètres
```json
{
  "period": "upcoming" | "ongoing" | "archives"
}
```

### Réponse attendue
```json
[
  {
    "id": "string",
    "doctorName": "string",
    "speciality": "string", 
    "appointmentDate": "string",
    "appointmentTime": "string",
    "status": "string"
  }
]
```

## Navigation

- **Route** : `/appointment`
- **Nom** : `Appointment`
- **Authentification** : Requise

## Composants

### Appointment.vue
- Vue principale avec sidebar et contenu
- Gestion des onglets (Upcoming, Ongoing, Archives)
- Affichage des cartes de rendez-vous
- États de chargement et d'erreur

### Services API
- `getAppointmentsByPeriod()` : Récupération des rendez-vous par période
- Gestion des erreurs et retry automatique
- Types TypeScript pour la sécurité

## Utilisation

1. L'utilisateur clique sur "Appointment" dans la navigation
2. La vue se charge avec les rendez-vous "Upcoming" par défaut
3. L'utilisateur peut changer d'onglet pour voir d'autres périodes
4. Les données sont récupérées automatiquement via l'API

## Styles

- Utilisation de CSS Modules
- Design cohérent avec le reste de l'application
- Responsive design pour mobile et desktop
- Animations et transitions fluides
