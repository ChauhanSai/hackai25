import webbrowser
from diffusers import DiffusionPipeline
import ollama
import os
import uuid
import clipboard
import pyautogui
import time
import shutil

prompts = {
    "top": "Analyze the image and describe only the shirt or top worn in as much detail as possible. Focus on the following attributes: -Type (e.g., t-shirt, blouse, hoodie, crop top, button-down shirt, tank top) -Color(s) (including patterns or gradients) -Material or texture (e.g., cotton, denim, satin, ribbed, mesh) -Fit (e.g., loose, oversized, slim-fit, cropped) -Style details (e.g., graphic print, logos, embroidery, neckline shape, sleeves type, buttons, collar) -Pattern (e.g., plaid, floral, striped, solid). Ignore other garments like pants, jackets, or accessories. ",
    "bottom": "Analyze the image and describe only the pants or bottom worn in as much detail as possible. Focus on the following attributes: Type (e.g., jeans, trousers, joggers, shorts, cargo pants, leggings, skirt, culottes). -Color(s) (including patterns or gradients). -Material or texture (e.g., denim, leather, cotton, linen, satin, corduroy). -Fit (e.g., skinny, relaxed, high-waisted, flared, wide-leg, tapered). -Style details (e.g., pockets, zippers, pleats, drawstrings, slits, distressed areas). -Pattern (e.g., solid, camo, plaid, floral, striped) Ignore other garments like shirts, jackets, or accessories. ",
    "shoes": "Analyze the image and describe only the shoes they are wearing in as much detail as possible. Focus on the following attributes: -Type (e.g., sneakers, boots, loafers, heels, sandals, flats, dress shoes) -Color(s) (including accents, soles, laces, or patterns) -Material or texture (e.g., leather, suede, canvas, mesh, patent, knit) -Style details (e.g., platform, high-top, open-toe, lace-up, slip-on, buckle, logo placement) -Condition or finish (e.g., clean, distressed, glossy, matte, worn) -Pattern (e.g., solid, color-blocked, patterned, camo). Ignore other garments like pants, tops, or accessories. ",
    "outerwear": "Analyze the image and describe only the jacket or top outerwear they are wearing in as much detail as possible. Focus on the following attributes: -Type (e.g., denim jacket, blazer, puffer coat, bomber, trench coat, windbreaker, cardigan, parka) -Material or texture (e.g., leather, suede, wool, nylon, fleece, corduroy)- Fit (e.g., cropped, oversized, tailored, boxy, relaxed) -Style details (e.g., zippers, buttons, lapels, hoods, collars, drawstrings, embellishments) -Pattern (e.g., plaid, camo, color-blocked, solid). Ignore all other clothing such as shirts, pants, shoes, and accessories. "
}

def clean():
    if os.path.exists("outfits"):
        for folder in os.listdir("outfits"):
            if os.path.isdir("outfits/" + folder):
                if len(os.listdir("outfits/" + folder)) == 0:
                    os.removedirs("outfits/" + folder)

        with pyautogui.hold('command'):
            pyautogui.press('w')

def textToImage(outfit):
    pipe = DiffusionPipeline.from_pretrained("stable-diffusion-v1-5/stable-diffusion-v1-5")
    pipe = pipe.to("mps")
    thisUUID = uuid.uuid4()
    os.makedirs("outfits/" + str(thisUUID), exist_ok=True)

    # Recommended if your computer has < 64 GB of RAM
    pipe.enable_attention_slicing()

    for key, value in outfit.items():
        print(f'Generating {key}')
        prompt = f'A realistic flat-lay image of a {key} clothing garment on a white background. Features: {value} '
        image = pipe(prompt).images[0]
        image.save("outfits/" + str(thisUUID) + "/" + key + ".png")

def copilotDesigner(outfit):
    thisUUID = uuid.uuid4()
    os.makedirs("outfits/" + str(thisUUID), exist_ok=True)

    webbrowser.open("https://m365.cloud.microsoft/chat")

    # Get the screen width and height
    screen_width, screen_height = pyautogui.size()

    time.sleep(7.5)

    for key, value in outfit.items():
        clipboard.copy(f'A realistic spread-out on the floor type, flat-lay image of a {key} clothing garment on a white background. Does not need to be in complete sentences, a detailed non-grammatical description is enough. Features: {value} ')
        # Move the mouse to the calculated position and click
        pyautogui.moveTo(screen_width // 2, screen_height - 150)
        pyautogui.click()
        time.sleep(0.5)
        with pyautogui.hold('command'):
            pyautogui.press('v')
        time.sleep(0.5)
        pyautogui.press('enter')
        time.sleep(30)

        pyautogui.moveTo(screen_width // 2 - 150, screen_height // 2)
        pyautogui.rightClick()
        time.sleep(0.5)
        pyautogui.moveTo(screen_width // 2 - 150 + 100, screen_height // 2 + 60)
        pyautogui.click()
        time.sleep(1)

        try:
            source_file = os.getcwd()[:os.getcwd().find("Desktop")] + "Downloads/Unknown.png"
            destination_file = os.path.join("backend/outfits/" + str(thisUUID) + "/" + key + ".png")

            shutil.move(source_file, destination_file)

            print(f"File copied to {destination_file}")
        except FileNotFoundError:
            print(f"File not found")
        time.sleep(2)

    shutil.move("backend/upload.jpg", "backend/outfits/" + str(thisUUID) + "/upload.jpg")
    clean()

def imagetoText(type, image = "user.jpeg"):
    print(f'Analzying {type} {os.getcwd()}/{image}')
    prompt = prompts[type]

    response = ""
    stream = ollama.chat(
        model='llama3.2-vision',
        messages=[{
            'role': 'user',
            'content': "Do not describe or reference any person, body parts, background, or surroundings. Only focus on the specific garment shown. Be concise but descriptive, and use fashion-relevant vocabulary." + prompt,
            'images': [os.getcwd() + '/' + image]
        }],
        stream=True
    )

    for chunk in stream:
        response += chunk['message']['content']
        print(chunk['message']['content'], end='', flush=True)

    print()

    return response

if __name__ == '__main__':
    outfit = {
        "top": imagetoText("top", "upload.jpg"),
        "bottom": imagetoText("bottom", "upload.jpg")
        # "shoes": imagetoText("shoes")
        # "outerwear": imagetoText("outerwear")
    }

    print(outfit)

    copilotDesigner(outfit)

    # textToImage(outfit)

