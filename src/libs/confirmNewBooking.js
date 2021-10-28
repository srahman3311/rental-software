export const confirmNewBooking = (products, bookingInfo, setProducts, setHasRented) => {

    const newProducts = [];

    products.forEach(product => {

        const productName = product.name + "/" + product.code;

        if(productName === bookingInfo.product) {

            newProducts.push({
                code: product.code,
                name: product.name,
                type: product.type,
                availability: false,
                needing_repair: product.needing_repair,
                durability: product.durability,
                max_durability: product.max_durability,
                mileage: product.mileage,
                price: product.price,
                minimum_rent_period: product.minimum_rent_period,
                discount: product.discount,
                rentTakerEmail: bookingInfo.email,
                bookingStartDate: bookingInfo.startDate
            });
        } else {
            newProducts.push(product)
        }

    });

    localStorage.setItem("products", JSON.stringify(newProducts));

    setProducts(JSON.parse(localStorage.getItem("products")));
    // setDisplayBookingModal(false);

    
    
    setHasRented(true);
    return;
    
}