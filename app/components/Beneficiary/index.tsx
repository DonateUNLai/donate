import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import Form from "../Form";
import Modal from "../Modal";
import { donateProjectAbi, message } from "@/app/utils";
import { Address } from "viem";
import { useEffect } from "react";
import { Project } from "@/app/type";

interface BeneficiaryProps {
  open: boolean;
  setOpen: (...args: any) => void;
  project?: Project;
}

const Beneficiary = (props: BeneficiaryProps) => {
  const { open, setOpen, project } = props;

  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleSubmit = async (values: Record<string, any>) => {
    const { receiverAddress } = values;

    writeContract({
      address: project?.address as Address,
      abi: donateProjectAbi.abi,
      functionName: "addReciver",
      args: [receiverAddress, project?.totalAmount, "ETH"],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Add Beneficiary Successfully!");
      () => setOpen(!open);
    }
  }, [isSuccess]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(!open)}
      title="Add Project Beneficiary"
    >
      <Form
        disabled={isPending}
        loading={isLoading || isPending}
        fields={[
          {
            type: "text",
            label: "Beneficiary Address",
            name: "receiverAddress",
          },
        ]}
        onSubmit={handleSubmit}
        onCancel={() => setOpen(!open)}
      />
    </Modal>
  );
};

export default Beneficiary;
