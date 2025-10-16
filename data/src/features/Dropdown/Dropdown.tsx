"use client";

import React from "react";
import arrowDown from "@/assets/icons/GC.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

import "./Dropdown.css";

interface DropdownItem {
    text?: string;
    label?: string;
    link: string;
    value?: string;
    category?: string;
    onClick?: () => void;
}

interface DropdownProps {
    title: string;
    link: string;
    items: DropdownItem[];
    category?: (categoryValue: string) => void;
}

const DropDown: React.FC<DropdownProps> = ({ title, items, category }) => {
    const router = useRouter();

    const handleItemClick = (item: DropdownItem, e: React.MouseEvent<HTMLAnchorElement>) => {
        if (item.category && category) {
            category(item.category);
        }

        if (item.link !== "/contactUs") {
            e.preventDefault();
            if (item.value) {
                router.push(`${item.link}?activeContent=${item.value}`);
            } else {
                router.push(item.link);
            }
        }

        if (item.onClick) {
            item.onClick();
        }
    };

    return (
        <div className="menu">
            <div className="item">
                <div className="link" >
                    <span>{title}</span>
                    <img src={arrowDown} alt="" className="arrowDown" />
                </div>
                <div className="submenu">
                    {items.map((item, index) => (
                        <div className="submenu-item" key={index}>
                            <Link
                                href={item.link}
                                className="submenu-link"
                                onClick={(e) => handleItemClick(item, e)}
                            >
                                {item.text || item.label}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropDown;