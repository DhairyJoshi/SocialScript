# backend/generator.py

import lmstudio as lms

MODEL_ID = "nous-hermes-2-mistral-7b-dpo"

def generate_post_prompt(brand_values, campaign_message, target_audience, format_type, visual_style, color_palette, typography):
    return f"""
You are a senior marketing strategist and creative copywriter.

Generate a *single* content concept and marketing copy for the following format:
**Format Type**: {format_type}

**Campaign Core Message**: {campaign_message}

**Brand Values**: {", ".join(brand_values)}

**Target Audience**:
- Age: {target_audience['age']}
- Gender: {target_audience['gender']}
- Location: {target_audience['location']}
- Interests: {target_audience['interests']}
- Online Behavior: {target_audience['online_behavior']}

**Design Guidelines**:
- Visual Style: {visual_style}
- Color Palette: {color_palette}
- Typography: {typography}

Please provide the following, tailored *only* to the format type mentioned:
1. **Heading** – punchy marketing copy specific to the format
2. **Visual Layout Concept** – a visual idea suited to this format
3. **Suggested CTA** – one call-to-action
4. **Tone and Design Direction** – aligned with audience and brand values

Be concise, creative, and brand-aligned. Do not provide multiple format options — focus only on the specified format.
"""

def generate_with_sdk(prompt):
    try:
        print("Connecting to LM Studio via SDK...")
        model = lms.llm(MODEL_ID)
        response = model.respond(prompt)
        
        # Make sure you return just the generated text
        if isinstance(response, dict) and "content" in response:
            return response["content"]  # Adjust based on what SDK returns
        elif hasattr(response, "text"):
            return response.text
        else:
            return str(response)
        
    except Exception as e:
        print(f"SDK error: {e}")
        return None

def generate_advanced_post(brand_values, campaign_message, target_audience, format_type, visual_style, color_palette, typography):
    prompt = generate_post_prompt(brand_values, campaign_message, target_audience, format_type, visual_style, color_palette, typography)
    response = generate_with_sdk(prompt)
    return response