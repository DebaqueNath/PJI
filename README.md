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


----------------------------------- TÂCHES ----------------------------------------------

 -> ListBox avec les champs + input
 -> En fonction du champ choisi, charger l'autocomplétion sur le input
 -> Lire "l'autocomplétion" dans un fichier JSON 

Paramètres pour l'autocomplétion :
https://openclassrooms.com/courses/decouvrez-la-puissance-de-jquery-ui/l-autocompletion-1
