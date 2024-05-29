'use client'
import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { parseEther, Address } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { Button } from '@nextui-org/react';
import Header from '../layouts/Header';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Form from '../components/Form';
import { donateAbi, createProject } from '../utils';

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
    const { data: hash, isPending, writeContract } = useWriteContract();
    const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
        hash
    });

    const handleSubmit = async (values: Record<string, any>) => {
        const { _title, _description, _totalAmount, _endTime } = values;
        console.log('values', values)
        console.log('donateAbi address', donateAbi.address);
        console.log('donateAbi abi', donateAbi.abi);
        try {
            donateAbi.abi
            writeContract({
                address: donateAbi.address as Address,
                abi: donateAbi.abi,
                functionName: 'createDonate',
                args: [_totalAmount, _endTime, _title, _description],
            })
        } catch (err) {
            console.log(err)
        }

    }

    const handleProjectCreate = async () => {
        await createProject({ hash })
        setOpen(!open);
    }

    useEffect(() => {
        if (hash) {
            handleProjectCreate()
        }
    }, [hash])

    console.log('hash', hash);
    console.log('isPending', isPending);
    console.log('isLoading', isLoading);
    console.log('isSuccess', isSuccess);
    console.log('isError', isError);

    return (
        <div>
            <Header />
            <Modal open={open} onClose={() => setOpen(!open)} title='Create Project'>
                <Form
                    loading={isLoading}
                    fields={[
                        { type: 'text', label: 'Title', name: '_title' },
                        { type: 'textarea', label: 'Description', name: '_description' },
                        { type: 'number', label: 'Raised Amount:', name: '_totalAmount' },
                        { type: 'date', label: 'End Time', name: '_endTime' },
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