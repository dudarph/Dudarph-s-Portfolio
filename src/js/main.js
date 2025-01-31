// Общие переменные
const header = document.querySelector(".header");
const burgerModalMenu = document.querySelector(".burger-menu");
const buttonOpenModalMenu = document.querySelector(".burger");
const buttonCloseModalMenu = document.querySelector(".burger-close");
const langSwitcher = document.querySelector(".additional__language");
const popUp = document.querySelector(".pop-up");
const popUpClose = document.querySelector(".pop-up__close");

// Header Active
const headerCoords = header.getBoundingClientRect();
window.addEventListener("scroll", () => {
	header.classList.toggle(
		"header--active",
		window.scrollY > headerCoords.bottom
	);
});

// Универсальная функция для плавного скролла
const setupSmoothScroll = (selector, closeModalCallback) => {
	document.querySelector(selector).addEventListener("click", (e) => {
		e.preventDefault();

		const target = e.target;
		const href = target.getAttribute("href");

		if (
			href &&
			(target.classList.contains("nav__link") ||
				target.classList.contains("additional__link") ||
				target.classList.contains("burger-menu__link") ||
				target.classList.contains("burger-menu__additional-link") ||
				target.classList.contains("hero__link"))
		) {
			if (closeModalCallback) {
				setTimeout(() => {
					closeModalCallback();
				}, 100); // Таймер на 0.1 секунду перед закрытием
			}

			document.querySelector(href).scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	});
};

// Инициализация плавного скролла
setupSmoothScroll(".header__wrapper"); // Без таймера
setupSmoothScroll(".burger-menu", () => {
	burgerModalMenu.classList.remove("visible"); // С таймером, только для burger-menu
});
setupSmoothScroll(".hero"); // Без таймера

// Burger menu
const toggleModalMenu = (state, delay = 0) => {
	if (state) {
		burgerModalMenu.scrollTop = 0; // Устанавливаем прокрутку в начало
		burgerModalMenu.classList.add("visible");
	} else {
		setTimeout(() => {
			burgerModalMenu.classList.remove("visible");
		}, delay);
	}
};

buttonOpenModalMenu.addEventListener("click", (e) => {
	e.preventDefault();
	toggleModalMenu(true); // Открываем меню
});

buttonCloseModalMenu.addEventListener("click", () =>
	toggleModalMenu(false, 100)
); // Закрытие через 0.1 секунду

document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && burgerModalMenu.classList.contains("visible")) {
		toggleModalMenu(false, 100); // Закрытие через 0.1 секунду
	}
});

// Toggle buttons
const setupToggleButtons = () => {
	const buttons = document.querySelectorAll(".tools__btn");
	const cardGroups = document.querySelectorAll(".tools__cards");

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			buttons.forEach((btn) => btn.classList.remove("tools__btn--active"));
			button.classList.add("tools__btn--active");

			cardGroups.forEach((group) =>
				group.classList.add("tools__cards--hidden")
			);

			const targetGroup = document.querySelector(
				`.tools__cards-${button.dataset.target}`
			);
			if (targetGroup) {
				targetGroup.classList.remove("tools__cards--hidden");
			}
		});
	});
};

document.addEventListener("DOMContentLoaded", setupToggleButtons);

// Pop Up
langSwitcher.addEventListener("click", () => {
	popUp.classList.toggle("visible");
});

popUpClose.addEventListener("click", () => {
	popUp.classList.toggle("visible");
});
