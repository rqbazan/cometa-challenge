interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return <div>{children}</div>
}

export function getMainLayout(node: React.ReactNode) {
  return <MainLayout>{node}</MainLayout>
}
