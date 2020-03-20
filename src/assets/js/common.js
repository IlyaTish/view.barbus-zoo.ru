/* Functions */

// Document ready function
const ready = (callback) => {
  if (document.readyState != 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
}



// Toggle class function
const toggleClass = (targetElem, elem, activeClass) => {
  elem.addEventListener('click', () => {
    targetElem.classList.toggle(activeClass);
  });
}



// Close open menu if click is outside menu or menu children
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



// Teleport function for teleport layout
const teleport = (width, elem, cont_1, cont_2, appendChild) => {
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
    }

    else {
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



/* Change header styles on scroll, teleport caatalog-menu on scroll */
const headerFix = () => {
  const width_1199     = '(min-width: 1199px)',
        appendChild    = true,
        // Elements
        catalogMenu      = document.querySelector('.catalog-menu'),
        // Containers
        headerCont       = document.querySelector('.header-cont'),
        headerInfoCont   = document.querySelector('.header__info-cont'),
        headerBottomCont = document.querySelector('.header-bottom').querySelector('.container');

  let flag = 1;

  window.addEventListener('scroll', () => {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    if (viewportWidth > 1199) {
      if (window.pageYOffset >= 170) {
        if (flag === 1) {
          flag = 0;
          setTimeout(() => {
            headerCont.classList.add('header-cont--fixed');
            headerInfoCont.appendChild(catalogMenu);
          }, 0);
        }
      }

      else {
        if (flag === 0) {
          flag = 1;
          headerCont.classList.remove('header-cont--fixed');
          headerBottomCont.appendChild(catalogMenu);
        }
      }
    }

    else {
      headerCont.classList.remove('header-cont--fixed');
      headerBottomCont.appendChild(catalogMenu);
    }
  });
}



const catalogLinksHover = () => {
  const catItems      = document.querySelectorAll('.catalog-menu__item'),
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

    // Set price default
    price.setAttribute('data-default-price', parseInt(price.textContent));
    const defaultPrice = parseInt(price.getAttribute('data-default-price'));

    // Listen arrow minus button click
    arrowMinus.addEventListener('click', (e) => {
      quantityMinus();
    });

    // Listen arrow plus button click
    arrowPlus.addEventListener('click', (e) => {
      quantityPlus();
    });

    // Remove product, when arrow minus button clicked
    const quantityMinus = () => {
      if (quantityNum.value > 1) {
        quantityNum.setAttribute('value', --quantityNum.value);
        price.innerHTML = (parseInt(price.textContent.replace(/[^\d.]/g, ''), 10) - defaultPrice).toLocaleString('ru-RU');
      }
    }

    // Add product, when arrow plus button clicked
    const quantityPlus = () => {
      quantityNum.setAttribute('value', ++quantityNum.value);

      price.innerHTML = (parseInt(price.textContent.replace(/[^\d.]/g, ''), 10) + defaultPrice).toLocaleString('ru-RU');
    }

    // Check correct value of ('.quantity-num')
    quantityNum.addEventListener('keyup', (e) => {
      const val = parseInt(e.target.value),
            min = parseInt(e.target.getAttribute('min')),
            max = parseInt(e.target.getAttribute('max'));

      // If ('.quantity-num') value is equals to min value, set to min
      // If ('.quantity-num') value is equals to max value, set to max
      if (val <= min) {
        e.target.value = min;
      } else if (val > max) {
        e.target.value = max;
      }

      quantityNum.setAttribute('value', e.target.value);

      price.innerHTML = (e.target.value * defaultPrice).toLocaleString('ru-RU');
    });

    // Check correct value of ('.quantity-num')
    quantityNum.addEventListener('blur', (e) => {
      const min = parseInt(e.target.getAttribute('min')),
            max = parseInt(e.target.getAttribute('max'));

      // If ('.quantity-num') is empty or equals to 0, set to min value
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



const collapseFn = () => {
  const collapse       = document.querySelector('.collapse'),
        collapseTitle  = document.querySelectorAll('.collapse__title'),
        collapseActive = 'active';

  [].forEach.call(collapseTitle, (item) => {
    const height     = item.clientHeight,
          parent     = item.parentElement.parentElement,
          contHeight = parent.querySelector('.collapse-content').clientHeight;

    const checkActive = () => {
      if (!parent) {
        return null;
      } else if (parent.classList.contains(collapseActive)) {
        parent.style.maxHeight = ''+ contHeight +'px';
      } else if (!parent.classList.contains(collapseActive)) {
        parent.style.maxHeight = ''+ height +'px';
      }
    }

    checkActive();

    item.addEventListener('click', (e) => {
      console.log(parent);
      if (parent.classList.contains(collapseActive)) {
        parent.style.maxHeight = ''+ height +'px';
        parent.classList.remove(collapseActive);
      } else if (!parent.classList.contains(collapseActive)) {
        parent.style.maxHeight = ''+ contHeight +'px';
        parent.classList.add(collapseActive);
      }
    });
  });
}



// Variables
const btn         = document.querySelector('.btn'),
      btns        = document.querySelectorAll('.btn'),
      popup       = document.querySelector('.popup'),
      popups      = document.querySelectorAll('.popup'),
      popupLinks  = document.querySelectorAll('.popup-link'),
      popupCont   = document.querySelector('.popup__cont');

/* Popup function */
const popupFunc = () => {
  const popupsId   = [],
        btnHrefs   = [];

  [].forEach.call(popups, (popupElem) => {
    popupsId.push(popupElem.getAttribute('id'));

    document.addEventListener('click', (e) => {
      const isClickInside = popupCont.contains(e.target);

      if (!isClickInside && popupElem.classList.contains('active')) {
        popupElem.classList.remove('active');
      }
    });

    popupElem.addEventListener('submit', (e) => {
      e.preventDefault();
      popupElem.classList.remove('active');
      popupThanks.classList.add('active');
    });
  });

  [].forEach.call(popupLinks, (link) => {
    const linkHref = link.getAttribute('href').replace('#', '');
    btnHrefs.push(linkHref);

    link.addEventListener('click', () => {
      setTimeout(() => {
        popups.forEach(popupElem => {
          if (popupElem.getAttribute('id') === linkHref) {
            popupElem.classList.add('active');

            const btnClose = popupElem.querySelector('.btn-close'),
                  popupBg  = popupElem.querySelector('.popup-bg');

            btnClose.addEventListener('click', () => {
              popupElem.classList.remove('active');
            });

            popupBg.addEventListener('click', () => {
              popupElem.classList.remove('active');
            });
          }
        });
      });
    });
  });
}



/*  Js after DOM is loaded */
ready(() => {
  selectStyle();
  headerFix();
  catalogLinksHover();
  quantityProducts();
  delimiter();
  tabs();
  collapseFn();
  popupFunc();



  // Mask for phone input
  const phoneInput  = document.querySelector('.phone-input');
  const maskOptions = { mask: '+{7} (000) 000-00-00' };
  const mask        = IMask(phoneInput, maskOptions);



  // Width
  var width_1260 = '(min-width: 1260px)',
      width_1200 = '(max-width: 1200px)',
      width_1199 = '(max-width: 1199px)',
      width_991  = '(max-width: 991px)',
      width_767  = '(max-width: 767px)',

      // Header elements
      headerAccount = document.querySelector('.header__account'),
      headerCart    = document.querySelector('.header__cart'),

      // Header container variables
      headerCont        = document.querySelector('.header').querySelector('.container'),
      headerInfoCont    = document.querySelector('.header__info-cont'),
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
  if (window.matchMedia(width_1199).matches) {
    teleport(width_1199, headerCart, headerBottomCont, headerButtonsCont, appendChild);
    teleport(width_1199, headerAccount, headerPhoneCont, headerButtonsCont, appendChild);
  }

  if (window.matchMedia(width_767).matches) {
    // ('.burger-menu'), ('.catalog-menu') teleport on screen smaller then 767px
    teleport(width_767, burgerMenu, headerCont, headerBottomCont, appendChild);
    teleport(width_767, catalogMenu, headerCont, headerBottomCont, appendChild);
    // ('.header__cart') teleport on screen smaller then 767px
    teleport(width_767, headerCart, headerCont, headerBottomCont, appendChild);
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
    teleport(width_1260, offerDopTitle, offerDopCont, offerDopEmpty, appendChild);
  }



  if (document.querySelector('.catalog-list') || document.querySelector('.akvablog-page')) {
    // Catalog-list elements
    var catalogSelect = document.querySelector('.filters-sort'),

        //Catalog-list container
        catalogListCont = document.querySelector('.heading__row'),
        filtersCont     = document.querySelector('.filters').querySelector('.container');

    // ('.filters-sort') element teleport
    teleport(width_991, catalogSelect, catalogListCont, filtersCont, appendChild);
  }


  let flag_1 = 1,
      flag_2 = 1,
      flag_3 = 1,
      flag_4 = 1;

  window.onresize = () => {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const teleportOnResize = () => {
      if (viewportWidth > 1199) {
        if (flag_1 === 1) {
          flag_2 = 1;
          flag_3 = 1;

          headerButtonsCont.appendChild(headerCart);
          headerButtonsCont.appendChild(headerAccount);

          flag_1 = 0;
        }
      }

      if (viewportWidth > 768 && viewportWidth < 1199) {
        if (flag_2 === 1) {
          flag_1 = 1;
          flag_3 = 1;

          headerBottomCont.appendChild(headerCart);
          headerPhoneCont.appendChild(headerAccount);
          headerBottomCont.appendChild(catalogMenu);
          headerBottomCont.appendChild(burgerMenu);

          flag_2 = 0;
        }
      }

      if (viewportWidth < 767) {
        if (flag_3 === 1) {
          flag_1 = 1;
          flag_2 = 1;

          headerCont.appendChild(headerCart);
          headerCont.appendChild(headerAccount);
          headerCont.appendChild(catalogMenu);
          headerCont.appendChild(burgerMenu);

          flag_3 = 0;
        }
      }
    }

    if (window.matchMedia(width_1260).matches) {
      // ('.offer__title') element teleport on screen smaller then 1260px and onresize
      teleport(width_1260, offerDopTitle, offerDopCont, offerDopEmpty, appendChild);
    }

    if (window.matchMedia(width_991).matches) {
      // ('.filters-sort') element teleport teleport on screen smaller then 991px and onresize
      if (document.querySelector('.catalog-list') || document.querySelector('.akvablog-page')) {
        teleport(width_991, catalogSelect, catalogListCont, filtersCont, appendChild);
      }
    }

    collapseFn();
    headerFix();
    teleportOnResize();
  }



  // Swiper slider settings and options
  const mainSwiper = new Swiper('.main-swiper', {
      loop: true,
      effect: 'fade',
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


  if (!document.querySelector('.catalog-list')) {
    const products = document.querySelectorAll('.products');

    [].forEach.call(products, (el, index) => {
      const btnPrev = el.querySelector('.swiper-button-prev'),
            btnNext = el.querySelector('.swiper-button-next');

      el.classList.add('products-'+ index);

      btnNext.classList.add('btn-next-'+ index);
      btnPrev.classList.add('btn-prev-'+ index);

      const swiperProducts = new Swiper('.swiper-products', {
        loop: true,
        autoplay: {
          delay: 10000
        },
        spaceBetween: 20,
        slidesPerView: 1,
        longSwipesMs: 600,
        centeredSlide: true,
        navigation: {
          nextEl: '.btn-next-'+ index,
          prevEl: '.btn-prev-'+ index
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        breakpoints: {
          489: {
            slidesPerView: 'auto',
          },
          1199: {
            slidesPerView: 4,
            freeMode: true,
            freeModeMomentumRatio: 0.3,
            freeModeSticky: true,
            freeModeMomentumBounce: false,
            longSwipesRatio: 0
          }
        }
      });
    });
  }


  const instaSwiper = new Swiper('.swiper-insta', {
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
        slidesPerView: 2,
        allowTouchMove: true,
        autoplay: {
          delay: 10000
        }
      },
      1240: {
        autoplay: false,
        slidesPerView: 'auto',
        freeMode: true,
        centeredSlide: false,
        allowTouchMove: false
      }
    }
  });


  const modalGallery = new Swiper('.swiper-modal-gallery', {
    loop: false,
    touchEventsTarget: '.modal-gallery__item',
    spaceBetween: 20,
    slidesPerView: 1,
    centeredSlide: true,
    navigation: {
      nextEl: '.modal-gallery .swiper-button-next',
      prevEl: '.modal-gallery .swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      489: {
        slidesPerView: 'auto',
        allowTouchMove: true,
        autoplay: {
          delay: 10000
        }
      },
      1240: {
        autoplay: false,
        slidesPerView: 'auto',
        freeMode: true,
        centeredSlide: false,
        allowTouchMove: false
      }
    }
  });
});
