import { Button } from "@nextui-org/react";
import Modal from "../Modal";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useEffect } from "react";
import { message, nftAbi } from "@/app/utils";
import { Address } from "viem";

interface NftProps {
  open: boolean;
  onClose: () => void;
}

const Nft = (props: NftProps) => {
  const { open, onClose } = props;
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
      onClose();
      message.success("Generate NFT Successfully!");
    }
  }, [hash, isSuccess]);
  return hash ? (
    <a
      className="mt-[25px] text-[24px] text-[#169BD5] cursor-pointer"
      href={`https://sepolia.etherscan.io/tx/${hash}`}
      target="_blank"
    >
      NFT on Etherscan
    </a>
  ) : (
    <>
      <Modal open={open} onClose={onClose} title="Get Your NFT?">
        <div>
          <span>You can pay some Gas to get your nft</span>
          <div>
            <Button onClick={onClose} isLoading={isLoading || isPending}>
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
      <Button className="mt-[12px] text-[16px] text-[#169BD5]">
        Get Yours NFT?
      </Button>
    </>
  );
};

export default Nft;
