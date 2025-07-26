import React from 'react';
import './Canvas.css';

const COMPONENT_CLASS_NAME_CANVAS = "custom-canvas";

interface CanvasProps {
    className?: string;

    position?: { x: number; y: number };

    size?: { width: number; height: number };

    children: React.ReactNode;
}

const Canvas: React.FC<CanvasProps> = (properties) => {
    const cssStyles: React.CSSProperties = {};

    const combinedClassName = `${COMPONENT_CLASS_NAME_CANVAS} ${properties.className || ''}`.trim();

    if (properties.position) {
        cssStyles.position = "absolute";
        cssStyles.left = `${properties.position.x}px`;
        cssStyles.top = `${properties.position.y}px`;
    }

    if (properties.size) {
        cssStyles.width = `${properties.size.width}px`;
        cssStyles.height = `${properties.size.height}px`;
    }

    return (
        <div>
            <canvas
                className={combinedClassName}
                style={cssStyles}
            >
                {properties.children}
            </canvas>
        </div>
    );
};

export default Canvas;