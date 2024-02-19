import { AxiosResponse } from 'axios';
import { Company, CompanyForRequest } from 'entities/Company/types';

// Create Company
type CreateCompanyReq = {
	token: string | null;
	company: CompanyForRequest;
};
export type CreateCompanyRes = Company;
export type CreateCompanyRequest = (token: CreateCompanyReq) => Promise<AxiosResponse<CreateCompanyRes>>;

// Update Company
type UpdateCompanyReq = {
	id: string | undefined;
	data: Partial<CompanyForRequest>;
};
export type UpdateCompanyRes = Company;
export type UpdateCompanyRequest = (data: UpdateCompanyReq) => Promise<AxiosResponse<UpdateCompanyRes>>;
