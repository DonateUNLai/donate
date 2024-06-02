import { Address } from 'viem';
import { request } from './request';

interface FetchNonceData {
    address: string;
}
interface VerifySignData {
    address: string;
    signature: string;
}

interface CreateProjectData {
    hash?: Address;
}

interface DonateProjectData {
    hash?: Address;
}

interface DonationsParama {
    projectId: string
}

interface AllocationsParama {
    projectId: string
}

const fetchNonce = async (data: FetchNonceData) => await request.post('/user/nonce', data);
const verifySign = async (data: VerifySignData) => await request.post('/user/verify', data);
const fetchProfile = async () => await request.post('/user/profile');
const createProject = async (data: CreateProjectData) => await request.post('/project', data);
const donateProject = async (data: DonateProjectData) => await request.post('/donation', data);
const fetchProjects = async () => await request.get('/project');
const fetchDonations = async ({ projectId }: DonationsParama) => await request.get(`/donation/${projectId}`);
const fetchAllocations = async ({ projectId }: AllocationsParama) => await request.get(`/allocation/${projectId}`);

export {
    fetchNonce,
    verifySign,
    fetchProfile,
    createProject,
    fetchProjects,
    donateProject,
    fetchDonations,
    fetchAllocations
}