import React from 'react';
import './TopBar.css';

interface TopBarSectionProps {
    children: React.ReactNode;
}

const TopBarLeft: React.FC<TopBarSectionProps> = (properties) => {
    return <div className="top-bar-left">{properties.children}</div>;
};

const TopBarRight: React.FC<TopBarSectionProps> = (properties) => {
    return <div className="top-bar-right">{properties.children}</div>;
};

interface TopBarProperties {
    className?: string;

    maxHeight?: number;

    children: React.ReactNode;
}

const TopBarComponent: React.FC<TopBarProperties> = (properties) => {
    const combinedClassName = `top-bar ${properties.className || ''}`.trim();

    const cssStyles: React.CSSProperties = {};

    const topBarRef = React.useRef<HTMLDivElement | null>(null);
    // const topBar = topBarRef.current;

    if (properties.maxHeight) {
        cssStyles.maxHeight = `${properties.maxHeight}px`;
    }

    return (
        <div
            ref={topBarRef}
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