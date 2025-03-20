import { BrowserRouter,  Route,  Routes,  } from "react-router-dom"
import { Home } from './pages/Home'
import { About } from './pages/About'
import './assets/main.css'
import ProtectedRoute from './ProtectedRoute'
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"

function App(): JSX.Element {
  
  return (
    <div className="h-screen w-full flex items-center justify-center">
      {/* 添加路由内容出口 */}
      <BrowserRouter>
        <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
