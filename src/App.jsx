import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable); 

import { Navbar, Welcome ,Dock} from "#components";
import { Finder, Resume, Safari, Terminal, Text, Image } from "#windows";


const App = () => {
  return  (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>
      <Terminal/>
      <Safari/> 
      <Resume />
      <Finder />
      <Text />
      <Image />
    </main>
  )
 
};

export default App 