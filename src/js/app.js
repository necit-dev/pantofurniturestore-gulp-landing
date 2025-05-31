const infoBtns = document.querySelectorAll('.info-dot');
const infoHints = document.querySelectorAll('.info-hint');

// Клик по кнопке с подсказками
for (let btn of infoBtns){
	btn.addEventListener('click', showHint);
}



function showHint(e) {
	e.stopPropagation();
	const thisInfoHint = this.parentNode.querySelector('.info-hint');
	let infoHintContainsNone = thisInfoHint.classList.contains('none');
	console.log(infoHintContainsNone);
	for (let hint of infoHints) {
		hint.classList.add('none');
	}
	if (!infoHintContainsNone) {
		thisInfoHint.classList.remove('none');
	}
	thisInfoHint.classList.toggle('none');

}

// Закрываем подсказки при клике по всему документу

document.addEventListener('click', closeHints);

function closeHints() {
	for (let hint of infoHints) {
		hint.classList.add('none');
	}
}

// Запрещаем всплытие события клика при клике на подсказку

for (let hint of infoHints) {
	hint.addEventListener('click', function(e){
		e.stopPropagation();
	});
}


// Swiper slider - начало

const swiper = new Swiper('.swiper', {
	slidesPerView: 1,
	spaceBetween: 0,

	breakpoints: {
		600: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		920: {
			slidesPerView: 3,
			spaceBetween: 28,
		},
	// 	1024: {
	// 		slidesPerView: 5,
	// 		spaceBetween: 50,
	// 	},
		1230: {
			slidesPerView: 4,
			spaceBetween: 42,
		},
	},

	// loop: true,


	// Navigation arrows
	navigation: {
		nextEl: '#sliderNext',
		prevEl: '#sliderPrev',
	},

});
// Swiper slider - конец //


// Tabs (Табы) - начало
const tabsBtns = document.querySelectorAll('[data-tab]');
const tabsProducts = document.querySelectorAll('[data-tab-value]');


for (let btn of tabsBtns){

	btn.addEventListener('click', function() {
		// Убираем активные классы у кнопок
		for (let btn of tabsBtns){
			btn.classList.remove('tab-controls__btn--active');
		}

		// Добавляем активный класс к нажатой кнопке
		this.classList.add('tab-controls__btn--active');
		console.log(this.dataset.tab);

		// Скрыть все товары
		for (let product of tabsProducts){
			if (this.dataset.tab === "all"){
				product.classList.remove('none');
				continue;
			}

			if (product.dataset.tabValue === this.dataset.tab){
				product.classList.remove('none');
			}else{
				product.classList.add('none');
			}
		}
		swiper.update();
		// Показать все необходимые товары
	})
}

//Mobile Nav
const mobileNavOpenBtn = document.querySelector('#open-mobile-nav-btn');
const mobileNavCloseBtn = document.querySelector('#close-mobile-nav-btn');
const mobileNav = document.querySelector('#mobile-nav');

mobileNavOpenBtn.onclick = function(){
	mobileNav.classList.add('mobile-nav-wrapper--open');
}

mobileNavCloseBtn.onclick = function(){
	mobileNav.classList.remove('mobile-nav-wrapper--open');
}