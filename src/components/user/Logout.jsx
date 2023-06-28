import { useAuth } from '../../context/auth';
import { nav } from '../../assets/RoutePaths';
import { useNavigate } from 'react-router';

const Logout = () => {
    const auth = useAuth();
    auth.logout();
    const navigate = useNavigate();
    navigate(nav.Login);
}

export default Logout