#!/usr/bin/env python3
"""Normalize generated images to web-friendly sizes/quality."""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "public", "images")


def cover(im, w, h, q=82):
    tw, th = w, h
    s = max(tw / im.width, th / im.height)
    im = im.resize((int(im.width * s + 0.5), int(im.height * s + 0.5)), Image.LANCZOS)
    l = (im.width - tw) // 2
    t = (im.height - th) // 2
    im = im.crop((l, t, l + tw, t + th)).convert("RGB")
    return im.save(os.path.join(IMG, im.filename if hasattr(im, "filename") else ""), quality=q) if False else im


def save(im, name, q=82):
    im.convert("RGB").save(os.path.join(IMG, name), quality=q, optimize=True)


def main():
    # hero background -> 1920x1080
    im = Image.open(os.path.join(IMG, "hero-bg.jpg"))
    save(cover(im, 1920, 1080), "hero-bg.jpg", 80)
    # OG image -> 1200x630
    im = Image.open(os.path.join(IMG, "og-image.jpg"))
    save(cover(im, 1200, 630), "og-image.jpg", 84)
    # cards / about -> max 1120 wide
    for name in ["about.jpg", "svc-beat-sync.jpg", "svc-lobby.jpg", "svc-montage.jpg",
                 "svc-shorts.jpg", "svc-pro.jpg", "svc-custom.jpg"]:
        p = os.path.join(IMG, name)
        im = Image.open(p)
        if im.width > 1120:
            im = im.resize((1120, int(im.height * 1120 / im.width)), Image.LANCZOS)
        save(im, name, 80)
    for f in sorted(os.listdir(IMG)):
        print(f, round(os.path.getsize(os.path.join(IMG, f)) / 1024), "KB")


if __name__ == "__main__":
    main()
