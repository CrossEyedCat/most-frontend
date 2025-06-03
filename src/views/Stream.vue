<template>
  <div class="theme-toggle theme-toggleStream" id="theme-toggle">
    <i class="fas fa-moon"></i>
  </div>

  <div class="title-animation">
    <div class="title-text">MOCT Poles-E</div>
    <div class="subtitle-text">Мониторинг жизненных показателей</div>
    <div class="loading-bar">
      <div class="loading-progress"></div>
    </div>
  </div>

  <div class="patient-info">
    <div class="patient-main">
      <div class="patient-avatar">
        <i class="fas fa-user"></i>
      </div>
      <div>
        <div class="patient-name">ИВАНОВ АЛЕКСЕЙ</div>
        <div class="patient-id">ID: P-7842-2023 | Отделение: Реанимация</div>
      </div>
    </div>

    <div class="current-time">
      <div id="current-time">00:00:00</div>
      <div class="current-date" id="current-date">1 января 2023</div>
    </div>

    <div class="patient-stats">
      <div class="stat-item">
        <div class="stat-value">42</div>
        <div class="stat-label">Возраст</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">178</div>
        <div class="stat-label">Рост (см)</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">82</div>
        <div class="stat-label">Вес (кг)</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">24.1</div>
        <div class="stat-label">ИМТ</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">A+</div>
        <div class="stat-label">Группа крови</div>
      </div>
    </div>

    <div class="log-status-container">
      <div class="log-menu-icon" id="log-menu-icon">
        <i class="fas fa-clipboard-list"></i>
        <div class="log-badge" id="log-badge" style="display: none;">0</div>
      </div>
    </div>
  </div>

  <div class="alarm-status alarm-normal" id="alarm-status">НОРМА</div>

  <div class="medical-menu">
    <div class="menu-item active">
      <i class="fas fa-heartbeat"></i>
      <div class="menu-tooltip">Мониторинг</div>
    </div>
    <div class="menu-item">
      <i class="fas fa-file-medical"></i>
      <div class="menu-tooltip">История болезни</div>
    </div>
    <div class="menu-item">
      <i class="fas fa-pills"></i>
      <div class="menu-tooltip">Лекарства</div>
    </div>
    <div class="menu-item">
      <i class="fas fa-procedures"></i>
      <div class="menu-tooltip">Процедуры</div>
    </div>
    <div class="menu-item">
      <i class="fas fa-chart-line"></i>
      <div class="menu-tooltip">Анализы</div>
    </div>
    <div class="menu-item">
      <i class="fas fa-bell"></i>
      <div class="menu-tooltip">Уведомления</div>
    </div>
  </div>

  <div class="dashboard">
    <!-- Первая строка: SpO2 | ЧСС | Назначения -->
    <div class="panel-row">
      <div class="panel">
        <div class="value-background normal-bg" id="spo2-bg"></div>
        <div class="panel-content">
          <div class="panel-header">
            <div>
              <span class="panel-title"><i class="panel-icon fas fa-lungs"></i> SpO₂</span>
              <span class="panel-unit">%</span>
            </div>
          </div>
          <div class="graph-container">
            <div class="y-axis">
              <span>100</span>
              <span>95</span>
              <span>90</span>
              <span>70</span>
            </div>
            <canvas id="spo2-chart"></canvas>
            <div class="graph-value normal" id="spo2-value">--</div>
            <div class="chart-time-scale" id="spo2-time-scale"></div>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="value-background normal-bg" id="hr-bg"></div>
        <div class="panel-content">
          <div class="panel-header">
            <div>
              <span class="panel-title"><i class="panel-icon fas fa-heart-pulse"></i> ЧСС</span>
              <span class="panel-unit">уд/мин</span>
            </div>
          </div>
          <div class="graph-container">
            <div class="y-axis">
              <span>180</span>
              <span>120</span>
              <span>60</span>
              <span>30</span>
            </div>
            <canvas id="hr-chart"></canvas>
            <div class="graph-value normal" id="hr-value">--</div>
            <div class="chart-time-scale" id="hr-time-scale"></div>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-content">
          <div class="panel-header">
            <span class="panel-title"><i class="panel-icon fas fa-clipboard-check"></i> Назначения</span>
            <button class="add-prescription-btn" id="add-prescription-btn">+ Добавить</button>
          </div>
          <div class="prescriptions-container" id="prescriptions-container">
            <!-- Назначения будут добавляться здесь -->
          </div>
        </div>
      </div>
    </div>

    <!-- Вторая строка: Температура | НИАД | Комментарии -->
    <div class="panel-row">
      <div class="panel">
        <div class="value-background normal-bg" id="temp-bg"></div>
        <div class="panel-content">
          <div class="panel-header">
            <div>
              <span class="panel-title"><i class="panel-icon fas fa-temperature-high"></i> Температура</span>
              <span class="panel-unit">°C</span>
            </div>
          </div>
          <div class="graph-container">
            <div class="y-axis">
              <span>42</span>
              <span>39</span>
              <span>37</span>
              <span>35</span>
            </div>
            <canvas id="temp-chart"></canvas>
            <div class="graph-value normal" id="temp-value">--</div>
            <div class="chart-time-scale" id="temp-time-scale"></div>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="value-background normal-bg" id="bp-bg"></div>
        <div class="panel-content">
          <div class="panel-header">
            <div>
              <span class="panel-title"><i class="panel-icon fas fa-heartbeat"></i> НИАД</span>
              <span class="panel-unit">мм рт.ст.</span>
            </div>
          </div>
          <div class="graph-container">
            <div class="y-axis">
              <span>180/120</span>
              <span>140/90</span>
              <span>100/60</span>
              <span>60/40</span>
            </div>
            <canvas id="bp-chart"></canvas>
            <div class="graph-value normal bp-value" id="bp-value">--/--</div>
            <div class="chart-time-scale" id="bp-time-scale"></div>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-content">
          <div class="panel-header">
            <span class="panel-title"><i class="panel-icon fas fa-comments"></i> Комментарии</span>
            <button class="add-comment-btn" id="add-comment-btn">+ Добавить</button>
          </div>
          <div class="comments-container" id="comments-container">
            <!-- Комментарии будут добавляться здесь -->
          </div>
        </div>
      </div>
    </div>

    <!-- Третья строка: Дыхание | Камеры | Подключённое оборудование -->
    <div class="panel-row">
      <div class="panel">
        <div class="value-background normal-bg" id="resp-bg"></div>
        <div class="panel-content">
          <div class="panel-header">
            <div>
              <span class="panel-title"><i class="panel-icon fas fa-wind"></i> Дыхание</span>
              <span class="panel-unit">дых/мин</span>
            </div>
          </div>
          <div class="graph-container">
            <div class="y-axis">
              <span>30</span>
              <span>20</span>
              <span>12</span>
              <span>5</span>
            </div>
            <canvas id="resp-chart"></canvas>
            <div class="graph-value normal" id="resp-value">--</div>
            <div class="chart-time-scale" id="resp-time-scale"></div>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-content">
          <div class="panel-header">
            <span class="panel-title"><i class="panel-icon fas fa-video"></i> Камера пациента</span>
            <div class="camera-selector">
              <div class="dropdown-container">
                <select id="department-select" class="modern-dropdown">
                  <option value="" disabled selected>Выберите отделение</option>
                  <option value="reanimation">Реанимация</option>
                  <option value="cardiology">Кардиология</option>
                  <option value="neurology">Неврология</option>
                  <option value="surgery">Хирургия</option>
                  <option value="therapy">Терапия</option>
                </select>
                <i class="fas fa-chevron-down dropdown-icon"></i>
              </div>

              <div class="dropdown-container">
                <select id="room-select" class="modern-dropdown" disabled>
                  <option value="" disabled selected>Сначала выберите отделение</option>
                </select>
                <i class="fas fa-chevron-down dropdown-icon"></i>
              </div>

              <div class="dropdown-container">
                <select id="bed-select" class="modern-dropdown" disabled>
                  <option value="" disabled selected>Сначала выберите палату</option>
                </select>
                <i class="fas fa-chevron-down dropdown-icon"></i>
              </div>
            </div>
          </div>
          <div class="cameras-grid">
            <div class="video-container">
              <video id="camera1" autoplay muted></video>
              <div id="status1" class="video-status offline">OFFLINE</div>
            </div>
            <div class="video-container">
              <video id="camera2" autoplay muted></video>
              <div id="status2" class="video-status offline">OFFLINE</div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-content">
          <div class="panel-header">
            <span class="panel-title"><i class="panel-icon fas fa-plug"></i> Подключённое оборудование</span>
            <button class="add-device-btn" id="add-device-btn">+ Добавить</button>
          </div>
          <div class="devices-grid" id="devices-grid">
            <!-- Устройства будут добавляться динамически -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="event-log-container" id="event-log-container">
    <div class="log-header">
      <i class="fas fa-clipboard-list"></i>
      Журнал событий
    </div>
    <div class="log-container" id="log-container">
      <div id="log-content"></div>
    </div>
  </div>

  <div id="add-device-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">Добавить новое оборудование</div>
        <span class="close-modal">&times;</span>
      </div>
      <form id="device-form">
        <div class="form-group">
          <label for="device-type">Тип устройства</label>
          <select id="device-type" required>
            <option value="">Выберите тип</option>
            <option value="ИВЛ">ИВЛ</option>
            <option value="Помпа">Инфузионная помпа</option>
            <option value="Монитор">Монитор пациента</option>
            <option value="Дефибриллятор">Дефибриллятор</option>
            <option value="Кровать">Кровать</option>
          </select>
        </div>
        <div class="form-group">
          <label for="device-ip">IP адрес</label>
          <input type="text" id="device-ip" placeholder="192.168.1.1" required>
        </div>
        <div class="form-group">
          <label for="device-serial">Серийный номер</label>
          <input type="text" id="device-serial" placeholder="SN-123456" required>
        </div>
        <button type="submit" class="submit-btn">Добавить оборудование</button>
      </form>
    </div>
  </div>

  <div id="comment-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">Добавить комментарий</div>
        <span class="close-modal">&times;</span>
      </div>
      <form id="comment-form">
        <div class="form-group">
          <label for="comment-author">Автор</label>
          <input type="text" id="comment-author" placeholder="Ваше имя" required>
        </div>
        <div class="form-group">
          <label for="comment-text">Комментарий</label>
          <textarea id="comment-text" rows="4" required></textarea>
        </div>
        <button type="submit" class="submit-btn">Добавить комментарий</button>
      </form>
    </div>
  </div>

  <div id="prescription-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">Добавить назначение</div>
        <span class="close-modal">&times;</span>
      </div>
      <form id="prescription-form">
        <div class="form-group">
          <label for="prescription-title">Название назначения</label>
          <input type="text" id="prescription-title" placeholder="Название назначения" required>
        </div>
        <div class="form-group">
          <label for="prescription-text">Описание</label>
          <textarea id="prescription-text" rows="4" placeholder="Описание назначения" required></textarea>
        </div>
        <div class="form-group">
          <label for="prescription-status">Статус</label>
          <select id="prescription-status" required>
            <option value="Активно">Активно</option>
            <option value="Запланировано">Запланировано</option>
            <option value="Выполнено">Выполнено</option>
          </select>
        </div>
        <div class="form-group">
          <label for="prescription-time">Время выполнения</label>
          <input type="text" id="prescription-time" placeholder="Время выполнения (например: 10:00, 12:00)">
        </div>
        <button type="submit" class="submit-btn">Сохранить назначение</button>
      </form>
    </div>
  </div>

  <div id="fullscreen-video" class="video-fullscreen">
    <div class="close-fullscreen">&times;</div>
    <video id="fullscreen-video-element" controls></video>
  </div>
