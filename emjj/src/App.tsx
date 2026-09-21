import { useState, useEffect } from 'react';
import { getEmojis, type IEmojiItem } from './api/emojiApi';
import Card from './components/card';
import './App.css';

function App() {
  const [emojis, setEmojis] = useState<IEmojiItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getEmojis(searchTerm);
        if (!cancelled) setEmojis(data);
      } catch {
        if (!cancelled) setError('Не удалось загрузить данные. Проверьте сервер.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [searchTerm]);

  return (
    <>
      <header>
        <h1>Emoji finder</h1>
        <p>find emoji by keyword</p>
        <input
          type="text"
          placeholder="Enter here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>
      <main>
        {loading && <p>Загрузка...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && emojis.length === 0 && <p>Ничего не найдено</p>}
        {emojis.map((e) => (
          <Card key={e.id} {...e} />
        ))}
      </main>
    </>
  );
}

export default App;
