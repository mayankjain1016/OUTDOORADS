import os
import re
from PIL import Image, ImageStat

data_path = 'src/data/index.ts'
with open(data_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = 'export const GALLERY: GalleryItem[] = ['
end_marker = '];'
start_idx = content.find(start_marker)
end_idx = content.find(end_marker, start_idx)

gallery_content = content[start_idx + len(start_marker):end_idx]
lines = gallery_content.strip('\n').split('\n')

image_regex = re.compile(r'imageUrl:\s*"([^"]+)"')
category_regex = re.compile(r'industryName:\s*"([^"]+)"')

results = []
for line in lines:
    if not line.strip(): continue
    img_match = image_regex.search(line)
    if img_match:
        image_url = img_match.group(1)
        local_path = os.path.join('public', image_url.lstrip('/'))
        try:
            img = Image.open(local_path).convert('L')
            stat = ImageStat.Stat(img)
            avg = stat.mean[0]
            results.append((avg, image_url))
        except Exception as e:
            pass

results.sort(key=lambda x: x[0])
print("Darkest images:")
for avg, url in results[:10]:
    print(f"{avg:.2f}: {url}")

print("\nBrightest images:")
for avg, url in results[-10:]:
    print(f"{avg:.2f}: {url}")
