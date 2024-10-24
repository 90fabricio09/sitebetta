import React, { useEffect, useState } from 'react';
import { auth } from '../../Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import MockupMac from '../../assets/mockup_mac.png'

const DashboardHome = () => {
  const [username, setUsername] = useState('Usuário');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUsername(data.firstName || 'Usuário');
          } else {
            setError('Nenhum documento encontrado para o usuário.');
          }
        } catch (err) {
          setError('Erro ao buscar documento.');
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard-home">
      <h1>Olá, {username}!</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Bem-vindo à sua dashboard personalizada.</p>
      <img src={MockupMac} alt="Dashboard Betta" className='imgdash'/>
    </div>
  );
};

export default DashboardHome;