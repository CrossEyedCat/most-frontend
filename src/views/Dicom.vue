<template>

  <!-- Кнопка переключения темы -->
  <div class="theme-toggle" id="theme-toggle">
    <i class="fas fa-moon"></i>
  </div>

  <!-- Боковое меню -->
  <div class="sidebar">
    <img src="@/assets/img/logo.png" alt="Логотип" class="sidebar-logo">
    <a href="patients.html" class="sidebar-item">
      <i class="fas fa-procedures"></i>
      <span>Пациенты</span>
    </a>
    <a href="service.html" class="sidebar-item">
      <i class="fas fa-concierge-bell"></i>
      <span>Сервис</span>
    </a>
    <a href="documents.html" class="sidebar-item">
      <i class="fas fa-file-contract"></i>
      <span>Документооборот</span>
    </a>
    <a href="dicom.html" class="sidebar-item active">
      <i class="fas fa-x-ray"></i>
      <span>Снимки</span>
    </a>
    <a href="stream.html" class="sidebar-item">
      <i class="fas fa-video"></i>
      <span>Трансляции</span>
    </a>
  </div>

  <!-- Основное содержимое -->
  <div class="main-content">
    <!-- Шапка -->
    <div class="header">
      <h1 class="hospital-title">
        <img src="@/assets/img/logo.png" alt="Логотип" class="logo">
        DICOM-просмотрщик
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
        <div class="stat-value">1,842</div>
        <div class="stat-label">Всего исследований</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">24</div>
        <div class="stat-label">За сегодня</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">1.2 TB</div>
        <div class="stat-label">Объем данных</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">94%</div>
        <div class="stat-label">Доступность</div>
      </div>
    </div>

    <!-- Просмотрщик DICOM -->
    <div class="patients-container">
      <div class="section-title-container">
        <h2 class="section-title">
          <i class="fas fa-x-ray"></i>
          Просмотр исследований
        </h2>
        <button class="add-patient-btn" id="upload-dicom-btn">
          <i class="fas fa-upload"></i>
          Загрузить снимки
        </button>
      </div>

      <!-- Фильтры -->
      <div class="filters-container">
        <div class="filter-group">
          <label class="filter-label">Модальность</label>
          <select class="filter-select" id="modality-filter">
            <option value="all">Все</option>
            <option value="CT">КТ</option>
            <option value="MRI">МРТ</option>
            <option value="XRAY">Рентген</option>
            <option value="US">УЗИ</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Дата</label>
          <select class="filter-select" id="date-filter">
            <option value="all">Все</option>
            <option value="today">Сегодня</option>
            <option value="week">За неделю</option>
            <option value="month">За месяц</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Сортировка</label>
          <select class="filter-select" id="sort-filter">
            <option value="date-desc">По дате (новые)</option>
            <option value="date-asc">По дате (старые)</option>
            <option value="name-asc">По названию (А-Я)</option>
            <option value="name-desc">По названию (Я-А)</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Поиск пациента</label>
          <input type="text" class="filter-select" id="patient-search" placeholder="ФИО, PID...">
        </div>
      </div>

      <div class="viewer-container">
        <div class="viewer-toolbar">
          <div class="toolbar-left">
            <button class="toolbar-btn" title="Предыдущее исследование">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button class="toolbar-btn" title="Следующее исследование">
              <i class="fas fa-chevron-right"></i>
            </button>
            <span class="toolbar-title">Выберите пациента</span>
          </div>
          <div class="toolbar-right">
            <button class="toolbar-btn" title="Измерения">
              <i class="fas fa-ruler"></i>
            </button>
            <button class="toolbar-btn" title="Аннотации">
              <i class="fas fa-highlighter"></i>
            </button>
            <button class="toolbar-btn" title="Сравнить">
              <i class="fas fa-columns"></i>
            </button>
          </div>
        </div>
        <div class="viewer-content">
          <div class="patient-list" id="patient-list">
            <!-- Пациенты будут добавлены через JavaScript -->
          </div>
          <div class="study-list" id="study-list">
            <!-- Исследования будут добавлены через JavaScript -->
          </div>
          <div class="image-viewer">
            <img src="https://via.placeholder.com/800x600/333333/FFFFFF/?text=DICOM+Image" alt="DICOM Image" class="dicom-image">
            <div class="viewer-controls">
              <button class="control-btn" title="Яркость/Контраст">
                <i class="fas fa-sliders-h"></i>
              </button>
              <button class="control-btn" title="Зум">
                <i class="fas fa-search"></i>
              </button>
              <button class="control-btn" title="Поворот">
                <i class="fas fa-undo"></i>
              </button>
              <button class="control-btn" title="Инвертировать">
                <i class="fas fa-adjust"></i>
              </button>
            </div>
          </div>
          <div class="series-list" id="series-list">
            <!-- Серии будут добавлены через JavaScript -->
          </div>
        </div>
      </div>
    </div>

    <!-- Форма загрузки снимков -->
    <div class="upload-container">
      <h3 class="upload-title">
        <i class="fas fa-upload"></i>
        Загрузка DICOM-файлов
      </h3>
      <div class="upload-area" id="upload-area">
        <div class="upload-icon">
          <i class="fas fa-cloud-upload-alt"></i>
        </div>
        <div class="upload-text">Перетащите DICOM-файлы сюда</div>
        <div class="upload-hint">или нажмите для выбора файлов</div>
      </div>
      <button class="upload-btn" id="start-upload-btn">
        <i class="fas fa-paper-plane"></i>
        Начать загрузку
      </button>
    </div>
  </div>

  <!-- DICOM-сервер -->
  <div class="map-container">
    <div class="map-header">
      <span>DICOM-сервер</span>
      <i class="fas fa-times"></i>
    </div>
    <div class="map-content">
      <i class="fas fa-database" style="font-size: 2rem;"></i>
      <div style="margin-top: 10px;">Хранилище DICOM</div>
    </div>
  </div>
