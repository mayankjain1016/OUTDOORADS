import sys
import os

try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

def remove_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        # The text 'AD' is dark gray, so we keep the threshold very low
        if item[0] < 15 and item[1] < 15 and item[2] < 15:
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

remove_bg("d:/Affobe/OutDoorAds/public/LOGO.jpeg", "d:/Affobe/OutDoorAds/public/LOGO.png")
