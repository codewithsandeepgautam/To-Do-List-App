import { Navigate, Route, Routes } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import AllTasks from './pages/AllTasks';
import Search from './pages/Search';

export default function App() {
  return (
    <TaskProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/all" element={<AllTasks />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TaskProvider>
  );
}
