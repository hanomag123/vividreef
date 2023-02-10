document.addEventListener("DOMContentLoaded", () => {

  class Menu {
    constructor(menuElement, buttonElement, header) {
      this.menu = typeof menuElement === "string" ? document.querySelector(menuElement) : menuElement
      this.button = typeof buttonElement === "string" ? document.querySelector(buttonElement) : buttonElement
      this.buttons = this.menu.querySelectorAll('.closeMenuButtons');
      this.overlay = document.createElement('div');
      this.overlay.hidden = true
      this.header = header
      this._init();
    }

    _init() {
      this.header.appendChild(this.overlay);
      this.overlay.classList.add('overlay');

      this.overlay.addEventListener('click', this.toggleMenu.bind(this));
      this.button.addEventListener('click', this.toggleMenu.bind(this));
      if (this.buttons.length) {
        this.buttons.forEach(el => {
          el.addEventListener('click', this.closeMenu.bind(this));
        });
      }
    }

    toggleMenu() {
      this.menu.classList.toggle('menu--open');
      this.button.classList.toggle('menu-button--active');
      this.overlay.hidden = !this.overlay.hidden

      if (this.isMenuOpen()) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    }

    closeMenu() {
      this.menu.classList.remove('menu--open');
      this.button.classList.remove('menu-button--active');
      this.overlay.hidden = true

      this.enableScroll();
    }

    isMenuOpen() {
      return this.menu.classList.contains('menu--open');
    }

    disableScroll() {
      // Get the current page scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      // if any scroll is attempted, set this to the previous value
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };
    }

    enableScroll() {
      window.onscroll = function () { };
    }
  }

  const menu = document.querySelector('.menu');
  const menuButton = document.querySelector('.menu-button');
  const header = document.querySelector('.header');

  if (menu && menuButton && header) {
    new Menu(menu, menuButton, header);
  }

  const gallerys = document.querySelectorAll('[data-thumbsgallery]');
  if (gallerys.length) {
    gallerys.forEach(el => {
      const dataset = el.dataset.thumbsgallery
      const thumb = el.querySelector(`[data-thumbs='${dataset}']`);
      if (thumb) {
        const swiperSlide = thumb.querySelector('.swiper-slide');
        
        if (swiperSlide) {
          const parent = swiperSlide.parentElement
          const images = el.querySelectorAll('.gallery-top-slide img') 
          if (images.length) {
            images.forEach(img => {
              const clone = swiperSlide.cloneNode(true);
              const cloneImg = clone.querySelector('img');
              if (cloneImg) {
                cloneImg.src = img.src
                parent.appendChild(clone);
              }
            });
          }
          swiperSlide.remove();
        }
      }
    });
  }

  const numberOfSlides0 = document.querySelectorAll('.tour__swiper .swiper-slide').length
  const swiper = new Swiper('.tour__swiper', {
    loop: numberOfSlides0 > 1,
    slidesPerView: 'auto',
    spaceBetween: 10,
    speed: 500,
    autoplay: {
      delay: 7000,
    },
    navigation: {
      nextEl: '.tour__swiper .next',
      prevEl: '.tour__swiper .prev',
    },
  });

  const numberOfSlides = document.querySelectorAll('.comments-swiper .swiper-slide').length
  const swiper2 = new Swiper('.comments-swiper', {
    loop: numberOfSlides > 1,
    slidesPerView: 'auto',
    speed: 500,
    autoplay: {
      delay: 7000,
    },
    navigation: {
      nextEl: '.comments-swiper .prev',
      prevEl: '.comments-swiper .next',
    },
  });
  swiper2.on('click', () => {
    swiper2.slides.forEach(el => {
      el.classList.remove('active');
      if (el.classList.contains('swiper-slide-active')) {
        el.classList.add('active');
      }
    });
  });

  const galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 0,
    slidesPerView: 'auto',
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    centerInsufficientSlides: true,
    slideToClickedSlide: true,
  });
  const galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    navigation: {
      nextEl: '.gallery-top .next',
      prevEl: '.gallery-top .prev',
    },
    thumbs: {
      swiper: galleryThumbs
    },
    rewind: true,
    on: {
      slideChange: function () {
        let activeIndex = this.activeIndex + 1;

        let activeSlide = document.querySelector(`.gallery-thumbs .swiper-slide:nth-child(${activeIndex})`);
        let nextSlide = document.querySelector(`.gallery-thumbs .swiper-slide:nth-child(${activeIndex + 1})`);
        let prevSlide = document.querySelector(`.gallery-thumbs .swiper-slide:nth-child(${activeIndex - 1})`);

        if (nextSlide && !nextSlide.classList.contains('swiper-slide-visible')) {
          this.thumbs.swiper.slideNext();
        } else if (prevSlide && !prevSlide.classList.contains('swiper-slide-visible')) {
          this.thumbs.swiper.slidePrev();
        }

      }
    }
  });

  const galleryThumbs2 = new Swiper('.gallery-thumbs2', {
    spaceBetween: 0,
    slidesPerView: 'auto',
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    centerInsufficientSlides: true,
    slideToClickedSlide: true,
    breakpoints: {
      // when window width is >= 1025px
      // 1025: {
      //   slidesPerView: 5,
      // },
    }
  });
  const galleryTop2 = new Swiper('.gallery-top2', {
    spaceBetween: 10,
    navigation: {
      nextEl: '.gallery-top2 .next',
      prevEl: '.gallery-top2 .prev',
    },
    thumbs: {
      swiper: galleryThumbs2
    },
    rewind: true,
    on: {
      slideChange: function () {
        let activeIndex = this.activeIndex + 1;

        let activeSlide = document.querySelector(`.gallery-thumbs2 .swiper-slide:nth-child(${activeIndex})`);
        let nextSlide = document.querySelector(`.gallery-thumbs2 .swiper-slide:nth-child(${activeIndex + 1})`);
        let prevSlide = document.querySelector(`.gallery-thumbs2 .swiper-slide:nth-child(${activeIndex - 1})`);

        if (nextSlide && !nextSlide.classList.contains('swiper-slide-visible')) {
          this.thumbs.swiper.slideNext();
        } else if (prevSlide && !prevSlide.classList.contains('swiper-slide-visible')) {
          this.thumbs.swiper.slidePrev();
        }

      }
    }
  });

  const galleryThumbs3 = new Swiper('.gallery-thumbs3', {
    spaceBetween: 0,
    slidesPerView: 'auto',
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    centerInsufficientSlides: true,
    slideToClickedSlide: true,
    breakpoints: {
      // when window width is >= 1025px
      // 1025: {
      //   slidesPerView: 5,
      // },
    }
  });
  const galleryTop3 = new Swiper('.gallery-top3', {
    spaceBetween: 10,
    navigation: {
      nextEl: '.gallery-top3 .next',
      prevEl: '.gallery-top3 .prev',
    },
    thumbs: {
      swiper: galleryThumbs3
    },
    rewind: true,
    on: {
      slideChange: function () {
        let activeIndex = this.activeIndex + 1;

        let activeSlide = document.querySelector(`.gallery-thumbs3 .swiper-slide:nth-child(${activeIndex})`);
        let nextSlide = document.querySelector(`.gallery-thumbs3 .swiper-slide:nth-child(${activeIndex + 1})`);
        let prevSlide = document.querySelector(`.gallery-thumbs3 .swiper-slide:nth-child(${activeIndex - 1})`);

        if (nextSlide && !nextSlide.classList.contains('swiper-slide-visible')) {
          this.thumbs.swiper.slideNext();
        } else if (prevSlide && !prevSlide.classList.contains('swiper-slide-visible')) {
          this.thumbs.swiper.slidePrev();
        }

      }
    }
  });

  var mySwiper = new Swiper ('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    loop: true,
    speed: 500,
    autoplay: {
      delay: 7000,
    },
    navigation: {
      nextEl: '.swiper-container .next',
      prevEl: '.swiper-container .prev',
    }
  });


  function modalHandler() {
    const modal = document.querySelector(`${this.dataset?.modal}`) || this
    if (modal.classList.contains('regModal') && modal.hidden) {
      disableScroll();
    } else {
      enableScroll();
    }
    if (modal) {
      if (modal.hidden) {
        modal.hidden = !modal.hidden
        modal.style.setProperty('pointer-events', 'auto');
        setTimeout(() => {
          modal.style.opacity = 1
        }, 10);
      } else {
        modal.style.opacity = 0
        modal.style.setProperty('pointer-events', null);
        const numb = Number(getComputedStyle(modal).transitionDuration.match(/(\d+\.\d+)|(\d+)/g)[0]);
        if (numb > 0) {
          modal.addEventListener('transitionend', hideaftertransition);
        } else {
          modal.hidden = true
        }
      }
    }
  }

  const regModal = document.querySelectorAll('.regModal');

  if (regModal) {
    regModal.forEach(el => {
      el.addEventListener('click', function () {
        if (event.target.classList.contains('regModal')) {
          modalHandler.apply(this);
        }
      });
      const closeButton = el.querySelector('.close-button');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          modalHandler.apply(el);
        });
      }
    });
  }

  const buttonsModal = document.querySelectorAll('[data-modal]');

  function hideaftertransition() {
    this.hidden = true
    this.removeEventListener('transitionend', hideaftertransition);
  }

  function hideaftertransition() {
    this.hidden = true
    this.removeEventListener('transitionend', hideaftertransition);
  }

  if (buttonsModal.length) {
    buttonsModal.forEach(el => el.addEventListener('click', modalHandler));
  }

  function addMask() {
    [].forEach.call(document.querySelectorAll('input[type="tel"]'), function (input) {
      let keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___ ___",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a
          });
        i = new_value.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i);
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function (a) {
            return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        this.parentElement.classList.remove('error');
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5) this.value = ""
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);

    });

  }
  addMask();

  function addMaskDate() {
    [].forEach.call(document.querySelectorAll('input.date-input'), function (input) {
      let keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let matrix = "__.__.____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a
          });
        i = new_value.indexOf("_");
        if (i != -1) {
          new_value = new_value.slice(0, i);
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function (a) {
            return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur") this.value = ""
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);

    });

  }
  addMaskDate();

  function disableScroll() {
    // Get the current page scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    document.documentElement.style.setProperty('scroll-behavior', 'auto');

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    document.documentElement.style.setProperty('scroll-behavior', null);
    window.onscroll = function () { };
  }

  for (const form of document.forms) {
    form.addEventListener('submit', function () {
      event.preventDefault();
      const formData = new FormData(this);
      const parent = this.closest('.regModal');
      const feedback = document.querySelector('#feedback');

      if (this.dataset.id === 'My-order-modal') {
        return
      }

      for(const key of formData.entries()) {
        console.log(key);
      }

      this.reset();

      if (parent) {
        modalHandler.apply(parent);
      } else {
        return
      }

      if (feedback) {
        modalHandler.apply(feedback);
      }
    });
  }

  const orderModels = document.querySelectorAll('[data-id="My-order-modal"]');
  
  if (orderModels.length) {
    orderModels.forEach(form => {
      form.addEventListener('submit', function () {
        event.preventDefault();
        const formData = new FormData(this);
  
          const orderModal = document.querySelector('#order-modal');
          if (orderModal) {
            const orderForm = orderModal.querySelector('form');
            if (orderForm) {
              for(let [key, value] of formData.entries()) {
                const input = orderForm.querySelector(`input[name='${key}']`);
                const div = orderForm.querySelector(`[data-name="${key}"]`)
                if (input) {
                  input.value = value;
                }
                if (div) {
                  div.innerHTML = value
                }
              }
            }
            modalHandler.apply(orderModal);
            
          }
      })
    })
  }

  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
          /* When an item is clicked, update the original select box,
          and the selected item: */
          var y, i, k, s, h, sl, yl, sel;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          sel = this.parentNode.previousSibling.classList.add('select-selected--active');
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
  
  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i);
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  
  function formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;
    return dd + '.' + mm + '.' + yy;
  }

  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);

  const date1 = document.querySelector('.start');

  if (date1) {
    const picker = datepicker(date1, {
      customMonths: ['Январь' , 'Февраль' , 'Март' , 'Апрель' , 'Май' , 'Июнь' , 'Июль' , 'Август' , 'Сентябрь' , 'Октябрь' , 'Ноябрь' , 'Декабрь' ],
      customDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      showAllDates: true,
      overlayPlaceholder: 'Год',
      overlayButton: "Выбрать",
      formatter: (input, date, instance) => {
        const data = formatDate(date);
        input.value = data
      },
      id: 1
    });
  }

  const date2 = document.querySelector('.end') 

