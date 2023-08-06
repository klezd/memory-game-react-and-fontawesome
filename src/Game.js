import { useRef, useState } from "react";
import propTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import {
  faCoffee,
  faSplotch,
  faSpoon,
  faDice,
  faChessKing,
  faDragon,
  faHatWizard,
  faCamera,
  faHeart,
  faDiamond,
  faRing,
  faWhiskeyGlass,
  faLemon,
  faMugHot,
  faMusic,
  faAppleWhole,
  faBacon,
  faCake,
  faDog,
  faCat,
  faPaw,
  faLeaf,
  faGhost,
  faGauge,
  faPuzzlePiece,
  faBed,
  faBeer,
  faPieChart,
  faPiggyBank,
  faPizzaSlice,
  faBaby,
  faBank,
  faRainbow,
  faBolt,
  faRadiation,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Game.module.css";
import { getMultipleRandItems, shuffleAllItemsInArr } from "./utils";

function Game(props) {
  const listRef = useRef(null);
  const [win, setWin] = useState(false);
  const { level } = props;
  const emojisStore = [
    faCoffee,
    faSplotch,
    faSpoon,
    faDice,
    faChessKing,
    faDragon,
    faHatWizard,
    faHeart,
    faDiamond,
    faRing,
    faWhiskeyGlass,
    faLemon,
    faMugHot,
    faMusic,
    faAppleWhole,
    faBacon,
    faCake,
    faDog,
    faCat,
    faPaw,
    faLeaf,
    faGhost,
    faGauge,
    faPuzzlePiece,
    faBed,
    faBeer,
    faPieChart,
    faCamera,
    faPiggyBank,
    faPizzaSlice,
    faBaby,
    faBank,
    faRainbow,
    faBolt,
    faRadiation,
    faBookOpen,
  ];
  const numberOfIcons =
    level === 0 ? 8 : level === 1 ? 10 : level === 2 ? 12 : 8;
  const emojisStoreSingle = getMultipleRandItems(emojisStore, numberOfIcons);
  // double all icons and shuffle
  const finalStore = shuffleAllItemsInArr(
    emojisStoreSingle.concat(emojisStoreSingle)
  );

  const clickOnItem = (e) => {
    const list = listRef.current; // div.game = list of items
    e.target.classList.add(styles.itemRotate); // add class .itemRotate to item
    console.log(e.target.classList);
    setTimeout(() => {
      const allRotatedItems = list.querySelectorAll("." + styles.itemRotate);
      console.log(allRotatedItems.length);
      if (allRotatedItems.length > 1) {
        console.log(allRotatedItems[0].getAttribute("name"));
        console.log(allRotatedItems[1].getAttribute("name"));

        if (
          allRotatedItems[0].getAttribute("name") ===
          allRotatedItems[1].getAttribute("name")
        ) {
          // If there is the same icon, then add class '.itemMatched'
          allRotatedItems[0].classList.add(styles.itemMatched);
          allRotatedItems[1].classList.add(styles.itemMatched);

          // and remove 'itemRotate'
          allRotatedItems[0].classList.remove(styles.itemRotate);
          allRotatedItems[1].classList.remove(styles.itemRotate);

          if (
            list.querySelectorAll("." + styles.itemMatched).length ===
            finalStore.length
          ) {
            // all icons rotated and matched
            alert("win");
            setWin(true);
          }
        } else {
          allRotatedItems[0].classList.remove(styles.itemRotate);
          allRotatedItems[1].classList.remove(styles.itemRotate);
        }
      }
    }, 500);
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.game} ref={listRef}>
        {finalStore &&
          finalStore.map((icon, idx) => {
            return (
              <div
                className={styles.iconHolder}
                key={`${icon.iconName}_${idx}`}
                id={`${icon.iconName}_${idx}`}
                onClick={(e) => clickOnItem(e)}
                name={icon.iconName}
              >
                <FontAwesomeIcon icon={icon} />
              </div>
            );
          })}
      </div>
      <Button
        variant="outlined"
        color="success"
        className={styles.button}
        onClick={() => window.location.reload()}
      >
        Reset Game
      </Button>
    </div>
  );
}

Game.defaultProps = {
  /**** level
  0: Easy: get 8 icons
  1: Medium: get 12 icons
  2: Hard: get 16 icons
  ***/
  level: 0,
};
Game.propTypes = {
  level: propTypes.number,
};

export default Game;
