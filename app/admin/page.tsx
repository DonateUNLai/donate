"use client";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import { Address } from "viem";
import { parse, getTime } from "date-fns";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Button } from "@nextui-org/react";
import Header from "../layouts/Header";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Form from "../components/Form";
import { donateAbi, createProject, fetchProjects, message } from "../utils";
import { Project } from "../type";
import Beneficiary from "../components/Beneficiary";

const Admin: NextPage = () => {
  const [list, setList] = useState<Project[]>([]);
  const [update, setUpdate] = useState<number>(0);
  const [currentProject, setCurrentProject] = useState<Project>({});
  const forceUpdate = () => setUpdate((update) => update + 1);
  const [open, setOpen] = useState<boolean>(false);
  const [openBeneficiary, setBeneficiaryOpen] = useState<boolean>(false);
  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleFetchProjects = async () => {
    const { data = [] } = await fetchProjects();
    setList(data);
  };

  const handleSubmit = async (values: Record<string, any>) => {
    const { _title, _description, _totalAmount, _endTime } = values;
    writeContract({
      address: donateAbi.address as Address,
      abi: donateAbi.abi,
      functionName: "createDonate",
      args: [
        BigInt(_totalAmount),
        getTime(parse(_endTime, "yyyy-MM-dd'T'HH:mm", new Date())) / 1000,
        _title,
        _description,
      ],
    });
  };

  const handleProjectCreate = async () => {
    await createProject({ hash });
    setOpen(!open);
    forceUpdate();
  };

  useEffect(() => {
    if (hash) {
      handleProjectCreate();
    }
  }, [hash]);

  useEffect(() => {
    if (isSuccess) {
      message.success("Create Project Successfully!");
    }
  }, [isSuccess]);

  useEffect(() => {
    handleFetchProjects();
  }, [update]);

  const handleProjectAdd = (item: Project) => {
    setCurrentProject(item);
    setBeneficiaryOpen(!openBeneficiary);
  };

  const columns = [
    { name: "Title", uid: "title" },
    { name: "Image", uid: "url" },
    { name: "Description", uid: "description" },
    { name: "Amount", uid: "totalAmount" },
    {
      name: "EndTime",
      uid: "endTime",
      render: ({ endTime }: { endTime: number }) =>
        new Date(endTime * 1000)
          .toISOString()
          ?.replace(".000Z", "")
          ?.split("T")
          ?.join(" ") || "-",
    },
    {
      name: "Beneficiary",
      uid: "beneficiary",
      render: (item: Project) => (
        <Button
          color="primary"
          size="sm"
          onClick={() => handleProjectAdd(item)}
        >
          Add
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Header />
      <Modal open={open} onClose={() => setOpen(!open)} title="Create Project">
        <Form
          disabled={isPending}
          loading={isLoading}
          fields={[
            { type: "text", label: "Title", name: "_title" },
            { type: "textarea", label: "Description", name: "_description" },
            { type: "number", label: "Raised Amount", name: "_totalAmount" },
            { type: "date", label: "End Time", name: "_endTime" },
          ]}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(!open)}
        />
      </Modal>
      <Beneficiary
        open={openBeneficiary}
        setOpen={setBeneficiaryOpen}
        project={currentProject}
      />
      <div className="mt-[24px] px-[16px]">
        <Button
          className="mb-[12px]"
          size="sm"
          color="primary"
          onClick={() => setOpen(!open)}
        >
          Add Project
        </Button>

        <Table dataSource={list} columns={columns} />
      </div>
    </div>
  );
};

export default Admin;
