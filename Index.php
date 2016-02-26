
<!DOCTYPE html>
<html>
   <head>
       <meta charset="utf-8" />
       <title>Test jQuery</title>
	   <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
	  
	   <script type="text/javascript" src="http://code.jquery.com/jquery-2.2.0.min.js"></script>
	   <script type="text/javascript" src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
	
  
 
		<script>
						
  /*	Tous les champs possibles :
  
 general :
   - id : text  *
   - name : text  *
   - category : text * = Class
   - mw : text * = Molecular weight en g/mol
   - status : text *
   - activity : tab[text] *

structure :
   - type : text *
   - size : integer * = number of monomers
   - composition : text * = Monomer
   - graph : text * = derivative of the monomer

organism :
   - nameOrga : text * = Organism search :  http://bioinfo.lifl.fr/norine/rest/organism/json/all
   - gram : text * = Bacteria type (none, positive, negative)
   
reference (Tableau): http://bioinfo.lifl.fr/norine/rest/reference/json/all
   - pmid : text * = PMID
   - title : text * = title
   - date : integer * = year
   - source : text * = Journal
   - authors : tab[name] -> name : text * = author : http://bioinfo.lifl.fr/norine/rest/reference/author/json/all

*/



					//Variables globales
					//Tableau des peptides
					var peptidesTab = new Array(); //.push pour ajouter une peptide

					//Un objet Peptide - Constructeur
					function Peptide(id,name,category,mw,status,activity,type,size,composition,graph,organism,references){
						//Generral
						this.id = id;
						this.name = name;
						this.category = category;
						this.mw = mw; // Molecular weight en g/mol
						this.status = status;
						this.activityTab = activity; //Un tableau d'activites
						
						//Structure
						this.type = type;
						this.size = size; //Number of monomers
						this.composition = composition; // Monomers - separe par des virgules
						this.graph = graph; // Derivative of monomers - separe par des virgules
						
						//Tableau d'Organism
						this.organismTab = organism;
						
						//Tableau de References
						this.referencesTab = references;
						
					}
					
					//Un objet Organism - Constructeur
					function Organism(nameOrga,gram){
						this.nameOrga = nameOrga; //Organism name -> http://bioinfo.lifl.fr/norine/rest/organism/json/all
						this.gram = gram; //Bacteria Type -> none,positive,negative			
					}
					
			        
					
					function Reference(pmid,title,date,source,authors){
						this.pmid = pmid;
						this.title = title;
						this.date = date; //Year
						this.source = source;
						this.authors = authors; //Tableau d'auteurs avec leur noms					
					}

					
					function getInfos(data){
						for (var i=0; i<data.peptides.length; i++) {
							//On recupère les donnees de la peptide					
							var id = data.peptides[i].general.id;
							var name = data.peptides[i].general.name;
							var category = data.peptides[i].general.category;
							var mw = data.peptides[i].general.mw;
							var status = data.peptides[i].general.status;
							var activity = data.peptides[i].general.activity; //tableau d'activites
							var type = data.peptides[i].structure.type;
							var size = data.peptides[i].structure.size;
							var composition = data.peptides[i].structure.composition; 
							var graph = data.peptides[i].structure.graph; 
							
							//On cree le tableau d'organism
							var organism = new Array();
							for (var j=0; j<data.peptides[i].organism.length; j++) {
									//On cree un organisme qu'on ajoute a notre tableau d'organismes
									organism.push(new Organism(data.peptides[i].organism[j].nameOrga,data.peptides[i].organism[j].gram));
							}
							
							//On cree le tableau de references
							var references = new Array();
							for (var j=0; j<data.peptides[i].reference.length; j++) {
									//On cree une reference qu'on ajoute a notre tableau de references
									references.push(new Reference(data.peptides[i].reference[j].pmid,data.peptides[i].reference[j].title,data.peptides[i].reference[j].date,data.peptides[i].reference[j].source,data.peptides[i].reference[j].authors));
							}
							
							//Pour chaque peptide, on crée un objet peptide dans notre tableau de peptides
							peptidesTab[i] = new Peptide(id,name,category,mw,status,activity,type,size,composition,graph,organism,references);	
						}
					}	
					
					
					function autocompletion(champ){
						//On recupere les donnees du champ
						var list = new Array();
							console.log(champ == "Peptide ID");
						
							if(champ == "Peptide ID") {
								console.log("PEP ID");
								for (var i=0; i<peptidesTab.length; i++) {
									list.push(peptidesTab[i].id);
								}
							} else if(champ == "Peptide Name"){
								console.log("PEP NAME");
								for (var i=0; i<peptidesTab.length; i++) {
									list.push(peptidesTab[i].name);
								}
							} else {
								console.log("ELSE");
							}
							

						$("#norineName").autocomplete({
							source: list
						});
					}
						
										


					$(document).ready(function(){
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: 'test.json',
                            success: function(data){
									//On recupère toutes les informations pour chaque peptides qui sont stockee dans le tableau PeptidesTab
									getInfos(data);	

									//AFFICHAGE TEST en alert
									/*var affichage = "<p>";
									var i = 1000;
										affichage += " "+peptidesTab[i].id+" ";
										affichage += " "+peptidesTab[i].name+" ";
										affichage += " "+peptidesTab[i].category+" ";
										affichage += " "+peptidesTab[i].mw+" ";
										affichage += " "+peptidesTab[i].status+" ";
										affichage += " "+peptidesTab[i].activityTab+" ";
										affichage += " "+peptidesTab[i].type+" ";
										affichage += " "+peptidesTab[i].size+" ";
										affichage += " "+peptidesTab[i].composition+" ";
										affichage += " "+peptidesTab[i].graph+" ";
										
										//Le tableau d'organismes
										for (var j=0; j<peptidesTab[i].organismTab.length; j++) {
											affichage += " "+peptidesTab[i].organismTab[j].nameOrga+" ";
											affichage += " "+peptidesTab[i].organismTab[j].gram+" ";
										}
									
										//Le tableau de références
										for (var j=0; j<peptidesTab[i].referencesTab.length; j++) {
											affichage += " "+peptidesTab[i].referencesTab[j].pmid+" ";
											affichage += " "+peptidesTab[i].referencesTab[j].title+" ";
											affichage += " "+peptidesTab[i].referencesTab[j].date+" ";
											affichage += " "+peptidesTab[i].referencesTab[j].source+" ";
											
											//Tableau d'auteurs
											for (var k=0; k<peptidesTab[i].referencesTab[j].authors.length; k++) {
												affichage += " "+peptidesTab[i].referencesTab[j].authors[k].name+" ";
											}
										}
										
										affichage += "</p>";
									
									alert(affichage);	*/

									
									
									
									//Lorsqu'on change le select
									$('#decision').change(function () {
										var t =  $("#decision option:selected").text();
										//On lance la fonction d'autocomplete sur le champ correspondant
										console.log("Autocompletion sur "+ t);
										autocompletion(t);
									})
									.trigger('change');
									
                                }
                        }) 
					})
					
</script>
					
					
   </head>
   <body>
   

 
	<form>
		<select name="decision" id="decision">
			<option selected>Peptide ID
			<option>Peptide Name
			<option>Category
			<option>Molecular weight
			<option>Status
			<option>Activity
			<option>Type
			<option>Number of monomers
			<option>Monomer
			<option>Derivative of the monomer
			<option>Organism Search
			<option>Bacteria type
			<option>Reference PMID
			<option>Reference title
			<option>Reference year
			<option>Reference journal
			<option>Authors
		</select>
		
		<input type="text" id="norineName"/>
	</form>




	</body>
</html>

