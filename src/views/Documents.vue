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
    <a href="documents.html" class="sidebar-item active">
      <i class="fas fa-file-medical"></i>
      <span>Документы</span>
    </a>
    <a href="dicom.html" class="sidebar-item">
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
        Документооборот
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
        <div class="stat-label">Всего документов</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">24</div>
        <div class="stat-label">За сегодня</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">94%</div>
        <div class="stat-label">Подписано</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">3.2 GB</div>
        <div class="stat-label">Объем данных</div>
      </div>
    </div>

    <!-- Форма создания документа -->
    <div id="create-document-form-container" style="display: none;">
      <div class="patients-container">
        <div class="section-title-container">
          <div class="section-title">
            <i class="fas fa-file-medical"></i>
            <span>Создание нового документа</span>
          </div>
          <button id="close-form-btn" class="add-patient-btn">
            <i class="fas fa-times"></i>
            Закрыть
          </button>
        </div>

        <form id="create-document-form" class="service-form">
          <div class="form-group">
            <label class="form-label">Тип документа</label>
            <select class="form-input" required>
              <option value="">Выберите тип</option>
              <option value="epicrisis">Эпикриз</option>
              <option value="protocol">Протокол</option>
              <option value="direction">Направление</option>
              <option value="recipe">Рецепт</option>
              <option value="order530">530 приказ</option>
              <option value="analysis">Анализ</option>
              <option value="conclusion">Заключение</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Название документа</label>
            <input type="text" class="form-input" placeholder="Введите название" required>
          </div>
          <div class="form-group">
            <label class="form-label">Пациент</label>
            <input type="text" class="form-input" id="patient-search-input" placeholder="Введите ФИО пациента">
            <div id="patient-search-results" class="search-results"></div>
          </div>
          <div class="form-group">
            <label class="form-label">Дата</label>
            <input type="date" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Содержание</label>
            <textarea class="form-input form-textarea" placeholder="Введите текст документа"></textarea>
          </div>
          <button type="submit" class="form-submit">
            <i class="fas fa-save"></i>
            Сохранить документ
          </button>
        </form>
      </div>
    </div>

    <!-- Список документов -->
    <div class="patients-container">
      <div class="section-title-container">
        <div class="section-title">
          <i class="fas fa-file-medical"></i>
          <span>Документооборот</span>
        </div>
        <button id="show-form-btn" class="add-patient-btn">
          <i class="fas fa-plus"></i>
          Создать документ
        </button>
      </div>

      <!-- Фильтры и сортировка -->
      <div class="filters-container">
        <div class="filter-group">
          <label class="filter-label">Тип документа</label>
          <select class="filter-select" id="type-filter">
            <option value="all">Все</option>
            <option value="epicrisis">Эпикриз</option>
            <option value="protocol">Протокол</option>
            <option value="direction">Направление</option>
            <option value="recipe">Рецепт</option>
            <option value="order530">530 приказ</option>
            <option value="analysis">Анализ</option>
            <option value="conclusion">Заключение</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Статус</label>
          <select class="filter-select" id="status-filter">
            <option value="all">Все</option>
            <option value="draft">Черновик</option>
            <option value="pending">На подписи</option>
            <option value="signed">Подписан</option>
            <option value="expired">Просрочен</option>
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
          <input type="text" class="filter-select" id="patient-filter" placeholder="ФИО пациента">
        </div>
      </div>

      <!-- Карточки документов -->
      <div id="documents-list">
        <!-- Документы будут добавлены через JavaScript -->
      </div>
    </div>
  </div>

  <!-- Карта (справа) -->
  <div class="map-container">
    <div class="map-header">
      <span>Карта отделений</span>
      <i class="fas fa-times"></i>
    </div>
    <div class="map-content">
      <i class="fas fa-map-marked-alt"></i>
      <p>Карта больницы будет отображаться здесь</p>
    </div>
  </div>

</template>
<script>
import {onMounted} from "vue";

