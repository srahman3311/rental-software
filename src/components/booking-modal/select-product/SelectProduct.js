import { bookAProductOnChange } from "../../../libs/bookAProductOnChange";
import DiscountOffer from "./DiscountOffer";
import ErrorMessage from "../../validation-error-message/ErrorMessage";
import OptionComponent from "../../reusable-components/OptionComponent";
import ProductDetails from "./ProductDetails";





export default function SelectProduct({ products, bookingInfo, error, setError, setBookingInfo }) {

    
    return (
       <div className="select_product" style = {{display: !bookingInfo.calculatedRent ? "block" : "none"}}>
            <div className="product_dropdown">
                <select name = "product" 
                    onChange = {event => bookAProductOnChange(event, products, setError, setBookingInfo)} 
                    value = {bookingInfo.product}
                >
                    <option value = "Select product">Select product</option>

                    {products.map((product, index) => {
                        return (
                            // Only show the products that are available to rent
                            product.availability && <OptionComponent key = {index + 1} product = {product} />
                        );
                    })}
                </select> 
                <DiscountOffer bookingInfo = {bookingInfo} />

                <ErrorMessage 
                    error = {error.isProductInfoBlank} 
                    content = "Please select a product to proceed"
                />

            </div> 
            <ProductDetails bookingInfo = {bookingInfo} />       

       </div>
    );
}


