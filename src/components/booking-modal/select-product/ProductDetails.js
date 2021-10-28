
export default function ProductDetails({ bookingInfo }) {

    
    return (
 
        <div className="product_details" style = {{display: bookingInfo.product === "Select product" ? "none" : "block"}}>

            <h4 style = {{marginBottom: "10px", borderBottom: "1px solid rgba(0, 0, 0, 0.2)"}}>Product Details</h4>

            <div className="productDetails_content" style = {{display: "flex", justifyContent: "space-between"}}>
                <p><span style = {{color: "green"}}>Minimum rent period:</span> {bookingInfo.minimumRentalPeriod} day(s)</p>
                <p><span style = {{color: "green"}}>Mileage</span>: {bookingInfo.mileage !== null ? bookingInfo.mileage : "N/A"}</p>
            </div>
            
        </div>
    );
}
