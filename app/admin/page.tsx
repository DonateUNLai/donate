'use client'
import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Address } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { Button } from '@nextui-org/react';
import Header from '../layouts/Header';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Form from '../components/Form';
import { donateAbi, createProject, fetchProjects, message } from '../utils';

const columns = [
    { name: "Title", uid: "title" },
    { name: "Image", uid: "url" },
    { name: "Description", uid: "description" },
    { name: "Amount", uid: "totalAmount" },
    { name: "EndTime", uid: "endTime" },
];

interface List {
    _id?: string;
    address?: string;
    creator?: string;
    description?: string;
    endTime?: number;
    hash?: string;
    startTime?: number;
    title?: string;
    totalAmount?: number;
}

const Admin: NextPage = () => {
    const [list, setList] = useState<List[]>([]);
    const [update, setUpdate] = useState<number>(0);
    const forceUpdate = () => setUpdate(update => update + 1);
    const [open, setOpen] = useState<boolean>(false);
    const { data: hash, isPending, writeContract } = useWriteContract();
    const { isLoading, isSuccess, isError, error } = useWaitForTransactionReceipt({ hash });

    const handleFetchProjects = async () => {
        const { data = [] } = await fetchProjects();
        setList(data);
    }

    const handleSubmit = async (values: Record<string, any>) => {
        const { _title, _description, _totalAmount, _endTime } = values;
        writeContract({
            address: donateAbi.address as Address,
            abi: donateAbi.abi,
            functionName: 'createDonate',
            args: [BigInt(_totalAmount), _endTime, _title, _description],
        })

    }

    const handleProjectCreate = async () => {
        await createProject({ hash })
        setOpen(!open);
    }

    useEffect(() => {
        if (hash) {
            handleProjectCreate();
        }
    }, [hash])

    useEffect(() => {
        if (isSuccess) {
            message.success('Create Project Successfully!');
            forceUpdate();
        }
    }, [isSuccess])

    useEffect(() => {
        handleFetchProjects()
    }, [update])



    return (
        <div>
            <Header />
            <Modal open={open} onClose={() => setOpen(!open)} title='Create Project'>
                <Form
                    disabled={isPending}
                    loading={isLoading}
                    fields={[
                        { type: 'text', label: 'Title', name: '_title' },
                        { type: 'textarea', label: 'Description', name: '_description' },
                        { type: 'number', label: 'Raised Amount', name: '_totalAmount' },
                        { type: 'date', label: 'End Time', name: '_endTime' },
                    ]}
                    onSubmit={handleSubmit}
                    onCancel={() => setOpen(!open)}
                />
            </Modal>
            <div className='mt-[24px] px-[16px]'>
                <Button className='mb-[12px]' size='sm' color="primary" onClick={() => setOpen(!open)}>Add Project</Button>

                <Table
                    dataSource={list}
                    columns={columns}
                />
            </div>
        </div>
    )
}

export default Admin;