</template>

<script>
import Hls from 'hls.js';
import {ref, computed, onMounted, reactive} from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';
export default {
  name: 'Stream',
  setup() {
    onMounted(() => {
// Переключение темы
    const themeToggle = document.getElementById('theme-toggle');
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
    }

    themeToggle.addEventListener('click', toggleTheme);

// Проверка сохраненной темы
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-theme');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }

    const indicators = {
      spo2: {value: 98, history: Array(60).fill(95), status: 'normal', critical: false, unit: '%'},
      hr: {value: 75, history: Array(60).fill(75), status: 'normal', critical: false, unit: 'уд/мин'},
      resp: {value: 16, history: Array(60).fill(16), status: 'normal', critical: false, unit: 'дых/мин'},
      bp: {
        sys: 120,
        dia: 80,
        sysHistory: Array(60).fill(120),
        diaHistory: Array(60).fill(80),
        status: 'normal',
        critical: false,
        unit: 'мм рт.ст.'
      },
      temp: {value: 36.6, history: Array(60).fill(36.6), status: 'normal', critical: false, unit: '°C'}
    };

    let devices = [
      {
        name: "Монитор пациента",
        icon: "fa-heart-pulse",
        connected: true,
        type: "Монитор",
        ip: "192.168.1.10",
        serial: "SN-MON-001"
      },
      {name: "ИВЛ", icon: "fa-lungs", connected: true, type: "ИВЛ", ip: "192.168.1.11", serial: "SN-VENT-001"},
      {
        name: "Инфузионная помпа",
        icon: "fa-syringe",
        connected: true,
        type: "Помпа",
        ip: "192.168.1.12",
        serial: "SN-PUMP-001"
      },
      {name: "Кровать", icon: "fa-bed", connected: true, type: "Кровать", ip: "192.168.1.13", serial: "SN-BED-001"}
    ];

    let comments = [
      {
        author: "Доктор Петрова",
        time: "10:45, 15.05.2023",
        text: "Пациент стабилен, показатели в норме. Продолжаем наблюдение."
      },
      {
        author: "Медсестра Иванова",
        time: "09:30, 15.05.2023",
        text: "Введены лекарства по схеме. Побочных эффектов не наблюдается."
      },
      {author: "Дежурный врач", time: "08:15, 15.05.2023", text: "Утренний осмотр. Состояние удовлетворительное."}
    ];

    let prescriptions = [
      {
        title: "Антибиотикотерапия",
        text: "Цефтриаксон 1.0 в/в капельно",
        status: "Активно",
        time: "10:00, 12:00, 18:00"
      },
      {title: "Обезболивание", text: "Трамадол 50 мг в/в при болях", status: "Активно", time: "По требованию"},
      {title: "ЭКГ", text: "Контрольная электрокардиография", status: "Выполнено", time: "08:00 ежедневно"},
      {title: "Анализы", text: "ОАК, ОАМ, биохимия крови", status: "Запланировано", time: "07:00 завтра"}
    ];

    let alertLog = [];
    let lastUpdateTime = new Date();
    let unreadCriticalCount = 0;
    let totalCriticalCount = 0;

    const charts = {
      spo2: initChart('spo2-chart', '#4285f4', 70, 100),
      hr: initChart('hr-chart', '#ea4335', 30, 180),
      resp: initChart('resp-chart', '#34a853', 5, 30),
      bp: initBPChart('bp-chart'),
      temp: initChart('temp-chart', '#fbbc05', 35, 42)
    };

    const deviceModal = document.getElementById('add-device-modal');
    const commentModal = document.getElementById('comment-modal');
    const prescriptionModal = document.getElementById('prescription-modal');
    const addDeviceBtn = document.getElementById('add-device-btn');
    const addCommentBtn = document.getElementById('add-comment-btn');
    const addPrescriptionBtn = document.getElementById('add-prescription-btn');
    const closeBtns = document.querySelectorAll('.close-modal');
    const deviceForm = document.getElementById('device-form');
    const commentForm = document.getElementById('comment-form');
    const prescriptionForm = document.getElementById('prescription-form');
    const prescriptionsContainer = document.getElementById('prescriptions-container');
    const commentsContainer = document.getElementById('comments-container');
    const fullscreenVideo = document.getElementById('fullscreen-video');
    const fullscreenVideoElement = document.getElementById('fullscreen-video-element');
    const closeFullscreenBtn = document.querySelector('.close-fullscreen');

// Хранилище для HLS-плееров
    const hlsPlayers = {
      camera1: null,
      camera2: null,
      fullscreen: null
    };

// Данные для выпадающих меню
    const departmentData = {
      reanimation: {
        name: "Реанимация",
        rooms: {
          "room-1": {name: "Палата 1", beds: ["Койка 1", "Койка 2", "Койка 3"]},
          "room-2": {name: "Палата 2", beds: ["Койка 1", "Койка 2"]},
          "room-3": {name: "Палата 3", beds: ["Койка 1"]}
        }
      },
      cardiology: {
        name: "Кардиология",
        rooms: {
          "room-101": {name: "Палата 101", beds: ["Койка 1", "Койка 2"]},
          "room-102": {name: "Палата 102", beds: ["Койка 1", "Койка 2", "Койка 3"]},
          "room-103": {name: "Палата 103", beds: ["Койка 1"]}
        }
      },
      neurology: {
        name: "Неврология",
        rooms: {
          "room-201": {name: "Палата 201", beds: ["Койка 1", "Койка 2"]},
          "room-202": {name: "Палата 202", beds: ["Койка 1"]}
        }
      },
      surgery: {
        name: "Хирургия",
        rooms: {
          "room-301": {name: "Палата 301", beds: ["Койка 1", "Койка 2", "Койка 3"]},
          "room-302": {name: "Палата 302", beds: ["Койка 1", "Койка 2"]}
        }
      },
      therapy: {
        name: "Терапия",
        rooms: {
          "room-401": {name: "Палата 401", beds: ["Койка 1", "Койка 2", "Койка 3", "Койка 4"]},
          "room-402": {name: "Палата 402", beds: ["Койка 1", "Койка 2"]}
        }
      }
    };

// Элементы выпадающих списков
    const departmentSelect = document.getElementById('department-select');
    const roomSelect = document.getElementById('room-select');
    const bedSelect = document.getElementById('bed-select');

// Обработчик изменения отделения
    departmentSelect.addEventListener('change', function () {
      const departmentId = this.value;
      const department = departmentData[departmentId];

      // Очищаем и деактивируем следующие списки
      roomSelect.innerHTML = '<option value="" disabled selected>Выберите палату</option>';
      bedSelect.innerHTML = '<option value="" disabled selected>Сначала выберите палату</option>';
      bedSelect.disabled = true;

      // Активируем выбор палаты
      roomSelect.disabled = false;

      // Заполняем список палат
      for (const roomId in department.rooms) {
        const room = department.rooms[roomId];
        const option = document.createElement('option');
        option.value = roomId;
        option.textContent = room.name;
        roomSelect.appendChild(option);
      }

      addToLog(new Date(), 'Камеры', `Выбрано отделение: ${department.name}`, 'normal');
    });

// Обработчик изменения палаты
    roomSelect.addEventListener('change', function () {
      const departmentId = departmentSelect.value;
      const roomId = this.value;
      const room = departmentData[departmentId].rooms[roomId];

      // Очищаем список коек
      bedSelect.innerHTML = '<option value="" disabled selected>Выберите койку</option>';

      // Активируем выбор койки
      bedSelect.disabled = false;

      // Заполняем список коек
      room.beds.forEach((bed, index) => {
        const option = document.createElement('option');
        option.value = `bed-${index + 1}`;
        option.textContent = bed;
        bedSelect.appendChild(option);
      });

      addToLog(new Date(), 'Камеры', `Выбрана палата: ${room.name}`, 'normal');
    });

// Обработчик изменения койки
    bedSelect.addEventListener('change', function () {
      const departmentId = departmentSelect.value;
      const roomId = roomSelect.value;
      const bedId = this.value;
      const bedName = this.options[this.selectedIndex].text;

      // Здесь можно добавить логику загрузки соответствующих камер
      // Например, активировать только камеры 1 и 2, остальные сделать неактивными

      addToLog(new Date(), 'Камеры',
          `Выбрана койка: ${bedName} (${departmentData[departmentId].name}, ${departmentData[departmentId].rooms[roomId].name})`,
          'normal');

      // Активируем только камеры 1 и 2 (пример)
      activateCameras(['camera1', 'camera2']);
    });

// Функция активации камер
    function activateCameras(activeCameraIds) {
      const allCameras = ['camera1', 'camera2', 'camera3', 'camera4']; // Пример списка всех камер

      allCameras.forEach(cameraId => {
        const videoElement = document.getElementById(cameraId);
        const statusElement = document.getElementById(`status${cameraId.slice(-1)}`);

        if (activeCameraIds.includes(cameraId)) {
          // Активируем камеру
          if (videoElement) {
            videoElement.style.opacity = '1';
            videoElement.style.filter = 'none';
            statusElement.style.display = 'block';

            // Здесь можно добавить логику подключения реального потока
            if (cameraId === 'camera1') {
              initPlayer('camera1', 'http://192.168.20.225/streams/camera1/stream.m3u8');
            } else if (cameraId === 'camera2') {
              initPlayer('camera2', 'http://192.168.20.225/streams/camera2/stream.m3u8');
            }
          }
        } else {
          // Деактивируем камеру
          if (videoElement) {
            videoElement.style.opacity = '0.5';
            videoElement.style.filter = 'grayscale(80%)';
            statusElement.style.display = 'none';

            // Останавливаем поток, если он был запущен
            if (hlsPlayers[cameraId]) {
              hlsPlayers[cameraId].destroy();
              hlsPlayers[cameraId] = null;
            }
          }
        }
      });
    }

// Инициализация IP камер
    function initPlayer(cameraId, streamUrl) {
      const video = document.getElementById(cameraId);
      const status = document.getElementById(`status${cameraId.slice(-1)}`);

      if (Hls.isSupported()) {
        // Удаляем старый плеер, если он есть
        if (hlsPlayers[cameraId]) {
          hlsPlayers[cameraId].destroy();
        }

        const hls = new Hls();
        hlsPlayers[cameraId] = hls;

        hls.loadSource(streamUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
          status.className = 'video-status online';
          status.textContent = 'LIVE';
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            status.className = 'video-status offline';
            status.textContent = 'ERROR';
            setTimeout(() => initPlayer(cameraId, streamUrl), 5000);
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = streamUrl;
        video.addEventListener('loadedmetadata', () => {
          video.play();
          status.className = 'video-status online';
          status.textContent = 'LIVE';
        });
      }
    }


      initPlayer('camera1', 'http://192.168.20.225/streams/camera1/stream.m3u8');
      initPlayer('camera2', 'http://192.168.20.225/streams/camera2/stream.m3u8');
      initDevices();
      updateComments();
      updatePrescriptions();
      updateCurrentTime();
      updateData();
      addToLog(new Date(), 'Система', 'Мониторинг жизненных показателей запущен', 'normal');

      // Запуск обновления данных каждые 2 секунды
      setInterval(updateData, 2000);
      setInterval(updateCurrentTime, 1000);


// Обработчики для полноэкранного просмотра камер
    document.querySelectorAll('.video-container video').forEach(video => {
      video.addEventListener('click', function () {
        const cameraId = this.id;
        const fullscreenVideo = document.getElementById('fullscreen-video-element');

        // Останавливаем текущее видео, если оно играет
        if (fullscreenVideo.src) {
          fullscreenVideo.pause();
          fullscreenVideo.src = '';
        }

        // Если используется HLS
        if (Hls.isSupported() && hlsPlayers[cameraId]) {
          // Удаляем старый полноэкранный плеер
          if (hlsPlayers.fullscreen) {
            hlsPlayers.fullscreen.destroy();
          }

          const hls = new Hls();
          hlsPlayers.fullscreen = hls;

          hls.loadSource(hlsPlayers[cameraId].url);
          hls.attachMedia(fullscreenVideo);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            fullscreenVideo.play();
          });
        } else {
          // Для браузеров с нативной поддержкой HLS
          fullscreenVideo.src = this.src;
        }

        document.getElementById('fullscreen-video').style.display = 'flex';
      });
    });

    closeFullscreenBtn.addEventListener('click', function () {
      const fullscreenVideo = document.getElementById('fullscreen-video-element');

      // Уничтожаем HLS-плеер для полноэкранного режима
      if (hlsPlayers.fullscreen) {
        hlsPlayers.fullscreen.destroy();
        hlsPlayers.fullscreen = null;
      }

      fullscreenVideo.pause();
      fullscreenVideo.src = '';
      document.getElementById('fullscreen-video').style.display = 'none';
    });

    function updateComments() {
      commentsContainer.innerHTML = '';

      comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
                    <div class="comment-header">
                        <span class="comment-author">${comment.author}</span>
                        <span class="comment-time">${comment.time}</span>
                    </div>
                    <div class="comment-text">${comment.text}</div>
                `;
        commentsContainer.appendChild(commentElement);
      });
    }

    function updatePrescriptions() {
      prescriptionsContainer.innerHTML = '';

      prescriptions.forEach(prescription => {
        const prescriptionElement = document.createElement('div');
        prescriptionElement.className = 'prescription';
        prescriptionElement.innerHTML = `
                    <div class="prescription-header">
                        <span class="prescription-title">${prescription.title}</span>
                        <span class="prescription-time">${prescription.time}</span>
                    </div>
                    <div class="prescription-text">${prescription.text}</div>
                    <span class="prescription-status">${prescription.status}</span>
                `;
        prescriptionsContainer.appendChild(prescriptionElement);
      });
    }

    function showPrescriptionForm() {
      prescriptionModal.style.display = 'block';
    }

    function savePrescription(e) {
      e.preventDefault();

      const title = document.getElementById('prescription-title').value;
      const text = document.getElementById('prescription-text').value;
      const status = document.getElementById('prescription-status').value;
      const time = document.getElementById('prescription-time').value || 'Постоянно';

      const newPrescription = {
        title: title,
        text: text,
        status: status,
        time: time
      };

      prescriptions.unshift(newPrescription);
      updatePrescriptions();
      addToLog(new Date(), 'Назначение', `Добавлено новое назначение: ${title}`, 'normal');

      prescriptionForm.reset();
      prescriptionModal.style.display = 'none';
    }

    addDeviceBtn.addEventListener('click', () => {
      if (devices.length >= 6) {
        alert('Максимальное количество устройств - 6');
        return;
      }
      deviceModal.style.display = 'block';
    });

    addCommentBtn.addEventListener('click', () => {
      commentModal.style.display = 'block';
    });

    addPrescriptionBtn.addEventListener('click', showPrescriptionForm);

    closeBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        this.closest('.modal').style.display = 'none';
      });
    });

    window.addEventListener('click', (e) => {
      if (e.target === deviceModal) {
        deviceModal.style.display = 'none';
      }
      if (e.target === commentModal) {
        commentModal.style.display = 'none';
      }
      if (e.target === prescriptionModal) {
        prescriptionModal.style.display = 'none';
      }
    });

    deviceForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const type = document.getElementById('device-type').value;
      const ip = document.getElementById('device-ip').value;
      const serial = document.getElementById('device-serial').value;

      let icon;
      switch (type) {
        case 'ИВЛ':
          icon = 'fa-lungs';
          break;
        case 'Помпа':
          icon = 'fa-syringe';
          break;
        case 'Монитор':
          icon = 'fa-heart-pulse';
          break;
        case 'Дефибриллятор':
          icon = 'fa-heart-crack';
          break;
        case 'Кровать':
          icon = 'fa-bed';
          break;
        default:
          icon = 'fa-circle-question';
      }

      const newDevice = {
        name: type === 'Помпа' ? 'Инфузионная помпа' : type,
        icon: icon,
        connected: true,
        type: type,
        ip: ip,
        serial: serial
      };

      devices.push(newDevice);
      initDevices();
      addToLog(new Date(), 'Оборудование', `Добавлено новое устройство: ${newDevice.name} (${ip})`, 'equipment');

      deviceForm.reset();
      deviceModal.style.display = 'none';
    });

    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const author = document.getElementById('comment-author').value;
      const text = document.getElementById('comment-text').value;
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }) + ', ' + now.toLocaleDateString();

      const newComment = {
        author: author,
        time: timeString,
        text: text
      };

      comments.unshift(newComment);
      updateComments();
      addToLog(now, 'Комментарий', `Добавлен новый комментарий от ${author}`, 'normal');

      commentForm.reset();
      commentModal.style.display = 'none';
    });

    prescriptionForm.addEventListener('submit', savePrescription);

    const logMenuIcon = document.getElementById('log-menu-icon');
    const eventLogContainer = document.getElementById('event-log-container');
    const logBadge = document.getElementById('log-badge');

    let logMenuTimeout;
    let isLogMenuOpen = false;

    logMenuIcon.addEventListener('mouseenter', () => {
      clearTimeout(logMenuTimeout);
      eventLogContainer.classList.add('visible');
      isLogMenuOpen = true;
      unreadCriticalCount = 0;
      updateLogBadge();
    });

    logMenuIcon.addEventListener('mouseleave', () => {
      logMenuTimeout = setTimeout(() => {
        if (!eventLogContainer.matches(':hover')) {
          eventLogContainer.classList.remove('visible');
          isLogMenuOpen = false;
        }
      }, 300);
    });

    eventLogContainer.addEventListener('mouseenter', () => {
      clearTimeout(logMenuTimeout);
    });

    eventLogContainer.addEventListener('mouseleave', () => {
      logMenuTimeout = setTimeout(() => {
        eventLogContainer.classList.remove('visible');
        isLogMenuOpen = false;
      }, 300);
    });

    function updateCurrentTime() {
      const now = new Date();
      const timeElement = document.getElementById('current-time');
      const dateElement = document.getElementById('current-date');

      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
      const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

      timeElement.textContent = `${hours}:${minutes}:${seconds}`;
      dateElement.textContent = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}, ${days[now.getDay()]}`;
    }

    function initDevices() {
      const grid = document.getElementById('devices-grid');
      grid.innerHTML = '';

      const deviceCount = devices.length;
      const minColumns = 2;
      const maxColumns = 4;
      const columns = Math.min(Math.max(minColumns, Math.ceil(Math.sqrt(deviceCount))), maxColumns);
      grid.style.gridTemplateColumns = `repeat(${columns}, minmax(120px, 1fr))`;

      devices.forEach((device, index) => {
        const deviceElement = document.createElement('div');
        deviceElement.className = `device-item ${device.connected ? '' : 'device-disabled'}`;
        deviceElement.innerHTML = `
                    <span class="remove-device" data-index="${index}" data-type="device">×</span>
                    <div class="device-icon-container">
                        <i class="device-icon fas ${device.icon}"></i>
                    </div>
                    <div class="device-info-container">
                        <div class="device-name">${device.name}</div>
                        <div class="device-details">
                            <span class="device-status ${device.connected ? 'connected' : 'disconnected'}">
                                ${device.connected ? 'Подключен' : 'Не подключен'}
                            </span>
                            <span class="device-ip">${device.ip}</span>
                            <span class="device-serial">${device.serial}</span>
                        </div>
                    </div>
                `;
        grid.appendChild(deviceElement);
      });

      document.querySelectorAll('.remove-device[data-type="device"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const index = parseInt(btn.getAttribute('data-index'));
          const device = devices[index];
          addToLog(new Date(), 'Оборудование', `Устройство удалено: ${device.name} (${device.ip})`, 'equipment');
          devices.splice(index, 1);
          initDevices();
        });
      });
    }

    function updateAlarmStatus() {
      const alarmElement = document.getElementById('alarm-status');
      let maxStatus = 'normal';
      let alarmMessage = 'НОРМА';
      const alarmMessages = [];

      if (indicators.hr.status === 'critical') {
        maxStatus = 'critical';
        alarmMessages.push(indicators.hr.value < 50 ? 'БРАДИКАРДИЯ' : 'ТАХИКАРДИЯ');
      }

      if (indicators.temp.status === 'critical') {
        maxStatus = 'critical';
        alarmMessages.push(indicators.temp.value < 35 ? 'ГИПОТЕРМИЯ' : 'ГИПЕРТЕРМИЯ');
      }

      if (indicators.resp.status === 'critical') {
        maxStatus = 'critical';
        alarmMessages.push(indicators.resp.value < 8 ? 'БРАДИПНОЭ' : 'ТАХИПНОЭ');
      }

      if (indicators.spo2.status === 'critical') {
        maxStatus = 'critical';
        alarmMessages.push('ГИПОКСИЯ');
      }

      if (indicators.bp.status === 'critical') {
        maxStatus = 'critical';
        alarmMessages.push(indicators.bp.sys < 90 ? 'ГИПОТОНИЯ' : 'ГИПЕРТОНИЯ');
      }

      if (maxStatus === 'normal') {
        if (indicators.hr.status === 'warning' ||
            indicators.temp.status === 'warning' ||
            indicators.resp.status === 'warning' ||
            indicators.spo2.status === 'warning' ||
            indicators.bp.status === 'warning') {
          maxStatus = 'warning';
          alarmMessage = 'ПРЕДУПРЕЖДЕНИЕ';
        }
      }

      if (alarmMessages.length > 0) {
        alarmMessage = alarmMessages.join(' + ');
      } else if (maxStatus === 'warning') {
        alarmMessage = 'ПРЕДУПРЕЖДЕНИЕ';
      }

      alarmElement.className = `alarm-status alarm-${maxStatus}`;
      alarmElement.textContent = alarmMessage;

      if (maxStatus !== 'normal') {
        totalCriticalCount++;
        if (!isLogMenuOpen) {
          unreadCriticalCount++;
          updateLogBadge();
        }
      }
    }

    function updateTimeScale() {
      const now = new Date();

      ['spo2', 'hr', 'resp', 'bp', 'temp'].forEach(id => {
        const timeScale = document.getElementById(`${id}-time-scale`);
        if (!timeScale) return;

        timeScale.innerHTML = '';

        for (let i = 0; i <= 5; i++) {
          const time = new Date(now);
          time.setMinutes(time.getMinutes() - (50 - i * 10));

          const marker = document.createElement('div');
          marker.className = 'time-marker';
          marker.textContent = time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

          if (i === 5) {
            marker.style.fontWeight = 'bold';
            marker.style.color = 'var(--text-primary)';
          }

          timeScale.appendChild(marker);
        }
      });

      lastUpdateTime = now;
    }

    function addToLog(time, parameter, message, type) {
      const logEntry = {
        time: time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'}),
        date: time.toLocaleDateString(),
        parameter: parameter,
        message: message,
        type: type
      };

      alertLog.push(logEntry);

      if (type !== 'normal') {
        totalCriticalCount++;
        if (!isLogMenuOpen) {
          unreadCriticalCount++;
        }
        updateLogBadge();
      }

      if (alertLog.length > 50) {
        const removed = alertLog.shift();
        if (removed.type !== 'normal') {
          totalCriticalCount--;
          if (!isLogMenuOpen || !eventLogContainer.classList.contains('visible')) {
            unreadCriticalCount--;
          }
          updateLogBadge();
        }
      }

      updateLogDisplay();
    }

    function updateLogBadge() {
      if (unreadCriticalCount > 0) {
        logBadge.style.display = 'flex';
        logBadge.textContent = unreadCriticalCount > 9 ? '9+' : unreadCriticalCount;
      } else {
        logBadge.style.display = 'none';
      }
    }

    function updateLogDisplay() {
      const logContent = document.getElementById('log-content');
      logContent.innerHTML = '';

      alertLog.slice().reverse().forEach(entry => {
        let icon;
        switch (entry.parameter) {
          case 'SpO₂':
            icon = 'fa-lungs';
            break;
          case 'ЧСС':
            icon = 'fa-heart-pulse';
            break;
          case 'Дыхание':
            icon = 'fa-wind';
            break;
          case 'Температура':
            icon = 'fa-temperature-high';
            break;
          case 'НИАД':
            icon = 'fa-heartbeat';
            break;
          case 'Оборудование':
            icon = 'fa-plug';
            break;
          case 'Камеры':
            icon = 'fa-video';
            break;
          case 'Система':
            icon = 'fa-cog';
            break;
          case 'Комментарий':
            icon = 'fa-comment';
            break;
          case 'Назначение':
            icon = 'fa-clipboard-check';
            break;
          default:
            icon = 'fa-info-circle';
        }

        const entryElement = document.createElement('div');
        entryElement.className = `log-entry ${entry.type}-log`;
        entryElement.innerHTML = `
                    <i class="log-icon fas ${icon}"></i>
                    <div class="log-content">
                        <div class="log-time">${entry.date} ${entry.time} (${entry.parameter})</div>
                        <div class="log-message">${entry.message}</div>
                    </div>
                `;

        logContent.appendChild(entryElement);
      });
    }

    function updateData() {
      const now = new Date();

      updateIndicator('spo2', 70, 100,
          v => v < 90 ? 'critical' : v < 95 ? 'warning' : 'normal',
          v => v < 90 ? `Критическое: ${v}% (Гипоксия)` :
              v < 95 ? `Предупреждение: ${v}%` : `Норма: ${v}%`,
          () => indicators.spo2.value = Math.max(70, Math.min(100, indicators.spo2.value + (Math.random() * 2 - 1)))
      );

      updateIndicator('hr', 30, 180,
          v => v < 50 || v > 120 ? 'critical' : v < 60 || v > 100 ? 'warning' : 'normal',
          v => v < 50 ? `Критическое: ${v} уд/мин (Брадикардия)` :
              v > 120 ? `Критическое: ${v} уд/мин (Тахикардия)` :
                  v < 60 ? `Предупреждение: ${v} уд/мин` :
                      v > 100 ? `Предупреждение: ${v} уд/мин` : `Норма: ${v} уд/мин`,
          () => indicators.hr.value = Math.max(30, Math.min(180, indicators.hr.value + (Math.random() * 4 - 2)))
      );

      updateIndicator('resp', 5, 30,
          v => v < 8 || v > 30 ? 'critical' : v < 12 || v > 20 ? 'warning' : 'normal',
          v => v < 8 ? `Критическое: ${v} дых/мин (Брадипноэ)` :
              v > 30 ? `Критическое: ${v} дых/мин (Тахипноэ)` :
                  v < 12 ? `Предупреждение: ${v} дых/мин` :
                      v > 20 ? `Предупреждение: ${v} дых/мин` : `Норма: ${v} дых/мин`,
          () => indicators.resp.value = Math.max(5, Math.min(30, indicators.resp.value + (Math.random() * 2 - 1)))
      );

      updateBP();

      updateIndicator('temp', 35, 42,
          v => v < 35 || v > 39 ? 'critical' : v < 36 || v > 37.4 ? 'warning' : 'normal',
          v => v < 35 ? `Критическое: ${v.toFixed(1)}°C (Гипотермия)` :
              v > 39 ? `Критическое: ${v.toFixed(1)}°C (Гипертермия)` :
                  v < 36 ? `Предупреждение: ${v.toFixed(1)}°C` :
                      v > 37.4 ? `Предупреждение: ${v.toFixed(1)}°C` : `Норма: ${v.toFixed(1)}°C`,
          () => indicators.temp.value = Math.max(35, Math.min(42, indicators.temp.value + (Math.random() * 0.2 - 0.1)))
      );

      updateTimeScale();
      updateAlarmStatus();
      updateDevices();
      updateCurrentTime();
    }

    function updateIndicator(id, min, max, getStatus, getMessage, updateValue) {
      const indicator = indicators[id];
      const oldStatus = indicator.status;

      updateValue();
      indicator.history.push(indicator.value);
      indicator.history.shift();

      charts[id].data.datasets[0].data = indicator.history;
      charts[id].update();

      indicator.status = getStatus(Math.round(indicator.value));
      indicator.critical = indicator.status === 'critical';

      if (oldStatus !== indicator.status) {
        addToLog(new Date(),
            document.querySelector(`#${id}-chart`).closest('.panel').querySelector('.panel-title').textContent,
            getMessage(Math.round(id === 'temp' ? indicator.value : indicator.value)),
            indicator.status
        );
      }

      updateDisplay(id);
    }

    function updateBP() {
      const oldStatus = indicators.bp.status;

      indicators.bp.sys = Math.max(70, Math.min(200, indicators.bp.sys + (Math.random() * 6 - 3)));
      indicators.bp.dia = Math.max(40, Math.min(120, indicators.bp.dia + (Math.random() * 4 - 2)));

      indicators.bp.sysHistory.push(indicators.bp.sys);
      indicators.bp.sysHistory.shift();
      indicators.bp.diaHistory.push(indicators.bp.dia);
      indicators.bp.diaHistory.shift();

      charts.bp.data.datasets[0].data = indicators.bp.sysHistory;
      charts.bp.data.datasets[1].data = indicators.bp.diaHistory;
      charts.bp.update();

      if (indicators.bp.sys < 90 || indicators.bp.dia < 60 || indicators.bp.sys > 160 || indicators.bp.dia > 100) {
        indicators.bp.status = 'critical';
      } else if (indicators.bp.sys < 100 || indicators.bp.dia < 65 || indicators.bp.sys > 140 || indicators.bp.dia > 90) {
        indicators.bp.status = 'warning';
      } else {
        indicators.bp.status = 'normal';
      }

      indicators.bp.critical = indicators.bp.status === 'critical';

      if (oldStatus !== indicators.bp.status) {
        let message;
        if (indicators.bp.status === 'critical') {
          if (indicators.bp.sys < 90 || indicators.bp.dia < 60) {
            message = `Критическое: ${Math.round(indicators.bp.sys)}/${Math.round(indicators.bp.dia)} (Гипотония)`;
          } else {
            message = `Критическое: ${Math.round(indicators.bp.sys)}/${Math.round(indicators.bp.dia)} (Гипертония)`;
          }
        } else if (indicators.bp.status === 'warning') {
          message = `Предупреждение: ${Math.round(indicators.bp.sys)}/${Math.round(indicators.bp.dia)}`;
        } else {
          message = `Норма: ${Math.round(indicators.bp.sys)}/${Math.round(indicators.bp.dia)}`;
        }

        addToLog(new Date(), 'НИАД', message, indicators.bp.status);
      }

      updateDisplay('bp');
    }

    function updateDisplay(id) {
      const indicator = indicators[id];
      const element = document.getElementById(`${id}-value`);
      const bgElement = document.getElementById(`${id}-bg`);

      if (id === 'bp') {
        element.textContent = `${Math.round(indicator.sys)}/${Math.round(indicator.dia)}`;
      } else {
        element.textContent = id === 'temp' ? indicator.value.toFixed(1) : Math.round(indicator.value);
      }

      element.className = `graph-value ${indicator.status} ${id === 'bp' ? 'bp-value' : ''}`;
      bgElement.className = `value-background ${indicator.status}-bg`;

      if (indicator.critical) {
        element.style.animation = 'none';
        void element.offsetWidth;
        element.style.animation = '';
      }
    }

    function initChart(id, color, min, max) {
      const ctx = document.getElementById(id).getContext('2d');
      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array(60).fill(''),
          datasets: [{
            data: Array(60).fill((min + max) / 2),
            borderColor: color,
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {legend: {display: false}, tooltip: {enabled: false}},
          scales: {
            x: {display: false},
            y: {
              display: false,
              min: min,
              max: max
            }
          }
        }
      });
    }

    function initBPChart(id) {
      const ctx = document.getElementById(id).getContext('2d');
      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array(60).fill(''),
          datasets: [
            {
              label: 'Систолическое',
              data: Array(60).fill(120),
              borderColor: '#8ab4f8',
              borderWidth: 2,
              fill: false,
              pointRadius: 0,
              tension: 0.1
            },
            {
              label: 'Диастолическое',
              data: Array(60).fill(80),
              borderColor: '#4285f4',
              borderWidth: 2,
              fill: false,
              pointRadius: 0,
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {legend: {display: false}, tooltip: {enabled: false}},
          scales: {
            x: {display: false},
            y: {
              display: false,
              min: 60,
              max: 180
            }
          }
        }
      });
    }

    function updateDevices() {
      // Случайное отключение/подключение устройств
      devices.forEach(device => {
        if (Math.random() < 0.01) { // 1% шанс на изменение состояния
          device.connected = !device.connected;
          addToLog(new Date(), 'Оборудование',
              `Устройство ${device.name} (${device.ip}) ${device.connected ? 'подключено' : 'отключено'}`,
              device.connected ? 'normal' : 'warning');
        }
      });

      initDevices();
    }
  })
}
}
</script>
<style>
:root {
  --panel-height: calc((100vh - 220px) / 3);
  --primary-color: #4285f4;
  --primary-light: #8ab4f8;
  --primary-dark: #3367d6;
  --secondary-color: #34a853;
  --warning-color: #fbbc05;
  --danger-color: #ea4335;
  --text-primary: #202124;
  --text-secondary: #5f6368;
  --bg-color: #f8f9fa;
  --panel-bg: #ffffff;
  --border-color: #dadce0;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --hover-color: #f1f3f4;
  --disabled-color: #f1f3f4;
}

