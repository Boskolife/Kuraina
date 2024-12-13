burgerInit();

// Swiper:
let imageRotate = 0;

const slider = new Swiper('.main_swiper', {
  speed: 1400,
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  effect: 'creative',
  creativeEffect: {
    prev: {
      opacity: 0,
    },
    next: {
      opacity: 0,
    },
  },
  breakpoints: {
    320: {
      autoHeight: true,
    },
    1024: {
      autoHeight: false,
    },
  },
  on: {
    slideChange: (self) => {
      const sideWrap = document.querySelector('.progressBar');
      const logo = document.getElementById('logo');
      let progressBar = document.getElementById('progressBar');
      const rotateElem = document.querySelector('.progress_img');
      let progress = self.progress * (100 - 9.5);
      sideWrap.style.left = `${progress}%`;
      if (self.activeIndex > 0) {
        logo.style.opacity = '0';
      } else {
        logo.style.opacity = '1';
      }
    },

    slideChangeTransitionStart: function () {
      const activeSlide = this.slides[this.activeIndex];
      const textElements = document.querySelectorAll('.swiper-slide .text');

      textElements.forEach((textElement) => {
        textElement.classList.remove('activeText');
      });

      const activeText = activeSlide.querySelectorAll('.text');
      activeText.forEach((itemText) => {
        itemText.classList.add('activeText');
        activeSlide.scrollIntoView();
      });

      // if ((this.activeIndex + 1) % 2 === 0) {
      //     slider.allowSlideNext = false;
      //     slider.allowSlidePrev = false;

      //     setTimeout(() => {
      //         slider.allowSlideNext = true;
      //         slider.allowSlidePrev = true;
      //     }, 5000);
      // }
    },

    slideNextTransitionStart: (self) => {
      const rotateElem = document.querySelector('.progress_img');
      let progress = self.progress * 100;
      rotateElem.style.transform = `
            translateY(-50%) rotate(${(imageRotate += 90)}deg)
            `;
    },

    slidePrevTransitionStart: (self) => {
      const rotateElem = document.querySelector('.progress_img');
      let progress = self.progress * 100;
      rotateElem.style.transform = `
            translateY(-50%) rotate(${(imageRotate -= 90)}deg)
            `;
    },
  },
});

function burgerInit() {
  const burger = document.querySelector('.header-burger');
  const menu = document.querySelector('.header_nav');
  const navContainer = document.querySelector('.nav_container');

  burger.addEventListener('click', () => {
    burger.classList.toggle('burger_active');
    menu.classList.toggle('menu_active');
    navContainer.classList.toggle('showContainer');
    document.body.classList.toggle('body_lock');
  });
}

if (window.innerWidth > 1023) {
  showCards();
}

function showCards() {
  const items = document.querySelectorAll('.news_content .news_card');
  const showMoreBtn = document.querySelector('.news_btn');
  const pagination = document.querySelector('.pagination');
  let itemsToShow = 3;

  // Функция для обновления видимых элементов
  const updateVisibleItems = () => {
    items.forEach((item, index) => {
      if (index < itemsToShow) {
        item.classList.add('visible');
      } else {
        item.classList.remove('visible');
      }
    });
  };

  // Обработчик клика по кнопке
  showMoreBtn.addEventListener('click', () => {
    itemsToShow = items.length;
    updateVisibleItems();
    showMoreBtn.style.display = 'none';
    pagination.style.display = 'block';
  });

  // Инициализация
  updateVisibleItems();
}
