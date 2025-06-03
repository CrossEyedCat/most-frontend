<template>

    <div class="bg-pulse"></div>
    <div class="medical-icons" ref="medicalIconsContainer"></div>
    <div class="theme-toggle1" @click="toggleTheme">
      <i :class="themeIcon"></i>
    </div>

    <div class="login-container">
      <div class="logo1">
        <div class="logo-icon heartbeat">
          <i class="fas fa-heartbeat"></i>
        </div>
        <div class="logo-text">MOCT Poles-E</div>
        <div class="logo-subtext">Мониторинг жизненных показателей</div>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <!-- Username -->
        <div class="form-group">
          <label for="username">Имя пользователя</label>
          <div class="input-container">
            <i class="fas fa-user-md"></i>
            <input
                type="text"
                id="username"
                v-model="username"
                class="form-control"
                placeholder="Введите имя пользователя"
                required
                autocomplete="username"
            />
          </div>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">Пароль</label>
          <div class="input-container">
            <i class="fas fa-lock"></i>
            <input
                :type="passwordVisible ? 'text' : 'password'"
                id="password"
                v-model="password"
                class="form-control"
                placeholder="Введите пароль"
                required
                autocomplete="current-password"
            />
            <button type="button" class="toggle-password" @click="togglePassword">
              <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <div class="error-message" :class="{ show: errorMessage }">{{ errorMessage }}</div>

        <button type="submit" class="btn-login" :disabled="loading">
          <i :class="loading ? 'fas fa-spinner fa-spin' : 'fas fa-sign-in-alt'"></i>
          {{ loading ? 'Проверка...' : 'Войти в систему' }}
        </button>
      </form>
  </div>
</template>

<script>


import api from "@/services/api.js";
import axios from "axios";

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      passwordVisible: false,
      rememberMe: false,
      loading: false,
      errorMessage: ''
    };
  },
  computed: {
    themeIcon() {
      return document.body.classList.contains('dark-theme') ? 'fas fa-sun' : 'fas fa-moon';
    }
  },
  methods: {
    toggleTheme() {
      document.body.classList.toggle('dark-theme');
      localStorage.setItem(
          'theme',
          document.body.classList.contains('dark-theme') ? 'dark' : 'light'
      );
    },
    togglePassword() {
      this.passwordVisible = !this.passwordVisible;
    },
    initTheme() {
      if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
      }
    },
    async handleLogin() {
      this.loading = true;
      this.errorMessage = '';

      try {
        const response = await api.post('/auth/login', {
          login: this.username,
          password: this.password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Распаковываем ответ
        const {
          type,
          accessToken,
          refreshToken,
          role
        } = response.data;

        // Комбинируем для Authorization header
        const authHeader = `${type} ${accessToken}`;

        // Сохраняем токены
        localStorage.setItem('authToken', accessToken);
        localStorage.setItem('authType', type);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userRole', role);

        // Устанавливаем заголовок по умолчанию для всех будущих запросов
        axios.defaults.headers.common['Authorization'] = authHeader;

          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('username', this.username);
          localStorage.setItem('password', this.password);
        // Перенаправление после успешного входа
        this.$router.push('/patients');
      } catch (error) {
        // Разбор ошибки
        if (error.response) {
          this.errorMessage =
              error.response.data.message ||
              'Неверное имя пользователя или пароль';
        } else {
          this.errorMessage =
              'Не удалось подключиться к серверу. Попробуйте позже.';
        }
      } finally {
        this.loading = false;
      }
    },

    generateMedicalIcons() {
      const icons = [
        'fa-heartbeat','fa-heart-pulse','fa-lungs','fa-syringe','fa-stethoscope',
        'fa-hospital','fa-pills','fa-bacteria','fa-virus','fa-dna',
        'fa-eye-dropper','fa-microscope'
      ];
      const container = this.$refs.medicalIconsContainer;
      for (let i = 0; i < 20; i++) {
        const icon = document.createElement('i');
        icon.className = `medical-icon fas ${icons[Math.floor(Math.random() * icons.length)]}`;
        icon.style.left = `${Math.random() * 100}%`;
        icon.style.top = `${Math.random() * 100}%`;
        icon.style.animationDuration = `${15 + Math.random() * 30}s`;
        icon.style.animationDelay = `${Math.random() * 5}s`;
        icon.style.fontSize = `${20 + Math.random() * 30}px`;
        container.appendChild(icon);
      }
    }
  },
  mounted() {
    if (localStorage.getItem('rememberMe') === 'true') {
      this.rememberMe = true;
      this.username = localStorage.getItem('username');
      this.password = localStorage.getItem('password') || '';
    }
    this.initTheme();
    this.generateMedicalIcons();
  }
};
</script>

