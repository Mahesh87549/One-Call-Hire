import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
    user: { username: string; role: string } | null
    login: (username: string, password: string) => boolean
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Pre-defined admin credentials
const ADMIN_CREDENTIALS = {
    username: 'Mahesh',
    password: '1',
    role: 'admin'
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<{ username: string; role: string } | null>(() => {
        const savedUser = localStorage.getItem('currentUser')
        return savedUser ? JSON.parse(savedUser) : null
    })

    useEffect(() => {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user))
        } else {
            localStorage.removeItem('currentUser')
        }
    }, [user])

    const login = (username: string, password: string): boolean => {
        // Check against admin credentials
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            const userData = { username: ADMIN_CREDENTIALS.username, role: ADMIN_CREDENTIALS.role }
            setUser(userData)
            return true
        }
        return false
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
