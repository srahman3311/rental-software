import { bookAProductOnChange } from "../../../libs/bookAProductOnChange";


export default function DateInput({ name, value, products, setBookingInfo, setError  }) {


    return (
        <div className="date_input">
            <input 
                type = "date" 
                name = {name} 
                value = {value} 
                onChange = {event => bookAProductOnChange(event, products, setError, setBookingInfo)} 
            />
        </div>
    );
}