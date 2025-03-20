import { Meme } from "./types";

interface ApiResponse {
    success: boolean;
    data: {
      memes: Meme[];
    };
  }

async function getTemplates(): Promise<Meme[]> {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const jsonResponse: ApiResponse = await response.json()

    return jsonResponse.data.memes;
}

export default getTemplates;