.dark-theme {
  --primary-color: #8ab4f8;
  --primary-light: #3367d6;
  --primary-dark: #4285f4;
  --secondary-color: #81c995;
  --warning-color: #f9ab00;
  --danger-color: #f28b82;
  --text-primary: #e8eaed;
  --text-secondary: #9aa0a6;
  --bg-color: #202124;
  --panel-bg: #292a2d;
  --border-color: #3c4043;
  --shadow-color: rgba(0, 0, 0, 0.3);
  --hover-color: #3c4043;
  --disabled-color: #3c4043;
}

body {
  font-family: 'Roboto', 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  transition: background-color 0.3s, color 0.3s;
}

.theme-toggle:hover {
  transform: scale(1.1);
}

.theme-toggle i {
  font-size: 24px;
  color: var(--text-primary);
}
.theme-toggleStream {
  top: 25px;
  right: 20px;
}
.patient-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background-color: var(--panel-bg);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
  position: relative;
  box-shadow: 0 2px 5px var(--shadow-color);
}

.patient-main {
  display: flex;
  align-items: center;
}

.patient-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  font-size: 24px;
  color: white;
  border: 2px solid var(--primary-dark);
}

.patient-name {
  font-size: 22px;
  font-weight: bold;
  color: var(--text-primary);
}

