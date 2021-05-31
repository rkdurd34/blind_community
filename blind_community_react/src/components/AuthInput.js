import React from 'react';

export default function AuthInput({
  className,
  type,
  inputType,
  changeHandler,
  eventHandler,
  placeholder }) {
  return (


    <div>
      <label>{type}</label>
      <input
        placeholder={placeholder}
        className={className}
        type={inputType}
        onChange={(event) => changeHandler(event.target.value)}
        onKeyPress={(e) => { if (e.key === "Enter") eventHandler(); }}
      />
    </div>

  );
}

AuthInput.defaultProps = {
  className: ``,
  type: ``,
  placeholder: ``,
  inputType: `text`,
  eventHandler: () => { },
};