import google.generativeai as genai
from PIL import Image

# Configure the API key
genai.configure(api_key="AIzaSyBI170vlVKhHS7SGmngHi-neBAH2g3ccs4")

def describe_image(image_path):
    try:
        # Open the image
        image = Image.open(image_path)

        # Use the generative AI model to describe the image
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(
            [image, "Tell me to which category does this image belong - Cleaning,Medical_Assistance,Staff Behaviour or unknown.Just give one word answer."],
        )

        return response.text
    except Exception as e:
        print("Error in describe_image:", e)
        raise