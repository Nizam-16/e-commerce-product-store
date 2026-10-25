document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderCart();

    }
);


function renderCart() {

    const container =
        document.getElementById(
            "cartContainer"
        );


    if (!container) {
        return;
    }


    const cart =
        getCart();


    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Add some products to
                    continue shopping.
                </p>

                <a href="products.html">
                    Continue Shopping
                </a>

            </div>
        `;


        updateCartSummary([]);

        return;

    }


    container.innerHTML =
        cart.map(item => {

            const product =
                getProductById(
                    item.productId
                );


            if (!product) {
                return "";
            }


            const total =
                product.price *
                item.quantity;


            return `
                <div class="cart-item">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >


                    <div class="cart-product-info">

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ${product.category}
                        </p>

                        <strong>
                            ${formatPrice(product.price)}
                        </strong>

                    </div>


                    <div class="quantity-control">

                        <button
                            onclick="
                                changeCartQuantity(
                                    ${product.id},
                                    -1
                                )
                            "
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="
                                changeCartQuantity(
                                    ${product.id},
                                    1
                                )
                            "
                        >
                            +
                        </button>

                    </div>


                    <div class="cart-total">
                        ${formatPrice(total)}
                    </div>


                    <button
                        class="remove-btn"
                        onclick="
                            removeProduct(
                                ${product.id}
                            )
                        "
                    >
                        🗑️
                    </button>

                </div>
            `;

        }).join("");


    updateCartSummary(cart);

}


function changeCartQuantity(
    productId,
    change
) {

    const cart =
        getCart();


    const item =
        cart.find(
            item =>
                item.productId === productId
        );


    if (!item) {
        return;
    }


    const newQuantity =
        item.quantity + change;


    updateCartQuantity(
        productId,
        newQuantity
    );


    renderCart();

    updateCartCount();

}


function removeProduct(productId) {

    removeFromCart(productId);

    renderCart();

    updateCartCount();

    showNotification(
        "Product removed from cart."
    );

}


function updateCartSummary(cart) {

    let subtotal = 0;


    cart.forEach(item => {

        const product =
            getProductById(
                item.productId
            );


        if (product) {

            subtotal +=
                product.price *
                item.quantity;

        }

    });


    const shipping =
        subtotal === 0
            ? 0
            : subtotal >= 2000
                ? 0
                : 100;


    const discount =
        subtotal >= 3000
            ? subtotal * 0.10
            : 0;


    const total =
        subtotal +
        shipping -
        discount;


    document.getElementById(
        "subtotal"
    ).textContent =
        formatPrice(subtotal);


    document.getElementById(
        "shipping"
    ).textContent =
        shipping === 0
            ? "FREE"
            : formatPrice(shipping);


    document.getElementById(
        "discount"
    ).textContent =
        `-${formatPrice(discount)}`;


    document.getElementById(
        "grandTotal"
    ).textContent =
        formatPrice(total);

}