import React from 'react';

const FormInput = (props) => {
    const { label, errorMessage, onChange, id, required, ...inputProps } = props;
  
    const [focused, setFocused] = React.useState(false);
  
    const handleFocused = () => {
      setFocused(true);
    };
  
    return (
      <div className="formInput">
        <label htmlFor={id}>{label}</label>
        <input
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocused}
          onFocus={() =>
            inputProps.name === "confirmPassword" && setFocused(true)
          }
          focused={focused.toString()}
          required={required ? true : false} // Convert required prop to boolean
        />
        <span>{errorMessage}</span>
      </div>
    );
  };
  
export default FormInput;
