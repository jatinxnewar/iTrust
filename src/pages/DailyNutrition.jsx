import React, { useState } from 'react';

const DailyNutrition = () => {
  const [timeFilter, setTimeFilter] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [foodConsumed, setFoodConsumed] = useState([
    { id: 1, name: 'Apple', quantity: '1 medium', calories: 95, time: '9:30 AM' },
    { id: 2, name: 'Almonds', quantity: '1 oz (23 nuts)', calories: 164, time: '11:00 AM' },
    { id: 3, name: 'Chicken Breast', quantity: '6 oz', calories: 280, time: '1:00 PM' }
  ]);
  const [newFood, setNewFood] = useState({
    name: '',
    quantity: '',
    calories: '',
    time: ''
  });
  const [mealLog, setMealLog] = useState([
    {
      id: 1,
      meal: 'Breakfast',
      time: '8:00 AM',
      items: ['Oatmeal with berries', 'Scrambled eggs', 'Orange juice'],
      calories: 450,
      protein: 18,
      carbs: 65,
      fats: 12,
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      meal: 'Mid-Morning Snack',
      time: '10:30 AM',
      items: ['Greek yogurt', 'Almonds'],
      calories: 250,
      protein: 15,
      carbs: 20,
      fats: 12,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      meal: 'Lunch',
      time: '1:00 PM',
      items: ['Grilled chicken breast', 'Brown rice', 'Mixed vegetables', 'Side salad'],
      calories: 550,
      protein: 42,
      carbs: 55,
      fats: 15,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      meal: 'Evening Snack',
      time: '4:30 PM',
      items: ['Apple', 'Peanut butter'],
      calories: 200,
      protein: 6,
      carbs: 25,
      fats: 8,
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      meal: 'Dinner',
      time: '7:30 PM',
      items: ['Salmon fillet', 'Quinoa', 'Steamed broccoli'],
      calories: 500,
      protein: 38,
      carbs: 42,
      fats: 18,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop'
    }
  ]);
  const [newMeal, setNewMeal] = useState({
    meal: '',
    time: '',
    items: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  });

  const nutritionData = {
    daily: {
      calories: { consumed: 1650, goal: 2000, unit: 'kcal' },
      protein: { consumed: 65, goal: 80, unit: 'g' },
      carbs: { consumed: 180, goal: 250, unit: 'g' },
      fats: { consumed: 45, goal: 60, unit: 'g' },
      water: { consumed: 6, goal: 8, unit: 'glasses' },
      fiber: { consumed: 22, goal: 30, unit: 'g' }
    },
    weekly: {
      calories: { consumed: 13500, goal: 14000, unit: 'kcal' },
      protein: { consumed: 520, goal: 560, unit: 'g' },
      carbs: { consumed: 1580, goal: 1750, unit: 'g' },
      fats: { consumed: 380, goal: 420, unit: 'g' },
      water: { consumed: 48, goal: 56, unit: 'glasses' },
      fiber: { consumed: 175, goal: 210, unit: 'g' }
    },
    monthly: {
      calories: { consumed: 58500, goal: 60000, unit: 'kcal' },
      protein: { consumed: 2250, goal: 2400, unit: 'g' },
      carbs: { consumed: 6800, goal: 7500, unit: 'g' },
      fats: { consumed: 1650, goal: 1800, unit: 'g' },
      water: { consumed: 205, goal: 240, unit: 'glasses' },
      fiber: { consumed: 750, goal: 900, unit: 'g' }
    },
    yearly: {
      calories: { consumed: 702000, goal: 730000, unit: 'kcal' },
      protein: { consumed: 27000, goal: 29200, unit: 'g' },
      carbs: { consumed: 81600, goal: 91250, unit: 'g' },
      fats: { consumed: 19800, goal: 21900, unit: 'g' },
      water: { consumed: 2460, goal: 2920, unit: 'glasses' },
      fiber: { consumed: 9000, goal: 10950, unit: 'g' }
    }
  };

  const weeklyTrend = [
    { day: 'Mon', calories: 1800, protein: 75, carbs: 200, fats: 50 },
    { day: 'Tue', calories: 1950, protein: 72, carbs: 220, fats: 55 },
    { day: 'Wed', calories: 1700, protein: 68, carbs: 185, fats: 48 },
    { day: 'Thu', calories: 2100, protein: 85, carbs: 240, fats: 60 },
    { day: 'Fri', calories: 1850, protein: 70, carbs: 210, fats: 52 },
    { day: 'Sat', calories: 2200, protein: 90, carbs: 260, fats: 65 },
    { day: 'Sun', calories: 1900, protein: 80, carbs: 225, fats: 58 }
  ];

  const currentData = nutritionData[timeFilter];

  const getPercentage = (consumed, goal) => {
    return Math.min((consumed / goal) * 100, 100);
  };

  const getStatusColor = (consumed, goal) => {
    const percentage = (consumed / goal) * 100;
    if (percentage >= 90) return 'green';
    if (percentage >= 70) return 'orange';
    return 'red';
  };

  const handleAddMeal = (e) => {
    e.preventDefault();
    const itemsArray = newMeal.items.split(',').map(item => item.trim());
    const newMealEntry = {
      id: mealLog.length + 1,
      meal: newMeal.meal,
      time: newMeal.time,
      items: itemsArray,
      calories: parseInt(newMeal.calories),
      protein: parseInt(newMeal.protein),
      carbs: parseInt(newMeal.carbs),
      fats: parseInt(newMeal.fats),
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
    };
    setMealLog([...mealLog, newMealEntry]);
    setShowAddMealModal(false);
    setNewMeal({
      meal: '',
      time: '',
      items: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: ''
    });
  };

  const handleAddFood = (e) => {
    e.preventDefault();
    const food = {
      id: foodConsumed.length + 1,
      name: newFood.name,
      quantity: newFood.quantity,
      calories: parseInt(newFood.calories),
      time: newFood.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setFoodConsumed([...foodConsumed, food]);
    setShowAddFoodModal(false);
    setNewFood({ name: '', quantity: '', calories: '', time: '' });
  };

  const handleDeleteFood = (id) => {
    setFoodConsumed(foodConsumed.filter(food => food.id !== id));
  };

  return (
    <div className="nutrition-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Daily Nutrition Tracker</h1>
          <p className="page-subtitle">Track your calories, protein, carbs and more</p>
        </div>
        <div className="header-actions">
          <input 
            type="date" 
            className="date-picker"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* Time Filter */}
      <div className="time-filter-section">
        <div className="time-filter">
          <button 
            onClick={() => setTimeFilter('daily')}
            className={`filter-btn ${timeFilter === 'daily' ? 'active' : ''}`}
          >
            Daily
          </button>
          <button 
            onClick={() => setTimeFilter('weekly')}
            className={`filter-btn ${timeFilter === 'weekly' ? 'active' : ''}`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setTimeFilter('monthly')}
            className={`filter-btn ${timeFilter === 'monthly' ? 'active' : ''}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setTimeFilter('yearly')}
            className={`filter-btn ${timeFilter === 'yearly' ? 'active' : ''}`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Nutrition Summary Cards */}
      <div className="nutrition-grid">
        <div className="nutrition-card calories">
          <div className="card-header">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13.5 2c-1.4 0-2.7.5-3.7 1.3L4.4 8.2C3.5 9 3 10.1 3 11.3v9.4c0 1.2 1 2.2 2.2 2.2h13.6c1.2 0 2.2-1 2.2-2.2v-9.4c0-1.2-.5-2.3-1.4-3.1l-5.4-4.9c-1-0.8-2.3-1.3-3.7-1.3z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <p className="card-label">Calories</p>
              <h3 className="card-value">{currentData.calories.consumed.toLocaleString()}<span className="card-unit">/{currentData.calories.goal.toLocaleString()} {currentData.calories.unit}</span></h3>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill calories" style={{width: `${getPercentage(currentData.calories.consumed, currentData.calories.goal)}%`}}></div>
          </div>
          <p className="card-footer">{getPercentage(currentData.calories.consumed, currentData.calories.goal).toFixed(0)}% of daily goal</p>
        </div>

        <div className="nutrition-card protein">
          <div className="card-header">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="card-label">Protein</p>
              <h3 className="card-value">{currentData.protein.consumed}<span className="card-unit">/{currentData.protein.goal} {currentData.protein.unit}</span></h3>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill protein" style={{width: `${getPercentage(currentData.protein.consumed, currentData.protein.goal)}%`}}></div>
          </div>
          <p className="card-footer">{getPercentage(currentData.protein.consumed, currentData.protein.goal).toFixed(0)}% of daily goal</p>
        </div>

        <div className="nutrition-card carbs">
          <div className="card-header">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <p className="card-label">Carbs</p>
              <h3 className="card-value">{currentData.carbs.consumed}<span className="card-unit">/{currentData.carbs.goal} {currentData.carbs.unit}</span></h3>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill carbs" style={{width: `${getPercentage(currentData.carbs.consumed, currentData.carbs.goal)}%`}}></div>
          </div>
          <p className="card-footer">{getPercentage(currentData.carbs.consumed, currentData.carbs.goal).toFixed(0)}% of daily goal</p>
        </div>

        <div className="nutrition-card fats">
          <div className="card-header">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <p className="card-label">Fats</p>
              <h3 className="card-value">{currentData.fats.consumed}<span className="card-unit">/{currentData.fats.goal} {currentData.fats.unit}</span></h3>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill fats" style={{width: `${getPercentage(currentData.fats.consumed, currentData.fats.goal)}%`}}></div>
          </div>
          <p className="card-footer">{getPercentage(currentData.fats.consumed, currentData.fats.goal).toFixed(0)}% of daily goal</p>
        </div>

        <div className="nutrition-card water">
          <div className="card-header">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <p className="card-label">Water</p>
              <h3 className="card-value">{currentData.water.consumed}<span className="card-unit">/{currentData.water.goal} {currentData.water.unit}</span></h3>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill water" style={{width: `${getPercentage(currentData.water.consumed, currentData.water.goal)}%`}}></div>
          </div>
          <p className="card-footer">{getPercentage(currentData.water.consumed, currentData.water.goal).toFixed(0)}% of daily goal</p>
        </div>

        <div className="nutrition-card fiber">
          <div className="card-header">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <p className="card-label">Fiber</p>
              <h3 className="card-value">{currentData.fiber.consumed}<span className="card-unit">/{currentData.fiber.goal} {currentData.fiber.unit}</span></h3>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill fiber" style={{width: `${getPercentage(currentData.fiber.consumed, currentData.fiber.goal)}%`}}></div>
          </div>
          <p className="card-footer">{getPercentage(currentData.fiber.consumed, currentData.fiber.goal).toFixed(0)}% of daily goal</p>
        </div>
      </div>

      {/* Food Consumed Today Section */}
      {timeFilter === 'daily' && (
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Food Consumed Today</h2>
            <button className="add-btn" onClick={() => setShowAddFoodModal(true)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Add Food
            </button>
          </div>
          <div className="food-list">
            {foodConsumed.map(food => (
              <div key={food.id} className="food-item">
                <div className="food-details">
                  <div className="food-main">
                    <h4 className="food-name">{food.name}</h4>
                    <span className="food-quantity">{food.quantity}</span>
                  </div>
                  <div className="food-meta">
                    <span className="food-calories">{food.calories} cal</span>
                    <span className="food-time">{food.time}</span>
                  </div>
                </div>
                <button 
                  className="delete-food-btn" 
                  onClick={() => handleDeleteFood(food.id)}
                  title="Remove"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ))}
            {foodConsumed.length === 0 && (
              <div className="empty-state">
                <p>No food items logged yet. Click "Add Food" to start tracking!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Meal Log (only for daily view) */}
      {timeFilter === 'daily' && (
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Today's Meals</h2>
            <button className="add-btn" onClick={() => setShowAddMealModal(true)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Add Meal
            </button>
          </div>

          <div className="meal-log">
            {mealLog.map(meal => (
              <div key={meal.id} className="meal-card">
                <div className="meal-image">
                  <img src={meal.image} alt={meal.meal} />
                </div>
                <div className="meal-info">
                  <div className="meal-header">
                    <h4 className="meal-name">{meal.meal}</h4>
                    <span className="meal-time">{meal.time}</span>
                  </div>
                  <div className="meal-items">
                    {meal.items.map((item, idx) => (
                      <span key={idx} className="meal-item-tag">{item}</span>
                    ))}
                  </div>
                  <div className="meal-macros">
                    <div className="macro">
                      <span className="macro-value">{meal.calories}</span>
                      <span className="macro-label">cal</span>
                    </div>
                    <div className="macro">
                      <span className="macro-value">{meal.protein}g</span>
                      <span className="macro-label">protein</span>
                    </div>
                    <div className="macro">
                      <span className="macro-value">{meal.carbs}g</span>
                      <span className="macro-label">carbs</span>
                    </div>
                    <div className="macro">
                      <span className="macro-value">{meal.fats}g</span>
                      <span className="macro-label">fats</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Trend Chart */}
      {timeFilter === 'weekly' && (
        <div className="section-container">
          <h2 className="section-title">Weekly Trend</h2>
          <div className="weekly-chart">
            {weeklyTrend.map((day, idx) => (
              <div key={idx} className="chart-day">
                <div className="chart-bars">
                  <div 
                    className="chart-bar calories" 
                    style={{height: `${(day.calories / 2500) * 100}%`}}
                    title={`${day.calories} cal`}
                  ></div>
                  <div 
                    className="chart-bar protein" 
                    style={{height: `${(day.protein / 100) * 100}%`}}
                    title={`${day.protein}g protein`}
                  ></div>
                  <div 
                    className="chart-bar carbs" 
                    style={{height: `${(day.carbs / 300) * 100}%`}}
                    title={`${day.carbs}g carbs`}
                  ></div>
                </div>
                <span className="chart-label">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <span className="legend-color calories"></span>
              <span>Calories</span>
            </div>
            <div className="legend-item">
              <span className="legend-color protein"></span>
              <span>Protein</span>
            </div>
            <div className="legend-item">
              <span className="legend-color carbs"></span>
              <span>Carbs</span>
            </div>
          </div>
        </div>
      )}

      {/* Nutritional Insights */}
      <div className="section-container">
        <h2 className="section-title">Nutritional Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon success">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <h4>Great Protein Intake</h4>
              <p>You're on track with your protein goals. Keep it up!</p>
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-icon warning">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <h4>Low Water Intake</h4>
              <p>Try to drink 2 more glasses of water today.</p>
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-icon info">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <h4>Balanced Macros</h4>
              <p>Your carbs, protein, and fats ratio is well balanced.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Meal Modal */}
      {showAddMealModal && (
        <div className="modal-overlay" onClick={() => setShowAddMealModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add New Meal</h3>
              <button className="modal-close" onClick={() => setShowAddMealModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <form className="add-form" onSubmit={handleAddMeal}>
                <div className="form-group">
                  <label>Meal Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Breakfast, Lunch, Snack"
                    value={newMeal.meal}
                    onChange={(e) => setNewMeal({...newMeal, meal: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    className="form-input"
                    value={newMeal.time}
                    onChange={(e) => setNewMeal({...newMeal, time: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Food Items (separate with commas)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Eggs, Toast, Orange juice"
                    value={newMeal.items}
                    onChange={(e) => setNewMeal({...newMeal, items: e.target.value})}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Calories</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="kcal"
                      value={newMeal.calories}
                      onChange={(e) => setNewMeal({...newMeal, calories: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Protein (g)</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="grams"
                      value={newMeal.protein}
                      onChange={(e) => setNewMeal({...newMeal, protein: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Carbs (g)</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="grams"
                      value={newMeal.carbs}
                      onChange={(e) => setNewMeal({...newMeal, carbs: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Fats (g)</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="grams"
                      value={newMeal.fats}
                      onChange={(e) => setNewMeal({...newMeal, fats: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary">Add Meal</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Food Modal */}
      {showAddFoodModal && (
        <div className="modal-overlay" onClick={() => setShowAddFoodModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Food Item</h3>
              <button className="modal-close" onClick={() => setShowAddFoodModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <form className="add-form" onSubmit={handleAddFood}>
                <div className="form-group">
                  <label>Food Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Apple, Banana, Salad"
                    value={newFood.name}
                    onChange={(e) => setNewFood({...newFood, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Quantity/Portion</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., 1 medium, 100g, 1 cup"
                    value={newFood.quantity}
                    onChange={(e) => setNewFood({...newFood, quantity: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Calories</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="kcal"
                    value={newFood.calories}
                    onChange={(e) => setNewFood({...newFood, calories: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time (optional)</label>
                  <input
                    type="time"
                    className="form-input"
                    value={newFood.time}
                    onChange={(e) => setNewFood({...newFood, time: e.target.value})}
                  />
                </div>
                <button type="submit" className="btn-primary">Add Food</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyNutrition;
