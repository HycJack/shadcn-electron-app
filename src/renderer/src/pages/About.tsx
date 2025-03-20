import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function About() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">About Page</h1>
      <Button asChild variant="outline">
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  )
}