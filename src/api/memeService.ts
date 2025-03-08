require("dotenv").config();

const username: string = process.env.IMGFLIP_API_USERNAME!;
const password: string = process.env.IMGFLIP_API_PASSWORD!;

function makeMeme(templateId: string, text0: string, text1: string) {
    const params = new URLSearchParams({
        "template_id": templateId,
        "username": username,
        "password": password,
        "text0": text0,
        "text1" : text1
    });
    fetch("https://api.imgflip.com/caption_image", {
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: params
    })
    .then((data) => data.json())
    .then((response) => response)
}

export default makeMeme;