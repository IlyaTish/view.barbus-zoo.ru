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



/*  Js after DOM is loaded */
ready(function() {
  selectStyle();
});
