export const saveDataInLocalStorage = (data, setProducts) => {


    // Changing the original array by adding discount property. For the actual application creating a functionality to add discount
    // percentage won't a big deal
    const newData = [];
    
    data.default.forEach((item, index) => {

        let discount = 0;

        // Randomly setting discount to some products. 
        if(index === 2) discount = 5;
        if(index === 7) discount = 7;
        if(index === 11) discount = 5;
        if(index === 14) discount = 8;
        if(index === 15) discount = 10;

        newData.push({
            code: item.code,
            name: item.name,
            type: item.type,
            availability: item.availability,
            needing_repair: item.needing_repair,
            durability: item.durability,
            max_durability: item.max_durability,
            mileage: item.mileage,
            price: item.price,
            minimum_rent_period: item.minimum_rent_period,
            discount
        });

    });

    
    // Save intial data in localStorage just once, when component mounts for the first time. confirmBooking function will
    // save updated data in localStorage and we don't want to lose that just because component re-mounts 


    if(localStorage.getItem("products") === null) {
        localStorage.setItem("products", JSON.stringify(newData));
    }

    setProducts(JSON.parse(localStorage.getItem("products")));

}