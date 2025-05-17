<template>
  <!-- Theme Toggle -->
  <div class="theme-toggle" @click="toggleTheme">
    <i :class="themeIcon"></i>
  </div>

  <!-- Sidebar Navigation -->
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

  <!-- Main Content -->
  <div class="main-content">
    <!-- Header -->
    <div class="header">
      <h1 class="hospital-title">
        <img src="@/assets/img/logo.png" alt="Логотип" class="logo" />
        <span>Пациенты отделения</span>
      </h1>
      <div class="user-profile">
        <div class="user-icon"><i class="fas fa-user-md"></i></div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-container">
      <div class="stat-card">
        <div class="stat-value">{{ totalPatients }}</div>
        <div class="stat-label">Всего пациентов</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ redPatients }}</div>
        <div class="stat-label">Красная зона</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ yellowPatients }}</div>
        <div class="stat-label">Жёлтая зона</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ greenPatients }}</div>
        <div class="stat-label">Зелёная зона</div>
      </div>
    </div>

    <!-- Patients List Section -->
    <div class="patients-container">
      <div class="section-title-container">
        <div class="section-title"><i class="fas fa-users"></i><span>Список пациентов</span></div>
        <button class="add-patient-btn" @click="onAddPatient">
          <i class="fas fa-plus"></i><span>Добавить пациента</span>
        </button>
      </div>

      <!-- Filters -->
      <div class="filters-container">
        <div class="filter-group">
          <label class="filter-label">Триаж</label>
          <select v-model="statusFilter" @change="filterPatients">
            <option value="all">Все</option>
            <option value="red">Красный</option>
            <option value="yellow">Жёлтый</option>
            <option value="green">Зелёный</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Палата</label>
          <select v-model="roomFilter" @change="filterPatients">
            <option value="all">Все</option>
            <option v-for="n in 8" :key="n" :value="n">Палата {{ n }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Сортировка</label>
          <select v-model="sortFilter" @change="filterPatients">
            <option value="name-asc">По имени (А-Я)</option>
            <option value="name-desc">По имени (Я-А)</option>
            <option value="status">По триажу</option>
            <option value="room">По палате</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Поиск пациента</label>
          <input type="text" v-model="searchFilter" @input="filterPatients" placeholder="ФИО, PID..." />
        </div>
      </div>

      <div class="critical-patients">
        <i class="fas fa-exclamation-triangle"></i>
        <div>
          <span class="critical-count" id="critical-count">{{Object.keys(alarmSummary).length}}</span>
          <span>пациента в красной зоне</span>
        </div>
      </div>

      <!-- Patients Table -->
      <table class="patients-table">
        <thead>
        <tr>
          <th>PID</th><th>ФИО</th><th>Возраст</th><th>Пол</th>
<!--          <th>Триаж</th>--><th>QR-code</th><th>Палата</th>
          <th>Койка</th><th>Дата поступления</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="patient in patients" :key="patient.pid" @click="showNotification(patient)"  :class="getRowClass(patient)">
          <td>{{ patient.id }}</td>
          <td>{{ patient.fullName }}</td>
          <td>{{ patient.age }}</td>
          <td>{{ patient.gender }}</td>
<!--          <td><span :class="['status-badge', statusMap[patient.status].badge]">
                  {{ statusMap[patient.status].label }}
                </span>
          </td>-->
          <td><div class="qr-code"><i class="fas fa-qrcode"></i></div></td>
          <td>{{ patient.room }}</td>
          <td>{{ patient.bed }}</td>
          <td>{{ patient.admission }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Metrics Charts -->
    <div class="metrics-container">
      <div class="metric-card">
        <div class="metric-title">
          <i class="fas fa-bed"></i>
          <span>Койко-мест</span>
        </div>
        <div class="chart-container">
          <canvas id="beds-chart"></canvas>
        </div>
        <div class="metric-value" id="beds-value"></div>
        <div class="metric-details" id="beds-details"></div>
      </div>

      <div class="metric-card">
        <div class="metric-title">
          <i class="fas fa-user-md"></i>
          <span>Задействованный персонал</span>
        </div>
        <div class="chart-container">
          <canvas id="staff-chart"></canvas>
        </div>
        <div class="metric-value" id="staff-value"></div>
        <div class="metric-details" id="staff-details"></div>
      </div>

      <div class="metric-card">
        <div class="metric-title">
          <i class="fas fa-heartbeat"></i>
          <span>Использованное оборудование</span>
        </div>
        <div class="chart-container">
          <canvas id="equipment-chart"></canvas>
        </div>
        <div class="metric-value" id="equipment-value"></div>
        <div class="metric-details" id="equipment-details"></div>
      </div>

      <div class="metric-card">
        <div class="metric-title">
          <i class="fas fa-procedures"></i>
          <span>Среднее время пребывания</span>
        </div>
        <div class="chart-container">
          <canvas id="time-chart"></canvas>
        </div>
        <div class="metric-value" id="time-value"></div>
        <div class="metric-details" id="time-details"></div>
      </div>
    </div>

    <!-- Map Container -->
    <div class="map-container" :class="{ active: mapActive }">
      <div class="map-header">
        <span>Карта отделения</span>
        <i class="fas fa-times" @click="toggleMap"></i>
      </div>
      <div class="map-content">
        <i class="fas fa-map-marked-alt"></i><p>План 3 этажа</p>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, computed, onMounted, reactive} from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';
export default {
  name: 'Patients',
  setup() {

    document.addEventListener('DOMContentLoaded', () => {
      if (window.location.pathname.includes('/patients')) {
        document.body.classList.add('patients-page');
      }
    });
    const alarmSummary = reactive({}) // { [pid]: { count: Number, highest: 'PH'|'PM'|'PL' } }
    const statusFilter = ref('all');
    const roomFilter = ref('all');
    const sortFilter = ref('name-asc');
    const searchFilter = ref('');
    const mapActive = ref(false);

    const patients = ref([]);
    const archivedPatients = ref([]);
    const qrVisible = ref(false);
    const selectedRow = ref(null);
    // утилита для расчёта возраста по дате рождения
    const alarms = ref([])
    function calcAge(birthDate) {
      const diff = Date.now() - new Date(birthDate).getTime()
      const ageDt = new Date(diff)
      return Math.abs(ageDt.getUTCFullYear() - 1970)
    }
    const fetchLivePatients = async (pointOfCare = null) => {
      try {
        const url = pointOfCare
            ? `/api/live/patients?pointOfCare=${pointOfCare}`
            : '/api/live/patients';
        const { data } = await axios.get(url);
        console.log(data);
        // «распаковываем» ответ и делаем более удобный объект
        patients.value = data.map(item => ({
          id:             item.patient.id,
          familyName:     item.patient.familyName,
          givenName:      item.patient.givenName,
          middleName:     item.patient.middleName,
          fullName:       `${item.patient.familyName} ${item.patient.givenName} ${item.patient.middleName}`.trim(),
          birthDate:      item.patient.birthDate,
          age:            calcAge(item.patient.birthDate),
          idPatientMis:   item.patient.idPatientMis,
          room:           item.place.room,
          bed:            item.place.bed,
          pointOfCare:    item.place.pointOfCare,
          mapId:          item.place.mapId,
          visitId:        item.visitId,
          pmId:           item.pmId
        }))
      } catch (err) {
        console.error('Ошибка загрузки живых пациентов:', err);
      }
    };

    const fetchArchivedPatients = async () => {
      try {
        const { data } = await axios.get('/api/archive/patients');
        archivedPatients.value = data;
      } catch (err) {
        console.error('Ошибка загрузки архива пациентов:', err);
      }
    };

    const statusMap = {
      red: { label: 'Красный (неотложный)', badge: 'status-critical', order: 1 },
      yellow: { label: 'Жёлтый (срочный)', badge: 'status-moderate', order: 2 },
      green: { label: 'Зелёный (плановый)', badge: 'status-stable', order: 3 }
    };
    // Генерация случайных данных для диаграмм
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // Generate random patient



    function createSemiCircleChart(ctx, value, max, color, label) {
      return new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [label, 'Свободно'],
          datasets: [{
            data: [value, max-value],
            backgroundColor: [
              hexToRgba(color, 0.2),
              document.body.classList.contains('dark-theme') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            ],
            borderWidth: 0
          }]
        },
        options: {
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          },
          responsive: true,
          maintainAspectRatio: false,
          circumference: 180,
          rotation: -90,
          cutout: '60%',
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      });
    }

    // Создание полукруглого графика для времени пребывания
    function createSemiCircleTimeChart(ctx, value, color) {
      return new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Среднее время', ''],
          datasets: [{
            data: [value, 14-value],
            backgroundColor: [
              hexToRgba(color, 0.8),
              document.body.classList.contains('dark-theme') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            ],
            borderWidth: 0
          }]
        },
        options: {
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          },
          responsive: true,
          maintainAspectRatio: false,
          circumference: 180,
          rotation: -90,
          cutout: '60%',
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      });
    }


    // Notification
    function showNotification(patient) {
      // implement DOM notification as in original
    }

    function toggleTheme() {
      document.body.classList.toggle('dark-theme');
      localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    }
    const themeIcon = computed(() => document.body.classList.contains('dark-theme') ? 'fas fa-sun' : 'fas fa-moon');
    function hexToRgba(hex, opacity) {
      hex = hex.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    function toggleMap() {
      mapActive.value = !mapActive.value;
    }
    let ws
    function connectAlarmsWs() {
      const url = `/websocket/live/alarms?pointOfCare=PIT`
      ws = new WebSocket(url)
      ws.onopen = () => console.log('Alarm WS connected')
      ws.onmessage = evt => {
        try {
          const alarm = JSON.parse(evt.data)
          alarms.value.push(alarm)

          const pid = alarm.pid
          const prior = alarm.priority   // 'PH' | 'PM' | 'PL'
          if (!alarmSummary[pid]) {
            alarmSummary[pid] = { count: 0, highest: prior }
          }
          alarmSummary[pid].count++
          const rank = { PL:1, PM:2, PH:3 }
          if (rank[prior] > rank[alarmSummary[pid].highest]) {
            alarmSummary[pid].highest = prior
          }
          console.log('New alarm:', alarm, alarmSummary)
        } catch (e) {
          console.error('Не удалось распарсить сообщение тревоги', e)
        }
      }
      ws.onerror = err => console.error('Alarm WS error', err)
      ws.onclose = () => console.log('Alarm WS closed')
    }
    function getRowClass(patient) {

      console.log("pid ", patient.id, alarmSummary[patient.id], patient);
      const alarms = alarmSummary[patient.id] || []
      console.log(alarms.highest)
      // если хотя бы одна — PH (красная)
      if (alarms.highest === 'PH') {
        return "row-high"
      }
      // иначе, если хотя бы одна — PM (жёлтая)
      if (alarms.highest === 'PM') {
        return "row-medium"
      }
      // иначе, если PL (лёгкая) — можно сделать свой класс
      if (alarms.highest === 'PL') {
        return "row-low"
      }
      return ''
    }
    // Initialize charts and data
    onMounted(async () => {
      connectAlarmsWs()
      // Данные для диаграмм
      const bedsUsed = Math.floor(Math.random() * 125) + 1;
      const staffUsed = Math.floor(Math.random() * 45) + 1;
      const equipmentUsed = Math.floor(Math.random() * 25) + 1;
      const avgStayTime = getRandomInt(3, 14);
      const freeBeds = 125 - bedsUsed;
      const freeStaff = 45 - staffUsed;
      const freeEquipment = 25 - equipmentUsed;
      const criticalPatients = 5;
      // Обновление счетчиков
      document.getElementById('beds-value').textContent = `${bedsUsed} из 125 (${Math.round(bedsUsed / 125 * 100)}%)`;
      document.getElementById('staff-value').textContent = `${staffUsed} из 45 (${Math.round(staffUsed / 45 * 100)}%)`;
      document.getElementById('equipment-value').textContent = `${equipmentUsed} из 25 (${Math.round(equipmentUsed / 25 * 100)}%)`;
      document.getElementById('time-value').textContent = `${avgStayTime} дней`;

      const bedsCtx = document.getElementById('beds-chart').getContext('2d');
      const staffCtx = document.getElementById('staff-chart').getContext('2d');
      const equipmentCtx = document.getElementById('equipment-chart').getContext('2d');
      const timeCtx = document.getElementById('time-chart').getContext('2d');

      // Удаляем старые графики, если они существуют
      if (window.bedsChart) window.bedsChart.destroy();
      if (window.staffChart) window.staffChart.destroy();
      if (window.equipmentChart) window.equipmentChart.destroy();
      if (window.timeChart) window.timeChart.destroy();

      // Создаем полукруглые диаграммы
      window.bedsChart = createSemiCircleChart(bedsCtx, bedsUsed, 125, document.body.classList.contains('dark-theme') ? '#69f0ae' : '#2e7d32', 'Занято');
      window.staffChart = createSemiCircleChart(staffCtx, staffUsed, 45, document.body.classList.contains('dark-theme') ? '#40c4ff' : '#0277bd', 'Работает');
      window.equipmentChart = createSemiCircleChart(equipmentCtx, equipmentUsed, 25, document.body.classList.contains('dark-theme') ? '#ffab40' : '#ff8f00', 'Используется');
      window.timeChart = createSemiCircleTimeChart(timeCtx, avgStayTime, document.body.classList.contains('dark-theme') ? '#69f0ae' : '#2e7d32');
      await fetchLivePatients();
      await fetchArchivedPatients();
    });

    return {
      statusFilter, roomFilter, sortFilter, searchFilter,
      mapActive, statusMap,
      toggleTheme, themeIcon, toggleMap, showNotification, patients, archivedPatients, selectedRow, alarms,
      alarmSummary,
      getRowClass
    };
  }
};
</script>



