// src/services/celcoin/types.ts
export type Customer = {
  id: string
  name: string
  document: string
  email: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export type CreateCustomerPayload = {
  name: string
  document: string
  email: string
  [key: string]: any
}

export type EditCustomerPayload = Partial<CreateCustomerPayload>
