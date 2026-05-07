import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainShell } from './components/MainShell'
import { PolicyShell } from './components/PolicyShell'
import { HomePage } from './pages/HomePage'
import { ExplorePage } from './pages/ExplorePage'
import { LibraryPage } from './pages/LibraryPage'
import { LibraryNoteDetailPage } from './pages/LibraryNoteDetailPage'
import { LibraryNotesPage } from './pages/LibraryNotesPage'
import { LibraryQuestionDetailPage } from './pages/LibraryQuestionDetailPage'
import { LibraryQuestionsPage } from './pages/LibraryQuestionsPage'
import { LibrarySavedPage } from './pages/LibrarySavedPage'
import { QuizPage } from './pages/QuizPage'
import { PolicyDetailPage } from './pages/PolicyDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/library/saved" element={<LibrarySavedPage />} />
          <Route path="/library/questions" element={<LibraryQuestionsPage />} />
          <Route path="/library/questions/:policyId" element={<LibraryQuestionDetailPage />} />
          <Route path="/library/notes" element={<LibraryNotesPage />} />
          <Route path="/library/notes/:policyId" element={<LibraryNoteDetailPage />} />
        </Route>
        <Route element={<PolicyShell />}>
          <Route path="/policy/:id" element={<PolicyDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
