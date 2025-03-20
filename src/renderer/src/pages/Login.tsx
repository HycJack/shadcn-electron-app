import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormEvent, useState } from 'react'
import { useAuth } from '@/AuthContext'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {login} = useAuth();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await login({email: email, password:password })
      const authToken = localStorage.getItem('token')
      if (authToken) {
        navigate('/')
      }
      
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Login</h1>
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <Input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
        <Button variant="link" asChild>
          <Link to="/register">Create new account</Link>
        </Button>
      </form>
    </div>
  )
}