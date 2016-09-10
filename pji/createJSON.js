
				
					
					//=================================================== CREATION DU JSON ================================================
					
					//Variable Global String qui correspond au JSON
					var jsonrequete = "";
					
					//Fonction qui finalise le JSON et l'envoi au serveur
					function traitementFinal(){
						var jsonFinal = "";
						for(var i = 0; i < jsonrequete.length; i++){
							if(jsonrequete.charAt(i) == ','){
								if(jsonrequete.charAt(i+2) == ']'){
									//On ne fais rien
								} else {
									jsonFinal += jsonrequete.charAt(i);
								}
							} else {
								jsonFinal += jsonrequete.charAt(i);
							}
						}
						console.log("\n\n\n"+jsonFinal);
						
						//Affichage des champs
						for(var i = 0 ; i < champsTab.length; i++){
							console.log(champsTab[i]);
						}
						
						//On rentre le jsonFinal dans le input caché qui sera envoyé au serveur
						document.getElementById("hidden").value = jsonFinal;
						
						//On envoi le formulaire au serveur
						//document.getElementById("formulaire2").submit();
						
					}
					
					//Fonction qui permet d'ajouter du contenu à notre requete JSON
					function ajoutJSON(contenu){
						jsonrequete += contenu;
					}
					
					/* Fonction appelé lors de la validation du formulaire pour créer le fichier JSON */
					function createJSON(element){
						var blocBool = false;
						var current = element;
						
						//Si on est dans un bloc
						if(typeof element == "string") {
							blocBool = true;
							//-------------JSON--------------
							ajoutJSON("\n{\"bloc\" :\n[");
						} else {
							jsonrequete = "";
							//-------------JSON--------------
							ajoutJSON("[");
						}
							
						//Cas où on accède à la fonction via le bouton submit du formulaire
						if((typeof element != "string") && (element.value == "submit")){
							current = "#formulaire";
						}
						
						//Compteur des elements parcourus
						var cpt = 0;
						
						//On parcours chaque element enfant du formulaire -> On ne prends pas en compte le premier enfant si on est dans un bloc
						$(current+' > *').each( function(){		
							if($(this).is("select") && ($(this).attr('onchange') != null) && ($(this).attr('name') != "status") && ($(this).attr('name') != "bacteria")){
								//Si l'element precedent est aussi un select -> on est dans le cas d'un operateur item
								if($(this).prev().is("select") && ($(this).prev().attr('onchange') == null)) {
									//On est dans le cas d'un opérateur item
									//On récupère le séparateur, le nom du paramètre et sa valeur
									var operateur = $(this).prev().val();
									var split = $(this).attr('name').split('p');
									var nomParam = champsTab[split[1]-1].type;
									var valeur = champsTab[split[1]-1].valeur;
									
									//Si c'est le premier enfant et qu'on est dans un bloc, l'operateur est alors celui du bloc
									if((cpt == 0) && (blocBool)){
										//-------------JSON--------------
										ajoutJSON("\n{\"operator\" : \""+operateur+"\"},\n[");
										ajoutJSON("\n{\""+nomParam+"\" : \""+valeur+"\"},");
									} else {
										//-------------JSON--------------	
										ajoutJSON("\n{\"operator\" : \""+operateur+"\", \""+nomParam+"\" : \""+valeur+"\"},");
									}		
								} else {
									//On accède au numéro du champ pour le retrouver dans notre tableau de champs
									var split = $(this).attr('name').split('p');
									//On récupère le nom du paramètre ainsi que sa valeur
									console.log(champsTab[split[1]-1].type);
									var nomParam = champsTab[split[1]-1].type;
									var valeur = champsTab[split[1]-1].valeur;
										
									//-------------JSON--------------
									if(cpt==0){
										ajoutJSON("\n{\""+nomParam+"\" : \""+valeur+"\"},");
									} else {
										ajoutJSON("\n{\""+nomParam+"\" : \""+valeur+"\"},");
									}
								}
								cpt++;
							} else if($(this).attr('class') == "bloc"){
								//Si l'element est un bloc
								//On rapelle le traitement sur les elements de ce bloc
								createJSON("#bloc"+$(this).attr('name'));
							} else if($(this).attr('class') == "item"){ //Si l'element est une div "Item"
									//On est dans le cas d'un opérateur item
									//On récupère le séparateur, le nom du paramètre et sa valeur
									var operateur = $(this).children(":first").val();
									var split = $(this).children(":first").next().attr('name').split('p');
									var nomParam = champsTab[split[1]-1].type;
									var valeur = champsTab[split[1]-1].valeur;
									//-------------JSON--------------	
									ajoutJSON("\n{\"operator\" : \""+operateur+"\", \""+nomParam+"\" : \""+valeur+"\"},");
							}

							
						} );
						
						//Quand on a parcouru tous les fils
						//Si on est dans un bloc
						if(blocBool) {
							//-------------JSON--------------
							ajoutJSON("\n]\n]\n}");
						} else {
							//-------------JSON--------------
							ajoutJSON("\n]");
							traitementFinal();
						}
					}
