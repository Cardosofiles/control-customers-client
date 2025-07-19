'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EmailInput } from '@/components/ui/email-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateCustomer } from '@/services/celcoin/mutations'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRef } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

// Função para formatar CEP como 00000-000
function formatCep(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits.replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9)
}

// Função para formatar celular com DDD (XX) XXXXX-XXXX
function formatCelular(value: string) {
  const digits = value.replace(/\D/g, '')
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
}

// Função para formatar CPF ou CNPJ
function formatCpfCnpj(value: string) {
  const digits = value.replace(/\D/g, '')
  if (digits.length <= 11) {
    // CPF: 000.000.000-00
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  } else {
    // CNPJ: 00.000.000/0000-00
    return digits
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
  }
}

const addressSchema = z.object({
  street: z.string().min(1, 'Rua obrigatória'),
  number: z.string().min(1, 'Número obrigatório'),
  neighborhood: z.string().min(1, 'Bairro obrigatório'),
  city: z.string().min(1, 'Cidade obrigatória'),
  state: z.string().min(2, 'Estado obrigatório'),
  zipcode: z.string().min(8, 'CEP obrigatório'),
})

const formSchema = z.object({
  name: z.string().min(3, 'Nome muito curto'),
  document: z.string().min(11, 'CPF/CNPJ inválido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(14, 'Telefone inválido'), // com máscara
  addresses: z.array(addressSchema).min(1, 'Informe pelo menos um endereço'),
})

type FormData = z.infer<typeof formSchema>

interface CreateCustomerFormProps {
  accessToken: string
}

export function CreateCustomerForm({ accessToken }: CreateCustomerFormProps) {
  const emailInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addresses: [
        {
          street: '',
          number: '',
          neighborhood: '',
          city: '',
          state: '',
          zipcode: '',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  })

  const { mutateAsync: createCustomer } = useCreateCustomer(accessToken)

  async function handleCepChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const cep = e.target.value.replace(/\D/g, '')
    // Atualiza o valor do campo normalmente
    register(`addresses.${index}.zipcode`).onChange(e)

    if (cep.length === 8) {
      try {
        const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        if (!res.data.erro) {
          const { logradouro, bairro, localidade, uf } = res.data
          // Preenche os campos do endereço
          setValue(`addresses.${index}.street`, logradouro || '')
          setValue(`addresses.${index}.neighborhood`, bairro || '')
          setValue(`addresses.${index}.city`, localidade || '')
          setValue(`addresses.${index}.state`, uf || '')
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
      }
    }
  }

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      const result = await createCustomer(data)

      // Verifica se foi simulado localmente
      if (result?.message?.includes('modo demo')) {
        toast.info('Cliente criado (modo demonstração)')
      } else {
        toast.success('Cliente criado com sucesso!')
      }

      reset()
    } catch (error) {
      console.error('Erro ao criar cliente:', error)
      toast.error('Erro ao criar cliente')
    }
  }

  return (
    <Card className="border-border bg-background mx-auto max-w-3xl rounded-2xl border shadow-xl">
      <CardHeader>
        <CardTitle className="text-foreground text-center text-2xl font-bold">
          Cadastrar Cliente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nome */}
          <div className="space-y-2">
            <Label className="text-foreground" htmlFor="name">
              Nome completo
            </Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Nome completo"
              className="border-input bg-background focus:border-primary focus:ring-primary"
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Documento */}
          <div className="space-y-2">
            <Label className="text-foreground" htmlFor="document">
              CPF ou CNPJ
            </Label>
            <Input
              id="document"
              {...register('document')}
              className="border-input bg-background focus:border-primary focus:ring-primary"
              placeholder="000.000.000-00 ou 00.000.000/0000-00"
              maxLength={18}
              onChange={e => {
                const formatted = formatCpfCnpj(e.target.value)
                e.target.value = formatted
                register('document').onChange(e)
              }}
            />
            {errors.document && (
              <p className="text-destructive text-sm">
                {errors.document.message}
              </p>
            )}
          </div>

          {/* E-mail */}
          <div className="space-y-2">
            <Label className="text-foreground" htmlFor="email">
              Email
            </Label>
            <EmailInput
              value={watch('email') || ''}
              onChange={value => setValue('email', value)}
              placeholder="usuario@email.com"
              error={errors.email?.message}
              className="border-input bg-background focus:border-primary focus:ring-primary"
            />
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label className="text-foreground" htmlFor="phone">
              Celular
            </Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="(11) 98765-4321"
              maxLength={15}
              onChange={e => {
                const formatted = formatCelular(e.target.value)
                e.target.value = formatted
                register('phone').onChange(e)
              }}
              className="border-input bg-background focus:border-primary focus:ring-primary"
            />
            {errors.phone && (
              <p className="text-destructive text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Endereços */}
          <div className="space-y-4">
            <Label className="text-foreground text-base font-medium">
              Endereços
            </Label>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border-border bg-card relative space-y-4 rounded-lg border p-4 shadow-sm"
              >
                <p className="text-muted-foreground text-sm font-medium">
                  Endereço {index + 1}
                </p>

                {/* CEP */}
                <div>
                  <Input
                    {...register(`addresses.${index}.zipcode`)}
                    placeholder="CEP"
                    maxLength={9}
                    onChange={e => {
                      e.target.value = formatCep(e.target.value)
                      handleCepChange(e, index)
                    }}
                    className="border-input bg-background focus:border-primary focus:ring-primary"
                  />
                  {errors.addresses?.[index]?.zipcode && (
                    <p className="text-destructive text-sm">
                      {errors.addresses[index]!.zipcode!.message}
                    </p>
                  )}
                </div>

                {/* Rua */}
                <div>
                  <Input
                    {...register(`addresses.${index}.street`)}
                    placeholder="Rua"
                    readOnly
                    className="border-input bg-muted/50 text-muted-foreground cursor-not-allowed"
                  />
                  {errors.addresses?.[index]?.street && (
                    <p className="text-destructive text-sm">
                      {errors.addresses[index]!.street!.message}
                    </p>
                  )}
                </div>

                {/* Número */}
                <div>
                  <Input
                    {...register(`addresses.${index}.number`)}
                    placeholder="Número"
                    className="border-input bg-background focus:border-primary focus:ring-primary"
                  />
                  {errors.addresses?.[index]?.number && (
                    <p className="text-destructive text-sm">
                      {errors.addresses[index]!.number!.message}
                    </p>
                  )}
                </div>

                {/* Bairro */}
                <div>
                  <Input
                    {...register(`addresses.${index}.neighborhood`)}
                    placeholder="Bairro"
                    readOnly
                    className="border-input bg-muted/50 text-muted-foreground cursor-not-allowed"
                  />
                  {errors.addresses?.[index]?.neighborhood && (
                    <p className="text-destructive text-sm">
                      {errors.addresses[index]!.neighborhood!.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Cidade */}
                  <div>
                    <Input
                      {...register(`addresses.${index}.city`)}
                      placeholder="Cidade"
                      readOnly
                      className="border-input bg-muted/50 text-muted-foreground cursor-not-allowed"
                    />
                    {errors.addresses?.[index]?.city && (
                      <p className="text-destructive text-sm">
                        {errors.addresses[index]!.city!.message}
                      </p>
                    )}
                  </div>

                  {/* Estado */}
                  <div>
                    <Input
                      {...register(`addresses.${index}.state`)}
                      placeholder="Estado"
                      readOnly
                      className="border-input bg-muted/50 text-muted-foreground cursor-not-allowed"
                    />
                    {errors.addresses?.[index]?.state && (
                      <p className="text-destructive text-sm">
                        {errors.addresses[index]!.state!.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Botão para remover endereço */}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  disabled={fields.length === 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  street: '',
                  number: '',
                  neighborhood: '',
                  city: '',
                  state: '',
                  zipcode: '',
                })
              }
              className="border-primary/50 text-primary hover:bg-primary/10 w-full border-dashed"
            >
              + Adicionar Endereço
            </Button>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-bold"
          >
            {isSubmitting ? 'Salvando...' : 'Cadastrar Cliente'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
