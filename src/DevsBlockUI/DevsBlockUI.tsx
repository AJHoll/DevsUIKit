import React from 'react';
import { createPortal } from 'react-dom';

export interface BluckUIProps {
    visible: boolean;
    appendTo: string;
    children?: React.ReactElement | React.ReactElement[];
    onClick?: React.MouseEventHandler<HTMLDivElement>
    className?: string;
}

export default class DevsBlockUI extends React.Component<BluckUIProps> {
    render() {
        const { visible, appendTo, children, className } = this.props;
        const appendToDom = document.querySelector(appendTo);
        return appendToDom && visible
            ? createPortal((
                <div className={`devs_block_ui ${className ?? ''}`}
                     onClick={this.props.onClick}
                >
                    {children}
                </div>
            ), appendToDom)
            : '';
    }
}
