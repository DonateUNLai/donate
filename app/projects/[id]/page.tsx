"use client";
import { Allocation, Donor, Project } from "@/app/type";
import {
  fetchProjects,
  fetchDonations,
  fetchAllocations,
  chainlinkAbi,
} from "@/app/utils";
import { Button, Progress } from "@nextui-org/react";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { useReadContract } from "wagmi";

const Page: NextPage = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [detail, setDetail] = useState<Project>({});
  const searchParams = useSearchParams();
  const { id } = useParams();
  const index = searchParams.get("index");
  const router = useRouter();

  const { data: ethRate } = useReadContract({
    address: chainlinkAbi.address as Address,
    abi: chainlinkAbi.abi,
    functionName: "getChainlinkDataFeedLatestAnswer",
  });

  const handleFetchDonations = async (projectId: string) => {
    if (projectId) {
      const { data = {} } = await fetchDonations({ projectId });
      setDonors(data.donors || []);
    }
  };
  const handleFetchAllocations = async (projectId: string) => {
    if (projectId) {
      const { data = {} } = await fetchAllocations({ projectId });
      setAllocations(data.allocations || []);
    }
  };

  const handleFetchProject = async (id?: string) => {
    if (id) {
      const { data = [] } = await fetchProjects();
      const detail = data.find((i: Project) => i._id === id);
      setDetail(detail);
    }
  };

  useEffect(() => {
    handleFetchProject(id as string);
    handleFetchDonations(id as string);
    handleFetchAllocations(id as string);
  }, [id]);

  const totalDonorsAmout =
    (donors.reduce((acc, curr) => acc + Number(curr.amount), 0) *
      Number(ethRate)) /
    Number(BigInt(10) ** BigInt(8));

  return (
    <div>
      <Head>
        <title>UN Donate Project {id}</title>
      </Head>
      <main className="mt-[100px] px-[245px]">
        <article className="flex flex-col gap-[72px]">
          <section className="flex flex-col">
            <div className="flex flex-row items-center gap-[16px]">
              <h5 className="font-bold leading-[30px] text-[rgba(51,51,51,0.6)]">
                All Projects
              </h5>
              <Image
                src="/icons/arrow-right.svg"
                alt="breadcrumbs"
                width={8.5}
                height={16}
              />
              <h5 className="font-font-medium leading-[30px] text-[rgba(51,51,51,1)]">
                {detail?.title}
              </h5>
            </div>
            <div className="mt-[34px] w-full bg-white px-[52px] py-[30px] box-border flex flex-col gap-[21px] rounded-[10px] overflow-hidden">
              <figcaption className="font-medium leading-[21px] text-[18px] text-[rgba(0,0,0,1)]">
                {detail?.title}
              </figcaption>
              <figure className="flex flex-row gap-[72px]">
                <div className="w-[471px] flex flex-col gap-[25px]">
                  <Image
                    className="w-[471px] h-[257px] rounded-[10px] overflow-hidden"
                    src={`/images/project/${index}.png`}
                    alt={detail?.title || ""}
                    width={471}
                    height={257}
                  />
                  <div className="flex flex-row items-center gap-[5px]">
                    <span className="text-[12px]">
                      {totalDonorsAmout?.toFixed(2)}
                    </span>
                    <Progress
                      size="sm"
                      value={(totalDonorsAmout / detail.totalAmount!) * 100}
                      title={String(totalDonorsAmout)}
                    />
                    <span className="text-[12px]">
                      {detail.totalAmount?.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="max-h-[287px] flex flex-col flex-1 justify-between">
                  <blockquote className="font-normal leading-[21px] text-[#909090] text-[14px]">
                    {detail?.description}
                  </blockquote>
                  <Button
                    className="w-[270px] h-[40px] text-[16px] font-semibold"
                    color="primary"
                    onClick={() => router.push(`/donate/${id}?index=${index}`)}
                  >
                    Donate Now
                  </Button>
                </div>
              </figure>
            </div>
          </section>

          <section className="flex flex-col">
            <div className="w-full flex flex-row items-center justify-between">
              <h5 className="font-bold leading-[30px]">Allocation</h5>
              <Button
                className="font-normal color-[#333]"
                variant="light"
                onClick={() => router.push("/projects")}
              >
                More
              </Button>
            </div>
            <div className="mt-[15px] grid grid-cols-4 gap-x-[40px]">
              {(allocations || [])?.slice(0, 4).map((i) => (
                <figure
                  key={i._id}
                  className="box-border flex flex-col gap-[14px] w-[290px] h-[160px] bg-white hover:shadow-[0px_1px_10px_0px_rgba(0,119,222,0.25)] rounded-[10px] overflow-hidde"
                >
                  <p className="font-normal leading-[24px] text-[20px] text-[rgba(0,0,0,1)]">
                    {i?.donor?.substring(0, 3)}***
                    {i?.donor?.substring(
                      i?.donor?.length - 3,
                      i?.donor?.length || 0
                    )}
                  </p>
                </figure>
              ))}
            </div>
          </section>

          <section className="flex flex-col mb-[40px]">
            <div className="w-full flex flex-row items-center justify-between">
              <h5 className="font-bold leading-[30px]">Donors</h5>
              <Button
                className="font-normal color-[#333]"
                variant="light"
                onClick={() => router.push("/projects")}
              >
                More
              </Button>
            </div>
            <div className="mt-[15px] grid grid-cols-4 gap-x-[40px]">
              {(donors || []).slice(0, 4)?.map((i) => (
                <figure
                  key={i._id}
                  className="box-border flex flex-col items-center justify-center gap-[14px] w-[290px] h-[160px] bg-white hover:shadow-[0px_1px_10px_0px_rgba(0,119,222,0.25)] rounded-[10px] overflow-hidde cursor-pointer"
                  onClick={() =>
                    window.open(
                      `https://sepolia.etherscan.io/tx/${i.hash}`,
                      "_blank"
                    )
                  }
                >
                  <p className="font-normal leading-[24px] text-[20px] text-[rgba(0,0,0,1)]">
                    {i?.donor?.substring(0, 3)}***
                    {i?.donor?.substring(
                      i?.donor?.length - 3,
                      i?.donor?.length || 0
                    )}
                  </p>
                  <span className="font-bold leading-[30px] text-[24px] text-[rgba(94,219,208,1)]">
                    {i?.amount} {i?.currency}
                  </span>
                </figure>
              ))}
            </div>
          </section>
        </article>
      </main>
    </div>
  );
};

export default Page;
