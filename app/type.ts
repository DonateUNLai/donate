export interface Project {
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

export interface Donor {
    _id?: string;
    amount?: string;
    currency?: string;
    donor?: string;
    hash?: number;
    project?: string;
}

export interface Allocation {
    _id?: string;
    amount?: string;
    currency?: string;
    donor?: string;
    hash?: number;
    project?: string;
}