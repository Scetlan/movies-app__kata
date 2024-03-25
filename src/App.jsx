import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import ListPopular from './components/Content/ListPopular';
import { SwapiService } from './service/swapiService';
import Cookies from 'js-cookie';

const api = new SwapiService();

const App = () => {

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const session = !api.getSession && (await api.getAccessGuestSession());
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
        <Tabs defaultActiveKey="1" centered>
          <Tabs.TabPane tab="Search" key="1">
            <ListPopular/>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Rated" key="2" destroyInactiveTabPane>
            {/* <Rate />  - здесь должен быть список тех фильмов, которые я оценила*/}
          </Tabs.TabPane>
        </Tabs>
      </header>
    </main>
  );
};

export default App;
