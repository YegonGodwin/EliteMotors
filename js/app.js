// Sample car data (in a real application, this would come from a backend)
const cars = [
    {
        id: 1,
        make: 'Toyota',
        model: 'Camry',
        year: 2023,
        price: 25000,
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
        description: 'The all-new Toyota Camry redefines sophistication with its bold design and premium features. Experience unmatched comfort and advanced safety technology.',
        specs: {
            mileage: '0',
            transmission: 'Automatic',
            fuelType: 'Petrol',
            engine: '2.5L 4-Cylinder',
            power: '203 hp',
            acceleration: '7.5 sec 0-60 mph'
        },
        rating: 4.5
    },
    {
        id: 2,
        make: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2023,
        price: 45000,
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
        description: 'Luxury meets performance in the new Mercedes-Benz C-Class. With its elegant design and cutting-edge technology, it sets new standards in its class.',
        specs: {
            mileage: '0',
            transmission: 'Automatic',
            fuelType: 'Petrol',
            engine: '2.0L Turbo',
            power: '255 hp',
            acceleration: '5.9 sec 0-60 mph'
        },
        rating: 4.8
    },
    {
        id: 3,
        make: 'BMW',
        model: '3 Series',
        year: 2023,
        price: 43000,
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
        description: 'The BMW 3 Series combines dynamic performance with luxurious comfort. Its innovative features and sporty handling make every drive exceptional.',
        specs: {
            mileage: '0',
            transmission: 'Automatic',
            fuelType: 'Petrol',
            engine: '2.0L TwinPower Turbo',
            power: '248 hp',
            acceleration: '5.6 sec 0-60 mph'
        },
        rating: 4.7
    }
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
        <div class="car-card" data-aos="fade-up">
            <div class="car-image-container">
                <img src="${car.image}" alt="${car.make} ${car.model}" class="car-image">
                <div class="car-overlay">
                    <button onclick="showCarDetails(${car.id})" class="view-details">View Details</button>
                    <button onclick="reserveCar(${car.id}, event)" class="reserve-button">Reserve Now</button>
                </div>
            </div>
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
                <p class="car-description">${car.description.substring(0, 100)}...</p>
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

    // Create modal if it doesn't exist
    let modal = document.getElementById('carModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'carModal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    // Update modal content
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-grid">
                <div class="modal-image">
                    <img src="${car.image}" alt="${car.make} ${car.model}">
                </div>
                <div class="modal-details">
                    <h2>${car.make} ${car.model} ${car.year}</h2>
                    <div class="modal-rating">${generateStarRating(car.rating)}</div>
                    <p class="modal-price">$${car.price.toLocaleString()}</p>
                    <p class="modal-description">${car.description}</p>
                    <div class="modal-specs">
                        <h3>Specifications</h3>
                        <div class="specs-grid">
                            <div class="spec-item">
                                <i class="fas fa-tachometer-alt"></i>
                                <span>Mileage: ${car.specs.mileage}</span>
                            </div>
                            <div class="spec-item">
                                <i class="fas fa-cog"></i>
                                <span>Transmission: ${car.specs.transmission}</span>
                            </div>
                            <div class="spec-item">
                                <i class="fas fa-gas-pump"></i>
                                <span>Fuel Type: ${car.specs.fuelType}</span>
                            </div>
                            <div class="spec-item">
                                <i class="fas fa-engine"></i>
                                <span>Engine: ${car.specs.engine}</span>
                            </div>
                            <div class="spec-item">
                                <i class="fas fa-horse"></i>
                                <span>Power: ${car.specs.power}</span>
                            </div>
                            <div class="spec-item">
                                <i class="fas fa-tachometer"></i>
                                <span>0-60 mph: ${car.specs.acceleration}</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="cta-button primary" onclick="reserveCar(${car.id}, event)">Reserve This Car</button>
                        <button class="cta-button secondary">Schedule Test Drive</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Show modal with animation
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    };

    // Close modal when clicking outside
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    };
}

// Reserve car functionality
function reserveCar(carId, event) {
    event.stopPropagation(); // Prevent modal from opening when clicking reserve button in card
    const car = cars.find(c => c.id === carId);
    if (!car) return;

    // Create reservation modal
    const reservationModal = document.createElement('div');
    reservationModal.className = 'modal reservation-modal';
    reservationModal.innerHTML = `
        <div class="modal-content reservation-content">
            <span class="close-modal">&times;</span>
            <h2>Reserve ${car.make} ${car.model} ${car.year}</h2>
            <form id="reservationForm" class="reservation-form">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" required>
                </div>
                <div class="form-group">
                    <label for="date">Preferred Date</label>
                    <input type="date" id="date" required min="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label for="message">Additional Notes</label>
                    <textarea id="message" rows="3"></textarea>
                </div>
                <button type="submit" class="cta-button primary">Confirm Reservation</button>
            </form>
        </div>
    `;

    document.body.appendChild(reservationModal);

    // Show modal with animation
    reservationModal.style.display = 'flex';
    setTimeout(() => reservationModal.classList.add('show'), 10);

    // Handle form submission
    const form = reservationModal.querySelector('#reservationForm');
    form.onsubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        alert('Reservation submitted successfully! We will contact you shortly.');
        reservationModal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(reservationModal);
        }, 300);
    };

    // Close modal functionality
    const closeBtn = reservationModal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        reservationModal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(reservationModal);
        }, 300);
    };

    // Close on outside click
    reservationModal.onclick = (e) => {
        if (e.target === reservationModal) {
            reservationModal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(reservationModal);
            }, 300);
        }
    };
}

// Handle navigation
function handleNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scroll to section
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Update active link on scroll
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100; // Offset for header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial check
}

// Handle contact form submission
function handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the form data to your backend
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    displayCars();
    
    // Initialize recommendation engine
    const recommendationEngine = new RecommendationEngine(cars);
    const recommendations = recommendationEngine.getRecommendations();
    
    // Display recommendations (implementation would go here)
    
    // Initialize navigation
    handleNavigation();
    
    // Initialize contact form
    handleContactForm();
});
