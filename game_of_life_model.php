<?php
/*
Il s'agit du modèle du jeu de la vie.
Ce fichier prend en compte les donnés utilisateur 
et calcule la prochaine génération de cellules.
*/

/* 	This function generate an HTML table of cells 
	from a boolean table with the parameter $booleanTable
	A living cell is symbolized by a 'o'
	and a dead cell is symbolized by a 'x' 
 */
function generateTable ($booleanTable){
	$cellTable = "<table>";
	
	if(isset($booleanTable)){
		$tableWidth = count($booleanTable);
		$tableHeight = count($booleanTable[0]);
	} else {
		$tableWidth = 9;
		$tableHeight = 9;
	}
	
	for ($i = 0; $i < $tableWidth; $i++){
		for($j = 0; $j < $tableHeight; $j++){
			$cellTable .= "<td>";
			if ($booleanTable[$i][$j]){
				$cellTable.= "<input type=\"checkbox\" name=checkbox" . $i . $j . " checked>";
			} else {
				$cellTable.= "<input type=\"checkbox\" name=checkbox" . $i . $j . ">";
			}
			$cellTable .= "</td>";
		}			
		$cellTable .= "</tr>";
	}
	return $cellTable . "</table>";
}

/* This function analyse every single cell of the table
 * If a dead cell has exactly 3 neighbours it become alive.
 * If a living cell has 2 or 3 neighbours it stay alive, either it dies.
 */
function nextGeneration($booleanTable){
	$nextCellTable = $booleanTable;
	for ($i = 0; $i < count($booleanTable); $i++){
		for ($j = 0; $j < count($booleanTable[$i]); $j++){
			$neighbours = array();
			if(isset($booleanTable[$i-1][$j-1])){ array_push($neighbours, $booleanTable[$i-1][$j-1]);}
			if(isset($booleanTable[$i-1][$j])){ array_push($neighbours, $booleanTable[$i-1][$j]);}
			if(isset($booleanTable[$i-1][$j+1])){ array_push($neighbours, $booleanTable[$i-1][$j+1]);}
			if(isset($booleanTable[$i][$j-1])){ array_push($neighbours, $booleanTable[$i][$j-1]);}
			if(isset($booleanTable[$i][$j+1])){ array_push($neighbours, $booleanTable[$i][$j+1]);}
			if(isset($booleanTable[$i+1][$j-1])){ array_push($neighbours, $booleanTable[$i+1][$j-1]);}
			if(isset($booleanTable[$i+1][$j])){ array_push($neighbours, $booleanTable[$i+1][$j]);}
			if(isset($booleanTable[$i+1][$j+1])){ array_push($neighbours, $booleanTable[$i+1][$j+1]);}
								
			if ($booleanTable[$i][$j]){
				if (hasTwoNeighbours($neighbours) OR hasThreeNeighbours($neighbours)){
					$nextCellTable[$i][$j] = true; // Surviving cell
				} else {
					$nextCellTable[$i][$j] = false; // Dying cell
				}
			} else {
				if (hasThreeNeighbours($neighbours)){
					$nextCellTable[$i][$j] = true; // Borning cell
				} else {
					$nextCellTable[$i][$j] = false; // Still dead cell
				}
			}					 
		}
	}
	return $nextCellTable;
}

/* 
 * This function returns true if there is exactly two neighbours.
 */
function hasTwoNeighbours($neighbours){
	$neighboursCoutner = 0;
	foreach($neighbours as $cell){
		if($cell) { $neighboursCoutner++ ;}
		if($neighboursCoutner > 2) { return false;}
	}
	if ($neighboursCoutner == 2) {
		return true;
	} else {
		return false;
	}
}

/* 
 * This function returns true if there is exactly three neighbours.
 */
function hasThreeNeighbours($neighbours){
	$neighboursCoutner = 0;
	foreach($neighbours as $cell){
		if($cell) { $neighboursCoutner++ ;}
		if($neighboursCoutner > 3) { return false;}
	}
	if ($neighboursCoutner == 3) {
		return true;
	} else {
		return false;
	}
}

?>