# PJI
Développement d'une application web avancée en javascript

http://www.lifl.fr/~salson/pji-sdl/projet.php?id=68

Le formulaire : http://bioinfo.lifl.fr/norine/form.jsp
Exemple à réaliser : http://www.ncbi.nlm.nih.gov/pubmed/advanced

--------------------------- CHAMPS ET TYPES --------------------------------------

Norine ID : Text
Name : Text
Status : all,curated,putative
Activity : antitumor, unknown, antibiotic, antithrombotic, calmodulin antagonist, siderophore, protease inhibitor, toxin
           surfactant, immunomodulating, antiatherogenic, antiinflammatory
Class : glycopeptide, lipopeptide, peptaibol, chromopeptide, peptide, PK-NRP
Structure Type : cyclic, linear, double cyclic, branched, partial cyclic, other
Molecular weight : ranging between "Text" and "Text"
Number of monomers : <,>,= Integer
Containing the monomer : Text
Containing a derivative of the monomer : Text

Bibliography reference search :
author,title,journal,year,PMID : Text

Organism search : Text
by bacteria type : Gram : none,positive ou negative : List



---------------------------- FORMAT D'UNE PEPTIDE ---------------------------------------

http://bioinfo.lifl.fr/norine/rest/name/json/all

* : Recherche sur ce champ

peptides : 

cite : text

general :
   - id : text  *
   - name : text  *
   - family : text
   - syno : text
   - category : text * = Class
   - formula : text
   - mw : text * = Molecular weight en g/mol
   - comment : text
   - status : text *
   - activity : tab[text] *

structure :
   - type : text *
   - size : integer * = number of monomers
   - composition : text * = Monomer
   - graph : text * = derivative of the monomer
   - smiles : text

organism :
   - idOrga : integer
   - taxId : text
   - nameOrga : text * = Organism search :  http://bioinfo.lifl.fr/norine/rest/organism/json/all
   - taxonomy : text
   - gram : text * = Bacteria type (none, positive, negative)
   - synonym : text

reference (Tableau): http://bioinfo.lifl.fr/norine/rest/reference/json/all
   - idRef : integer
   - pmid : text * = PMID
   - title : text * = title
   - date : integer * = year
   - source : text * = Journal
   - location : text
   - authors : tab[name] -> name : text * = author : http://bioinfo.lifl.fr/norine/rest/reference/author/json/all


link (Tableau) :
  - name_db : text
  - acc : text

contributor :
  - name : text
  - affiliation : tab[text]
  - login : text

----------------------------------- TÂCHES ----------------------------------------------

 -> ListBox avec les champs + input
 -> En fonction du champ choisi, charger l'autocomplétion sur le input
 -> Lire "l'autocomplétion" dans un fichier JSON 

Paramètres pour l'autocomplétion :
https://openclassrooms.com/courses/decouvrez-la-puissance-de-jquery-ui/l-autocompletion-1


-> Récupérer les données du fichier JSON -> Les peptides sont stockés dans un tableaux de peptides avec les données qui peuvent être recherchés par les champs.
-> Créer un formulaire avec un champ à choisir
-> En fonction du champ choisi, lire les bonnes données et les afficher
-> Puis, faire l'autocomplétion pour le champ



------------------------ INFOS ----------------------------------------------------------

Voici les informations qui vont vous permettre de récupérer les données JSON pour l'auto-complétion des champs de recherche :

- tout d'abord, le lien http://bioinfo.lifl.fr/norine/service.jsp offre un certain nombre de service REST permettant de récupérer des données au format JSON (ou XML), 
- il y a aussi un lien qui n'est pas indiqué dans la doc, et qui permet d'obtenir la liste complète en JSON des peptides, 
avec les informations associées : http://bioinfo.lifl.fr/norine/rest/name/json/all -> le fichier JSON contient donc toutes les infos nécessaires (nom des peptides, activités, organismes...)

Il vous suffira donc de parser ce fichier afin de construire vos tableaux Javascript pour l'autocomplete.

Petite précision supplémentaire : 

Les liens suivants permettent d'obtenir le JSON (ou dans certains cas simplement un "array") des références, auteurs et nom d'organismes : 

- http://bioinfo.lifl.fr/norine/rest/reference/json/all
- http://bioinfo.lifl.fr/norine/rest/reference/author/json/all
- http://bioinfo.lifl.fr/norine/rest/organism/json/all

