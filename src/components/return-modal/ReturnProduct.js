import { confirmReturn } from "../../libs/confirmReturn";
import ProductDropdown from "../reusable-components/ProductDropdown";





export default function ReturnProduct({ 
    products, 
    setReturnConfirmed, 
    returnError, 
    returnInfo, 
    returnAProductOnChange, 
    findProductsForReturn, 
    productsFound 
}) {

   
    return (
       <div className="select_product" >

           <p>Please enter your email address.</p>
           <input type = "email" name="email" onChange = {returnAProductOnChange}/> 
           <button onClick = {findProductsForReturn}>Find</button>
           <p style = {{display: !products.length && !productsFound ? "block" : "none"}}>No products found</p>
            <div className="product_list" style = {{display: products.length ? "block" : "none"}}>
                <ProductDropdown products = {products} onChange = {returnAProductOnChange} returnInfo = {returnInfo} />

                <input type = "date" name = "returnDate" value = {returnInfo.returnDate} onChange = {returnAProductOnChange} />
                <p style = {{display: returnError ? "block" : "none"}}>Please select a product first</p>

            </div> 
           

           <button 
                onClick = {
                    () => confirmReturn(JSON.parse(localStorage.getItem("products")), returnInfo, setReturnConfirmed)
                }
            >
                Confirm
            </button>
       </div>
    );
}

