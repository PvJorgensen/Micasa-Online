import { Route, Routes } from 'react-router-dom';
import { FrontPage } from '../../Pages/FrontPage/FrontPage';
import { EstateListPage } from '../../Pages/EstateListPage/EstateListPage';
import { ContactPage } from '../../Pages/ContactPage/ContactPage';
import { LoginPage } from '../../Pages/LoginPage/LoginPage';
import { AdminPage } from '../../Pages/AdminPage/AdminPage';

export const AppRouter = () => {
  return (
    <Routes>
        <Route index element={<FrontPage />}></Route>
        <Route path='/Boliger' element={<EstateListPage />}></Route>
        <Route path='/Kontakt' element={<ContactPage />}></Route>
        <Route path='/Login' element={<LoginPage />}></Route>
        <Route path='/Admin' element={<AdminPage />}></Route>
    </Routes>
  )
}
