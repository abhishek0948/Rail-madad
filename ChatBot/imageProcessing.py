import google.generativeai as genai
import PIL.Image


genai.configure(api_key="AIzaSyBI170vlVKhHS7SGmngHi-neBAH2g3ccs4")  

def describe_image(image_path):
    image = PIL.Image.open(image_path)

    model = genai.GenerativeModel("gemini-1.5-flash")

    response = model.generate_content(
        [image, "Describe this image in detail."]
    )

    return response.text

# Path of uploaded image
image_path = 

# Generate and print the description
description = describe_image(image_path)
print("\nGenerated Description:\n", description)