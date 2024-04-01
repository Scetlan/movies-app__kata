import App from './App';
import ReactDOM from 'react-dom/client';
import { Online, Offline } from 'react-detect-offline';
import './style.css';
import { Alert } from 'antd';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Online>
      <App />
    </Online>
    <Offline>
      <div className="offline">
        <Alert type="error" message="Можно было бы навести суету,но у тебя нет инета :(" />
      </div>
    </Offline>
  </>
);
