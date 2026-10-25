let filteredProducts = [...products];


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const productContainer =
            document.getElementById(
                "productContainer"
            );


        if (!productContainer) {
            return;
        }


        displayProducts(
            filteredProducts
        );


        setupFilters();

    }
);


function displayProducts(productList) {

    const container =
        document.getElementById(
            "productContainer"
        );


    if (productList.length === 0) {

        container.innerHTML = `
            <div class="no-products">
                <h2>😕 No products found</h2>
                <p>
                    Try another search or category.
                </p>
            </div>
        `;

        return;

    }


    container.innerHTML =
        productList
            .map(createProductCard)
            .join("");

}


function setupFilters() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    const priceFilter =
        document.getElementById(
            "priceFilter"
        );


    const sortFilter =
        document.getElementById(
            "sortFilter"
        );


    searchInput.addEventListener(
        "input",
        applyFilters
    );


    categoryFilter.addEventListener(
        "change",
        applyFilters
    );


    priceFilter.addEventListener(
        "change",
        applyFilters
    );


    sortFilter.addEventListener(
        "change",
        applyFilters
    );

}


function applyFilters() {

    const search =
        document.getElementById(
            "searchInput"
        ).value
            .toLowerCase();


    const category =
        document.getElementById(
            "categoryFilter"
        ).value;


    const price =
        document.getElementById(
            "priceFilter"
        ).value;


    const sort =
        document.getElementById(
            "sortFilter"
        ).value;


    filteredProducts =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "all" ||
                product.category === category;


            let matchesPrice = true;


            if (price === "under500") {

                matchesPrice =
                    product.price < 500;

            }


            if (price === "500-1000") {

                matchesPrice =
                    product.price >= 500 &&
                    product.price <= 1000;

            }


            if (price === "1000-2000") {

                matchesPrice =
                    product.price > 1000 &&
                    product.price <= 2000;

            }


            if (price === "above2000") {

                matchesPrice =
                    product.price > 2000;

            }


            return (
                matchesSearch &&
                matchesCategory &&
                matchesPrice
            );

        });


    sortProducts(sort);

    displayProducts(
        filteredProducts
    );

}


function sortProducts(sort) {

    if (sort === "low-high") {

        filteredProducts.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (sort === "high-low") {

        filteredProducts.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    if (sort === "rating") {

        filteredProducts.sort(
            (a, b) =>
                b.rating - a.rating
        );

    }


    if (sort === "name") {

        filteredProducts.sort(
            (a, b) =>
                a.name.localeCompare(
                    b.name
                )
        );

    }

}