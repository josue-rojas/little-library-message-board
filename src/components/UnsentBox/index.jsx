import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";
import TextColorPicker from "components/TextColorPicker";
import DefaultColorPicker from "components/DefaultColorPicker";
import ColorTextArea from "components/ColorTextArea";

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const randomColor = () => {
  return `rgb(${getRandomInt(256)}, ${getRandomInt(256)}, ${getRandomInt(
    256
  )})`;
};

const UnsentBox = ({
  initBackgroundColor,
  initMessage,
  initTextColor,
  initDate,
  isDisabled,
  sendCallBack,
  textOnchange,
  toOnChange
}) => {
  const [backgroundColor, backgroundColorChange] = useState(
    initBackgroundColor || randomColor()
  );
  const [textColor, textColorChange] = useState(initTextColor || randomColor());
  const [dateValue, dateValueChange] = useState(initDate);
  const [text, textChange] = useState(initMessage);
  const history = useHistory();

  useEffect(() => {
    if (!!initMessage && initMessage !== text) textChange(initMessage);
  }, [initMessage, text]);

  // if initDate is define and it is not handle up the chain then it will become readonly
  useEffect(() => {
    if (!!initDate && initDate !== dateValue) dateValueChange(initDate);
  }, [initDate, dateValue]);

  useEffect(() => {
    if (!!initBackgroundColor && initBackgroundColor !== backgroundColor)
      backgroundColorChange(initBackgroundColor);
  }, [initBackgroundColor, backgroundColor]);

  useEffect(() => {
    if (!!initTextColor && initTextColor !== textColor)
      textColorChange(initTextColor);
  }, [initTextColor, textColor]);

  // handle value changes for text as a parent woulld normally do
  // but since not all parents care for their child,
  // it only alerts it for those that care (fake 2 way binding cause you also need to keep track of the change in the parent else is readonly)
  const _textOnchange = nextValue => {
    textChange(nextValue);
    textOnchange && textOnchange(nextValue);
  };

  const _toOnChange = nextValue => {
    dateValueChange(nextValue);
    toOnChange && toOnChange(nextValue);
  };

  const sendData = () => {
    // TODO: make this more efficiencent or at least check when onchange ?!?!
    const isTextMin = text.trim().length > 0;
    !isDisabled &&
      sendCallBack &&
      isTextMin &&
      sendCallBack({
        backgroundColor: backgroundColor,
        textColor: textColor,
        text: text,
        dateAdded: dateValue
      });
  };

  return (
    <div className={styles.unsentBox}>
      <div className={styles.top}>
        <TextColorPicker
          colorOnChange={c => textColorChange(c)}
          initColor={initTextColor}
          readOnly={isDisabled}
        />
        <span className={styles.textWrapper}>
          <input
            className={styles.toInput}
            id="sender"
            onChange={_ => _toOnChange(_.target.value)}
            type="text"
            readOnly={true}
            value={new Date(dateValue).toDateString()}
          />
        </span>
        <DefaultColorPicker
          colorOnChange={c => backgroundColorChange(c)}
          initColor={initBackgroundColor}
          readOnly={isDisabled}
        />
      </div>
      <div className={styles.middle}>
        <ColorTextArea
          backgroundColor={backgroundColor}
          onChange={_textOnchange}
          textColor={textColor}
          readOnly={isDisabled}
          value={text}
        />
      </div>
      <div className={styles.bottom}>
        <span className={styles.clickable} onClick={sendData}>
          Send
        </span>
        {/* TODO: replace with a better link */}
        <a href="https://links.withcheesepls.com">
          #pelhamparkway
        </a>
        {
          //"TODO: still not sure what to do with back"
        }
        <span onClick={() => history.goBack()} className={styles.clickable}>
          Back
        </span>
      </div>
    </div>
  );
};

UnsentBox.defaultProps = {
  initMessage: "",
  initDate: Date.now()
};

UnsentBox.propTypes = {
  initBackgroundColor: PropTypes.string,
  initMessage: PropTypes.string,
  initTextColor: PropTypes.string,
  initDate: PropTypes.number,
  isDisabled: PropTypes.bool,
  sendCallBack: PropTypes.func,
  textOnchange: PropTypes.func,
  toOnchange: PropTypes.func
};

export default UnsentBox;
