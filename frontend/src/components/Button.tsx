import React from 'react';
import './Button.css';

const COMPONENT_CLASS_NAME_BUTTON = "custom-button";

interface ButtonProps {
    className?: string;

    size?: { width: number; height: number };

    onClick?: () => void;

    type?: "button" | "submit" | "reset";

    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (properties) => {
    const cssStyles: React.CSSProperties = {};
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    //const button = buttonRef.current;

    if (properties.size) {
        cssStyles.width = `${properties.size.width}px`;
        cssStyles.height = `${properties.size.height}px`;
    }

    const combinedClassName = `${COMPONENT_CLASS_NAME_BUTTON} ${properties.className || ''}`.trim();

    return (
        <div>
            <button
                ref={buttonRef}
                className={combinedClassName}
                onClick={properties.onClick}
                type={properties.type}
                style={cssStyles}
            >
                {properties.children}
            </button>
        </div>
    );
};

export default Button;