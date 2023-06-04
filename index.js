const { RawIntra } = require('epitech.js');
const { PuppeteerAuthProvider } = require('@epitech.js/puppeteer-auth-provider');


async function main() {
    // Calendar file
    // const calendar_file = ...
    // calendar_file.pipe(fs.createWriteStream("calendar.ical"));

    // Get next registered activity while the rest is loading
    const nextRegisteredActivity = getNextRegisteredActivity();

    // User information
    const user = await intra.getUser();
    console.log(user)
    // console.log("Utilisateur: \x1b[33m" + ... + "\x1b[0m");
    // console.log("Crédits: \x1b[33m" + ... + "\x1b[0m");
    // console.log("GPA: \x1b[33m" + ... + "\x1b[0m");
    // console.log("Tek: \x1b[33m" + ... + "\x1b[0m");
    // console.log("Semestre Actuel: \x1b[33m" + ... + "\x1b[0m");
    // console.log("Promo: \x1b[33m" + ... + "\x1b[0m\n");

    // Last nofitication
    await intra.getDashboard().then((dashboard) => {
        console.log(dashboard)
        // console.log("Dernière notification: \x1b[33m" + ... + "\x1b[0m");
        // console.log("Par: \x1b[33m" + ... + "\x1b[0m");
        // console.log("Le: \x1b[33m" + ... + "\x1b[0m");
        // console.log("Message: \x1b[33m" + ... + "\x1b[0m\n");
    });

    // Next registered activity
    await nextRegisteredActivity.then((nextRegisteredActivity) => {
        console.log(nextRegisteredActivity)
        // console.log("Prochaine activité: \x1b[33m" + ... + "\x1b[0m");
        // console.log("Le: \x1b[33m" + ... + "\x1b[0m");
        // console.log("Salle: \x1b[33m" + ... + "\x1b[0m");
    });
}

async function getNextRegisteredActivity() {
    // array of activities
    let activities = new Array();

    await intra.getPlanning().then((planning) => {
        planning.forEach((activity) => {
            if (activity.event_registered && activity.start && activity.event_registered === "registered") {
                // do stuff
            }
        });
    });
    activities.sort((a, b) => {
        return new Date(a.start) - new Date(b.start);
    });

    let now = new Date();
    for (let i = 0; i < activities.length; i++) {
        if (new Date(activities[i].start) > now) {
            return activities[i];
        }
    }

    return activities[0];
}

const intra = new RawIntra({
    provider: new PuppeteerAuthProvider({
        storageFilePath: './storage.json',
    })
});

main();