"""
Generate the site's icons and share images from public/logo.png.

Run from the repo root:  python scripts/generate_brand_assets.py
Needs Pillow and numpy. Outputs go to public/ (and src/app/ for the App Router icons).

- favicon.ico (16, 32, 48 px), icon.png (32), apple-touch-icon.png (180),
  icon-192.png and icon-512.png (maskable-safe): the "DD" mark only, because the
  full logo's wording is unreadable at small sizes.
- logo-512.png: the full logo for structured data (Organization.logo).
- og-image.png: the 1200 x 630 default share image.
- og/blog/<slug>.jpg: 1200 x 630 share images for each blog post, cropped from
  its cover (social apps handle JPG more reliably than WebP).
"""

import os
import re

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, 'public')
APP = os.path.join(ROOT, 'src', 'app')

NAVY = (11, 15, 26)
NAVY_2 = (15, 33, 66)
TEAL = (0, 212, 170)
WHITE = (255, 255, 255)
MUTED = (190, 200, 216)

FONT_DIR = 'C:/Windows/Fonts'


def font(name, size):
    for candidate in (name, 'arial.ttf'):
        path = os.path.join(FONT_DIR, candidate)
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def load_logo():
    return Image.open(os.path.join(PUBLIC, 'logo.png')).convert('RGBA')


def ink_bbox(img, y_from=0, y_to=None):
    """Bounding box of visible, non-white pixels within a band of rows."""
    a = np.asarray(img).astype(int)
    y_to = a.shape[0] if y_to is None else y_to
    band = a[y_from:y_to]
    ink = (band[..., 3] > 128) & ((band[..., 0] < 200) | (band[..., 1] < 200) | (band[..., 2] < 200))
    ys = np.where(ink.any(axis=1))[0]
    xs = np.where(ink.any(axis=0))[0]
    return xs.min(), y_from + ys.min(), xs.max() + 1, y_from + ys.max() + 1


def dd_mark(logo):
    """The "DD" symbol above the wordmark, on a transparent background."""
    a = np.asarray(logo).astype(int)
    ink = (a[..., 3] > 128) & ((a[..., 0] < 200) | (a[..., 1] < 200) | (a[..., 2] < 200))
    rows = ink.any(axis=1)
    top = int(np.argmax(rows))
    # the mark ends at the first run of 20+ empty rows below it (gap before the wordmark)
    y, empty = top, 0
    while y < len(rows):
        empty = empty + 1 if not rows[y] else 0
        if empty >= 20:
            break
        y += 1
    box = ink_bbox(logo, top, y - empty + 1)
    mark = logo.crop(box)
    # make the near-white background transparent so it sits on any colour
    m = np.asarray(mark).copy()
    whiteish = (m[..., 0] > 235) & (m[..., 1] > 235) & (m[..., 2] > 235)
    m[whiteish, 3] = 0
    return Image.fromarray(m.astype('uint8'), 'RGBA')


def square_icon(mark, size, padding_ratio, background=WHITE, radius_ratio=0.0):
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    bg = Image.new('RGBA', (size, size), background + (255,))
    mask = Image.new('L', (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, size - 1, size - 1], radius=int(size * radius_ratio), fill=255)
    canvas.paste(bg, (0, 0), mask)
    inner = int(size * (1 - 2 * padding_ratio))
    m = mark.copy()
    m.thumbnail((inner, inner), Image.LANCZOS)
    canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return canvas


