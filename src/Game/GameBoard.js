import { forwardRef, memo } from "react";
import propTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
import { getMultipleRandItems, shuffleAllItemsInArr } from "../utils";
import { useLocation } from "react-router-dom";

const GameBoard = memo(
  forwardRef((props, ref) => {
    console.count("Game Board re-render");
    const { finishGame } = props;

    const location = useLocation();
    //   level
    //     0: easy: get 8 icons
    //     1: med(ium): get 12 icons
    //     2: hard: get 16 icons
    const level = location.state.level;

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
      level === "easy" ? 8 : level === "med" ? 12 : level === "hard" ? 16 : 8;
    const emojisStoreSingle = getMultipleRandItems(emojisStore, numberOfIcons);
    // double all icons and shuffle
    const finalStore = shuffleAllItemsInArr(
      emojisStoreSingle.concat(emojisStoreSingle)
    );

    const clickOnItem = (e) => {
      // set on Item : reveal or close
      const list = ref.current; // div.game = list of items
      e.target.classList.add(styles.itemRotate); // add class .itemRotate to item

      setTimeout(() => {
        const allRotatedItems = list.querySelectorAll("." + styles.itemRotate);

        if (allRotatedItems.length > 1) {
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
              finishGame();
            }
          } else {
            // If not match, then rotate again the item
            allRotatedItems[0].classList.remove(styles.itemRotate);
            allRotatedItems[1].classList.remove(styles.itemRotate);
          }
        }
      }, 500);
    };

    const iconInARow = Math.floor(numberOfIcons / 2);
    const screenSzie = window.innerHeight;
    const sizeOfHolder = (screenSzie * 0.85) / 8;

    return (
      <div
        className={styles.game}
        ref={ref}
        style={{ gridTemplateColumns: `repeat(${iconInARow}, 1fr)` }}
      >
        {finalStore &&
          finalStore.map((icon, idx) => {
            return (
              <div
                className={styles.iconHolder}
                key={`${icon.iconName}_${idx}`}
                id={`${icon.iconName}_${idx}`}
                onClick={(e) => clickOnItem(e)}
                name={icon.iconName}
                style={{ width: sizeOfHolder, height: sizeOfHolder }}
              >
                <FontAwesomeIcon icon={icon} />
              </div>
            );
          })}
      </div>
    );
  })
);

GameBoard.defaultProps = {};
GameBoard.propTypes = {
  finishGame: propTypes.func.isRequired,
};

export default GameBoard;
