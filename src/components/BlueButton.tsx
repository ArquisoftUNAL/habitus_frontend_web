import "../styles/BlueButton.css";

function BlueButton(props:{onClick:()=>void, caption: string}) {
    return (
        <button type="button" className="blue-button mb-3" onClick={props.onClick}>
            {props.caption}
        </button>
    );
}

export default BlueButton;