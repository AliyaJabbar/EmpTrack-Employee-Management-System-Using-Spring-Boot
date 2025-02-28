import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/employees" element={<ListEmployeeComponent />} />
                <Route path="/update-employee/:id" element={<UpdateEmployeeComponent />} />
            </Routes>
        </Router>
    );
}

export default App;
