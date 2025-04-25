 const cars = [
            {
                id: 1,
                name: "Aston Martin DB11",
                brand: "Aston Martin",
                price: "$205,000",
                image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738",
                category: "luxury",
                year: 2025,
                engine: "5.2L V12",
                power: "630 HP",
                topSpeed: "208 mph",
                acceleration: "3.5s",
                description: "The Aston Martin DB11 combines breathtaking performance, exceptional comfort and state-of-the-art aerodynamics. It's the most powerful and efficient DB production model in Aston Martin's history."
            },
            {
                id: 2,
                name: "Ferrari 296 GTB",
                brand: "Ferrari",
                price: "$318,000",
                image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae",
                category: "sports",
                year: 2025,
                engine: "3.0L V6 Hybrid",
                power: "830 HP",
                topSpeed: "205 mph",
                acceleration: "2.9s",
                description: "The Ferrari 296 GTB redefines the concept of fun behind the wheel, guaranteeing pure emotions not just when pushing the car to its limits, but also in day-to-day driving situations."
            },
            {
                id: 3,
                name: "Mercedes-Benz EQS",
                brand: "Mercedes-Benz",
                price: "$125,000",
                image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8",
                category: "electric",
                year: 2025,
                engine: "Electric",
                power: "516 HP",
                topSpeed: "155 mph",
                acceleration: "4.1s",
                description: "The Mercedes-Benz EQS is the first all-electric luxury sedan from Mercedes-EQ. With ranges up to 350 miles and revolutionary MBUX Hyperscreen, it represents the future of electric mobility."
            },
            {
                id: 4,
                name: "Range Rover Sport",
                brand: "Land Rover",
                price: "$83,000",
                image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
                category: "suv",
                year: 2025,
                engine: "3.0L I6",
                power: "395 HP",
                topSpeed: "150 mph",
                acceleration: "5.5s",
                description: "The Range Rover Sport is the most dynamic member of the Range Rover family, combining luxury and performance with all-terrain capability and modern design."
            },
            {
                id: 5,
                name: "Porsche 911 Turbo S",
                brand: "Porsche",
                price: "$216,000",
                image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
                category: "sports",
                year: 2025,
                engine: "3.8L Twin-Turbo",
                power: "640 HP",
                topSpeed: "205 mph",
                acceleration: "2.6s",
                description: "The Porsche 911 Turbo S represents the pinnacle of the 911 model range, delivering exhilarating performance, precision handling, and everyday usability."
            },
            {
                id: 6,
                name: "Bentley Continental GT",
                brand: "Bentley",
                price: "$235,000",
                image: "https://images.unsplash.com/photo-1693722973898-b0f5b6f1e61d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                category: "luxury",
                year: 2025,
                engine: "6.0L W12",
                power: "650 HP",
                topSpeed: "208 mph",
                acceleration: "3.5s",
                description: "The Bentley Continental GT represents the pinnacle of British luxury grand touring, combining handcrafted excellence with cutting-edge technology."
            },
            {
                id: 7,
                name: "Tesla Model S Plaid",
                brand: "Tesla",
                price: "$129,990",
                image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771",
                category: "electric",
                year: 2025,
                engine: "Electric",
                power: "1020 HP",
                topSpeed: "200 mph",
                acceleration: "1.99s",
                description: "The Tesla Model S Plaid is the highest performing sedan ever built, with unmatched power and advanced autonomous capabilities."
            }
        ];


        const testimonials = [
    {
        text: "Luxury Motors provided me with an incredible car buying experience. Their knowledge and attention to detail made finding my dream car effortless. I couldn't be happier with my purchase!",
        author: "Michael Johnson"
    },
    {
        text: "I was impressed by the selection and quality of vehicles at Luxury Motors. The team was professional, transparent, and helped me find the perfect car that fits my lifestyle and budget.",
        author: "Sarah Thompson"
    },
    {
        text: "After visiting several dealerships, Luxury Motors stood out with their exceptional service and premium collection. The process was smooth, and I'm thrilled with my new luxury sedan!",
        author: "David Rodriguez"
    },
    {
        text: "The expertise and professionalism at Luxury Motors are unmatched. They made my dream of owning a high-performance vehicle a reality. Exceptional service from start to finish!",
        author: "Emma Williams"
    }
]

    
    // DOM Elements
        const carsGrid = document.getElementById('carsGrid');
        const categoryTabs = document.getElementById('categoryTabs');
        const categoryCars = document.getElementById('categoryCars');
        const carModal = document.getElementById('carModal');
        const modalClose = document.getElementById('modalClose');
        const carDetail = document.getElementById('carDetail');
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        const backToTop = document.getElementById('backToTop');
        const testimonialSlider = document.getElementById('testimonialSlider');
        let currentTestimonialIndex = 0;

        function renderTestimonial(index) {
    const testimonial = testimonials[index];
    testimonialSlider.innerHTML = `
        <div class="testimonial active">
            <p class="testimonial-text">"${testimonial.text}"</p>
            <p class="testimonial-author">- ${testimonial.author}</p>
        </div>
        <div class="slider-controls">
            <button class="slider-btn" id="prevBtn">❮</button>
            <button class="slider-btn" id="nextBtn">❯</button>
        </div>
    `;
    
    // Reattach event listeners after rendering
    document.getElementById("prevBtn").addEventListener('click', showPreviousTestimonial);
    document.getElementById("nextBtn").addEventListener('click', showNextTestimonial);
}

function showNextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    renderTestimonial(currentTestimonialIndex);
}

function showPreviousTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial(currentTestimonialIndex);
}

        // Functions
        function createCarCard(car) {
            return `
                <div class="car-card" data-id="${car.id}">
                    <div class="car-image">
                        <img src="${car.image}" alt="${car.name}">
                    </div>
                    <div class="car-info">
                        <p class="car-brand">${car.brand}</p>
                        <h3 class="car-name">${car.name}</h3>
                        <p class="car-price">${car.price}</p>
                        <div class="car-details">
                            <div class="car-spec">
                                <p>${car.power}</p>
                                <small>Power</small>
                            </div>
                            <div class="car-spec">
                                <p>${car.acceleration}</p>
                                <small>0-60 mph</small>
                            </div>
                            <div class="car-spec">
                                <p>${car.topSpeed}</p>
                                <small>Top Speed</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        function showCarDetails(carId) {
            const car = cars.find(c => c.id === parseInt(carId));
            if (!car) return;

            carDetail.innerHTML = `
                <div class="car-detail-image">
                    <img src="${car.image}" alt="${car.name}">
                </div>
                <div class="car-detail-info">
                    <h2 class="car-detail-name">${car.name}</h2>
                    <p class="car-detail-price">${car.price}</p>
                    <div class="car-detail-specs">
                        <div class="car-detail-spec">
                            Engine
                            <span>${car.engine}</span>
                        </div>
                        <div class="car-detail-spec">
                            Power
                            <span>${car.power}</span>
                        </div>
                        <div class="car-detail-spec">
                            0-60 mph
                            <span>${car.acceleration}</span>
                        </div>
                        <div class="car-detail-spec">
                            Top Speed
                            <span>${car.topSpeed}</span>
                        </div>
                    </div>
                    <p>${car.description}</p>
                    <a href="#contact" class="btn" onclick="carModal.classList.remove('active')">Inquire Now</a>
                </div>
            `;
            carModal.classList.add('active');
        }

        function filterCars(category) {
            const filteredCars = category === 'all' 
                ? cars 
                : cars.filter(car => car.category === category);
            
            categoryCars.innerHTML = filteredCars.map(createCarCard).join('');
        }

        // Event Listeners
        document.addEventListener('DOMContentLoaded', () => {
            carsGrid.innerHTML = cars.slice(0, 4).map(createCarCard).join('');
            filterCars('all');
            renderTestimonial(currentTestimonialIndex);
        });

        categoryTabs.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-tab')) {
                categoryTabs.querySelectorAll('.category-tab').forEach(tab => 
                    tab.classList.remove('active'));
                e.target.classList.add('active');
                filterCars(e.target.dataset.category);
            }
        });

        document.addEventListener('click', (e) => {
            const carCard = e.target.closest('.car-card');
            if (carCard) {
                showCarDetails(carCard.dataset.id);
            }
        });

        modalClose.addEventListener('click', () => {
            carModal.classList.remove('active');
        });

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });