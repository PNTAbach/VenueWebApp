import React from 'react';
import Button from 'react-bootstrap/Button';

export interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: string;
    size?: 'sm' | 'lg';
    className?: string;
}

const CButton: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled = false,
    variant,
    size,
    className,
}) => {
    return (
        <Button
            className={className}
            onClick={onClick}
            disabled={disabled}
            variant={variant}
            size={size}
        >
            {label}
        </Button>
    );
};

export default CButton;
