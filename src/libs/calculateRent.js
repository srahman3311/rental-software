import { calculateRentPeriod } from "./calculateRentPeriod";




export const calculateRent = (bookingInfo, setBookingInfo, setError ) => {

    // Set every error to false to start checking afresh
    setError(currentVal => { 
        return {
            ...currentVal,
            isProductInfoBlank: false,
            rentalPeriodError: false,
            isRentalPeriodLessThanOrEqual: false,
            isEndDateEarlierThanStartDate: false,
        };
        
    });

    // Initial state of bookingInfo.product is "Select product". So If client clicks yes without choosing any product from the 
    // dropdown or mistakenly change the product by choosing "Select product" then show the validation error message
    if(bookingInfo.product === "Select product") {
        return setError(currentVal => { 
            return {
                ...currentVal,
                isProductInfoBlank: true,
            };
        });
    }

    // Client must pick both startDate and endDate. Otherwise show the validation error message
    if(!bookingInfo.startDate || !bookingInfo.endDate) {
        return setError(currentVal => { 
            return {
                ...currentVal,
                isDateInfoBlank: true,
            };
        });
    }

    // get diffInMS and diffInDays by calling the calculateRentPeriod function passing start and end date
    const { diffInMS, diffInDays } = calculateRentPeriod(new Date(bookingInfo.startDate), new Date(bookingInfo.endDate));
    
    // setDifference(diffInDays);
    // if endDatInMS is less than 0 then client mistakenly selected an earlier date for endDate than startDate
    if(diffInMS < 0) {
        return setError(currentVal => { return { ...currentVal, isEndDateEarlierThanStartDate: true} });
    }

    if(diffInDays < bookingInfo.minimumRentalPeriod) {
        return setError(currentVal => { return { ...currentVal, rentalPeriodError: true} });
    }

    // If there is no discount and the product has a minimum rental period, the user can only rent the product 
    // longer than the minimum rental period.
    if(!bookingInfo.discount && diffInDays <= bookingInfo.minimumRentalPeriod) {
        return setError(currentVal => { return { ...currentVal, isRentalPeriodLessThanOrEqual: true} });
    }

    const amount = bookingInfo.price * diffInDays;
    let discountedAmount = (amount * bookingInfo.discount) / 100;

    if(diffInDays > bookingInfo.minimumRentalPeriod) {

        setBookingInfo(currentVal => {
            return {
                ...currentVal,
                calculatedRent: amount - discountedAmount
            };
        });
    } else {
        setBookingInfo(currentVal => {
            return {
                ...currentVal,
                calculatedRent: amount
            };
        });
    }
}