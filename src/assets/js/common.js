/* Functions */

// Document ready function
var ready = function(callback) {
  if (document.readyState != 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
}



// Check if block has active class
function checkActive(elem, class) {
  if (elem.classList.contains(class)) {
    elem.classList.remove(class);
  } else {
    elem.classList.add(class);
  }
}



function toggleClass(targetElem, elem, activeClass) {
  elem.addEventListener('click', function() {
    targetElem.classList.toggle(activeClass);
  });
}



function closeMenu(elem, btn, elemActiveClass, btnActiveClass) {
  document.addEventListener('click', function(event) {
    var isClickInside = elem.contains(event.target),
        isBtnClicked  = btn.contains(event.target);

    if (!isClickInside && !isBtnClicked) {
      //the click was outside the elem
      elem.classList.remove(elemActiveClass);
      btn.classList.remove(btnActiveClass);
    }
  });
}



function adaptive(width, elem, cont_1, cont_2, appendChild) {
  if (window.matchMedia(width).matches) {
    // do functionality on screens smaller than width
    if (elem && cont_1) {
      cont_1.appendChild(elem);
    }
  }

  else {
    if (appendChild === true) {
      if (elem && cont_2) {
        cont_2.appendChild(elem);
      }
    } else {
      if (elem && cont_2) {
        cont_2.after(elem);
      }
    }
  }
}



/* Function for styling select */
function selectStyle() {
  // Variables
  var cont = document.querySelector('form');
  var selectInputs = document.querySelectorAll('.select');
  var dropDownActive = 'select-box__dropdown--active';

  [].forEach.call(selectInputs, function(select) {
    var selectBox = document.createElement('div');
    var selectBoxActive = 'select-box--active';

    selectBox.classList.add('select-box');
    selectBox.innerHTML = '<div class="select-box__cont"></div>';

    var dropDown = document.createElement('div');
    dropDown.classList.add('select-box__dropdown');

    var selectBoxCont = selectBox.firstChild;
    var options = select.children;

    [].forEach.call(options, function(option) {
      var selectedOption = select.options[select.selectedIndex].textContent;

      if (selectedOption) {
        selectBoxCont.innerHTML = selectedOption;
      }

      if (option.getAttribute('data-skip')) {
        return true;
      }

      var li = document.createElement('li');
      li.innerHTML = '<span>' + option.getAttribute('data-html-text') + '</span>';

      li.addEventListener('click', function() {
        selectBoxCont.innerHTML = option.textContent;
        selectBox.classList.remove(selectBoxActive);
        dropDown.classList.remove(dropDownActive);
        select.setAttribute('value', option.getAttribute('value'));
        return;
      });

      dropDown.append(li);
    });

    selectBox.append(dropDown);
    select.style.display = 'none';
    select.after(selectBox);

    toggleClass(dropDown, selectBoxCont, dropDownActive);
    toggleClass(selectBox, selectBoxCont, selectBoxActive);
    closeMenu(dropDown, selectBoxCont, dropDownActive);
  });
}



/* Change header styles when scroll */
function headerFix() {
  var width_1199 = '(min-width: 1199px)';
  var headerHight      = 170, // Header hight
      appendChild      = true,
      // Element
      catalogMenu      = document.querySelector('.catalog-menu'),
      // Containers
      headerCont       = document.querySelector('.header-cont'),
      headerInfoCont   = document.querySelector('.header__info-cont'),
      headerBottomCont = document.querySelector('.header-bottom').querySelector('.container');

  window.addEventListener('scroll', function(e) {
    if (window.matchMedia(width_1199).matches) {
      if (window.pageYOffset >= 170) {
        headerCont.classList.add('header-cont--fixed');
        adaptive(width_1199, catalogMenu, headerInfoCont, headerBottomCont, appendChild);
      } else {
        headerCont.classList.remove('header-cont--fixed');
        adaptive(width_1199, catalogMenu, headerBottomCont, headerInfoCont, appendChild);
      }
    } else {
      return;
    }
  });
}



/* Count amount of products */
function quantityProducts() {
  var products = document.querySelectorAll('.product');

  [].forEach.call(products, function(product) {
    var arrowMinus = product.querySelector('.quantity-arrow-minus');
    var arrowPlus = product.querySelector('.quantity-arrow-plus');
    var quantityNum = product.querySelector('.quantity-num');

    var price = product.querySelector('.product__price');
    var priceVal = parseInt(price.textContent);

    price.setAttribute('data-default-price', parseInt(price.textContent));

    var defaultPrice = parseInt(price.getAttribute('data-default-price'));

    arrowMinus.addEventListener('click', function(e) {
      quantityMinus();
    });

    arrowPlus.addEventListener('click', function(e) {

      quantityPlus();
    });

    function quantityMinus() {
      if (quantityNum.value > 1) {
        quantityNum.setAttribute('value', --quantityNum.value);
        price.innerHTML = (parseInt(price.textContent.replace(/[^\d.]/g, ''), 10) - defaultPrice).toLocaleString('ru-RU');
      }
    }

    function quantityPlus() {
      quantityNum.setAttribute('value', ++quantityNum.value);

      price.innerHTML = (parseInt(price.textContent.replace(/[^\d.]/g, ''), 10) + defaultPrice).toLocaleString('ru-RU');
    }

    quantityNum.addEventListener('keyup', function(e) {
      val = parseInt(e.target.value);
      min = parseInt(e.target.getAttribute('min'));
      max = parseInt(e.target.getAttribute('max'));

      if (val <= min) {
        e.target.value = min;
      } else if (val > max) {
        e.target.value = max;
      }

      quantityNum.setAttribute('value', e.target.value);

      price.innerHTML = (e.target.value * defaultPrice).toLocaleString('ru-RU');
    });

    quantityNum.addEventListener('blur', function(e) {
      if (e.target.value == '') {
        e.target.value = min;
      } else if (e.target.value == '0') {
        e.target.value = min;
      }

      quantityNum.setAttribute('value', e.target.value);

      price.innerHTML = (e.target.value * defaultPrice).toLocaleString('ru-RU');
    });
  });
}



/* Add delimiter to prices */
function delimiter() {
  var prices = document.querySelectorAll('.product__price');

  [].forEach.call(prices, function(price) {
    price.innerHTML = (parseInt(price.textContent) * 1)
    .toLocaleString('ru-RU')
  });
}



/*  Js after DOM is loaded */
ready(function() {
  selectStyle();
  headerFix();
  quantityProducts();
  delimiter();



    // Width
    var width_1199 = '(max-width: 1199px)',
        width_991  = '(max-width: 991px)',
        width_767  = '(max-width: 767px)',

        // Header elements
        headerAccount = document.querySelector('.header__account'),
        headerCart    = document.querySelector('.header__cart'),

        // Header container variables
        headerCont        = document.querySelector('.header').querySelector('.container'),
        headerPhoneCont   = document.querySelector('.header__phone').querySelector('.header__row'),
        headerBottomCont  = document.querySelector('.header-bottom').querySelector('.container'),
        headerButtonsCont = document.querySelector('.header__buttons'),

        // Burger-menu elements ('.burger-menu')
        burgerMenu       = document.querySelector('.burger-menu'),
        burgerMenuBtn    = document.querySelector('.burger-menu-btn'),
        burgerMenuActive = 'burger-menu--active',

        // Catalog-menu elements ('.catalog-menu')
        catalogMenu        = document.querySelector('.catalog-menu'),
        catalogMenuActive  = 'catalog-menu--active',

        // Catalog-list elements
        catalogList   = document.querySelector('.catalog-list'),
        catalogSelect = document.querySelector('.catalog-list').querySelector('.filters-sort'),

        //Catalog-list container
        catalogListCont = document.querySelector('.catalog-list__row'),
        filtersCont     = document.querySelector('.filters').querySelector('.container'),

        appendChild = true;

    // ('.header__cart'), ('.header__account') teleport
    adaptive(width_1199, headerCart, headerBottomCont, headerButtonsCont, appendChild);
    adaptive(width_1199, headerAccount, headerPhoneCont, headerButtonsCont, appendChild);

    if (window.matchMedia(width_767).matches) {
      // ('.burger-menu'), ('.catalog-menu') teleport on screen smaller then 767px
      adaptive(width_767, burgerMenu, headerCont, headerBottomCont, appendChild);
      adaptive(width_767, catalogMenu, headerCont, headerBottomCont, appendChild);

      // ('.header__cart') teleport on screen smaller then 767px
      adaptive(width_767, headerCart, headerCont, headerBottomCont, appendChild);
    }

    // Toggle classes on ('.burger-menu') click event
    toggleClass(catalogMenu, burgerMenu, catalogMenuActive);
    toggleClass(burgerMenu, burgerMenu, burgerMenuActive);

    // Close ('.catalog-menu') when document clicked
    closeMenu(catalogMenu, burgerMenu, catalogMenuActive, burgerMenuActive);

    if (catalogList) {
      // Catalog-list page teleport
      adaptive(width_991, catalogSelect, catalogListCont, filtersCont, appendChild);
    }

    window.onresize = function() {
      // ('.header__cart'), ('.header__account') teleport onresize
      adaptive(width_1199, headerCart, headerBottomCont, headerButtonsCont, appendChild);
      adaptive(width_1199, headerAccount, headerPhoneCont, headerButtonsCont, appendChild);

      if (window.matchMedia(width_767).matches) {
        adaptive(width_767, headerCart, headerCont, headerBottomCont, appendChild);
      }

      // ('.burger-menu'), ('.catalog-menu') teleport on screen smaller then 767px and onresize
      adaptive(width_767, burgerMenu, headerCont, headerBottomCont, appendChild);
      adaptive(width_767, catalogMenu, headerCont, headerBottomCont, appendChild);

      // Catalog-list page teleport on resize
      adaptive(width_991, catalogSelect, catalogListCont, filtersCont, appendChild);
    }



  // Catalog variables
  var appendChild = true,
      width_1260  = '(max-width: 1260px)',
      offerDop    = document.querySelector('.offer-dop');

  if (offerDop) {
    // Catalog page elements
    var offerDopTitle = document.querySelector('.offer-dop').querySelector('.offer__title'),
        // Catalog page container variables
        offerDopCont  = document.querySelector('.offer-dop').querySelector('.container'),
        offerDopEmpty = document.querySelector('.offer-dop').querySelector('.offer__empty');
    // Catalog page teleport
    adaptive(width_1260, offerDopTitle, offerDopCont, offerDopEmpty, appendChild);
    // Catalog page teleport on resize
    window.onresize = function() {
      adaptive(width_1260, offerDopTitle, offerDopCont, offerDopEmpty, appendChild);
    }
  }



  // Swiper slider settings and options
  var mainSwiper = new Swiper('.main-swiper', {
      loop: true,
      effect: 'coverflow',
      autoplay: {
        delay: 10000,
      },
      spaceBetween: 20,
      slidesPerView: 1,
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
  });



  var breakpoint = window.matchMedia('(min-width: 1280px)');
  var swiper;

  function swiper_1() {
    if (breakpoint.matches === true) {
      if (swiper !== undefined) {
        swiper.destroy(true, true);
      } else {
        return;
      }
    } else if (breakpoint.matches === false) {
      swiper = new Swiper('.swiper-products', {
        loop: false,
        autoplay: {
          delay: 10000
        },
        spaceBetween: 20,
        slidesPerView: 1,
        centeredSlide: true,
        navigation: {
          nextEl: '.products .swiper-button-next',
          prevEl: '.products .swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        breakpoints: {
          489: {
            slidesPerView: 'auto',
            freeMode: true,
            centeredSlide: false
          }
        }
      });
    }
  };

  function swiper_2() {
    if (breakpoint.matches === true) {
      if (swiper !== undefined) {
        swiper.destroy(true, true);
      } else {
        return;
      }
    } else if (breakpoint.matches === false) {
      swiper = new Swiper('.swiper-insta', {
        loop: false,
        autoplay: {
          delay: 10000
        },
        spaceBetween: 20,
        slidesPerView: 2,
        centeredSlide: true,
        navigation: {
          nextEl: '.insta .swiper-button-next',
          prevEl: '.insta .swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        breakpoints: {
          489: {
            slidesPerView: 'auto',
            freeMode: true,
            centeredSlide: false
          }
        }
      });
    }
  };

  breakpoint.addListener(swiper_1);
  swiper_1();

  breakpoint.addListener(swiper_2);
  swiper_2();
});
