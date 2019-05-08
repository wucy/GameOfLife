let CELLSIZE = 30;

let totCol = 0;
let totRow = 0;
let animation = null;

function isAlive(i ,j) {
	return document.getElementById("golGrid").rows[i].cells[j].getAttribute('bgcolor') == 'black';
}

function setAlive(i, j) {
	document.getElementById("golGrid").rows[i].cells[j].setAttribute('bgcolor', 'black');
}

function setDead(i, j) {
	document.getElementById("golGrid").rows[i].cells[j].setAttribute('bgcolor', 'white');
}

function golStep() {
	grid = document.getElementById("golGrid");
	aliveCands = new Array();
	deadCands = new Array();
	for (i = 0; i < totRow; i ++) {
		for (j = 0; j < totCol; j ++) {
			totAlive = 0;
			if (i > 0 && j > 0 && isAlive(i - 1, j - 1)) {
				totAlive += 1;
			}
			if (i > 0 && isAlive(i - 1, j)) {
				totAlive += 1;
			}
			if (i > 0 && j < totCol - 1 && isAlive(i - 1, j + 1)) {
				totAlive += 1;
			}
			if (j > 0 && isAlive(i, j - 1)) {
				totAlive += 1;
			}
			if (j < totCol - 1 && isAlive(i, j + 1)) {
				totAlive += 1;
			}
			if (i < totRow - 1 && j > 0 && isAlive(i + 1, j - 1)) {
				totAlive += 1;
			}
			if (i < totRow - 1 && isAlive(i + 1, j)) {
				totAlive += 1;
			}
			if (i < totRow - 1 && j < totCol - 1 && isAlive(i + 1, j + 1)) {
				totAlive += 1;
			}
			if (totAlive > 0) {
				console.log(i, j, totAlive);
			}
			if (isAlive(i ,j)) {
				if (totAlive < 2 || totAlive > 3) {
					deadCands.push([i, j]);
				}
			} else {
				if (totAlive == 3) {
					aliveCands.push([i, j]);
				}
			}
		}
	}
	for (cand in deadCands) {
		setDead(deadCands[cand][0], deadCands[cand][1]);
	}
	for (cand in aliveCands) {
		setAlive(aliveCands[cand][0], aliveCands[cand][1]);
	}
}

function start() {
	document.getElementById("startBtn").disabled = true;
	//golStep();
	animation = setInterval(golStep, 300);
}

function reset() {
	if (animation != null) {
		clearInterval(animation);
	}
	animation = null;
	getGridSize();
	resetGrid();
	document.getElementById("startBtn").disabled = false;
}

function getGridSize() {
	winWidth = document.body.clientWidth;
	winHeight = document.body.clientHeight;
	totCol = parseInt(winWidth / CELLSIZE);
	totRow = parseInt(winHeight / CELLSIZE);
}

function clickCell(i ,j) {
	return function() {
		grid = document.getElementById("golGrid");
		cell = grid.rows[i].cells[j];
		if (isAlive(i,j)) {
			setDead(i, j);
		} else {
			setAlive(i, j);
		}
	}
}

function resetGrid() {
	golGrid = document.getElementById("golGrid");
	golGridBody = golGrid.tBodies[0];
	golGridBody.parentNode.outerHTML = golGrid.parentNode.outerHTML.replace(golGrid.innerHTML, "");
	golGrid = document.getElementById("golGrid");
	let i = 0;
	let j = 0;
	for (i = 0; i < totRow; ++ i) {
		tr = golGrid.insertRow();
		for (j = 0; j < totCol; ++ j) {
			td = tr.insertCell();
			td.setAttribute("bgcolor", "white");
			td.onclick = clickCell(i, j);
		}
	}
}

window.onload=function(){
	reset();
}

