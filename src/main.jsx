import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Online, Offline } from 'react-detect-offline';
import './style.css';
import { Alert } from 'antd';

//API-ключ: 8655a10ea10b24c26b719cefdce2c44c

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Online>
      <App />
    </Online>
    <Offline>
      <div className="offline">
        <Alert
          type="error"
          message={`Можно было бы навести суету,но у тебя нет инета :(`}
        />
      </div>
    </Offline>
  </>
);
