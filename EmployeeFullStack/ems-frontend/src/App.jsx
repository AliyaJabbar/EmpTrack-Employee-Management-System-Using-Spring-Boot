import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import DeleteEmployeeComponent from './components/DeleteEmployeeComponent';

function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Navigate to="/employees" />} /> 
                <Route path="/employees" element={<ListEmployeeComponent />} />
                <Route path="/update-employee/:id" element={<UpdateEmployeeComponent />} />
                <Route path="/delete-employee/:id" element={<DeleteEmployeeComponent />} /> {/* Add this route */}
              
                {/* <Route path="/delete-employee/:id" element={<DeleteEmployeeComponent />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