if (date2) {
  const picker2 = datepicker(date2, {
    customMonths: ['Январь' , 'Февраль' , 'Март' , 'Апрель' , 'Май' , 'Июнь' , 'Июль' , 'Август' , 'Сентябрь' , 'Октябрь' , 'Ноябрь' , 'Декабрь' ],
    customDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    showAllDates: true,
    overlayPlaceholder: 'Год',
    overlayButton: "Выбрать",
    formatter: (input, date, instance) => {
      const data = formatDate(date);
      input.value = data;
    },
    id: 1
  });
}

const filterButton = document.querySelectorAll('.filter-button');
const filterPanels = document.querySelectorAll('.filter-panel');

if (filterButton.length) {
  filterButton.forEach(el => {
    el.addEventListener('click', function () {
      this.classList.toggle('active');
      if (this.classList.contains('active')) {
        disableScroll();
      } else {
        enableScroll();
      }
    });
  });
}
if (filterPanels.length) {
  filterPanels.forEach(el => {
    el.addEventListener('click', function () {
      const button =  event.target.previousElementSibling
      if (button && button.classList.contains('filter-button')) {
        button.click();
        return
      }
    });
    const closeButton = el.querySelector('.close-button');
    if (closeButton) {
      closeButton.addEventListener('click', function () {
        const parent = this.closest('.filter');
        if (parent) {
          const button = parent.querySelector('.filter-button');
          if (button) {
            button.click();
            return
          }
        }
      });
    }
  });
}

function animate(options) {

  var start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction от 0 до 1
    var timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;

    // текущее состояние анимации
    var progress = options.timing(timeFraction)
    
    options.draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}

function animateText(textArea) {
  let text = textArea.innerHTML;
  let to = text.length,
    from = 0;

  animate({
    duration: 3000,
    timing: bounce,
    draw: function(progress) {
      let result = (to - from) * progress + from;
      textArea.innerHTML = text.slice(0, Math.ceil(result))
    }
  });
}


function bounce(timeFraction) {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
}

const text = document.querySelector('[data-id="animate-text"]')

setTimeout(() => {
  if (text) {
    animateText(text)
  }
},300)

});











