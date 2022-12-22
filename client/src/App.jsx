
import NewBoard from './scenes/NewBoard'
import ExistingBoard from './scenes/ExistingBoard'
import Dashboard from './scenes/Dashboard'
import Landing from './scenes/Landing'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* :doc_id is the id of the document we are requesting to access using dynamic routing. */}
            <Route path="/board/:doc_id" element={<ExistingBoard />} />
            <Route path="/new-board" element={<NewBoard />} />
        </Routes>
    </Router>
)

export default App