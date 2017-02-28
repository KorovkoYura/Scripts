/* global screenReaderText */
/**
 * Theme functions file.
 *
 * Contains handlers for navigation and widget area.
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});
( function( $ ) {
	var body, masthead, menuToggle, siteNavigation, socialNavigation, siteHeaderMenu, resizeTimer;

	function initMainNavigation( container ) {

		// Add dropdown toggle that displays child menu items.
		var dropdownToggle = $( '<button />', {
			'class': 'dropdown-toggle',
			'aria-expanded': false
		} ).append( $( '<span />', {
			'class': 'screen-reader-text',
			text: screenReaderText.expand
		} ) );

		container.find( '.menu-item-has-children > a' ).after( dropdownToggle );

		// Toggle buttons and submenu items with active children menu items.
		container.find( '.current-menu-ancestor > button' ).addClass( 'toggled-on' );
		container.find( '.current-menu-ancestor > .sub-menu' ).addClass( 'toggled-on' );

		// Add menu items with submenus to aria-haspopup="true".
		container.find( '.menu-item-has-children' ).attr( 'aria-haspopup', 'true' );

		container.find( '.dropdown-toggle' ).click( function( e ) {
			var _this            = $( this ),
				screenReaderSpan = _this.find( '.screen-reader-text' );

			e.preventDefault();
			_this.toggleClass( 'toggled-on' );
			_this.next( '.children, .sub-menu' ).toggleClass( 'toggled-on' );

			// jscs:disable
			_this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
			// jscs:enable
			screenReaderSpan.text( screenReaderSpan.text() === screenReaderText.expand ? screenReaderText.collapse : screenReaderText.expand );
		} );
	}
	initMainNavigation( $( '.main-navigation' ) );

	masthead         = $( '#masthead' );
	menuToggle       = masthead.find( '#menu-toggle' );
	siteHeaderMenu   = masthead.find( '#site-header-menu' );
	siteNavigation   = masthead.find( '#site-navigation' );
	socialNavigation = masthead.find( '#social-navigation' );

	// Enable menuToggle.
	( function() {

		// Return early if menuToggle is missing.
		if ( ! menuToggle.length ) {
			return;
		}

		// Add an initial values for the attribute.
		menuToggle.add( siteNavigation ).add( socialNavigation ).attr( 'aria-expanded', 'false' );

		menuToggle.on( 'click.twentysixteen', function() {
			$( this ).add( siteHeaderMenu ).toggleClass( 'toggled-on' );

			// jscs:disable
			$( this ).add( siteNavigation ).add( socialNavigation ).attr( 'aria-expanded', $( this ).add( siteNavigation ).add( socialNavigation ).attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
			// jscs:enable
		} );
	} )();

	// Fix sub-menus for touch devices and better focus for hidden submenu items for accessibility.
	( function() {
		if ( ! siteNavigation.length || ! siteNavigation.children().length ) {
			return;
		}

		// Toggle `focus` class to allow submenu access on tablets.
		function toggleFocusClassTouchScreen() {
			if ( window.innerWidth >= 910 ) {
				$( document.body ).on( 'touchstart.twentysixteen', function( e ) {
					if ( ! $( e.target ).closest( '.main-navigation li' ).length ) {
						$( '.main-navigation li' ).removeClass( 'focus' );
					}
				} );
				siteNavigation.find( '.menu-item-has-children > a' ).on( 'touchstart.twentysixteen', function( e ) {
					var el = $( this ).parent( 'li' );

					if ( ! el.hasClass( 'focus' ) ) {
						e.preventDefault();
						el.toggleClass( 'focus' );
						el.siblings( '.focus' ).removeClass( 'focus' );
					}
				} );
			} else {
				siteNavigation.find( '.menu-item-has-children > a' ).unbind( 'touchstart.twentysixteen' );
			}
		}

		if ( 'ontouchstart' in window ) {
			$( window ).on( 'resize.twentysixteen', toggleFocusClassTouchScreen );
			toggleFocusClassTouchScreen();
		}

		siteNavigation.find( 'a' ).on( 'focus.twentysixteen blur.twentysixteen', function() {
			$( this ).parents( '.menu-item' ).toggleClass( 'focus' );
		} );
	} )();

	// Add the default ARIA attributes for the menu toggle and the navigations.
	function onResizeARIA() {
		if ( window.innerWidth < 910 ) {
			if ( menuToggle.hasClass( 'toggled-on' ) ) {
				menuToggle.attr( 'aria-expanded', 'true' );
			} else {
				menuToggle.attr( 'aria-expanded', 'false' );
			}

			if ( siteHeaderMenu.hasClass( 'toggled-on' ) ) {
				siteNavigation.attr( 'aria-expanded', 'true' );
				socialNavigation.attr( 'aria-expanded', 'true' );
			} else {
				siteNavigation.attr( 'aria-expanded', 'false' );
				socialNavigation.attr( 'aria-expanded', 'false' );
			}

			menuToggle.attr( 'aria-controls', 'site-navigation social-navigation' );
		} else {
			menuToggle.removeAttr( 'aria-expanded' );
			siteNavigation.removeAttr( 'aria-expanded' );
			socialNavigation.removeAttr( 'aria-expanded' );
			menuToggle.removeAttr( 'aria-controls' );
		}
	}

	// Add 'below-entry-meta' class to elements.
	function belowEntryMetaClass( param ) {
		if ( body.hasClass( 'page' ) || body.hasClass( 'search' ) || body.hasClass( 'single-attachment' ) || body.hasClass( 'error404' ) ) {
			return;
		}

		$( '.entry-content' ).find( param ).each( function() {
			var element              = $( this ),
				elementPos           = element.offset(),
				elementPosTop        = elementPos.top,
				entryFooter          = element.closest( 'article' ).find( '.entry-footer' ),
				entryFooterPos       = entryFooter.offset(),
				entryFooterPosBottom = entryFooterPos.top + ( entryFooter.height() + 28 ),
				caption              = element.closest( 'figure' ),
				newImg;

			// Add 'below-entry-meta' to elements below the entry meta.
			if ( elementPosTop > entryFooterPosBottom ) {

				// Check if full-size images and captions are larger than or equal to 840px.
				if ( 'img.size-full' === param ) {

					// Create an image to find native image width of resized images (i.e. max-width: 100%).
					newImg = new Image();
					newImg.src = element.attr( 'src' );

					$( newImg ).on( 'load.twentysixteen', function() {
						if ( newImg.width >= 840  ) {
							element.addClass( 'below-entry-meta' );

							if ( caption.hasClass( 'wp-caption' ) ) {
								caption.addClass( 'below-entry-meta' );
								caption.removeAttr( 'style' );
							}
						}
					} );
				} else {
					element.addClass( 'below-entry-meta' );
				}
			} else {
				element.removeClass( 'below-entry-meta' );
				caption.removeClass( 'below-entry-meta' );
			}
		} );
	}

	$( document ).ready( function() {
		body = $( document.body );

		$( window )
			.on( 'load.twentysixteen', onResizeARIA )
			.on( 'resize.twentysixteen', function() {
				clearTimeout( resizeTimer );
				resizeTimer = setTimeout( function() {
					belowEntryMetaClass( 'img.size-full' );
					belowEntryMetaClass( 'blockquote.alignleft, blockquote.alignright' );
				}, 300 );
				onResizeARIA();
			} );

		belowEntryMetaClass( 'img.size-full' );
		belowEntryMetaClass( 'blockquote.alignleft, blockquote.alignright' );
	} );
} )( jQuery );

jQuery(function($) {
	var screenModeMenu = 2;
	var menuElements = $('.moving-menu-item');
	var menuSize = menuElements.length - 1;
	$(menuElements[menuSize]).after('<div class="dropdown-moving-menu fa fa-angle-double-down">');
	$('<ul class="dropdown-insert-list">').appendTo('.dropdown-moving-menu');
	var dropdownInsertList = '.dropdown-insert-list';

	function rebuildMenu(){
		for(var i = 1; i < screenModeMenu; i++)
			menuElements[i-1].after(menuElements[i]);
		for(var i = screenModeMenu; i <= menuSize; i++)
			$(menuElements[i]).appendTo(dropdownInsertList);
	}
	function recalcModeMenu(){
		if(window.outerWidth > 768){
			screenModeMenu = Math.floor(window.outerWidth/200) - 2;
			screenModeMenu = screenModeMenu > menuSize ? menuSize : screenModeMenu;
			screenModeMenu = screenModeMenu < 2 ? 2: screenModeMenu;
            screenModeMenu = screenModeMenu > 6 ? 6: screenModeMenu;
			$('.dropdown-moving-menu').removeClass('disabled');
		}else{
			screenModeMenu = menuSize + 1;
			$('#site-navigation').addClass('mobile-menu');
			$('.dropdown-moving-menu').addClass('disabled');
			// Включается мобильное меню, перестраиваеться ДОМ узел меню
			// (приводиться в стандартный вид ДОМ узла с изменением стилей CSS)
		}
		rebuildMenu();
	}


	$(document).on('ready', function(){
		$('.wpcf7-tel').mask("(999) 999-9999");
		recalcModeMenu();
		var modeMenuTimeOut = 0;

		$(window).on('resize', function(){
			clearTimeout(modeMenuTimeOut);
			modeMenuTimeOut = setTimeout(recalcModeMenu,300);

		});

		$('.dropdown-moving-menu').on('click', function(){
			$(this).toggleClass('dropdown-active');
		});

		$('.mobile-menu-button').on('click', function(){
			$(this).parent().toggleClass('active-mobile-menu');
		});

		$('#goToTariff').on('click', function(){
			var dist = $('.price-list-block').offset().top;
			$('body').animate({scrollTop: dist-100}, 800);
		});

		$('.to-order').on('click', function(){
			$('.toggle-form').slideDown();
			document.querySelector('#tariff-name-form').innerText = $(this.parentNode).find('.traff-name-value')[0].innerText;
		});

		$('.callback-footer').on('click', function(){
			$('#about-form-over').fadeIn(400,function(){
				$('#about-form').css('display', 'block').animate({opacity: 1, top: '50%'}, 200);
			});
		});
		$('#popup-close_close, #about-form-over').click( function(){
			$('#about-form').animate({opacity: 0, top: '45%'}, 200, function(){
				$(this).css('display', 'none');
				$('#about-form-over').fadeOut(400);
			});
		});
	});

	formValidator('.order-form');
	formValidator('#about-form');
	formValidator('#order-form');

	function formValidator(selector){
		var name = $(selector).find('.valid--name input');
		var tel = $(selector).find('.valid--phone input');
		var email = $(selector).find('.valid--email input');

		$(selector).find('.wpcf7-submit').on('click', function(event) {
			var flag = true;
			if ($(name).hasClass('wpcf7-validates-as-required')) flag =  formValidName(name) && flag;
			if ($(tel).hasClass('wpcf7-validates-as-required')) flag = formValidTel(tel) && flag;
			if ($(email).hasClass('wpcf7-validates-as-required')) flag = formValidEmail(email) && flag;
			if(!flag){event.preventDefault();}
			else{resetStatusField(name, tel, email);}
		});
	}

	function formValidName(field){
		if($(field).val().length < 1)
			return setInvalidField(field);
		return setValidField(field);

	}
	function formValidEmail(field){
		if($(field).val().indexOf('@') == '-1' ||$(field).val().indexOf('.') == '-1')
			return setInvalidField(field);
		return setValidField(field);

	}
	function formValidTel(field){
		if($(field).val().length < 1)
			return setInvalidField(field);
		return setValidField(field);

	}
	function setValidField(field){
		$(field).removeClass('invalid-form-field').addClass('valid-form-field');
		return true;
	}
	function setInvalidField(field){
		$(field).addClass('invalid-form-field').removeClass('valid-form-field');
		return false;
	}

	function resetStatusField(){
		for(var i = 0; i < arguments.length; i++)
			$(arguments[i]).removeClass('valid-form-field').removeClass('invalid-form-field');
	}
});

jQuery(function($) {
	var AJAXLoad = 0;
	$(document).on('ready', function(){
		$('#changeCity').click(function(){
			var list = document.querySelector('#city-list');
			list.classList.add('active');
			document.querySelector('body').classList.add('sticky');
			$.ajax({
				type: "POST",
				url: '/wp-admin/admin-ajax.php',
				data: {
					action: 'getCityList',
					code: code_generator
				},
				success: function (result) {
					result = JSON.parse(result);
					AJAXLoad = result;
					for(var city in result){
						var DOM_city = document.createElement('div');
						DOM_city.classList.add('select-city');
						DOM_city.innerText = city;
						list.appendChild(DOM_city);
					}
					$('.select-city').click(selectCity);
				},
				error: function (error) {

				}
			});
		});

		$('#auto-streeter').keyup(function(){
			var inner = $(this).val();
			var list = document.querySelector('#streeter-list');
			if(inner.length > 1){
				while(list.lastChild)
					list.removeChild(list.lastChild);

				for (var elem in window.AJAXStreet)
					if (elem.indexOf(inner) != -1 && elem != 'planList') {
						var li = document.createElement('li');
						li.classList.add('select-street');
						li.innerText = elem;
						list.appendChild(li);
						document.querySelector('#streeter-list').classList.add('active-list');
					}
			}
			if(inner.length < 2){
				document.querySelector('#streeter-list').classList.remove('active-list');
			}
		}).click(function(){
			document.querySelector('#streeter-list').classList.add('active-list');
		});

		$('#auto-homer').keyup(function(){
			var inner = $(this).val();
			var list = document.querySelector('#homer-list');

			while(list.lastChild)
				list.removeChild(list.lastChild);
			var street = document.querySelector('#auto-streeter').value;
			var selectStreet = window.AJAXStreet[street];
			for (var elem in selectStreet)
				if (elem.indexOf(inner) != -1 && selectStreet[elem][0] != "Не в продаже") {
					var li = document.createElement('li');
					li.classList.add('select-home');
					li.innerText = elem;
					list.appendChild(li);
				}
		}).click(function(){
			document.querySelector('#homer-list').classList.add('active-list');
		});

		document.body.addEventListener('click', function(event){
			if(event.target.id != "auto-streeter")
				document.querySelector('#streeter-list').classList.remove('active-list');
			if(event.target.id != "auto-homer")
				document.querySelector('#homer-list').classList.remove('active-list');
		});

		document.querySelector('#streeter-list').addEventListener('click', function(event){
			if(event.target.classList.contains('select-street')) {
				$('#auto-streeter').val(event.target.innerText);
				var list = document.querySelector('#streeter-list');
				while(list.lastChild)
					list.removeChild(list.lastChild);
			}
		});

		document.querySelector('#homer-list').addEventListener('click', function(event){
			if(event.target.classList.contains('select-home')) {
				$('#auto-homer').val(event.target.innerText);
				var list = document.querySelector('#homer-list');
				while(list.lastChild)
					list.removeChild(list.lastChild);
			}
		});

		document.querySelector('#order_send-form').addEventListener('click', function(event){
			document.querySelector('.tv-or-net').value = code_generator;
			document.querySelector('.city-hidden').value = document.querySelector('#changeCity').innerText;
			document.querySelector('.tariff-hidden').value = document.querySelector('#tariff-name-form').innerText;
			document.querySelector('.street-hidden').value = document.querySelector('#auto-streeter').value;
			document.querySelector('.home-hidden').value = document.querySelector('#auto-homer').value;
			document.querySelector('.stock-hidden').value = window.AJAXStreet[document.querySelector('#auto-streeter').value][document.querySelector('#auto-homer').value][1];
		})
	});
//lemishenkooleg
	var selectCity = function(){
		window.AJAXStreet = AJAXLoad[this.innerText];
		document.querySelector('#changeCity').innerText = this.innerText;
		document.querySelector('#city-list').classList.remove('active');
		document.querySelector('body').classList.remove('sticky');
		var parent = document.querySelector('#city-list');
		while(parent.lastChild){
			parent.removeChild(parent.lastChild);
		}
		changePriceBlock();
	};

	var changePriceBlock = function(){
		var blocks = $('.price-list-item');
		var count = 0;
		if(code_generator == 'TVnet'){
			window.AJAXStreet.planList = window.AJAXStreet.planList['Акционная АП'];
		}
		for(var plan in window.AJAXStreet.planList){

			if(code_generator == 'TVnet'){
				if(count == 0) continue;
				$(blocks[count]).find('.old-price')[0].innerText = +window.AJAXStreet.planList[plan][0] + 20;
			}
			$(blocks[count]).find('.traff-name-value')[0].innerText = plan;
			$(blocks[count]).find('.traff-price')[0].innerText = window.AJAXStreet.planList[plan][0];
			$(blocks[count]).find('.traff-speed')[0].innerText = window.AJAXStreet.planList[plan][1];


			count++;
		}
	}
});