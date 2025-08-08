import PaneList from './components/PaneList';

import './styles/tasks.css'
import './styles/panes.css'
import './styles/addTask.css'

function App() {
    return (
        <>
            <header className="todo-header">
                <h1>TODO</h1>
            </header>
            <PaneList />
        </>
    );
}

export default App;
