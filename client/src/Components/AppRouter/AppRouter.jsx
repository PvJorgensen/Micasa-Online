import { Route, Routes } from 'react-router-dom';
import { FrontPage } from '../../Pages/FrontPage/FrontPage';
import { EstateListPage } from '../../Pages/EstateListPage/EstateListPage';
import { ContactPage } from '../../Pages/ContactPage/ContactPage';
import { LoginPage } from '../../Pages/LoginPage/LoginPage';
import { AdminPage } from '../../Pages/AdminPage/AdminPage';
import { EstatesList } from '../EstatesList/EstatesList';
import { EstateDetails } from '../EstatesDetails/EstateDetails';

export const AppRouter = () => {
  return (
    <Routes>
        <Route index element={<FrontPage />}></Route>
        <Route path='/Boliger' element={<EstateListPage />}>
          <Route index element={<EstatesList />}></Route>
          <Route path=':estate_id' element={<EstateDetails />}></Route>
        </Route>
        <Route path='/Kontakt' element={<ContactPage />}></Route>
        <Route path='/Login' element={<LoginPage />}></Route>
        <Route path='/Min side' element={<AdminPage />}></Route>
    </Routes>
  )
}
