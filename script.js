/***********************************
	OBIEKTY
***********************************/

/* Utworzenie obiektu player, przechowującego ilość pieniędzy gracza, etap gry oraz czas do zakończenia rundy. */
var player = {
	money: 1000000,
	stage: 0,
	time: 60,
}

/**
 * Reprezentuje pojedyncze pytanie.
 * @constructor
 * @param {string} question - Pytanie zadawane graczowi.
 * @param {string} answerA - Pierwsza z możliwych odpowiedzi.
 * @param {string} answerB - Druga z możliwych odpowiedzi.
 * @param {string} answerC - Trzecia z możliwych odpowiedzi.
 * @param {string} answerD - Czwarta z możliwych odpowiedzi.
 * @param {number} correct - Indeks poprawnej odpowiedzi (A - 0, B- 1, C - 2, D - 3).
*/
function Question(question, answerA, answerB, answerC, answerD, correct) {

this.question = question;
this.answers = [answerA, answerB, answerC, answerD];
this.correct = correct;
}

/* Utworzenie 16 obiektów typu Question i wpisanie ich do tablicy questions */
var questions = [];
questions[0] = new Question('Skrypty języka JavaScript umieszczamy w dokumentach języka HTML pomiędzy znacznikami:', '&lt;javascript&gt;&lt;/javascript&gt;', '&lt;java&gt;&lt;/java&gt;', '&lt;script&gt;&lt;/script&gt;', '&lt;js&gt;&lt;/js&gt;', 2);
questions[1] = new Question('Aby uzyskać dostęp do pierwszego elementu w tablicy odwołać się do indeksu:', '[-1]', '[0]', '[1]', '[2]', 1);
questions[2] = new Question('Pętla for (var i=0; i<=6; i+=2) {...} wykona się:', 'ani razu', '1 raz', '3 razy', '4 razy', 3);
questions[3] = new Question('Który z podanych obiektów globalnych nie istnieje?', 'Function', 'Math', 'Number', 'Date', 0);
questions[4] = new Question('Frameworkiem języka JavaScript nie jest:', 'Angular', 'React', 'Lodash', 'Ember', 2);
questions[5] = new Question('Metoda .querySelectorAll() zwraca: ', 'Tablicę', 'Obiekt', 'Zmienną z przypisaną wartością', 'Funkcję', 0);
questions[6] = new Question('Gdzie najlepiej jest umieścić kod JavaScript?', 'Na początku sekcji head', 'Na kocu sekcji head', 'Na początku sekcji body', 'Na końcu sekcji body', 3);
questions[7] = new Question('Najszybszą metodą pobrania danych od użytkownika w JavaScript jest użycie metody', '.alert()', '.prompt()', '.takeData()', '.read()', 1);
questions[8] = new Question('.split(), .include() oraz .replace() to metody obiektu:', 'Number', 'String', 'Math', 'Array', 1);
questions[9] = new Question('Warunek if (x) {...} nie wykona się jeśli x będzie:', 'niepustym ciągiem znaków', 'równy -1', 'równy 0', 'tablicą 2-elementową', 2);
questions[10] = new Question('Metoda .random() obiektu Math zwraca wartość z przedziału: ', '<0,1)', '(0,1>', '(0,1)', '<0,1>', 0);
questions[11] = new Question('Jakiej struktury danych należy użyć, aby przechować liczbę uczniów w klasie?', 'Obiektu', 'Tablicy', 'Funkcji', 'Zmiennej', 3);
questions[12] = new Question('Najefektywniejszym sposobem wpisania do tablicy 10 kolejnych liczb parzystych jest użycie: ', 'Metody .insert()', 'Instrukcji warunkowej', 'Pętli', 'Trzeba wpicać każdą wartość ręcznie', 2);
questions[13] = new Question('Obiekt zdarzenia (e) nie przechowuje informacji o: ', 'typie zdarzenia', 'położeniu kursora względem strony', 'liczbie milisekund, które upynęły od 1970 roku', 'funkcji wywoływanej w momencie wystąpienia zdarzenia', 3);
questions[14] = new Question('Która z podanych nazw zmiennych jest poprawna?', 'moja.zmienna', '$moja_zmienna5', '3zmienna', 'moja-zmienna', 1);
questions[15] = new Question('Który z poniższych operatorów służy w JavaScript do potęgowania?', 'Taki operator nie istnieje', '%', '**', '^', 0);



/***********************************
	FUNKCJE
***********************************/

