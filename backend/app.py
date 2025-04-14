# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from textgenerator import generate_advanced_post
from imagegen import generate_image
import re
import uuid
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/generate-post', methods=['POST'])
def generate_post():
    try:
        data = request.get_json()
        
        brand_values = data.get('brand_values', [])
        campaign_message = data.get('campaign_message', '')
        target_audience = data.get('target_audience', {})
        format_type = data.get('format_type', '')
        visual_style = data.get('visual_style', '')
        color_palette = data.get('color_palette', '')
        typography = data.get('typography', '')

        print("Received generation request!")

        # Step 1: Generate text
        generated_post = generate_advanced_post(
            brand_values,
            campaign_message,
            target_audience,
            format_type,
            visual_style,
            color_palette,
            typography
        )

        if not generated_post:
            return jsonify({'error': 'Failed to generate post'}), 500
        
        # Step 2: Extract Visual Layout Concept
        visual_prompt = extract_visual_layout(generated_post)
        
        # Step 3: Generate Image
        image_url = None
        img_path = None
        if visual_prompt:
            # Create a unique filename
            unique_filename = f"banner_{uuid.uuid4().hex[:8]}.jpeg"
            image_path = generate_image(visual_prompt, unique_filename)
            if image_path:
                # Public URL to access the image
                image_url = f"http://localhost:8000/static/{unique_filename}"
                img_path = image_path  # server-side path (optional)
        
        # Step 4: Return JSON
        return jsonify({
            'post': generated_post,
            'visual_layout_prompt': visual_prompt,
            'image_url': image_url,   # public URL
            'img_path': img_path      # local server path
        })

    except Exception as e:
        print(f"Exception in /generate-post: {e}")
        return jsonify({'error': str(e)}), 500


def extract_visual_layout(text):
    """
    Extract 'Visual Layout Concept' section from generated text using regex.
    """
    match = re.search(r"Visual Layout Concept\s*[:\-]\s*(.+)", text, re.IGNORECASE)
    if match:
        concept = match.group(1).strip()
        print(f"Extracted Visual Layout Concept: {concept}")
        return concept
    else:
        print("No Visual Layout Concept found.")
        return None

if __name__ == '__main__':
    # Make sure static folder is served automatically
    if not os.path.exists('static'):
        os.makedirs('static')

    app.run(port=8000, debug=True)