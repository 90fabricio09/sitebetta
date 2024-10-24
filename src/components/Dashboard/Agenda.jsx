import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  where 
} from 'firebase/firestore';
import { db, auth } from '../../Firebase.jsx'; // Importar db e auth
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-calendar/dist/Calendar.css';
import { format, isSameDay } from 'date-fns';
import { Timestamp } from 'firebase/firestore'; // Importar Timestamp para salvar a data

const Agenda = () => {
  const [eventos, setEventos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Função para buscar eventos do Firestore para o usuário logado
  const fetchEventos = async (userId) => {
    try {
      const q = query(collection(db, 'agendas'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const eventosData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        data: doc.data().data.toDate(), // Converter para Date
      }));
      setEventos(eventosData);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  // Detecta o usuário logado e busca seus eventos
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchEventos(user.uid); // Busca eventos do usuário logado
      } else {
        setEventos([]); // Limpa eventos ao deslogar
      }
    });

    return () => unsubscribe(); // Cleanup para evitar memory leaks
  }, []);

  // Adicionar um novo evento ao Firestore
  const handleAddEvento = async (e) => {
    e.preventDefault();
    const user = auth.currentUser; // Obter o usuário logado

    if (!user) {
      alert('Você precisa estar logado para adicionar eventos.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'agendas'), {
        titulo,
        descricao: descricao || 'Sem descrição', // Descrição padrão se estiver vazia
        data: Timestamp.fromDate(data), // Salvar data como Timestamp
        userId: user.uid, // Adicionar o ID do usuário logado
      });

      setEventos([...eventos, { titulo, descricao, data, id: docRef.id, userId: user.uid }]);
      setTitulo('');
      setDescricao('');
      setData(new Date());
      alert('Evento adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
    }
  };

  // Excluir evento com confirmação
  const handleDeleteEvento = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este evento?');
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'agendas', id));
      setEventos(eventos.filter((evento) => evento.id !== id));
      alert('Evento excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
    }
  };

  // Filtrar eventos para a data selecionada
  const eventosDoDia = eventos.filter((evento) =>
    isSameDay(evento.data, selectedDate)
  );

  return (
    <div className="agenda-container">
      <h2>Agenda de Eventos</h2>
      <form className="agenda-form" onSubmit={handleAddEvento}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <DatePicker
          selected={data}
          onChange={(date) => setData(date)}
          showTimeSelect
          dateFormat="dd/MM/yyyy HH:mm"
          timeCaption="Horário"
        />
        <button type="submit">Adicionar Evento</button>
      </form>

      <h2>Calendário</h2>
      <div className="agenda-calendar">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={({ date, view }) =>
            view === 'month' &&
              eventos.some((evento) => isSameDay(evento.data, date)) ? (
              <div className="event-marker"></div>
            ) : null
          }
        />
      </div>

      <h2>Eventos do Dia</h2>
      <ul className="agenda-event-list">
        {eventosDoDia.length > 0 ? (
          eventosDoDia.map((evento) => (
            <li key={evento.id}>
              <h3>{evento.titulo}</h3>
              <p>{evento.descricao}</p>
              <p>{format(evento.data, 'dd/MM/yyyy HH:mm')}</p>
              <button
                onClick={() => handleDeleteEvento(evento.id)}
                className="agenda-delete-btn"
              >
                Excluir
              </button>
            </li>
          ))
        ) : (
          <p>Nenhum evento para este dia.</p>
        )}
      </ul>
    </div>
  );
};

export default Agenda;