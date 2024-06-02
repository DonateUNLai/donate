import { Button } from "@nextui-org/react";
import Modal from "../Modal";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useEffect } from "react";
import { message, nftAbi } from "@/app/utils";
import { Address } from "viem";

interface NftProps {
  open: boolean;
  setOpen: (...args: any) => void;
}

const Nft = (props: NftProps) => {
  const { open, setOpen } = props;
  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleGetNft = () => {
    writeContract({
      address: nftAbi.address as Address,
      abi: nftAbi.abi,
      functionName: "mintNFT",
    });
  };

  useEffect(() => {
    if (hash && isSuccess) {
      setOpen(!open);
      message.success("Generate NFT Successfully!");
    }
  }, [hash, isSuccess]);
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(!open)} title="Get Your NFT?">
        <div className="h-[200px] flex flex-col items-center justify-between">
          <span>You can pay some Gas to get your nft</span>
          <div className="flex flex-row gap-[8px]">
            <Button
              onClick={() => setOpen(!open)}
              isLoading={isLoading || isPending}
            >
              No,Thanks
            </Button>
            <Button
              color="primary"
              onClick={handleGetNft}
              isLoading={isLoading || isPending}
            >
              Ok
            </Button>
          </div>
        </div>
      </Modal>
      {hash ? (
        <a
          className="mt-[25px] text-[24px] text-[#169BD5] cursor-pointer"
          href={`https://sepolia.etherscan.io/tx/${hash}`}
          target="_blank"
        >
          NFT on Etherscan
        </a>
      ) : (
        <>
          <Button
            className="mt-[12px] text-[16px] text-[#169BD5]"
            onClick={() => setOpen(!open)}
          >
            Get Yours NFT?
          </Button>
        </>
      )}
    </div>
  );
};

export default Nft;
