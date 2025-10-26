<template>
  <section class="product-section">
    <div class="container">
      <div class="product-showcase">
        <!-- Product Image Side -->
        <div class="product-image-side">
          <div class="product-image-container">
            <div class="background-circle"></div>
            <img 
              src="/hormone-harmony-bottle.svg" 
              alt="Hormone Harmony Supplement"
              class="product-image"
            />
          </div>
        </div>

        <!-- Product Info Side -->
        <div class="product-info-side">
          <div class="product-header">
            <h1 class="product-title">Hormone Harmony ™</h1>
            <div class="rating">
              <div class="stars">
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
              </div>
              <span class="review-count">7545 Reviews</span>
            </div>
          </div>

          <div class="product-description">
            <p>With ingredients traditionally used in western herbal medicine shown to:</p>
            
            <ul class="benefits-list">
              <li>✓ Relieve symptoms of Menopause</li>
              <li>✓ Reduce Mood Swings associated with Menopause</li>
              <li>✓ Relieve bloating, flatulence and symptoms of indigestion</li>
              <li>✓ Reduce mild gastrointestinal tract inflammation</li>
              <li>✓ Helps maintain healthy energy levels</li>
              <li>✓ Supports mental clarity and calm mood during menopause</li>
              <li>✓ Helps relieve mild menstrual discomfort and supports cycle regularity</li>
              <li>✓ Gluten & Dairy free</li>
              <li>✓ Helps support healthy hormonal balance</li>
              <li>✓ Global bestseller - sold over 7 times already</li>
            </ul>
          </div>

          <div class="product-highlights">
            <h3>Product Highlights</h3>
            <div class="highlights-grid">
              <div class="highlight-item">
                <span class="highlight-icon">✓</span>
                <span>60 day money back guarantee*</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-icon">✓</span>
                <span>Ingredients supported by scientific research</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-icon">✓</span>
                <span>96 plant-based capsules per jar</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-icon">✓</span>
                <span>Free from Artificial Additives, Magnesium Stearate and GMOs</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-icon">✓</span>
                <span>Produced in a certified facility in Sydney, Australia</span>
              </div>
            </div>
          </div>

          <div class="buying-options">
            <h3>Buying Options:</h3>
            <div class="options-container">
              <div class="option-card">
                <button class="option-btn">One Time</button>
              </div>
              <div class="option-card recommended">
                <div class="save-badge">UP TO 25% OFF</div>
                <button class="option-btn primary">Subscribe & Save</button>
              </div>
            </div>

            <div class="jar-options">
              <div class="jar-option">
                <span class="jar-count">1 Jar</span>
                <span class="jar-price">$49.95 each</span>
              </div>
              <div class="jar-option">
                <span class="jar-count">2 Jars</span>
                <span class="jar-price">$34.95 each</span>
              </div>
              <div class="jar-option highlighted">
                <span class="jar-count">4 Jars</span>
                <span class="jar-price">$31.48 each</span>
                <span class="best-value">BEST VALUE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Component logic can be added here
</script>

<style scoped>
.product-section {
  padding: 4rem 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.product-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

/* Product Image Side */
.product-image-side {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image-container {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.background-circle {
  position: absolute;
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.product-image {
  position: relative;
  z-index: 2;
  width: 100%;
  height: auto;
  max-width: 300px;
  object-fit: contain;
}

/* Product Info Side */
.product-info-side {
  padding: 2rem 0;
}

.product-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 1rem 0;
}

.rating {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.stars {
  display: flex;
  gap: 0.2rem;
}

.star {
  color: #ffd700;
  font-size: 1.2rem;
}

.review-count {
  color: #666;
  font-size: 0.9rem;
}

.product-description p {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.benefits-list li {
  padding: 0.5rem 0;
  color: #2c3e50;
  font-size: 0.95rem;
  line-height: 1.4;
}

.product-highlights h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.highlights-grid {
  display: grid;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  font-size: 0.95rem;
  color: #2c3e50;
}

.highlight-icon {
  color: #27ae60;
  font-weight: bold;
  margin-top: 0.1rem;
}

.buying-options h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.options-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.option-card {
  position: relative;
  flex: 1;
}

.save-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #e74c3c;
  color: white;
  font-size: 0.7rem;
  padding: 0.3rem 0.6rem;
  border-radius: 15px;
  font-weight: bold;
  z-index: 10;
}

.option-btn {
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd;
  background: white;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-btn:hover {
  border-color: #e74c3c;
  color: #e74c3c;
}

.option-btn.primary {
  background: #e74c3c;
  color: white;
  border-color: #e74c3c;
}

.option-btn.primary:hover {
  background: #c0392b;
  border-color: #c0392b;
}

.jar-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.jar-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.jar-option:hover {
  border-color: #e74c3c;
  transform: translateY(-2px);
}

.jar-option.highlighted {
  border-color: #e74c3c;
  background: #fff5f5;
}

.jar-count {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.jar-price {
  color: #e74c3c;
  font-weight: 700;
  font-size: 1.1rem;
}

.best-value {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #f39c12;
  color: white;
  font-size: 0.7rem;
  padding: 0.3rem 0.6rem;
  border-radius: 15px;
  font-weight: bold;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-showcase {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .product-title {
    font-size: 2rem;
  }
  
  .background-circle {
    width: 280px;
    height: 280px;
  }
  
  .jar-options {
    grid-template-columns: 1fr;
  }
  
  .options-container {
    flex-direction: column;
  }
}
</style>