/* Functions */

// Document ready function
const ready = (callback) => {
  if (document.readyState != 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
}



const toggleClass = (targetElem, elem, activeClass) => {
  elem.addEventListener('click', () => {
    targetElem.classList.toggle(activeClass);
  });
}



const closeMenu = (elem, btn, elemActiveClass, btnActiveClass) => {
  document.addEventListener('click', (e) => {
    const isClickInside = elem.contains(e.target),
          isBtnClicked  = btn.contains(e.target);

    if (!isClickInside && !isBtnClicked) {
      //the click was outside the elem
      elem.classList.remove(elemActiveClass);
      btn.classList.remove(btnActiveClass);
    }
  });
}



const adaptive = (width, elem, cont_1, cont_2, appendChild) => {
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
const selectStyle = () => {
  // Variables
  const cont           = document.querySelector('form'),
        selectInputs   = document.querySelectorAll('.select'),
        dropDownActive = 'select-box__dropdown--active';

  [].forEach.call(selectInputs, (select) => {
    const selectBox = document.createElement('div'),
          selectBoxActive = 'select-box--active';

    selectBox.classList.add('select-box');
    selectBox.innerHTML = '<div class="select-box__cont"></div>';

    const dropDown = document.createElement('div');
    dropDown.classList.add('select-box__dropdown');

    const selectBoxCont = selectBox.firstChild,
          options       = select.children;

    [].forEach.call(options, (option) => {
      const selectedOption = select.options[select.selectedIndex].textContent;

      if (selectedOption) {
        selectBoxCont.innerHTML = selectedOption;
      }

      if (option.getAttribute('data-skip')) {
        return true;
      }

      const li = document.createElement('li');
      li.innerHTML = '<span>' + option.getAttribute('data-html-text') + '</span>';

      li.addEventListener('click', () => {
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
const headerFix = () => {
  const width_1199     = '(min-width: 1199px)',
        headerHight    = 170, // Header hight
        appendChild    = true,
        // Element
        catalogMenu      = document.querySelector('.catalog-menu'),
        // Containers
        headerCont       = document.querySelector('.header-cont'),
        headerInfoCont   = document.querySelector('.header__info-cont'),
        headerBottomCont = document.querySelector('.header-bottom').querySelector('.container');

  window.addEventListener('scroll', (e) => {
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



const catalogLinksHover = () => {
  const catItems      = document.querySelectorAll('.catalog-menu__link'),
        catItemsIndex = [...catItems].reverse(),
        leftPos       = 20;

  [].forEach.call(catItemsIndex, (el, index) => {
    el.style.zIndex = ''+ ++index +'';
  });
}



/* Count amount of products */
const quantityProducts = () => {
  const products = document.querySelectorAll('.product-item');

  [].forEach.call(products, (product) => {
    const arrowMinus  = product.querySelector('.quantity-arrow-minus'),
          arrowPlus   = product.querySelector('.quantity-arrow-plus'),
          quantityNum = product.querySelector('.quantity-num');

    let price    = product.querySelector('.product__price'),
        priceVal = parseInt(price.textContent);

    price.setAttribute('data-default-price', parseInt(price.textContent));

    const defaultPrice = parseInt(price.getAttribute('data-default-price'));

    arrowMinus.addEventListener('click', (e) => {
      quantityMinus();
    });

    arrowPlus.addEventListener('click', (e) => {
      quantityPlus();
    });

    const quantityMinus = () => {
      if (quantityNum.value > 1) {
        quantityNum.setAttribute('value', --quantityNum.value);
        price.innerHTML = (parseInt(price.textContent.replace(/[^\d.]/g, ''), 10) - defaultPrice).toLocaleString('ru-RU');
      }
    }

    const quantityPlus = () => {
      quantityNum.setAttribute('value', ++quantityNum.value);

      price.innerHTML = (parseInt(price.textContent.replace(/[^\d.]/g, ''), 10) + defaultPrice).toLocaleString('ru-RU');
    }

    quantityNum.addEventListener('keyup', (e) => {
      const val = parseInt(e.target.value),
            min = parseInt(e.target.getAttribute('min')),
            max = parseInt(e.target.getAttribute('max'));

      if (val <= min) {
        e.target.value = min;
      } else if (val > max) {
        e.target.value = max;
      }

      quantityNum.setAttribute('value', e.target.value);

      price.innerHTML = (e.target.value * defaultPrice).toLocaleString('ru-RU');
    });

    quantityNum.addEventListener('blur', (e) => {
      const min = parseInt(e.target.getAttribute('min')),
            max = parseInt(e.target.getAttribute('max'));

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
const delimiter = () => {
  const prices = document.querySelectorAll('.product__price');

  [].forEach.call(prices, (price) => {
    price.innerHTML = (parseInt(price.textContent) * 1)
    .toLocaleString('ru-RU')
  });
}



const tabs = () => {
  const tabLinks   = document.querySelectorAll('.tabs a'),
        tabPanels  = document.querySelectorAll('.tab-panel');

  [].forEach.call(tabPanels, (el, index) => {
    el.setAttribute('data-index', ''+index+'');
  });

  for (let el of tabLinks) {
    const parentListItem = el.parentElement,
          index = [...parentListItem.parentElement.children].indexOf(parentListItem);

    el.addEventListener('click', e => {
      e.preventDefault();

      document.querySelector('.tab.tab--active').classList.remove('tab--active');
      document.querySelector('.tab-panel.tab-panel--active').classList.remove('tab-panel--active');

      parentListItem.classList.add('tab--active');

      const panel = [...tabPanels].filter(el => el.getAttribute('data-index') == index);
      panel[0].classList.add('tab-panel--active');
    });
  }

  if (document.querySelector('.show-more')) {
    const showMore = document.querySelector('.show-more');

    showMore.addEventListener('click', (e) => {
      showMore.classList.toggle('show-more--active');

      if (showMore.classList.contains('show-more--active')) {
        showMore.textContent = 'Свернуть';
      } else {
        showMore.textContent = 'Развернуть';
      }

      [].forEach.call(tabPanels, (el) => {
        el.classList.toggle('tab-panel--mh');
      });
    });
  }
}



/*  Js after DOM is loaded */
ready(() => {
  selectStyle();
  headerFix();
  catalogLinksHover();
  quantityProducts();
  delimiter();
  tabs();



  // Width
  var width_1260 = '(max-width: 1260px)',
      width_1199 = '(max-width: 1199px)',
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



  if (document.querySelector('.offer-dop')) {
    // Catalog page elements
    var offerDopTitle = document.querySelector('.offer-dop').querySelector('.offer__title'),

        // Catalog page container variables
        offerDopCont  = document.querySelector('.offer-dop').querySelector('.container'),
        offerDopEmpty = document.querySelector('.offer-dop').querySelector('.offer__empty');

    // Catalog page teleport
    adaptive(width_1260, offerDopTitle, offerDopCont, offerDopEmpty, appendChild);
  }



  if (document.querySelector('.catalog-list')) {
    // Catalog-list elements
    var catalogSelect = document.querySelector('.catalog-list').querySelector('.filters-sort'),

        //Catalog-list container
        catalogListCont = document.querySelector('.catalog-list__row'),
        filtersCont     = document.querySelector('.filters').querySelector('.container');

    // ('.filters-sort') element teleport
    adaptive(width_991, catalogSelect, catalogListCont, filtersCont, appendChild);
  }



  window.onresize = () => {
    // ('.header__cart'), ('.header__account') teleport onresize
    adaptive(width_1199, headerCart, headerBottomCont, headerButtonsCont, appendChild);
    adaptive(width_1199, headerAccount, headerPhoneCont, headerButtonsCont, appendChild);

    if (window.matchMedia(width_767).matches) {
      adaptive(width_767, headerCart, headerCont, headerBottomCont, appendChild);
    }

    // ('.burger-menu'), ('.catalog-menu') teleport on screen smaller then 767px and onresize
    adaptive(width_767, burgerMenu, headerCont, headerBottomCont, appendChild);
    adaptive(width_767, catalogMenu, headerCont, headerBottomCont, appendChild);

    // ('.filters-sort') element teleport teleport on screen smaller then 991px and onresize
    adaptive(width_991, catalogSelect, catalogListCont, filtersCont, appendChild);

    // ('.offer__title') element teleport on screen smaller then 1260px and onresize
    adaptive(width_1260, offerDopTitle, offerDopCont, offerDopEmpty, appendChild);
  }



  // Swiper slider settings and options
  const mainSwiper = new Swiper('.main-swiper', {
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

  const productGalleryThumbs = new Swiper('.product-gallery-thumbs', {
    loop: true,
    autoplay: {
      delay: 10000,
    },
    spaceBetween: 10,
    slidesPerView: 3,
    centeredSlides: true
  });

  const productGallery = new Swiper('.product-gallery', {
    loop: true,
    autoplay: {
      delay: 10000,
    },
    spaceBetween: 20,
    slidesPerView: 1,
    centeredSlides: true,
    thumbs: {
      swiper: productGalleryThumbs
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });



  const breakpoint = window.matchMedia('(min-width: 1280px)');
  let swiper;

  const swiper_1 = () => {
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

  const swiper_2 = () => {
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
