import { Home, Users, Briefcase, FileText, Settings, LogOut, Menu, Smartphone } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import { useAuth } from '../../context/AuthContext'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Users, label: 'Workers', href: '/dashboard/workers' },
    { icon: Briefcase, label: 'Onboarding', href: '/dashboard/onboarding' },
    { icon: FileText, label: 'Marketplace', href: '/dashboard/marketplace' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-30 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex h-16 items-center px-6 border-b border-gray-100 dark:border-gray-800">
          <Smartphone className="w-8 h-8 text-teal-600 mr-3" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-800 dark:from-teal-400 dark:to-teal-200">
            One Call Hire
          </span>
          <button
            className="ml-auto lg:hidden text-gray-500"
            onClick={() => setIsOpen(false)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/dashboard'}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/10 dark:text-teal-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                }
              `}
              onClick={() => setIsOpen(false)} // Close on mobile click
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 gap-3"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        </div>
      </aside>
    </>
  )
}
