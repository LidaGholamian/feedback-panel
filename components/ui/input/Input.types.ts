import React from 'react'
import {UseFormRegister} from 'react-hook-form'

export interface InputProps {
  label?: string | React.ReactNode
  type: 'text' | 'password' | 'number' | 'tel' | 'email'
  register: UseFormRegister<any> | (() => void)
  errors?: any
  name: string
  className?: string
  placeholder?: string
  disabled?: boolean
  isLoading?: boolean
  handleChange?: (text: string) => void
  infoText?: string
  value?: string | number
  inputStyle?: string
  min?: number
  max?: number
  rightElement?: React.ReactNode
}
