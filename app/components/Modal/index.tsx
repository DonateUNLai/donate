import React from "react";
import { Modal as NextUIModal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

interface ModalProps {
    open?: boolean;
    children?: React.ReactNode;
    title?: string;
    onClose?: () => void;
}

export default function Modal(props: ModalProps) {
    const { open, children, title = 'Modal Title', onClose } = props;
    return (
        <NextUIModal
            size='5xl'
            isOpen={open}
            onClose={onClose}
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                        <ModalBody>
                            {children}
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </NextUIModal>
    );
}
