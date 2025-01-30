class Cart {
  constructor() {
    this.items = [];
    this.cartModal = document.getElementById('cart-modal');
    this.cartToggle = document.getElementById('cart-toggle');
    this.closeCart = document.querySelector('.close-cart');
    this.cartItems = document.getElementById('cart-items');
    this.cartTotalPrice = document.getElementById('cart-total-price');
    this.cartCount = document.getElementById('cart-count');
    this.checkoutBtn = document.getElementById('checkout-btn');

    this.initEventListeners();
  }

  initEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const product = {
          id: productCard.dataset.productId,
          name: productCard.dataset.productName,
          price: parseInt(productCard.dataset.productPrice)
        };
        this.addToCart(product);
      });
    });

    // Cart modal toggle
    this.cartToggle.addEventListener('click', () => this.toggleCart());
    this.closeCart.addEventListener('click', () => this.toggleCart());
    
    // Checkout button
    this.checkoutBtn.addEventListener('click', () => this.checkout());
  }

  addToCart(product) {
    const existingProduct = this.items.find(item => item.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.items.push({...product, quantity: 1});
    }
    
    this.updateCart();
  }

  updateCart() {
    // Clear existing cart items
    this.cartItems.innerHTML = '';
    
    // Populate cart items
    this.items.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
        <span>${item.name} x ${item.quantity}</span>
        <span>$${(item.price * item.quantity).toLocaleString()}</span>
      `;
      this.cartItems.appendChild(cartItemElement);
    });

    // Update total price
    const totalPrice = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    this.cartTotalPrice.textContent = `$${totalPrice.toLocaleString()}`;
    
    // Update cart count
    const totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
    this.cartCount.textContent = totalItems;
  }

  toggleCart() {
    this.cartModal.style.display = 
      this.cartModal.style.display === 'block' ? 'none' : 'block';
  }

  checkout() {
    alert('Gracias por tu compra! Serás redirigido al proceso de pago.');
    this.items = [];
    this.updateCart();
    this.toggleCart();
  }
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', () => {
  new Cart();
});