.patient-id {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 5px;
}

.patient-stats {
  display: flex;
  gap: 30px;
  margin-right: 60px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: var(--primary-color);
}

.stat-label {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 5px;
  text-transform: uppercase;
}

.current-time {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  color: var(--primary-color);
  text-align: center;
  z-index: 10;
}

#current-time {
  font-size: 32px;
}

.current-date {
  font-size: 16px;
  color: var(--text-secondary);
  margin-top: 5px;
}

.medical-menu {
  position: fixed;
  left: 20px;
  bottom: 420px;
  background-color: var(--panel-bg);
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 4px 20px var(--shadow-color);
  border: 1px solid var(--border-color);
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  background-color: transparent;
}

.menu-item:hover {
  background-color: var(--hover-color);
  transform: scale(1.1);
}

.menu-item i {
  font-size: 24px;
  color: var(--text-secondary);
}

.menu-item.active {
  background-color: rgba(66, 133, 244, 0.1);
  border: 1px solid var(--primary-color);
}

.menu-item.active i {
  color: var(--primary-color);
}

.menu-tooltip {
  position: absolute;
  left: 60px;
  white-space: nowrap;
  background-color: var(--panel-bg);
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 14px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  box-shadow: 0 2px 5px var(--shadow-color);
}

.menu-item:hover .menu-tooltip {
  opacity: 1;
}

