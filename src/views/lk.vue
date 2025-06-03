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
        Медицинская карта: Гомельский И.М.
      </h1>
      <div class="user-profile">
        <div class="user-icon">
          <i class="fas fa-user-md"></i>
        </div>
      </div>
    </div>

    <!-- Основная информация о пациенте -->
    <div class="patients-container">
      <div class="section-title-container">
        <div class="section-title">
          <i class="fas fa-user-injured"></i>
          <span>Основная информация</span>
        </div>
      </div>

      <div class="patient-info-grid">
        <div class="patient-avatar">ГИ</div>
        <div class="patient-details">
          <h2>Гомельский Иван Михайлович</h2>
          <div class="patient-meta">
            <div class="meta-item">
              <strong>Дата рождения</strong>
              15.03.1965 (58 лет)
            </div>
            <div class="meta-item">
              <strong>Пол</strong>
              Мужской
            </div>
            <div class="meta-item">
              <strong>ИБ №</strong>
              1234567890
            </div>
            <div class="meta-item">
              <strong>Отделение</strong>
              Терапия, палата 305
            </div>
            <div class="meta-item">
              <strong>Лечащий врач</strong>
              Петрова А.В.
            </div>
          </div>
        </div>
        <div class="current-datetime">
          <div class="date" id="currentDate">20 мая 2023, суббота</div>
          <div class="time" id="currentTime">14:25:36</div>
        </div>
      </div>
    </div>

    <!-- Медицинская информация -->
    <div class="patients-container">
      <div class="section-title-container">
        <div class="section-title">
          <i class="fas fa-file-medical-alt"></i>
          <span>Медицинская информация</span>
        </div>
      </div>

      <div class="medical-info-grid">
        <div class="info-section">
          <h3><i class="fas fa-prescription-bottle-alt"></i> Назначение</h3>
          <div class="info-content">
            <p><i class="fas fa-pills"></i> Антибиотикотерапия: Амоксиклав 625 мг 3 раза в день в течение 7 дней</p>
            <p><i class="fas fa-procedures"></i> Физиотерапия: УВЧ на область грудной клетки, 10 сеансов</p>
            <p><i class="fas fa-utensils"></i> Диета: Стол №15, обильное питье</p>
          </div>
        </div>

        <div class="info-section">
          <h3><i class="fas fa-file-medical"></i> Документация</h3>
          <div class="info-content">
            <p><i class="fas fa-history"></i> История болезни №12345 от 15.05.2023</p>
            <p><i class="fas fa-file-contract"></i> Эпикриз: Состояние средней степени тяжести</p>
            <p><i class="fas fa-vial"></i> Анализы от 20.05.2023: ОАК, ОАМ, биохимия</p>
            <p><i class="fas fa-diagnoses"></i> Диагноз: J18.9 Пневмония неуточненная</p>
          </div>
        </div>

        <div class="info-section">
          <h3><i class="fas fa-info-circle"></i> Дополнительная информация</h3>
          <div class="info-content">
            <p><i class="fas fa-allergies"></i> Аллергии: Пенициллин (крапивница)</p>
            <p><i class="fas fa-heartbeat"></i> Хронические заболевания: Гипертоническая болезнь I ст.</p>
            <p><i class="fas fa-stethoscope"></i> Рекомендации: Постельный режим, контроль АД 2 раза в день</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Показатели жизнедеятельности -->
    <div class="patients-container">
      <div class="section-title-container">
        <div class="section-title">
          <i class="fas fa-heartbeat"></i>
          <span>Показатели жизнедеятельности</span>
        </div>
        <button class="add-patient-btn" id="addVitalsBtn">
          <i class="fas fa-plus"></i>
          Добавить показатели
        </button>
      </div>

      <div class="compact-vitals">
        <div class="vital-tile normal" data-metric="pulse">
          <div class="vital-icon"><i class="fas fa-heart"></i></div>
          <div class="vital-value">72</div>
          <div class="vital-title">Пульс</div>
          <div class="vital-unit">уд/мин</div>
        </div>

        <div class="vital-tile warning" data-metric="pressure">
          <div class="vital-icon"><i class="fas fa-tachometer-alt"></i></div>
          <div class="vital-value">145/90</div>
          <div class="vital-title">Давление</div>
          <div class="vital-unit">мм рт.ст.</div>
        </div>

        <div class="vital-tile normal" data-metric="saturation">
          <div class="vital-icon"><i class="fas fa-lungs"></i></div>
          <div class="vital-value">98</div>
          <div class="vital-title">Сатурация</div>
          <div class="vital-unit">%</div>
        </div>

        <div class="vital-tile normal" data-metric="temperature">
          <div class="vital-icon"><i class="fas fa-thermometer-half"></i></div>
          <div class="vital-value">36.6</div>
          <div class="vital-title">Температура</div>
          <div class="vital-unit">°C</div>
        </div>

        <div class="vital-tile normal" data-metric="respiration">
          <div class="vital-icon"><i class="fas fa-wind"></i></div>
          <div class="vital-value">16</div>
          <div class="vital-title">Дыхание</div>
          <div class="vital-unit">вдохов/мин</div>
        </div>

        <div class="vital-tile critical" data-metric="glucose">
          <div class="vital-icon"><i class="fas fa-syringe"></i></div>
          <div class="vital-value">8.7</div>
          <div class="vital-title">Глюкоза</div>
          <div class="vital-unit">ммоль/л</div>
        </div>
      </div>

      <!-- График динамики показателей -->
      <div class="chart-container-wrapper">
        <div class="chart-controls">
          <select id="metricSelect">
            <option value="temperature">Температура</option>
            <option value="pulse">Пульс</option>
            <option value="pressure">Давление</option>
            <option value="saturation">Сатурация</option>
            <option value="respiration">Дыхание</option>
            <option value="glucose">Глюкоза</option>
          </select>
          <button id="updateChartBtn" class="form-submit">
            <i class="fas fa-chart-line"></i>
            Показать
          </button>

          <div class="period-selector">
            <button class="period-btn active" data-days="7">7 дней</button>
            <button class="period-btn" data-days="14">14 дней</button>
          </div>
        </div>
        <div class="chart-container">
          <canvas id="vitalsChart"></canvas>
        </div>
      </div>
    </div>

    <!-- Быстрые действия -->
    <div class="patients-container">
      <div class="section-title-container">
        <div class="section-title">
          <i class="fas fa-bolt"></i>
          <span>Быстрые действия</span>
        </div>
      </div>

      <div class="quick-actions-grid">
        <button class="action-btn" id="addRecordBtn">
          <i class="fas fa-plus"></i>
          Добавить запись
        </button>
        <button class="action-btn" id="exportDataBtn">
          <i class="fas fa-file-export"></i>
          Экспорт данных
        </button>
        <button class="action-btn" id="prescriptionBtn">
          <i class="fas fa-prescription-bottle-alt"></i>
          Назначения
        </button>
        <button class="action-btn" id="recipeBtn">
          <i class="fas fa-file-prescription"></i>
          Выписать рецепт
        </button>
        <button class="action-btn" id="referralBtn">
          <i class="fas fa-arrow-right"></i>
          Создать направление
        </button>
        <button class="action-btn" id="addAnalysisBtn">
          <i class="fas fa-vial"></i>
          Добавить анализ
        </button>
      </div>
    </div>

    <!-- График приема лекарств -->
    <div class="patients-container">
      <div class="section-title-container">
        <div class="section-title">
          <i class="fas fa-pills"></i>
          <span>График приема лекарств</span>
        </div>
        <button class="add-patient-btn" id="addMedicationBtn">
          <i class="fas fa-plus"></i>
          Добавить лекарство
        </button>
      </div>

      <div class="medication-schedule">
        <div class="medication-header">
          <div>Препарат</div>
          <div>Дозировка</div>
          <div>Время приема</div>
          <div>Статус</div>
        </div>
        <div class="medication-item">
          <div class="medication-name">
            <i class="fas fa-pills"></i>
            Амоксиклав
          </div>
          <div class="medication-dosage">625 мг</div>
          <div class="medication-time">08:00, 14:00, 22:00</div>
          <div class="medication-status active">
            <i class="fas fa-check-circle"></i>
            Активно
          </div>
        </div>
        <div class="medication-item">
          <div class="medication-name">
            <i class="fas fa-pills"></i>
            Эналаприл
          </div>
          <div class="medication-dosage">5 мг</div>
          <div class="medication-time">09:00, 21:00</div>
          <div class="medication-status active">
            <i class="fas fa-check-circle"></i>
            Активно
          </div>
        </div>
        <div class="medication-item">
          <div class="medication-name">
            <i class="fas fa-pills"></i>
            Аспирин
          </div>
          <div class="medication-dosage">75 мг</div>
          <div class="medication-time">08:00</div>
          <div class="medication-status paused">
            <i class="fas fa-pause-circle"></i>
            Приостановлено
          </div>
        </div>
        <div class="medication-item">
          <div class="medication-name">
            <i class="fas fa-pills"></i>
            Омепразол
          </div>
          <div class="medication-dosage">20 мг</div>
          <div class="medication-time">07:30</div>
          <div class="medication-status completed">
            <i class="fas fa-check-circle"></i>
            Завершено
          </div>
        </div>
      </div>
    </div>

    <!-- Вкладки с дополнительной информацией -->
    <div class="patients-container">
      <div class="tabs-container">
        <div class="tabs">
          <div class="tab active" data-tab="alerts">
            <i class="fas fa-bell"></i>
            Оповещения
          </div>
          <div class="tab" data-tab="analyses">
            <i class="fas fa-vial"></i>
            Анализы
          </div>
          <div class="tab" data-tab="procedures">
            <i class="fas fa-procedures"></i>
            Процедуры
          </div>
        </div>

        <div class="tab-content active" id="alerts-tab">
          <div class="alert-item critical">
            <i class="fas fa-exclamation-triangle"></i>
            <div class="alert-content">
              <div class="alert-title">Высокий уровень глюкозы</div>
              <div class="alert-text">8.7 ммоль/л - требуется коррекция</div>
            </div>
          </div>
          <div class="alert-item warning">
            <i class="fas fa-exclamation-circle"></i>
            <div class="alert-content">
              <div class="alert-title">Повышенное давление</div>
              <div class="alert-text">145/90 - контроль через 1 час</div>
            </div>
          </div>
          <div class="alert-item info">
            <i class="fas fa-info-circle"></i>
            <div class="alert-content">
              <div class="alert-title">Физиотерапия</div>
              <div class="alert-text">Следующая процедура: завтра в 10:00 (кабинет 305)</div>
            </div>
          </div>
          <div class="alert-item info">
            <i class="fas fa-info-circle"></i>
            <div class="alert-content">
              <div class="alert-title">Анализы крови</div>
              <div class="alert-text">Запланированы на 25.05.2023</div>
            </div>
          </div>
        </div>

        <div class="tab-content" id="analyses-tab">
          <button class="add-patient-btn" id="addAnalysisBtn2">
            <i class="fas fa-plus"></i>
            Добавить анализ
          </button>

          <div class="analysis-table-container">
            <table class="analysis-table">
              <thead>
              <tr>
                <th>Дата</th>
                <th>Тип анализа</th>
                <th>Показатель</th>
                <th>Значение</th>
                <th>Статус</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>20.05.2023</td>
                <td>Глюкоза крови</td>
                <td>Глюкоза</td>
                <td class="analysis-value critical">8.7 ммоль/л</td>
                <td class="analysis-status critical">Высокий</td>
              </tr>
              <tr>
                <td>20.05.2023</td>
                <td>Общий анализ крови</td>
                <td>Лейкоциты</td>
                <td class="analysis-value normal">8.2 × 10⁹/л</td>
                <td class="analysis-status normal">Норма</td>
              </tr>
              <tr>
                <td>20.05.2023</td>
                <td>Общий анализ крови</td>
                <td>Гемоглобин</td>
                <td class="analysis-value normal">142 г/л</td>
                <td class="analysis-status normal">Норма</td>
              </tr>
              <tr>
                <td>18.05.2023</td>
                <td>Биохимия крови</td>
                <td>АЛТ</td>
                <td class="analysis-value warning">45 Ед/л</td>
                <td class="analysis-status warning">Повышен</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="tab-content" id="procedures-tab">
          <button class="add-patient-btn" id="addProcedureBtn">
            <i class="fas fa-plus"></i>
            Добавить процедуру
          </button>

          <div class="procedures-table-container">
            <table class="procedures-table">
              <thead>
              <tr>
                <th>Дата</th>
                <th>Процедура</th>
                <th>Статус</th>
                <th>Исполнитель</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>21.05.2023 10:00</td>
                <td>УВЧ на область грудной клетки</td>
                <td class="status-planned">Запланирована</td>
                <td>Иванова Т.П.</td>
              </tr>
              <tr>
                <td>20.05.2023 09:30</td>
                <td>Забор крови на анализ</td>
                <td class="status-completed">Выполнена</td>
                <td>Сидорова Л.М.</td>
              </tr>
              <tr>
                <td>19.05.2023 11:00</td>
                <td>ЭКГ</td>
                <td class="status-completed">Выполнена</td>
                <td>Кузнецова А.В.</td>
              </tr>
              <tr>
                <td>18.05.2023 15:00</td>
                <td>Рентгенография грудной клетки</td>
                <td class="status-completed">Выполнена</td>
                <td>Петров С.И.</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
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

  <!-- Модальные окна -->
  <!-- Форма добавления записи -->
  <div class="modal-overlay" id="addRecordModal">
    <div class="modal">
      <div class="modal-header">
        <h3><i class="fas fa-plus-circle"></i> Добавить запись в историю болезни</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <form id="addRecordForm" class="service-form">
          <div class="form-group">
            <label class="form-label">Дата записи</label>
            <input type="datetime-local" class="form-input" id="recordDate" required>
          </div>
          <div class="form-group">
            <label class="form-label">Тип записи</label>
            <select class="form-input" id="recordType" required>
              <option value="">Выберите тип</option>
              <option value="examination">Осмотр</option>
              <option value="procedure">Процедура</option>
              <option value="analysis">Анализ</option>
              <option value="diagnosis">Диагноз</option>
              <option value="other">Другое</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Содержание записи</label>
            <textarea class="form-input form-textarea" id="recordContent" required></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Ответственный врач</label>
            <input type="text" class="form-input" id="recordDoctor" required>
          </div>
          <button type="submit" class="form-submit">
            <i class="fas fa-save"></i>
            Сохранить запись
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import {onMounted} from "vue";
import Chart from 'chart.js/auto';
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

