import React from 'react'
import './DropDownMenu.css';
import { Dropdown } from 'react-bootstrap';

const DropDownMenuItem = Dropdown.Item;

interface DropdownMenuProperties {
    className?: string;

    text: string;

    children: React.ReactNode;
}

const DropdownMenuComponent: React.FC<DropdownMenuProperties> = (properties) => {
    const combinedClassName = `
    dropdown-menu 
    ${properties.className}
    `.trim();

    const [show, setShow] = React.useState<boolean>(false);

    const handleMouseEnter = () => { setShow(true); };
    const handleMouseLeave = () => { setShow(false); };

    return (
        <div>
            <Dropdown
                className={combinedClassName}
                show={show}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Dropdown.Toggle variant="success">
                    {properties.text}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {properties.children}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

type DropdownType = typeof DropdownMenuComponent & {
    Item: typeof DropDownMenuItem;
};

const DropdownMenu = DropdownMenuComponent as DropdownType;
DropdownMenu.Item = DropDownMenuItem;

export default DropdownMenu;