#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw

PUBLIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public")
os.makedirs(PUBLIC_DIR, exist_ok=True)

SVG_CONTENT = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="cloudBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a1026"/>
      <stop offset="100%" stop-color="#040714"/>
    </linearGradient>
    <linearGradient id="aws" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF9900"/>
      <stop offset="100%" stop-color="#E07A00"/>
    </linearGradient>
    <linearGradient id="azure" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0078D4"/>
      <stop offset="100%" stop-color="#005A9E"/>
    </linearGradient>
    <linearGradient id="gcp" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4285F4"/>
      <stop offset="100%" stop-color="#34A853"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="24" fill="url(#cloudBg)"/>
  <rect x="2" y="2" width="96" height="96" rx="22" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-opacity="0.3"/>
  <path d="M35 55 C30 55 25 50 25 44 C25 38 29 33 35 33 C37 26 44 22 52 22 C61 22 68 28 69 36 C75 37 80 42 80 48 C80 54 75 59 69 59 L35 59 Z" fill="#1e293b" opacity="0.6"/>
  <circle cx="38" cy="48" r="8" fill="url(#aws)"/>
  <circle cx="52" cy="42" r="9" fill="url(#azure)"/>
  <circle cx="65" cy="49" r="8" fill="url(#gcp)"/>
  <circle cx="52" cy="68" r="4" fill="#38BDF8"/>
</svg>'''

with open(os.path.join(PUBLIC_DIR, "favicon.svg"), "w", encoding="utf-8") as f:
    f.write(SVG_CONTENT)

def create_icon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    corner = int(size * 0.22)
    draw.rounded_rectangle([0, 0, size, size], radius=corner, fill=(10, 16, 38, 255))
    draw.rounded_rectangle([2, 2, size-2, size-2], radius=corner, outline=(56, 189, 248, 80), width=int(max(1, size*0.015)))
    
    # 3 Clouds / Nodes
    r = size * 0.14
    draw.ellipse([size*0.35-r, size*0.48-r, size*0.35+r, size*0.48+r], fill=(255, 153, 0, 220)) # AWS Orange
    draw.ellipse([size*0.50-r*1.1, size*0.40-r*1.1, size*0.50+r*1.1, size*0.40+r*1.1], fill=(0, 120, 212, 230)) # Azure Blue
    draw.ellipse([size*0.65-r, size*0.48-r, size*0.65+r, size*0.48+r], fill=(66, 133, 244, 220)) # GCP Blue
    
    # Center Tap Dot
    cr = size * 0.05
    draw.ellipse([size*0.5-cr, size*0.68-cr, size*0.5+cr, size*0.68+cr], fill=(56, 189, 248, 255))
    return img

create_icon(180).save(os.path.join(PUBLIC_DIR, "apple-touch-icon.png"), "PNG")
create_icon(192).save(os.path.join(PUBLIC_DIR, "icon-192.png"), "PNG")
create_icon(512).save(os.path.join(PUBLIC_DIR, "icon-512.png"), "PNG")
create_icon(32).save(os.path.join(PUBLIC_DIR, "favicon.ico"), format="ICO")

og = Image.new("RGBA", (1200, 630), (10, 16, 38, 255))
og_draw = ImageDraw.Draw(og)
for i in range(1200):
    og_draw.line([(i, 0), (i, 630)], fill=(0, 120, 212, int(25 * (1 - i/1200))))
og.paste(create_icon(240), (850, 195))
og.convert("RGB").save(os.path.join(PUBLIC_DIR, "og-image.png"), "PNG")
print("✓ Cloud assets generated")
