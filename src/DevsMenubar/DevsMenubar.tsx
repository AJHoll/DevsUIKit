import './DevsMenubar.scss';
import React from "react";
import {Menubar, MenubarProps} from "primereact/menubar";
import {MenuItem} from "primereact/menuitem";
import {IconType} from "primereact/utils";

export interface DevsMenubarProps {
    model?: DevsMenuItem[];
    start?: React.ReactNode | ((props: MenubarProps) => React.ReactNode);
    end?: React.ReactNode | ((props: MenubarProps) => React.ReactNode);
    className?: string;
    menuIcon?: IconType<MenubarProps>;
    submenuIcon?: IconType<MenubarProps>;
    onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
}

export interface DevsMenuItem extends MenuItem {
}

export default class DevsMenubar extends React.Component<DevsMenubarProps> {
    render() {
        const {
            model, start, end, className,
            menuIcon, submenuIcon, onFocus, onBlur
        } = this.props;
        return <Menubar model={model}
                        start={start}
                        end={end}
                        className={className}
                        menuIcon={menuIcon}
                        submenuIcon={submenuIcon}
                        onFocus={onFocus}
                        onBlur={onBlur}
        />;
    }
}