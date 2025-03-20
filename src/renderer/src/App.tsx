import { Outlet } from "react-router-dom"


function App(): JSX.Element {
  
  return (
    <div className="h-screen w-full flex items-center justify-center">
      
      {/* 添加路由内容出口 */}
      <Outlet />
    </div>
  )
}

export default App
