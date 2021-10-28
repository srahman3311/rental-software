
export default function OptionComponent({ product }) {

    return (
        <option value = {product.name + "/" + product.code} >
            {product.name}/{product.code}
        </option>
       
    );
}