</template>
<script>
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

// Активация пунктов меню
      document.addEventListener('DOMContentLoaded', function() {
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
      });

// Показываем приветственное сообщение при загрузке
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
          showNotification('Добро пожаловать', 'Вы вошли в систему больницы Святого Берендея', 'success');
        }, 1000);
      });

      // Генерация случайных пациентов
      function generateRandomPatient() {
        const lastNames = ["Иванов", "Петров", "Сидоров", "Смирнов", "Кузнецов", "Попов", "Васильев", "Соколов", "Михайлов", "Новиков"];
        const firstNames = ["Александр", "Дмитрий", "Сергей", "Андрей", "Алексей", "Иван", "Михаил", "Евгений", "Владимир", "Артем"];
        const middleNames = ["Иванович", "Петрович", "Сергеевич", "Андреевич", "Алексеевич", "Дмитриевич", "Михайлович", "Евгеньевич", "Владимирович", "Артемович"];
        const femaleLastNames = ["Иванова", "Петрова", "Сидорова", "Смирнова", "Кузнецова", "Попова", "Васильева", "Соколова", "Михайлова", "Новикова"];
        const femaleFirstNames = ["Елена", "Ольга", "Наталья", "Ирина", "Светлана", "Анна", "Мария", "Татьяна", "Екатерина", "Юлия"];
        const femaleMiddleNames = ["Ивановна", "Петровна", "Сергеевна", "Андреевна", "Алексеевна", "Дмитриевна", "Михайловна", "Евгеньевна", "Владимировна", "Артемовна"];

        const isFemale = Math.random() > 0.5;
        const lastName = isFemale ?
            femaleLastNames[Math.floor(Math.random() * femaleLastNames.length)] :
            lastNames[Math.floor(Math.random() * lastNames.length)];
        const firstName = isFemale ?
            femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)] :
            firstNames[Math.floor(Math.random() * firstNames.length)];
        const middleName = isFemale ?
            femaleMiddleNames[Math.floor(Math.random() * femaleMiddleNames.length)] :
            middleNames[Math.floor(Math.random() * middleNames.length)];

        return {
          id: Math.floor(1000 + Math.random() * 9000),
          name: `${lastName} ${firstName} ${middleName}`,
          shortName: `${lastName} ${firstName.charAt(0)}.${middleName.charAt(0)}.`,
          age: Math.floor(18 + Math.random() * 70),
          gender: isFemale ? 'Ж' : 'М',
          status: ["red", "yellow", "green"][Math.floor(Math.random() * 3)],
          room: Math.floor(1 + Math.random() * 8),
          bed: Math.floor(1 + Math.random() * 4),
          admission: new Date().toLocaleDateString('ru-RU'),
          diagnosis: ["ОРВИ", "Грипп", "Пневмония", "Гастрит", "Гипертония", "Сахарный диабет", "Остеохондроз", "Аппендицит"][Math.floor(Math.random() * 8)]
        };
      }

      // Генерация случайных исследований
      function generateRandomStudy(patientId) {
        const bodyParts = [
          "Головного мозга",
          "Позвоночника",
          "Грудной клетки",
          "Брюшной полости",
          "Тазобедренного сустава",
          "Коленного сустава",
          "Плечевого сустава",
          "Шеи",
          "Почек",
          "Печени"
        ];

        const modalities = ["CT", "MRI", "XRAY", "US"];
        const modalityNames = {
          CT: "Компьютерная томография",
          MRI: "Магнитно-резонансная томография",
          XRAY: "Рентгенография",
          US: "Ультразвуковое исследование"
        };

        const doctors = [
          "д-р Петров И.С.",
          "д-р Смирнова А.В.",
          "д-р Иванов С.П.",
          "д-р Кузнецова Е.П.",
          "д-р Васильев М.К."
        ];

        const modality = modalities[Math.floor(Math.random() * modalities.length)];
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));

        // Генерация серий
        const seriesCount = modality === "XRAY" ? 2 : Math.floor(2 + Math.random() * 4);
        const series = [];

        for (let i = 0; i < seriesCount; i++) {
          const sliceCount = modality === "XRAY" ? 1 : Math.floor(10 + Math.random() * 40);
          const seriesTypes = modality === "CT" ?
              ["Аксиальная", "Коронарная", "Сагиттальная"] :
              modality === "MRI" ?
                  ["T1-взвешенная", "T2-взвешенная", "FLAIR", "DWI"] :
                  modality === "US" ?
                      ["Продольная", "Поперечная", "Допплер"] :
                      ["Прямая проекция", "Боковая проекция"];

          series.push({
            name: `${seriesTypes[i % seriesTypes.length]} серия`,
            count: sliceCount
          });
        }

        return {
          id: Math.floor(1000 + Math.random() * 9000),
          patientId: patientId,
          title: `${modalityNames[modality]} ${bodyParts[Math.floor(Math.random() * bodyParts.length)]}`,
          modality: modality,
          date: date.toISOString().split('T')[0],
          doctor: doctors[Math.floor(Math.random() * doctors.length)],
          series: series
        };
      }

      // Генерация 50 пациентов
      const patientsData = Array.from({ length: 50 }, generateRandomPatient);

      // Генерация исследований для каждого пациента (1-5 исследований на пациента)
      const studiesData = [];
      patientsData.forEach(patient => {
        const studiesCount = Math.floor(1 + Math.random() * 5);
        for (let i = 0; i < studiesCount; i++) {
          studiesData.push(generateRandomStudy(patient.id));
        }
      });

      // Генерация HTML для пациента
      function generatePatientHTML(patient) {
        return `
        <div class="patient-item" data-id="${patient.id}">
          <div class="patient-info">
          <div class="patient-avatar" style="background: ${patient.gender === 'Ж' ? '#ff80ab' : '#82b1ff'}">
            ${patient.name.split(' ')[0].charAt(0)}${patient.name.split(' ')[1].charAt(0)}
          </div>
            <div class="patient-name">${patient.shortName}</div>
            <div class="patient-meta">
              <span class="patient-id">PID: ${patient.id}</span>
              <span class="patient-age">${patient.age} лет</span>
            </div>
          </div>
        </div>
      `;
      }

      // Генерация HTML для исследования
      function generateStudyHTML(study) {
        const displayDate = new Date(study.date).toLocaleDateString('ru-RU');
        return `
        <div class="study-item" data-id="${study.id}" data-modality="${study.modality}" data-date="${study.date}" data-title="${study.title}">
          <div class="study-title">${study.title}</div>
          <div class="study-date">${displayDate}</div>
          <div class="study-modality">${study.modality}</div>
        </div>
      `;
      }

      // Генерация HTML для серии
      function generateSeriesHTML(series, studyId) {
        return `
        <div class="series-item" data-study="${studyId}">
          <div class="series-thumbnail">
            <img src="https://via.placeholder.com/50x50/333333/FFFFFF/?text=${series.name.substring(0,2)}" alt="${series.name}">
          </div>
          <div class="series-info">
            <div class="series-name">${series.name}</div>
            <div class="series-count">${series.count} срезов</div>
          </div>
        </div>
      `;
      }

      // Функция фильтрации пациентов
      function filterPatients() {
        const searchQuery = document.getElementById('patient-search').value.toLowerCase();

        let filtered = patientsData;

        if (searchQuery) {
          filtered = patientsData.filter(p =>
              p.name.toLowerCase().includes(searchQuery) ||
              p.shortName.toLowerCase().includes(searchQuery) ||
              p.id.toString().includes(searchQuery)
          );
        }

        // Перерисовка списка пациентов
        const container = document.getElementById('patient-list');
        container.innerHTML = '';
        filtered.forEach(patient => {
          container.innerHTML += generatePatientHTML(patient);
        });

        // Добавляем обработчики событий
        document.querySelectorAll('.patient-item').forEach(item => {
          item.addEventListener('click', function() {
            const patientId = parseInt(this.dataset.id);
            const patient = patientsData.find(p => p.id === patientId);
            const patientStudies = studiesData.filter(s => s.patientId === patientId);

            // Обновляем заголовок
            document.querySelector('.toolbar-title').textContent = `Пациент: ${patient.shortName}`;

            // Показываем исследования пациента
            const studyContainer = document.getElementById('study-list');
            studyContainer.innerHTML = '';
            patientStudies.forEach(study => {
              studyContainer.innerHTML += generateStudyHTML(study);
            });

            // Очищаем серии и изображение
            document.getElementById('series-list').innerHTML = '';
            document.querySelector('.image-viewer img').src = 'https://via.placeholder.com/800x600/333333/FFFFFF/?text=DICOM+Image';

            // Обновляем активный элемент
            document.querySelectorAll('.patient-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Добавляем обработчики для исследований
            document.querySelectorAll('.study-item').forEach(item => {
              item.addEventListener('click', function() {
                const studyId = parseInt(this.dataset.id);
                const study = studiesData.find(s => s.id === studyId);

                // Обновляем заголовок
                document.querySelector('.toolbar-title').textContent = `${patient.shortName} - ${study.title}`;

                // Показываем серии
                const seriesContainer = document.getElementById('series-list');
                seriesContainer.innerHTML = '';
                study.series.forEach(series => {
                  seriesContainer.innerHTML += generateSeriesHTML(series, study.id);
                });

                // Обновляем активный элемент
                document.querySelectorAll('.study-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');

                // Показываем уведомление
                showNotification(
                    study.title,
                    `Пациент: ${patient.name}\nВрач: ${study.doctor}\nДата: ${new Date(study.date).toLocaleDateString('ru-RU')}\nМодальность: ${study.modality}`,
                    'info'
                );
              });
            });

            // Активируем первое исследование, если есть
            if (patientStudies.length > 0) {
              document.querySelector('.study-item').click();
            }
          });
        });

        // Активируем первого пациента, если есть
        if (filtered.length > 0) {
          document.querySelector('.patient-item').click();
        }
      }

      // Функция фильтрации исследований
      function filterStudies() {
        const modalityFilter = document.getElementById('modality-filter').value;
        const dateFilter = document.getElementById('date-filter').value;
        const sortFilter = document.getElementById('sort-filter').value;

        const activePatient = document.querySelector('.patient-item.active');
        if (!activePatient) return;

        const patientId = parseInt(activePatient.dataset.id);
        let filtered = studiesData.filter(s => s.patientId === patientId);

        // Фильтрация
        filtered = filtered.filter(study => {
          const matchesModality = modalityFilter === 'all' || study.modality === modalityFilter;

          let matchesDate = true;
          if (dateFilter !== 'all') {
            const studyDate = new Date(study.date);
            const today = new Date();

            if (dateFilter === 'today') {
              matchesDate = studyDate.toDateString() === today.toDateString();
            } else if (dateFilter === 'week') {
              const weekAgo = new Date(today);
              weekAgo.setDate(weekAgo.getDate() - 7);
              matchesDate = studyDate >= weekAgo;
            } else if (dateFilter === 'month') {
              const monthAgo = new Date(today);
              monthAgo.setMonth(monthAgo.getMonth() - 1);
              matchesDate = studyDate >= monthAgo;
            }
          }

          return matchesModality && matchesDate;
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
            default:
              return 0;
          }
        });

        // Перерисовка
        const container = document.getElementById('study-list');
        container.innerHTML = '';
        filtered.forEach(study => {
          container.innerHTML += generateStudyHTML(study);
        });

        // Добавляем обработчики событий
        document.querySelectorAll('.study-item').forEach(item => {
          item.addEventListener('click', function() {
            const studyId = parseInt(this.dataset.id);
            const study = studiesData.find(s => s.id === studyId);
            const patient = patientsData.find(p => p.id === study.patientId);

            // Обновляем заголовок
            document.querySelector('.toolbar-title').textContent = `${patient.shortName} - ${study.title}`;

            // Показываем серии
            const seriesContainer = document.getElementById('series-list');
            seriesContainer.innerHTML = '';
            study.series.forEach(series => {
              seriesContainer.innerHTML += generateSeriesHTML(series, study.id);
            });

            // Обновляем активный элемент
            document.querySelectorAll('.study-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
          });
        });

        // Активируем первое исследование, если есть
        if (filtered.length > 0) {
          document.querySelector('.study-item').click();
        }
      }

      // Инициализация фильтров
      function initFilters() {
        document.getElementById('modality-filter').addEventListener('change', filterStudies);
        document.getElementById('date-filter').addEventListener('change', filterStudies);
        document.getElementById('sort-filter').addEventListener('change', filterStudies);
        document.getElementById('patient-search').addEventListener('input', filterPatients);
      }

      // Инициализация при загрузке
      document.addEventListener('DOMContentLoaded', function() {
        initFilters();
        filterPatients(); // Первоначальная загрузка пациентов
      });
    })
  }

}
</script>
<style>

</style>