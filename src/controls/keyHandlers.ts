import { Dispatch, KeyboardEvent } from "react";
import { IMainSpritePos } from "../common/types";

const delay = (fn, ms) => new Promise((resolve, reject) => {
  setTimeout(() => resolve(fn()), ms)
})

export const keyHandlers = (
  e: KeyboardEvent<HTMLDivElement>, 
  down: boolean,
  mainSpritePos: IMainSpritePos,
  setMainSpritePos: Dispatch<React.SetStateAction<IMainSpritePos>>,
  movePersist: any,
  setMovePersist: Dispatch<React.SetStateAction<{left: boolean, right: boolean}>>,
  crawlerPos: {x: number, y: number},
  killCrawler: any
) => {

  const code = e.code.replace('Key','');

  const moveLeft = () => {
    down
      ? setMovePersist((prevState: any) => {
        if(movePersist.left) {
          return {...prevState};
        }
        clearInterval(window['customintervalL']);
        window['customintervalL'] = setInterval(() => {
          setMainSpritePos((currentPos: IMainSpritePos) => {
            return {...currentPos, x: currentPos.x-10}
          })
        },100)
        return { ...prevState, left: true }
      })
      : setMovePersist((prevState: any) => {
          clearInterval(window['customintervalL']);
          return { ...prevState, left: null }
        }
      )
  }

  const moveRight = () => {
    down
      ? setMovePersist((prevState: any) => {
        if(movePersist.right) {
          return {...prevState};
        }
        clearInterval(window['customintervalR']);
        window['customintervalR'] = setInterval(() => {
          setMainSpritePos((currentPos: IMainSpritePos) => {
            return {...currentPos, x: currentPos.x+10}
          })
        },100)
        return { ...prevState, right: true }
      })
      : setMovePersist((prevState: any) => {
          clearInterval(window['customintervalR']);
          return { ...prevState, right: null }
        }
      )
  }

  const jump = async () => {
    if(!down || mainSpritePos.y) return;
    for(let [i, ms] of [50,50,50,50].entries()) {
      await delay(() => {
        setMainSpritePos((currentPos: IMainSpritePos) => {
          return {...currentPos, y: (i+1)*ms/6}
        })
      },ms)
    }
    for(let [i, ms] of [50,50,50,50].entries()) {
      await delay(() => {
        setMainSpritePos((currentPos: IMainSpritePos) => {
          return {...currentPos, y: (5-i)*ms/6}
        })
      },ms)
    }
    setMainSpritePos((currentPos: IMainSpritePos) => {
      console.log('crawler',crawlerPos.x)
      console.log('crawler',currentPos.x)
      if((crawlerPos.x > (currentPos.x + 5)) && (crawlerPos.x < (currentPos.x + 40))) {
        killCrawler();
      }
      return {...currentPos, y: 0}
    })
    
  }

  console.log(code)

  switch(code) {
    case "A" :
      moveLeft();
      break;
    case "D" :
      moveRight();
      break;
    case "Space" :
      jump();
      break;
  }

}