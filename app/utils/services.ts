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

const fetchNonce = async (data: FetchNonceData) => await request.post('/user/nonce', data);
const verifySign = async (data: VerifySignData) => await request.post('/user/verify', data);
const fetchProfile = async () => await request.post('/user/profile');
const createProject = async (data: CreateProjectData) => await request.post('/project', data);
const fetchProjects = async () => await request.get('/projects');

export {
    fetchNonce,
    verifySign,
    fetchProfile,
    createProject,
    fetchProjects
}