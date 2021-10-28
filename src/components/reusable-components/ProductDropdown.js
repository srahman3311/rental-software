// import { bookAProductOnChange } from "../../../libs/bookAProductOnChange";
import OptionComponent from "../reusable-components/OptionComponent"






export default function ProductDropdown({ products, returnInfo, error, setError, setBookingInfo, onChange }) {

    
    return (
       <div className="product_dropdown">
           <select 
                name = "product" 
                onChange = {onChange} 
                value = {returnInfo.product}
            >
                <option value = "Select product">Select product</option>
                {products.map((product, index) => {
                    return (
                        // Only show the products that are not available to rent, means has 
                        !product.availability && <OptionComponent key = {index + 1} product = {product} />
                    );
                })}
            </select> 
       </div>
    );
}


