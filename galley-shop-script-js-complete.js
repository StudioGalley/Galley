// Galley Shop Page - Product Management

// Sample product data - in a real application, this would come from a database
const productData = [
    {
        id: 'print-001',
        title: 'Mountain Landscape Linocut',
        description: 'Limited edition hand-printed linocut (1/50)',
        price: 85.00,
        category: 'Linocuts',
        image: 'https://via.placeholder.com/300x300'
    },
    {
        id: 'print-002',
        title: 'Forest Woodblock Print',
        description: 'Original woodblock print on Japanese paper',
        price: 120.00,
        category: 'Woodblock Prints',
        image: 'https://via.placeholder.com/300x300'
    },
    {
        id: 'print-003',
        title: 'Abstract Etching Series I',
        description: 'Copper plate etching with aquatint (2/25)',
        price: 95.00,
        category: 'Etchings',
        image: 'https://via.placeholder.com/300x300'
    },
    {
        id: 'print-004',
        title: 'Botanical Linocut Print',
        description: 'Hand-carved linocut print on cotton paper',
        price: 75.00,
        category: 'Linocuts',
        image: 'https://via.placeholder.com/300x300'
    },
    {
        id: 'print-005',
        title: 'Cityscape Relief Print',
        description: 'Multi-block relief print (5/30)',
        price: 110.00,
        category: 'Woodblock Prints',
        image: 'https://via.placeholder.com/300x300'
    },
    {
        id: 'print-006',
        title: 'Ocean Waves Drypoint',
        description: 'Drypoint etching on handmade paper',
        price: 135.00,
        category: 'Etchings',
        image: 'https://via.placeholder.com/300x300'
    },
    // Extra products for pagination
    {
        id: 'print-007',
        title: 'Autumn Leaves Linocut',
        description: 'Two-color linocut print on cream paper',
        price: 95.00,
        category: 'Linocuts',
        image: 'https://via.placeholder.com/300x300'
    },
    {
        id: 'print-008',
        title: 'Portrait Woodblock Series',
        description: 'Traditional woodblock print, edition of 15',
        price: 150.00,
        category: 'Woodblock Prints',
        image: 'https://via.placeholder.com/300x300'
    },
    {
        id: 'print-009',
        title: 'Urban Landscape Etching',
        description: 'Detailed etching with drypoint, edition of 20',
        price: 125.00,
        category: 'Etchings',
        image: 'https://via.placeholder.com/300x300'
    },
    {
        id: 'print-010',
        title: 'Geometric Linocut Series',
        description: 'Abstract geometric design, hand-printed',
        price: 80.00,
        category: 'Linocuts',
        image: 'https://via.placeholder.com/300x300'
    },
    {
        id: 'print-011',
        title: 'Floral Woodblock Triptych',
        description: 'Set of three coordinating woodblock prints',
        price: 275.00,
        category: 'Woodblock Prints',
        image: 'https://via.placeholder.com/300x300'
    },
    {
        id: 'print-012',
        title: 'Textural Etching Study',
        description: 'Experimental etching on handmade paper',
        price: 110.00,
        category: 'Etchings',
        image: 'https://via.placeholder.com/300x300'
    }
];

// Shop page specific functionality
class ShopManager {
    constructor() {
        this.products = productData;
        this.productGrid = document.getElementById('product-grid');
        this.categoryFilter = document.getElementById('category-filter');
        this.sortFilter = document.getElementById('sort-filter');
        
        this.currentPage = 1;
        this.productsPerPage = 6;
        this.filteredProducts = [...this.products];
        
        // Initialize
        this.bindEvents();
        this.renderProductPage(this.currentPage);
    }

    bindEvents() {
        if (this.categoryFilter) {
            this.categoryFilter.addEventListener('change', () => {
                this.currentPage = 1;
                this.filterProducts();
            });
        }
        
        if (this.sortFilter) {
            this.sortFilter.addEventListener('change', () => {
                this.sortProducts();
            });
        }
        
        // Pagination
        const paginationLinks = document.querySelectorAll('.pagination a');
        paginationLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (link.textContent === 'Next') {
                    this.currentPage++;
                } else {
                    this.currentPage = parseInt(link.textContent);
                }
                
                // Update active state
                paginationLinks.forEach(l => l.classList.remove('active'));
                if (link.textContent !== 'Next') {
                    link.classList.add('active');
                } else {
                    paginationLinks[this.currentPage - 1].classList.add('active');
                }
                
                this.renderProductPage(this.currentPage);
            });
        });
    }

    filterProducts() {
        const category = this.categoryFilter.value;
        
        if (category === 'All Prints') {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product => product.category === category);
        }
        
        this.renderProductPage(this.currentPage);
    }

    sortProducts() {
        const sortOption = this.sortFilter.value;
        
        switch(sortOption) {
            case 'Price: Low to High':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'Price: High to Low':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'Newest Arrivals':
                // In a real app, you'd sort by date
                // Here we just reverse for demonstration
                this.filteredProducts.reverse();
                break;
        }
        
        this.renderProductPage(this.currentPage);
    }

    renderProductPage(page) {
        if (!this.productGrid) return;
        
        // Clear existing products
        this.productGrid.innerHTML = '';
        
        // Calculate pagination
        const startIndex = (page - 1) * this.productsPerPage;
        const endIndex = Math.min(startIndex + this.productsPerPage, this.filteredProducts.length);
        const currentPageProducts = this.filteredProducts.slice(startIndex, endIndex);
        
        // Render each product
        currentPageProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.productId = product.id;
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-details">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="btn add-to-cart">Add to Cart</button>
                </div>
            `;
            
            this.productGrid.appendChild(productCard);
        });
        
        // Add event listeners to new add to cart buttons
        const addToCartButtons = this.productGrid.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Leverage the CartManager from the main script
                const cartManager = window.cartManager;
                if (cartManager) {
                    cartManager.addToCart(e);
                } else {
                    console.warn('Cart manager not found');
                }
            });
        });
    }
}

// Initialize on DOM Load but only on shop page
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the shop page
    if (document.getElementById('product-grid')) {
        const shopManager = new ShopManager();
        
        // Get reference to the cart manager from the main script
        setTimeout(() => {
            window.cartManager = window.cartManager || document.cartManager;
        }, 100);
    }
});