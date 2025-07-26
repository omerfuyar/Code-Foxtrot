import React from 'react'
import './DropDownMenu.css';

interface DropdownMenuProperties {
    className: string;
}

const DropdownMenu: React.FC<DropdownMenuProperties> = (properties) => {
    const combinedClassName = `dropdown-menu ${properties.className}`.trim();

    return (
        <div className={combinedClassName}>
        </div>
    );
};

export default DropdownMenu;