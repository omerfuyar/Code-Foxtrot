import React from 'react'
import './ShowcasePanel.css';

interface ShowcasePanelProperties {
    className: string;
}

const ShowcasePanel: React.FC<ShowcasePanelProperties> = (properties) => {
    const combinedClassName = `
    showcase-panel 
    ${properties.className}
    `.trim();

    return (
        <div className={combinedClassName}>
        </div>
    );
};

export default ShowcasePanel;