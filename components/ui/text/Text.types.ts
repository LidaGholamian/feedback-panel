export interface TextProps {
  children: string | number
  display?: 'inline' | 'block' | 'inline-block'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right' | 'justify'
  color?: string
  lineHeight?: '3' | '4' | '5' | '6' | '7'
  decoration?: 'underline' | 'overline' | 'line-through' | 'italic'
}
