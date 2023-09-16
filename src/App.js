import { useEffect, useRef, useState } from "react";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";

import { RouteTable } from './RouteTable';

function App() {

  const connectionRef = useRef(null);
  const [data, setData] = useState();

  useEffect(() => {
    
    let connection = new HubConnectionBuilder()
      .withUrl("http://31.53.16.222:5000/routes",
      {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    })
      .build();

      connection.on("ReceiveMessage", (data) => {
        setData(data);
      });

      connection.start().then( () => {
        console.log("Started")
      }).catch((error) => {
        console.log({error})
      })

    connectionRef.current = connection;

    return () => {
      // connection.stop().catch(error => console.log(error))
    }


  }, [])
  return (
    <div className="App">
      <RouteTable routeData={data} />
    </div>
  );
}

export default App;