/**
 * Losowo ustala kolejność elementów w tablicy (źródło: Stack Overflow).
 * @param {array} a - nazwa tablicy do pomieszania elementów.
*/
function shuffleArray(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

/**
 * Tworzy na nowo całą planszę zadając pytanie na podstawie obecnego etapu gry.
*/
function askQuestion() {
	var content = '';
	player.time = 60;
	content += '<div class="question">' + questions[player.stage].question + '</div><div class="answers">'

	for (var i=0; i<4; i++) {
		content += '<div class="answer"><div class="answerText">' + questions[player.stage].answers[i] + '</div><div class="answerBottom"><div class="add">+</div><div class="ammount">0</div><div class="take">-</div></div></div>'
	}

	content += '</div><div class="otherElements"><div class="money">' + player.money + ' PLN</div><div class="counter">' + player.time + '</div><div class="stop">STOP</div></div>'

	document.querySelector('.gameBoard').innerHTML = content;

	countTime = window.setInterval(takeSecond, 1000);

	createCircles();
	activateButtons();
}

/**
 * Zmniejsza wartość licznika czasu o 1, a jeśli ten jest równy 0 - kończy daną rundę.
*/
function takeSecond() {
	player.time--;
	document.querySelector('.counter').textContent = player.time + ' s';
	if (player.time <= 0) {
		clearInterval(countTime);
		checkAnswer();
	}
}

/**
 * Tworzy koła informujące o obecnym etapie gry. Zwraca tablicę zawierającą referencje do wszystkich pól w kolejności od dołu do góry.
*/
function createCircles() {
	for (var i=0, stageCircles = ''; i<8; i++) {
		stageCircles += (i < (7 - player.stage)) ? '<div class="stagesCircle">' + (8-i) + '</div>' : '<div class="stagesCircle activeCircle">' + (8-i) + '</div>';
	}
	document.querySelector('.stages').innerHTML = stageCircles;
}


/**
 * Dodaje obserwatory zdarzeń do wszystkich elementów, które mają być interaktywne.
*/
function activateButtons() {

	var add = document.querySelectorAll('.add');
	var take = document.querySelectorAll('.take');
	var stop = document.querySelector('.stop');

	for (var i=0; i<4; i++) {
		add[i].addEventListener('click', addMoney, false);
		take[i].addEventListener('click', takeMoney, false);
	}

	stop.addEventListener('click', stopClock, false);
}

/**
 * Dodaje 25 000 PLN do podanej odpowiedzi, zabierając je z konta gracza.
*/
function addMoney(e) {
	if (player.money >= 25000) {
		player.money -= 25000;
		document.querySelector('.money').textContent = player.money;
		this.nextSibling.textContent = Number(this.nextSibling.textContent) + 25000;
	}
}

/**
 * Zabiera 25 000 PLN z podanej odpowiedzi, dodając je do konta gracza.
*/
function takeMoney(e) {
	if (Number(this.previousSibling.textContent) >= 25000) {
			player.money += 25000;
			document.querySelector('.money').textContent = player.money;
			this.previousSibling.textContent = Number(this.previousSibling.textContent) - 25000;
	}
}

/**
 * Zatrzymuje odliczanie czasu.
*/
function stopClock() {
	clearInterval(countTime);
	checkAnswer();
}

/**
 * Wyświetla poprawną odpowieź, oddajegraczowi pieniądze postawione na nią i przechodzi na dalszy etap gry (lub ją kończy).
*/
function checkAnswer() {
	dezactivateButtons();

	var answerIndex = questions[player.stage].correct;
	var answerText = questions[player.stage].answers[answerIndex];
	var allAnswers = document.querySelectorAll('.answerText');

	for (var i=0; i<4; i++){
		if (allAnswers[i].textContent === answerText){
			var moneyOnField = allAnswers[i].nextSibling.firstChild.nextSibling;
			player.money = Number(moneyOnField.textContent);
			document.querySelector('.money').textContent = player.money + ' PLN';
			var parent = allAnswers[i].parentNode;
			parent.setAttribute('class', 'answer answer--correct');
		}
	}
	player.stage++;
	if (player.money >= 25000 && player.stage < 8){
		window.setTimeout(askQuestion, 3000);
	} else if (player.money <= 0) {
		window.setTimeout(gameOver, 3000);
	} else {
		window.setTimeout(congratulations, 3000);
	}
}

/**
 * Usuwa obserwatory zdarzeń ze wszystkich interaktywnych elementów.
*/
function dezactivateButtons() {

	var add = document.querySelectorAll('.add');
	var take = document.querySelectorAll('.take');
	var stop = document.querySelector('.stop');

	for (var i=0; i<4; i++) {
		add[i].removeEventListener('click', addMoney, false);
		take[i].removeEventListener('click', takeMoney, false);
	}

	stop.removeEventListener('click', stopClock, false);
}

/**
 * Wyświetla informację przegranej.
*/
function gameOver() {
	var gameBoard = document.querySelector('.gameBoard')
	gameBoard.setAttribute('class', 'gameBoard gameBoard--lose');
	gameBoard.innerHTML = 'Niestety nie był to Twój dobry dzień. Niemniej jednak doszedłeś aż do ' + (player.stage + 1) + ' etapu. <br> Odśwież okno przeglądarki, by zagrać jeszcze raz.';
}

/**
 * Wyświetla informację wygranej.
*/
function congratulations() {
	var gameBoard = document.querySelector('.gameBoard')
	gameBoard.setAttribute('class', 'gameBoard gameBoard--win');
	gameBoard.innerHTML = 'Gratulacje!!! Przeszedłeś wszystkie 8 etapów wygrywając ' + player.money + ' PLN <br> Odśwież okno przeglądarki, by zagrać jeszcze raz.';
}

/***********************************
	KOD STARTOWY
***********************************/

shuffleArray(questions);	//Pomieszanie tablicy z pytaniami.
askQuestion();					//Przejście do zadawania pierwszego pytania.
