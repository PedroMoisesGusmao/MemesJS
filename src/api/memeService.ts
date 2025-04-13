import { GetMeme, PostMeme } from "./types";

interface GetResponse {
    success: boolean;
    data: {
      memes: GetMeme[];
    };
}

interface PostResponse {
    success: boolean;
    data: {
      url: string,
      page_url: string
    }
}

async function getTemplates(): Promise<GetMeme[]> {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const jsonResponse: GetResponse = await response.json()

    return jsonResponse.data.memes;
}

async function postMeme(meme: PostMeme): Promise<PostResponse> {
  const params: URLSearchParams = new URLSearchParams();

  params.append('template_id', meme.id);
  params.append('username', process.env.NEXT_PUBLIC_IMGFLIP_API_USERNAME!);
  params.append('password', process.env.NEXT_PUBLIC_IMGFLIP_API_PASSWORD!);
  
  meme.text.forEach((texto, index) => {
    params.append(`boxes[${index}][text]`, texto);
  });

  const response = await fetch("https://api.imgflip.com/caption_image", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  })

  const jsonResponse: PostResponse = await response.json();
  return jsonResponse;
}

export default { getTemplates, postMeme };