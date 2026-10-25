document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadCheckoutTotal();


        const form =
            document.getElementById(
                "checkoutForm"
            );


        if (form) {

            form.addEventListener(
                "submit",
                handleCheckout
            );

        }

    }
);


function calculateCheckoutTotal() {

    const cart =
        getCart();


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


    return (
        subtotal +
        shipping -
        discount
    );

}


function loadCheckoutTotal() {

    const total =
        calculateCheckoutTotal();


    const element =
        document.getElementById(
            "checkoutTotal"
        );


    if (element) {

        element.textContent =
            formatPrice(total);

    }

}


function handleCheckout(event) {

    event.preventDefault();


    const cart =
        getCart();


    if (cart.length === 0) {

        showNotification(
            "Your cart is empty."
        );

        return;

    }


    const name =
        document.getElementById(
            "customerName"
        ).value;


    const orderId =
        "ORD" +
        Date.now()
            .toString()
            .slice(-6);


    const total =
        calculateCheckoutTotal();


    const orderData = {

        orderId: orderId,

        customerName: name,

        total: total,

        date:
            new Date()
                .toLocaleString("en-IN")

    };


    localStorage.setItem(
        "lastOrder",
        JSON.stringify(
            orderData
        )
    );


    clearCart();


    document.getElementById(
        "checkoutForm"
    ).style.display =
        "none";


    document.getElementById(
        "orderSuccess"
    ).style.display =
        "block";


    document.getElementById(
        "orderId"
    ).textContent =
        orderId;


    document.getElementById(
        "orderTotal"
    ).textContent =
        formatPrice(total);


    updateCartCount();

}