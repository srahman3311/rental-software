import DateInput from "./DateInput";
import ErrorMessage from "../../validation-error-message/ErrorMessage";


export default function SelectDates({ products, setError, setBookingInfo, bookingInfo, error }) {


    return (
        <div className="booking_dates" style = {{display: !bookingInfo.calculatedRent ? "block" : "none"}}>
            <div className="date_picker">
                <h4 style = {{marginBottom: "10px", borderBottom: "1px solid rgba(0, 0, 0, 0.2)"}}>Select start and end date</h4>

                <div className="datePicker_dates">

                    <p style = {{marginRight: "10px"}}>from</p>

                    <DateInput
                        name = "startDate"
                        value = {bookingInfo.startDate} 
                        products = {products}
                        setBookingInfo = {setBookingInfo} 
                        setError = {setError}  
                    />
                   
                    <p style = {{marginLeft: "20px", marginRight: "10px"}}>to</p>

                    <DateInput
                        name = "endDate"
                        value = {bookingInfo.endDate} 
                        products = {products}
                        setBookingInfo = {setBookingInfo} 
                        setError = {setError}  
                    />
                   
                </div>

                <ErrorMessage
                    error = {error.isDateInfoBlank}
                    content = "* Please pick both start and end date." 
                />
                <ErrorMessage
                    error = {error.isEndDateEarlierThanStartDate}
                    content = "Please make sure end date is not earlier than start dates" 
                />
                <ErrorMessage
                    error = {error.isRentalPeriodLessThanOrEqual}
                    content = "This product doesn't have discount so rental period must be more than minimum rental period." 
                />
                <ErrorMessage
                    error = {error.rentalPeriodError}
                    content = "Rental period must be more than or equal to minimum rental period" 
                />
                    
            </div>

        </div>
    );
}