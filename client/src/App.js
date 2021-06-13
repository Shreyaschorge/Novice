import {useEffect, useState} from 'react'
import axios from 'axios';
import './App.css';

function App() {

  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await axios.get('/api/test');
    setData(res.data);
  }

  useEffect(() => {
    fetchData()
  }, [data]);

  return (
    <>
      {data ? 
      <div className="App">
        <h2> {data} </h2>
      </div> : 
      <></>}
    </>
    
  );
}

export default App;
