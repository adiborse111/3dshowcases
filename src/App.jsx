import { Route, Routes } from "react-router-dom"

import Home from "./Home"
import BasicDemo from "./project/basicdemo/app"
import ViewCube from "./project/viewcube/ViewCube"
import SimplePhysics from "./project/simplephysics/App"



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/BasicDemo" element={<BasicDemo />} />
      <Route path="/ViewCube" element={<ViewCube />} />
      <Route path="/SimplePhysics" element={<SimplePhysics />} />
    </Routes>
  )
}