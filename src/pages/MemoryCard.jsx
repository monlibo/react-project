import React, { useContext, useState } from "react";
import "../styles/pages/MemoryCard.css";
import img1 from "../assets/img/MemoryCard/1.png";
import img2 from "../assets/img/MemoryCard/2.jpg";
import img3 from "../assets/img/MemoryCard/3.jpg";
import img4 from "../assets/img/MemoryCard/4.jpg";
import MeteoFooter from "../components/MeteoFooter";
import { ThemeContext } from "../utils/context";
//import { waitFor } from "@testing-library/react";

function MemoryCard() {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  var imageIndexRows = [1, 2, 3, 4, 5, 6, 7, 8];

  // La liste des images
  let ImagesRows = [
    {
      id: "card3",
      name: img3,
      imgId: 3,
      view: false,
    },
    {
      id: "card1",
      name: img1,
      imgId: 1,
      view: false,
    },
    {
      id: "card2",
      name: img2,
      imgId: 2,
      view: false,
    },

    {
      id: "card4",
      name: img4,
      imgId: 4,
      view: false,
    },

    {
      id: "card6",
      name: img1,
      imgId: 1,
      view: false,
    },
    {
      id: "card5",
      name: img3,
      imgId: 3,
      view: false,
    },
    {
      id: "card7",
      name: img4,
      imgId: 4,
      view: false,
    },
    {
      id: "card8",
      name: img2,
      imgId: 2,
      view: false,
    },
  ];

  //Cette fonction permet de mélanger la liste pour que les cartes ne soient pas alignées
  const getRandom = (array: any[]) => {
    return array.sort(() => 0.5 - Math.random());
  };

  const { toggleTheme, theme } = useContext(ThemeContext);
  const [images, setImages] = useState(getRandom(ImagesRows));
  const [chance, setChance] = useState(15);
  const [openedCardKey, setOpenedCardKey] = useState("");
  const [openedCardName, setOpenedCardName] = useState("");
  const [openedCards, setOpenedCards] = useState([]);

  const returnCard = async (index: any, cardID: any, nameImage: any) => {
    if (chance > 0) {
      //Vérifier si l'image cliqué n'est pas déjà validé
      if (!openedCards.find((name) => name === nameImage)) {
        //Si c'est la même carte qui est cliquée, on la retourne
        if (cardID === openedCardKey) {
          document.getElementById(cardID)?.classList.remove("rotate");

          //Et on cache les deux cartes
          images[index].view = false;
          //On attend 0.1s avant d'afficher l'image
          setTimeout(() => {
            setImages([...images]);
          }, 100);
          setOpenedCardKey("");
          setOpenedCardName("");
          //console.log("Même image" + openedCardKey);
        } else {
          //Si une deuxème carte est retournée
          if (openedCardKey != "") {
            //Si c'est la même image
            if (openedCardName == nameImage) {
              console.log(
                "La deuxième carte cliquée est la même image que l'autre"
              );

              //Je retourne la carte
              document.getElementById(cardID)?.classList.add("rotate");
              //Et on cache les deux cartes
              images[index].view = true;
              //On attend 0.1s avant d'afficher l'image
              setTimeout(() => {
                setImages([...images]);
              }, 100);

              //J'ajoute l'image aux images déjà tournée pour après empecher de le retourner encore
              openedCards.push(nameImage);
              setOpenedCards([...openedCards]);
              setOpenedCardKey("");
              setOpenedCardName("");
            }
            //Si ce n'est pas la même image
            else {
              console.log(
                "La deuxième carte cliquée n'est pas la même image que l'autre"
              );

              //Je retourne la carte
              document.getElementById(cardID)?.classList.add("rotate");
              //Et on cache les deux cartes
              images[index].view = true;
              //On attend 0.1s avant d'afficher l'image
              setTimeout(() => {
                setImages([...images]);
              }, 100);

              ///////////////////////////////////////////////////////
              //Ensuite j'attend quelques secondes avant de fermer les deux images

              setTimeout(() => {
                document.getElementById(cardID)?.classList.remove("rotate");
                document
                  .getElementById(openedCardKey)
                  ?.classList.remove("rotate");

                //Et on cache les deux cartes
                images[index].view = false;
                images[
                  images.findIndex((image) => image.id == openedCardKey)
                ].view = false;
                //On attend 0.1s avant d'afficher l'image
                setTimeout(() => {
                  setImages([...images]);
                }, 100);
                setOpenedCardKey("");
                setOpenedCardName("");
              }, 800);
            }
          } else {
            document.getElementById(cardID)?.classList.add("rotate");
            //Et on cache les deux cartes
            images[index].view = true;
            //On attend 0.1s avant d'afficher l'image
            setTimeout(() => {
              setImages([...images]);
              let newChance = chance;
              setChance(--newChance);
            }, 100);
            setOpenedCardKey(cardID);
            setOpenedCardName(nameImage);
            //console.log(openedCardKey);
          }
        }
      }
    } else {
      alert("Désolé, vous n'avez plus de chance");
    }
  };

  const rotateAllCard = async () => {
    for (let index = 0; index < 8; index++) {
      document.getElementById("card" + (index + 1))?.classList.remove("rotate");
      console.log("card" + (index + 1));
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center p-6 space-y-8 dark:bg-gray-700 dark:text-gray-100 h-screen">
        <div className="w-[1000px] flex justify-between items-center">
          <div className="text-[20px] font-bold text-blue-600">
            MEMORY CARD GAME
          </div>
          <div>Tentatives : {chance}/15</div>
          <div className="theme_toggler_container">
            <button
              onClick={() => toggleTheme()}
              className={
                theme == "dark"
                  ? "w-[45px] h-[20px] bg-gray-600 relative rounded-full"
                  : "w-[45px] h-[20px] bg-gray-300 relative rounded-full"
              }
            >
              <div
                className={
                  theme == "dark"
                    ? "theme-icon-container w-[25px] h-[25px]  bg-pink-600 text-white rounded-full absolute  right-0 -top-[3px] flex justify-center items-center text-[12px] "
                    : "theme-icon-container w-[25px] h-[25px] bg-blue-600 text-white rounded-full absolute  left-0 -top-[3px] flex justify-center items-center text-[12px] "
                }
              >
                {theme == "dark" ? (
                  <i className="bi-moon-stars-fill"></i>
                ) : (
                  <i className="bi-brightness-low-fill"></i>
                )}
              </div>
            </button>
          </div>
        </div>
        <div className="w-[1000px] bg-blue-100 overflow-hidden rounded-md grid grid-cols-4 grid-rows-2 gap-1 dark:bg-gray-700  shadow-blue-300">
          {images &&
            images.map((image, index) => {
              return (
                <div
                  key={image.id}
                  id={image.id}
                  onClick={(e) => {
                    returnCard(index, image.id, image.name);
                  }}
                  className="card h-[220px] bg-green-900 dark:bg-gray-800 overflow-hidden"
                >
                  {image.view == true && (
                    <img
                      src={image.name}
                      alt={image.name}
                      className={`${image.view === false ? "hidden" : "block"}`}
                    />
                  )}
                </div>
              );
            })}
        </div>

        <div className="w-full flex justify-center space-x-4 !mt-8">
          <button
            onClick={() => {
              rotateAllCard();
              setTimeout(() => {
                let newRow = getRandom(ImagesRows);
                setImages([...newRow]);
                setOpenedCardKey("");
                setOpenedCardName("");
                setChance(15);
                setOpenedCards([]);
              }, 100);
            }}
            className="bg-teal-600 px-6 py-2 rounded-md text-gray-50"
          >
            Recommencer
          </button>
        </div>
      </div>
      <MeteoFooter />
    </>
  );
}

export default MemoryCard;
