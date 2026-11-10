#!/usr/bin/env python3
"""
BAADSHAH EDITZ — procedural preview-video generator.
Renders 6 stylized "Free Fire edit" preview clips (beat sync, montage, lobby,
shorts, pro, custom) with numpy + PIL and encodes them to H.264 with ffmpeg.
No external assets are downloaded; everything is generated locally.
"""
import os
import math
import wave
import subprocess

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VID_OUT = os.path.join(ROOT, "public", "videos")
IMG_OUT = os.path.join(ROOT, "public", "images")
os.makedirs(VID_OUT, exist_ok=True)
os.makedirs(IMG_OUT, exist_ok=True)

W, H, FPS, DUR = 1280, 720, 24, 8.0
N = int(FPS * DUR)
SR = 44100

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

ORANGE = (255, 122, 26)
RED = (255, 45, 70)
PURPLE = (168, 85, 247)
WHITE = (245, 243, 240)

# ---------------------------------------------------------------- audio ----
def make_beat_wav(path, dur=DUR):
    n = int(SR * dur)
    t = np.arange(n) / SR
    audio = np.zeros(n, dtype=np.float64)
    beat = 0.5
    rng = np.random.default_rng(7)
    # kick drum on every beat
    for k in np.arange(0, dur, beat):
        i0 = int(k * SR)
        d = min(int(0.18 * SR), n - i0)
        if d <= 0:
            continue
        tt = np.arange(d) / SR
        f = 160 - 110 * (tt / 0.18)
        audio[i0:i0 + d] += np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 22) * 0.9
    # hi-hats off-beat
    for k in np.arange(0.25, dur, beat / 2):
        i0 = int(k * SR)
        d = min(int(0.05 * SR), n - i0)
        if d <= 0:
            continue
        noise = rng.normal(0, 1, d)
        env = np.exp(-np.arange(d) / (0.012 * SR))
        audio[i0:i0 + d] += noise * env * 0.22
    # bass line
    notes = [55, 55, 65.41, 55, 55, 82.41, 65.41, 49]
    for i, f in enumerate(notes):
        i0 = int(i * 1.0 * SR)
        d = min(int(0.9 * SR), n - i0)
        if d <= 0:
            continue
        tt = np.arange(d) / SR
        audio[i0:i0 + d] += np.sin(2 * np.pi * f * tt) * np.exp(-tt * 3) * 0.35
    audio = audio / (np.max(np.abs(audio)) + 1e-9) * 0.85
    stereo = np.stack([audio, audio * 0.97], axis=1)
    pcm = (stereo * 32767).astype(np.int16)
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())

# ------------------------------------------------------------- helpers -----
_x = (np.arange(W) - W / 2) / (W / 2)
_y = (np.arange(H) - H / 2) / (H / 2)
_r = np.sqrt(_x[None, :] ** 2 + _y[:, None] ** 2).astype(np.float32)
VIGN = (1 - 0.62 * np.clip(_r - 0.5, 0, None) ** 2).astype(np.float32)[..., None]
SCAN = np.ones((H, 1), dtype=np.float32)
SCAN[::3] = 0.94


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def beat_env(t):
    p = (t % 0.5) / 0.5
    return math.exp(-p * 5.5)


def base_bg(t, glow_c=ORANGE, glow_scale=1.0):
    y = np.linspace(0, 1, H).astype(np.float32)[:, None, None]
    top = np.array([4, 3, 9], np.float32)
    bottom = np.array([34, 7, 54], np.float32)
    img = top * (1 - y) + bottom * y
    img = np.broadcast_to(img, (H, W, 3)).astype(np.float32).copy()
    gx = W * (0.5 + 0.35 * math.sin(t * 0.7))
    gy = H * (0.78 + 0.10 * math.sin(t * 1.3))
    xs = np.arange(W, dtype=np.float32)[None, :, None]
    ys = np.arange(H, dtype=np.float32)[:, None, None]
    d2 = (xs - gx) ** 2 + (ys - gy) ** 2  # (H, W, 1)
    g = np.exp(-d2 / (2 * (260.0 * glow_scale) ** 2))  # (H, W, 1)
    col = np.array(glow_c, np.float32)
    img += g * col[None, None, :] * 0.38
    return img


