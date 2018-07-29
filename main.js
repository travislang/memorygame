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
	let j = 0;

	startButton.addEventListener("click", function() {
		pattern = [];
		currScore = 0;
		currScoreDisp.innerHTML = currScore;
		start();
	})

	function start() {
		console.log("game about to start");
		setTimeout(function() {
		pattern.push(random());
		nextTurn();
		}, 1000);
	}

	function nextTurn() {
		if (j > pattern.length - 1) {
			j = 0;
			return;
		}
		colors[pattern[j]].classList.add("lighten");
		setTimeout(function() {
			colors[pattern[j]].classList.remove("lighten");
			console.log(pattern);
			j++;
			setTimeout(nextTurn, 500);
		}, 500);
	}
	function userTurn() {
		if (this === colors[pattern[j]]) {
			console.log("correct");
			console.log(j)
			j++;
			if (j === pattern.length) {
				currScore++;
				console.log(currScore);
				j = 0;
				pattern.push(random());
				setTimeout(nextTurn, 1000);
			}
		}
		else {
			console.log('wrong');
			j = 0;
			currScore = 0;
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
