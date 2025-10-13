/**
 * channels.js
 *
 * Définir le type de canal et la methode
 * d'authentification pour y accéder
 * 
 * <type> le type du canal : private, presence
 * 
 * <authFunction> methode d'authentification pour les channel de type private, 
 * renvoit un boolean. true pour autoriser et false pour refuser
 * l'acces
 * 
 * <presenceFunction> methode d'authentification pour les channel de type presence, 
 * renvoit un boolean. true pour autoriser et false pour refuser
 * l'acces
 * 
 * <alias> permet de parser les nom de channel dynamique.
 * Le nom definis dans la methode brodcastOn de l'event sera utiliser pour matcher
 * le paramêtre
 */

const channels = {
    // Canal général pour les notifications
    "notificationsToRP": {
        type: 'private',
        authFunction: (data) => {
            return data;
        },
        presenceFunction: undefined,
        alias: "notifToRP",
    },

    "notificationsToCP": {
        type: 'private',
        authFunction: (data) => {
            return data;
        },
        presenceFunction: undefined,
        alias: "notifToCP-:{cp_login}",
    },

    "notificationsToRE": {
        type: 'private',
        authFunction: (data) => {
            return data;
        },
        presenceFunction: undefined,
        alias: "notifToRE-:{re_login}",
    },

    "notificationsToDev": {
        type: 'private',
        authFunction: (data) => {
            return data;
        },
        presenceFunction: undefined,
        alias: "notifToDev-:{dev_login}",
    },

    // Canal pour envoyer les notifications de pause sur les tâches au RE
    "pauseNotifToRE": {
        type: 'private',
        authFunction: (data) => {
            return data
        },
        presenceFunction: undefined,
        alias: "sendNotifToRE-:{re_login}",
    },

    // Canal pour envoyer les notifications de pause sur les tâches au CP
    "pauseNotifToCP": {
        type: 'private',
        authFunction: (data) => {
            return data
        },
        presenceFunction: undefined,
        alias: "sendNotifToCP-:{cp_login}",
    },

    // Canal pour les notifications de rapports journaliers au CP
    "dailyReportNotifToCP": {
        type: 'private',
        authFunction: (data) => {
            return data
        },
        presenceFunction: undefined,
        alias: "dailyReportToCP-:{cp_login}",
    },

    // Canal pour les notifications de rapports ponctuels au CP
    "ponctualReportNotifToCP": {
        type: 'private',
        authFunction: (data) => {
            return data
        },
        presenceFunction: undefined,
        alias: "ponctualReportTo-CP-:{cp_login}",
    },

    // Canal pour les notifications de rapports ponctuels au RE
    "ponctualReportNotifToRE": {
        type: 'private',
        authFunction: (data) => {
            return data
        },
        presenceFunction: undefined,
        alias: "ponctualReportTo-RE-:{re_login}",
    },





};

module.exports = channels;
