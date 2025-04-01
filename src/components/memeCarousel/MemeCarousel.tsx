"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { Meme } from "../../api/types";
import getTemplates from "../../api/memeService";
import styles from "./MemeCarousel.module.css";

// { id: 1, url: "https://i.em.com.br/GI_TR00H45g-1JWYvHM1ASVg9gs=/1200x1200/smart/imgsapp.em.com.br/app/noticia_127983242361/2022/11/06/1417823/meme-de-internet_1_81924.jpg", text: "O PODER DOS MEMES ESTÁ COM VOCÊ" },
// { id: 2, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvKjQTyrWUfYik63PCjUAm9X9XAW6PkpyHLw&s", text: "Intuição ou trauma???" },
// { id: 3, url: "https://i.imgflip.com/85xkix.jpg", text: "SPRINGTRAP: NO CHILDREN!?" }

export default function MemeCarousel() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [inputs, setInputs] = useState<string[]>([])

  useEffect(() => {
    if (memes.length > 0) {
      setInputs(Array(memes[currentIndex].box_count).fill(""));
    }
  }, [currentIndex, memes]);
  
  useEffect(() => {
    async function fetchMemes() {
       const templates = await getTemplates();
       setMemes(templates);
    }
   
    fetchMemes();
   }, [])

  const nextMeme = () => setCurrentIndex((prev) => (prev + 1) % memes.length);
  const prevMeme = () => setCurrentIndex((prev) => (prev - 1 + memes.length) % memes.length);
  
  const downloadMeme = () => {
    const link = document.createElement("a");
    link.href = memes[currentIndex].url;
    link.download = "meme.png";
    link.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Memes generator</div>
      <div className={styles.carousel}>
        <AnimatePresence>
          {memes.map((meme, index) => {
            // Define a posição correta dos memes (Stories)
            let position = "hidden";
            let isCurrent = "invisible";
            if (index === currentIndex) position = "center";
            else if (index === (currentIndex - 1 + memes.length) % memes.length) position = "left";
            else if (index === (currentIndex + 1) % memes.length) position = "right";
            if (index === currentIndex) isCurrent = "input";
            if (position === "hidden") return null; // Oculta memes que não fazem parte do layout

            return (
              <motion.div
                key={meme.id}
                className={`${styles.meme} ${styles[position]}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <img src={meme.url} alt="Meme" className={styles.image} />
                <p className={styles.text}>{meme.name}</p>

                {inputs.map((input) => {
                  if (index == currentIndex){
                    return (
                        <input
                        key={inputs.indexOf(input)}
                        type="text"
                        className={styles.input}
                        />
                    )}
                })}

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <div className={styles.controls}>
        <button className={styles.button} onClick={prevMeme}><ArrowLeft /> Back</button>
        <button className={styles.download} onClick={downloadMeme}><Download /></button>
        <button className={styles.button} onClick={nextMeme}>Next <ArrowRight /></button>
      </div>
    </div>
  );
}
