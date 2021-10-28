export const searchProduct = (event, setProducts) => {
     // Whether user's typed inputs are in lowercase or uppercase turn them into all lowercase to later check against 
        // lower cased item name and type
        const searchText = event.target.value.toLowerCase();

        // For each onChange event get the data from localStorage
        const data = JSON.parse(localStorage.getItem("products"));

        // If input field is cleared by backspacing, update the state with all the data
        if(!searchText) return setProducts(data);

        const filteredData = data.filter(item => {

            // To make it consistent with searchText turn item name and type into all lowercase
            const name = item.name.toLowerCase();
            const type = item.type.toLowerCase();

            // If lower cased item name and type includes lower cased searchText return the object
            return name.includes(searchText) || type.includes(searchText);

        })

       
        return setProducts(filteredData);
}