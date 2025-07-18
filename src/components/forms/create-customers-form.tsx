'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateCustomer } from '@/services/celcoin/mutations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { MaskedInput } from '../ux/masked-input'

const addressSchema = z.object({
  street: z.string().min(3),
  number: z.string().min(1),
  city: z.string().min(2),
  state: z.string().min(2),
})

const formSchema = z.object({
  name: z.string().min(3),
  document: z.string().min(11),
  email: z.string().email(),
  phone: z.string().min(14), // com máscara
  addresses: z.array(addressSchema).min(1),
})

type FormData = z.infer<typeof formSchema>

interface CreateCustomerFormProps {
  accessToken: string
}

export function CreateCustomerForm({ accessToken }: CreateCustomerFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addresses: [{ street: '', number: '', city: '', state: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  })

  const [documentMask, setDocumentMask] = useState('999.999.999-99')
  const watchDocument = watch('document')

  const { mutateAsync: createCustomer } = useCreateCustomer(accessToken)

  const handleDocumentChange = (value: string) => {
    const onlyDigits = value.replace(/\D/g, '')
    if (onlyDigits.length > 11) {
      setDocumentMask('99.999.999/9999-99') // CNPJ
    } else {
      setDocumentMask('999.999.999-99') // CPF
    }
  }

  const emailAutocomplete = (email: string) => {
    if (email.includes('@')) return email
    const domains = ['gmail.com', 'outlook.com', 'yahoo.com.br']
    return email + '@' + domains[0]
  }

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      await createCustomer(data)
      toast.success('Cliente criado com sucesso!')
      reset()
    } catch (err) {
      toast.error('Erro ao criar cliente')
    }
  }

  return (
    <Card className="mx-auto max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-yellow-400">
          Cadastrar Cliente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 text-white"
        >
          {/* Nome */}
          <div>
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="João da Silva"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Documento */}
          <div>
            <Label htmlFor="document">CPF ou CNPJ</Label>
            <Controller
              name="document"
              control={control}
              render={({ field }) => (
                <MaskedInput
                  mask={documentMask}
                  value={field.value}
                  onChange={e => {
                    field.onChange(e)
                    handleDocumentChange(e.target.value)
                  }}
                  placeholder="000.000.000-00 ou 00.000.000/0000-00"
                />
              )}
            />
            {errors.document && (
              <p className="text-sm text-red-500">{errors.document.message}</p>
            )}
          </div>

          {/* E-mail */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...register('email')}
              placeholder="usuario@email.com"
              onBlur={e => {
                const corrected = emailAutocomplete(e.target.value)
                e.target.value = corrected
              }}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Telefone */}
          <div>
            <Label htmlFor="phone">Celular</Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <MaskedInput
                  mask="(99) 99999-9999"
                  {...field}
                  placeholder="(11) 98765-4321"
                />
              )}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Endereços */}
          <div className="space-y-4">
            <Label>Endereços</Label>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="relative grid grid-cols-2 gap-4 rounded-lg border border-zinc-800 p-4"
              >
                <Input
                  {...register(`addresses.${index}.street`)}
                  placeholder="Rua"
                />
                <Input
                  {...register(`addresses.${index}.number`)}
                  placeholder="Número"
                />
                <Input
                  {...register(`addresses.${index}.city`)}
                  placeholder="Cidade"
                />
                <Input
                  {...register(`addresses.${index}.state`)}
                  placeholder="UF"
                />

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                append({ street: '', number: '', city: '', state: '' })
              }
              className="w-full"
            >
              + Adicionar Endereço
            </Button>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 font-bold text-black hover:bg-yellow-600"
          >
            {isSubmitting ? 'Salvando...' : 'Cadastrar Cliente'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