class Particles:
    def __init__(self, n=55, seed=3):
        rng = np.random.default_rng(seed)
        self.n = n
        self.x = rng.uniform(0, W, n)
        self.y = rng.uniform(0, H, n)
        self.vx = rng.uniform(-14, 14, n)
        self.vy = rng.uniform(-32, -8, n)
        self.s = rng.uniform(1.5, 4.2, n)
        self.cols = [ORANGE, (255, 190, 90), RED, PURPLE]
        self.col = rng.integers(0, 4, n)
        self.ph = rng.uniform(0, 6.28, n)

    def update(self, dt):
        self.x += self.vx * dt
        self.y += self.vy * dt
        m = (self.y < -12) | (self.x < -12) | (self.x > W + 12)
        if m.any():
            self.y[m] = H + 10
            self.x[m] = np.random.uniform(0, W, int(m.sum()))

    def draw(self, layer, t):
        d = ImageDraw.Draw(layer)
        for i in range(self.n):
            tw = 0.5 + 0.5 * math.sin(t * 3 + self.ph[i])
            c = self.cols[self.col[i]]
            r = self.s[i] * (1 + 0.35 * tw)
            d.ellipse([self.x[i] - r, self.y[i] - r, self.x[i] + r, self.y[i] + r],
                      fill=c + (int(110 * tw),))


