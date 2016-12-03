/***********************************
	FUNKCJE
***********************************/

/*
	Tworzy koła informujące o obecnym etapie gry. Zwraca tablicę zawierającą referencje do wszystkich pól w kolejności od dołu do góry.
*/
function createCircles() {
	for (var i=0, stageCircles = ''; i<8; i++) {
		stageCircles += (i != 7) ? '<div class="stagesCircle"></div>' : '<div class="stagesCircle activeCircle"></div>';

	}
	document.querySelector('.stages').innerHTML = stageCircles;

	var stageCircles = [];

	for (var i=7; i>=0; i++) {
		stagecircles[i] = document.querySelector('.stagesCircle:nth-child(' + (i+1) + ')');
	}

	return stagecirclse;
}



/***********************************
	KOD WYKONYWANY
***********************************/

var stageCircles = createCircles();
