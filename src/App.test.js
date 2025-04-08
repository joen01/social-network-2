import AppSamurai from './App';
import {createRoot} from "react-dom/client";

it("renders App component", () => {
  const  div = document.createElement('div')
const root = createRoot(div)
root.render(<AppSamurai/>)
  root.unmount()
})
