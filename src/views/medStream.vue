<template>
  <!-- Кнопка переключения темы -->
  <div class="theme-toggle" id="theme-toggle">
    <i class="fas fa-moon"></i>
  </div>

  <!-- Боковое меню -->
  <div class="sidebar">
    <img src="@/assets/img/logo.png" alt="Логотип" class="sidebar-logo" />
    <router-link to="/patients" class="sidebar-item" active-class="active">
      <i class="fas fa-procedures"></i><span>Пациенты</span>
    </router-link>
    <router-link to="/service" class="sidebar-item">
      <i class="fas fa-concierge-bell"></i><span>Сервис</span>
    </router-link>
    <router-link to="/documents" class="sidebar-item">
      <i class="fas fa-file-contract"></i><span>Документооборот</span>
    </router-link>
    <router-link to="/dicom" class="sidebar-item">
      <i class="fas fa-x-ray"></i><span>Снимки</span>
    </router-link>
    <router-link to="/stream" class="sidebar-item">
      <i class="fas fa-video"></i><span>Трансляции</span>
    </router-link>
  </div>

  <!-- Основное содержимое -->
  <div class="main-content">
    <!-- Шапка -->
    <div class="header">
      <h1 class="hospital-title">
        <img src="@/assets/img/logo.png" alt="Логотип" class="logo">
        Медиацентр
      </h1>
      <div class="user-profile">
        <div class="user-icon">
          <i class="fas fa-user-md"></i>
        </div>
      </div>
    </div>

    <!-- Статистика -->
    <div class="stats-container">
      <div class="stat-card">
        <div class="stat-value">5</div>
        <div class="stat-label">Активные трансляции</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">48</div>
        <div class="stat-label">Записей в архиве</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">256</div>
        <div class="stat-label">Зрителей онлайн</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">8</div>
        <div class="stat-label">Запланировано</div>
      </div>
    </div>

    <!-- Просмотрщик трансляций -->
    <div class="patients-container">
      <div class="section-title-container">
        <h2 class="section-title">
          <i class="fas fa-video"></i>
          Трансляции операций и УЗИ
        </h2>
        <button class="add-patient-btn" id="schedule-stream-btn">
          <i class="fas fa-plus"></i>
          Запланировать трансляцию
        </button>
      </div>

      <!-- Фильтры -->
      <div class="filters-container">
        <div class="filter-group">
          <label class="filter-label">Тип</label>
          <select class="filter-select" id="type-filter">
            <option value="all">Все</option>
            <option value="surgery">Операции</option>
            <option value="ultrasound">УЗИ</option>
            <option value="conference">Конференции</option>
            <option value="training">Обучение</option>
            <option value="consultation">Консультации</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Статус</label>
          <select class="filter-select" id="status-filter">
            <option value="all">Все</option>
            <option value="live">Прямой эфир</option>
            <option value="recorded">Записи</option>
            <option value="scheduled">Запланировано</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Сортировка</label>
          <select class="filter-select" id="sort-filter">
            <option value="date-desc">По дате (новые)</option>
            <option value="date-asc">По дате (старые)</option>
            <option value="name-asc">По названию (А-Я)</option>
            <option value="name-desc">По названию (Я-А)</option>
            <option value="popular">По популярности</option>
          </select>
        </div>
      </div>

      <div class="stream-container">
        <div class="stream-toolbar">
          <div class="toolbar-left">
            <button class="toolbar-btn" title="Предыдущая трансляция">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button class="toolbar-btn" title="Следующая трансляция">
              <i class="fas fa-chevron-right"></i>
            </button>
            <span class="toolbar-title">Лапароскопическая холецистэктомия</span>
          </div>
          <div class="toolbar-right">
            <button class="toolbar-btn" title="Полный экран">
              <i class="fas fa-expand"></i>
            </button>
            <button class="toolbar-btn" title="Настройки">
              <i class="fas fa-cog"></i>
            </button>
            <button class="toolbar-btn" title="Добавить в избранное">
              <i class="fas fa-star"></i>
            </button>
          </div>
        </div>
        <div class="stream-content">
          <div class="stream-list" id="stream-list">
            <!-- Трансляции будут добавлены через JavaScript -->
          </div>
          <div class="video-container">
            <div class="video-placeholder">
              <div class="video-icon">
                <i class="fas fa-video"></i>
              </div>
              <div class="video-text">Трансляция операции</div>
              <div class="video-hint">Идет прямая трансляция из операционной №3</div>
            </div>
            <div class="video-controls">
              <button class="control-btn" title="Пауза">
                <i class="fas fa-pause"></i>
              </button>
              <button class="control-btn" title="Громкость">
                <i class="fas fa-volume-up"></i>
              </button>
              <button class="control-btn" title="Качество">
                <i class="fas fa-tachometer-alt"></i>
              </button>
              <button class="control-btn" title="Субтитры">
                <i class="fas fa-closed-captioning"></i>
              </button>
            </div>
          </div>
          <div class="chat-container">
            <div class="chat-header">
              Чат трансляции
            </div>
            <div class="chat-messages" id="chat-messages">
              <div class="message">
                <div class="message-user">д-р Смирнова А.В.</div>
                <div class="message-text">Интересная техника наложения швов</div>
                <div class="message-time">14:32</div>
              </div>
              <div class="message">
                <div class="message-user">д-р Иванов С.П.</div>
                <div class="message-text">Обратите внимание на расположение троакаров</div>
                <div class="message-time">14:35</div>
              </div>
              <div class="message">
                <div class="message-user">д-р Петрова М.К.</div>
                <div class="message-text">Какие инструменты используются для диссекции?</div>
                <div class="message-time">14:37</div>
              </div>
              <div class="message">
                <div class="message-user">д-р Кузнецов В.А.</div>
                <div class="message-text">Используем гармонический скальпель и биполяр</div>
                <div class="message-time">14:38</div>
              </div>
            </div>
            <div class="chat-input">
              <form class="chat-form" id="chat-form">
                <input type="text" class="chat-field" placeholder="Введите сообщение..." required>
                <button type="submit" class="chat-send">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Расписание трансляций -->
    <div class="schedule-container">
      <h3 class="schedule-title">
        <i class="fas fa-calendar-alt"></i>
        Ближайшие трансляции
      </h3>
      <div class="schedule-list" id="schedule-list">
        <!-- Расписание будет добавлено через JavaScript -->
      </div>
    </div>

    <!-- Популярные трансляции -->
    <div class="patients-container">
      <div class="section-title-container">
        <h2 class="section-title">
          <i class="fas fa-fire"></i>
          Популярные трансляции
        </h2>
      </div>
      <div class="stream-list" id="popular-streams">
        <!-- Популярные трансляции будут добавлены через JavaScript -->
      </div>
    </div>
  </div>

  <!-- Медиаархив -->
  <div class="map-container">
    <div class="map-header">
      <span>Медиаархив</span>
      <i class="fas fa-times"></i>
    </div>
    <div class="map-content">
      <i class="fas fa-video" style="font-size: 2rem;"></i>
      <div style="margin-top: 10px;">Трансляции 2024</div>
      <div class="stats-container" style="margin-top: 20px; grid-template-columns: 1fr;">
        <div class="stat-card">
          <div class="stat-value">1.2 TB</div>
          <div class="stat-label">Объем архива</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import {onMounted} from "vue";

