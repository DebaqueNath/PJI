
<!DOCTYPE html>
<html>
   <head>
       <meta charset="utf-8" />
       <title>PJI</title>
	   <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
	   <link rel="stylesheet" href="Index.css">
	   <script type="text/javascript" src="http://code.jquery.com/jquery-2.2.0.min.js"></script>
	   <script type="text/javascript" src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
	
  
	    <script type="text/javascript" src="getPeptides.js" ></script>
		<script type="text/javascript" src="autocompletion.js" ></script>
		<script type="text/javascript" src="gestionFormulaire.js" ></script>
		<script type="text/javascript" src="createJSON.js" ></script>
					
					
					
   </head>
   <body>
   

	<div class="formulaire">
	<form name="form" id="formulaire" method="post" action="http://bioinfo.lifl.fr/norine/traitement.jsp">
			<select onchange="modifChamp(this)" name="champ1" id="champ1">
				<option selected>Peptide ID</option>
				<option>Peptide Name</option>
				<option>Category</option>
				<option>Molecular weight</option>
				<option>Status</option>
				<option>Activity</option>
				<option>Structure Type</option>
				<option>Number of monomers</option>
				<option>Containing monomer</option>
				<option>Containing derivative of the monomer</option>	
				<option value="author">Author</option>
				<option value="title">Title</option>
				<option value="source">Journal</option>
				<option value="date">Year</option>
				<option value="pmid">PMID</option>
				<option>Organism Name</option>
				<option>Bacteria Type</option>
			</select>
			<input type="text" name="identifier" onchange="modifValeur(this)"/>
			<input type="button" id="plusChamp" value="+" onClick="ajoutChamp(this);">
			<input type="button" id="plusBloc" value="group" onClick="ajoutBloc(this);">
	</form>
	<form name="form" id="formulaire2" method="post" action="http://bioinfo.lifl.fr/norine/traitement2.jsp">
				<input id="hidden" type="HIDDEN" value=""> 
				<input type="button" value="submit" name="boutAll" onClick="createJSON(this);" />
	</form>
	
	</div>


	</body>
</html>

