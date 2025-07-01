import Choices from 'choices.js';
import { useEffect, useRef } from 'react';

const ChoicesFormInput = ({
  children,
  multiple,
  className,
  onChange,
  value,
  allowInput,
  options,
  ...props
}) => {
  const choicesRef = useRef(null);
  const choicesInstanceRef = useRef(null);

  useEffect(() => {
    if (choicesRef.current) {
      const choices = new Choices(choicesRef.current, {
        ...options,
        placeholder: true,
        allowHTML: true,
        shouldSort: false
      });
      
      choicesInstanceRef.current = choices;
      
      choices.passedElement.element.addEventListener('change', e => {
        if (!(e.target instanceof HTMLSelectElement)) return;
        if (onChange) {
          onChange(e);
        }
      });
    }

    return () => {
      if (choicesInstanceRef.current) {
        choicesInstanceRef.current.destroy();
      }
    };
  }, []);

  // Update choices when value changes
  useEffect(() => {
    if (choicesInstanceRef.current && value !== undefined) {
      choicesInstanceRef.current.setChoiceByValue(value);
    }
  }, [value]);

  return allowInput ? (
    <input 
      ref={choicesRef} 
      multiple={multiple} 
      className={className} 
      value={value}
      {...props} 
    />
  ) : (
    <select 
      ref={choicesRef} 
      multiple={multiple} 
      className={className} 
      value={value}
      {...props}
    >
      {children}
    </select>
  );
};

export default ChoicesFormInput;
