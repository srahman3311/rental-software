
export default function DiscountOffer({ bookingInfo }) {

    
    return (
        <p 
            style = {{
                display: bookingInfo.discount ? "block" : "none", color: "darkblue"
            }} 
        >
            * Great offer: {bookingInfo.product} has a {bookingInfo.discount}% discount
        </p>
    );
}

