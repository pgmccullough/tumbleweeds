import { FC, useEffect } from "react"
import styles from './Crawler.module.scss'

export const Crawler: FC<{
  crawlerPos: any,
  setCrawlerPos: any,
  mainSpritePos: any,
  youDie: any
}> = ({ crawlerPos, setCrawlerPos, mainSpritePos, youDie}) => {

  useEffect(() => {
    const newInt = setInterval(() => {
      setCrawlerPos((prev: any) => {
        return {...prev, x: prev.x-7}
      })
    },100);
    return () => clearInterval(newInt)
  }, [])

  useEffect(() => {
    console.log(crawlerPos, mainSpritePos);
    if((crawlerPos.x > (mainSpritePos.x - 20)) 
      && (crawlerPos.x < (mainSpritePos.x + 20))
      && (mainSpritePos.y < 10)
    ) {
      youDie();
    }
    if(crawlerPos.x < -30) setCrawlerPos({...crawlerPos, x: window.innerWidth})
  }, [ crawlerPos, mainSpritePos ])

  return (
    <div
      className={styles.crawler}
      style={{left: crawlerPos.x+'px', bottom: crawlerPos.y}}
    />
  )
}