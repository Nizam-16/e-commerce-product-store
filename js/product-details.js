document.addEventListener(
    "DOMContentLoaded",
    () => {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const id =
            params.get("id");


        const product =
            getProductById(id);


        if (!product) {

            document.getElementById(
                "productDetails"
            ).innerHTML = `
                <div class="error-message">
                    <h2>Product Not Found</h2>
                    <a href="products.html">
                        Back to Products
                    </a>
                </div>
            `;

            return;

        }


        displayProductDetails(
            product
        );

    }
);


function displayProductDetails(
    product
) {

    const container =
        document.getElementById(
            "productDetails"
        );


    container.innerHTML = `

        <div class="details-image">

            <img
                src="${product.image}"
                alt="${product.name}"
            >

        </div>


        <div class="details-content">

            <span class="product-category">
                ${product.category}
            </span>


            <h1>
                ${product.name}
            </h1>


            <div class="details-rating">

                <span>
                    ${generateStars(product.rating)}
                </span>

                <span>
                    ${product.rating}
                    (${product.reviews} reviews)
                </span>

            </div>


            <div class="details-price">

                <strong>
                    ${formatPrice(product.price)}
                </strong>

                <del>
                    ${formatPrice(product.oldPrice)}
                </del>

            </div>


            <p class="details-description">
                ${product.description}
            </p>


            <p class="stock">
                ✅ ${product.stock} items available
            </p>


            <div class="quantity-box">

                <button
                    onclick="changeQuantity(-1)"
                >
                    −
                </button>

                <span id="quantity">
                    1
                </span>

                <button
                    onclick="changeQuantity(1)"
                >
                    +
                </button>

            </div>


            <button
                class="details-cart-btn"
                onclick="addDetailsProduct(${product.id})"
            >
                🛒 Add to Cart
            </button>


            <a
                href="cart.html"
                class="buy-btn"
            >
                View Cart
            </a>

        </div>

    `;

}


function changeQuantity(change) {

    const quantityElement =
        document.getElementById(
            "quantity"
        );


    let quantity =
        Number(
            quantityElement.textContent
        );


    quantity += change;


    if (quantity < 1) {

        quantity = 1;

    }


    quantityElement.textContent =
        quantity;

}


function addDetailsProduct(
    productId
) {

    const quantity =
        Number(
            document.getElementById(
                "quantity"
            ).textContent
        );


    addToCart(
        productId,
        quantity
    );


    updateCartCount();

    showNotification(
        "Product added to cart!"
    );

}