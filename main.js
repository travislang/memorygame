window.onload = function() {
	const startButton = document.querySelector("button"),
			red = document.querySelector(".red"),
			blue = document.querySelector(".blue"),
			yellow = document.querySelector(".yellow"),
			green = document.querySelector(".green"),
			orange = document.querySelector(".orange"),
			currScoreDisp = document.querySelector(".current-score"),
			highScoreDisp = document.querySelector(".highest-score");

	let currScore = 0;
	let highScore = 0;
	let pattern = [];
	let colors = [red, blue, yellow, green, orange];
	let hex = ["#cc0000", "#0000ff", "#ffff00", "#00ff00", "#ff9900"];
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
		colors[pattern[compTrack]].lastElementChild.classList.add("active");
		colors[pattern[compTrack]].lastElementChild.style.color = hex[pattern[compTrack]];
		setTimeout(function() {
			colors[pattern[compTrack]].lastElementChild.classList.remove("active");
			colors[pattern[compTrack]].lastElementChild.style.color = "";
			console.log(pattern);
			compTrack++;
			if (compTrack > pattern.length - 1) {
				compTrack = 0;
				return;
			}
			else {
				setTimeout(nextTurn, 500);
			}
		}, 500);
	}
	function userTurn() {
		if(compTrack !== 0) return;
		if (this === colors[pattern[userTrack]]) {
			this.lastElementChild.classList.add("active");
			this.lastElementChild.style.color = hex[pattern[userTrack]];
			setTimeout(function() {
				this.lastElementChild.classList.remove("active");
				this.lastElementChild.style.color = "";
			}.bind(this), 300);
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
		console.log("hello")
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
	orange.addEventListener("click", function() {
		userTurn.call(this);
	})

	function random() {
		return Math.floor(Math.random() * 5)
	}
};
