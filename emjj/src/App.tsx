import { useState } from 'react'
import './App.css'
import Card, { type IEmoji } from './components/card'

function App() {
  const [emojis, setEmojis] = useState<IEmoji[]>(
    [
      { 
        symbolm: '💯', 
        title: '100', 
        keyWord: ''
      },
      { 
        symbolm: '😊', 
        title: 'smiling', 
        keyWord: ''
      },
      { 
        symbolm: '👌', 
        title: 'okay', 
        keyWord: ''
      }
    ]
  );
  return (
    <>
      <header>
        <h1>Emoji finder</h1>
        <p>find emoji by keyword</p>
        <input type="text" placeholder='Enter here...'/>
      </header>
      <main>
        {
          emojis && emojis.map((emoji)=> {
            return (
              <Card 
              symbolm={emoji.symbolm} 
              title={emoji.title}
              keyWord={emoji.keyWord}
              />
            )
          })
        }
      </main>
    </>
  )
}

export default App
