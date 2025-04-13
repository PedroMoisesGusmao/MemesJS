"use client";

import { useState, useEffect, useRef, ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { GetMeme, PostMeme } from "../../api/types";
import memeService from "../../api/memeService";
import styles from "./MemeCarousel.module.css";

// { id: 1, url: "https://i.em.com.br/GI_TR00H45g-1JWYvHM1ASVg9gs=/1200x1200/smart/imgsapp.em.com.br/app/noticia_127983242361/2022/11/06/1417823/meme-de-internet_1_81924.jpg", text: "O PODER DOS MEMES ESTÁ COM VOCÊ" },
// { id: 2, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvKjQTyrWUfYik63PCjUAm9X9XAW6PkpyHLw&s", text: "Intuição ou trauma???" },
// { id: 3, url: "https://i.imgflip.com/85xkix.jpg", text: "SPRINGTRAP: NO CHILDREN!?" }

export default function MemeCarousel() {
  const [inputs, setInputs] = useState<string[]>([]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [memes, setMemes] = useState<GetMeme[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    async function fetchMemes() {
       const templates = await memeService.getTemplates();
       setMemes(templates);
    }
   
    fetchMemes();
   }, []);

  useEffect(() => {
    if (memes.length > 0) {
      const boxCount = memes[currentIndex]?.box_count || 0;
      setInputs(Array(boxCount).fill(""));
    }
  }, [currentIndex, memes]);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const nextMeme = () => setCurrentIndex((prev) => (prev + 1) % memes.length);
  const prevMeme = () => setCurrentIndex((prev) => (prev - 1 + memes.length) % memes.length);

  const downloadMeme = async () => {
    const link = document.createElement("a");

    const values = inputRefs.current.map((input) => input?.value || "");

    const meme: PostMeme = {
      id: memes[currentIndex].id,
      text: values
    }

    const memeResponse = await memeService.postMeme(meme);

    console.log(memeResponse)

    link.href = memeResponse.data.url;
    link.target = "_blank";
    link.click();
  };

  return (
    <body className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Memes generator</h2>
      </div>
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
                className={styles.meme}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={meme.url}
                  alt={meme.name}
                  width={meme.width}
                  height={meme.height}
                  className={styles.image}
                />
                <p className={styles.text}>{meme.name}</p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className={styles.input_list}>
        {inputs.map((value, index) => (
            <input
            key={index}
            type="text"
            className={styles.input}
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>

      <div className={styles.controls}>
        <button className={styles.button} onClick={prevMeme}><ArrowLeft /> Back</button>
        <button className={styles.download} onClick={downloadMeme}><Download /></button>
        <button className={styles.button} onClick={nextMeme}>Next <ArrowRight /></button>
      </div>
    </body>
  );
}
