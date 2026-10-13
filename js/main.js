(function () {
  'use strict';

  var CONFIG = window.CONFIG || {};

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function el(tag, className) {
    var node = document.createElement(tag);

    if (className) {
      node.className = className;
    }

    return node;
  }

  function filled(value) {
    return typeof value === 'string' && value.trim() !== '';
  }

  function setText(selector, value) {
    if (!filled(value)) return;

    document.querySelectorAll(selector).forEach(function (node) {
      node.textContent = value;
    });
  }

  /* Основная информация */

  function applyBase() {
    setText('[data-cfg="name"]', CONFIG.name);
    setText('[data-cfg="brand"]', CONFIG.brand);
    setText('[data-cfg="role"]', CONFIG.role);
    setText('[data-cfg="eyebrow"]', CONFIG.eyebrow);
    setText('[data-cfg="intro"]', CONFIG.intro);

    if (filled(CONFIG.name)) {
      document.title = CONFIG.name +
        (filled(CONFIG.role) ? ' — ' + CONFIG.role : '');
    }

    var status = $('#hero-status');

    if (status && filled(CONFIG.status)) {
      status.textContent = CONFIG.status;
      status.hidden = false;
    }
  }

  /* Ссылка на GitHub */

  function applyGithub() {
    var contacts = CONFIG.contacts || [];
    var github = contacts.find(function (contact) {
      return contact.type === 'github' && filled(contact.url);
    });

    if (!github) return;

    ['nav-github', 'hero-github'].forEach(function (id) {
      var node = document.getElementById(id);

      if (node) {
        node.href = github.url;
        node.hidden = false;
      }
    });
  }

  /* Раздел «Обо мне» */

  function renderAbout() {
    var facts = $('#about-facts');
    var text = $('#about-text');

    if (facts && Array.isArray(CONFIG.aboutFacts)) {
      CONFIG.aboutFacts.forEach(function (fact) {
        if (!fact || !filled(fact.label) || !filled(fact.value)) {
          return;
        }

        var row = el('div', 'about__fact');
        var dt = el('dt');
        var dd = el('dd');

        dt.textContent = fact.label;
        dd.textContent = fact.value;

        row.appendChild(dt);
        row.appendChild(dd);
        facts.appendChild(row);
      });

      if (!facts.children.length) facts.hidden = true;
    }

    if (text && Array.isArray(CONFIG.aboutText)) {
      CONFIG.aboutText.forEach(function (paragraph) {
        if (!filled(paragraph)) return;

        var p = el('p');
        p.textContent = paragraph;
        text.appendChild(p);
      });

      if (!text.children.length) text.hidden = true;
    }
  }

  /* Проекты: только название, описание, стек и ссылки */

  function projectLinks(project) {
    var hasDemo = filled(project.demo);
    var hasCode = filled(project.code);

    if (!hasDemo && !hasCode) return null;

    var links = el('div', 'project__links');

    if (hasDemo) {
      var demo = el('a', 'project__link');

      demo.href = project.demo;
      demo.target = '_blank';
      demo.rel = 'noopener noreferrer';
      demo.textContent = 'Открыть проект ↗';

      links.appendChild(demo);
    }

    if (hasCode) {
      var code = el('a', 'project__link');

      code.href = project.code;
      code.target = '_blank';
      code.rel = 'noopener noreferrer';
      code.textContent = 'Исходный код ↗';

      links.appendChild(code);
    }

    return links;
  }

  function projectCard(project) {
    var projectElement = el('article', 'project reveal');
    var body = el('div', 'project__body');

    if (filled(project.title)) {
      var title = el('h3', 'project__title');
      title.textContent = project.title;
      body.appendChild(title);
    }

    if (filled(project.description)) {
      var description = el('p', 'project__desc');
      description.textContent = project.description;
      body.appendChild(description);
    }

    if (Array.isArray(project.stack) && project.stack.length) {
      var stack = el('ul', 'project__stack');

      project.stack.forEach(function (technology) {
        if (!filled(technology)) return;

        var item = el('li');
        item.textContent = technology;
        stack.appendChild(item);
      });

      if (stack.children.length) {
        body.appendChild(stack);
      }
    }

    var links = projectLinks(project);

    if (links) {
      body.appendChild(links);
    }

    projectElement.appendChild(body);

    return projectElement;
  }

  function emptyProjects() {
    var empty = el('div', 'projects__empty');

    var title = el('p', 'projects__empty-title');
    title.textContent = 'Проекты скоро появятся';

    var description = el('p', 'projects__empty-text');
    description.textContent =
      'Я работаю над собственными проектами и скоро добавлю их сюда.';

    empty.appendChild(title);
    empty.appendChild(description);

    return empty;
  }

  function renderProjects() {
    var grid = $('#projects');

    if (!grid) return;

    grid.replaceChildren();

    var projects = Array.isArray(CONFIG.projects)
      ? CONFIG.projects.filter(Boolean)
      : [];

    if (!projects.length) {
      grid.appendChild(emptyProjects());
      return;
    }

    projects.forEach(function (project) {
      grid.appendChild(projectCard(project));
    });
  }

  /* Навыки */

  function renderSkills() {
    var grid = $('#skills');

    if (!grid || !CONFIG.skills) return;

    Object.keys(CONFIG.skills).forEach(function (group) {
      var items = CONFIG.skills[group];

      if (!Array.isArray(items) || !items.length) return;

      var card = el('div', 'skill reveal');
      var head = el('div', 'skill__head');
      var title = el('h3', 'skill__title');
      var count = el('span', 'skill__count');
      var list = el('ul', 'skill__list');

      title.textContent = group;
      count.textContent = String(items.length).padStart(2, '0');

      head.appendChild(title);
      head.appendChild(count);

      items.forEach(function (item) {
        if (!filled(item)) return;

        var li = el('li');
        li.textContent = item;
        list.appendChild(li);
      });

      card.appendChild(head);
      card.appendChild(list);
      grid.appendChild(card);
    });
  }

  /* Этапы работы */

  function renderProcess() {
    var list = $('#process-list');

    if (!list || !Array.isArray(CONFIG.process)) return;

    CONFIG.process.forEach(function (step, index) {
      if (!step) return;

      var item = el('li', 'process__item reveal');
      var number = el('span', 'process__num');
      var body = el('div', 'process__body');

      number.textContent = String(index + 1).padStart(2, '0');
      number.setAttribute('aria-hidden', 'true');

      if (filled(step.title)) {
        var title = el('h3', 'process__title');
        title.textContent = step.title;
        body.appendChild(title);
      }

      if (filled(step.text)) {
        var description = el('p', 'process__text');
        description.textContent = step.text;
        body.appendChild(description);
      }

      item.appendChild(number);
      item.appendChild(body);
      list.appendChild(item);
    });
  }

  /* Контакты */

  function contactUrl(contact) {
    if (filled(contact.url)) return contact.url;

    if (contact.type === 'email' && filled(contact.value)) {
      return 'mailto:' + contact.value;
    }

    return '';
  }

  function renderContacts() {
    var container = $('#contacts');

    if (!container) return;

    var contacts = Array.isArray(CONFIG.contacts)
      ? CONFIG.contacts
      : [];

    var list = el('div', 'contacts');
    var count = 0;

    contacts.forEach(function (contact) {
      if (!contact) return;

      var url = contactUrl(contact);

      if (!url) return;

      var link = el('a', 'contact');
      var type = el('span', 'contact__type');
      var value = el('span', 'contact__value');
      var arrow = el('span', 'contact__arrow');

      link.href = url;

      if (contact.type !== 'email') {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }

      type.textContent = contact.label || contact.type || 'Контакт';
      value.textContent = contact.value || url;
      arrow.textContent = '↗';
      arrow.setAttribute('aria-hidden', 'true');

      link.appendChild(type);
      link.appendChild(value);
      link.appendChild(arrow);

      list.appendChild(link);
      count++;
    });

    if (count) {
      container.appendChild(list);
    } else {
      var empty = el('p', 'contacts__empty');
      empty.textContent = 'Контакты появятся позже.';
      container.appendChild(empty);
    }
  }

  /* Шапка */

  function initHeader() {
    var header = $('#header');

    if (!header) return;

    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }

    update();

    window.addEventListener('scroll', update, {
      passive: true
    });
  }

  /* Мобильное меню */

  function initNav() {
    var burger = $('.burger');
    var nav = $('#primary-nav');

    if (!burger || !nav) return;

    function close() {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
      document.body.classList.remove('nav-open');
    }

    function open() {
      nav.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Закрыть меню');
      document.body.classList.add('nav-open');
    }

    burger.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) {
        close();
      } else {
        open();
      }
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a[href^="#"]')) {
        close();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' &&
          nav.classList.contains('is-open')) {
        close();
        burger.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) close();
    });
  }

  /* Подсветка активного раздела */

  function initActiveSection() {
    var links = document.querySelectorAll('.nav__list a[href^="#"]');

    if (!links.length || !('IntersectionObserver' in window)) {
      return;
    }

    var pairs = [];

    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);

      if (section) {
        pairs.push({
          link: link,
          section: section
        });
      }
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        pairs.forEach(function (pair) {
          pair.link.classList.toggle(
            'is-active',
            pair.section === entry.target
          );
        });
      });
    }, {
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0
    });

    pairs.forEach(function (pair) {
      observer.observe(pair.section);
    });
  }

  /* Анимации появления */

  function initReveal() {
    var nodes = document.querySelectorAll('.reveal');

    if (!nodes.length) return;

    var reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach(function (node) {
        node.classList.add('is-visible');
      });

      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, {
      rootMargin: '0px 0px 80px 0px',
      threshold: 0
    });

    nodes.forEach(function (node) {
      observer.observe(node);
    });

    window.setTimeout(function () {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(
        function (node) {
          node.classList.add('is-visible');
        }
      );
    }, 2500);
  }

  /* Анимация SVG */

  function initBlueprint() {
    var blueprint = $('.blueprint');

    if (!blueprint) return;

    if (window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches) {
      return;
    }

    requestAnimationFrame(function () {
      blueprint.classList.add('is-drawing');
    });
  }

  /* Год в подвале */

  function initYear() {
    var year = $('#year');

    if (year) {
      year.textContent = String(new Date().getFullYear());
    }
  }

  /* Запуск */

  function init() {
    try {
      applyBase();
      applyGithub();
      renderAbout();
      renderProjects();
      renderSkills();
      renderProcess();
      renderContacts();

      initHeader();
      initNav();
      initActiveSection();
      initReveal();
      initBlueprint();
      initYear();
    } catch (error) {
      document.querySelectorAll('.reveal').forEach(function (node) {
        node.classList.add('is-visible');
      });

      console.error(error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();