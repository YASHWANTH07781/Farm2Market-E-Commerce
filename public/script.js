document.addEventListener("DOMContentLoaded", function () {
    let cartCount = 0; // Initialize cart count
    const cartCountElement = document.querySelector(".cart-count"); // Cart count display

    // Function to update the quantity inside the input box
    function updateQuantity(button, increment) {
        const quantityInput = button.parentElement.querySelector(".quantity input");
        let quantity = parseInt(quantityInput.value, 10);

        if (increment) {
            quantity++; // Increase quantity
        } else if (quantity > 1) {
            quantity--; // Decrease quantity, but keep it at least 1
        }

        quantityInput.value = quantity; // Update input box
    }

    // Function to add the displayed quantity to the cart
    function addToCart(button) {
        const productCard = button.closest('li');
        const quantity = parseInt(productCard.querySelector('.quantity-input').value);
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const image = button.getAttribute('data-image');

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: quantity,
                image: image
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Item added to cart!');
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = totalItems;
    }

    // Initialize cart count when page loads
    document.addEventListener('DOMContentLoaded', updateCartCount);

    // Attach event listeners for increment and decrement buttons
    document.querySelectorAll(".quantity button").forEach((button) => {
        button.addEventListener("click", function () {
            updateQuantity(this, this.textContent === "+");
        });
    });

    // Attach event listeners for "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", function () {
            addToCart(this);
        });
    });
});

//smoothly scroll to the Weekly Deals section

document.addEventListener("DOMContentLoaded", () => {
    const shopBtn = document.querySelector(".shop-btn");
    shopBtn.addEventListener("click", () => {
      const weeklyDealsSection = document.getElementById("weekly-deals");
      if (weeklyDealsSection) {
        weeklyDealsSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
  