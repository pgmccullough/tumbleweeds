import { useState } from 'react'
import styles from './App.module.scss'
import { keyHandlers } from './controls/keyHandlers'
import { MainSprite } from './sprites/MainSprite/MainSprite'
import { Crawler } from './sprites/Crawler/Crawler'
import { IMainSpritePos } from './common/types'

function App() {
  const [ mainSpritePos, setMainSpritePos ] = useState<IMainSpritePos>({x: 0, y: 0, dir: "r"})
  const [ movePersist, setMovePersist ] = useState({right: false, left: false});
  const [ crawlerPos, setCrawlerPos ] = useState<{x: number, y: number}>({x: Number(window.innerWidth), y: 0})
  
  const killCrawler = () => {
    setCrawlerPos({x: Number(window.innerWidth), y: 0});
  }

  const youDie = () => {
    setMainSpritePos({x: 0, y: 0, dir: "r"});
  }

  return(
    <div 
      tabIndex={0}
      className={styles.screen}
      onKeyDown={(e) => keyHandlers(e, true, mainSpritePos, setMainSpritePos, movePersist, setMovePersist, crawlerPos, killCrawler)}
      onKeyUp={(e) => keyHandlers(e, false, mainSpritePos, setMainSpritePos, movePersist, setMovePersist, crawlerPos, killCrawler)}
    >
      <MainSprite
        mainSpritePos={mainSpritePos}
      />
      <Crawler 
        crawlerPos={crawlerPos}
        setCrawlerPos={setCrawlerPos}
        mainSpritePos={mainSpritePos}
        youDie={youDie}
      />
    </div>
  )
}

export default App
