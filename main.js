window.onload = function() {
	const startButton = document.querySelector("button"),
			red = document.querySelector(".red"),
			blue = document.querySelector(".blue"),
			yellow = document.querySelector(".yellow"),
			green = document.querySelector(".green"),
			currScoreDisp = document.querySelector(".current-score"),
			highScoreDisp = document.querySelector(".highest-score");

	let currScore = 0;
	let highScore = 0;
	let pattern = [];
	let colors = [red, blue, yellow, green];
	let compTrack = 0;
	let userTrack = 0;


	function checkHighScore() {
		if (currScore > highScore) {
			highScore = currScore;
		}
	}
	function printScores() {
		currScoreDisp.innerHTML = currScore;
		highScoreDisp.innerHTML = highScore;
	}

	startButton.addEventListener("click", function() {
		pattern = [];
		currScore = 0;
		compTrack = 0;
		start();
	})

	function start() {
		console.log("game about to start");
		printScores();
		setTimeout(function() {
		pattern.push(random());
		nextTurn();
		}, 1000);
	}

	function nextTurn() {
		if (compTrack > pattern.length - 1) {
			compTrack = 0;
			return;
		}
		colors[pattern[compTrack]].classList.add("lighten");
		setTimeout(function() {
			colors[pattern[compTrack]].classList.remove("lighten");
			console.log(pattern);
			compTrack++;
			setTimeout(nextTurn, 500);
		}, 500);
	}
	function userTurn() {
		if(compTrack !== 0) return;
		if (this === colors[pattern[userTrack]]) {
			console.log("correct");
			console.log(userTrack)
			userTrack++;
			if (userTrack === pattern.length) {
				currScore++;
				checkHighScore();
				printScores();
				userTrack = 0;
				pattern.push(random());
				setTimeout(nextTurn, 1000);
			}
		}
		else {
			console.log('wrong');
			userTrack = 0;
			currScore = 0;
			pattern = [];
			printScores();
			console.log(currScore);
		}

	}

	red.addEventListener("click", function() {
		userTurn.call(this);
	})
	blue.addEventListener("click", function() {
		userTurn.call(this);
	})
	yellow.addEventListener("click", function() {
		userTurn.call(this);
	})
	green.addEventListener("click", function() {
		userTurn.call(this);
	})

	function random() {
		return Math.floor(Math.random() * 4)
	}
};
