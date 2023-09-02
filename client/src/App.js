import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Channel from "./pages/channel/Channel";
import { io } from "socket.io-client";
const socket = io();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home socket={socket}/>
  }, {
    path: "channel/:channelId",
    element: <Channel socket={socket}/>,
  }
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
