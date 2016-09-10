
					
					
					
					/* ======================================================= AUTOCOMPLETION ======================================================= */
					
					
					function autocompletion(champ){
						//On recupere les donnees du champ
						var list = new Array();
						//Nombre de caractères minimums pour déclencher l'autocomplétion
						var x = 2;
						
							if(champ.value == "Peptide Name"){
								for (var i=0; i<peptidesName.length; i++) {
									if(!($.inArray(peptidesName[i],list) > -1)){
										list.push(peptidesName[i]);
									}
								}
								//Autocomplete sur le champ
								$(champ.nextSibling).autocomplete({
									source: list,
									minLength : x,
									select : function(event, ui){
										var split = champ.id.split('p');	
										modifValeurNomChamp(split[1] - 1,ui.item.value,champ);
									}
								});
							} else if((champ.value == "Containing monomer") || (champ.value == "Containing derivative of the monomer")){
								for (var i=0; i<peptidesMonomer.length; i++) {
										if(!($.inArray(peptidesMonomer[i],list) > -1)){
											list.push(peptidesMonomer[i]);
										}
								}				
								//Autocomplete sur le champ
								$(champ.nextSibling).autocomplete({
									source: list,
									minLength : x,
									select : function(event, ui){
										var split = champ.id.split('p');	
										modifValeurNomChamp(split[1] - 1,ui.item.value,champ);
									}
								});			
							} else if(champ.value == "author"){
								for (var i=0; i<authors.length; i++) {
										if(!($.inArray(authors[i],list) > -1)){
											list.push(authors[i]);
										}
								}	
								//Autocomplete sur le champ
								$(champ.nextSibling).autocomplete({
									source: list,
									minLength : x,
									select : function(event, ui){
										var split = champ.id.split('p');	
										modifValeurNomChamp(split[1] - 1,ui.item.value,champ);
									}
								});
							} else if(champ.value == "title"){
								for (var i=0; i<titles.length; i++) {
										if(!($.inArray(titles[i],list) > -1)){
											list.push(titles[i]);
										}
								}	
								//Autocomplete sur le champ
								$(champ.nextSibling).autocomplete({
									source: list,
									minLength : x,
									select : function(event, ui){
										var split = champ.id.split('p');	
										modifValeurNomChamp(split[1] - 1,ui.item.value,champ);
									}
								});
							}  else if(champ.value == "source"){
								for (var i=0; i<sources.length; i++) {
										if(!($.inArray(sources[i],list) > -1)){
											list.push(sources[i]);
										}
								}	
								//Autocomplete sur le champ
								$(champ.nextSibling).autocomplete({
									source: list,
									minLength : x,
									select : function(event, ui){
										var split = champ.id.split('p');	
										modifValeurNomChamp(split[1] - 1,ui.item.value,champ);
									}
								});
							}  else if(champ.value == "date"){
								for (var i=0; i<years.length; i++) {
										if(!($.inArray(years[i],list) > -1)){
											list.push(years[i]);
										}
								}	
								//Autocomplete sur le champ
								$(champ.nextSibling).autocomplete({
									source: list,
									minLength : x,
									select : function(event, ui){
										var split = champ.id.split('p');	
										modifValeurNomChamp(split[1] - 1,ui.item.value,champ);
									}
								});
							}  else if(champ.value == "pmid"){
								for (var i=0; i<pmids.length; i++) {
										if(!($.inArray(pmids[i],list) > -1)){
											if(pmids[i] != null){
												list.push(pmids[i]);
											}
										}
								}	
								//Autocomplete sur le champ
								$(champ.nextSibling).autocomplete({
									source: list,
									minLength : x,
									select : function(event, ui){
										var split = champ.id.split('p');	
										modifValeurNomChamp(split[1] - 1,ui.item.value,champ);
									}
								});
							} else if(champ.value == "Organism Name"){
								for (var i=0; i<organisms.length; i++) {
										if(!($.inArray(organisms[i],list) > -1)){
											list.push(organisms[i]);
										}
								}	
								//Autocomplete sur le champ
								$(champ.nextSibling).autocomplete({
									source: list,
									minLength : x,
									select : function(event, ui){
										var split = champ.id.split('p');	
										modifValeurNomChamp(split[1] - 1,ui.item.value,champ);
									}
								});
							}
							
						
					}
					
					