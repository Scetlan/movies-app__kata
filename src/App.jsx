import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import ListMovies from './components/Content/ListMovies';
import { SwapiService } from './service/swapiService';
import Cookies from 'js-cookie';
import Rated from './components/Rated/Rated';
import { ContextMovies } from './service/ContextMovies';

const api = new SwapiService();

const App = () => {
  const getSession = Cookies.get('guest_session_id');

  const [listGenres, setListGenre] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const session = !getSession && (await api.getAccessGuestSession());
        session &&
          Cookies.set('guest_session_id', session.guest_session_id, {
            expires: 1,
          });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchMovies();
  }, []);

  return (
    <main className="content">
      <header className="menu">
        <ContextMovies.Provider value={listGenres}>
          <Tabs defaultActiveKey="1" centered>
            <Tabs.TabPane tab="Search" key="1">
              <ListMovies state={setListGenre} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Rated" key="2" destroyInactiveTabPane>
              <Rated />
            </Tabs.TabPane>
          </Tabs>
        </ContextMovies.Provider>
      </header>
    </main>
  );
};

export default App;
