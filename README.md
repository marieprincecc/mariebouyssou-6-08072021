# mariebouyssou-6-08072021

#Piquante#

Dans le repertoire "backend" lancé la commande `npm install`.
Démarrer nodemon pour lancer le serveur (`localhost` port `3000` par defaut). Rechargera automatiquement en cas de modification.

Utilisé une base de donnée MongoDb, toujours dans le dossier "backend" créer un dossier "environement" . Dans le dossier "environement" créer deux fichiers: "bdd.js" et "keys.js"

 #modèle du fichier "bdd.js"#

    const name = 'nom d'utilisateur de la base de donnée';
    const mdp = 'Mot de passe';
    const cluster = 'nom du cluster';
    const bdd = 'nom de la base de donnée';

    exports.name = name;
    exports.mdp = mdp;
    exports.cluster = cluster;
    exports.bdd = bdd; 

  #modèle du fichier "keys.js"#

    const key = 'maCléSecrete';
    const tokenKey = 'TOKEN_KEY';

    exports.key = key;
    exports.tokenKey = tokenKey;