import { useState } from "react";
import { Input, Textarea, DatePicker, Button } from "@nextui-org/react";

interface Field {
    type: 'text' | 'date' | 'textarea',
    name: string;
    label: string;
}

interface FormProps {
    fields: Field[];
    onSubmit: (values: Record<string, any>) => void
    onCancel: () => void;
}

const formatDate = (dateData: Record<string, any>) => {
    const date = new Date(dateData.year, dateData.month - 1, dateData.day);
    return date.toLocaleDateString('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

const formatData = (data: Record<string, any>) => {
    const newData = { ...data };
    Object.keys(newData).forEach(key => Object.assign(newData, {
        [key]: typeof newData[key] === 'object' ? formatDate(newData[key]) : newData[key]
    }))
    return newData;
}

export default function Form(props: FormProps) {
    const { fields, onSubmit, onCancel } = props;
    const [form, setForm] = useState<Record<string, any>>({});

    const renderFormField = (i: Field) => {
        const { type, name } = i;
        if (type === 'textarea') {
            return (
                <Textarea value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} />
            )
        }
        if (type === 'date') {
            return (
                <DatePicker value={form[name]} onChange={value => setForm({ ...form, [name]: value })} />
            )
        }
        return (
            <Input value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} />
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
                <Button color="primary" onClick={() => onSubmit(formatData(form))}>Create</Button>
                <Button onClick={onCancel}>Cancle</Button>
            </div>
        </div>
    )

}