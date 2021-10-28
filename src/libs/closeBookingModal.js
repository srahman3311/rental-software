

export const closeBookingModal = (setError, setBookingInfo, setHasRented, setDisplayBookingModal) => {
    
    setBookingInfo(currentVal => {
        return {
            ...currentVal,
            product: "Select product",
            discount: 0,
            calculatedRent: 0,
            price: 0,
            email: "",
            startDate: "",
            endDate: "",
            mileage: null,
            minimumRentalPeriod: 0,
            
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

    setHasRented(false);
    setDisplayBookingModal(false);
}