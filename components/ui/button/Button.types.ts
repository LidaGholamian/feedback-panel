import React, {MouseEventHandler} from 'react'

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  children: string | React.ReactNode
  disabled?: boolean
  loading?: boolean
  weight?: BUTTON_WEIGHT
  size?: BUTTON_SIZE
  shape?: 'lg' | 'xl' | '3xl'
  variant: BUTTON_VARIANT
  isReverseContent?: boolean
  icon?: React.ReactNode
  hasBadge?: boolean
}

export enum BUTTON_SIZE {
  SMALL = 'small',
  MEDIUM = 'medium',
  BASE = 'base',
  LARGE = 'large',
}

export enum BUTTON_WEIGHT {
  NORMAL = 'normal',
  MEDIUM = 'medium',
  BOLD = 'bold',
}

export enum BUTTON_VARIANT {
  PRIMARY = 'primary',
  SURFACE = 'surface',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  BLACK = 'black',
}
