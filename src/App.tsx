import { NotesProvider } from "./context/NoteContext";
import { NotePage } from "./pages/NotePage";

function App() {
  return (
    <div id="app">
      <NotesProvider>
        <NotePage />
      </NotesProvider>
    </div>
  );
}

export default App;
