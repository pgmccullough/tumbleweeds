import { FC } from "react";
import styles from './MainSprite.module.scss'

export const MainSprite: FC<{mainSpritePos: {x: number, y: number}}> = ({ mainSpritePos }) => {
  const { x, y } = mainSpritePos;
  return (
    <div 
      className={styles.sprite}
      style={{left: x, bottom: y}}
    >
    
    </div>
  )
}