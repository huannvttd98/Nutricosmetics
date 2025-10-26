<script setup>
import ProductSection from './components/ProductSection.vue'
</script>

<template>
  <div class="app">
    <header class="header">
      <nav class="navbar">
        <div class="nav-brand">
          <h2>NutriCosmetics</h2>
        </div>
        <div class="nav-links">
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
    </header>

    <main>
      <ProductSection />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f4ff 0%, #fff0f5 100%);
}

.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.navbar {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand h2 {
  color: #2c3e50;
  margin: 0;
  font-weight: 700;
  font-size: 1.8rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #e74c3c;
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .nav-brand h2 {
    font-size: 1.5rem;
  }
}
</style>
