import google.generativeai as genai
from PIL import Image
import requests
from io import BytesIO

# Configure the API key
genai.configure(api_key="AIzaSyBI170vlVKhHS7SGmngHi-neBAH2g3ccs4")

def describe_image(image_url):
    try:
        # Fetch the image from the Cloudinary URL
        response = requests.get(image_url)
        response.raise_for_status()  # Raise an error for bad responses
        image = Image.open(BytesIO(response.content))

        # Use the generative AI model to describe the image
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(
            [image, """
            Analyze this railway-related image and provide a very short description of the image , Directly give description without any additional text or explanation.
            """],
        )

        return response.text
    except Exception as e:
        print("Error in describe_image:", e)
        raise