def save_png(img, path, colors=None):
    if colors:
        img = img.quantize(colors=colors, method=Image.FASTOCTREE, dither=Image.NONE).convert('RGBA')
    img.save(path, optimize=True)
    print('wrote', os.path.relpath(path, ROOT), os.path.getsize(path) // 1024, 'KB')


def make_icons(logo):
    mark = dd_mark(logo)
    # Browser tab icons: rounded white tile, small padding so the mark stays legible
    ico_sizes = [16, 32, 48]
    base = square_icon(mark, 256, 0.10, radius_ratio=0.22)
    base.save(os.path.join(PUBLIC, 'favicon.ico'), sizes=[(s, s) for s in ico_sizes])
    base.save(os.path.join(APP, 'favicon.ico'), sizes=[(s, s) for s in ico_sizes])
    print('wrote public/favicon.ico and src/app/favicon.ico', ico_sizes)
    for path in (os.path.join(PUBLIC, 'icon.png'), os.path.join(APP, 'icon.png')):
        save_png(square_icon(mark, 32, 0.08, radius_ratio=0.22), path)
    # Apple and Android: full-bleed white square (the OS applies its own mask),
    # mark inside the central safe zone
    for path in (os.path.join(PUBLIC, 'apple-touch-icon.png'), os.path.join(APP, 'apple-icon.png')):
        save_png(square_icon(mark, 180, 0.16), path, colors=128)
    save_png(square_icon(mark, 192, 0.20), os.path.join(PUBLIC, 'icon-192.png'), colors=128)
    save_png(square_icon(mark, 512, 0.20), os.path.join(PUBLIC, 'icon-512.png'), colors=128)
    return mark


def make_logo_512(logo):
    img = logo.copy()
    img.thumbnail((512, 512), Image.LANCZOS)
    canvas = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    canvas.alpha_composite(img, ((512 - img.width) // 2, (512 - img.height) // 2))
    save_png(canvas, os.path.join(PUBLIC, 'logo-512.png'), colors=200)


def gradient(size, top, bottom):
    w, h = size
    col = np.linspace(0, 1, h)[:, None, None]
    arr = (np.array(top)[None, None, :] * (1 - col) + np.array(bottom)[None, None, :] * col)
    arr = np.repeat(arr, w, axis=1)
    return Image.fromarray(arr.astype('uint8'), 'RGB')


def make_site_og(mark):
    W, H = 1200, 630
    img = gradient((W, H), NAVY, NAVY_2).convert('RGBA')
    draw = ImageDraw.Draw(img)
    # soft accent glow
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse([720, -300, 1420, 340], fill=(0, 102, 255, 70))
    img.alpha_composite(glow.filter(ImageFilter.GaussianBlur(90)))
    draw = ImageDraw.Draw(img)
    # mark on a white rounded tile
    tile = square_icon(mark, 300, 0.14, radius_ratio=0.18)
    img.alpha_composite(tile, (90, (H - 300) // 2 - 20))
    x = 450
    draw.text((x, 150), 'DeepDivers', font=font('segoeuib.ttf', 92), fill=WHITE)
    draw.text((x, 270), 'Data analysis, academic editing', font=font('segoeui.ttf', 40), fill=MUTED)
    draw.text((x, 322), 'and research support', font=font('segoeui.ttf', 40), fill=MUTED)
    draw.text((x, 392), 'For students and researchers worldwide', font=font('seguisb.ttf', 32), fill=TEAL)
    rule = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(rule).line([(x, 470), (W - 90, 470)], fill=(255, 255, 255, 60), width=2)
    img.alpha_composite(rule)
    draw = ImageDraw.Draw(img)
    draw.text((x, 492), 'deepdivers.services  ·  teamdeepdivers@gmail.com', font=font('segoeui.ttf', 28), fill=WHITE)
    path = os.path.join(PUBLIC, 'og-image.png')
    img.convert('RGB').save(path, optimize=True)
    print('wrote', os.path.relpath(path, ROOT), os.path.getsize(path) // 1024, 'KB')


def make_blog_og():
    src = open(os.path.join(ROOT, 'src', 'data', 'blog.ts'), encoding='utf-8').read()
    pairs = re.findall(r"slug:\s*'([^']+)'.*?coverImage:\s*'([^']+)'", src, flags=re.S)
    out_dir = os.path.join(PUBLIC, 'og', 'blog')
    os.makedirs(out_dir, exist_ok=True)
    for slug, cover in pairs:
        path = os.path.join(PUBLIC, cover.lstrip('/'))
        if not os.path.exists(path):
            print('missing cover for', slug)
            continue
        im = Image.open(path).convert('RGB')
        # centre-crop to 1200 x 630 (1.905:1)
        target = 1200 / 630
        w, h = im.size
        if w / h > target:
            nw = int(h * target)
            box = ((w - nw) // 2, 0, (w - nw) // 2 + nw, h)
        else:
            nh = int(w / target)
            box = (0, (h - nh) // 2, w, (h - nh) // 2 + nh)
        im = im.crop(box).resize((1200, 630), Image.LANCZOS)
        out = os.path.join(out_dir, f'{slug}.jpg')
        im.save(out, quality=82, optimize=True, progressive=True)
        print('wrote', os.path.relpath(out, ROOT), os.path.getsize(out) // 1024, 'KB')


if __name__ == '__main__':
    logo = load_logo()
    mark = make_icons(logo)
    make_logo_512(logo)
    make_site_og(mark)
    make_blog_og()
