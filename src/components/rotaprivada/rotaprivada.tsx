// PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { usarcontextoapi } from '../../context/contextapi'
import { usarcontexto } from '../../context/context';
import { useEffect ,useState} from 'react';
import Loading from '../loading/loading';


type RotaprivadaProps = {
  authenticated: boolean;
};


const Rotaprivada = ({ authenticated }: RotaprivadaProps) => {

const [loading, setLoading] = useState(true);
const {rotavalidartoken} = usarcontextoapi()
const {setAuthenticated} = usarcontexto()

async function validarToken() {
  try {
    setLoading(true);
    const response = await fetch(rotavalidartoken, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
const information = await response.json();
    if (!response.ok) {
      setLoading(false);
      return setAuthenticated(false);
    }
    setLoading(false);
    return setAuthenticated(true); // Supondo que o backend retorne um campo "valid"
  } catch (error) {
    setLoading(false);
    return setAuthenticated(false);
  }
}
useEffect(()=>{
  validarToken();
},[])

  if(loading) return <Loading/>
  return authenticated ? <Outlet /> : <Navigate to="/" />;

};

export default Rotaprivada;
