/**
 * Tipos e interfaces para gerenciamento de clientes
 */

export enum DocumentType {
  CPF = 'CPF',
  CNPJ = 'CNPJ'
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Customer {
  id: string;
  documentType: DocumentType;
  documentNumber: string;
  name: string;
  email: string;
  phone: string;
  address?: Address;
  createdAt: string;
  updatedAt: string;
}

export type CustomerFormData = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>;

export type CustomerResponse = Customer;

export interface CustomerFilters {
  search?: string;
  documentType?: DocumentType;
}