
export default function ErrorMessage({ error, content }) {

    return (
        <p className="error_message" style = {{display: error ? "block" : "none"}}>{content}</p>  
    );
}