// Обновление даты и времени в реальном времени
      function updateDateTime() {
        const now = new Date();
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        };
        document.getElementById('currentDate').textContent =
            now.toLocaleDateString('ru-RU', options);

        const timeOptions = {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        };
        document.getElementById('currentTime').textContent =
            now.toLocaleTimeString('ru-RU', timeOptions);
      }

      setInterval(updateDateTime, 1000);
      updateDateTime();

      // Данные для графиков (7 и 14 дней)
      const vitalsData = {
        temperature: {
          7: generateRandomData(36.2, 38.5, 1, '°C', 7),
          14: generateRandomData(36.2, 38.5, 1, '°C', 14)
        },
        pulse: {
          7: generateRandomData(65, 100, 0, 'уд/мин', 7),
          14: generateRandomData(65, 100, 0, 'уд/мин', 14)
        },
        pressure: {
          7: generatePressureData(110, 150, 60, 90, 7),
          14: generatePressureData(110, 150, 60, 90, 14)
        },
        saturation: {
          7: generateRandomData(95, 100, 0, '%', 7),
          14: generateRandomData(95, 100, 0, '%', 14)
        },
        respiration: {
          7: generateRandomData(12, 20, 0, 'вдохов/мин', 7),
          14: generateRandomData(12, 20, 0, 'вдохов/мин', 14)
        },
        glucose: {
          7: generateRandomData(4.0, 9.0, 1, 'ммоль/л', 7),
          14: generateRandomData(4.0, 9.0, 1, 'ммоль/л', 14)
        }
      };

      // Генерация данных для давления (особый случай)
      function generatePressureData(sysMin, sysMax, diaMin, diaMax, days) {
        const dates = [];
        const today = new Date();

        for (let i = days-1; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          dates.push(date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }));
        }

        // Генерируем отдельные значения для систолического и диастолического давления
        const systolicValues = dates.map(() => (Math.random() * (sysMax - sysMin) + sysMin).toFixed(0));
        const diastolicValues = dates.map(() => (Math.random() * (diaMax - diaMin) + diaMin).toFixed(0));

        return {
          dates,
          systolicValues,
          diastolicValues,
          unit: 'мм рт.ст.'
        };
      }

      // Генерация случайных данных для других показателей
      function generateRandomData(min, max, decimals, unit, days) {
        const dates = [];
        const today = new Date();

        for (let i = days-1; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          dates.push(date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }));
        }

        const values = dates.map(() => {
          return (Math.random() * (max - min) + min).toFixed(decimals);
        });

        return { dates, values, unit };
      }

      // Текущий период (7 или 14 дней)
      let currentPeriod = 7;

      // Инициализация графика
      const ctx = document.getElementById('vitalsChart').getContext('2d');
      let chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: vitalsData.temperature[7].dates,
          datasets: [{
            label: 'Температура (°C)',
            data: vitalsData.temperature[7].values,
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            borderWidth: 2,
            tension: 0.3,
            fill: true,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#e74c3c',
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: getChartOptions('Температура', '°C')
      });

      // Функция для получения настроек графика
      function getChartOptions(title, unit) {
        return {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: title === 'Давление',
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${context.parsed.y} ${unit}`;
                }
              },
              backgroundColor: 'rgba(0,0,0,0.8)',
              titleFont: { size: 14, weight: 'bold' },
              bodyFont: { size: 14 },
              padding: 12,
              cornerRadius: 6
            },
            title: {
              display: true,
              text: title,
              position: 'bottom',
              font: { size: 14 }
            }
          },
          scales: {
            y: {
              title: {
                display: true,
                text: unit,
                font: { weight: 'bold' }
              },
              grid: {
                color: 'rgba(0,0,0,0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          elements: {
            line: {
              borderWidth: 2
            }
          }
        };
      }

      // Обработчик изменения метрики
      document.getElementById('updateChartBtn').addEventListener('click', function() {
        const metric = document.getElementById('metricSelect').value;
        const metricData = vitalsData[metric][currentPeriod];
        const metricName = document.querySelector(`[data-metric="${metric}"] .vital-title`).textContent;

        // Определяем цвет графика в зависимости от типа показателя
        let borderColor = '#4a90e2';
        if (metric === 'temperature') borderColor = '#e74c3c';
        if (metric === 'pulse') borderColor = '#2ecc71';
        if (metric === 'pressure') borderColor = '#9b59b6';
        if (metric === 'glucose') borderColor = '#f39c12';

        // Обновляем данные графика
        chart.data.labels = metricData.dates;

        // Особый случай для давления - два набора данных
        if (metric === 'pressure') {
          chart.data.datasets = [
            {
              label: 'Систолическое давление',
              data: metricData.systolicValues,
              borderColor: '#9b59b6',
              backgroundColor: 'rgba(155, 89, 182, 0.1)',
              borderWidth: 2,
              tension: 0.3,
              fill: false,
              pointBackgroundColor: '#fff',
              pointBorderColor: '#9b59b6',
              pointRadius: 4,
              pointHoverRadius: 6
            },
            {
              label: 'Диастолическое давление',
              data: metricData.diastolicValues,
              borderColor: '#3498db',
              backgroundColor: 'rgba(52, 152, 219, 0.1)',
              borderWidth: 2,
              tension: 0.3,
              fill: false,
              pointBackgroundColor: '#fff',
              pointBorderColor: '#3498db',
              pointRadius: 4,
              pointHoverRadius: 6
            }
          ];
        } else {
          chart.data.datasets = [{
            label: `${metricName} (${metricData.unit})`,
            data: metricData.values,
            borderColor: borderColor,
            backgroundColor: `${borderColor}20`,
            borderWidth: 2,
            tension: 0.3,
            fill: true,
            pointBackgroundColor: '#fff',
            pointBorderColor: borderColor,
            pointRadius: 4,
            pointHoverRadius: 6
          }];
        }

        // Обновляем опции графика
        chart.options = getChartOptions(metricName, metricData.unit);

        // Для давления особые настройки шкалы
        if (metric === 'pressure') {
          chart.options.scales.y.min = 50;
          chart.options.scales.y.max = 180;
        } else {
          delete chart.options.scales.y.min;
          delete chart.options.scales.y.max;
        }

        chart.update();

        // Подсвечиваем выбранную плитку
        document.querySelectorAll('.vital-tile').forEach(tile => {
          tile.classList.remove('selected');
        });
        document.querySelector(`[data-metric="${metric}"]`).classList.add('selected');
      });

      // Клик по плитке для выбора показателя
      document.querySelectorAll('.vital-tile').forEach(tile => {
        tile.addEventListener('click', function() {
          const metric = this.getAttribute('data-metric');
          document.getElementById('metricSelect').value = metric;
          document.getElementById('updateChartBtn').click();
        });
      });

      // Переключение периода (7/14 дней)
      document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          currentPeriod = parseInt(this.getAttribute('data-days'));
          document.querySelectorAll('.period-btn').forEach(b => {
            b.classList.remove('active');
          });
          this.classList.add('active');
          document.getElementById('updateChartBtn').click();
        });
      });

      // Инициализация графика при загрузке
      document.getElementById('updateChartBtn').click();

      // Управление модальными окнами
      function setupModal(buttonId, modalId) {
        const button = document.getElementById(buttonId);
        const modal = document.getElementById(modalId);
        const closeButtons = modal.querySelectorAll('.modal-close, .btn-cancel');

        button.addEventListener('click', () => {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        });

        closeButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
          });
        });

        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
          }
        });
      }

      // Настройка всех модальных окон
      setupModal('addRecordBtn', 'addRecordModal');
      setupModal('exportDataBtn', 'exportDataModal');
      setupModal('prescriptionBtn', 'prescriptionModal');
      setupModal('recipeBtn', 'recipeModal');
      setupModal('referralBtn', 'referralModal');
      setupModal('addAnalysisBtn', 'addAnalysisModal');
      setupModal('addAnalysisBtn2', 'addAnalysisModal');
      setupModal('addProcedureBtn', 'addProcedureModal');

      // Обработка отправки форм
      document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          const modal = this.closest('.modal-overlay');
          modal.classList.remove('active');
          document.body.style.overflow = '';

          // Здесь можно добавить обработку данных формы
          showNotification('Успех', 'Данные успешно сохранены', 'success');
        });
      });

      // Управление вкладками
      document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
          const tabId = this.getAttribute('data-tab');

          // Убираем активный класс у всех вкладок и контента
          document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
          document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

          // Добавляем активный класс текущей вкладке и соответствующему контенту
          this.classList.add('active');
          document.getElementById(`${tabId}-tab`).classList.add('active');
        });
      });

      // Установка текущей даты в формы по умолчанию
      function setCurrentDateToInputs() {
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];
        const dateTimeStr = today.toISOString().slice(0, 16);

        // Установка для формы добавления записи
        document.getElementById('recordDate').value = dateTimeStr;
      }

      setCurrentDateToInputs();
    })
  }
}
</script>



<style>

</style>