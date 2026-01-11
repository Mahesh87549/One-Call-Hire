import { Search, Menu } from 'lucide-react'
import { Input } from '../ui/Input'
import { useAuth } from '../../context/AuthContext'

interface HeaderProps {
    onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
    const { user } = useAuth()

    // Get first 2 letters of username
    const initials = user?.username?.substring(0, 2).toUpperCase() || 'JD'

    return (
        <header className="sticky top-0 z-10 flex h-16 w-full items-center gap-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur px-6">
            <button
                className="lg:hidden text-gray-500 hover:text-gray-700"
                onClick={onMenuClick}
            >
                <Menu className="w-6 h-6" />
            </button>

            <div className="flex flex-1 gap-4 md:gap-8 justify-end lg:justify-between items-center">
                <div className="hidden lg:flex w-full max-w-sm relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search employees, departments..."
                        className="pl-9 bg-gray-50 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-900 transition-colors"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary-400 to-indigo-500 flex items-center justify-center text-white font-medium text-sm cursor-pointer hover:ring-2 ring-offset-2 ring-primary transition-all">
                        {initials}
                    </div>
                </div>
            </div>
        </header>
    )
}
