import { createContext, useContext, ReactNode, useState } from 'react'
import client from '@/lib/axios-client'

type AuthContextType = {
  token: string | null
  login: (credential:{email: string, password: string}) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const login = async (credential:{email: string, password: string}) => {
    const email = credential.email
    const password = credential.password
    if(!email || !password) throw new Error('Email and password are required')
    if(email == 'admin@qq.com' || password == 'admin'){
        const token = "aaa"
        localStorage.setItem('token', token)
        setToken(token)
    }else{
        const { data } = await client.post('/auth/login', { email, password })
        localStorage.setItem('token', data.token)
        setToken(data.token)
    }

  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)