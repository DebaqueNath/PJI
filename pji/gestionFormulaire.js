
					
					/* ======================================================= GESTION DES CHAMPS ET BLOCS ======================================================= */
					
					// Fonction ajout d'un element select
					function ajoutSelect(){	
						var selecteur = document.createElement("select");
						var option;
						var labels = "Peptide ID||Peptide Name||Category||Molecular weight||Status||Activity||Structure Type||Number of monomers||Containing monomer||Containing derivative of the monomer||Author||Title||Journal||Year||PMID||Organism Name||Bacteria Type";

						labels.split("||").forEach(function(item) {
							option = document.createElement("option");
							option.textContent = item;
							if(item=="Author"){
								option.value = "author";
							} else if(item=="Title"){
								option.value = "title";
							} else if(item=="Journal"){
								option.value = "source";
							} else if(item=="Year"){
								option.value = "date";
							} else if(item=="PMID"){
								option.value = "pmid";
							}
							selecteur.appendChild(option);
						});
						
						selecteur.name = "champ"+(nbChamps+1);
						selecteur.id = "champ"+(nbChamps+1);
						
						selecteur.setAttribute("onchange", "modifChamp(this)");
				
						return selecteur;
					}
					
					// Fonction ajout d'un operateur AND,OR,AND NOT
					function ajoutOperateur(){
						var operateur = document.createElement("select");
						var option;
						var labels = "AND||OR||AND NOT";

						labels.split("||").forEach(function(item) {
							option = document.createElement("option");
							option.textContent = item;
							operateur.appendChild( option );
						});
						
						operateur.id = "separator"+(nbChamps+1);
						operateur.name = "separator"+(nbChamps+1);
						
						return operateur;
					}
					
					// Fonction ajout d'un input
					function ajoutInput(){
						var input = document.createElement("input");
	
						input.type = "text";
						input.name = "identifier";
						input.setAttribute("onchange", "modifValeur(this)"); 
						
						return input;
					}
					
					// Fonction ajout d'un bouton plus
					function ajoutBoutonPlus(){
						var plus = document.createElement("input");
						plus.value="+";
						plus.type="button";
						plus.id="plusChamp";
						plus.setAttribute("onclick", "ajoutChamp(this)"); 
						
						return plus;
					}
					
					// Fonction ajout d'un bouton moins
					function ajoutBoutonMoins(i){
						var moins = document.createElement("input");
						moins.value="-";
						moins.type="button";
						moins.id="moins"+i;
						moins.setAttribute("name", i);
						moins.setAttribute("onclick", "supprChamp(this)"); 
						
						return moins;
					}
					
					// Fonction ajout d'un bloc
					function ajoutDivBloc(){
						var div = document.createElement("div");

						div.setAttribute("class", "bloc");
						div.setAttribute("name", nbBlocs+1);
						div.id = "bloc"+(nbBlocs+1);
						
						div.appendChild(ajoutOperateur());
						div.appendChild(ajoutSelect());
						div.appendChild(ajoutInput());
						div.appendChild(ajoutBoutonPlus());
						div.appendChild(ajoutBoutonGroup());
						div.appendChild(ajoutBoutonRemove(nbBlocs+1));
							
						return div;
					}
					
					// Fonction ajout d'un bouton d'ajout d'un bloc
					function ajoutBoutonGroup(){
						var plus = document.createElement("input");
						plus.value="group";
						plus.type="button";
						plus.id="plusBloc";
						plus.setAttribute("onclick", "ajoutBloc(this)"); 
						
						return plus;	
					}
					
					// Fonction ajout d'un bouton de suppression d'un bloc
					function ajoutBoutonRemove(i){
						var moins = document.createElement("input");
						moins.value="removeBloc";
						moins.type="button";
						moins.id="moinsBloc"+ i;
						moins.setAttribute("name", i);
						moins.setAttribute("onclick", "supprBloc(this)"); 
						
						return moins;
					}
					

					//Fonction qui ajoute un bloc (div) et un champ dans le bloc
					function ajoutBloc(champ){
						//On ajoute une div avec un separateur pour le bloc - On ajoute egalement un bouton 'removeBloc' pour chaque bloc
						$(champ).prev().before(ajoutDivBloc());
						
						//On ajoute egalement un bouton - pour chaque champ
						if(nbChamps == 1){
							//On doit ajouter 2 boutons
							$('#champ'+nbChamps+'').next().after(ajoutBoutonMoins(nbChamps));
						} 
						$('#champ'+(nbChamps+1)+'').next().after(ajoutBoutonMoins(nbChamps+1));		
						
							
						nbChamps++;
						nbBlocs++;
						
						//On cree une instance du champ qu'on ajoute dans notre tableau de champs
						champsTab[nbChamps-1] = new Champ("Peptide ID","text","");
						modifChamp(document.getElementById("champ"+nbChamps));
						
					}
					
					//Fonction qui supprime un bloc et ses champs
					function supprBloc(bloc){
						
						//On doit supprimer chaque champ du bloc
						//On parcours chaque element enfant du bloc, si on tombe sur un champ, on le supprime, si on tombe sur un bloc, on appelle récursivement la fonction de suppression du bloc
						$('#bloc'+bloc.name+' > *').each( function(){					
							if($(this).val() == "-"){
								//On supprime le champ
								supprChamp(document.getElementById('moins'+$(this).attr('name')));
							} else if($(this).attr('class') == "bloc"){
								supprBloc(document.getElementById('moinsBloc'+$(this).attr('name')));
							}
						} );
						
						
						//Lors de la suppression, on doit décaler les blocs				
						for(var i = parseInt(bloc.name)+1; i < nbBlocs+1 ; i++){
							$('#bloc'+i+'').attr("name",(i-1));
							$('#bloc'+i+'').attr("id","bloc"+(i-1));
							$('#moinsBloc'+i+'').attr("name",(i-1));
							$('#moinsBloc'+i+'').attr("id","moinsBloc"+(i-1));						
						}	

						
						//On supprime enfin le bloc (la div)
						//Le bloc correspondant au bouton remove cliqué
						$('#bloc'+bloc.name+'').remove();
						
						nbBlocs--;
					}
					
						
						
					//Fonction qui ajoute un champ (label + text) grace au bouton "+"	
					function ajoutChamp(champ){
						
						//On ajoute une div "item" avec un operateur, un select, un input et le bouton "moins" associé
						var item = document.createElement("div");
						item.setAttribute("class","item");
						item.appendChild(ajoutOperateur());
						item.appendChild(ajoutSelect());
						item.appendChild(ajoutInput());
					
						$(champ).before(item);


						//On ajoute egalement un bouton - pour chaque champ
						if(nbChamps == 1){
							//On doit ajouter 2 boutons
							$('#champ'+nbChamps+'').next().after(ajoutBoutonMoins(nbChamps));
						} 
						$('#champ'+(nbChamps+1)+'').next().after(ajoutBoutonMoins(nbChamps+1));	
				
						nbChamps++;
						
						//On cree une instance du champ qu'on ajoute dans notre tableau de champs

						champsTab[nbChamps-1] = new Champ("Peptide ID","text","");
						modifChamp(document.getElementById("champ"+nbChamps));
					}
					
					
					
					//Fonction qui supprime un champ (label + text) grace au bouton "-"	
					function supprChamp(champ){
						
						if(champ.name != 1){
							$('#champ'+champ.name+'').parent().remove();
						}
						$('#champ'+champ.name+'').next().remove();
						$('#champ'+champ.name+'').remove();
						$('#separator'+champ.name+'').remove();
						$(champ).remove();

						//Lors de la suppression, on doit décaler les champs					
						for(var i = parseInt(champ.name); i < nbChamps+1 ; i++){
							
							$('#champ'+i+'').attr("name","champ"+(i-1));
							$('#champ'+i+'').attr("id","champ"+(i-1));
							$('#moins'+i+'').attr("name",(i-1));
							$('#moins'+i+'').attr("id","moins"+(i-1));
							$('#separator'+i+'').attr("name","separator"+(i-1));
							$('#separator'+i+'').attr("id","separator"+(i-1));
							
							
							//On decale les champs dans notre tableau de champs
							champsTab[i-1] = champsTab[i];
						}	
						
						//On supprime le dernier bouton - et le dernier separator, pour qu'on ait toujours un champ
						if(nbChamps == 2){
							$('#moins'+1).remove();
						}
						
						//Si on a un separator1, on le supprime
						$('#separator1').remove();
						
						nbChamps--;
											
					}
					
					
					/**-------------------------- Fonction de création des inputs --------------------------------- **/
					
					//Création d'un input text, utilisé par : id,name,containing monomer, containing derivative monomer,author,title,source,date,pmid,organism name
					function createText(name){
						var input = document.createElement("input");
	
						input.type = "text";
						input.name = name;
						input.setAttribute("onchange", "modifValeur(this)"); 
						
						return input;
					}
					
					//Création d'une checkbox, utilisé par :  category,activity,structure type
					function createCheckbox(name){
						var table = document.createElement("table");
				
						//En fonction du name on choisis le nombre de colonnes et de lignes
						if(name=="category"){
							var ligne1 = table.insertRow(-1);
							var ligne2 = table.insertRow(-1);
							var colonnes = new Array();
							colonnes[0] = ligne1.insertCell(0);
							colonnes[1] = ligne1.insertCell(1);
							colonnes[2] = ligne1.insertCell(2);
							colonnes[3] = ligne1.insertCell(3);
							colonnes[4] = ligne2.insertCell(0);
							colonnes[5] = ligne2.insertCell(1);
							
							var input1 = document.createElement("input");
							input1.type = "checkbox";
							input1.name = name;
							input1.setAttribute("onchange", "modifValeur(this)"); 
							input1.setAttribute("value", "glycopeptide");
							colonnes[0].appendChild(input1);
							colonnes[0].innerHTML += "glycopeptide";
							
							var input2 = document.createElement("input");
							input2.type = "checkbox";
							input2.name = name;
							input2.setAttribute("onchange", "modifValeur(this)"); 
							input2.setAttribute("value", "lipopeptide");
							colonnes[1].appendChild(input2);
							colonnes[1].innerHTML += "lipopeptide";
							
							var input3 = document.createElement("input");
							input3.type = "checkbox";
							input3.name = name;
							input3.setAttribute("onchange", "modifValeur(this)"); 
							input3.setAttribute("value", "peptaibol");
							colonnes[2].appendChild(input3);
							colonnes[2].innerHTML += "peptaibol";
							
							var input4 = document.createElement("input");
							input4.type = "checkbox";
							input4.name = name;
							input4.setAttribute("onchange", "modifValeur(this)"); 
							input4.setAttribute("value", "chromopeptide");
							colonnes[3].appendChild(input4);
							colonnes[3].innerHTML += "chromopeptide";
							
							var input5 = document.createElement("input");
							input5.type = "checkbox";
							input5.name = name;
							input5.setAttribute("onchange", "modifValeur(this)"); 
							input5.setAttribute("value", "peptide");
							colonnes[4].appendChild(input5);
							colonnes[4].innerHTML += "peptide";
							
							var input6 = document.createElement("input");
							input6.type = "checkbox";
							input6.name = name;
							input6.setAttribute("onchange", "modifValeur(this)"); 
							input6.setAttribute("value", "PK-NRP");
							colonnes[5].appendChild(input6);	
							colonnes[5].innerHTML += "PK-NRP";
							
						} else if(name=="activity"){
							
							var ligne1 = table.insertRow(-1);
							var ligne2 = table.insertRow(-1);
							var ligne3 = table.insertRow(-1);
							
							var colonnes = new Array();
							colonnes[0] = ligne1.insertCell(0);
							colonnes[1] = ligne1.insertCell(1);
							colonnes[2] = ligne1.insertCell(2);
							colonnes[3] = ligne1.insertCell(3);
							colonnes[4] = ligne2.insertCell(0);
							colonnes[5] = ligne2.insertCell(1);
							colonnes[6] = ligne2.insertCell(2);
							colonnes[7] = ligne2.insertCell(3);
							colonnes[8] = ligne3.insertCell(0);
							colonnes[9] = ligne3.insertCell(1);
							colonnes[10] = ligne3.insertCell(2);
							colonnes[11] = ligne3.insertCell(3);
							
							var input1 = document.createElement("input");
							input1.type = "checkbox";
							input1.name = name;
							input1.setAttribute("onchange", "modifValeur(this)"); 
							input1.setAttribute("value", "antitumor");
							colonnes[0].appendChild(input1);
							colonnes[0].innerHTML += "antitumor";
							
							var input2 = document.createElement("input");
							input2.type = "checkbox";
							input2.name = name;
							input2.setAttribute("onchange", "modifValeur(this)"); 
							input2.setAttribute("value", "unknown");
							colonnes[1].appendChild(input2);
							colonnes[1].innerHTML += "unknown";
							
							var input3 = document.createElement("input");
							input3.type = "checkbox";
							input3.name = name;
							input3.setAttribute("onchange", "modifValeur(this)"); 
							input3.setAttribute("value", "antibiotic");
							colonnes[2].appendChild(input3);
							colonnes[2].innerHTML += "antibiotic";
							
							var input4 = document.createElement("input");
							input4.type = "checkbox";
							input4.name = name;
							input4.setAttribute("onchange", "modifValeur(this)"); 
							input4.textContent = "antithrombotic";
							input4.setAttribute("value", "antithrombotic");
							colonnes[3].appendChild(input4);
							colonnes[3].innerHTML += "antithrombotic";
							
							var input5 = document.createElement("input");
							input5.type = "checkbox";
							input5.name = name;
							input5.setAttribute("onchange", "modifValeur(this)"); 
							input5.textContent = "calmodulin antagonist";
							input5.setAttribute("value", "calmodulin antagonist");
							colonnes[4].appendChild(input5);
							colonnes[4].innerHTML += "calmodulin antagonist";
							
							var input6 = document.createElement("input");
							input6.type = "checkbox";
							input6.name = name;
							input6.setAttribute("onchange", "modifValeur(this)"); 
							input6.textContent = "siderophore";
							input6.setAttribute("value", "siderophore");
							colonnes[5].appendChild(input6);
							colonnes[5].innerHTML += "siderophore";							
							
							var input7 = document.createElement("input");
							input7.type = "checkbox";
							input7.name = name;
							input7.setAttribute("onchange", "modifValeur(this)"); 
							input7.textContent = "protease inhibitor";
							input7.setAttribute("value", "protease inhibitor");
							colonnes[6].appendChild(input7);
							colonnes[6].innerHTML += "protease inhibitor";
							
							var input8 = document.createElement("input");
							input8.type = "checkbox";
							input8.name = name;
							input8.setAttribute("onchange", "modifValeur(this)"); 
							input8.textContent = "toxin";
							input8.setAttribute("value", "toxin");
							colonnes[7].appendChild(input8);
							colonnes[7].innerHTML += "toxin";
							
							var input9 = document.createElement("input");
							input9.type = "checkbox";
							input9.name = name;
							input9.setAttribute("onchange", "modifValeur(this)"); 
							input9.textContent = "surfactant";
							input9.setAttribute("value", "surfactant");
							colonnes[8].appendChild(input9);
							colonnes[8].innerHTML += "surfactant";
							
							var input10 = document.createElement("input");
							input10.type = "checkbox";
							input10.name = name;
							input10.setAttribute("onchange", "modifValeur(this)"); 
							input10.textContent = "immunomodulating";
							input10.setAttribute("value", "immunomodulating");
							colonnes[9].appendChild(input10);
							colonnes[9].innerHTML += "immunomodulating";
							
							var input11 = document.createElement("input");
							input11.type = "checkbox";
							input11.name = name;
							input11.setAttribute("onchange", "modifValeur(this)"); 
							input11.textContent = "antiatherogenic";
							input11.setAttribute("value", "antiatherogenic");
							colonnes[10].appendChild(input11);
							colonnes[10].innerHTML += "antiatherogenic";
							
							var input12 = document.createElement("input");
							input12.type = "checkbox";
							input12.name = name;
							input12.setAttribute("onchange", "modifValeur(this)"); 
							input12.textContent = "antiinflammatory";
							input12.setAttribute("value", "antiinflammatory");
							colonnes[11].appendChild(input12);
							colonnes[11].innerHTML += "antiinflammatory";
							
						} else if(name=="structureType"){
							var ligne1 = table.insertRow(-1);
							var ligne2 = table.insertRow(-1);
							var colonnes = new Array();
							colonnes[0] = ligne1.insertCell(0);
							colonnes[1] = ligne1.insertCell(1);
							colonnes[2] = ligne1.insertCell(2);
							colonnes[3] = ligne1.insertCell(3);
							colonnes[4] = ligne2.insertCell(0);
							colonnes[5] = ligne2.insertCell(1);
							
							var input1 = document.createElement("input");
							input1.type = "checkbox";
							input1.name = name;
							input1.setAttribute("onchange", "modifValeur(this)"); 
							input1.textContent = "cyclic";
							input1.setAttribute("value", "cyclic");
							colonnes[0].appendChild(input1);
							colonnes[0].innerHTML += "cyclic";
							
							var input2 = document.createElement("input");
							input2.type = "checkbox";
							input2.name = name;
							input2.setAttribute("onchange", "modifValeur(this)"); 
							input2.textContent = "linear";
							input2.setAttribute("value", "linear");
							colonnes[1].appendChild(input2);
							colonnes[1].innerHTML += "linear";
							
							var input3 = document.createElement("input");
							input3.type = "checkbox";
							input3.name = name;
							input3.setAttribute("onchange", "modifValeur(this)"); 
							input3.textContent = "double cyclic";
							input3.setAttribute("value", "double cyclic");
							colonnes[2].appendChild(input3);
							colonnes[2].innerHTML += "double cyclic";
							
							var input4 = document.createElement("input");
							input4.type = "checkbox";
							input4.name = name;
							input4.setAttribute("onchange", "modifValeur(this)"); 
							input4.textContent = "branched";
							input4.setAttribute("value", "branched");
							colonnes[3].appendChild(input4);
							colonnes[3].innerHTML += "branched";
							
							var input5 = document.createElement("input");
							input5.type = "checkbox";
							input5.name = name;
							input5.setAttribute("onchange", "modifValeur(this)"); 
							input5.textContent = "partial cyclic";
							input5.setAttribute("value", "partial cyclic");
							colonnes[4].appendChild(input5);
							colonnes[4].innerHTML += "partial cyclic";
							
							var input6 = document.createElement("input");
							input6.type = "checkbox";
							input6.name = name;
							input6.setAttribute("onchange", "modifValeur(this)"); 
							input6.textContent = "other";
							input6.setAttribute("value", "other");
							colonnes[5].appendChild(input6);
							colonnes[5].innerHTML += "other";
						} 
						
						return table;
					}
					
					//Fonctions de création du sliders
					function createSlider1(){
						var input = document.createElement("input");
	
						input.type = "text";
						input.setAttribute("class", "amountMin"); 
						input.name = "molecularWeight1";
						input.setAttribute("onchange", "modifValeur(this)"); 
						
						return input;
					}
					
					function createSlider2(){
						var input = document.createElement("input");
	
						input.type = "text";
						input.setAttribute("class", "amountMax"); 
						input.name = "molecularWeight2";
						input.setAttribute("onchange", "modifValeur(this)"); 
						
						return input;		
					}
					
					function createSlider3(){
						var div = document.createElement("div");
						div.setAttribute("class","slider");
						//On ajoute les deux inputs dans la div
						div.appendChild(createSlider1());
						div.appendChild(createSlider2());
						
						var div2 = document.createElement("div");
						div2.setAttribute("class","slider2");
						
						div.appendChild(div2);
						
						return div;
					}
					
					//Fonction de création pour nombre de monomers (select + input)
					function createSelectInput(){
						var div = document.createElement("div");
						div.id = "nb";
						
						var select = document.createElement("select");
						var option;
						var labels = ">||<||=";

						labels.split("||").forEach(function(item) {
							option = document.createElement("option");
							option.textContent = item;
							option.value = item;
							select.appendChild( option );
						});
						
						select.setAttribute("name", "nbMonoChooser"); 
						select.setAttribute("onchange", "modifValeur(this)"); 
				
						var input = document.createElement("input");
						input.type = "text";
						input.name = "nbMonomers";
						input.setAttribute("onchange", "modifValeur(this)"); 
						
						div.appendChild(select);
						div.appendChild(input);
			
						return div;
					}
					
							
					//Fonction de création d'un champ select
					function createSelect(name){
						if(name=="status"){
							var select = document.createElement("select");
							var option;
							var labels = "all||curated||putative";

							labels.split("||").forEach(function(item) {
								option = document.createElement("option");
								option.textContent = item;
								option.value = item;
								select.appendChild( option );
							});
							
							select.setAttribute("name", name); 
							select.setAttribute("onchange", "modifValeur(this)"); 
							
						} else if(name=="bacteria"){
							var select = document.createElement("select");
							var option;
							var labels = "none||positive||negative";

							labels.split("||").forEach(function(item) {
								option = document.createElement("option");
								option.textContent = item;
								option.value = item;
								select.appendChild( option );
							});
							
							select.setAttribute("name", name); 
							select.setAttribute("onchange", "modifValeur(this)"); 
						}
						
						return select;
					}
					
					
					
					
					//Fonction appeler lorsqu'un champ est modifié, on change les input
					function modifChamp(champ){
						
						//On supprime l'élément suivant le select, puis on le recrée en fonction de la valeur du select

						//On met a jour le nom du champ dans notre tableau de champs
						var split = champ.id.split('p');					
						champsTab[split[1] - 1].name = champ.value;
						
						//En fonction de champ.value -> on modifie alors le type du champ avec ses valeurs
						if(champ.value == "Peptide ID"){
							//Suppression du champ suivant le select
							$(champ).next().remove();
							//Creation du nouvel input
							$(champ).after(createText("identifier"));
							//On met a jour le type du champ dans notre tableau de champs
							champsTab[split[1] - 1].type = "id";
							//On met à jour la valeur du champ dans notre tableau de champs
							champsTab[split[1] - 1].valeur = "";
							//On change le name du champ
							$(champ).attr("name","champ"+split[1]);
							
						} else if(champ.value == "Peptide Name"){
							//Suppression du champ suivant le select
							$(champ).next().remove();
							//Creation du nouvel input
							$(champ).after(createText("name"));
							//On met a jour le type du champ dans notre tableau de champs
							champsTab[split[1] - 1].type = "name";
							//On met à jour la valeur du champ dans notre tableau de champs
							champsTab[split[1] - 1].valeur = "";
							//On change le name du champ
							$(champ).attr("name","champ"+split[1]);
							
						} else if(champ.value == "Category"){		
							//Suppression du champ suivant le select
							$(champ).next().remove();
							//Creation du nouvel input
							$(champ).after(createCheckbox("category"));
							//On met a jour le type du champ dans notre tableau de champs
							champsTab[split[1] - 1].type = "category";
							//On met à jour la valeur du champ dans notre tableau de champs
							champsTab[split[1] - 1].valeur = "";
							//On change le name du champ
							$(champ).attr("name","champ"+split[1]);								
								
						} else if(champ.value == "Molecular weight"){
							//Suppression du champ suivant le select
							$(champ).next().remove();
							//Création de la div slider
							$(champ).after(createSlider3());
							//Creation du slider
							$(".slider2").slider({
								  range: true,
								  min: 270,
								  max: 5033,
								  values: [270,5033],
								  slide: function( event, ui ) {
									$(this).parent().find(".amountMin").val(ui.values[ 0 ]);
									$(this).parent().find(".amountMax").val(ui.values[ 1 ]);
									
									//Si voisin suivant
									if (ui.handle.nextSibling) {
										// Moving LEFT slider ...
										modifValeur(ui.handle.nextSibling.parentNode.previousSibling.previousSibling);
									} else {
										// Moving RIGHT slider ...
										modifValeur(ui.handle.previousSibling.parentNode.previousSibling);
									}	
									
								  },
							});
								
							$(".amountMin").val($(".slider2").slider( "values", 0 ));
							$(".amountMax").val($(".slider2").slider( "values", 1 ));		
							//On met a jour le type du champ dans notre tableau de champs
							champsTab[split[1] - 1].type = "mw";
							//On met à jour la valeur du champ dans notre tableau de champs
							champsTab[split[1] - 1].valeur = new Array(2);					
							champsTab[split[1] - 1].valeur[0] = $(".slider2").slider( "values", 0 );
							champsTab[split[1] - 1].valeur[1] = $(".slider2").slider( "values", 1 );
							//On change le name du champ
							$(champ).attr("name","champ"+split[1]);
							
						} else if(champ.value == "Containing monomer"){
							//Suppression du champ suivant le select
							$(champ).next().remove();
							//Creation du nouvel input
							$(champ).after(createText("containsMono"));
							//On met a jour le type du champ dans notre tableau de champs
							champsTab[split[1] - 1].type = "composition";
							//On met à jour la valeur du champ dans notre tableau de champs
							champsTab[split[1] - 1].valeur = "";
							//On change le name du champ
							$(champ).attr("name","champ"+split[1]);
							
						} else if(champ.value == "Containing derivative of the monomer"){
							//Suppression du champ suivant le select
							$(champ).next().remove();
							//Creation du nouvel input
							$(champ).after(createText("derivateMono"));
							//On met a jour le type du champ dans notre tableau de champs
							champsTab[split[1] - 1].type = "graph";
							//On met à jour la valeur du champ dans notre tableau de champs
							champsTab[split[1] - 1].valeur = "";
							//On change le name du champ
							$(champ).attr("name","champ"+split[1]);
							
						} else if(champ.value == "Number of monomers"){
							//Suppression du champ suivant le select
							$(champ).next().remove();
							//Creation du nouvel input
							$(champ).after(createSelectInput());
							//On met a jour le type du champ dans notre tableau de champs
							champsTab[split[1] - 1].type = "size";
							//On met à jour la valeur du champ dans notre tableau de champs
							champsTab[split[1] - 1].valeur = new Array(2);
							champsTab[split[1] - 1].valeur[0] = "<";
							champsTab[split[1] - 1].valeur[1] = "";
							//On change le name du champ
							$(champ).attr("name","champ"+split[1]);
							
						} else if(champ.value == "Activity") {
							//Suppression du champ input suivant le select
							$(champ).next().remove();
							//Creation du nouvel input
							$(champ).after(createCheckbox("activity"));
							//On met a jour le type du champ dans notre tableau de champs
							champsTab[split[1] - 1].type = "activity";
							//On met à jour la valeur du champ dans notre tableau de champs
							champsTab[split[1] - 1].valeur = "";
							//On change le name du champ
							$(champ).attr("name","champ"+split[1]);
							
						} else if(champ.value == "Structure Type") {
							//Suppression du champ input suivant le select
							$(champ).next().remove();
							//Creation du nouvel input
							$(champ).after(createCheckbox("structureType"));
							//On met a jour le type du champ dans notre tableau de champs
							champsTab[split[1] - 1].type = "type";
							//On met à jour la valeur du champ dans notre tableau de champs
							champsTab[split[1] - 1].valeur = "";
							//On change le name du champ
							$(champ).attr("name","champ"+split[1]);
							
						} else if(champ.value == "Status") {
							//Suppression du champ suivant le select
							$(champ).next().remove();
							//Creation du nouvel input
							$(champ).after(createSelect("status"));
							//On met a jour le type du champ dans notre tableau de champs
							champsTab[split[1] - 1].type = "status";
							//On met à jour la valeur du champ dans notre tableau de champs
							champsTab[split[1] - 1].valeur = "";
							//On change le name du champ
							$(champ).attr("name","champ"+split[1]);
							
						} else if(champ.value == "author") {
							//Suppression du champ suivant le select
							$(champ).next().remove();
							//Creation du nouvel input
							$(champ).after(createText("author"));
							//On met a jour le type du champ dans notre tableau de champs
							champsTab[split[1] - 1].type = "author";
							//On met à jour la valeur du champ dans notre tableau de champs
							champsTab[split[1] - 1].valeur = "";
							//On change le name du champ
							$(champ).attr("name","champ"+split[1]);
							
						} else if(champ.value == "title") {
							//Suppression du champ suivant le select
							$(champ).next().remove();
							//Creation du nouvel input
							$(champ).after(createText("title"));
							//On met a jour le type du champ dans notre tableau de champs
							champsTab[split[1] - 1].type = "title";
							//On met à jour la valeur du champ dans notre tableau de champs
							champsTab[split[1] - 1].valeur = "";
							//On change le name du champ
							$(champ).attr("name","champ"+split[1]);
							
						} else if(champ.value == "source") {
							//Suppression du champ suivant le select
							$(champ).next().remove();
							//Creation du nouvel input
							$(champ).after(createText("source"));
							//On met a jour le type du champ dans notre tableau de champs
							champsTab[split[1] - 1].type = "source";
							//On met à jour la valeur du champ dans notre tableau de champs
							champsTab[split[1] - 1].valeur = "";
							//On change le name du champ
							$(champ).attr("name","champ"+split[1]);
							
						} else if(champ.value == "date") {
							//Suppression du champ suivant le select
							$(champ).next().remove();
							//Creation du nouvel input
							$(champ).after(createText("date"));
							//On met a jour le type du champ dans notre tableau de champs
							champsTab[split[1] - 1].type = "date";
							//On met à jour la valeur du champ dans notre tableau de champs
							champsTab[split[1] - 1].valeur = "";
							//On change le name du champ
							$(champ).attr("name","champ"+split[1]);
							
						} else if(champ.value == "pmid") {
							//Suppression du champ suivant le select
							$(champ).next().remove();
							//Creation du nouvel input
							$(champ).after(createText("pmid"));
							//On met a jour le type du champ dans notre tableau de champs
							champsTab[split[1] - 1].type = "pmid";
							//On met à jour la valeur du champ dans notre tableau de champs
							champsTab[split[1] - 1].valeur = "";
							//On change le name du champ
							$(champ).attr("name","champ"+split[1]);
							
						} else if(champ.value == "Organism Name"){
							//Suppression du champ suivant le select
							$(champ).next().remove();
							//Creation du nouvel input
							$(champ).after(createText("organism"));
							//On met a jour le type du champ dans notre tableau de champs
							champsTab[split[1] - 1].type = "organism";
							//On met à jour la valeur du champ dans notre tableau de champs
							champsTab[split[1] - 1].valeur = "";
							//On change le name du champ
							$(champ).attr("name","champ"+split[1]);
							
						} else if(champ.value == "Bacteria Type"){
							//Suppression du champ suivant le select
							$(champ).next().remove();
							//Creation du nouvel input
							$(champ).after(createSelect("bacteria"));
							//On met a jour le type du champ dans notre tableau de champs
							champsTab[split[1] - 1].type = "bacteria";
							//On met à jour la valeur du champ dans notre tableau de champs
							champsTab[split[1] - 1].valeur = "";
							//On change le name du champ
							$(champ).attr("name","champ"+split[1]);
						}
						
						//On lance la fonction d'autocomplete sur le champ correspondant
						autocompletion(champ);
					}
								

					//Fonction appele quand une valeur d'un champ est modifie
					function modifValeur(champ){	
											
						//On trouve le numero du champ et on met a jour sa valeur dans notre tableau de champs
						if(champ.name == "category" || champ.name == "activity" || champ.name == "structureType" ) {
							//Cas des checkbox
							var split = champ.parentNode.parentNode.parentNode.parentNode.previousSibling.id.split('p');
							var valeurs = [];
							$(champ.parentNode.parentNode.parentNode.parentNode).find("td input:checked").each(function() {
						 	 valeurs.push($(this).val())
							});
							champsTab[split[1] - 1].valeur = valeurs;
						} else if(champ.name == "status" || champ.name == "bacteria") {
							//Cas des listes
							var split = champ.previousSibling.id.split('p');
							champsTab[split[1] - 1].valeur = champ.value;
						} else if(champ.name == "identifier" || champ.name == "name" || champ.name == "containsMono" || champ.name == "derivateMono" || champ.name == "author" || champ.name == "title" || champ.name == "source" || champ.name == "date" || champ.name == "pmid" || champ.name == "organism"){
							//Cas de base - input text
							var split = champ.previousSibling.id.split('p');
							champsTab[split[1] - 1].valeur = champ.value;
						} else if(champ.name == "molecularWeight1"){
							//Cas des sliders
							var split = champ.parentNode.previousSibling.id.split('p');
							champsTab[split[1] - 1].valeur[0] = champ.value;
						} else if(champ.name == "molecularWeight2"){
							//Cas des sliders
							var split = champ.parentNode.previousSibling.id.split('p');
							champsTab[split[1] - 1].valeur[1] = champ.value;
						} else if(champ.name == "nbMonoChooser"){
							var split = champ.parentNode.previousSibling.id.split('p');
							champsTab[split[1] - 1].valeur[0] = champ.value;
						} else if(champ.name == "nbMonomers"){
							var split = champ.parentNode.previousSibling.id.split('p');
							champsTab[split[1] - 1].valeur[1] = champ.value;
						}					
											
					}
					
					
					//Fonction appele quand une valeur d'un champ est modifie via l'autocomplete
					function modifValeurNomChamp(nb,valeur,champ){					
						champsTab[nb].valeur = valeur;
					}

					
					
					//Au chargement de la page, on récupère les informations sur les peptides pour l'autocomplétion
					$(document).ready(function(){
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: 'peptides.json',
                            success: function(data){
									//Peptide Name
									getPeptides(data);	
                                }
                        }) 
						
						$.ajax({
                            type: "GET",
                            dataType: "json",
                            url: 'organism.json',
                            success: function(data){
									//Organism Name
									 getOrganism(data);	
                                }
                        }) 
						
						$.ajax({
                            type: "GET",
                            dataType: "json",
                            url: 'references.json',
                            success: function(data){
									//References
									getReferences(data);	
                                }
                        }) 
						
						$.ajax({
                            type: "GET",
                            dataType: "json",
                            url: 'authors.json',
                            success: function(data){
									//Authors
									getAuthors(data);	
                                }
                        }) 
						
						$.ajax({
                            type: "GET",
                            dataType: "json",
                            url: 'monomers.json',
                            success: function(data){
									//Monomers
									getMonomers(data);	
                                }
                        }) 
															
						//On appelle la fonction modifChamp sur notre champ de base du formulaire
						modifChamp(document.getElementById("champ1"));
					})
					
			