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
import { Button } from '@/components/ui/button'
import { useState } from 'react'
// import {ipcRenderer} from 'electron'

function App(): JSX.Element {
  const [filePath, setFilePath] = useState('')
  const handleClick = (action: string): void => {
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
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Button type="button" id="btn" onClick={handleOpen}>Open a File</Button>
      File path: <strong id="filePath">{filePath}</strong>
      <Button variant="outline" onClick={()=>handleClick("ping")}>Ping</Button>
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
    </div>
  )
}

export default App
