document.addEventListener("DOMContentLoaded", () => {
  // This array holds all the product data.
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image: "images/headphones.png",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.5,
      image: "images/smartwatch.png",
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 49.99,
      image: "images/speaker.png",
    },
    { id: 4, name: "Ergonomic Mouse", price: 79.0, image: "images/mouse.png" },
    {
      id: 5,
      name: "Mechanical Keyboard",
      price: 129.99,
      image: "images/keyboard.png",
    },
    { id: 6, name: "4K Webcam", price: 159.5, image: "images/webcam.png" },
    { id: 7, name: "USB-C Hub", price: 39.99, image: "images/usbhub.png" },
    {
      id: 8,
      name: "Laptop Stand",
      price: 29.0,
      image: "images/laptopstand.png",
    },
  ];

  // This array will store the products the user has added to their cart.
  let cart = [];

  // --- DOM SELECTORS ---
  // Storing references to HTML elements we need to interact with.
  const productList = document.querySelector(".product-list");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartSummary = document.getElementById("cart-summary");
  const cartTotalEl = document.getElementById("cart-total");
  const checkoutButton = document.getElementById("checkout-button");
  const contactForm = document.getElementById("contact-form");

  // --- FUNCTIONS ---

  /**
   * Renders all products from the 'products' array into the product list container.
   */
  const renderProducts = () => {
    productList.innerHTML = ""; // Clear existing products to prevent duplicates
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      // Using a template literal to create the HTML structure for each card.
      productCard.innerHTML = `
                <img src="${product.image}" alt="${
        product.name
      }" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart-btn" data-id="${
                      product.id
                    }">Add to Cart</button>
                </div>
            `;
      productList.appendChild(productCard);
    });
  };

  /**Function to add a product to the cart */
  const addToCart = (productId) => {
    const product = products.find((p) => p.id === productId); //Find a product by its ID
    const cartItem = cart.find((item) => item.id === productId); //Check if the product is already in the cart

    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
  };

  /**Updates the quantity of specified item in the cart */
  const updateQuantity = (productId, newQuantity) => {
    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem) {
      if (newQuantity <= 0) {
        removeFromCart(productId);
      } else {
        cartItem.quantity = newQuantity;
        updateCartUI();
      }
    }
    updateCartUI();
  };

  /**Removes an item from the cart */
  const removeFromCart = (productId) => {
    //Create a new cart array excluding the item with the specified productId
    cart = cart.filter((item) => item.id !== productId);
    updateCartUI();
  };

  const updateCartUI = () => {
    cartItemsContainer.innerHTML = ""; // Clear existing cart items

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartSummary.style.display = "none";
    } else {
      cartSummary.style.display = "block";
      cart.forEach((item) => {
        const cartItemEl = document.createElement("div");
        cartItemEl.className = "cart-item";
        cartItemEl.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                `;
        cartItemsContainer.appendChild(cartItemEl);
      });
    }
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    cartTotalEl.textContent = total.toFixed(2);
    checkoutButton.disabled = cart.length === 0; // Disable checkout if cart is empty
  };

  // ---EVENT LISTENERS---

  productList.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
      const productId = parseInt(e.target.dataset.id, 10);
      addToCart(productId);
    }
  });

  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const productId = parseInt(e.target.dataset.id, 10);
      removeFromCart(productId);
    }
  });

  checkoutButton.addEventListener("click", () => {
    if (cart.length > 0) {
      alert(
        "Thank you for your purchase!\n\nTotal: $" + cartTotalEl.textContent
      );
      cart = []; // Clear the cart after checkout
      updateCartUI();
    } else {
      alert("Your cart is empty!");
    }
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    alert("Thank you for contacting us, " + name + "!");
    contactForm.reset();
  });

  // Initial render
  renderProducts();
  updateCartUI();
});
