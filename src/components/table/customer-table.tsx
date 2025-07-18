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
import type { Customer } from '@/services/celcoin/types'
import { useMemo, useState } from 'react'

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

  async function handleEdit(customer: Customer) {
    setEditingId(customer.id!)
    setEditData(customer)
  }

  async function handleSaveEdit() {
    if (!editingId || !editData) return

    try {
      await updateCustomer({
        customerId: editingId,
        typeId: 'default', // You may need to adjust this based on your API requirements
        data: editData,
      })
      setEditingId(null)
      setEditData({})
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error)
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
      await deleteCustomer({
        customerId: customerId,
        typeId: 'default', // You may need to adjust this based on your API requirements
      })
    } catch (error) {
      console.error('Erro ao deletar cliente:', error)
    } finally {
      setDeletingId(null)
    }
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
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Documento</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="py-8 text-center">
                <p className="text-muted-foreground">
                  Nenhum cliente encontrado
                </p>
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((customer: Customer) => (
              <TableRow key={customer.id}>
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
