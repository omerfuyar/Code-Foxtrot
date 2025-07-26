import React from 'react';
import './Button.css';

interface ButtonProps {
    className?: string;

    boxless?: boolean;

    size?: { width: number; height: number };

    text: string;

    onClick?: () => void;

    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = (properties) => {
    const combinedClassName = `
    custom-button 
    ${properties.className || ''} 
    ${properties.boxless ? 'boxless' : ''}
    `.trim();

    const cssStyles: React.CSSProperties = {};

    if (properties.size) {
        cssStyles.width = `${properties.size.width}px`;
        cssStyles.height = `${properties.size.height}px`;
    }

    return (
        <div>
            <button
                className={combinedClassName}
                onClick={properties.onClick}
                type={properties.type}
                style={cssStyles}
            >
                {properties.text}
            </button>
        </div>
    );
};

export default Button;