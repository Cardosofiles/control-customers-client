'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  useDeleteCustomer,
  useEditCustomer,
} from '@/services/celcoin/mutations'
import { useListCustomers } from '@/services/celcoin/queries'
import type { Address, Customer } from '@/services/celcoin/types'
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { toast } from 'sonner'

interface CustomerTableProps {
  accessToken: string
}

export function CustomerTable({ accessToken }: CustomerTableProps) {
  console.log(
    'CustomerTable - accessToken:',
    accessToken ? 'Presente' : 'Ausente'
  )

  // You can add filter params here if needed
  const {
    data: customers = [],
    isLoading,
    error,
  } = useListCustomers(accessToken, {})

  console.log('CustomerTable - Estado:', {
    isLoading,
    customersLength: customers.length,
    error: error?.message || 'Nenhum erro',
  })

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Customer>>({})
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
  const [editingAddressData, setEditingAddressData] = useState<
    Partial<Address>
  >({})

  const { mutateAsync: updateCustomer, isPending: isUpdating } =
    useEditCustomer(accessToken)
  const { mutateAsync: deleteCustomer } = useDeleteCustomer(accessToken)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    id: '',
    name: '',
    document: '',
    email: '',
  })

  // Use useMemo to calculate filtered results instead of useEffect + useState
  const filtered = useMemo(() => {
    return customers.filter(
      (customer: Customer) =>
        (customer.id?.toString() ?? '').includes(filters.id) &&
        (customer.name ?? '')
          .toLowerCase()
          .includes(filters.name.toLowerCase()) &&
        (customer.document ?? '')
          .toLowerCase()
          .includes(filters.document.toLowerCase()) &&
        (customer.email ?? '')
          .toLowerCase()
          .includes(filters.email.toLowerCase())
    )
  }, [customers, filters])

  function handleFilterChange(field: keyof typeof filters, value: string) {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  function toggleRowExpansion(customerId: string) {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(customerId)) {
      newExpanded.delete(customerId)
    } else {
      newExpanded.add(customerId)
    }
    setExpandedRows(newExpanded)
  }

  async function handleEdit(customer: Customer) {
    setEditingId(customer.id!)
    setEditData(customer)
  }

  async function handleSaveEdit() {
    if (!editingId || !editData) return

    try {
      const result = await updateCustomer({
        customerId: editingId,
        data: editData,
      })
      setEditingId(null)
      setEditData({})

      // Mostra toast se foi simulado localmente
      if (result?.message?.includes('modo demo')) {
        toast.info('Cliente editado (modo demonstração)')
      } else {
        toast.success('Cliente editado com sucesso!')
      }
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error)
      toast.error('Erro ao editar cliente')
    }
  }

  function handleCancelEdit() {
    setEditingId(null)
    setEditData({})
  }

  async function handleDelete(customerId: string) {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return

    setDeletingId(customerId)
    try {
      const result = await deleteCustomer({
        customerId: customerId,
      })

      // Mostra toast se foi simulado localmente
      if (result?.message?.includes('modo demo')) {
        toast.info('Cliente excluído (modo demonstração)')
      } else {
        toast.success('Cliente excluído com sucesso!')
      }
    } catch (error) {
      console.error('Erro ao deletar cliente:', error)
      toast.error('Erro ao excluir cliente')
    } finally {
      setDeletingId(null)
    }
  }

  function handleEditAddress(address: Address) {
    setEditingAddressId(address.id || '')
    setEditingAddressData(address)
  }

  function handleSaveAddress() {
    // TODO: Implement address save logic
    console.log('Saving address:', editingAddressData)
    setEditingAddressId(null)
    setEditingAddressData({})
  }

  function handleCancelAddressEdit() {
    setEditingAddressId(null)
    setEditingAddressData({})
  }

  function handleDeleteAddress(addressId: string) {
    if (!confirm('Tem certeza que deseja excluir este endereço?')) return
    // TODO: Implement address deletion logic
    console.log('Deleting address:', addressId)
  }

  function handleAddAddress(customerId: string) {
    // TODO: Implement add address logic
    console.log('Adding address to customer:', customerId)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Carregando clientes...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-red-500">
          Erro ao carregar clientes: {error.message}
        </p>
      </div>
    )
  }

  if (!accessToken) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-yellow-600">Aguardando token de acesso...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Input
          placeholder="Filtrar por ID"
          value={filters.id}
          onChange={e => handleFilterChange('id', e.target.value)}
        />
        <Input
          placeholder="Filtrar por nome"
          value={filters.name}
          onChange={e => handleFilterChange('name', e.target.value)}
        />
        <Input
          placeholder="Filtrar por documento"
          value={filters.document}
          onChange={e => handleFilterChange('document', e.target.value)}
        />
        <Input
          placeholder="Filtrar por email"
          value={filters.email}
          onChange={e => handleFilterChange('email', e.target.value)}
        />
      </div>

      {/* Tabela */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Documento</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="py-8 text-center">
                <p className="text-muted-foreground">
                  Nenhum cliente encontrado
                </p>
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((customer: Customer) => (
              <React.Fragment key={customer.id}>
                {/* Linha principal do cliente */}
                <TableRow>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRowExpansion(customer.id)}
                      className="h-8 w-8 p-0"
                    >
                      {expandedRows.has(customer.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>
                    {editingId === customer.id ? (
                      <Input
                        value={editData.name || ''}
                        onChange={e =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                      />
                    ) : (
                      customer.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === customer.id ? (
                      <Input
                        value={editData.document || ''}
                        onChange={e =>
                          setEditData({ ...editData, document: e.target.value })
                        }
                      />
                    ) : (
                      customer.document
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === customer.id ? (
                      <Input
                        type="email"
                        value={editData.email || ''}
                        onChange={e =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                      />
                    ) : (
                      customer.email
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === customer.id ? (
                      <Input
                        value={editData.phone || ''}
                        onChange={e =>
                          setEditData({ ...editData, phone: e.target.value })
                        }
                      />
                    ) : (
                      customer.phone || '-'
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === customer.id ? (
                      <select
                        value={editData.status || customer.status}
                        onChange={e =>
                          setEditData({
                            ...editData,
                            status: e.target.value as 'active' | 'inactive',
                          })
                        }
                        className="border-input bg-background w-full rounded-md border px-3 py-2"
                      >
                        <option value="active">Ativo</option>
                        <option value="inactive">Inativo</option>
                      </select>
                    ) : (
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          customer.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {customer.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {customer.createdAt
                      ? new Date(customer.createdAt).toLocaleDateString('pt-BR')
                      : '-'}
                  </TableCell>
                  <TableCell className="space-x-2 text-right">
                    {editingId === customer.id ? (
                      <div className="space-x-2">
                        <Button
                          size="sm"
                          onClick={handleSaveEdit}
                          disabled={isUpdating}
                        >
                          {isUpdating ? 'Salvando...' : 'Salvar'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                          disabled={isUpdating}
                        >
                          Cancelar
                        </Button>
                      </div>
                    ) : (
                      <div className="space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(customer)}
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(customer.id!)}
                          disabled={deletingId === customer.id}
                        >
                          {deletingId === customer.id
                            ? 'Excluindo...'
                            : 'Excluir'}
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>

                {/* Linha expandida com endereços */}
                {expandedRows.has(customer.id) && (
                  <TableRow>
                    <TableCell colSpan={9} className="bg-muted/50 p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Endereços</h4>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAddAddress(customer.id)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Adicionar Endereço
                          </Button>
                        </div>

                        {customer.addresses && customer.addresses.length > 0 ? (
                          <div className="space-y-3">
                            {customer.addresses.map(
                              (address: Address, addressIndex: number) => (
                                <div
                                  key={`${customer.id}-address-${addressIndex}-${address.id || addressIndex}`}
                                  className="border-border bg-background rounded-lg border p-3"
                                >
                                  {editingAddressId === address.id ? (
                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                      <Input
                                        placeholder="CEP"
                                        value={editingAddressData.zipcode || ''}
                                        onChange={e =>
                                          setEditingAddressData({
                                            ...editingAddressData,
                                            zipcode: e.target.value,
                                          })
                                        }
                                      />
                                      <Input
                                        placeholder="Rua"
                                        value={editingAddressData.street || ''}
                                        onChange={e =>
                                          setEditingAddressData({
                                            ...editingAddressData,
                                            street: e.target.value,
                                          })
                                        }
                                      />
                                      <Input
                                        placeholder="Número"
                                        value={editingAddressData.number || ''}
                                        onChange={e =>
                                          setEditingAddressData({
                                            ...editingAddressData,
                                            number: e.target.value,
                                          })
                                        }
                                      />
                                      <Input
                                        placeholder="Bairro"
                                        value={
                                          editingAddressData.neighborhood || ''
                                        }
                                        onChange={e =>
                                          setEditingAddressData({
                                            ...editingAddressData,
                                            neighborhood: e.target.value,
                                          })
                                        }
                                      />
                                      <Input
                                        placeholder="Cidade"
                                        value={editingAddressData.city || ''}
                                        onChange={e =>
                                          setEditingAddressData({
                                            ...editingAddressData,
                                            city: e.target.value,
                                          })
                                        }
                                      />
                                      <Input
                                        placeholder="Estado"
                                        value={editingAddressData.state || ''}
                                        onChange={e =>
                                          setEditingAddressData({
                                            ...editingAddressData,
                                            state: e.target.value,
                                          })
                                        }
                                      />
                                      <div className="col-span-full flex justify-end space-x-2">
                                        <Button
                                          size="sm"
                                          onClick={handleSaveAddress}
                                        >
                                          Salvar
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={handleCancelAddressEdit}
                                        >
                                          Cancelar
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-between">
                                      <div className="text-sm">
                                        <p className="font-medium">
                                          {address.street}, {address.number}
                                        </p>
                                        <p className="text-muted-foreground">
                                          {address.neighborhood}, {address.city}{' '}
                                          - {address.state}
                                        </p>
                                        <p className="text-muted-foreground">
                                          CEP: {address.zipcode}
                                        </p>
                                      </div>
                                      <div className="flex space-x-2">
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() =>
                                            handleEditAddress(address)
                                          }
                                        >
                                          Editar
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="destructive"
                                          onClick={() =>
                                            handleDeleteAddress(address.id!)
                                          }
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm">
                            Nenhum endereço cadastrado
                          </p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>

      {/* Informações da tabela */}
      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <p>
          Mostrando {filtered.length} de {customers.length} cliente(s)
        </p>
      </div>
    </div>
  )
}
