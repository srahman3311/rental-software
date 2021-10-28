export const calculateRentPeriod = (startDate, endDate) => {

     // Separating year, month and days from startDate
     const startMonth = startDate.getMonth() + 1;
     const startYear = startDate.getFullYear();
     const startDays = startDate.getDate();

     // Separating year, month and days from endDate
     const endMonth = endDate.getMonth() + 1;
     const endYear = endDate.getFullYear();
     const endDays = endDate.getDate();

     const msPerDay = 1000 * 60 * 60 * 24;

     // Converting start and end dates in MS
     const startDateInMS = new Date(startYear, startMonth, startDays).getTime();
     const endDateInMS = new Date(endYear, endMonth, endDays).getTime();

     // Calculating the diffInMS by substracting 
     const diffInMS = endDateInMS - startDateInMS;
    
     // Difference in MS of two dates divided by msPerDay will return the total difference in days. 1 is added to count the days
     // including the startDate. 
     const diffInDays = Math.abs(diffInMS / msPerDay) + 1;

     return { diffInMS, diffInDays };
}