.alarm-status {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 12px;
  background-color: var(--panel-bg);
  animation: pulse 2s infinite;
  text-transform: uppercase;
  min-height: 40px;
  flex-shrink: 0;
  position: relative;
  box-shadow: 0 2px 5px var(--shadow-color);
  border: 1px solid var(--border-color);
}

.alarm-normal {
  color: var(--secondary-color);
  border-color: var(--secondary-color);
}

.alarm-warning {
  color: var(--warning-color);
  border-color: var(--warning-color);
  animation: pulse-warning 2s infinite;
}

.alarm-critical {
  color: var(--danger-color);
  border-color: var(--danger-color);
  animation: pulse-critical 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.02); opacity: 1; }
}

@keyframes pulse-warning {
  0%, 100% { transform: scale(1); opacity: 0.9; background-color: rgba(251, 188, 5, 0.1); }
  50% { transform: scale(1.02); opacity: 1; background-color: rgba(251, 188, 5, 0.2); }
}

@keyframes pulse-critical {
  0%, 100% { transform: scale(1); opacity: 0.9; background-color: rgba(234, 67, 53, 0.1); }
  50% { transform: scale(1.02); opacity: 1; background-color: rgba(234, 67, 53, 0.2); }
}

.dashboard {
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  margin-left: 100px;
  padding-right: 20px;
}

