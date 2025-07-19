// src/services/celcoin/types.ts
export type Address = {
  id?: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  zipcode: string
}

export type Customer = {
  id: string
  name: string
  document: string
  email: string
  phone?: string
  status: 'active' | 'inactive'
  addresses: Address[]
  createdAt: string
  updatedAt: string
}

export type CreateCustomerPayload = {
  name: string
  document: string
  email: string
  phone: string
  addresses: Address[]
}

export type EditCustomerPayload = Partial<CreateCustomerPayload>