<style>
:root {
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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', 'Arial', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  transition: background-color 0.3s, color 0.3s;
  overflow: hidden;
  position: relative;
}

.bg-pulse {
  position: absolute;
  top:0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, var(--primary-light) 0%, transparent 70%);
  opacity: 0.1;
  animation: pulse 8s infinite alternate;
  z-index: 0;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.1; }
  100% { transform: scale(1.2); opacity: 0.2; }
}

.login-container {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 300px;
  z-index: 10;
  width: 400px;
  max-width: 90%;
  background-color: var(--panel-bg);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 30px var(--shadow-color);
  border: 1px solid var(--border-color);
  transform: translateY(20px);
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
  transition: background-color 0.3s, border-color 0.3s;
}

@keyframes fadeInUp {
  to { transform: translateY(0); opacity: 1; }
}

.logo1 {
  text-align: center;
  margin-bottom: 30px;
  opacity: 0;
  animation: fadeIn 1s ease-out forwards;
  animation-delay: 0.3s;
  display: flex;
  flex-direction: column;

}

@keyframes fadeIn {
  to { opacity: 1; }
}

.logo-icon {
  font-size: 60px;
  color: var(--primary-color);
  margin-bottom: 15px;
  display: inline-block;
  transform: scale(0.8);
  animation: pulseIcon 2s infinite alternate;
}

@keyframes pulseIcon {
  0% { transform: scale(0.95); }
  100% { transform: scale(1.05); }
}

.logo-text {
  font-size: 28px;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 5px;
  letter-spacing: 1px;
}

.logo-subtext {
  font-size: 14px;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  position: relative;
  opacity: 0;
  transform: translateY(10px);
}

.form-group:nth-child(1) {
  animation: fadeInUpForm 0.5s ease-out forwards;
  animation-delay: 0.5s;
}

.form-group:nth-child(2) {
  animation: fadeInUpForm 0.5s ease-out forwards;
  animation-delay: 0.7s;
}

.form-group:nth-child(3) {
  animation: fadeInUpForm 0.5s ease-out forwards;
  animation-delay: 0.9s;
}

@keyframes fadeInUpForm {
  to { opacity: 1; transform: translateY(0); }
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.input-container {
  position: relative;
}

.input-container .fa-user-md,
.input-container .fa-lock {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-size: 18px;
}

.form-control {
  width: 100%;
  padding: 12px 45px 12px 45px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 16px;
  color: var(--text-primary);
  transition: all 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s;
  background: none;
  border: none;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password:hover {
  color: var(--primary-color);
}

.btn-login {
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  border: none;
  background-color: var(--primary-color);
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  box-shadow: 0 4px 6px rgba(66, 133, 244, 0.2);
}

.btn-login:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(66, 133, 244, 0.3);
}

.btn-login:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(66, 133, 244, 0.2);
}

.btn-login:disabled {
  background-color: var(--disabled-color);
  color: var(--text-secondary);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.heartbeat {
  animation: heartbeat 1.5s infinite;
}

@keyframes heartbeat {
  0% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1); }
  75% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.error-message {
  color: var(--danger-color);
  font-size: 14px;
  margin-top: 5px;
  text-align: center;
  height: 20px;
  opacity: 0;
  transition: opacity 0.3s;
}

.error-message.show {
  opacity: 1;
}

.medical-icons {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.medical-icon {
  position: absolute;
  opacity: 0.05;
  color: var(--primary-color);
  font-size: 30px;
  animation: float 15s infinite linear;
}

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(-100vh) rotate(360deg); }
}

.theme-toggle1 {
  position: fixed;
  top: 30px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--panel-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px var(--shadow-color);
  border: 1px solid var(--border-color);
  z-index: 1000;
  transition: all 0.3s;
}

.theme-toggle1:hover {
  transform: scale(1.1);
}

.theme-toggle1 i {
  font-size: 24px;
  color: var(--text-primary);
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-secondary);
}

.remember-me input {
  accent-color: var(--primary-color);
}

.forgot-password {
  font-size: 14px;
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s;
}

.forgot-password:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}
</style>