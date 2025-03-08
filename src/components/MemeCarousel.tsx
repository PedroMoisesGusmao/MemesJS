import { useState } from "react";
import { motion } from "framer-motion";
// import { Button } from "@/components/button";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";

const memes = [
  { id: 1, url: "https://via.placeholder.com/300", text: "O PODER DOS MEMES ESTÁ COM VOCÊ" },
  { id: 2, url: "https://via.placeholder.com/300", text: "Intuição ou trauma???" },
  { id: 3, url: "https://via.placeholder.com/300", text: "SPRINGTRAP: NO CHILDREN!?" }
];

export default function MemeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMeme = () => setCurrentIndex((prev) => (prev + 1) % memes.length);
  const prevMeme = () => setCurrentIndex((prev) => (prev - 1 + memes.length) % memes.length);
  const downloadMeme = () => {
    const link = document.createElement("a");
    link.href = memes[currentIndex].url;
    link.download = "meme.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-4 bg-gray-900 rounded-lg shadow-lg relative">
        <motion.img
          key={memes[currentIndex].id}
          src={memes[currentIndex].url}
          alt="Meme"
          className="w-full h-auto rounded-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        />
        <p className="text-center mt-2">{memes[currentIndex].text}</p>
      </div>
      <div className="flex gap-4 mt-4">
        <Button onClick={prevMeme} variant="outline">
          <ArrowLeft /> Back
        </Button>
        <Button onClick={downloadMeme} variant="outline">
          <Download />
        </Button>
        <Button onClick={nextMeme}>
          Next <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
