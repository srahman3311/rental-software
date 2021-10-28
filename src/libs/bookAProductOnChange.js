export const bookAProductOnChange = (event, products, setError, setBookingInfo) => {

    const name = event.target.name;
    const value = event.target.value;

    // Set every error to false to start checking afresh
    setError(currentVal => { 
        return {
            ...currentVal,
            isProductInfoBlank: false,
            isDateInfoBlank: false,
            rentalPeriodError: false,
            isRentalPeriodLessThanOrEqual: false,
            isEndDateEarlierThanStartDate: false,
        };
    });

    
    if(name === "product") {

        if(value === "Select product") {

            setBookingInfo(currentVal => {
                return {
                    ...currentVal,
                    product: "Select product",
                    calculatedRent: 0,
                    minimumRentalPeriod: 0,
                    mileage: null,
                    discount: 0,
                };
            });

            return setError(currentVal => { 
                return {
                    ...currentVal,
                    isProductInfoBlank: true,
                    isDateInfoBlank: false,
                    rentalPeriodError: false,
                    isRentalPeriodLessThanOrEqual: false,
                    isEndDateEarlierThanStartDate: false,
                };
            });
        } else {

            // Loop through the discounted products array to see if discount is eligible.  
            for(let i = 0; i < products.length; i++) {

                const productName = products[i].name + "/" + products[i].code;

                if(productName === value) {

                    setBookingInfo(currentVal => {
                        return {
                            ...currentVal,
                            product: value,
                            discount: products[i].discount,
                            calculatedRent: 0,
                            price: products[i].price,
                            mileage: products[i].mileage,
                            minimumRentalPeriod: products[i].minimum_rent_period
                        };
                    });

                    setError(currentVal => { 
                        return {
                            ...currentVal,
                            isProductInfoBlank: false,
                            isDateInfoBlank: false,
                            rentalPeriodError: false,
                            isRentalPeriodLessThanOrEqual: false,
                            isEndDateEarlierThanStartDate: false,
                        };
                    });

                    break;
                }

            }

            return;
        }
    }

    

    // if product has no discount or client is selecting dates then update the booking info state
    if(name !== "email") {
        return setBookingInfo(currentVal => {
            return {
                ...currentVal,
                [name]: value,
                calculatedRent: 0,
            };
        });
    }

    setBookingInfo(currentVal => {
        return {
            ...currentVal,
            [name]: value,
        };
    });
   

    setError(currentVal => { 
        return {
            ...currentVal,
            isDateInfoBlank: false,
            rentalPeriodError: false,
            isRentalPeriodLessThanOrEqual: false,
            isEndDateEarlierThanStartDate: false,
        };
    });
}

