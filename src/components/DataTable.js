import { useEffect, useState } from "react";

// Importing initial data from json file
import * as data from "../Data (1).json";
import { calculateRent } from "../libs/calculateRent";
import { searchProduct } from "../libs/searchProduct";
import { saveDataInLocalStorage } from "../libs/saveDataInLocalStorage";
import { closeBookingModal } from "../libs/closeBookingModal";
import { calculateActualRentForReturn } from "../libs/calculateActualRentForReturn";


// Components
import Table from "./Table";
// import BookingModal from "./BookingModal";
import SelectProduct from "./booking-modal/select-product/SelectProduct";
import SelectDates from "./booking-modal/select-dates/SelectDates";
// import CalculateRent from "./booking-modal/CalculateRent";
import ConfirmationMessage from "./booking-modal/confirmation-prompt-message/ConfirmationMessage";
import ConfirmationPrompt from "./booking-modal/confirmation-prompt-message/ConfirmationPrompt";
import ReturnProduct from "./return-modal/ReturnProduct";





export default function DataTable() {

    const [error, setError] = useState({
        isProductInfoBlank: false,
        isDateInfoBlank: false,
        isEndDateEarlierThanStartDate: false,
        rentalPeriodError: false, 
        isRentalPeriodLessThanOrEqual: false
    });
    // const [validationError, setValidationError] = useState(false);
    const [hasRented, setHasRented] = useState(false);
    const [products, setProducts] = useState([]);
    // const [calculatedRent, setCalculatedRent] = useState(0);
    const [bookingInfo, setBookingInfo] = useState({
        product: "Select product",
        startDate: "",
        endDate: "",
        price: 0,
        calculatedRent: 0,
        email: "",
        discount: 0,
        mileage: null,
        minimumRentalPeriod: 0,
        
    });

    // const [rentAmount, setRentAmount] = useState(0);
    const [returnInfo, setReturnInfo] = useState({
        product: "",
        price: 0,
        bookingStartDate: "",
        email: "",
        returnDate: "",
        rentAmount: 0,
        usedPeriod: 0
        
    });
    const [returnError, setReturnError] = useState(false);
    const [returnConfirmed, setReturnConfirmed] = useState(false);

    const [foundProductsForReturn, setFoundProductsForReturn] = useState([]);
    const [productsFound, setProductsFound] = useState(true);
    const [displayBookingModal, setDisplayBookingModal] = useState(false);
    const [displayReturnModal, setDisplayReturnModal] = useState(false);




    useEffect(() => {

        // async function fetchData() {

        // }

        saveDataInLocalStorage(data, setProducts);

    }, [])


    function returnAProductOnChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        console.log(name, value);

        if(name === "product") {

            // let bookingStartDate = "";

            if(value === "Select product") return;

            for(let i = 0; i < foundProductsForReturn.length; i++) {

                const productName = foundProductsForReturn[i].name + "/" + foundProductsForReturn[i].code;

                if(productName === value) {

                    // bookingStartDate = foundProductsForReturn[i].bookingStartDate;

                    setReturnInfo(currentVal => {
                        return {
                            ...currentVal,
                            product: value,
                            price: foundProductsForReturn[i].price,
                            bookingStartDate: foundProductsForReturn[i].bookingStartDate
                        };
                    });
                    break;
                }
            }

            return;

            // return calculateActualRentForReturn(bookingStartDate, returnInfo.returnDate, returnInfo);
        }

        if(name === "returnDate") {

            if(!returnInfo.product) return setReturnError(true);

            setReturnInfo(currentVal => {
                return {
                    ...currentVal,
                    returnDate: value
                };
            });

            const startDate = new Date(returnInfo.bookingStartDate);
            const endDate = new Date(value);

            const { diffInDays, diffInMS, rentAmount } = calculateActualRentForReturn(startDate, endDate, returnInfo);

            if(diffInMS < 0) return setReturnError(true);


            console.log(diffInDays, diffInMS, rentAmount);

            setReturnInfo(currentVal => {
                return {
                    ...currentVal,
                    usedPeriod: diffInDays,
                    rentAmount
                };
            });
        }

        setReturnInfo(currentVal => {
            return {
                ...currentVal,
                [name]: value
            };
        });
    }

    
    function findProductsForReturn() {

        const newProducts = JSON.parse(localStorage.getItem("products"));

        const foundProducts = newProducts.filter(newProduct => {
            const email = newProduct.rentTakerEmail;

            return typeof email !== "undefined" && email === returnInfo.email 
        });

        if(!foundProducts.length) return setProductsFound(false);

        setFoundProductsForReturn(foundProducts);
       
    }

    function closeReturnModal() {

        setReturnInfo(currentVal => {
            return {
                ...currentVal,
                product: "",
                price: 0,
                bookingStartDate: "",
                email: "",
                returnDate: "",
                rentAmount: 0,
                usedPeriod: 0
            };
        });

        setDisplayReturnModal(false)
    }

    console.log(returnInfo);

    return (
        <div className="data_table">

            <input type = "text" placeholder="Search" onChange={event => searchProduct(event, setProducts)} />

            <Table products = {products} />
            <br />
            <button onClick = {() => setDisplayBookingModal(true)}>Book</button>
            <button onClick = {() => setDisplayReturnModal(true)}>Return</button>

            <div className="booking_modal" style = {{display: displayBookingModal ? "block" : "none"}}>
                <div className="bookingModal_content">

                   

                   
                    <div className="booking_form" style = {{borderBottom: "1px solid black", padding: "20px", display: !hasRented ? "block" : "none"}}>
                        <h2>Book a product</h2>
                        <SelectProduct
                            // if client opens the modal after searching then products state might have already been
                            // updated with filtered products. But we need to pass all products to product dropdown 
                            products = {
                                JSON.parse(localStorage.getItem("products")) === null ? products : JSON.parse(localStorage.getItem("products"))
                            }
                            bookingInfo = {bookingInfo} 
                            setError = {setError}
                            setBookingInfo = {setBookingInfo}
                            error = {error}
                            
                        />

                        <SelectDates
                            bookingInfo = {bookingInfo}
                            products = {products}
                            setError = {setError}
                            setBookingInfo = {setBookingInfo}
                            error = {error}
                        />

                        <div className="bookingModal_buttons" style = {{display: !bookingInfo.calculatedRent ? "block" : "none"}}>
                            <button onClick = {() => calculateRent(bookingInfo, setBookingInfo, setError)}>Yes</button>
                            <button 
                                onClick = {() => closeBookingModal(setError, setBookingInfo, setHasRented, setDisplayBookingModal)}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    <ConfirmationPrompt 
                        bookingInfo = {bookingInfo}
                        setBookingInfo = {setBookingInfo}
                        setDisplayBookingModal = {setDisplayBookingModal}
                        hasRented = {hasRented}
                        setHasRented = {setHasRented}
                        products = {products}
                        setProducts = {setProducts}
                        setError = {setError}
                    />

                    <ConfirmationMessage
                        setError = {setError} 
                        setBookingInfo = {setBookingInfo}
                        setHasRented = {setHasRented}
                        hasRented = {hasRented}
                        setDisplayBookingModal = {setDisplayBookingModal}
                    />

                </div>
               
            </div>

            <div className="return_modal" style = {{display: displayReturnModal ? "block" : "none"}}>
                <div className="returnModal_content">

                    <ReturnProduct
                        products = {foundProductsForReturn}
                        returnInfo = {returnInfo}
                        returnAProductOnChange = {returnAProductOnChange}
                        // foundProductsForReturn = {foundProductsForReturn}
                        findProductsForReturn = {findProductsForReturn}
                        productsFound = {productsFound}
                        returnError = {returnError}
                        setReturnConfirmed = {setReturnConfirmed}
                    />

                    <div className = "message" style = {{display: returnConfirmed ? "block" : "none" }}>
                        <p>Your return is confirmed</p>
                        <button onClick = {closeReturnModal}>Close</button>
                    </div>

                </div>
            </div>


        </div>
    );
}