def glow_text(base, xy, text, size, fill=WHITE, glow=ORANGE, glow_a=170,
              anchor="mm", bold=True, spacing=0):
    f = ImageFont.truetype(FONT_BOLD if bold else FONT_REG, size)
    glow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow_layer)
    sw = max(2, size // 16)
    gd.text(xy, text, font=f, fill=glow + (glow_a,), anchor=anchor,
            stroke_width=sw, stroke_fill=glow + (glow_a,))
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(max(4, size // 5)))
    base.alpha_composite(glow_layer)
    d = ImageDraw.Draw(base)
    d.text(xy, text, font=f, fill=fill + (255,), anchor=anchor,
           stroke_width=sw, stroke_fill=(0, 0, 0, 255))


def chip(d, xy, text, fill=ORANGE, size=26):
    f = ImageFont.truetype(FONT_BOLD, size)
    x, y = xy
    bb = d.textbbox((x, y), text, font=f, anchor="la")
    pad = 16
    d.rounded_rectangle([bb[0] - pad, bb[1] - pad, bb[2] + pad, bb[3] + pad],
                        radius=12, fill=(10, 8, 16, 200), outline=fill + (220,), width=2)
    d.text((x, y), text, font=f, fill=fill + (255,), anchor="la")


def hud_chrome(img, t, title, category, progress):
    """Brand watermark, category chip, bottom timeline bar."""
    d = ImageDraw.Draw(img)
    f_small = ImageFont.truetype(FONT_BOLD, 22)
    d.text((W - 28, H - 58), "BAADSHAH EDITZ", font=f_small,
           fill=(255, 255, 255, 120), anchor="ra")
    chip(d, (28, 26), category.upper(), fill=ORANGE, size=24)
    # timeline bar
    d.rounded_rectangle([60, H - 40, W - 60, H - 26], radius=7, fill=(255, 255, 255, 28))
    w = int((W - 120) * progress)
    if w > 4:
        d.rounded_rectangle([60, H - 40, 60 + w, H - 26], radius=7, fill=ORANGE + (230,))
    d.ellipse([60 + w - 7, H - 40, 60 + w + 7, H - 26], fill=WHITE + (255,))
    glow_text(img, (W / 2, H - 88), title, 64, fill=WHITE, glow=PURPLE, glow_a=140)


def finish(arr, rng):
    arr = arr * VIGN * SCAN[..., None]
    arr += rng.normal(0, 3.2, arr.shape)
    return np.clip(arr, 0, 255).astype(np.uint8)


# --------------------------------------------------------------- styles ----
def style_beat_sync(t, img, parts_layer):
    d = ImageDraw.Draw(img)
    n = 26
    margin = 90
    bw = (W - 2 * margin) / n
    e = beat_env(t)
    for i in range(n):
        ph = abs(math.sin(i * 0.65 + t * 7)) * beat_env(t - i * 0.028)
        h = 50 + 430 * ph
        x0 = margin + i * bw + 3
        c = lerp(ORANGE, RED, i / n * 0.5) if i < n / 2 else lerp(RED, PURPLE, (i - n / 2) / (n / 2))
        d.rectangle([x0, H - 120 - h, x0 + bw - 6, H - 120], fill=c + (255,))
        d.rectangle([x0, H - 120 - h, x0 + bw - 6, H - 120 - h + 6], fill=WHITE + (200,))
    # beat flash
    if e > 0.55:
        img.paste(Image.new("RGB", (W, H), lerp(ORANGE, RED, 0.4)),
                  (0, 0), Image.new("L", (W, H), int(26 * e)))
    return img


def style_montage(t, img, parts_layer, rng):
    d = ImageDraw.Draw(img)
    cuts = [ORANGE, RED, PURPLE]
    c = cuts[int(t / 0.4) % 3]
    # speed lines
    for i in range(16):
        x = (i * 173 + t * 1100) % (W + 500) - 250
        a = 40 + int(90 * abs(math.sin(i * 2.1 + t * 9)))
        d.line([x, -50, x + 320, H + 50], fill=c + (a,), width=3)
    # glitch slices on beat
    e = beat_env(t)
    if e > 0.5:
        arr = np.array(img)
        for k in range(5):
            y0 = int(rng.integers(0, H - 40))
            h = int(rng.integers(6, 26))
            shift = int(rng.integers(-30, 30))
            arr[y0:y0 + h] = np.roll(arr[y0:y0 + h], shift, axis=1)
        img.paste(Image.fromarray(arr), (0, 0))
        d = ImageDraw.Draw(img)
    return img, c, e


def style_lobby(t, img, parts_layer):
    d = ImageDraw.Draw(img)
    horizon = int(H * 0.40)
    vp = (W / 2, horizon)
    # floor grid
    for i in range(-14, 15):
        x2 = W / 2 + i * 130
        d.line([vp, (x2, H)], fill=(150, 80, 255, 60), width=2)
    for i in range(12):
        z = ((i / 12) + (t * 0.22)) % 1
        y = horizon + (H - horizon) * z ** 2.2
        a = int(20 + 120 * z)
        d.line([0, y, W, y], fill=(255, 122, 26, a), width=2)
    # rotating ring + platform
    cx, cy, r = W / 2, int(H * 0.62), 150
    d.ellipse([cx - r - 40, cy - 26, cx + r + 40, cy + 26], outline=ORANGE + (220,), width=4)
    for i in range(14):
        a0 = math.degrees(t * 1.2) + i * (360 / 14)
        d.arc([cx - r, cy - r, cx + r, cy + r], a0, a0 + 18, fill=PURPLE + (255,), width=6)
    # character silhouette
    d.ellipse([cx - 34, cy - r - 92, cx + 34, cy - r - 24], fill=(8, 6, 14, 255))  # head
    d.rounded_rectangle([cx - 52, cy - r - 24, cx + 52, cy + 10], radius=24, fill=(8, 6, 14, 255))
    # HUD corner brackets
    m = 34
    for (x, y, sx, sy) in [(m, m, 1, 1), (W - m, m, -1, 1), (m, H - m, 1, -1), (W - m, H - m, -1, -1)]:
        d.line([x, y + 34 * sy, x, y, x + 34 * sx, y], fill=ORANGE + (200,), width=4)
    if int(t * 2) % 2 == 0:
        d.text((W / 2, horizon - 60), "WAITING FOR PLAYERS" + "." * (int(t * 3) % 4),
               font=ImageFont.truetype(FONT_REG, 30), fill=(255, 255, 255, 180), anchor="mm")
    return img


def style_shorts(t, img, parts_layer):
    d = ImageDraw.Draw(img)
    px0, py0, px1, py1 = W / 2 - 165, 120, W / 2 + 165, H - 70
    d.rounded_rectangle([px0 - 6, py0 - 6, px1 + 6, py1 + 6], radius=36, outline=PURPLE + (255,), width=5)
    d.rounded_rectangle([px0, py0, px1, py1], radius=30, fill=(8, 6, 14, 255))
    # inner content: play button + bars
    e = beat_env(t)
    s = 1 + 0.12 * e
    r = 46 * s
    cx, cy = (px0 + px1) / 2, (py0 + py1) / 2 - 20
    d.polygon([(cx - r * 0.55, cy - r), (cx - r * 0.55, cy + r), (cx + r * 0.9, cy)],
              fill=WHITE + (255,))
    for i in range(9):
        ph = abs(math.sin(i * 0.9 + t * 6))
        h = 14 + 90 * ph * (0.4 + 0.6 * e)
        x0 = px0 + 26 + i * ((px1 - px0 - 52) / 9)
        d.rectangle([x0, py1 - 30 - h, x0 + 14, py1 - 30], fill=lerp(ORANGE, PURPLE, i / 8) + (255,))
    d.text((px0 + 24, py0 + 40), "12.4K", font=ImageFont.truetype(FONT_BOLD, 34),
           fill=RED + (255,), anchor="la")
    d.text((px0 + 24, py0 + 84), "\u2665", font=ImageFont.truetype(FONT_REG, 40),
           fill=RED + (255,), anchor="la")
    # floating hearts
    f_heart = ImageFont.truetype(FONT_REG, 34)
    for i in range(5):
        yy = py1 - ((t * 90 + i * 160) % (py1 - py0 - 40))
        xx = px0 + 40 + (i * 67) % (px1 - px0 - 80)
        d.text((xx, yy), "\u2665", font=f_heart, fill=(255, 70, 110, 220), anchor="la")
    return img


def style_pro(t, img, parts_layer):
    d = ImageDraw.Draw(img)
    mx0, my0, mx1, my1 = 90, 90, W - 90, H - 110
    d.rounded_rectangle([mx0, my0, mx1, my1], radius=18, fill=(10, 9, 16, 255),
                        outline=(255, 255, 255, 40), width=2)
    # preview area
    pv1 = my0 + int((my1 - my0) * 0.58)
    d.rectangle([mx0 + 14, my0 + 14, mx1 - 14, pv1], fill=(16, 10, 28, 255))
    for i in range(8):
        x0 = mx0 + 14 + i * ((mx1 - mx0 - 28) / 8)
        h = 30 + 60 * abs(math.sin(t * 3 + i))
        d.rectangle([x0, pv1 - h, x0 + ((mx1 - mx0 - 28) / 8) - 6, pv1],
                    fill=lerp(ORANGE, PURPLE, i / 7) + (230,))
    # color wheels
    wx, wy = mx1 - 150, my0 + 90
    for i, c in enumerate([(255, 60, 60), (60, 255, 120), (80, 120, 255)]):
        d.ellipse([wx + i * 34 - 26, wy - 26, wx + i * 34 + 26, wy + 26],
                  outline=c + (200,), width=4)
    # timeline tracks
    ty0 = pv1 + 16
    tracks = [(ORANGE, 0.9), (PURPLE, 0.85), (RED, 0.8)]
    for ti, (c, _) in enumerate(tracks):
        y0 = ty0 + ti * 44
        d.rectangle([mx0 + 14, y0, mx1 - 14, y0 + 30], fill=(255, 255, 255, 14))
        x = mx0 + 14
        while x < mx1 - 80:
            wseg = 60 + ((int(x * 7) % 5) * 34)
            if x + wseg < mx1 - 14:
                d.rounded_rectangle([x + 3, y0 + 4, x + wseg - 3, y0 + 26], radius=5,
                                    fill=c + (200,))
            x += wseg + 8
    # playhead
    px = mx0 + 14 + (mx1 - mx0 - 28) * (t / DUR)
    d.line([px, my0 + 10, px, my1 - 10], fill=WHITE + (255,), width=3)
    d.polygon([(px - 8, my0 + 10), (px + 8, my0 + 10), (px, my0 + 24)], fill=ORANGE + (255,))
    tc = f"00:00:{int(t):02d}:{int((t % 1) * FPS):02d}"
    d.text((mx1 - 24, my0 + 26), tc, font=ImageFont.truetype(FONT_BOLD, 28),
           fill=(255, 255, 255, 220), anchor="ra")
    return img


def style_custom(t, img, parts_layer):
    d = ImageDraw.Draw(img)
    labels = ["FX", "COLOR", "SOUND", "SPEED"]
    for i, lab in enumerate(labels):
        x = 120 + i * 90
        d.line([x, 200, x, H - 160], fill=(255, 255, 255, 40), width=6)
        ky = 200 + (H - 360) * (0.5 + 0.45 * math.sin(t * (1.1 + i * 0.23) + i * 1.7))
        d.ellipse([x - 14, ky - 14, x + 14, ky + 14], fill=ORANGE + (255,), outline=WHITE + (255,), width=3)
        d.text((x, 180), lab, font=ImageFont.truetype(FONT_BOLD, 20),
               fill=(255, 255, 255, 170), anchor="ma")
    # checklist
    items = ["CONCEPT", "EDIT", "EFFECTS", "COLOR GRADE", "EXPORT"]
    for i, it in enumerate(items):
        appear = min(1.0, max(0.0, (t - i * 1.2) / 0.4))
        if appear <= 0:
            continue
        y = 210 + i * 74
        x = W - 470
        if appear >= 1:
            d.ellipse([x, y - 22, x + 44, y + 22], fill=(60, 220, 120, 255))
            d.line([x + 10, y, x + 20, y + 10], fill=(5, 20, 10, 255), width=5)
            d.line([x + 20, y + 10, x + 36, y - 12], fill=(5, 20, 10, 255), width=5)
        d.text((x + 64, y), it, font=ImageFont.truetype(FONT_BOLD, 34),
               fill=WHITE + (int(255 * appear),), anchor="lm")
    # moving cursor with click ripple
    cx = W / 2 + 260 * math.sin(t * 1.7)
    cy = H / 2 + 150 * math.sin(t * 2.3 + 1)
    e = beat_env(t)
    if e > 0.6:
        rr = (1 - e) * 70 + 8
        d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], outline=ORANGE + (int(200 * e),), width=3)
    d.polygon([(cx, cy), (cx, cy + 34), (cx + 10, cy + 26), (cx + 16, cy + 40),
               (cx + 22, cy + 37), (cx + 15, cy + 23), (cx + 26, cy + 23)],
              fill=WHITE + (255,), outline=(0, 0, 0, 255))
    return img


# ---------------------------------------------------------------- main -----
SPECS = [
    dict(file="beat-sync.mp4", poster="poster-beat-sync.jpg", title="BEAT SYNC EDIT",
         category="Beat Sync", style="beat"),
    dict(file="montage.mp4", poster="poster-montage.jpg", title="MONTAGE",
         category="Montage", style="montage"),
    dict(file="lobby.mp4", poster="poster-lobby.jpg", title="LOBBY EDIT",
         category="Lobby", style="lobby"),
    dict(file="shorts.mp4", poster="poster-shorts.jpg", title="SHORTS & REELS",
         category="Shorts", style="shorts"),
    dict(file="pro-edit.mp4", poster="poster-pro.jpg", title="PRO EDITING",
         category="Pro", style="pro"),
    dict(file="custom-edit.mp4", poster="poster-custom.jpg", title="CUSTOM EDIT",
         category="Custom", style="custom"),
]


def render_frame(spec, t):
    img = Image.fromarray(base_bg(t).astype(np.uint8)).convert("RGBA")
    parts_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    rng = np.random.default_rng(int(t * FPS))
    st = spec["style"]
    if st == "beat":
        style_beat_sync(t, img, parts_layer)
        glow_text(img, (W / 2, 200), spec["title"], int(110 * (1 + 0.08 * beat_env(t))),
                  fill=WHITE, glow=ORANGE, glow_a=180)
    elif st == "montage":
        style_montage(t, img, parts_layer, rng)
        c = [ORANGE, RED, PURPLE][int(t / 0.4) % 3]
        glow_text(img, (W / 2, H / 2), spec["title"], int(130 * (1 + 0.14 * beat_env(t))),
                  fill=WHITE, glow=c, glow_a=200)
        d = ImageDraw.Draw(img)
        d.text((W / 2, H / 2 + 110), "CLIP x" + str(int(t * 8) + 3),
               font=ImageFont.truetype(FONT_BOLD, 34), fill=(255, 255, 255, 200), anchor="mm")
    elif st == "lobby":
        style_lobby(t, img, parts_layer)
        glow_text(img, (W / 2, 120), spec["title"], 96, fill=WHITE, glow=PURPLE, glow_a=190)
    elif st == "shorts":
        style_shorts(t, img, parts_layer)
        glow_text(img, (W / 2, 74), spec["title"], 72, fill=WHITE, glow=ORANGE, glow_a=180)
    elif st == "pro":
        style_pro(t, img, parts_layer)
        glow_text(img, (W / 2, H - 60), spec["title"], 54, fill=WHITE, glow=PURPLE, glow_a=150)
    elif st == "custom":
        style_custom(t, img, parts_layer)
        glow_text(img, (W / 2 + 60, 120), spec["title"], 92, fill=WHITE, glow=ORANGE, glow_a=180)
    # particles on top (additive-ish)
    pl = parts_layer.filter(ImageFilter.GaussianBlur(3))
    img.alpha_composite(pl)
    arr = np.array(img.convert("RGB")).astype(np.float32)
    return finish(arr, rng)


def main():
    wav = os.path.join(VID_OUT, "_beat.wav")
    print("Rendering beat audio ...", flush=True)
    make_beat_wav(wav)
    for spec in SPECS:
        out = os.path.join(VID_OUT, spec["file"])
        log = open(os.path.join(VID_OUT, "_" + spec["file"] + ".log"), "w")
        cmd = [FFMPEG, "-y",
               "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
               "-r", str(FPS), "-i", "pipe:0",
               "-i", wav,
               "-c:v", "libx264", "-preset", "veryfast", "-crf", "26",
               "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k",
               "-shortest", "-movflags", "+faststart", out]
        print(f"Rendering {spec['file']} ...", flush=True)
        proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL,
                                stderr=log)
        parts = Particles(seed=hash(spec["file"]) % 9999)
        poster_saved = False
        for i in range(N):
            t = i / FPS
            frame = render_frame(spec, t)
            if not poster_saved and i == int(3.0 * FPS):
                Image.fromarray(frame).save(os.path.join(IMG_OUT, spec["poster"]),
                                             quality=86)
                poster_saved = True
            proc.stdin.write(frame.tobytes())
            parts.update(1 / FPS)
        proc.stdin.close()
        rc = proc.wait()
        log.close()
        if rc != 0:
            print(f"  !! ffmpeg failed for {spec['file']} (rc={rc}), see log", flush=True)
        else:
            print(f"  done: {os.path.getsize(out)//1024} KB", flush=True)
    os.remove(wav)
    for f in os.listdir(VID_OUT):
        if f.endswith(".log"):
            os.remove(os.path.join(VID_OUT, f))
    print("All videos rendered.", flush=True)


if __name__ == "__main__":
    main()
