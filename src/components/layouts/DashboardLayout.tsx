import { FC, ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <h1 className="text-2xl font-bold text-gray-900">DrivEdify Dashboard</h1>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6">
        {children}
      </main>
    </div>
  )
}