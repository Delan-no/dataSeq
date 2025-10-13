const { exec } = require("child_process");
const psTree = require("ps-tree");

function killProcess(port) {
    exec(`netstat -ano | findstr :${port}`, (err, stdout, stderr) => {
        if (err) {
            // console.error(`Erreur lors de la recherche du processus : ${err}`);
            return;
        }
        
        const lines = stdout.trim().split("\n");
        if (lines.length === 0) {
            console.log(`Aucun processus trouvé sur le port ${port}`);
            return;
        }

        lines.forEach(line => {
            const processInfo = line.trim().split(/\s+/);
            const processId = processInfo[processInfo.length - 1];

            if (processId) {
                psTree(parseInt(processId), (err, children) => {
                    if (err) {
                        // console.error(`Erreur lors de la recherche des processus enfants : ${err}`);
                        return;
                    }

                    exec(`taskkill /PID ${processId} /T /F`, (err, stdout, stderr) => {
                        if (err) {
                            // console.error(`Erreur lors de la tentative de tuer le processus principal : ${err}`);
                            return;
                        }

                        children.forEach((child) => {
                            exec(`taskkill /PID ${child.PID} /T /F`, (err, stdout, stderr) => {
                                if (err) {
                                    // console.error(`Erreur lors de la tentative de tuer le processus enfant : ${err}`);
                                    return;
                                }
                            });
                        });
                    });
                });
            }
        });
    });
}

// Appeler la fonction pour tuer les processus sur le port 80
killProcess(80);