export default {
  name: 'Stream',
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

      // Генерация случайного пациента для поиска
      function generateRandomPatient() {
        const lastNames = ["Иванов", "Петров", "Сидоров", "Смирнов", "Кузнецов"];
        const firstNames = ["Александр", "Дмитрий", "Сергей", "Андрей", "Алексей"];
        const middleNames = ["Иванович", "Петрович", "Сергеевич", "Андреевич", "Алексеевич"];
        const femaleLastNames = ["Иванова", "Петрова", "Сидорова", "Смирнова", "Кузнецова"];
        const femaleFirstNames = ["Елена", "Ольга", "Наталья", "Ирина", "Светлана"];
        const femaleMiddleNames = ["Ивановна", "Петровна", "Сергеевна", "Андреевна", "Алексеевна"];

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
          shortName: `${lastName} ${firstName.charAt(0)}.${middleName.charAt(0)}.`
        };
      }

      // Генерация списка пациентов для поиска
      const patientsList = Array.from({ length: 50 }, generateRandomPatient);

      // Поиск пациентов
      function searchPatients(query) {
        if (!query) {
          return [];
        }
        const lowerQuery = query.toLowerCase();
        return patientsList.filter(patient =>
            patient.name.toLowerCase().includes(lowerQuery) ||
            patient.shortName.toLowerCase().includes(lowerQuery)
        ).slice(0, 5); // Ограничиваем 5 результатами
      }

      // Отображение результатов поиска
      function showSearchResults(results) {
        const resultsContainer = document.getElementById('patient-search-results');
        resultsContainer.innerHTML = '';

        if (results.length === 0) {
          resultsContainer.style.display = 'none';
          return;
        }

        results.forEach(patient => {
          const item = document.createElement('div');
          item.className = 'search-result-item';
          item.textContent = `${patient.name} (ID: ${patient.id})`;
          item.onclick = () => {
            document.getElementById('patient-search-input').value = patient.name;
            resultsContainer.style.display = 'none';
          };
          resultsContainer.appendChild(item);
        });

        resultsContainer.style.display = 'block';
      }

      // Генерация случайного документа
      function generateDocument(id, isArchived = false) {
        const docTypes = [
          { name: "Выписной эпикриз", icon: "fa-file-medical", type: "epicrisis" },
          { name: "Протокол операции", icon: "fa-procedures", type: "protocol" },
          { name: "Направление", icon: "fa-arrow-right", type: "direction" },
          { name: "Рецепт", icon: "fa-prescription", type: "recipe" },
          { name: "530 приказ", icon: "fa-file-alt", type: "order530" },
          { name: "Анализ крови", icon: "fa-flask", type: "analysis" },
          { name: "Заключение", icon: "fa-file-signature", type: "conclusion" }
        ];

        const docType = docTypes[Math.floor(Math.random() * docTypes.length)];
        const docName = `${docType.name} №${Math.floor(Math.random() * 10000)}`;
        const docDate = new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
        const displayDate = new Date(docDate).toLocaleDateString('ru-RU');
        const docStatus = ["draft", "pending", "signed", "expired"][Math.floor(Math.random() * 4)];
        const docPatient = patientsList[Math.floor(Math.random() * patientsList.length)].name;
        const docAuthor = ["д-р Смирнов А.В.", "д-р Петрова М.К.", "д-р Иванова Е.П."][Math.floor(Math.random() * 3)];

        return {
          id: id,
          name: docName,
          type: docType.type,
          status: docStatus,
          date: docDate,
          patient: docPatient,
          author: docAuthor,
          displayDate: displayDate,
          isArchived: isArchived
        };
      }

      // Генерация HTML для документа
      function generateDocumentHTML(doc) {
        return `
        <div class="document-card compact-document ${doc.isArchived ? 'archived' : ''}"
             data-type="${doc.type}"
             data-date="${doc.date}"
             data-name="${doc.name}"
             data-status="${doc.status}"
             data-patient="${doc.patient}">
          <div class="document-header">
            <div class="document-title">${doc.name}</div>
            <div class="document-type">${doc.type === 'order530' ? '530 приказ' : doc.type}</div>
          </div>
          <div class="document-details">
            <div class="detail-item">
              <div class="detail-label">Пациент</div>
              <div>${doc.patient}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Дата</div>
              <div>${doc.displayDate}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Автор</div>
              <div>${doc.author}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Статус</div>
              <div class="status-${doc.status}">${
            doc.status === 'draft' ? 'Черновик' :
                doc.status === 'pending' ? 'На подписи' :
                    doc.status === 'signed' ? 'Подписан' : 'Просрочен'
        }</div>
            </div>
          </div>
          <div class="document-actions">
            <button class="action-btn view-btn"><i class="fas fa-eye"></i> Просмотр</button>
            <button class="action-btn edit-btn"><i class="fas fa-edit"></i> Редактировать</button>
            <button class="action-btn print-btn"><i class="fas fa-print"></i> Печать</button>
          </div>
        </div>
      `;
      }

      // Создаем массив документов
      const documentsData = [];
      for (let i = 0; i < 10; i++) {
        documentsData.push(generateDocument(i + 1));
      }
      for (let i = 0; i < 3; i++) {
        documentsData.push(generateDocument(i + 11, true));
      }

      // Сохраняем исходные данные
      const originalDocuments = [...documentsData];

      // Функция фильтрации документов
      function filterDocuments() {
        const typeFilter = document.getElementById('type-filter').value;
        const statusFilter = document.getElementById('status-filter').value;
        const sortFilter = document.getElementById('sort-filter').value;
        const patientFilter = document.getElementById('patient-filter').value.toLowerCase();

        // Фильтрация
        let filtered = [...originalDocuments];

        if (typeFilter !== 'all') {
          filtered = filtered.filter(doc => doc.type === typeFilter);
        }

        if (statusFilter !== 'all') {
          filtered = filtered.filter(doc => doc.status === statusFilter);
        }

        if (patientFilter) {
          filtered = filtered.filter(doc =>
              doc.patient.toLowerCase().includes(patientFilter)
          );
        }

        // Сортировка
        filtered.sort((a, b) => {
          switch(sortFilter) {
            case 'date-desc':
              return new Date(b.date) - new Date(a.date);
            case 'date-asc':
              return new Date(a.date) - new Date(b.date);
            case 'name-asc':
              return a.name.localeCompare(b.name);
            case 'name-desc':
              return b.name.localeCompare(a.name);
            default:
              return 0;
          }
        });

        // Перерисовка
        const container = document.getElementById('documents-list');
        container.innerHTML = '';
        filtered.forEach(doc => {
          container.innerHTML += generateDocumentHTML(doc);
        });
      }

      // Инициализация фильтров
      function initFilters() {
        document.getElementById('type-filter').addEventListener('change', filterDocuments);
        document.getElementById('status-filter').addEventListener('change', filterDocuments);
        document.getElementById('sort-filter').addEventListener('change', filterDocuments);
        document.getElementById('patient-filter').addEventListener('input', filterDocuments);
      }

      // Инициализация поиска пациентов
      function initPatientSearch() {
        const searchInput = document.getElementById('patient-search-input');
        const resultsContainer = document.getElementById('patient-search-results');

        searchInput.addEventListener('input', function() {
          const query = this.value.trim();
          if (query.length > 1) {
            const results = searchPatients(query);
            showSearchResults(results);
          } else {
            resultsContainer.style.display = 'none';
          }
        });

        // Скрываем результаты при клике вне поля
        document.addEventListener('click', function(e) {
          if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.style.display = 'none';
          }
        });
      }

      // Инициализация при загрузке
      document.addEventListener('DOMContentLoaded', function() {
        // Инициализация фильтров
        initFilters();
        initPatientSearch();

        // Первоначальная загрузка документов
        filterDocuments();

        // Обработка формы создания документа
        document.getElementById('create-document-form').addEventListener('submit', function(e) {
          e.preventDefault();
          showNotification('Успех!', 'Новый документ успешно создан!', 'success');
          this.reset();
          document.getElementById('create-document-form-container').style.display = 'none';
        });

        // Кнопки открытия/закрытия формы
        document.getElementById('show-form-btn').addEventListener('click', function() {
          document.getElementById('create-document-form-container').style.display = 'block';
        });

        document.getElementById('close-form-btn').addEventListener('click', function(e) {
          e.preventDefault();
          document.getElementById('create-document-form-container').style.display = 'none';
        });

        // Демонстрация уведомления при загрузке
        setTimeout(() => {
          showNotification('Добро пожаловать', 'Система документооборота загружена', 'info');
        }, 1000);
      });
    })
  }
}
</script>
<style>

</style>