const header = document.querySelector(".header");

const burgerModalMenu = document.querySelector(".burger-menu");
const buttonOpenModalMenu = document.querySelector(".burger");
const buttonCloseModalMenu = document.querySelector(".burger-close");

// Header Active
const headerCoords = header.getBoundingClientRect();
window.addEventListener("scroll", function () {
	if (window.scrollY > headerCoords.bottom) {
		header.classList.add("header--active");
	} else {
		header.classList.remove("header--active");
	}
});

//! Needs to be refactered
// Scroll from header
const scrollFromNavigation = function () {
	document
		.querySelector(".header__wrapper")
		.addEventListener("click", function (e) {
			e.preventDefault();

			if (
				e.target.classList.contains("nav__link") ||
				e.target.classList.contains("additional__link")
			) {
				const href = e.target.getAttribute("href");
				document.querySelector(href).scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
		});
};
scrollFromNavigation();

// Burger menu
const openModalMenu = function (e) {
	e.preventDefault();
	burgerModalMenu.classList.add("visible");
};

const closeModalMenu = function () {
	burgerModalMenu.classList.remove("visible");
};

buttonOpenModalMenu.addEventListener("click", openModalMenu);
buttonCloseModalMenu.addEventListener("click", closeModalMenu);

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && burgerModalMenu.classList.contains("visible")) {
		closeModalMenu();
	}
});

//! Needs to be refactered
// Scroll from burger menu
const scrollFromBurger = () => {
	document.querySelector(".burger-menu").addEventListener("click", (event) => {
		event.preventDefault();

		const target = event.target;
		if (
			target.classList.contains("burger-menu__link") ||
			target.classList.contains("burger-menu__additional-link")
		) {
			closeModalMenu();
			const href = target.getAttribute("href");
			document.querySelector(href).scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	});
};
scrollFromBurger();

//! Needs to be refactered
// Scroll from hero button
const scrollFromButtons = function () {
	document.querySelector(".hero").addEventListener("click", function (e) {
		e.preventDefault();

		if (e.target.classList.contains("hero__link")) {
			const href = e.target.getAttribute("href");
			document
				.querySelector(href)
				.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	});
};
scrollFromButtons();

// Toggle buttons
document.addEventListener("DOMContentLoaded", () => {
	const buttons = document.querySelectorAll(".tools__btn");
	const cardGroups = document.querySelectorAll(".tools__cards");

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			// Убираем 'tools__btn--active' у всех кнопок
			buttons.forEach((btn) => btn.classList.remove("tools__btn--active"));

			// Добавляем 'tools__btn--active' к нажатой кнопке
			button.classList.add("tools__btn--active");

			// Скрываем все группы карточек
			cardGroups.forEach((group) =>
				group.classList.add("tools__cards--hidden")
			);

			// Показываем нужную группу карточек
			const target = button.dataset.target;
			const targetGroup = document.querySelector(`.tools__cards-${target}`);
			if (targetGroup) {
				targetGroup.classList.remove("tools__cards--hidden");
			}
		});
	});
});
