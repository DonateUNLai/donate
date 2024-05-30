import React, { useEffect } from "react";
import { Select as NEXTUISelect, SelectItem, Selection } from "@nextui-org/react";

export interface SelectOption {
    key: string;
    label: string;
    value: string;
}

export interface SelectProps {
    options: SelectOption[];
    onChange: (value: string) => void;
    label: string;
    value?: string;
}

export default function Select(props: SelectProps) {
    const { options, onChange, label, value } = props;
    const [val, setVal] = React.useState<string | undefined>(value);

    useEffect(() => {
        if (val !== value) {
            setVal(value)
        }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setVal(value);
        if (onChange) onChange(value)
    }

    return (
        <NEXTUISelect
            label={label}
            placeholder={`Please Select ${label}`}
            selectedKeys={val ? [val] : []}
            onChange={handleChange}
        >
            {options.map((option) => (
                <SelectItem key={option.key}>
                    {option.label}
                </SelectItem>
            ))}
        </NEXTUISelect>
    );
}
