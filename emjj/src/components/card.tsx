export interface IEmoji {
    symbolm: string,
    title: string,
    keyWord: string
}

export default function Card( {symbolm, title, keyWord}: IEmoji ){
    return (
        <div className="card">
          <p className="symbol">{symbolm}</p>
          <p className="title">{title}</p>
          <p className="keyWords">{keyWord}</p>    
        </div>
    )
}