import { useEffect, useState } from "react";
import { Input, Textarea, Button } from "@nextui-org/react";
import Select, { SelectOption } from "../Select";

interface Field {
    type: 'text' | 'date' | 'textarea' | 'number' | 'select',
    name: string;
    label: string;
    options?: SelectOption[];
    onFormItemChange?: (value: any) => void;
}

interface FormProps {
    initValues?: Record<string, any>;
    fields: Field[];
    onSubmit: (values: Record<string, any>) => void
    onCancel: () => void;
    loading?: boolean;
    disabled?: boolean;
}

export default function Form(props: FormProps) {
    const { fields, onSubmit, onCancel, loading, disabled, initValues = {} } = props;
    const [form, setForm] = useState<Record<string, any>>({});

    useEffect(() => {
        setForm({
            ...form,
            ...initValues
        })
    }, [JSON.stringify(initValues)])

    const renderFormField = (i: Field) => {
        const { type, name, options = [], label, onFormItemChange } = i;

        const handleValueChange = (key: string, value: any) => {
            if (onFormItemChange) onFormItemChange(value);
            setForm({ ...form, [key]: value })
        }

        if (type === 'textarea') {
            return (
                <Textarea value={form[name]} onChange={e => handleValueChange(name, e.target.value)} />
            )
        }
        if (type === 'number') {
            return (
                <Input type="number" value={form[name]} onChange={e => handleValueChange(name, Number(e.target.value))} />
            )
        }
        if (type === 'date') {
            return (
                <Input type='datetime-local' value={form[name]} onChange={e => handleValueChange(name, e.target.value)} />
            )
        }
        if (type === 'select') {

            return (
                <Select label={label} value={form[name]} options={options} onChange={value => handleValueChange(name, value)} />
            )
        }
        return (
            <Input value={form[name]} onChange={e => handleValueChange(name, e.target.value)} />
        )
    }
    return (
        <div className="flex flex-col gap-[24px]">
            {
                fields.map(i => (
                    <div className="flex flex-row gap-[8px]" key={i.name}>
                        <span className='w-[200px]'>{i.label}:</span>
                        {renderFormField(i)}
                    </div>
                ))
            }

            <div className="flex flex-row items-center justify-center gap-[8px]">
                <Button color="primary" onClick={() => onSubmit(form)} isLoading={loading}>Create</Button>
                <Button onClick={onCancel} disabled={disabled}>Cancle</Button>
            </div>
        </div>
    )

}