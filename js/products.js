function getProductById(id) {

    return products.find(
        product => product.id === Number(id)
    );

}


function formatPrice(price) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(price);

}


function generateStars(rating) {

    const fullStars =
        Math.floor(rating);

    const halfStar =
        rating % 1 >= 0.5;

    let stars = "";

    for (
        let i = 0;
        i < fullStars;
        i++
    ) {

        stars += "★";

    }


    if (halfStar) {

        stars += "½";

    }


    return stars;

}


function createProductCard(product) {

    return `
        <div class="product-card">

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <span class="discount-badge">
                    ${Math.round(
                        (
                            (product.oldPrice - product.price)
                            / product.oldPrice
                        ) * 100
                    )}% OFF
                </span>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>


                <div class="rating">
                    <span>
                        ${generateStars(product.rating)}
                    </span>

                    <small>
                        (${product.reviews})
                    </small>
                </div>


                <div class="price">

                    <strong>
                        ${formatPrice(product.price)}
                    </strong>

                    <del>
                        ${formatPrice(product.oldPrice)}
                    </del>

                </div>


                <div class="product-actions">

                    <button
                        onclick="addProductToCart(${product.id})"
                        class="add-cart-btn"
                    >
                        🛒 Add to Cart
                    </button>

                    <a
                        href="product-details.html?id=${product.id}"
                        class="view-btn"
                    >
                        View
                    </a>

                </div>

            </div>

        </div>
    `;

}


function addProductToCart(productId) {

    addToCart(productId);

    updateCartCount();

    showNotification(
        "Product added to cart!"
    );

}