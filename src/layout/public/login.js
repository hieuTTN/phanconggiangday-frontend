import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react'

function LoginForm({children}){
    const [isCssLoaded, setCssLoaded] = useState(false);
    useEffect(()=>{
        import('./stylelogin.scss').then(() => setCssLoaded(true));
    }, []);
    if (!isCssLoaded) {
        return <></>
    }
    return(
        <div>
            {children}
        </div>
        
    );
}
export default LoginForm;