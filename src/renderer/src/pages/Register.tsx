import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormEvent, useState } from 'react'
import client from '@/lib/axios-client'

export function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
    const { data } = await client.post('/auth/login', { email, password })  
      localStorage.setItem('token', data.token)
      navigate('/')
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
        <Button type="submit">Rgister</Button>
        <Button variant="link" asChild>
          <Link to="/Login">Have a account, to Login</Link>
        </Button>
      </form>
    </div>
  )
}