.panel-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  height: var(--panel-height);
  min-height: 0;
}

.panel {
  background-color: var(--panel-bg);
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 20px var(--shadow-color);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
  transition: background-color 0.3s, border-color 0.3s;
}

.panel::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
      linear-gradient(var(--border-color) 1px, transparent 1px),
      linear-gradient(90deg, var(--border-color) 1px, transparent 1px);
  background-size: 8px 8px;
  opacity: 0.1;
  z-index: 0;
}

.panel-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-shrink: 0;
}

.panel-title {
  font-size: 16px;
  font-weight: bold;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
}

.panel-icon {
  margin-right: 8px;
  font-size: 18px;
}

.panel-unit {
  font-size: 12px;
  color: var(--text-secondary);
  margin-left: 5px;
}

.graph-container {
  height: 100%;
  position: relative;
  min-height: 0;
}

.graph-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 200px;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0,0,0,0.1);
  opacity: 0.8;
  z-index: 2;
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
}

.bp-value {
  font-size: 136px !important;
}

.value-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  opacity: 0.2;
  z-index: 1;
  transition: all 0.5s ease;
}

.y-axis {
  position: absolute;
  left: 5px;
  top: 0;
  bottom: 0;
  width: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 10px;
  color: var(--text-secondary);
  z-index: 3;
}

