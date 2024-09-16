import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext();

const AuthProvider = ({children}) => {
	const [ loginData, setLoginData ] = useState('');

	useEffect(() => {
		if(sessionStorage.getItem('supabase.auth.token')) {
			setLoginData(JSON.parse(sessionStorage.getItem('supabase.auth.token')))
		}
	},[]);

  return (
	<AuthContext.Provider value={{ loginData, setLoginData }}>
		{children}
	</AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }