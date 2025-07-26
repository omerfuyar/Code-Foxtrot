import React from 'react';
import './TopBar.css';

interface TopBarSectionProperties {
    children: React.ReactNode;
}

const TopBarLeft: React.FC<TopBarSectionProperties> = (properties) => {
    return <div className="top-bar-left">{properties.children}</div>;
};

const TopBarRight: React.FC<TopBarSectionProperties> = (properties) => {
    return <div className="top-bar-right">{properties.children}</div>;
};

interface TopBarProperties {
    className?: string;

    minHeight?: number;

    maxHeight?: number;

    children: React.ReactNode;
}

const TopBarComponent: React.FC<TopBarProperties> = (properties) => {
    const combinedClassName = `
    top-bar 
    ${properties.className || ''}
    `.trim();

    const cssStyles: React.CSSProperties = {};

    if (properties.minHeight) {
        cssStyles.minHeight = `${properties.minHeight}px`;
    }

    if (properties.maxHeight) {
        cssStyles.maxHeight = `${properties.maxHeight}px`;
    }

    return (
        <div
            className={combinedClassName}
            style={cssStyles}
        >
            {properties.children}
        </div>
    );
};

type TopBarType = typeof TopBarComponent & {
    Left: typeof TopBarLeft;
    Right: typeof TopBarRight;
};

const TopBar = TopBarComponent as TopBarType;
TopBar.Left = TopBarLeft;
TopBar.Right = TopBarRight;


export default TopBar;