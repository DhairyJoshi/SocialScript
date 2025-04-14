# backend/imagegen.py

import requests
import os

STABILITY_API_KEY = "Your-api-key"

def generate_image(prompt, filename):
    try:
        output_path = os.path.join("static", filename)  # Save inside /static/
        
        response = requests.post(
            "https://api.stability.ai/v2beta/stable-image/generate/sd3",
            headers={
                "authorization": f"Bearer {STABILITY_API_KEY}",
                "accept": "image/*"
            },
            files={"none": ''},
            data={
                "prompt": prompt,
                "output_format": "jpeg",
            },
        )

        if response.status_code == 200:
            with open(output_path, 'wb') as file:
                file.write(response.content)
            print(f"Image saved successfully at {output_path}")
            return output_path
        else:
            print(f"Image generation failed: {response.status_code} {response.text}")
            return None

    except Exception as e:
        print(f"Error in image generation: {e}")
        return None