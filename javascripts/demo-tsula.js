/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
	setTimeout(() => document.body.classList.add('render'), 60);
	const navdemos = Array.from(document.querySelectorAll('nav.demos > .demo'));
	const total = navdemos.length;
	const current = navdemos.findIndex(el => el.classList.contains('demo--current'));
	const navigate = (linkEl) => {
		document.body.classList.remove('render');
		console.log(linkEl);
		document.body.addEventListener('transitionend', () => window.location = linkEl.href);
	};
	navdemos.forEach(link => link.addEventListener('click', (ev) => {
		ev.preventDefault();
		navigate(ev.target);
	}));
	// document.addEventListener('keydown', (ev) => {
	// 	const keyCode = ev.keyCode || ev.which;
	// 	let linkEl;
	// 	if ( keyCode === 37 ) {
	// 		linkEl = current > 0 ? navdemos[current-1] : navdemos[total-1];
	// 	}
	// 	else if ( keyCode === 39 ) {
	// 		linkEl = current < total-1 ? navdemos[current+1] : navdemos[0];
	// 	}
	// 	else {
	// 		return false;
	// 	}
	// 	navigate(linkEl);
	// });
}

/**
 * demo-tsula.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
	const items = Array.from(document.querySelectorAll('.menu > .menu__item'));

	class Item {
		constructor(el) {
			this.DOM = {};
			this.DOM.el = el;
			this.DOM.label = el.querySelector('.menu__item-label');
			charming(this.DOM.label);
			this.DOM.labelLetters = Array.from(this.DOM.label.querySelectorAll('span'));
			this.initEvents();
		}
		initEvents() {
			this.mouseenterFn = () => this.mouseTimeout = setTimeout(() => {
				this.isActive = true;
				anime.remove(this.DOM.labelLetters);
				anime({
					targets: this.DOM.labelLetters,
					duration: 20,
					delay: (t,i) => (i+5)*30,
					easing: 'linear',
					opacity: [0,1]
				});	
			}, 50);

			this.mouseleaveFn = () => {
				clearTimeout(this.mouseTimeout);
				if( !this.isActive ) return;
				this.isActive = false;
			};

			this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
			this.DOM.el.addEventListener('touchstart', this.mouseenterFn);
			this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
			this.DOM.el.addEventListener('touchend', this.mouseleaveFn);
		}
	};

	items.forEach(item => new Item(item));
};