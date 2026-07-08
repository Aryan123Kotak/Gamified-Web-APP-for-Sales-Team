import { Navigate, Route, Routes } from 'react-router-dom';
import { useGame } from './store.jsx';
import Layout from './components/Layout.jsx';
import Auth from './pages/Auth.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LevelMap from './pages/LevelMap.jsx';
import ModulePage from './pages/ModulePage.jsx';
import BossQuiz from './pages/BossQuiz.jsx';
import Vault from './pages/Vault.jsx';
import Missions from './pages/Missions.jsx';
import Badges from './pages/Badges.jsx';
import Leaderboard from './pages/Leaderboard.jsx';

export default function App() {
  const { authed, loading } = useGame();

  if (loading) return <div className="spin" />;

  if (!authed) {
    return (
      <Routes>
        <Route path="*" element={<Auth />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/map" element={<LevelMap />} />
        <Route path="/module/:id" element={<ModulePage />} />
        <Route path="/module/:id/boss" element={<BossQuiz />} />
        <Route path="/vault" element={<Vault />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/badges" element={<Badges />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
