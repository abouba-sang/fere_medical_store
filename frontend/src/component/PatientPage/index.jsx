
import { Routes, Route } from 'react-router-dom';
import PatientHome from '../Patient/Home';
import PatientAdd from '../Patient/Add';

const PatientPage = () => {
  return (
    <Routes>
      <Route path='/' element={<PatientHome />} />
      <Route path='/ajout/patient' element={<PatientAdd />} />
    </Routes>
  )
}

export default PatientPage