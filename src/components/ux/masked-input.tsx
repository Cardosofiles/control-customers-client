'use client'

import { Input } from '@/components/ui/input'
import IMask, { InputMask } from 'imask'
import React, { forwardRef, useEffect, useRef } from 'react'

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string
  onAccept?: (value: string) => void
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, onAccept, onChange, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const maskRef = useRef<InputMask<any> | null>(null)

    useEffect(() => {
      if (inputRef.current) {
        maskRef.current = IMask(inputRef.current, {
          mask: mask,
        })

        maskRef.current.on('accept', () => {
          const value = maskRef.current?.value || ''
          if (onAccept) {
            onAccept(value)
          }
          if (onChange) {
            onChange({
              target: { value },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        })
      }

      return () => {
        maskRef.current?.destroy()
      }
    }, [mask, onAccept, onChange])

    // Combine refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(inputRef.current)
        } else {
          ref.current = inputRef.current
        }
      }
    })

    return <Input {...props} ref={inputRef} />
  }
)

MaskedInput.displayName = 'MaskedInput'
