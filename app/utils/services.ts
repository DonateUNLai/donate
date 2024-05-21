import { request } from './request';

interface FetchNonceData {
    address: string;
}
interface VerifySignData {
    address: string;
    signature: string;
}

const fetchNonce = async (data: FetchNonceData) => await request.post('/user/nonce', data);
const verifySign = async (data: VerifySignData) => await request.post('/user/verify', data);
const fetchProfile = async () => await request.post('/user/profile');

export {
    fetchNonce,
    verifySign,
    fetchProfile
}