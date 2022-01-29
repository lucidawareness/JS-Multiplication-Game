(function () {
	"use strict"
	let gameActive = false;
	let score;
	let action;
	let timeRemaining;
	let correctAnswer;
	let wrongAnswer;

// if we click on start/ reset
	document.getElementById("startreset").onclick =
		function () {
			//if we are playing
			if (gameActive) {
				// reload page
				location.reload();
			} else {
				//if we are not playing
				//set active to true
				gameActive = true;
				//set score to zero
				score = 0;
				document.getElementById("scorevalue").innerText = score;
				//show countdown box
				showElement("timeremaining");
				//set time to 60 sec
				timeRemaining = 60;
				//hide gamover box
				hideElement("gameOver")
				//set time in html timeRemaining div
				document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
				//change button to reset
				document.getElementById("startreset").innerHTML = "Reset Game"
				//reduce time by one second in loop
				startCountdown();

				//generate new Q&A'a
				generateQA()


			}
		}

	//function to start countdown
	function startCountdown() {
		// variable for time interval
		action = setInterval(function () {
			// subtract 1 for each second
			timeRemaining -= 1;
			//update HTML with new time remaining count
			document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
			// checks if time hits zero
			if (timeRemaining === 0) {
				// if time zero call function to end interval
				stopCountdown();
				// shows game over message div
				showElement("gameOver");
				// Game over message div contents
				document.getElementById("gameOver").innerHTML = "<p>Game Over</p><p>Your Score is: " + score + "</p>";
				// hides time remaining div on game over
				hideElement("timeremaining");
				hideElement("correct");
				hideElement("wrong");
				gameActive = false;
				document.getElementById("startreset").innerHTML = "Try Again";
			}
			// sets interval rate to one second
		}, 1000);
	}

	// clears interval for variable action
	function stopCountdown() {
		clearInterval(action);
	}

	// hides element by Id as param
	function hideElement(Id) {
		document.getElementById(Id).style.display = "none";
	}

	//shows element by Id as param
	function showElement(Id) {
		document.getElementById(Id).style.display = "block";
	}

	function generateQA() {
		let x = 1 + Math.round(9 * Math.random());
		let y = 1 + Math.round(9 * Math.random());
		correctAnswer = x * y;
		document.getElementById("question").innerHTML = x + "X" + y;
		let correctPosition = 1 + Math.round(3 * Math.random());
		document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

		let answers = [correctAnswer];

		for (let i = 1; i < 5; i++) {
			if (i !== correctPosition) {
				do {
					wrongAnswer = ((1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random())));
				}
				while (answers.indexOf(wrongAnswer) > -1)

				document.getElementById("box" + i).innerHTML = wrongAnswer;
				answers.push(wrongAnswer);
			}
		}
	}


	//if we click on answer box
	for (let i = 1; i < 5; i++) {
		document.getElementById("box" + i).onclick = function () {
			//if we are playing
			if (gameActive === true) {
				//is it correct?
				if (parseInt(this.innerHTML) === correctAnswer) {
					//if yes
					//increase score by one
					score++;
					//show correct box for 1 sec
					document.getElementById("scorevalue").innerHTML = score;
					showElement("correct");
					hideElement("wrong");
					setTimeout(function () {
						hideElement("correct");
					}, 1000)
					generateQA();
				} else {
					showElement("wrong");
					hideElement("correct");
					setTimeout(function () {
						hideElement("wrong");
					}, 1000)
				}
			}
		}
	}

})();