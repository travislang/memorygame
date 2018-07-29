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

	startButton.addEventListener("click", function() {
		console.log('hello')
		pattern = [];
		currScore = 0;
		current = 3;
		currScoreDisp.innerHTML = currScore;
		start();
	})

	function start() {
		console.log("game about to start")
		setTimeout(function() {
		nextTurn();
		}, 1000);
	}

	function nextTurn() {
		if (pattern.length > current) return;
		pattern.push(random());
		colors[x].classList.add("lighten");
		setTimeout(function() {
			colors[x].classList.remove("lighten");
			pattern.push(x);
			console.log(pattern);
			setTimeout(nextTurn, 500);
		}, 500);
	}

	function random() {
		return Math.floor(Math.random() * 4)
	}
};
