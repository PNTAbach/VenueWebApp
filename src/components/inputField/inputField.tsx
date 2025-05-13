import React from 'react';

interface InputFieldProps {
    label?: string;
    placeholder: string;
    type?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    placeholder,
    type,
    value,
    onChange,
    className,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { value } = event.target;
        if (onChange) {
            onChange(value); // Call the onChange prop with the new value
        }
    };
    return (
        <div>
            <label>{label}</label>
            <input
                className={className}
                type={type}
                placeholder={placeholder}
                value={value} // Bind the value to the input
                onChange={handleChange} // Bind the handleChange function to onChange event
            />
        </div>
    );
};

export default InputField;
