import { Fragment } from "react";
import classes from "./Modal.module.css";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

function Modal(props) {
  return (
    <Fragment>
      <div onClick={props.hideModal} className={classes.overlay}></div>
      <div className={classes.modal}>
        <button
          onClick={props.hideModal}
          className={classes["btn-close-modal"]}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h1>{props.heading}</h1>
        {props.message && <h3>{props.message}</h3>}
        {props.content &&
          props.content.map((element) => (
            <div className={classes.container} key={uuid()}>
              <FontAwesomeIcon icon={faUser} />
              <span>{element}</span>
            </div>
          ))}
        {props.action && (
          <div className={classes.actions}>
            <Button onClick={props.onAction}>{props.action}</Button>
            <Button onClick={props.hideModal}>Cancel</Button>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Modal;
