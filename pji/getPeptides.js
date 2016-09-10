
					//-------------------------------------------------------------------------

					//Variables globales
					
					var peptidesName = new Array();
					var peptidesMonomer = new Array();
					var authors = new Array();
					var titles = new Array();
					var sources = new Array();
					var years = new Array();
					var pmids = new Array();
					var organisms = new Array();			

					//Nombre de champs dans le formulaire
					var nbChamps = 1;
					//Nombre de blocs dans le formulaire
					var nbBlocs = 0;
					
					
					//Liste des champs presents sur le formulaire
					var champsTab = new Array();
					
					//Au depart, on a un champ 'Peptide ID' de type text et vide
					champsTab[0] = new Champ("Peptide ID","text","");
					
					//Un objet Champ - Correspondant à un champ ajoute dans le formulaire
					function Champ(name,type,valeur){
						this.name = name; //string
						this.type = type; //string correspondant aux attributs de la classe Peptide
						this.valeur = valeur; //Valeur du champ
					}
					
					
					/* ======================================================= PEPTIDE GESTION ======================================================= */
					
					//Fonction récupérant les noms de toutes les peptides grâce aux informations du fichier JSON : http://bioinfo.lifl.fr/norine/rest/name/json/all
					function getPeptides(data){
						for (var i=0; i<data.peptides.length; i++) {
							//On recupère les donnees de la peptide					
							peptidesName[i] = data.peptides[i].general.name;
						}
					}
					
					//Fonction récupérant les noms de tout les organismes grâce aux informations du fichier JSON : http://bioinfo.lifl.fr/norine/rest/organism/json/all
					function getOrganism(data){
						for (var i=0; i<data.length; i++) {
							//On recupère les donnees de la peptide					
							organisms[i] = data[i];
						}					
					}
					
					//Fonction récupérant les noms de tout les auteurs grâce aux informations du fichier JSON : http://bioinfo.lifl.fr/norine/rest/reference/author/json/all
					function getAuthors(data){
						for (var i=0; i<data.length; i++) {
							//On recupère les donnees de la peptide					
							authors[i] = data[i];
						}	
						
					}
					
					//Fonction récupérant les références (title,journal,year,pmid) grâce aux informations du fichier JSON : http://bioinfo.lifl.fr/norine/rest/reference/json/all
					function getReferences(data){
						for (var i=0; i<data.length; i++) {
							//On recupère les donnees de la peptide					
							titles[i] = data[i].title;
							sources[i] = data[i].source;
							years[i] = data[i].date+"";
							pmids[i] = data[i].pmid;								
						}	
						
					}
					
					//Fonction récupérant les monomers grâce aux informations du fichier JSON : http://bioinfo.lifl.fr/norine/rest/monomers/flat/json
					function getMonomers(data){
						for (var i=0; i<data.length; i++) {
							//On recupère les donnees de la peptide					
							peptidesMonomer[i] = data[i].code;
						}		
					}
					
					
			
					
					
					
					