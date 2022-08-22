import { useRef } from "react";
import Autocomplete from "react-autocomplete";
import "./input.css";

export function Input({ options = [], label, ...props }) {
    const ref = useRef(null);

    return <div className="input">
        <div className="control__label">{label}</div>
        <div className="input__control">
        <Autocomplete 
            getItemValue={(item) => item}
            items={options.filter(option => option.includes(props.value))}
            renderItem={(item) =>
              <div className="input__option">
                {item}
              </div>
            }
            {...props}
        />
        </div>
    </div>
}