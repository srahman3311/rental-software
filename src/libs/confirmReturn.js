export const confirmReturn = (products, returnInfo, setReturnConfirmed) => {

    const newProducts = [];

    products.forEach(product => {

        const productName = product.name + "/" + product.code;

        if(productName === returnInfo.product) {

            let decreasedDurability = 0;
            let milesTraveled = 0;

            if(product.type === "meter") {
                milesTraveled = 10 * returnInfo.usedPeriod
                decreasedDurability = (returnInfo.usedPeriod * 2) * 2
            }

            if(product.type === "plain") decreasedDurability = returnInfo.usedPeriod
           

            newProducts.push({
                code: product.code,
                name: product.name,
                type: product.type,
                availability: true,
                needing_repair: product.needing_repair,
                durability: product.durability - decreasedDurability,
                max_durability: product.max_durability,
                mileage: product.mileage === null ? null : product.mileage - milesTraveled,
                price: product.price,
                minimum_rent_period: product.minimum_rent_period,
                discount: product.discount,
                availableFrom: returnInfo.returnDate
            });
        } else {
            newProducts.push(product)
        }

    });

    setReturnConfirmed(true);

    return localStorage.setItem("products", JSON.stringify(newProducts));


    
}