<style>
/* Основные цвета */

  :root {
    --primary-color: #2e7d32;
    --secondary-color: #0277bd;
    --accent-color: #ff8f00;
    --dark-color: #ffffff;
    --light-color: #f5f5f5;
    --success-color: #2e7d32;
    --warning-color: #ff8f00;
    --danger-color: #c62828;
    --critical-color: #d32f2f;
    --text-primary: #212121;
    --text-secondary: #757575;
    --border-radius: 12px;
    --box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .dark-theme {
    --primary-color: #69f0ae;
    --secondary-color: #40c4ff;
    --accent-color: #ffab40;
    --dark-color: #121212;
    --light-color: #1e1e1e;
    --success-color: #69f0ae;
    --warning-color: #ffab40;
    --danger-color: #ff5252;
    --critical-color: #ff6e6e;
    --text-primary: #e0e0e0;
    --text-secondary: #9e9e9e;
    --box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  /* Базовые стили */

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  body {
    background-color: var(--dark-color);
    color: var(--text-primary);
    display: block;
    min-height: 100vh;
    transition: background-color 0.3s, color 0.3s;

  }

  /* Боковая панель */

  .sidebar {
    width: 60px;
    background: var(--light-color);
    color: var(--text-primary);
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: var(--transition);
    box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    height:100vh;
  }

  .dark-theme .sidebar {
    border-right-color: rgba(255, 255, 255, 0.1);
    box-shadow: 4px 0 15px rgba(0, 0, 0, 0.3);
  }
.row-high {
  background-color: rgba(255, 0, 0, 0.2);
}
.row-medium {
  background-color: rgba(255, 255, 0, 0.2);
}
.row-low {
  background-color: rgba(0, 255, 0, 0.1);
}
  .sidebar:hover {
    width: 200px;
    align-items: flex-start;
    padding-left: 15px;
  }

  .sidebar-item {
    width: 100%;
    padding: 10px 30px;
    margin: 3px 0;
    border-radius: var(--border-radius);
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    text-decoration: none;
    z-index: 1000;
  }

  .sidebar-item:hover {
    background-color: rgba(46, 125, 50, 0.1);
    transform: translateX(5px);
  }

  .dark-theme .sidebar-item:hover {
    background-color: rgba(105, 240, 174, 0.1);
  }

  .sidebar-item.active {
    background-color: rgba(46, 125, 50, 0.2);
  }

  .dark-theme .sidebar-item.active {
    background-color: rgba(105, 240, 174, 0.2);
  }

  .sidebar-item i {
    font-size: 1.1rem;
    margin-right: 12px;
    min-width: 20px;
    text-align: center;
    color: var(--primary-color);
  }

  .sidebar-item span {
    opacity: 0;
    transition: opacity 0.2s;
    white-space: nowrap;
    color: var(--text-primary);
    font-size: 0.85rem;
  }

  .sidebar:hover .sidebar-item span {
    opacity: 1;
  }

  /* Логотип в сайдбаре */

  .sidebar-logo {
    width: 50px;
    height: 50px;
    margin: 20px 0 20px;
    object-fit: contain;
    align-self: center;
  }

  /* Переключатель темы */

  .theme-toggle {
    position: fixed;
    top: 32.5px;
    right: 80px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--light-color);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: var(--transition);
  }

  .dark-theme .theme-toggle {
    border-color: rgba(255, 255, 255, 0.1);
  }

  .theme-toggle:hover {
    transform: scale(1.1);
  }

  .theme-toggle i {
    font-size: 18px;
    color: var(--text-primary);
  }

  /* Основное содержимое */

  .main-content {
    flex: 1;
    padding: 15px;
    z-index: -100;
    padding-top: 0;
    margin-left:75px;
    transition: var(--transition);
    padding-bottom: 180px !important;
    position: absolute;
    top:0;
    width: calc(100% - 60px);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    animation: fadeIn 0.8s ease-out;
    padding-top: 10px;
  }

  .hospital-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
    display: flex;
    align-items: center;
  }

  .hospital-title i {
    margin-right: 10px;
  }

  .logo {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  .user-profile {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .user-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.1rem;
    transition: var(--transition);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .dark-theme .user-icon {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  .user-icon:hover {
    transform: scale(1.1) rotate(15deg);
  }

  /* Контейнеры */

  .patients-container {
    background-color: var(--light-color);
    border-radius: var(--border-radius);
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: var(--box-shadow);
    animation: slideUp 0.6s ease-out;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .dark-theme .patients-container {
    border-color: rgba(255, 255, 255, 0.1);
  }

  .section-title-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }

  @media (min-width: 576px) {
    .section-title-container {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .section-title {
    font-size: 1.2rem;
    color: var(--primary-color);
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .section-title i {
    margin-right: 8px;
    font-size: 1rem;
  }

  /* Фильтры */

  .filters-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 15px;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    min-width: 150px;
    flex: 1;
  }

  .filter-label {
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-bottom: 5px;
  }

  .filter-select {
    padding: 8px 12px;
    border-radius: var(--border-radius);
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: var(--light-color);
    color: var(--text-primary);
    font-size: 0.85rem;
    transition: var(--transition);
  }

  .dark-theme .filter-select {
    border-color: rgba(255, 255, 255, 0.1);
  }

  .filter-select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
  }

  .dark-theme .filter-select:focus {
    box-shadow: 0 0 0 2px rgba(105, 240, 174, 0.2);
  }

  /* Кнопки */

  .add-patient-btn {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: var(--border-radius);
    font-weight: bold;
    font-size: 0.85rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: var(--transition);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: fit-content;
    margin-top: 10px;
  }

  .add-patient-btn i {
    margin-right: 6px;
    font-size: 0.85rem;
  }

  .add-patient-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  /* Формы */

  .service-form {
    margin-top: 20px;
    background-color: var(--light-color);
    padding: 15px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
  }

  .form-title {
    font-size: 1rem;
    margin-bottom: 15px;
    color: var(--primary-color);
    display: flex;
    align-items: center;
  }

  .form-title i {
    margin-right: 8px;
  }

  .form-group {
    margin-bottom: 12px;
  }

  .form-label {
    display: block;
    margin-bottom: 5px;
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .form-input {
    width: 100%;
    padding: 8px 12px;
    border-radius: var(--border-radius);
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: var(--light-color);
    color: var(--text-primary);
    font-size: 0.85rem;
    transition: var(--transition);
  }

  .dark-theme .form-input {
    border-color: rgba(255, 255, 255, 0.1);
  }

  .form-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
  }

  .dark-theme .form-input:focus {
    box-shadow: 0 0 0 2px rgba(105, 240, 174, 0.2);
  }

  .form-textarea {
    min-height: 100px;
    resize: vertical;
  }

  .form-submit {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: var(--border-radius);
    font-weight: bold;
    font-size: 0.85rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
  }

  .dark-theme .form-submit {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  .form-submit i {
    margin-right: 6px;
  }

  .form-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  /* Карточки документов */

  .document-card {
    background-color: var(--light-color);
    border-radius: var(--border-radius);
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: var(--box-shadow);
    transition: var(--transition);
    border-left: 4px solid var(--primary-color);
  }

  .document-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  .document-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .document-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--primary-color);
  }

  .document-type {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    background-color: var(--secondary-color);
    color: white;
  }

  .document-actions {
    margin-top: 15px;
    border-top: 1px dashed rgba(0, 0, 0, 0.1);
    padding-top: 10px;
    display: flex;
    gap: 10px;
  }

  .dark-theme .document-actions {
    border-top-color: rgba(255, 255, 255, 0.1);
  }

  .action-btn {
    padding: 6px 12px;
    border-radius: var(--border-radius);
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    border: none;
    display: flex;
    align-items: center;
  }

  .action-btn i {
    margin-right: 5px;
    font-size: 0.8rem;
  }

  .view-btn {
    background-color: var(--primary-color);
    color: white;
  }

  .edit-btn {
    background-color: var(--secondary-color);
    color: white;
  }

  .print-btn {
    background-color: var(--accent-color);
    color: white;
  }

  .action-btn:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  /* Компактные карточки документов */

  .compact-document {
    padding: 10px;
    margin-bottom: 10px;
  }

  .compact-document .document-header {
    margin-bottom: 5px;
  }

  .compact-document .document-title {
    font-size: 0.95rem;
  }

  .compact-document .document-type {
    font-size: 0.7rem;
  }

  .compact-document .document-details {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
    font-size: 0.8rem;
  }

  .detail-item {
    font-size: 0.85rem;
  }

  .detail-label {
    color: var(--text-secondary);
    font-size: 0.75rem;
    margin-bottom: 2px;
  }

  .compact-document .document-actions {
    margin-top: 8px;
    padding-top: 8px;
  }

  .compact-document .action-btn {
    padding: 4px 8px;
    font-size: 0.7rem;
  }

  /* Статусы документов */

  .status-signed {
    color: var(--success-color);
  }

  .status-pending {
    color: var(--warning-color);
  }

  .status-expired {
    color: var(--danger-color);
  }

  .status-ready {
    color: var(--secondary-color);
  }

  /* Архивные документы */

  .document-card.archived {
    opacity: 0.8;
    border-left: 4px solid var(--text-secondary);
  }

  .document-card.archived .document-title {
    color: var(--text-secondary);
  }

  .document-card.archived .document-type {
    background-color: var(--text-secondary);
  }

  .document-card.archived .status-signed {
    color: var(--text-secondary);
  }

  /* Форма создания документа */

  #create-document-form-container {
    margin-bottom: 20px;
  }

  #create-document-form-container .patients-container {
    animation: none;
  }

  #close-form-btn {
    margin-top: 0;
  }

  /* Карта */

  .map-container {
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    width: 250px;
    background-color: var(--light-color);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 5;
    display: flex;
    flex-direction: column;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    transition: var(--transition);
    transform: translateX(100%);
  }

  .dark-theme .map-container {
    border-left-color: rgba(255, 255, 255, 0.1);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
  }

  .map-container.active {
    transform: translateX(0);
  }

  .map-header {
    padding: 15px;
    background-color: var(--primary-color);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
  }

  .map-header i {
    cursor: pointer;
    transition: var(--transition);
  }

  .map-header i:hover {
    transform: rotate(90deg);
  }

  .map-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    text-align: center;
    color: var(--text-primary);
  }

  .map-content i {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 10px;
  }

  /* Статистика */

  .stats-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 15px;
    margin-bottom: 20px;
  }

  .stat-card {
    background-color: var(--light-color);
    border-radius: var(--border-radius);
    padding: 12px;
    box-shadow: var(--box-shadow);
    text-align: center;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-color);
    margin: 5px 0;
  }

  .stat-label {
    font-size: 0.75rem;
    color: var(--text-secondary);
  }

  /* Критическое оборудование */

  .critical-patients {
    background-color: var(--danger-color);
    color: white;
    padding: 8px 12px;
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    animation: pulse 2s infinite;
    border: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 0.9rem;
  }

  .critical-patients i {
    margin-right: 8px;
    font-size: 1rem;
  }

  .critical-count {
    font-size: 1.1rem;
    font-weight: bold;
    margin-right: 4px;
  }

  /* Карточки оборудования */

  .equipment-card {
    background-color: var(--light-color);
    border-radius: var(--border-radius);
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: var(--box-shadow);
    transition: var(--transition);
    border-left: 4px solid var(--primary-color);
  }

  .equipment-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  .equipment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .equipment-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--primary-color);
  }

  .equipment-status {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  .status-working {
    background-color: var(--success-color);
    color: white;
  }

  .status-warning {
    background-color: var(--warning-color);
    color: white;
  }

  .status-critical {
    background-color: var(--danger-color);
    color: white;
  }

  .equipment-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 10px;
  }

  .service-history {
    margin-top: 15px;
    border-top: 1px dashed rgba(0, 0, 0, 0.1);
    padding-top: 10px;
  }

  .dark-theme .service-history {
    border-top-color: rgba(255, 255, 255, 0.1);
  }

  .history-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    padding: 5px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .dark-theme .history-item {
    border-bottom-color: rgba(255, 255, 255, 0.05);
  }

  .history-date {
    color: var(--text-secondary);
  }

  .history-action {
    font-weight: 500;
  }

  /* Просмотрщик DICOM */

  .viewer-container {
    display: flex;
    flex-direction: column;
    height: 600px;
    background-color: var(--light-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow: hidden;
  }

  .viewer-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: var(--primary-color);
    color: white;
  }

  .toolbar-left, .toolbar-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .toolbar-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    transition: var(--transition);
  }

  .toolbar-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .toolbar-title {
    font-weight: 500;
    margin: 0 15px;
  }

  .viewer-content {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .study-list {
    width: 300px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    padding: 10px;
    background-color: var(--light-color);
  }

  .dark-theme .study-list {
    border-right-color: rgba(255, 255, 255, 0.1);
  }

  .study-item {
    padding: 10px;
    margin-bottom: 8px;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);
    background-color: rgba(0, 0, 0, 0.03);
  }

  .dark-theme .study-item {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .study-item:hover {
    background-color: rgba(46, 125, 50, 0.1);
  }

  .dark-theme .study-item:hover {
    background-color: rgba(105, 240, 174, 0.1);
  }

  .study-item.active {
    background-color: rgba(46, 125, 50, 0.2);
    border-left: 3px solid var(--primary-color);
  }

  .dark-theme .study-item.active {
    background-color: rgba(105, 240, 174, 0.2);
  }

  .study-title {
    font-weight: 500;
    margin-bottom: 5px;
    color: var(--primary-color);
  }

  .study-date {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .study-modality {
    display: inline-block;
    padding: 2px 6px;
    background-color: var(--secondary-color);
    color: white;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: bold;
    margin-top: 5px;
  }

  .image-viewer {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    position: relative;
    overflow: hidden;
  }

  .dicom-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .viewer-controls {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px 15px;
    border-radius: 20px;
  }

  .control-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 5px 10px;
    transition: var(--transition);
  }

  .control-btn:hover {
    color: var(--accent-color);
  }

  .series-list {
    width: 250px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    padding: 10px;
    background-color: var(--light-color);
  }

  .dark-theme .series-list {
    border-left-color: rgba(255, 255, 255, 0.1);
  }

  .series-item {
    display: flex;
    align-items: center;
    padding: 8px;
    margin-bottom: 5px;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);
  }

  .series-item:hover {
    background-color: rgba(46, 125, 50, 0.1);
  }

  .dark-theme .series-item:hover {
    background-color: rgba(105, 240, 174, 0.1);
  }

  .series-item.active {
    background-color: rgba(46, 125, 50, 0.2);
  }

  .dark-theme .series-item.active {
    background-color: rgba(105, 240, 174, 0.2);
  }

  .series-thumbnail {
    width: 50px;
    height: 50px;
    background-color: #333;
    margin-right: 10px;
    border-radius: 4px;
    overflow: hidden;
  }

  .series-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .series-info {
    flex: 1;
  }

  .series-name {
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 3px;
  }

  .series-count {
    font-size: 0.75rem;
    color: var(--text-secondary);
  }

  /* Форма загрузки */

  .upload-container {
    margin-top: 20px;
    background-color: var(--light-color);
    padding: 15px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
  }

  .upload-title {
    font-size: 1rem;
    margin-bottom: 15px;
    color: var(--primary-color);
    display: flex;
    align-items: center;
  }

  .upload-title i {
    margin-right: 8px;
  }

  .upload-area {
    border: 2px dashed rgba(0, 0, 0, 0.1);
    border-radius: var(--border-radius);
    padding: 30px;
    text-align: center;
    cursor: pointer;
    transition: var(--transition);
    margin-bottom: 15px;
  }

  .dark-theme .upload-area {
    border-color: rgba(255, 255, 255, 0.1);
  }

  .upload-area:hover {
    border-color: var(--primary-color);
    background-color: rgba(46, 125, 50, 0.05);
  }

  .dark-theme .upload-area:hover {
    background-color: rgba(105, 240, 174, 0.05);
  }

  .upload-icon {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 10px;
  }

  .upload-text {
    font-size: 0.9rem;
    margin-bottom: 5px;
  }

  .upload-hint {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .upload-btn {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: var(--border-radius);
    font-weight: bold;
    font-size: 0.85rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
  }

  .dark-theme .upload-btn {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  .upload-btn i {
    margin-right: 6px;
  }

  .upload-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  /* Просмотрщик трансляций */

  .stream-container {
    display: flex;
    flex-direction: column;
    height: 600px;
    background-color: var(--light-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow: hidden;
  }

  .stream-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: var(--primary-color);
    color: white;
  }

  .stream-content {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .stream-list {
    width: 300px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    padding: 10px;
    background-color: var(--light-color);
  }

  .dark-theme .stream-list {
    border-right-color: rgba(255, 255, 255, 0.1);
  }

  .stream-item {
    padding: 10px;
    margin-bottom: 8px;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);
    background-color: rgba(0, 0, 0, 0.03);
  }

  .dark-theme .stream-item {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .stream-item:hover {
    background-color: rgba(46, 125, 50, 0.1);
  }

  .dark-theme .stream-item:hover {
    background-color: rgba(105, 240, 174, 0.1);
  }

  .stream-item.active {
    background-color: rgba(46, 125, 50, 0.2);
    border-left: 3px solid var(--primary-color);
  }

  .dark-theme .stream-item.active {
    background-color: rgba(105, 240, 174, 0.2);
  }

  .stream-title {
    font-weight: 500;
    margin-bottom: 5px;
    color: var(--primary-color);
  }

  .stream-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .stream-status {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: bold;
    margin-top: 5px;
  }

  .status-live {
    background-color: var(--danger-color);
    color: white;
  }

  .status-recorded {
    background-color: var(--secondary-color);
    color: white;
  }

  .status-scheduled {
    background-color: var(--accent-color);
    color: white;
  }

  .video-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    position: relative;
  }

  .video-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-direction: column;
  }

  .video-icon {
    font-size: 3rem;
    margin-bottom: 15px;
    color: var(--primary-color);
  }

  .video-text {
    font-size: 1.2rem;
    margin-bottom: 5px;
  }

  .video-hint {
    font-size: 0.9rem;
    color: #aaa;
  }

  .video-controls {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px 15px;
    border-radius: 20px;
  }

  .chat-container {
    width: 250px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    background-color: var(--light-color);
  }

  .dark-theme .chat-container {
    border-left-color: rgba(255, 255, 255, 0.1);
  }

  .chat-header {
    padding: 10px;
    background-color: var(--primary-color);
    color: white;
    font-weight: 500;
    text-align: center;
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
  }

  .message {
    margin-bottom: 10px;
    padding: 8px;
    border-radius: var(--border-radius);
    background-color: rgba(0, 0, 0, 0.05);
    font-size: 0.85rem;
  }

  .dark-theme .message {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .message-user {
    font-weight: 500;
    color: var(--primary-color);
    margin-bottom: 3px;
  }

  .message-text {
    word-break: break-word;
  }

  .message-time {
    font-size: 0.7rem;
    color: var(--text-secondary);
    text-align: right;
    margin-top: 3px;
  }

  .chat-input {
    padding: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .dark-theme .chat-input {
    border-top-color: rgba(255, 255, 255, 0.1);
  }

  .chat-form {
    display: flex;
    gap: 5px;
  }

  .chat-field {
    flex: 1;
    padding: 8px 12px;
    border-radius: var(--border-radius);
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: var(--light-color);
    color: var(--text-primary);
    font-size: 0.85rem;
  }

  .dark-theme .chat-field {
    border-color: rgba(255, 255, 255, 0.1);
  }

  .chat-field:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  .chat-send {
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
  }

  .chat-send:hover {
    background-color: var(--secondary-color);
  }

  /* Расписание трансляций */

  .schedule-container {
    margin-top: 20px;
    background-color: var(--light-color);
    padding: 15px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
  }

  .schedule-title {
    font-size: 1rem;
    margin-bottom: 15px;
    color: var(--primary-color);
    display: flex;
    align-items: center;
  }

  .schedule-title i {
    margin-right: 8px;
  }

  .schedule-list {
    margin-top: 10px;
  }

  .schedule-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    font-size: 0.85rem;
  }

  .dark-theme .schedule-item {
    border-bottom-color: rgba(255, 255, 255, 0.05);
  }

  .schedule-time {
    font-weight: 500;
    color: var(--primary-color);
  }

  .schedule-name {
    flex: 1;
    margin: 0 15px;
  }

  .schedule-type {
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: bold;
    background-color: var(--secondary-color);
    color: white;
  }

  /* Типы документов */

  .document-types {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
    flex-wrap: wrap;
  }

  .type-btn {
    padding: 8px 15px;
    border-radius: var(--border-radius);
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: var(--light-color);
    color: var(--text-primary);
  }

  .dark-theme .type-btn {
    border-color: rgba(255, 255, 255, 0.1);
  }

  .type-btn.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }

  .type-btn:hover {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }

  /* Анимации */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.03);
    }
    100% {
      transform: scale(1);
    }
  }

  /* Уведомления */

  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--light-color);
    border-radius: var(--border-radius);
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: var(--box-shadow);
    border-left: 4px solid var(--primary-color);
    z-index: 1000;
    transform: translateX(110%);
    transition: transform 0.3s ease;
    max-width: 350px;
    opacity: 0;
  }

  .notification.show {
    transform: translateX(0);
    opacity: 1;
  }

  .notification.hide {
    transform: translateX(110%);
    opacity: 0;
  }

  .notification-icon i {
    font-size: 1.5rem;
  }

  .notification-content {
    flex: 1;
  }

  .notification-title {
    font-weight: bold;
    margin-bottom: 5px;
    color: var(--text-primary);
  }

  .notification-text {
    font-size: 0.9rem;
    color: var(--text-secondary);
    white-space: pre-line;
  }

  .notification-close {
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .notification-close:hover {
    opacity: 1;
  }

  /* Цвета уведомлений */

  .notification.success {
    border-left-color: var(--success-color);
  }

  .notification.success .notification-icon i {
    color: var(--success-color);
  }

  .notification.error {
    border-left-color: var(--danger-color);
  }

  .notification.error .notification-icon i {
    color: var(--danger-color);
  }

  .notification.warning {
    border-left-color: var(--warning-color);
  }

  .notification.warning .notification-icon i {
    color: var(--warning-color);
  }

  .notification.info {
    border-left-color: var(--secondary-color);
  }

  .notification.info .notification-icon i {
    color: var(--secondary-color);
  }

  /* Анимация появления */
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  /* Контейнер метрик и диаграмм */

  .metrics-container {
    position: fixed;
    bottom: 0;
    left: 60px;
    right: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    padding: 15px;
    background-color: var(--light-color);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.05);
    z-index: 5;
    transition: var(--transition);
  }

  .dark-theme .metrics-container {
    border-top-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.2);
  }

  .metric-card {
    background-color: var(--light-color);
    border-radius: var(--border-radius);
    padding: 12px;
    box-shadow: var(--box-shadow);
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .dark-theme .metric-card {
    border-color: rgba(255, 255, 255, 0.1);
  }

  .metric-title {
    font-size: 0.85rem;
    color: var(--text-primary);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .metric-title i {
    color: var(--primary-color);
  }

  .chart-container {
    height: 100px;
    margin: 10px 0;
    position: relative;
  }

  .metric-value {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--primary-color);
    margin: 5px 0;
  }

  .metric-details {
    font-size: 0.75rem;
    color: var(--text-secondary);
  }

  /* Стили для таблицы пациентов */

  .patients-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 15px;
    background-color: var(--light-color);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--box-shadow);
  }

  .patients-table thead {
    background-color: var(--primary-color);
    color: white;
  }

  .patients-table th {
    padding: 12px 15px;
    text-align: left;
    font-weight: 500;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .patients-table td {
    padding: 12px 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    font-size: 0.9rem;
  }

  .dark-theme .patients-table td {
    border-bottom-color: rgba(255, 255, 255, 0.05);
  }

  .patients-table tbody tr {
    transition: var(--transition);
    cursor: pointer;
  }

  .patients-table tbody tr:hover {
    background-color: rgba(46, 125, 50, 0.1);
  }

  .dark-theme .patients-table tbody tr:hover {
    background-color: rgba(105, 240, 174, 0.1);
  }

  /* Стили для статусов пациентов */

  .status-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  .status-critical {
    background-color: var(--danger-color);
    color: white;
  }

  .status-moderate {
    background-color: var(--warning-color);
    color: white;
  }

  .status-stable {
    background-color: var(--success-color);
    color: white;
  }

  /* Стили для QR-кода */

  .qr-code {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--light-color);
    border-radius: 4px;
    color: var(--primary-color);
    transition: var(--transition);
  }

  .qr-code:hover {
    transform: scale(1.1);
    color: var(--secondary-color);
  }

  /* Цвета строк по триажу */

  .patients-table tbody tr.red {
    border-left: 4px solid var(--danger-color);
  }

  .patients-table tbody tr.yellow {
    border-left: 4px solid var(--warning-color);
  }

  .patients-table tbody tr.green {
    border-left: 4px solid var(--success-color);
  }

  /* Адаптивность */
  @media (min-width: 768px) {
    .sidebar {
      width: 70px;
    }

    .main-content {
      padding: 20px;
    }

    .hospital-title {
      font-size: 1.7rem;
    }
  }

  @media (min-width: 992px) {
    .sidebar {
      width: 80px;
    }

    .sidebar:hover {
      width: 220px;
      padding-left: 20px;
    }

    .hospital-title {
      font-size: 2rem;
    }

    .sidebar-logo {
      width: 40px;
      height: 40px;
      margin: 15px 0 20px;
      border-radius: 50%;
      object-fit: cover;
    }

    .theme-toggle i {
      font-size: 24px;
    }

    .user-icon {
      width: 45px;
      height: 45px;
      font-size: 1.3rem;
    }
  }

  @media (max-width: 768px) {
    .map-container {
      width: 100%;
      transform: translateX(100%);
    }

    .map-container.active {
      transform: translateX(0);
    }

    .stats-container {
      grid-template-columns: 1fr 1fr;
    }

    .metrics-container {
      grid-template-columns: repeat(2, 1fr);
    }

    .main-content {
      padding-bottom: 300px !important;
    }
  }

  @media (max-width: 576px) {
    .stats-container {
      grid-template-columns: 1fr;
    }

    .filters-container {
      flex-direction: column;
    }

    .filter-group {
      min-width: 100%;
    }

    .document-details {
      grid-template-columns: 1fr !important;
    }

    .equipment-details {
      grid-template-columns: 1fr;
    }

    .metrics-container {
      grid-template-columns: 1fr;
      left: 0;
      padding-left: 75px;
    }
  }
  /* Стили для медицинской карты */

  .patient-info-grid {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 20px;
    align-items: center;
  }

  .patient-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(74, 144, 226, 0.3);
  }

  .patient-details h2 {
    margin-bottom: 10px;
    color: var(--text-primary);
  }

  .patient-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
  }

  .meta-item {
    font-size: 14px;
    color: var(--text-primary);
  }

  .meta-item strong {
    color: var(--text-secondary);
    display: block;
    margin-bottom: 3px;
    font-weight: 500;
    font-size: 13px;
  }

  .current-datetime {
    text-align: right;
    color: var(--text-muted);
    font-size: 14px;
  }

  .current-datetime .date {
    font-size: 16px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 3px;
  }

  .current-datetime .time {
    font-size: 24px;
    font-weight: 300;
    color: var(--primary-color);
    font-family: 'Courier New', monospace;
  }

  .medical-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }

  .info-section {
    padding: 18px;
    background: var(--light-color);
    border-radius: 10px;
    border-left: 4px solid var(--primary-color);
    transition: all 0.3s;
  }

  .info-section:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }

  .info-section h3 {
    color: var(--primary-color);
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .info-content {
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-primary);
  }

  .info-content p {
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  .info-content i {
    color: var(--primary-color);
    margin-top: 3px;
  }

  /* Показатели жизнедеятельности */

  .compact-vitals {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
  }

  .vital-tile {
    background: var(--light-color);
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .vital-tile::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--primary-color);
  }

  .vital-tile.selected {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .vital-tile.critical {
    border-left: 4px solid var(--danger-color);
  }

  .vital-tile.critical::after {
    background: var(--danger-color);
  }

  .vital-tile.warning {
    border-left: 4px solid var(--warning-color);
  }

  .vital-tile.warning::after {
    background: var(--warning-color);
  }

  .vital-tile.normal {
    border-left: 4px solid var(--success-color);
  }

  .vital-tile.normal::after {
    background: var(--success-color);
  }

  .vital-tile:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .vital-icon {
    font-size: 24px;
    color: var(--primary-color);
    margin-bottom: 10px;
  }

  .vital-value {
    font-size: 24px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 8px 0;
  }

  .vital-title {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 5px;
    font-weight: 500;
  }

  .vital-unit {
    font-size: 13px;
    color: var(--text-muted);
    background: rgba(0, 0, 0, 0.05);
    padding: 2px 8px;
    border-radius: 10px;
    display: inline-block;
  }

  /* График */

  .chart-container-wrapper {
    margin-top: 20px;
  }

  .chart-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 20px;
    align-items: center;
  }

  .chart-controls select {
    padding: 10px 15px;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    min-width: 160px;
    background: var(--light-color);
    font-size: 14px;
    color: var(--text-primary);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .chart-controls button {
    padding: 10px 15px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(74, 144, 226, 0.3);
  }

  .chart-controls button:hover {
    background: #3a7bc8;
  }

  .chart-controls .period-selector {
    display: flex;
    gap: 8px;
    margin-left: auto;
  }

  .chart-controls .period-selector button {
    background: var(--light-color);
    color: var(--text-primary);
    padding: 8px 12px;
    box-shadow: none;
  }

  .chart-controls .period-selector button.active {
    background: var(--primary-color);
    color: white;
    box-shadow: 0 2px 4px rgba(74, 144, 226, 0.3);
  }

  .chart-container {
    height: 280px;
    position: relative;
  }

  /* Быстрые действия */

  .quick-actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }

  .action-btn {
    padding: 12px;
    border: none;
    background: var(--primary-color);
    color: white;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 2px 4px rgba(74, 144, 226, 0.3);
  }

  .action-btn:hover {
    background: #3a7bc8;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(74, 144, 226, 0.3);
  }

  /* График приема лекарств */

  .medication-schedule {
    display: grid;
    gap: 8px;
  }

  .medication-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 12px;
    background: rgba(74, 144, 226, 0.2);
    color: var(--dark-color);
    font-weight: 600;
    border-radius: 6px;
  }

  .medication-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 12px;
    background: var(--light-color);
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.2s;
    color: var(--text-primary);
    align-items: center;
  }

  .medication-item:hover {
    background: rgba(74, 144, 226, 0.1);
    transform: translateX(5px);
  }

  .medication-name {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .medication-status {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 13px;
    width: fit-content;
  }

  .medication-status.active {
    background: rgba(46, 125, 50, 0.1);
    color: var(--success-color);
  }

  .medication-status.paused {
    background: rgba(253, 126, 20, 0.1);
    color: var(--warning-color);
  }

  .medication-status.completed {
    background: rgba(108, 117, 125, 0.1);
    color: var(--secondary-color);
  }

  /* Вкладки */

  .tabs-container {
    margin-top: 20px;
  }

  .tabs {
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .tab {
    padding: 10px 20px;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .tab.active {
    border-bottom-color: var(--primary-color);
    color: var(--primary-color);
    font-weight: 500;
  }

  .tab:hover:not(.active) {
    border-bottom-color: var(--secondary-color);
  }

  .tab-content {
    display: none;
  }

  .tab-content.active {
    display: block;
  }

  /* Оповещения */

  .alert-item {
    padding: 14px;
    margin-bottom: 12px;
    border-left: 4px solid var(--danger-color);
    background: rgba(220, 53, 69, 0.1);
    border-radius: 8px;
    font-size: 14px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    transition: all 0.2s;
    color: var(--text-primary);
  }

  .alert-item:hover {
    transform: translateX(5px);
  }

  .alert-item i {
    font-size: 18px;
    margin-top: 2px;
  }

  .alert-content {
    flex: 1;
  }

  .alert-title {
    font-weight: 600;
    margin-bottom: 3px;
  }

  .alert-text {
    font-size: 13px;
    color: var(--text-secondary);
  }

  .alert-item.warning {
    border-left-color: var(--warning-color);
    background: rgba(253, 126, 20, 0.1);
  }

  .alert-item.info {
    border-left-color: var(--info-color);
    background: rgba(23, 162, 184, 0.1);
  }

  /* Таблицы */

  .analysis-table-container,
  .procedures-table-container {
    overflow-x: auto;
    margin-top: 15px;
  }

  .analysis-table,
  .procedures-table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--light-color);
    border-radius: 6px;
    overflow: hidden;
  }

  .analysis-table th,
  .procedures-table th {
    padding: 12px;
    text-align: left;
    background-color: rgba(74, 144, 226, 0.2);
    font-weight: 600;
    font-size: 13px;
  }

  .analysis-table td,
  .procedures-table td {
    padding: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    font-size: 14px;
  }

  .analysis-table tr:hover,
  .procedures-table tr:hover {
    background-color: rgba(74, 144, 226, 0.05);
  }

  .analysis-value {
    font-weight: 600;
  }

  .analysis-normal {
    color: var(--success-color);
  }

  .analysis-warning {
    color: var(--warning-color);
  }

  .analysis-critical {
    color: var(--danger-color);
  }

  .analysis-status {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 13px;
    width: fit-content;
  }

  .analysis-status.normal {
    background: rgba(46, 125, 50, 0.1);
    color: var(--success-color);
  }

  .analysis-status.warning {
    background: rgba(253, 126, 20, 0.1);
    color: var(--warning-color);
  }

  .analysis-status.critical {
    background: rgba(198, 40, 40, 0.1);
    color: var(--danger-color);
  }

  .status-planned {
    background: rgba(253, 126, 20, 0.1);
    color: var(--warning-color);
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 13px;
    width: fit-content;
  }

  .status-completed {
    background: rgba(46, 125, 50, 0.1);
    color: var(--success-color);
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 13px;
    width: fit-content;
  }

  /* Адаптивность */
  @media (max-width: 992px) {

    .medical-info-grid {
      grid-template-columns: 1fr 1fr;
    }

    .patient-info-grid {
      grid-template-columns: auto 1fr;
    }

    .current-datetime {
      grid-column: span 2;
      text-align: left;
      margin-top: 10px;
    }
  }

  @media (max-width: 768px) {

    .medical-info-grid {
      grid-template-columns: 1fr;
    }

    .patient-info-grid {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .patient-avatar {
      margin: 0 auto;
    }

    .patient-meta {
      grid-template-columns: 1fr 1fr;
    }

    .chart-controls {
      flex-direction: column;
      align-items: flex-start;
    }

    .chart-controls .period-selector {
      margin-left: 0;
      margin-top: 10px;
    }

    .medication-header,
    .medication-item {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .medication-status {
      justify-self: start;
    }
  }

  @media (max-width: 576px) {

    .patient-meta {
      grid-template-columns: 1fr;
    }

    .compact-vitals {
      grid-template-columns: 1fr 1fr;
    }

    .quick-actions-grid {
      grid-template-columns: 1fr;

    }
  }


</style>
