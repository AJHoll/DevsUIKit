import React from 'react';
import { Toast, ToastMessage, ToastProps } from 'primereact/toast';
import { CSSTransitionProps } from 'primereact/csstransition';

export interface DevsToastProps {
    baseZIndex?: number | undefined;
    position?: ToastProps['position'];
    transitionOptions?: CSSTransitionProps | undefined;
    appendTo?: 'self' | HTMLElement | null | undefined;
    children?: React.ReactNode | undefined;
    onClick?: (message: ToastMessage) => void;
    onRemove?: (message: ToastMessage) => void;
    onShow?: () => void;
    onHide?: () => void;
}

export default class DevsToast extends React.Component<DevsToastProps> {
    toastRef: React.RefObject<Toast> = React.createRef();

    toastLife = 3000;

    // eslint-disable-next-line react/no-unused-class-component-methods
    info(title: string, content?: string): void {
        this.toastRef.current?.show({
            severity: 'info',
            summary: title,
            detail: content,
            life: this.toastLife,
            icon: 'lni lni-information',
        });
    }

    // eslint-disable-next-line react/no-unused-class-component-methods
    success(title: string, content?: string): void {
        this.toastRef.current?.show({
            severity: 'success',
            summary: title,
            detail: content,
            life: this.toastLife,
            icon: 'lni lni-checkmark',
        });
    }

    // eslint-disable-next-line react/no-unused-class-component-methods
    warning(title: string, content?: string): void {
        this.toastRef.current?.show({
            severity: 'warn',
            summary: title,
            detail: content,
            life: this.toastLife,
            icon: 'lni lni-warning',
        });
    }

    // eslint-disable-next-line react/no-unused-class-component-methods
    error(title: string, content?: string): void {
        this.toastRef.current?.show({
            severity: 'error',
            summary: title,
            detail: content,
            life: this.toastLife,
            icon: 'lni lni-alarm',
        });
    }

    render() {
        const {
            baseZIndex, position, transitionOptions, appendTo,
            children, onClick, onRemove, onShow, onHide,
        } = this.props;
        return (
            <Toast ref={this.toastRef}
                   className="devs_toast"
                   baseZIndex={baseZIndex}
                   position={position ?? 'top-right'}
                   transitionOptions={transitionOptions}
                   appendTo={appendTo}
                   onClick={onClick}
                   onRemove={onRemove}
                   onShow={onShow}
                   onHide={onHide}
            >
                {children}
            </Toast>
        );
    }
}
