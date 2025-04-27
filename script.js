document.addEventListener("DOMContentLoaded", () => {
	const playButton = document.getElementById("playButton");
	const refreshButton = document.getElementById("refreshButton");
	const switchButton = document.getElementById("switchButton");
	let isAnimating = false;

	function getActiveContainer() {
		return document.getElementById("div1").style.display !== "none"
			? document.getElementById("div1")
			: document.getElementById("div2");
	}

	function getChoicesInOrder(container) {
		return container.id === "div1"
			? Array.from(container.querySelectorAll(".choice"))
			: Array.from(container.querySelectorAll(".choices"));
	}

	async function animateBorder(choices) {
		const cycles = 3;
		const duration = 300;

		for (let i = 0; i < cycles; i++) {
			for (const choice of choices) {
				choice.classList.add("active");
				await new Promise((resolve) => setTimeout(resolve, duration));
				choice.classList.remove("active");
			}
		}
	}

	playButton.addEventListener("click", async () => {
		if (isAnimating) return;
		isAnimating = true;

		playButton.style.cursor = "not-allowed";
		playButton.style.opacity = "0.5";
		playButton.style.pointerEvents = "auto";

		switchButton.style.cursor = "not-allowed";
		switchButton.style.opacity = "0.5";
		switchButton.style.pointerEvents = "auto";

		const container = getActiveContainer();
		const choices = getChoicesInOrder(container);

		choices.forEach((choice) => {
			choice.style.opacity = "1";
			choice.classList.remove("chosen");
		});

		await animateBorder(choices);

		const winner = choices[Math.floor(Math.random() * choices.length)];
		winner.classList.add("chosen");
		choices.forEach((c) => c !== winner && (c.style.opacity = "0.5"));

		isAnimating = false;
		playButton.style.cursor = "pointer";
		playButton.style.opacity = "1";
		playButton.style.pointerEvents = "auto";

		switchButton.style.cursor = "pointer";
		switchButton.style.opacity = "1";
		switchButton.style.pointerEvents = "auto";
	});

	refreshButton.addEventListener("click", () => {
		const container = getActiveContainer();
		const choices = getChoicesInOrder(container);
		choices.forEach((choice) => {
			choice.style.opacity = "1";
			choice.classList.remove("chosen", "active");
		});
	});

	window.switchDivs = function () {
		if (isAnimating) return;

		const div1 = document.getElementById("div1");
		const div2 = document.getElementById("div2");
		const div1Display = window.getComputedStyle(div1).display;

		playButton.style.cursor = "not-allowed";
		playButton.style.opacity = "0.5";
		playButton.style.pointerEvents = "auto";

		switchButton.style.cursor = "not-allowed";
		switchButton.style.opacity = "0.5";
		switchButton.style.pointerEvents = "auto";

		if (div1Display === "flex") {
			div1.style.opacity = "0";
			setTimeout(() => {
				div1.style.display = "none";
				div2.style.display = "flex";
				switchButton.textContent = "Multiple Choice";
				setTimeout(() => {
					div2.style.opacity = "1";
					playButton.style.cursor = "pointer";
					playButton.style.opacity = "1";
					playButton.style.pointerEvents = "auto";

					switchButton.style.cursor = "pointer";
					switchButton.style.opacity = "1";
					switchButton.style.pointerEvents = "auto";
				}, 50);
			}, 500);
		} else {
			div2.style.opacity = "0";
			setTimeout(() => {
				div2.style.display = "none";
				div1.style.display = "flex";
				switchButton.textContent = "True or False";
				setTimeout(() => {
					div1.style.opacity = "1";
					playButton.style.cursor = "pointer";
					playButton.style.opacity = "1";
					playButton.style.pointerEvents = "auto";

					switchButton.style.cursor = "pointer";
					switchButton.style.opacity = "1";
					switchButton.style.pointerEvents = "auto";
				}, 50);
			}, 500);
		}

		refreshButton.click();
	};
});
