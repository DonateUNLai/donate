import { Dropdown as NextUiDropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

export interface DropdownItem {
    key: string;
    title: string;
    onClick: () => void
}

export interface DropdownProps {
    children?: React.ReactNode;
    items: DropdownItem[]
}

export default function Dropdown(props: DropdownProps) {
    const { children, items = [] } = props;
    return (
        <div className="flex items-center gap-4">
            <NextUiDropdown placement="bottom-start">
                <DropdownTrigger>{children}</DropdownTrigger>
                <DropdownMenu variant="flat">
                    {
                        items.map(i => (
                            <DropdownItem key={i.key} onClick={i.onClick}>
                                {i.title}
                            </DropdownItem>
                        ))
                    }
                </DropdownMenu>
            </NextUiDropdown>
        </div>
    );
}