import type { IEmojiItem } from '../api/emojiApi';

export type IEmoji = IEmojiItem;

export default function Card({ emoji, title, keywords }: IEmoji) {
  return (
    <div className="card">
      <p className="symbol">{emoji}</p>
      <p className="title">{title}</p>
      <p className="keyWords">{keywords}</p>
    </div>
  );
}