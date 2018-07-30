window.onload = function() {
	const startButton = document.querySelector("button"),
				red = document.querySelector(".red"),
				blue = document.querySelector(".blue"),
				yellow = document.querySelector(".yellow"),
				green = document.querySelector(".green"),
				orange = document.querySelector(".orange"),
				currScoreDisp = document.querySelector(".current-score"),
				highScoreDisp = document.querySelector(".highest-score"),
				ready = document.querySelector(".ready"),
				set = document.querySelector(".set"),
				go = document.querySelector(".go"),
				gameover = document.querySelector(".gameover");

	let currScore = 0;
			highScore = 0,
			pattern = [],
			colors = [red, blue, yellow, green, orange],
			hex = ["#cc0000", "#0000ff", "#ffff00", "#00ff00", "#ff9900"],
			gradients = ["rgb(239, 88, 88)", "rgb(75, 128, 252)", "rgb(255, 246, 89)", "rgb(75, 252, 96)", "rgb(234, 167, 72)"],
			compTrack = 0,
			userTrack = 0;

	function delay() {
		if (pattern.length > 3) {
			return (500 - (30 * pattern.length));
		}
		else return 500;
	}

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
		printScores();
		ready.classList.add("animating");
		setTimeout(function() {
			ready.classList.remove("animating");
			set.classList.add("animating");
			setTimeout(function() {
				set.classList.remove("animating");
				go.classList.add("animating");
				setTimeout(function() {
					go.classList.remove("animating");
				}, 1000);
			}, 1000);
		}, 1000);
		setTimeout(function() {
		pattern.push(random());
		nextTurn();
	}, 3500);
	}

	function nextTurn() {
		colors[pattern[compTrack]].lastElementChild.classList.add("active");
		colors[pattern[compTrack]].lastElementChild.style.color = hex[pattern[compTrack]];
		colors[pattern[compTrack]].lastElementChild.firstElementChild.style.background =
		`radial-gradient(${gradients[pattern[compTrack]]}, rgba(255, 255, 255, 0.0) 40%, rgba(255, 255, 255, 0.0))`;
		setTimeout(function() {
			colors[pattern[compTrack]].lastElementChild.classList.remove("active");
			colors[pattern[compTrack]].lastElementChild.style.color = "";
			colors[pattern[compTrack]].lastElementChild.firstElementChild.style.background = "";
			console.log(pattern);
			compTrack++;
			if (compTrack > pattern.length - 1) {
				compTrack = 0;
				return;
			}
			else {
				setTimeout(nextTurn, delay());
			}
		}, delay());
	}
	function userTurn() {
		if(compTrack !== 0) return;
		if (this === colors[pattern[userTrack]]) {
			this.lastElementChild.classList.add("active");
			this.lastElementChild.style.color = hex[pattern[userTrack]];
			this.lastElementChild.firstElementChild.style.background =
			`radial-gradient(${gradients[pattern[userTrack]]}, rgba(255, 255, 255, 0.0) 40%, rgba(255, 255, 255, 0.0))`;
			setTimeout(function() {
				this.lastElementChild.classList.remove("active");
				this.lastElementChild.style.color = "";
				this.lastElementChild.firstElementChild.style.background = "";
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
			if(pattern.length > 0) {
				gameover.classList.add("animating");
				setTimeout(function() {
					gameover.classList.remove("animating");
				}, 1500);
			}
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
	orange.addEventListener("click", function() {
		userTurn.call(this);
	})

	function random() {
		return Math.floor(Math.random() * 5)
	}
};
