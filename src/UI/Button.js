import classes from "./Button.module.css";

function Button(props) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type}
      className={`${props.className} ${classes.btn}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
