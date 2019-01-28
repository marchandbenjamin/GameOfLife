var htmlTable = '';
for(var i = 0; i < 10 ; i++){
	if(i == 0) { htmlTable += '<table>';}
	htmlTable += '<tr>';
	for (var j = 0; j < 10 ; j++){
		htmlTable += '<td id ="cell_' + i + '_' + j + '"></td>';
		if (j == 9) {
			htmlTable += '</tr>';
			if (i == 9) { htmlTable += '</table>';}
		}
	}
}
document.getElementById('tableContainer').innerHTML = htmlTable;

var query = document.querySelectorAll('td');

for (var i = 0; i < query.length; i++){
	query[i].addEventListener('click', function(e){
		if (getComputedStyle(e.target).backgroundColor == 'rgb(255, 0, 0)'){
			e.target.style.backgroundColor = 'rgb(0, 128, 0)';
		} else if (getComputedStyle(e.target).backgroundColor == 'rgb(0, 128, 0)'){
			e.target.style.backgroundColor = 'rgb(255, 0, 0)';
		} 
	});
}

function hasTwoNeighbours(neighbours){
	var neighboursCounter = 0;
	for (var i = 0 ; i < neighbours.length ; i++){
		if (neighbours[i]) { neighboursCounter++;}
		if (neighboursCounter > 2) { return false; }
	}
	if (neighboursCounter == 2) { return true; } 
	else { return false; }
}

function hasThreeNeighbours(neighbours){
	var neighboursCounter = 0;
	for (var i = 0 ; i < neighbours.length ; i++){
		if (neighbours[i]) { neighboursCounter++;}
		if (neighboursCounter > 3) return false;
	}
	if (neighboursCounter == 3) { return true;} 
	else { return false;}
}

var submitButton = document.getElementById('nextGen');
submitButton.addEventListener('click', function(e){
	var tempBooleanTable = [];
	var finalBooleanTable = [];
	var currentIndexTable;
	var currentIndexI;
	var currentIndexJ;
	var previousIndex = -1;
	
	for (var i = 0; i < query.length; i++){
		currentIndexTable = query[i].id.split(/_/);
		currentIndexI = currentIndexTable[1];
		currentIndexJ = currentIndexTable[2];
		if (currentIndexI != previousIndex) { tempBooleanTable[currentIndexI] = []; }
		previousIndex = currentIndexI;	
		if (getComputedStyle(query[i]).backgroundColor == 'rgb(0, 128, 0)'){
			tempBooleanTable[currentIndexI][currentIndexJ] = true;
		} else {
			tempBooleanTable[currentIndexI][currentIndexJ] = false;		
		}
	}
	
	for (var i = 0 ; i < tempBooleanTable.length; i++){
		finalBooleanTable[i] = [];
		for (var j = 0 ; j < tempBooleanTable[i].length; j++){
			var neighbours = [];
			var tableLength = tempBooleanTable[i].length;
			var indexI = tableLength + i;
			var indexJ = tableLength + j;
			
			neighbours.push(tempBooleanTable[(indexI-1)%tableLength][(indexJ-1)%tableLength]);
			neighbours.push(tempBooleanTable[(indexI-1)%tableLength][indexJ%tableLength]);
			neighbours.push(tempBooleanTable[(indexI-1)%tableLength][(indexJ+1)%tableLength]);
			neighbours.push(tempBooleanTable[indexI%tableLength][(indexJ-1)%tableLength]);
			neighbours.push(tempBooleanTable[(indexI)%tableLength][(indexJ+1)%tableLength]);
			neighbours.push(tempBooleanTable[(indexI+1)%tableLength][(indexJ-1)%tableLength]);
			neighbours.push(tempBooleanTable[(indexI+1)%tableLength][indexJ%tableLength]);
			neighbours.push(tempBooleanTable[(indexI+1)%tableLength][(indexJ+1)%tableLength]);
			
			if (tempBooleanTable[i][j]){
				if (hasTwoNeighbours(neighbours) || hasThreeNeighbours(neighbours)){
					finalBooleanTable[i][j] = true; // Surviving cell
					console.log('Surviving cell');
				} else {
					finalBooleanTable[i][j] = false; // Dying Cell
				}
			} else {
				if (hasThreeNeighbours(neighbours)){
					finalBooleanTable[i][j] = true; // Borning Cell
				} else {
					finalBooleanTable[i][j] = false; // Still dead Cell
				}
			}
		}
	}
	
	for (var i = 0 ; i < finalBooleanTable.length; i++){
		for (var j = 0; j < finalBooleanTable[i].length ; j++){
			var currentCell = document.getElementById('cell_' + i + '_' + j);
			if (finalBooleanTable[i][j]) {
				currentCell.style.backgroundColor = 'rgb(0, 128, 0)';
			} else {
				currentCell.style.backgroundColor = 'rgb(255, 0, 0)';
			}
		}
	}
});