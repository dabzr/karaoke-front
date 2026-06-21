import { Route, Routes } from 'react-router-dom'
import { RoutesPages } from './pages/main'

function App() {

  return (
    <Routes>
      <Route path="*" element={<RoutesPages/>} />
    </Routes>
  )
}

export default App
