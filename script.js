// DATA LAYER - RIT-area restaurant database
const restaurants = [
    // Cheap eats ($) - Quick & student-friendly
    { name: "RIT Dining Halls", budget: "cheap", emoji: "🍽️", location: "On campus" },
    { name: "Taco Bell", budget: "cheap", emoji: "🌮", location: "Jefferson Rd" },
    { name: "McDonald's", budget: "cheap", emoji: "🍟", location: "Jefferson Rd" },
    { name: "Subway", budget: "cheap", emoji: "🥪", location: "Multiple locations" },
    { name: "Domino's", budget: "cheap", emoji: "🍕", location: "Delivery to campus" },
    { name: "Tim Hortons", budget: "cheap", emoji: "☕", location: "Henrietta" },
    { name: "Wegmans Food Court", budget: "cheap", emoji: "🛒", location: "Calkins Rd" },
    { name: "Five Guys", budget: "cheap", emoji: "🍔", location: "Marketplace Mall" },
    
    // Mid-range ($) - RIT student favorites
    { name: "MacGregor's Grill & Tap", budget: "mid", emoji: "🍺", location: "Jefferson Rd" },
    { name: "Mecate Mexican Restaurant", budget: "mid", emoji: "🌮", location: "Park Point" },
    { name: "Royal of India", budget: "mid", emoji: "🍛", location: "Park Point" },
    { name: "Lovin' Cup Bistro", budget: "mid", emoji: "☕", location: "Park Point" },
    { name: "The King & I Thai", budget: "mid", emoji: "🍜", location: "Henrietta" },
    { name: "Chipotle", budget: "mid", emoji: "🌯", location: "Marketplace Mall" },
    { name: "Buffalo Wild Wings", budget: "mid", emoji: "🔥", location: "Jefferson Rd" },
    { name: "Panera Bread", budget: "mid", emoji: "🥖", location: "Multiple locations" },
    { name: "The Distillery", budget: "mid", emoji: "🍻", location: "Mount Hope Ave" },
    
    // Fancy ($$) - Special occasions & dates
    { name: "Dinosaur Bar-B-Que", budget: "fancy", emoji: "🍖", location: "Downtown Rochester" },
    { name: "Next Door by Wegmans", budget: "fancy", emoji: "🍣", location: "Pittsford" },
    { name: "Char Steak & Lounge", budget: "fancy", emoji: "🥩", location: "Downtown Rochester" },
    { name: "The Revelry", budget: "fancy", emoji: "🍷", location: "Downtown Rochester" },
    { name: "Chester's Chophouse", budget: "fancy", emoji: "🥩", location: "Rochester" },
    { name: "The Strathallan Hotel", budget: "fancy", emoji: "🏨", location: "Downtown Rochester" }
];

// Get DOM elements
const pickBtn = document.getElementById('pickBtn');
const resultDisplay = document.getElementById('result');
const budgetSelect = document.getElementById('budget');

// PROCESSING LAYER - Business logic functions
function filterRestaurantsByBudget(budget) {
    if (budget === 'all') {
        return restaurants;
    }
    return restaurants.filter(restaurant => restaurant.budget === budget);
}

function getRandomRestaurant(restaurantList) {
    const randomIndex = Math.floor(Math.random() * restaurantList.length);
    return restaurantList[randomIndex];
}

function getBudgetSymbol(budget) {
    const symbols = {
        'cheap': '$',
        'mid': '$$', 
        'fancy': '$$$'
    };
    return symbols[budget] || '';
}

function animateSelection() {
    const messages = [
        "🤔 Thinking...",
        "🎲 Rolling the dice...", 
        "🔍 Searching for options...",
        "✨ Almost there..."
    ];
    
    let messageIndex = 0;
    const interval = setInterval(() => {
        resultDisplay.innerHTML = `<p>${messages[messageIndex]}</p>`;
        messageIndex = (messageIndex + 1) % messages.length;
    }, 300);
    
    return interval;
}

// USER INTERFACE LAYER - DOM manipulation and events
function displayResult(restaurant) {
    const budgetSymbol = getBudgetSymbol(restaurant.budget);
    
    resultDisplay.innerHTML = `
        <div class="result-emoji">${restaurant.emoji}</div>
        <div class="result-name">${restaurant.name}</div>
        <div class="result-meta">${restaurant.location}<span class="price">${budgetSymbol}</span></div>
    `;
    
    // Remove picking animation class
    resultDisplay.classList.remove('picking');
}

function showError(message) {
    resultDisplay.innerHTML = `
        <div class="result-emoji">😅</div>
        <div class="result-meta">${message}</div>
    `;
    resultDisplay.classList.remove('picking');
}

// Main picking function
function pickRestaurant() {
    // Get selected budget
    const selectedBudget = budgetSelect.value;
    
    // Filter restaurants
    const availableRestaurants = filterRestaurantsByBudget(selectedBudget);
    
    // Check if any restaurants match the criteria
    if (availableRestaurants.length === 0) {
        showError("No restaurants found for that budget!");
        return;
    }
    
    // Disable button and start animation
    pickBtn.disabled = true;
    resultDisplay.classList.add('picking');
    
    // Start selection animation
    const animationInterval = animateSelection();
    
    // After 2 seconds, show result
    setTimeout(() => {
        clearInterval(animationInterval);
        
        // Pick random restaurant
        const chosenRestaurant = getRandomRestaurant(availableRestaurants);
        
        // Display result
        displayResult(chosenRestaurant);
        
        // Re-enable button
        pickBtn.disabled = false;
        
    }, 2000);
}

// Event listeners
pickBtn.addEventListener('click', pickRestaurant);

// Optional: Pick automatically when budget changes
budgetSelect.addEventListener('change', () => {
    resultDisplay.innerHTML = '<p>Budget updated! Click the button to discover a local spot.</p>';
    resultDisplay.classList.remove('picking');
});

// Initialize with a fun message
document.addEventListener('DOMContentLoaded', () => {
    console.log('🍕 RIT Restaurant Picker loaded!');
    console.log('Data Layer: Loaded', restaurants.length, 'local Rochester restaurants');
    console.log('Processing Layer: Ready for random selection');
    console.log('UI Layer: Event listeners attached');
});
