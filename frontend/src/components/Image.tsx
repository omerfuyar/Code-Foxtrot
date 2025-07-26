import React from 'react';
import './Image.css';

interface ImageProperties {
    className?: string;

    src: string;

    alt: string;

    size?: { width: number; height: number };
}

const Image: React.FC<ImageProperties> = ({ src, alt, className, size }) => {
    const combinedClassName = `
    image 
    ${className || ''}
    `.trim();

    const cssStyles: React.CSSProperties = {};

    if (size) {
        cssStyles.width = `${size.width}px`;
        cssStyles.height = `${size.height}px`;
    }

    return (
        <div>
            <img
                className={combinedClassName}
                src={src}
                alt={alt}
                style={cssStyles}
            />
        </div>
    );
};

export default Image;