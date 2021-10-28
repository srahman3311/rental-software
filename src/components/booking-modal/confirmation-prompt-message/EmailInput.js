import { bookAProductOnChange } from "../../../libs/bookAProductOnChange";




export default function EmailInput({ name, value, products, setError, setBookingInfo }) {

    return (
        <div className="email_input" >
            <input 
                type="email" 
                name={name} 
                placeholder="john-doe@example.com" 
                value = {value} 
                onChange = {event => bookAProductOnChange(event, products, setError, setBookingInfo)} 
            />
        </div>    
    );
    
}