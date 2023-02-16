import react ,{useState} from 'react';
import { Link } from "react-router-dom";




  function Welcome() { 
    const [input , setValue ] = useState("");
  
    const handleInput = (event) => {
      setValue(event.target.value);
    }

    
    
  
    return(
      <div className="box"> 
      <h1> Hello ! 
      </h1>
      <h2>
          Welcome
      </h2>
      <div>
            <input type="text " value={input} name='name-1 ' onChange={handleInput} class="input"></input>
          </div>
        <div class="field">
          <label for="name-1"> tapez le lien  </label>
          
        </div>
        <div class="field">
          <div class="control">
          <a href="/app">
            <button>Welcome </button>
            </a>
          </div>
        </div>
  
      
  
  
      </div>
    )
  
  }
  
  
  export default Welcome;