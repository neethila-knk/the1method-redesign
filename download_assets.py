import re
import urllib.request
import html
import os

with open('stitch_homepage.html', 'r', encoding='utf-8') as f:
    raw_content = f.read()

# Unescape HTML entities like &quot;
content = html.unescape(raw_content)

urls = re.findall(r'https://lh3\.googleusercontent\.com/[^\s"\'<>)]+', content)

print(f"Found {len(urls)} URLs after unescaping")

mapping = [
    ("hero-bg.jpg", 0),
    ("trust-accreditation.png", 1),
    ("trust-rehab.png", 2),
    ("trust-medical.png", 3),
    ("trust-spiritual.png", 4),
    ("founder-osie.jpg", 5),
    ("transformation-path.jpg", 6),
    ("course-spiritual-medicine.jpg", 7),
    ("course-rehabilitation.jpg", 8),
    ("course-consciousness.jpg", 9),
    ("lecture-spine.jpg", 10),
    ("lecture-mapping.jpg", 11),
    ("lecture-retreat.jpg", 12),
    ("private-healing.jpg", 13),
    ("avatar-dr-julian.jpg", 14),
    ("avatar-elena.jpg", 15),
    ("article-somatic-resonance.jpg", 16),
    ("article-aristotle.jpg", 17),
    ("article-visionary-states.jpg", 18),
]

os.makedirs("assets/images", exist_ok=True)
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for filename, idx in mapping:
    if idx >= len(urls):
        continue
    url = urls[idx]
    filepath = os.path.join("assets/images", filename)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Successfully downloaded {filename}")
    except Exception as e:
        print(f"Failed {filename}: {e}")
