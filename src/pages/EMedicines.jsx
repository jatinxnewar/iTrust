import React, { useState } from 'react';

const EMedicines = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);

  const categories = ['all', 'Pain Relief', 'Vitamins', 'Antibiotics', 'Diabetes', 'Heart Health', 'Digestive'];

  const medicines = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      price: 45,
      originalPrice: 60,
      discount: 25,
      rating: 4.5,
      reviews: 1250,
      inStock: true,
      prescription: false,
      manufacturer: 'Cipla Ltd.',
      description: 'Effective pain and fever relief',
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Vitamin D3 60K',
      category: 'Vitamins',
      price: 120,
      originalPrice: 150,
      discount: 20,
      rating: 4.7,
      reviews: 890,
      inStock: true,
      prescription: false,
      manufacturer: 'Sun Pharma',
      description: 'Bone health supplement',
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Azithromycin 500mg',
      category: 'Antibiotics',
      price: 180,
      originalPrice: 220,
      discount: 18,
      rating: 4.6,
      reviews: 650,
      inStock: true,
      prescription: true,
      manufacturer: 'Dr. Reddy\'s',
      description: 'Broad spectrum antibiotic',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Metformin 500mg',
      category: 'Diabetes',
      price: 95,
      originalPrice: 120,
      discount: 21,
      rating: 4.8,
      reviews: 2100,
      inStock: true,
      prescription: true,
      manufacturer: 'Lupin Ltd.',
      description: 'Diabetes management',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Aspirin 75mg',
      category: 'Heart Health',
      price: 55,
      originalPrice: 75,
      discount: 27,
      rating: 4.4,
      reviews: 1580,
      inStock: true,
      prescription: false,
      manufacturer: 'Bayer',
      description: 'Cardiovascular protection',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Omeprazole 20mg',
      category: 'Digestive',
      price: 85,
      originalPrice: 110,
      discount: 23,
      rating: 4.6,
      reviews: 920,
      inStock: true,
      prescription: false,
      manufacturer: 'Cadila Healthcare',
      description: 'Acid reflux relief',
      image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&fit=crop'
    },
    {
      id: 7,
      name: 'Multivitamin Tablets',
      category: 'Vitamins',
      price: 250,
      originalPrice: 320,
      discount: 22,
      rating: 4.5,
      reviews: 1750,
      inStock: true,
      prescription: false,
      manufacturer: 'HealthKart',
      description: 'Complete daily nutrition',
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop'
    },
    {
      id: 8,
      name: 'Ibuprofen 400mg',
      category: 'Pain Relief',
      price: 65,
      originalPrice: 85,
      discount: 24,
      rating: 4.3,
      reviews: 1120,
      inStock: true,
      prescription: false,
      manufacturer: 'Abbott',
      description: 'Anti-inflammatory pain relief',
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop'
    },
    {
      id: 9,
      name: 'Atorvastatin 10mg',
      category: 'Heart Health',
      price: 145,
      originalPrice: 180,
      discount: 19,
      rating: 4.7,
      reviews: 1340,
      inStock: true,
      prescription: true,
      manufacturer: 'Pfizer',
      description: 'Cholesterol management',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop'
    },
    {
      id: 10,
      name: 'Probiotic Capsules',
      category: 'Digestive',
      price: 320,
      originalPrice: 400,
      discount: 20,
      rating: 4.8,
      reviews: 980,
      inStock: true,
      prescription: false,
      manufacturer: 'Yakult',
      description: 'Gut health support',
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop'
    },
    {
      id: 11,
      name: 'Cetirizine 10mg',
      category: 'Pain Relief',
      price: 35,
      originalPrice: 50,
      discount: 30,
      rating: 4.4,
      reviews: 870,
      inStock: true,
      prescription: false,
      manufacturer: 'GSK',
      description: 'Allergy relief',
      image: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=400&h=300&fit=crop'
    },
    {
      id: 12,
      name: 'Vitamin C 1000mg',
      category: 'Vitamins',
      price: 180,
      originalPrice: 230,
      discount: 22,
      rating: 4.6,
      reviews: 1450,
      inStock: true,
      prescription: false,
      manufacturer: 'HealthVit',
      description: 'Immunity booster',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop'
    }
  ];

  const filteredMedicines = medicines.filter(med => {
    const matchesCategory = selectedCategory === 'all' || med.category === selectedCategory;
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          med.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (medicine) => {
    const existingItem = cart.find(item => item.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId) => {
    setCart(cart.filter(item => item.id !== medicineId));
  };

  const updateQuantity = (medicineId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(medicineId);
    } else {
      setCart(cart.map(item =>
        item.id === medicineId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="emedicines-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">E-Medicines</h1>
          <p className="page-subtitle">Order medicines online with fast delivery</p>
        </div>
        <button className="cart-button" onClick={() => setShowCart(!showCart)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zm3 13a3 3 0 11-6 0 3 3 0 016 0zm6.219-7.219l1.562 6.5A3 3 0 0117 18H7a3 3 0 01-2.781-4.219l1.562-6.5A1 1 0 016.78 6h10.438a1 1 0 01.781.281z" fill="currentColor"/>
          </svg>
          {cart.length > 0 && <span className="cart-badge">{getTotalItems()}</span>}
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-section">
        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat === 'all' ? 'All Medicines' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Medicines Grid */}
      <div className="medicines-grid">
        {filteredMedicines.map(medicine => (
          <div key={medicine.id} className="medicine-card">
            {medicine.discount > 0 && (
              <div className="discount-badge">{medicine.discount}% OFF</div>
            )}
            {medicine.prescription && (
              <div className="prescription-badge">Rx</div>
            )}
            <div className="medicine-image">
              <img src={medicine.image} alt={medicine.name} />
            </div>
            <div className="medicine-details">
              <h3 className="medicine-name">{medicine.name}</h3>
              <p className="medicine-manufacturer">{medicine.manufacturer}</p>
              <p className="medicine-description">{medicine.description}</p>
              
              <div className="medicine-rating">
                <div className="rating-stars">
                  {'★'.repeat(Math.floor(medicine.rating))}
                  {'☆'.repeat(5 - Math.floor(medicine.rating))}
                </div>
                <span className="rating-count">({medicine.reviews})</span>
              </div>

              <div className="medicine-price-section">
                <div className="price-container">
                  <span className="current-price">₹{medicine.price}</span>
                  {medicine.originalPrice > medicine.price && (
                    <span className="original-price">₹{medicine.originalPrice}</span>
                  )}
                </div>
                {medicine.inStock ? (
                  <span className="stock-status in-stock">In Stock</span>
                ) : (
                  <span className="stock-status out-of-stock">Out of Stock</span>
                )}
              </div>

              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(medicine)}
                disabled={!medicine.inStock}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>Your Cart ({getTotalItems()} items)</h3>
              <button className="close-cart" onClick={() => setShowCart(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <p>Your cart is empty</p>
                  <button className="browse-btn" onClick={() => setShowCart(false)}>
                    Browse Medicines
                  </button>
                </div>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p className="cart-item-price">₹{item.price}</p>
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12h14" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery</span>
                    <span className="free">FREE</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                </div>
                <button className="checkout-btn">
                  Proceed to Checkout
                </button>
                <p className="prescription-note">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Prescription required for Rx medicines
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Benefits Section */}
      <div className="benefits-section">
        <h2>Why Choose iTrust E-Medicines?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="currentColor"/>
              </svg>
            </div>
            <h3>Fast Delivery</h3>
            <p>Get medicines delivered within 24 hours</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>100% Genuine</h3>
            <p>All medicines are verified and authentic</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Best Prices</h3>
            <p>Save up to 30% on medicines</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414 1 1 0 01-1.414-1.414z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>24/7 Support</h3>
            <p>Expert pharmacists available anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMedicines;
