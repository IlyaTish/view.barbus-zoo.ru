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


// Change active class on click
function activeClassOnEvent(elems, class) {
  [].forEach.call(elems, function(elem) {
    elem.addEventListener('click', function() {
      var current = document.getElementsByClassName(class);
          current[0].className = current[0].className.replace(' '+''+class+'', '');
          this.className += ' '+''+class+'';
    });
  });
}


function toggleClass(targetElem, elem, activeClass) {
  elem.addEventListener('click', function() {
    targetElem.classList.toggle(activeClass);
  });
}


function closeMenu(elem, btn, activeClass) {
  document.addEventListener('click', function(event) {
    var isClickInside = elem.contains(event.target),
        isBtnClicked  = btn.contains(event.target);

    if (!isClickInside && !isBtnClicked) {
      //the click was outside the elem
      elem.classList.remove(activeClass);
    }
  });
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


function delimiter() {
  var prices = document.querySelectorAll('.product__price');

  [].forEach.call(prices, function(price) {
    price.innerHTML = (parseInt(price.textContent) * 1)
    .toLocaleString('ru-RU')
  });
}


var breakpoint = window.matchMedia('(min-width: 1280px)');
var productsSwiper;

function breakpointChecker() {
  if (breakpoint.matches === true) {
    if (productsSwiper !== undefined) {
      productsSwiper.destroy(true, true);
    } else {
      return;
    }
  } else if (breakpoint.matches === false) {
    return enableSwiper();
  }
};


function enableSwiper() {
  productsSwiper = new Swiper('.products-swiper', {
    loop: false,
    autoplay: {
      delay: 10000
    },
    spaceBetween: 20,
    slidesPerView: 1,
    centeredSlide: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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



/*  Js after DOM is loaded */
ready(function() {
  selectStyle();
  quantityProducts();
  delimiter();

  var mainSwiper = new Swiper('.main-swiper', {
      loop: true,
      autoplay: {
        delay: 10000,
      },
      spaceBetween: 20,
      direction: 'horizontal',
      slidesPerView: 1,
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
  });

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
});
