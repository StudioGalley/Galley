// Galley Website - Main JavaScript Functionality

// Cart Management System
class CartManager {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.cartCount = document.getElementById('cart-count');
        this.cartDrawer = document.getElementById('cart-drawer');
        this.cartItemsContainer = document.querySelector('.cart-items');
        this.cartTotal = document.querySelector('.cart-total');
        this.updateCartCount();
        this.bindEvents();
    }

    bindEvents() {
        // Cart Icon Toggle
        const cartIcon = document.getElementById('cart-icon');
        const closeCartBtn = document.querySelector('.close-cart');
        
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            this.openCartDrawer();
        });
        
        closeCartBtn.addEventListener('click', () => this.closeCartDrawer());

        // Add to Cart Buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => this.addToCart(e));
        });
    }

    updateCartCount() {
        this.cartCount.textContent = this.items.length;
        this.renderCartItems();
    }

    addToCart(e) {
        const productCard = e.target.closest('.product-card');
        const product = {
            id: productCard.dataset.productId,
            title: productCard.querySelector('.product-title').textContent,
            price: parseFloat(productCard.querySelector('.product-price').textContent.replace('$', '')),
            quantity: 1
        };

        // Check if product already exists in cart
        const existingProduct = this.items.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            this.items.push(product);
        }

        this.saveCart();
        this.updateCartCount();
    }

    removeFromCart(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
    }

    saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }

    renderCartItems() {
        if (!this.cartItemsContainer) return;

        this.cartItemsContainer.innerHTML = '';
        let total = 0;

        this.items.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div class="cart-item-image"></div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn increase">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `;

            // Quantity adjustment
            const decreaseBtn = cartItemElement.querySelector('.decrease');
            const increaseBtn = cartItemElement.querySelector('.increase');
            const quantityDisplay = cartItemElement.querySelector('.quantity-display');
            const removeBtn = cartItemElement.querySelector('.remove-item');

            decreaseBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    quantityDisplay.textContent = item.quantity;
                    this.saveCart();
                    this.updateCartCount();
                }
            });

            increaseBtn.addEventListener('click', () => {
                item.quantity++;
                quantityDisplay.textContent = item.quantity;
                this.saveCart();
                this.updateCartCount();
            });

            removeBtn.addEventListener('click', () => {
                this.removeFromCart(item.id);
            });

            total += item.price * item.quantity;
            this.cartItemsContainer.appendChild(cartItemElement);
        });

        // Update total
        if (this.cartTotal) {
            this.cartTotal.innerHTML = `
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            `;
        }
    }

    openCartDrawer() {
        this.cartDrawer.classList.add('open');
    }

    closeCartDrawer() {
        this.cartDrawer.classList.remove('open');
    }
}

// Portfolio Modal Management
class PortfolioManager {
    constructor() {
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.modal = document.getElementById('portfolio-modal');
        if (!this.modal) return; // Skip initialization if not on portfolio page
        
        this.modalContent = document.querySelector('.modal-content');
        this.bindEvents();
    }

    bindEvents() {
        if (!this.portfolioItems.length || !this.modal) return;
        
        this.portfolioItems.forEach(item => {
            item.addEventListener('click', () => this.openModal(item));
        });
        
        // Close on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    openModal(item) {
        const projectTitle = item.querySelector('h3').textContent;
        const projectTags = item.querySelector('.portfolio-tags').textContent;
        const projectDescription = item.dataset.description || 'Project details coming soon.';

        this.modalContent.innerHTML = `
            <div class="close-modal">&times;</div>
            <div class="modal-header">
                <h2>${projectTitle}</h2>
                <div class="portfolio-tags">${projectTags}</div>
            </div>
            <div class="modal-body">
                <div class="project-info">
                    <div class="project-metadata">
                        <h3>Project Details</h3>
                        <ul>
                            <li><strong>Client:</strong> ${item.dataset.client || 'Personal Project'}</li>
                            <li><strong>Year:</strong> ${item.dataset.year || '2024'}</li>
                            <li><strong>Services:</strong> ${item.dataset.services || 'Design'}</li>
                        </ul>
                    </div>
                    <div class="project-description">
                        <p>${projectDescription}</p>
                    </div>
                </div>
                <div class="project-images">
                    <img src="${item.querySelector('img').src}" alt="${projectTitle}">
                </div>
            </div>
        `;

        this.modal.style.display = 'block';
        this.bindModalCloseEvent();
    }

    bindModalCloseEvent() {
        const newCloseModal = this.modal.querySelector('.close-modal');
        newCloseModal.addEventListener('click', () => this.closeModal());
    }

    closeModal() {
        this.modal.style.display = 'none';
    }
}

// Navigation Toggle for Mobile
class NavigationManager {
    constructor() {
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        
        this.bindEvents();
    }

    bindEvents() {
        this.navToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.navToggle.querySelector('i').classList.toggle('fa-bars');
            this.navToggle.querySelector('i').classList.toggle('fa-times');
        });
    }
}

// Newsletter Signup (Basic Client-Side Validation)
class NewsletterSignup {
    constructor() {
        this.form = document.querySelector('.newsletter-form');
        if (this.form) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = this.form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (this.validateEmail(email)) {
                this.submitSignup(email);
                emailInput.value = '';
                alert('Thank you for subscribing!');
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    submitSignup(email) {
        // In a real-world scenario, you'd send this to a backend
        console.log(`Signup email: ${email}`);
        // Placeholder for actual newsletter signup logic
    }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    new CartManager();
    new PortfolioManager();
    new NavigationManager();
    new NewsletterSignup();
});