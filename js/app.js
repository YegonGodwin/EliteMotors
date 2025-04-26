// Sample car data (in a real application, this would come from a backend)
const cars = [
    {
        id: 1,
        make: 'Toyota',
        model: 'Camry',
        year: 2023,
        price: 25000,
        image: 'images/camry.jpg',
        specs: {
            mileage: '0',
            transmission: 'Automatic',
            fuelType: 'Petrol'
        },
        rating: 4.5
    },
    // More cars would be added here
];

// AI Recommendation System (simplified version)
class RecommendationEngine {
    constructor(cars) {
        this.cars = cars;
    }

    getRecommendations(userPreferences = {}) {
        // In a real application, this would use machine learning
        // For now, we'll just return random cars
        return this.cars
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
    }
}

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCars = cars.filter(car => 
        car.make.toLowerCase().includes(searchTerm) ||
        car.model.toLowerCase().includes(searchTerm)
    );
    displayCars(filteredCars);
});

// Display cars in the grid
function displayCars(carsToDisplay = cars) {
    const carsGrid = document.querySelector('.cars-grid');
    carsGrid.innerHTML = carsToDisplay.map(car => `
        <div class="car-card">
            <img src="${car.image}" alt="${car.make} ${car.model}" class="car-image">
            <div class="car-details">
                <h3>${car.make} ${car.model} ${car.year}</h3>
                <p class="price">$${car.price.toLocaleString()}</p>
                <div class="specs">
                    <span><i class="fas fa-tachometer-alt"></i> ${car.specs.mileage}</span>
                    <span><i class="fas fa-cog"></i> ${car.specs.transmission}</span>
                    <span><i class="fas fa-gas-pump"></i> ${car.specs.fuelType}</span>
                </div>
                <div class="rating">
                    ${generateStarRating(car.rating)}
                </div>
                <button onclick="showCarDetails(${car.id})" class="view-details">View Details</button>
            </div>
        </div>
    `).join('');
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    return starsHTML;
}

// Show car details (modal)
function showCarDetails(carId) {
    const car = cars.find(c => c.id === carId);
    if (!car) return;

    // Create and show modal (implementation would go here)
    alert(`Showing details for ${car.make} ${car.model}`);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    displayCars();
    
    // Initialize recommendation engine
    const recommendationEngine = new RecommendationEngine(cars);
    const recommendations = recommendationEngine.getRecommendations();
    
    // Display recommendations (implementation would go here)
});
