'use client'

import { Input } from '@/components/ui/input'
import React from 'react'
import InputMask from 'react-input-mask'

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string
}

export function MaskedInput({ mask, ...props }: MaskedInputProps) {
  return (
    <InputMask mask={mask} {...props}>
      {inputProps => <Input {...inputProps} />}
    </InputMask>
  )
}
