'use client'
import { NextPage } from 'next';
import Header from '../layouts/Header';
import Table from '../components/Table';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import Modal from '../components/Modal';
import Form from '../components/Form';

const columns = [
    { name: "Title", uid: "title" },
    { name: "Image", uid: "url" },
    { name: "Sescription", uid: "description" },
    { name: "Amount", uid: "amount" },
    { name: "EndTime", uid: "endTime" },
];

const dataSource = new Array(12).fill(1).map((_, id) => ({
    id,
    title: `Ukraine ${id + 1}`,
    url: '/images/project/1.png',
    description: `UN works for peaceful resolutionof crisis, respect for human rights ${id + 1}`,
    amount: `0x3d**dss${id}`,
    endTime: `2028-01-1${id}`
}))

const Admin: NextPage = () => {
    const [open, setOpen] = useState<boolean>(true);

    const handleSubmit = (values: Record<string, any>) => {
        console.log(values);
    }
    return (
        <div>
            <Header />
            <Modal open={open} onClose={() => setOpen(!open)} title='Create Project'>
                <Form
                    fields={[
                        { type: 'text', label: 'Title', name: 'title' },
                        { type: 'textarea', label: 'Description', name: 'description' },
                        { type: 'text', label: 'Raised Amount:', name: 'amount' },
                        { type: 'date', label: 'End Time', name: 'endTime' },
                    ]}
                    onSubmit={handleSubmit}
                    onCancel={() => setOpen(!open)}
                />
            </Modal>
            <div className='mt-[24px] px-[16px]'>
                <Button className='mb-[12px]' size='sm' color="primary" onClick={() => setOpen(!open)}>Add Project</Button>

                <Table
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        </div>
    )
}

export default Admin;