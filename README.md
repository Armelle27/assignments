# assignments
***
  Nous avons réaliser une application de gestion des assignments qui permet de manière basique de faire du CRUD
  
  
  
 # Détails du travail
 ***
 
  Nous avons créé deux composants principaux :
  - celui qui gère l'ajout,la suppression et la modification de tous les assignements ainsi que l'affichage des assignments rendus
  - Celui qui gère l'affichage des assignments non rendus
  
  Donc nous avons donc trois trois composants fils : 
  - add-assignment
  - assignement-détail
  - edit-assignment

  Nous avons un dossier shared qui renferme :
  - les services partagés par les composants 
    - le service d'authentification
    - le service des composants principaux 
  
  Nous avons modifier l'api de connexion à la base de données pour ajouer les nouveaux attributs de la classe assignments


# Processus pour faire tourner l'application

## Pour l'API ( ne pas oublier de changer les données de connexion dans le fichier server.js)
saisir dans le terminal : npm install
ensuite : npm start

## Pour l'application

saisir dans le terminal : npm install
ensuite : ng serve


# l'application est hebergé sur heroku aussi

- https://heroku-assigment.herokuapp.com/