.chart-time-scale {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 35px;
  font-size: 9px;
  color: var(--text-secondary);
  z-index: 3;
}

.time-marker {
  flex: 1;
  text-align: center;
}

.normal {
  color: var(--secondary-color);
}
.normal-bg {
  background-color: rgba(52, 168, 83, 0.2);
}

.warning {
  color: var(--warning-color);
}
.warning-bg {
  background-color: rgba(251, 188, 5, 0.2);
}
.critical-bg {
  background-color: rgba(234, 67, 53, 0.2);
  animation: blink-bg 1s infinite;
}

@keyframes pulse-critical-panel {
  0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
}

@keyframes blink-bg {
  0% { opacity: 0.2; }
  50% { opacity: 0.1; }
  100% { opacity: 0.2; }
}

.devices-grid {
  display: grid;
  gap: 10px;
  height: 100%;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-auto-rows: minmax(60px, 1fr);
}

.device-item {
  display: flex;
  align-items: center;
  background-color: var(--hover-color);
  border-radius: 8px;
  padding: 8px;
  position: relative;
  transition: all 0.3s;
  cursor: pointer;
  height: 60px;
  border: 1px solid var(--border-color);
}

.device-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  background-color: rgba(66, 133, 244, 0.1);
  border-radius: 8px;
}

.device-icon {
  font-size: 24px;
  color: var(--primary-color);
}

.device-info-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.device-name {
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
  color: var(--text-primary);
}

.device-details {
  display: flex;
  flex-wrap: wrap;
  font-size: 11px;
  color: var(--text-secondary);
}

.device-status {
  font-weight: bold;
  margin-right: 8px;
}

.device-ip {
  margin-right: 8px;
}

.connected {
  color: var(--secondary-color);
}

.disconnected {
  color: var(--danger-color);
}

.device-disabled {
  opacity: 0.5;
}

.remove-device {
  position: absolute;
  top: 5px;
  right: 5px;
  color: var(--danger-color);
  cursor: pointer;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.3s;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.device-item:hover .remove-device {
  opacity: 1;
}

.add-device-btn, .add-comment-btn, .add-prescription-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  font-size: 14px;
}

.add-device-btn:hover, .add-comment-btn:hover, .add-prescription-btn:hover {
  background-color: var(--primary-dark);
}

.modal {
  display: none;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
}

.modal-content {
  background-color: var(--panel-bg);
  margin: 10% auto;
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 20px var(--shadow-color);
  transition: background-color 0.3s, border-color 0.3s;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
}

