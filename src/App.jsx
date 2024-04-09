import ContextMovies from './service/ContextMovies';
import ListMovies from './components/Content/ListMovies';
import SwapiService from './service/swapiService';
import Rated from './components/Rated/Rated';
import Cookies from 'js-cookie';

import { Tabs } from 'antd';
import { useEffect, useState } from 'react';

const api = new SwapiService();

function App() {
  const getSession = Cookies.get('guest_session_id');

  const [listGenres, setListGenres] = useState(new Map());

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const session = !getSession && (await api.getAccessGuestSession());
        if (session) {
          Cookies.set('guest_session_id', session.guest_session_id, {
            expires: 1,
          });
        }
      } catch (error) {
        throw new Error(error.message);
      }
    };

    fetchMovies();
  }, [getSession]);

  useEffect(() => {
    const arrGenre = async () => {
      const genres = await api.getMoviesGenre();
      const genresMap = new Map(genres.map(genre => [genre.id, genre.name]));
      setListGenres(genresMap);
    };
    arrGenre();
  }, []);

  return (
    <main className="content">
      <header className="menu">
        <ContextMovies.Provider value={listGenres}>
          <Tabs defaultActiveKey="1" centered>
            <Tabs.TabPane tab="Search" key="1">
              <ListMovies />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Rated" key="2" destroyInactiveTabPane>
              <Rated />
            </Tabs.TabPane>
          </Tabs>
        </ContextMovies.Provider>
      </header>
    </main>
  );
}

export default App;
