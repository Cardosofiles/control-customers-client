'use client'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, Mail } from 'lucide-react'
import { forwardRef, useState } from 'react'

const EMAIL_PROVIDERS = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'yahoo.com.br',
  'yahoo.com',
  'icloud.com',
  'proton.me',
  'terra.com.br',
  'uol.com.br',
  'bol.com.br',
]

interface EmailInputProps {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  className?: string
  disabled?: boolean
  error?: string
}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  (
    { value = '', onChange, onBlur, placeholder, className, disabled, error },
    ref
  ) => {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState(value)

    // Extrai o prefixo (parte antes do @) e o sufixo (parte depois do @)
    const atIndex = inputValue.indexOf('@')
    const prefix = atIndex > -1 ? inputValue.slice(0, atIndex) : inputValue
    const typedSuffix = atIndex > -1 ? inputValue.slice(atIndex + 1) : ''

    // Filtra provedores baseado no que foi digitado
    const filteredProviders = EMAIL_PROVIDERS.filter(provider =>
      provider.toLowerCase().startsWith(typedSuffix.toLowerCase())
    )

    // Só mostra sugestões se há @ e pelo menos 1 caractere depois
    const showSuggestions =
      atIndex > -1 && typedSuffix.length >= 0 && filteredProviders.length > 0

    const handleInputChange = (newValue: string) => {
      setInputValue(newValue)
      onChange?.(newValue)

      // Abre o popover automaticamente se há sugestões
      const newAtIndex = newValue.indexOf('@')
      const newTypedSuffix =
        newAtIndex > -1 ? newValue.slice(newAtIndex + 1) : ''
      const hasValidSuggestions =
        newAtIndex > -1 &&
        EMAIL_PROVIDERS.some(provider =>
          provider.toLowerCase().startsWith(newTypedSuffix.toLowerCase())
        )

      setOpen(hasValidSuggestions)
    }

    const handleSelectProvider = (provider: string) => {
      const newEmail = `${prefix}@${provider}`
      setInputValue(newEmail)
      onChange?.(newEmail)
      setOpen(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Tab' && filteredProviders.length > 0 && showSuggestions) {
        e.preventDefault()
        handleSelectProvider(filteredProviders[0])
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    return (
      <div className="relative">
        <Popover open={open && showSuggestions} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                ref={ref}
                type="email"
                value={inputValue}
                onChange={e => handleInputChange(e.target.value)}
                onBlur={onBlur}
                onKeyDown={handleKeyDown}
                placeholder={placeholder || 'usuario@email.com'}
                className={cn(
                  'pl-10',
                  error && 'border-red-500 focus-visible:ring-red-500',
                  className
                )}
                disabled={disabled}
                autoComplete="off"
              />
              <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            </div>
          </PopoverTrigger>

          {showSuggestions && (
            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] p-0"
              align="start"
              side="bottom"
            >
              <Command>
                <CommandList>
                  <CommandEmpty>Nenhum provedor encontrado.</CommandEmpty>
                  <CommandGroup heading="Provedores de Email">
                    {filteredProviders.slice(0, 6).map(provider => {
                      const suggestionEmail = `${prefix}@${provider}`
                      const isSelected = inputValue === suggestionEmail

                      return (
                        <CommandItem
                          key={provider}
                          value={provider}
                          onSelect={() => handleSelectProvider(provider)}
                          className="cursor-pointer"
                        >
                          <div className="flex w-full items-center gap-2">
                            <Mail className="text-muted-foreground h-4 w-4" />
                            <span className="font-medium">{prefix}</span>
                            <span className="text-muted-foreground">
                              @{provider}
                            </span>
                            {isSelected && (
                              <Check className="ml-auto h-4 w-4" />
                            )}
                          </div>
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          )}
        </Popover>

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

        {showSuggestions && (
          <p className="text-muted-foreground mt-1 text-xs">
            💡 Pressione Tab para autocompletar com a primeira sugestão
          </p>
        )}
      </div>
    )
  }
)

EmailInput.displayName = 'EmailInput'
