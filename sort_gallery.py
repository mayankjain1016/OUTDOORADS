import os
import re
from PIL import Image, ImageStat
from collections import defaultdict

data_path = 'src/data/index.ts'
with open(data_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = 'export const GALLERY: GalleryItem[] = ['
end_marker = '];'
start_idx = content.find(start_marker)
end_idx = content.find(end_marker, start_idx)

gallery_content = content[start_idx + len(start_marker):end_idx]
lines = [l for l in gallery_content.split('\n') if l.strip()]

image_regex = re.compile(r'imageUrl:\s*"([^"]+)"')
category_regex = re.compile(r'industryName:\s*"([^"]+)"')

categories = defaultdict(list)
misc = []

for idx, line in enumerate(lines):
    img_match = image_regex.search(line)
    cat_match = category_regex.search(line)
    
    if img_match and cat_match:
        image_url = img_match.group(1)
        category = cat_match.group(1)
        
        local_path = os.path.join('public', image_url.lstrip('/'))
        
        is_night = False
        try:
            img = Image.open(local_path).convert('L')
            stat = ImageStat.Stat(img)
            avg = stat.mean[0]
            # Use 70 as a safe threshold for night images
            is_night = avg < 70
        except Exception as e:
            pass
            
        categories[category].append({
            'line': line,
            'is_night': is_night,
            'original_idx': idx
        })
    else:
        misc.append(line)

new_lines = []
# Sort categories to keep order of categories consistent if needed, but we can just use the order they were inserted.
# To keep original category order, we process categories in the order they first appeared.
for cat in categories.keys():
    items = categories[cat]
    # We want night first (True), then day (False).
    # Since we want a stable sort, we sort by a tuple: (not is_night, original_idx)
    # This means is_night=True becomes 0, so it comes first.
    # Within the same is_night bucket, original_idx preserves the original relative order.
    sorted_items = sorted(items, key=lambda x: (not x['is_night'], x['original_idx']))
    for item in sorted_items:
        new_lines.append(item['line'])

new_gallery_content = '\n' + '\n'.join(new_lines) + '\n'

new_content = content[:start_idx + len(start_marker)] + new_gallery_content + content[end_idx:]

with open(data_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Images sorted by day/night per category!")
