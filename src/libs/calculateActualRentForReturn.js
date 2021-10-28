import { calculateRentPeriod } from "./calculateRentPeriod"

export const calculateActualRentForReturn = (startDate, endDate, returnInfo) => {

    const { diffInDays, diffInMS } = calculateRentPeriod(startDate, endDate);

    return { diffInDays, diffInMS, rentAmount: diffInDays * returnInfo.price}

}