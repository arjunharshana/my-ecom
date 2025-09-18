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

      // Using a template literal to easily create the HTML structure for each card.
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

  renderProducts();
});
