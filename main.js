window.onload = function() {
	const startButton = document.querySelector("#start"),
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

	function delay(t) {
			return (500 - (t * pattern.length));
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
		this.lastElementChild.classList.add("active");
		setTimeout(function() {
			this.lastElementChild.classList.remove("active");
			this.style.animationPlayState = "running";
			colors.forEach(function(item) {
				item.style.animationPlayState = "running";
			})
			setTimeout(function() {
				this.lastElementChild.classList.remove("active");
				this.style.animationPlayState = "paused";
				colors.forEach(function(item) {
					item.style.animationPlayState = "paused";
				})
			}.bind(this), 1000);
		}.bind(this), 300);
		if(pattern.length !== 0) return;
		pattern = [];
		currScore = 0;
		compTrack = 0;
		start();
	})

	function start() {
		printScores();
		soundData.start.sound.play();
		setTimeout(function() {
			pattern.push(random());
			nextTurn(30);
	}, 1700);
	}

	function nextTurn(time) {
		soundData[colors[pattern[compTrack]].classList[1]].sound.play();
		colors[pattern[compTrack]].lastElementChild.classList.add("active");
		colors[pattern[compTrack]].lastElementChild.style.color = hex[pattern[compTrack]];
		colors[pattern[compTrack]].lastElementChild.firstElementChild.style.background =
		`radial-gradient(${gradients[pattern[compTrack]]}, rgba(255, 255, 255, 0.0) 40%, rgba(255, 255, 255, 0.0))`;
		setTimeout(function() {
			console.log(delay(time))
			colors[pattern[compTrack]].lastElementChild.classList.remove("active");
			colors[pattern[compTrack]].lastElementChild.style.color = "";
			colors[pattern[compTrack]].lastElementChild.firstElementChild.style.background = "";
			compTrack++;
			if (compTrack > pattern.length - 1) {
				compTrack = 0;
				return;
			}
			else {
				setTimeout(nextTurn, delay(time), 30);
			}
		}, delay(time));
	}
	function userTurn() {
		if(compTrack !== 0) return;
		if (this === colors[pattern[userTrack]]) {
			soundData[this.classList[1]].sound.play();
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
				setTimeout(nextTurn, 1000, 30);
			}
		}
		else {
			if(pattern.length > 0) {
				soundData.gameover.sound.play();
				gameover.classList.add("animating");
				setTimeout(function() {
					gameover.classList.remove("animating");
					nextTurn(15);
					setTimeout(function() {
						userTrack = 0;
						currScore = 0;
						pattern = [];
						printScores();
						startButton.style.animationPlayState = "running";
						colors.forEach(function(item) {
							item.style.animationPlayState = "running";
						})
						setTimeout(function() {
							startButton.style.animationPlayState = "paused";
							colors.forEach(function(item) {
								item.style.animationPlayState = "paused";
							})
						}, 1000);
					}, (pattern.length * (delay(30) * 2)) + 200);
				}, 1500)
			}
		}
	}

	//sounds object
	const soundData = {
		red: {
			sound: new Howl({
				src: ['sounds/corona.mp3']
			})
		},
		blue: {
			sound: new Howl({
				src: ['sounds/flash-2.mp3']
			})
		},
		yellow: {
			sound: new Howl({
				src: ['sounds/glimmer.mp3']
			})
		},
		orange: {
			sound: new Howl({
				src: ['sounds/moon.mp3']
			})
		},
		green: {
			sound: new Howl({
				src: ['sounds/piston-2.mp3']
			})
		},
		start: {
			sound: new Howl({
				src: ['sounds/veil.mp3']
			})
		},
		gameover: {
			sound: new Howl({
				src: ['sounds/splits.mp3']
			})
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
