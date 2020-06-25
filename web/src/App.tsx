import React from 'react';
import './App.css';

import Routes from './routes'


function App() {

  return(
    <Routes />
  )

  // let [counter, setCounter] = useState(0)// retorna uma array[valor,função]
  // function inc(){
  //  setCounter(counter + 1)
  // }
  // return (
  //   <div>
  //     <Header title={`Contador: ${counter}`} />
  //       <h1>{counter}</h1>
  //     <button type='button' onClick={inc}>Incrementar</button>
  //   </div>
  // )
}

export default App
