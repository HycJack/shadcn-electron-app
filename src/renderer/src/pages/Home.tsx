import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
  } from '@/components/ui/alert-dialog'
import { useState } from 'react'
import { useAuth } from '@/AuthContext'

export function Home() {
    const navigate = useNavigate()
    const { logout } = useAuth();
    const [filePath, setFilePath] = useState('')
    const handleClick = (): void => {
        window.electron.ipcRenderer.invoke('ping').then((msg) => {
        setFilePath(msg);
        });
        
        window.electron.ipcRenderer.send('set-title', "你好")
    }

    const handleOpen = (): void => {
        // 返回值为 void，不能直接赋值给 setFilePath
        // 假设使用异步方式获取路径并更新状态
        window.electron.ipcRenderer.invoke('dialog:openFile').then((path) => {
        setFilePath(path);
        });
    }
    const handleLogout = (): void => {
        logout()
        const authToken = localStorage.getItem('token')
        if (authToken == null) {
            navigate('/login')
        }
    }
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Home Page</h1>
      <Button type="button" id="btn" onClick={handleOpen}>Open a File</Button>
      File path: <strong id="filePath">{filePath}</strong>
      <Button variant="outline" onClick={()=>handleClick()}>Ping</Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button asChild>
        <Link to="/about">Go to About</Link>
      </Button>
      <Button onClick={()=>handleLogout()}>
        LogOut
      </Button>
      
    </div>
  )
}