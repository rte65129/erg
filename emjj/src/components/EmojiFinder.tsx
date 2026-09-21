import React, { useState, useEffect } from 'react'; 
import { getEmojis, type IEmojiItem } from '../api/emojiApi'; 

const App: React.FC = () => { 
  const [emojis, setEmojis] = useState<IEmojiItem[]>([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  const fetchData = async () => { 
    setLoading(true); 
    setError(null); 
    try { 
      const data = await getEmojis(searchTerm); 
      setEmojis(data); 
    } catch (err) { 
      setError('Не удалось загрузить данные. Проверьте, запущен ли сервер (start.bat).'); 
    } finally { 
      setLoading(false); 
    } 
  }; 

  useEffect(() => { 
    fetchData(); 
  }, [searchTerm]); 

  if (error) { 
    return ( 
      <div style={{ padding: '20px', color: 'red', fontWeight: 'bold', textAlign: 'center' }}> 
        {error} 
      </div> 
    ); 
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Поиск эмодзи</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Введите название или ключевое слово..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '100%', boxSizing: 'border-box' }}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            style={{ marginTop: '10px', cursor: 'pointer' }}
          >
            Очистить поиск
          </button>
        )}
      </div>

      {loading && (
        <div style={{ padding: '20px', textAlign: 'center', fontWeight: 'bold' }}>
          Загрузка эмодзи...
        </div>
      )}

      {!loading && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '15px',
          }}
        >
          {emojis.length === 0 ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>Эмодзи не найдены</p>
          ) : (
            emojis.map((emoji) => (
              <div
                key={emoji.id}
                style={{
                  border: '1px solid #ddd',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={{ fontSize: '40px', lineHeight: '1' }}>
                  {emoji.emoji}
                </div>
                <h3 style={{ margin: '10px 0 5px', fontSize: '16px' }}>
                  {emoji.title}
                </h3>
                <small style={{ color: '#666', display: 'block' }}>
                  {emoji.keywords}
                </small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default App;