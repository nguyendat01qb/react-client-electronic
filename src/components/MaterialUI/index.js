import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./style.css";

/**
 * @author Nguyen Dat
 * @function
 **/

const Modal = (props) => {
  if (!props.visible) {
    return null;
  }
  return (
    <>
      <div className="modalFixedBg">
        <div style={{ position: "relative" }}>
          <div className="modalClose" onClick={props.onClose}>
            X
          </div>
          <div className="modalContainer">{props.children}</div>
        </div>
      </div>
    </>
  );
};

const MaterialInput = (props) => {
  const [touch, setTouch] = useState(false);
  const [focus, setFocus] = useState(false);
  return (
    <div className="materialInput">
      <label
        className={`label ${focus ? "focus" : ""}`}
        style={{
          top: 0,
          lineHeight: "none",
        }}
      >
        {props.label && `${props.label}`}
      </label>
      <div
        style={{
          display: "flex",
        }}
      >
        <input
          className="input"
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          onFocus={() => {
            setFocus(true);
            setTouch(false);
          }}
          onBlur={(e) => {
            if (e.target.value === "") {
              setTouch(true);
            } else {
              setTouch(false);
            }
          }}
        />
        {props.rightElement ? props.rightElement : null}
      </div>
      {touch ? (
        <div
          style={{
            fontSize: "10px",
            color: "red",
            fontWeight: "500",
            textTransform: "lowercase",
          }}
        >
          {`Vui lòng nhập ${props.label}`}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const MaterialButton = (props) => {
  const onClick = (e) => {
    props.onClick && props.onClick();
  };
  return (
    <div
      style={{
        width: "100%",
        ...props.style,
      }}
    >
      <Button
        className="materialButton"
        style={{
          backgroundColor: props.bgColor,
          color: props.textColor,
          fontSize: props.fontSize,
          lineHeight: props.lineHeight,
          borderRadius: "4px",
        }}
        type="submit"
        onClick={onClick}
      >
        {props.icon && props.icon}
        {props.title && props.title}
      </Button>
    </div>
  );
};

const DropdownMenu = (props) => {
  return (
    <div className="headerDropdownContainer">
      {props.menu}
      <div className="dropdown">
        <div className="upArrowContainer">
          <div className="upArrow"></div>
        </div>
        <div className="dropdownMenu">
          {props.firstMenu}
          <ul className="headerDropdownMenu">
            {props.menus &&
              props.menus.map((item, index) => (
                <li key={index}>
                  <a
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick && item.onClick();
                      }
                    }}
                    href={`${item.href}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Anchor = (props) => {
  return (
    <button {...props} className="anchorButton">
      {props.name}
    </button>
  );
};

const Breed = (props) => {
  return (
    <div className="breed">
      <ul>
        {props.breed &&
          props.breed.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.name}</a>
              {props.breedIcon}
            </li>
          ))}
      </ul>
    </div>
  );
};

export { Modal, MaterialInput, MaterialButton, DropdownMenu, Anchor, Breed };
