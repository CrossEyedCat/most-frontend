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
        Сервис оборудования
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
        <div class="stat-value">142</div>
        <div class="stat-label">Всего единиц</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">18</div>
        <div class="stat-label">Требуют обслуживания</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">7</div>
        <div class="stat-label">В ремонте</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">94%</div>
        <div class="stat-label">Исправность парка</div>
      </div>
    </div>

    <!-- Список оборудования -->
    <div class="patients-container">
      <div class="section-title-container">
        <h2 class="section-title">
          <i class="fas fa-tools"></i>
          Оборудование отделения
        </h2>
        <button class="add-patient-btn" id="add-equipment-btn">
          <i class="fas fa-plus"></i>
          Добавить заявку
        </button>
      </div>

      <!-- Фильтры -->
      <div class="filters-container">
        <div class="filter-group">
          <label class="filter-label">Статус</label>
          <select class="filter-select" id="status-filter">
            <option value="all">Все</option>
            <option value="working">Исправно</option>
            <option value="warning">Требует проверки</option>
            <option value="critical">Неисправно</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Тип</label>
          <select class="filter-select" id="type-filter">
            <option value="all">Все</option>
            <option value="diagnostic">Диагностическое</option>
            <option value="treatment">Лечебное</option>
            <option value="monitoring">Мониторинговое</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Сортировка</label>
          <select class="filter-select" id="sort-filter">
            <option value="name-asc">По названию (А-Я)</option>
            <option value="name-desc">По названию (Я-А)</option>
            <option value="status">По статусу</option>
          </select>
        </div>
      </div>

      <!-- Блок с критическим оборудованием -->
      <div class="critical-patients">
        <i class="fas fa-exclamation-triangle"></i>
        <div>
          <span class="critical-count" id="critical-count">5</span>
          <span>единиц оборудования требуют срочного ремонта</span>
        </div>
      </div>

      <!-- Карточки оборудования -->
      <div id="equipment-list">
        <!-- Данные будут добавлены через JavaScript -->
      </div>
    </div>

    <!-- Форма заявки на обслуживание -->
    <div class="service-form">
      <h3 class="form-title">
        <i class="fas fa-tools"></i>
        Заявка на обслуживание
      </h3>
      <form id="service-request-form">
        <div class="form-group">
          <label class="form-label">Оборудование</label>
          <select class="form-input" required>
            <option value="">Выберите оборудование</option>
            <option value="1">Аппарат ИВЛ "ВентиМастер-3000" (IVL-2042-7)</option>
            <option value="2">Рентгеновский аппарат "Рентген-Про" (XRAY-1842-2)</option>
            <option value="3">Дефибриллятор "CardioSave-2000" (DEF-2103-1)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Тип проблемы</label>
          <select class="form-input" required>
            <option value="">Выберите тип проблемы</option>
            <option value="repair">Ремонт</option>
            <option value="service">Техническое обслуживание</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Описание проблемы</label>
          <textarea class="form-input form-textarea" placeholder="Подробно опишите проблему..." required></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Срочность</label>
          <select class="form-input" required>
            <option value="normal">Обычная</option>
            <option value="high">Высокая</option>
            <option value="critical">Критическая</option>
          </select>
        </div>
        <button type="submit" class="form-submit">
          <i class="fas fa-paper-plane"></i>
          Отправить заявку
        </button>
      </form>
    </div>
  </div>

  <!-- Карта оборудования -->
  <div class="map-container">
    <div class="map-header">
      <span>Карта оборудования</span>
      <i class="fas fa-times"></i>
    </div>
    <div class="map-content">
      <i class="fas fa-tools" style="font-size: 2rem;"></i>
      <div style="margin-top: 10px;">Просмотр расположения</div>
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
      // Генерация случайного оборудования
      function generateRandomEquipment() {
        const equipmentTypes = [
          "Аппарат ИВЛ", "Дефибриллятор", "Рентгеновский аппарат",
          "УЗИ аппарат", "Кардиомонитор", "Аппарат для гемодиализа",
          "Эндоскопическая стойка", "Аппарат ЭКГ", "Аппарат для наркоза",
          "Лапароскопическая стойка", "Аппарат УВЧ", "Лазерный аппарат"
        ];

        const models = [
          "Master-3000", "Pro-2000", "Expert-500", "Ultra-400", "Elite-1000",
          "Premium-250", "Gold-700", "Platinum-900", "Diamond-1200", "Titan-600"
        ];

        const locations = [
          "Реанимация, палата 1", "Реанимация, палата 2", "Операционная №1",
          "Операционная №2", "Рентгенологический кабинет", "Кабинет УЗИ",
          "Процедурный кабинет", "Физиотерапевтический кабинет", "Кардиологическое отделение",
          "Неврологическое отделение", "Терапевтическое отделение", "Хирургическое отделение"
        ];

        const statuses = ["working", "warning", "critical"];
        const statusLabels = {
          working: "Исправен",
          warning: "Требует проверки",
          critical: "Неисправен"
        };

        const types = ["diagnostic", "treatment", "monitoring"];

        const equipmentType = equipmentTypes[Math.floor(Math.random() * equipmentTypes.length)];
        const model = models[Math.floor(Math.random() * models.length)];
        const status = statuses[Math.floor(Math.random() * 3)];
        const type = types[Math.floor(Math.random() * 3)];

        const lastServiceDate = new Date();
        lastServiceDate.setDate(lastServiceDate.getDate() - Math.floor(Math.random() * 180));

        const nextServiceDate = new Date(lastServiceDate);
        nextServiceDate.setDate(nextServiceDate.getDate() + 90);

        return {
          id: Math.floor(1000 + Math.random() * 9000),
          name: `${equipmentType} "${model}"`,
          status: status,
          statusLabel: statusLabels[status],
          type: type,
          inventory: `${equipmentType.substring(0,3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1 + Math.random() * 5)}`,
          location: locations[Math.floor(Math.random() * locations.length)],
          lastService: lastServiceDate.toLocaleDateString('ru-RU'),
          nextService: nextServiceDate.toLocaleDateString('ru-RU')
        };
      }

      // Генерация 30 единиц оборудования
      const equipmentData = Array.from({ length: 30 }, generateRandomEquipment);

      // Генерация истории обслуживания
      function generateServiceHistory(id) {
        const actions = [
          "Плановое техническое обслуживание",
          "Замена фильтров",
          "Калибровка",
          "Ремонт",
          "Замена деталей",
          "Проверка работоспособности",
          "Обновление ПО",
          "Чистка",
          "Дезинфекция",
          "Диагностика"
        ];

        const history = [];
        const count = Math.floor(1 + Math.random() * 5);

        for (let i = 0; i < count; i++) {
          const date = new Date();
          date.setDate(date.getDate() - Math.floor(Math.random() * 365));

          history.push({
            date: date.toLocaleDateString('ru-RU'),
            action: actions[Math.floor(Math.random() * actions.length)]
          });
        }

        return history;
      }

      // Генерация HTML для карточки оборудования
      function generateEquipmentHTML(equipment) {
        const history = generateServiceHistory(equipment.id);

        return `
        <div class="equipment-card" data-status="${equipment.status}" data-type="${equipment.type}" data-name="${equipment.name}">
          <div class="equipment-header">
            <div class="equipment-title">${equipment.name}</div>
            <div class="equipment-status status-${equipment.status}">${equipment.statusLabel}</div>
          </div>
          <div class="equipment-details">
            <div class="detail-item">
              <div class="detail-label">Инвентарный номер</div>
              <div>${equipment.inventory}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Место установки</div>
              <div>${equipment.location}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Дата последнего ТО</div>
              <div>${equipment.lastService}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Следующее ТО</div>
              <div>${equipment.nextService}</div>
            </div>
          </div>
          <div class="service-history">
            ${history.map(item => `
              <div class="history-item">
                <span class="history-date">${item.date}</span>
                <span class="history-action">${item.action}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      }

      // Функция фильтрации оборудования
      function filterEquipment() {
        const statusFilter = document.getElementById('status-filter').value;
        const typeFilter = document.getElementById('type-filter').value;
        const sortFilter = document.getElementById('sort-filter').value;

        // Фильтрация
        let filtered = equipmentData.filter(equipment => {
          const matchesStatus = statusFilter === 'all' || equipment.status === statusFilter;
          const matchesType = typeFilter === 'all' || equipment.type === typeFilter;
          return matchesStatus && matchesType;
        });

        // Сортировка
        filtered.sort((a, b) => {
          switch(sortFilter) {
            case 'name-asc':
              return a.name.localeCompare(b.name);
            case 'name-desc':
              return b.name.localeCompare(a.name);
            case 'status':
              // Сортировка по статусу (critical > warning > working)
              const statusOrder = {critical: 1, warning: 2, working: 3};
              return statusOrder[a.status] - statusOrder[b.status];
            default:
              return 0;
          }
        });

        // Перерисовка
        const container = document.getElementById('equipment-list');
        container.innerHTML = '';
        filtered.forEach(equipment => {
          container.innerHTML += generateEquipmentHTML(equipment);
        });

        // Обновление счетчика критического оборудования
        const criticalCount = filtered.filter(e => e.status === 'critical').length;
        document.getElementById('critical-count').textContent = criticalCount;
      }

      // Инициализация фильтров
      function initFilters() {
        document.getElementById('status-filter').addEventListener('change', filterEquipment);
        document.getElementById('type-filter').addEventListener('change', filterEquipment);
        document.getElementById('sort-filter').addEventListener('change', filterEquipment);
      }

        initFilters();
        filterEquipment(); // Первоначальная фильтрация

        // Обработка формы
        document.getElementById('service-request-form').addEventListener('submit', function(e) {
          e.preventDefault();
          showNotification('Успех', 'Заявка на обслуживание успешно отправлена!', 'success');
          this.reset();
        });

        // Обработчик кнопки добавления оборудования
        document.getElementById('add-equipment-btn').addEventListener('click', function() {
          showNotification('Добавление оборудования', 'Форма добавления оборудования будет реализована в полной версии системы', 'info');
        });

    })
  }
}
</script>
<style>

</style>