"use client";
import Form from "@/app/components/Form";
import Image from "next/image";
import { Project } from "@/app/type";
import {
  donateProject,
  donateProjectAbi,
  fetchProjects,
  message,
} from "@/app/utils";
import { NextPage } from "next";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Address, parseEther, parseUnits } from "viem";
import {
  useAccount,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import Nft from "@/app/components/Nft";

const currency = [
  { key: "eth", label: "ETH", value: "eth" },
  { key: "usdc", label: "USDC", value: "usdc" },
];

const Page: NextPage = () => {
  const { chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const [open, setOpen] = useState<boolean>(false);
  const [nftOpen, setNftOpen] = useState<boolean>(false);
  const [detail, setDetail] = useState<Project>({});
  const { id } = useParams();

  const handleSubmit = async (values: Record<string, any>) => {
    const { _assests, _amount } = values;

    if (_assests === "eth") {
      writeContract({
        address: detail.address as Address,
        abi: donateProjectAbi.abi,
        functionName: "donateETH",
        value: parseEther(String(_amount)),
      });
    }
    if (_assests === "usdc")
      writeContract({
        address: detail.address as Address,
        abi: donateProjectAbi.abi,
        functionName: "donateUSDC",
        args: [parseUnits(_amount, 6)],
      });
  };

  const handleGetNft = () => {};

  const handleFetchProject = async (id?: string) => {
    if (id) {
      const { data = [] } = await fetchProjects();
      const detail = data.find((i: Project) => i._id === id);
      setDetail(detail);
    }
  };

  useEffect(() => {
    handleFetchProject(id as string);
  }, [id]);

  const handleDonateSuccess = async () => {
    await donateProject({ hash });
    setOpen(!open);
  };

  useEffect(() => {
    if (hash) {
      handleDonateSuccess();
    }
  }, [hash]);

  useEffect(() => {
    if (isSuccess) {
      message.success("Donate Successfully!");
    }
  }, [isSuccess]);

  return (
    <div>
      <Head>
        <title>UN Donate Project {id}</title>
      </Head>

      <main className="mt-[50px] px-[245px] flex flex-col items-center gap-[12px]">
        {isLoading || isSuccess ? (
          <div>
            <div className="flex flex-col items-center">
              <Image
                className={isSuccess ? "" : "animate-shake"}
                src={
                  isSuccess
                    ? "/images/donate/success.svg"
                    : "/images/donate/loading.svg"
                }
                width={348}
                height={290}
                alt="loading/success"
              />
              <span className="mt-[50px] font-blod text-[32px]">
                {isSuccess ? "Success" : "Loading"}
              </span>
              {isSuccess && hash && (
                <div className="flex flex-col items-center">
                  <a
                    className="mt-[25px] text-[24px] text-[#169BD5] cursor-pointer"
                    href={`https://sepolia.etherscan.io/tx/${hash}`}
                    target="_blank"
                  >
                    View on Etherscan
                  </a>
                  <Nft open={nftOpen} setOpen={setNftOpen} />
                </div>
              )}
            </div>
            <Image
              className="fixed bottom-0 left-[300px] z-[-1]"
              src="/images/hands.png"
              width={1200}
              height={550}
              alt="hands"
            />
          </div>
        ) : (
          <>
            <span className="font-bold text-[24px]">Donate funds</span>
            <Image
              className="w-[471px] h-[257px] rounded-[10px] overflow-hidden"
              src={`/images/project/1.png`}
              alt={detail?.title || ""}
              width={471}
              height={257}
            />
            <span>
              {detail?.title}:{detail?.description}
            </span>
            <Form
              submitText="Donate"
              initValues={{
                _network: chain?.id,
                _assests: "eth",
              }}
              disabled={isPending}
              loading={isLoading || isPending}
              fields={[
                {
                  type: "select",
                  label: "Network",
                  name: "_network",
                  options: chains.map((i) => ({
                    key: i.id as any,
                    label: i.name,
                    value: i.name,
                  })),
                  onFormItemChange: (id) =>
                    switchChain({ chainId: Number(id) as any }),
                },
                {
                  type: "select",
                  label: "Assests",
                  name: "_assests",
                  options: currency,
                },
                { type: "number", label: "Donate amount", name: "_amount" },
              ]}
              onSubmit={handleSubmit}
              onCancel={() => setOpen(!open)}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default Page;