export default {
  name: "Dicom",
  setup() {
    onMounted(() => {
      // Переключение темы
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');

        function toggleTheme() {
          document.body.classList.toggle('dark-theme');

          if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
          } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
          }

          // Показываем уведомление при смене темы
          showNotification(
              'Тема изменена',
              document.body.classList.contains('dark-theme') ? 'Темная тема активирована' : 'Светлая тема активирована',
              'success'
          );
        }

        themeToggle.addEventListener('click', toggleTheme);

        // Проверка сохраненной темы
        if (localStorage.getItem('theme') === 'dark') {
          document.body.classList.add('dark-theme');
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
        }
      }

// Функция для показа уведомлений
      function showNotification(title, text, icon = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${icon} show`;
        notification.innerHTML = `
    <div class="notification-icon">
      <i class="fas fa-${icon === 'success' ? 'check-circle' :
            icon === 'error' ? 'times-circle' :
                icon === 'warning' ? 'exclamation-circle' : 'info-circle'}"></i>
    </div>
    <div class="notification-content">
      <div class="notification-title">${title}</div>
      <div class="notification-text">${text}</div>
    </div>
    <div class="notification-close">
      <i class="fas fa-times"></i>
    </div>
  `;

        document.body.appendChild(notification);

        // Автоматическое закрытие через 5 секунд
        setTimeout(() => {
          notification.classList.add('hide');
          setTimeout(() => notification.remove(), 300);
        }, 5000);

        // Закрытие по клику
        notification.querySelector('.notification-close').addEventListener('click', () => {
          notification.classList.add('hide');
          setTimeout(() => notification.remove(), 300);
        });
      }

        // Получаем текущую страницу
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        // Находим соответствующий пункт меню
        const menuItems = document.querySelectorAll('.sidebar-item');
        menuItems.forEach(item => {
          const link = item.getAttribute('href');
          if (link && link === currentPage) {
            item.classList.add('active');
          }
        });

        // Инициализация карты
        const mapToggle = document.querySelector('.map-toggle');
        const mapContainer = document.querySelector('.map-container');

        if (mapToggle && mapContainer) {
          mapToggle.addEventListener('click', function() {
            mapContainer.classList.toggle('active');
          });
        }

        // Закрытие карты
        const mapClose = document.querySelector('.map-header i');
        if (mapClose) {
          mapClose.addEventListener('click', function() {
            mapContainer.classList.remove('active');
          });
        }

        // Активация элементов списка (для DICOM и трансляций)
        const listItems = document.querySelectorAll('.study-item, .stream-item, .series-item');
        listItems.forEach(item => {
          item.addEventListener('click', function() {
            const parent = this.closest('.study-list, .stream-list, .series-list');
            if (parent) {
              parent.querySelectorAll('.study-item, .stream-item, .series-item').forEach(i => {
                i.classList.remove('active');
              });
            }
            this.classList.add('active');
          });
        });

        // Обработка форм
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
          form.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Успех', 'Форма успешно отправлена!', 'success');
            this.reset();
          });
        });

        // Обработка кнопок добавления
        const addButtons = document.querySelectorAll('.add-patient-btn, .add-equipment-btn, #schedule-stream-btn, #upload-dicom-btn');
        addButtons.forEach(btn => {
          btn.addEventListener('click', function() {
            showNotification('Информация', 'Эта функция будет доступна в полной версии системы', 'info');
          });
        });



        setTimeout(() => {
          showNotification('Добро пожаловать', 'Вы вошли в систему больницы Святого Берендея', 'success');
        }, 1000);

      function generateRandomStream() {
        const procedures = [
          "Лапароскопическая холецистэктомия",
          "Эндопротезирование тазобедренного сустава",
          "Аортокоронарное шунтирование",
          "Гастрэктомия",
          "Резекция печени",
          "Тиреоидэктомия",
          "Кесарево сечение",
          "Грыжесечение",
          "Колонэктомия",
          "Нейрохирургическая операция",
          "Трансплантация почки",
          "Коронарная ангиопластика",
          "Лапароскопическая аппендэктомия",
          "Пластика передней крестообразной связки",
          "Кардиоверсия",
          "Удаление опухоли головного мозга",
          "Реконструкция молочной железы",
          "Артроскопия коленного сустава",
          "Флебэктомия",
          "Лазерная коагуляция сетчатки"
        ];

        const doctors = [
          "д-р Петров И.С.",
          "д-р Смирнова А.В.",
          "д-р Иванов С.П.",
          "д-р Кузнецова Е.П.",
          "д-р Васильев М.К.",
          "д-р Николаева О.В.",
          "д-р Федоров Д.С.",
          "д-р Павлова Л.М.",
          "д-р Громов А.Н.",
          "д-р Белова Т.И."
        ];

        const patients = [
          "Иванов П.С. (45 лет)",
          "Сидорова М.К. (32 года)",
          "Кузнецов Е.П. (58 лет)",
          "Петрова А.В. (29 лет)",
          "Смирнов Д.С. (63 года)",
          "Николаев О.В. (41 год)",
          "Федорова Л.М. (37 лет)",
          "Павлов Г.Н. (52 года)"
        ];

        const types = ["surgery", "ultrasound", "conference", "training", "consultation"];
        const statuses = ["live", "recorded", "scheduled"];
        const statusLabels = {
          live: "Прямой эфир",
          recorded: "Запись",
          scheduled: "Запланировано"
        };

        const typeLabels = {
          surgery: "Операция",
          ultrasound: "УЗИ",
          conference: "Конференция",
          training: "Обучение",
          consultation: "Консультация"
        };

        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));

        const type = types[Math.floor(Math.random() * types.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const doctor = doctors[Math.floor(Math.random() * doctors.length)];
        const patient = type === "surgery" || type === "ultrasound" ?
            patients[Math.floor(Math.random() * patients.length)] : "";

        return {
          id: Math.floor(1000 + Math.random() * 9000),
          title: procedures[Math.floor(Math.random() * procedures.length)],
          type: type,
          status: status,
          date: date.toISOString().split('T')[0],
          doctor: doctor,
          patient: patient,
          views: Math.floor(Math.random() * 1000),
          duration: `${Math.floor(1 + Math.random() * 3)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
          description: `${typeLabels[type]} ${patient ? `пациента ${patient}` : ''} проведенная ${doctor}`
        };
      }

      // Генерация 50 трансляций
      const streams = Array.from({ length: 50 }, generateRandomStream);

      // Генерация расписания
      function generateSchedule() {
        const schedule = [];
        const today = new Date();

        for (let i = 0; i < 14; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() + i);

          const count = Math.floor(1 + Math.random() * 4);
          for (let j = 0; j < count; j++) {
            const hour = Math.floor(8 + Math.random() * 8);
            const minute = Math.floor(Math.random() * 2) * 30;

            const stream = streams[Math.floor(Math.random() * streams.length)];

            schedule.push({
              time: `${date.getDate()}.${date.getMonth()+1} ${hour}:${minute.toString().padStart(2, '0')}`,
              name: stream.title,
              type: stream.type,
              doctor: stream.doctor,
              room: `Операционная ${Math.floor(1 + Math.random() * 5)}`
            });
          }
        }

        return schedule;
      }

      const schedule = generateSchedule();

      // Генерация HTML для трансляции
      function generateStreamHTML(stream) {
        const displayDate = new Date(stream.date).toLocaleDateString('ru-RU');
        const statusClass = `status-${stream.status}`;
        const statusText = stream.status === 'live' ? 'Прямой эфир' :
            stream.status === 'recorded' ? 'Запись' : 'Запланировано';

        return `
        <div class="stream-item"
             data-id="${stream.id}"
             data-type="${stream.type}"
             data-status="${stream.status}"
             data-date="${stream.date}"
             data-title="${stream.title}"
             data-views="${stream.views}">
          <div class="stream-title">${stream.title}</div>
          <div class="stream-info">
            <span>${stream.doctor}</span>
            <span>${displayDate}</span>
          </div>
          <div class="stream-details">
            ${stream.patient ? `<span class="stream-patient"><i class="fas fa-user-injured"></i> ${stream.patient}</span>` : ''}
            <span class="stream-duration"><i class="fas fa-clock"></i> ${stream.duration}</span>
            <span class="stream-views"><i class="fas fa-eye"></i> ${stream.views}</span>
          </div>
          <div class="stream-status ${statusClass}">${statusText}</div>
        </div>
      `;
      }

      // Генерация HTML для расписания
      function generateScheduleHTML(item) {
        return `
        <div class="schedule-item">
          <div class="schedule-time">${item.time}</div>
          <div class="schedule-name">${item.name}</div>
          <div class="schedule-details">
            <span>${item.doctor}</span>
            <span>${item.room}</span>
          </div>
          <div class="schedule-type">${item.type === 'conference' ? 'Конференция' :
            item.type === 'surgery' ? 'Операция' :
                item.type === 'ultrasound' ? 'УЗИ' :
                    item.type === 'training' ? 'Обучение' : 'Консультация'}</div>
        </div>
      `;
      }

      // Генерация HTML для популярных трансляций
      function generatePopularStreamHTML(stream) {
        return `
        <div class="stream-item popular"
             data-id="${stream.id}"
             data-type="${stream.type}"
             data-status="${stream.status}"
             data-date="${stream.date}"
             data-title="${stream.title}">
          <div class="stream-title">${stream.title}</div>
          <div class="stream-info">
            <span>${stream.doctor}</span>
            <span>${new Date(stream.date).toLocaleDateString('ru-RU')}</span>
          </div>
          <div class="stream-details">
            <span class="stream-views"><i class="fas fa-eye"></i> ${stream.views}</span>
            <span class="stream-duration"><i class="fas fa-clock"></i> ${stream.duration}</span>
          </div>
          <div class="stream-status status-popular">
            <i class="fas fa-fire"></i> Популярная
          </div>
        </div>
      `;
      }

      // Функция фильтрации трансляций
      function filterStreams() {
        const typeFilter = document.getElementById('type-filter').value;
        const statusFilter = document.getElementById('status-filter').value;
        const sortFilter = document.getElementById('sort-filter').value;

        // Фильтрация
        let filtered = streams.filter(stream => {
          const matchesType = typeFilter === 'all' || stream.type === typeFilter;
          const matchesStatus = statusFilter === 'all' || stream.status === statusFilter;
          return matchesType && matchesStatus;
        });

        // Сортировка
        filtered.sort((a, b) => {
          switch(sortFilter) {
            case 'date-desc':
              return new Date(b.date) - new Date(a.date);
            case 'date-asc':
              return new Date(a.date) - new Date(b.date);
            case 'name-asc':
              return a.title.localeCompare(b.title);
            case 'name-desc':
              return b.title.localeCompare(a.title);
            case 'popular':
              return b.views - a.views;
            default:
              return 0;
          }
        });

        // Перерисовка
        const container = document.getElementById('stream-list');
        container.innerHTML = '';
        filtered.forEach(stream => {
          container.innerHTML += generateStreamHTML(stream);
        });

        // Добавляем обработчики событий
        document.querySelectorAll('.stream-item').forEach(item => {
          item.addEventListener('click', function() {
            const streamId = parseInt(this.dataset.id);
            const stream = streams.find(s => s.id === streamId);

            // Обновляем заголовок
            document.querySelector('.toolbar-title').textContent = stream.title;

            // Обновляем видео-плейсхолдер
            const placeholder = document.querySelector('.video-placeholder');
            placeholder.querySelector('.video-text').textContent = stream.title;
            placeholder.querySelector('.video-hint').textContent = stream.description;

            // Обновляем активный элемент
            document.querySelectorAll('.stream-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
          });
        });

        // Активируем первую трансляцию
        if (filtered.length > 0) {
          document.querySelector('.stream-item').click();
        }
      }

      // Инициализация расписания
      function initSchedule() {
        const container = document.getElementById('schedule-list');
        container.innerHTML = '';
        schedule.forEach(item => {
          container.innerHTML += generateScheduleHTML(item);
        });
      }

      // Инициализация популярных трансляций
      function initPopularStreams() {
        const popular = [...streams]
            .filter(s => s.status === 'recorded')
            .sort((a, b) => b.views - a.views)
            .slice(0, 5);

        const container = document.getElementById('popular-streams');
        container.innerHTML = '';
        popular.forEach(stream => {
          container.innerHTML += generatePopularStreamHTML(stream);
        });
      }

      // Инициализация чата
      function initChat() {
        document.getElementById('chat-form').addEventListener('submit', function(e) {
          e.preventDefault();
          const input = this.querySelector('.chat-field');
          const message = input.value.trim();

          if (message) {
            const now = new Date();
            const time = now.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});

            const messageHTML = `
            <div class="message">
              <div class="message-user">Вы</div>
              <div class="message-text">${message}</div>
              <div class="message-time">${time}</div>
            </div>
          `;

            document.getElementById('chat-messages').innerHTML += messageHTML;
            input.value = '';

            // Прокрутка вниз
            const chat = document.getElementById('chat-messages');
            chat.scrollTop = chat.scrollHeight;
          }
        });
      }

      // Инициализация фильтров
      function initFilters() {
        document.getElementById('type-filter').addEventListener('change', filterStreams);
        document.getElementById('status-filter').addEventListener('change', filterStreams);
        document.getElementById('sort-filter').addEventListener('change', filterStreams);
      }


        initFilters();
        initSchedule();
        initPopularStreams();
        initChat();
        filterStreams(); // Первоначальная загрузка

    })
  }
}
</script>
<style >

</style>