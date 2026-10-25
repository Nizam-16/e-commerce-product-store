document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartCount();

    }
);


function updateCartCount() {

    const count =
        getCartCount();


    const cartBadges =
        document.querySelectorAll(
            ".cart-count"
        );


    cartBadges.forEach(
        badge => {

            badge.textContent = count;

        }
    );

}


function showNotification(message) {

    const notification =
        document.createElement("div");

    notification.className =
        "notification";

    notification.textContent =
        message;


    document.body.appendChild(
        notification
    );


    setTimeout(() => {

        notification.classList.add(
            "show"
        );

    }, 10);


    setTimeout(() => {

        notification.remove();

    }, 2500);

}