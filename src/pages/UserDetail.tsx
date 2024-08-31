import { useParams } from "react-router-dom";

export default function UserDetail() {
  let { id } = useParams(); 

  return <h1>User Id : {id}</h1>
}