.close-modal {
  font-size: 24px;
  cursor: pointer;
  color: var(--text-secondary);
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: var(--text-secondary);
}

.form-group input, .form-group select, .form-group textarea {
  width: 100%;
  padding: 8px 8px 8px 40px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-primary);
  box-sizing: border-box;
  height: 36px;
  transition: all 0.3s;
}

.form-group textarea {
  height: auto;
  min-height: 100px;
}

.form-group select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%235f6368'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  padding-right: 30px;
}

.submit-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: var(--primary-dark);
}

.log-menu-icon {
  background-color: var(--panel-bg);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 5px var(--shadow-color);
  transition: all 0.3s;
  position: relative;
  z-index: 100;
}

.log-menu-icon i {
  font-size: 24px;
  color: var(--text-secondary);
}

.log-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--danger-color);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.event-log-container {
  position: fixed;
  right: 20px;
  top: 130px;
  width: 350px;
  max-height: calc(100vh - 150px);
  background-color: var(--panel-bg);
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 20px var(--shadow-color);
  border: 1px solid var(--border-color);
  display: none;
  flex-direction: column;
  z-index: 100;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s, transform 0.3s;
}

.event-log-container.visible {
  display: flex;
  opacity: 1;
  transform: translateY(0);
}

.log-header {
  font-size: 16px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
}

.log-header i {
  margin-right: 10px;
  color: var(--text-secondary);
}

.log-container {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--border-color) var(--panel-bg);
}

.log-container::-webkit-scrollbar {
  width: 6px;
}

.log-container::-webkit-scrollbar-track {
  background: var(--panel-bg);
}

.log-container::-webkit-scrollbar-thumb {
  background-color: var(--border-color);
  border-radius: 3px;
}

.log-entry {
  padding: 8px;
  margin-bottom: 6px;
  border-radius: 5px;
  background-color: var(--hover-color);
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  font-size: 12px;
  color: var(--text-primary);
  display: flex;
  align-items: flex-start;
}

.log-entry:hover {
  background-color: var(--disabled-color);
}

.log-icon {
  margin-right: 8px;
  font-size: 14px;
  flex-shrink: 0;
  margin-top: 2px;
}

.log-content {
  flex: 1;
}

.log-time {
  font-size: 10px;
  color: var(--text-secondary);
  margin-bottom: 2px;
}

.log-message {
  font-size: 12px;
}

.critical-log {
  border-left-color: var(--danger-color);
}

.warning-log {
  border-left-color: var(--warning-color);
}

.normal-log {
  border-left-color: var(--secondary-color);
}

.equipment-log {
  border-left-color: var(--primary-color);
}

.critical-log .log-icon {
  color: var(--danger-color);
}

.warning-log .log-icon {
  color: var(--warning-color);
}

.normal-log .log-icon {
  color: var(--secondary-color);
}

.equipment-log .log-icon {
  color: var(--primary-color);
}

.title-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.95);
  z-index: 1000;
  animation: fadeOut 2.5s ease-in-out forwards;
  animation-delay: 2s;
}

.title-text {
  font-size: 72px;
  font-weight: bold;
  color: var(--secondary-color);
  text-transform: uppercase;
  letter-spacing: 4px;
  opacity: 0;
  animation: fadeInScale 1.5s ease-out forwards;
  text-shadow: 0 0 20px rgba(52, 168, 83, 0.7);
  margin-bottom: 30px;
}

.subtitle-text {
  font-size: 24px;
  color: #b0b0b0;
  opacity: 0;
  animation: fadeIn 1.5s ease-out forwards;
  animation-delay: 0.7s;
  letter-spacing: 2px;
}

.loading-bar {
  width: 300px;
  height: 4px;
  background-color: rgba(255,255,255,0.1);
  border-radius: 2px;
  margin-top: 30px;
  overflow: hidden;
  opacity: 0;
  animation: fadeIn 1s ease-out forwards;
  animation-delay: 1s;
}

.loading-progress {
  height: 100%;
  width: 0;
  background-color: var(--secondary-color);
  animation: loading 3s ease-in-out forwards;
}

@keyframes fadeInScale {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; visibility: hidden; }
}

@keyframes loading {
  from { width: 0; }
  to { width: 100%; }
}

.log-status-container {
  position: absolute;
  right: 20px;
  top: 105px;
  z-index: 100;
}

/* Стили для IP камер */
.video-container {
  position: relative;
  width: 100%;
  height: calc(var(--panel-height) - 100px);
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid var(--border-color);
}

.video-container:hover {
  box-shadow: 0 0 10px rgba(66, 133, 244, 0.3);
}

.video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-status {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  font-size: 12px;
  background-color: rgba(0,0,0,0.7);
}

.video-status.online {
  background-color: rgba(52, 168, 83, 0.7);
}

.video-status.offline {
  background-color: rgba(234, 67, 53, 0.7);
}

.cameras-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  height: calc(100% - 40px);
}

/* Стили для полноэкранного просмотра камер */
.video-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
}

.video-fullscreen video {
  width: 90%;
  height: 90%;
  object-fit: contain;
}

.close-fullscreen {
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  font-size: 30px;
  cursor: pointer;
  background: rgba(0,0,0,0.5);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Стили для комментариев */
.comments-container {
  padding: 15px;
  background-color: var(--hover-color);
  border-radius: 8px;
  height: calc(100% - 40px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.comment {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 12px;
  color: var(--text-secondary);
}

.comment-author {
  font-weight: bold;
  color: var(--primary-color);
}

.comment-time {
  color: var(--text-secondary);
}

.comment-text {
  font-size: 14px;
  color: var(--text-primary);
}

/* Стили для назначений */
.prescriptions-container {
  padding: 15px;
  background-color: var(--hover-color);
  border-radius: 8px;
  height: calc(100% - 40px);
  overflow-y: auto;
}

.prescription {
  margin-bottom: 10px;
  padding: 10px;
  background-color: var(--panel-bg);
  border-radius: 6px;
  border-left: 3px solid var(--primary-color);
}

.prescription-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.prescription-title {
  font-weight: bold;
  color: var(--primary-color);
  font-size: 14px;
}

.prescription-time {
  font-size: 12px;
  color: var(--text-secondary);
}

.prescription-text {
  font-size: 13px;
  margin-bottom: 5px;
  color: var(--text-primary);
}

.prescription-status {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 3px;
  background-color: rgba(52, 168, 83, 0.1);
  color: var(--secondary-color);
}

/* Стили для выпадающих меню камер */
.camera-selector {
  display: flex;
  gap: 10px;
  align-items: center;
}

.dropdown-container {
  position: relative;
  min-width: 160px;
}

.modern-dropdown {
  appearance: none;
  background-color: var(--panel-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 8px 35px 8px 15px;
  font-size: 14px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  box-shadow: 0 2px 5px var(--shadow-color);
}

.modern-dropdown:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
}

.modern-dropdown:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.dropdown-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-secondary);
  font-size: 12px;
  transition: transform 0.2s;
}

.modern-dropdown:focus + .dropdown-icon {
  transform: translateY(-50%) rotate(180deg);
}

/* Адаптация для FHD */
@media (min-width: 1920px) {
  :root {
    --panel-height: calc((100vh - 250px) / 3);
  }

  .panel {
    padding: 20px;
  }

  .panel-title {
    font-size: 18px;
  }

  .panel-icon {
    font-size: 20px;
  }

  .graph-value {
    font-size: 220px;
  }

  .bp-value {
    font-size: 150px !important;
  }

  .video-container {
    height: calc(var(--panel-height) - 120px);
  }
}
</style>