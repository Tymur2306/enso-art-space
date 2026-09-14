document.addEventListener('DOMContentLoaded', () => {
  // 1. ПЕРЕКЛАДИ (Сайт + Калькулятор)
  const translations = {
    uk: {
      nav_works: "РОБОТИ",
      nav_about: "ПРО МЕНЕ",
      nav_works_title: "ПОРТФОЛІО",
      nav_price: "Ціни",
      nav_contacts: "КОНТАКТИ",
      hero_subtitle: "ХУДОЖНИЦЯ ОЛІЙНОГО ЖИВОПИСУ",
      about_title: "Про мене",
      about_text_1: "Мене звати Малютіна Олександра, я художниця та засновниця власного художнього проєкту. Професійно займаюся живописом уже 6 років.",
      about_text_2: "За цей час отримала значний досвід роботи у художній компанії, зокрема в міжнародному середовищі, та мала можливість працювати із замовниками з різних країн.",
      about_text_3: "Мої роботи вирізняються реалістичністю, увагою до деталей, анатомії, світла й тіні та ретельною передачею фактури. У своїй творчості я поєдную класичний та академічний підхід.",
      about_text_4: "Мої картини знаходять своїх власників у різних куточках світу, а географія продажів охоплює міжнародну аудиторію.",
      about_text_5: "Для мене це новий етап: від роботи всередині компанії — до створення власного простору, підходу та проєкту, який відображає моє бачення мистецтва.",
      works_title: "Портфоліо",
      contacts_title: "Контакти",
      contacts_text: "Email, соцмережі або форма для зв'язку.",
      medium_oil: "Олія на полотні",
      
      // Калькулятор
      calc_title: "ПІДРАХУНОК ЦІНИ",
      calc_size_label: "РОЗМІР",
      calc_select_default: "Оберіть розмір",
      calc_type_people: "Люди",
      calc_type_animals: "Тварини",
      calc_type_landscape: "Пейзаж",
      calc_figures_label: "КІЛЬКІСТЬ ФІГУР",
      calc_person_label: "персони",
      calc_custom_btn: "Ваш варіант",
      calc_custom_placeholder: "Введіть кількість (до 10)",
      calc_btn: "Розрахувати ціну",
      calc_detail_title: "ДЕТАЛІСТСТЬ ТА СКЛАДНІСТЬ",
      calc_note_1: "Ціна може змінюватися залежно від рівня деталізації та складності картини.",
      calc_turnaround_title: "ТЕРМІНИ ВИГОТОВЛЕННЯ",
      calc_note_2: "Орієнтовний час виконання становить 4–10 днів, залежно від розміру картини. Термінові замовлення обговорюються індивідуально.",
      calc_custom_size_title: "ІНДИВІДУАЛЬНИЙ РОЗМІР",
      calc_note_3: "Будь-який розмір можна замовити та обговорити індивідуально.",
      
      result_price_prefix: "Орієнтовна вартість: "
    },
    en: {
      nav_works: "WORKS",
      nav_about: "ABOUT",
      nav_works_title: "PORTFOLIO",
      nav_price: "PRICE",
      nav_contacts: "CONTACT",
      hero_subtitle: "OIL PAINTING ARTIST",
      about_title: "About Me",
      about_text_1: "My name is Alexandra Maliutina, I am an artist and the founder of my own art project. I have been professionally engaged in painting for 6 years.",
      about_text_2: "During this time, I gained significant experience working in an art company, particularly in an international environment, and had the opportunity to work with clients from various countries.",
      about_text_3: "My works are distinguished by realism, attention to detail, anatomy, light and shadow, and careful rendering of texture. In my art, I combine classical and academic approaches.",
      about_text_4: "My paintings find their owners in various corners of the world, and the geography of sales covers an international audience.",
      about_text_5: "For me, this is a new stage: moving from working inside a company to creating my own space, approach, and project that reflects my vision of art.",
      works_title: "Portfolio",
      contacts_title: "Contact",
      contacts_text: "Email, social media, or contact form.",
      medium_oil: "Oil on Linen",
      
      // Calculator
      calc_title: "PRICE CALCULATOR",
      calc_size_label: "SIZE",
      calc_select_default: "Select size",
      calc_type_people: "People",
      calc_type_animals: "Animals",
      calc_type_landscape: "Landscape",
      calc_figures_label: "FIGURES COUNT",
      calc_person_label: "persons",
      calc_custom_btn: "Your option",
      calc_custom_placeholder: "Enter number (up to 10)",
      calc_btn: "Calculate Price",
      calc_detail_title: "DETAIL & COMPLEXITY",
      calc_note_1: "The price may vary depending on the level of detail and complexity of the painting.",
      calc_turnaround_title: "TURNAROUND TIME",
      calc_note_2: "The estimated completion time is 4–10 days, depending on the size of the painting. For urgent orders, the additional fee is discussed individually.",
      calc_custom_size_title: "CUSTOM SIZE",
      calc_note_3: "Any size can be requested and discussed individually.",
      
      result_price_prefix: "Estimated Price: "
    }
  };

  let lastCalculatedPrice = null;

  function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key] !== undefined) {
        element.textContent = translations[lang][key];
      }
    });

    const customInput = document.getElementById('customPeopleInput');
    if (customInput && translations[lang]) {
      customInput.placeholder = translations[lang].calc_custom_placeholder;
    }

    const defaultOption = document.querySelector('#sizeNativeSelect option[value=""]');
    if (defaultOption && translations[lang]) {
      defaultOption.textContent = translations[lang].calc_select_default;
    }

    const resultDisplay = document.querySelector("#resultPrice");
    if (resultDisplay && lastCalculatedPrice !== null) {
      resultDisplay.innerHTML = `${translations[lang].result_price_prefix}<strong>${lastCalculatedPrice} UAH</strong>`;
    }

    const langUk = document.getElementById('lang-uk');
    const langEn = document.getElementById('lang-en');

    if (lang === 'en') {
      if (langEn) langEn.classList.add('active');
      if (langUk) langUk.classList.remove('active');
    } else {
      if (langUk) langUk.classList.add('active');
      if (langEn) langEn.classList.remove('active');
    }

    localStorage.setItem('selectedLang', lang);
  }

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.id === 'lang-uk' || target.closest('#lang-uk')) {
      e.preventDefault();
      setLanguage('uk');
    } else if (target.id === 'lang-en' || target.closest('#lang-en')) {
      e.preventDefault();
      setLanguage('en');
    }
  });

  const savedLang = localStorage.getItem('selectedLang') || 'uk';
  setLanguage(savedLang);

  // 2. HERO АНІМАЦІЯ ПОЯВИ
  const heroContent = document.querySelector('.hero__content');
  const heroSection = document.querySelector('#hero');
  if (heroSection && heroContent) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroContent.classList.add('active');
        }
      });
    }, { threshold: 0.5 });
    heroObserver.observe(heroSection);
  }

  // 3. ПЕРЕМИКАННЯ КОЛЬОРУ ШАПКИ
  const worksSection = document.getElementById('works');
  const header = document.querySelector('.header');

  if (worksSection && header) {
    window.addEventListener('scroll', () => {
      const rect = worksSection.getBoundingClientRect();
      const triggerOffset = 80;

      if (rect.top <= triggerOffset && rect.bottom >= triggerOffset) {
        header.classList.add('header-dark');
      } else {
        header.classList.remove('header-dark');
      }
    });
  }

  // 4. МОДАЛЬНЕ ВІКНО ПОРТФОЛІО
  const modal = document.getElementById('artworkModal');
  if (modal) {
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalYear = document.getElementById('modalYear');
    const modalMedium = document.getElementById('modalMedium');
    const modalSize = document.getElementById('modalSize');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.querySelector('.modal-close');
    const inquireBtn = document.querySelector('.modal-inquire-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();

        const img = item.querySelector('img:not([style*="display: none"])') || item.querySelector('img');
        const currentLang = localStorage.getItem('selectedLang') || 'uk';

        if (modalImg) {
          modalImg.src = img ? (img.currentSrc || img.src) : '';
        }

        if (modalTitle) modalTitle.textContent = item.dataset.title || '';
        if (modalYear) modalYear.textContent = item.dataset.year || '';
        
        let mediumText = item.dataset.medium || '';
        if (typeof translations !== 'undefined' && translations[currentLang]) {
          mediumText = translations[currentLang].medium_oil || mediumText;
        }
        if (modalMedium) modalMedium.textContent = mediumText;

        if (modalSize) modalSize.textContent = item.dataset.size || '';
        if (modalDescription) modalDescription.innerHTML = item.dataset.desc || '';

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    if (inquireBtn) {
      inquireBtn.addEventListener('click', () => {
        closeModal();
      });
    }
  } else {
    console.error("Елемент #artworkModal не знайдено в DOM!");
  }

  // 5. АНІМАЦІЯ КАРТОК ПОРТФОЛІО ПРИ СКРОЛІ
  const portfolioGridItems = document.querySelectorAll(".portfolio-item");
  if (portfolioGridItems.length > 0) {
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const observer = new IntersectionObserver((entries) => {
      let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      let isScrollingUp = currentScrollTop < lastScrollTop;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (isScrollingUp) {
            entry.target.classList.add("fade-in-place");
            entry.target.classList.remove("is-visible");
          } else {
            entry.target.classList.add("is-visible");
            entry.target.classList.remove("fade-in-place");
          }
        } else {
          entry.target.classList.remove("is-visible");
          entry.target.classList.remove("fade-in-place");
        }
      });

      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    }, { threshold: 0.15 });

    portfolioGridItems.forEach(item => observer.observe(item));
  }

  // 6. АНІМАЦІЯ СЕКЦІЇ "ПРО МЕНЕ"
  const aboutContainer = document.querySelector(".about-container");
  if (aboutContainer) {
    const aboutObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    aboutObserver.observe(aboutContainer);
  }

  // 7. ЛОГІКА КАЛЬКУЛЯТОРА ЦІН
  const priceTable = {
    people: {
      "30x40": { 1: 6400, 2: 9600, 3: 12800, 4: 12800, 5: 12800, 6: 12800, 7: 12800, 8: 12800, 9: 12800, 10: 12800},
      "40x50": { 1: 8400, 2: 11600, 3: 14800, 4: 18000, 5: 18000, 6: 18000, 7: 18000, 8: 18000, 9: 18000, 10: 18000},
      "50x70": { 1: 10400, 2: 13600, 3: 16800, 4: 20000, 5: 23200, 6: 26400, 7: 26400, 8: 26400, 9: 26400, 10: 26400},
      "60x80": { 1: 12000, 2: 15200, 3: 18400, 4: 21600, 5: 24800, 6: 28000, 7: 31200, 8: 34400, 9: 34400, 10: 34400},
      "70x100": { 1: 16800, 2: 20000, 3: 23200, 4: 26400, 5: 29600, 6: 32800, 7: 36000, 8: 39200, 9: 42400, 10: 45600}
    },
    animals: {
      "30x40": { 1: 4800, 2: 7200, 3: 9600, 4: 9600, 5: 9600, 6: 9600, 7: 9600, 8: 9600, 9: 9600, 10: 9600},
      "40x50": { 1: 6300, 2: 8700, 3: 11100, 4: 13500, 5: 13500, 6: 13500, 7: 13500, 8: 13500, 9: 13500, 10: 13500},
      "50x70": { 1: 7800, 2: 10200, 3: 12600, 4: 15000, 5: 17400, 6: 19800, 7: 19800, 8: 19800, 9: 19800, 10: 19800},
      "60x80": { 1: 9000, 2: 11400, 3: 13800, 4: 16200, 5: 18600, 6: 21000, 7: 23400, 8: 25800, 9: 25800, 10: 25800},
      "70x100": { 1: 12600, 2: 15000, 3: 17400, 4: 19800, 5: 22200, 6: 24600, 7: 27000, 8: 29400, 9: 31800, 10: 34200}
    },
    landscape: {
      "30x40": 6400,
      "40x50": 8400,
      "50x70": 10400,
      "60x80": 12000,
      "70x100": 16800
    }
  };

  let selectedType = "people";
  let selectedSize = null;
  let selectedPeopleMode = "1";

  const typeBtns = document.querySelectorAll(".type-btn");
  const sizeSelect = document.getElementById("sizeNativeSelect");
  const peopleBtns = document.querySelectorAll(".people-btn");
  const inlineInput = document.getElementById("peopleInlineInput");
  const calculateBtn = document.querySelector(".calculate-btn");
  const resultDisplay = document.querySelector("#resultPrice");

  typeBtns.forEach(btn => {
    btn.onclick = () => {
      typeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedType = btn.getAttribute("data-type");

      const peopleOptionsContainer = document.querySelector(".people-options");

      if (peopleOptionsContainer) {
        if (selectedType === "landscape") {
          peopleOptionsContainer.classList.add("is-hidden");
        } else {
          peopleOptionsContainer.classList.remove("is-hidden");
        }
      }
    };
  });

  peopleBtns.forEach(btn => {
    btn.onclick = (e) => {
      if (e.target === inlineInput) return;

      peopleBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedPeopleMode = btn.getAttribute("data-people");
    };
  });

  if (inlineInput) {
    inlineInput.onfocus = () => {
      peopleBtns.forEach(b => b.classList.remove("active"));
      const parentBtn = inlineInput.closest('.people-btn');
      if (parentBtn) parentBtn.classList.add("active");
      selectedPeopleMode = "custom";
    };

    inlineInput.oninput = () => {
      let val = parseInt(inlineInput.value, 10);
      if (val > 10) inlineInput.value = 10;
      selectedPeopleMode = "custom";
    };

    inlineInput.onblur = () => {
      let val = parseInt(inlineInput.value, 10);
      if (isNaN(val) || val < 1) inlineInput.value = "";
    };
  }

  if (calculateBtn) {
    calculateBtn.onclick = () => {
      selectedSize = sizeSelect ? sizeSelect.value : "";
      const currentLang = localStorage.getItem('selectedLang') || 'uk';
      const t = translations[currentLang];

      if (!selectedSize) {
        return;
      }

      if (selectedType === "landscape") {
        const price = priceTable.landscape[selectedSize];
        if (price !== undefined && resultDisplay) {
          lastCalculatedPrice = price;
          resultDisplay.style.display = "block";
          resultDisplay.innerHTML = `${t.result_price_prefix}<strong>${price} UAH</strong>`;
        }
        return;
      }

      let figuresCount = 1;
      if (selectedPeopleMode === "custom") {
        figuresCount = parseInt(inlineInput.value, 10) || 4;
        if (figuresCount > 10) figuresCount = 10;
        if (figuresCount < 1) figuresCount = 1;
      } else {
        figuresCount = parseInt(selectedPeopleMode, 10) || 1;
      }

      if (priceTable[selectedType] && priceTable[selectedType][selectedSize] && priceTable[selectedType][selectedSize][figuresCount] !== undefined) {
        const price = priceTable[selectedType][selectedSize][figuresCount];
        if (resultDisplay) {
          lastCalculatedPrice = price;
          resultDisplay.style.display = "block";
          resultDisplay.innerHTML = `${t.result_price_prefix}<strong>${price} UAH</strong>`;
        }
      }
    };
  }
});