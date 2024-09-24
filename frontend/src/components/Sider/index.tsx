import { Layout } from 'antd'
import { type SiderProps } from 'antd/lib/layout'
import { type SiderTheme } from 'antd/es/layout/Sider'
import { type ReactNode, type ReactElement } from 'react'

const { Sider: SiderAnt } = Layout

interface CustomSiderProps extends Omit<SiderProps, 'theme'> {
  antTheme?: SiderTheme
  children: ReactNode
}

export function Sider({
  antTheme,
  children,
  ...rest
}: CustomSiderProps): ReactElement {
  return (
    <SiderAnt theme={antTheme} {...rest}>
      {children}
    </SiderAnt>
  )
}
