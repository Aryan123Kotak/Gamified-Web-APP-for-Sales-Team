#!/usr/bin/env python3
"""Generate the PWA icons (no external libraries) — a zap-yellow lightning bolt on
the app's deep-purple brand background. Run: python3 scripts/generate-icons.py"""
import os, zlib, struct

OUT = os.path.join(os.path.dirname(__file__), '..', 'client', 'public', 'icons')
os.makedirs(OUT, exist_ok=True)

BG   = (26, 11, 59)     # deep purple (matches the app background)
BG2  = (46, 16, 92)     # slightly lighter purple for a subtle vignette
BOLT = (255, 225, 77)   # zap yellow

# Classic lightning-bolt polygon, normalised to a 0..1 box.
BOLT_POLY = [
    (0.62, 0.05), (0.32, 0.52), (0.50, 0.52),
    (0.38, 0.95), (0.74, 0.42), (0.54, 0.42),
]

def point_in_poly(x, y, poly):
    inside = False
    n = len(poly)
    j = n - 1
    for i in range(n):
        xi, yi = poly[i]; xj, yj = poly[j]
        if ((yi > y) != (yj > y)) and (x < (xj - xi) * (y - yi) / (yj - yi) + xi):
            inside = not inside
        j = i
    return inside

def write_png(path, size, pad=0.0):
    """pad shrinks the bolt toward the centre (for maskable safe-zone)."""
    cx = cy = 0.5
    scale = 1.0 - pad
    raw = bytearray()
    for y in range(size):
        raw.append(0)  # filter byte
        fy = y / size
        for x in range(size):
            fx = x / size
            # vignette background
            d = ((fx - 0.5) ** 2 + (fy - 0.5) ** 2) ** 0.5
            t = min(1.0, d / 0.7)
            r = int(BG2[0] * (1 - t) + BG[0] * t)
            g = int(BG2[1] * (1 - t) + BG[1] * t)
            b = int(BG2[2] * (1 - t) + BG[2] * t)
            # map into padded bolt space
            bx = (fx - cx) / scale + cx
            by = (fy - cy) / scale + cy
            if 0 <= bx <= 1 and 0 <= by <= 1 and point_in_poly(bx, by, BOLT_POLY):
                r, g, b = BOLT
            raw += bytes((r, g, b, 255))

    def chunk(tag, data):
        return (struct.pack('>I', len(data)) + tag + data
                + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff))

    ihdr = struct.pack('>IIBBBBB', size, size, 8, 6, 0, 0, 0)  # 8-bit RGBA
    png = (b'\x89PNG\r\n\x1a\n'
           + chunk(b'IHDR', ihdr)
           + chunk(b'IDAT', zlib.compress(bytes(raw), 9))
           + chunk(b'IEND', b''))
    with open(path, 'wb') as f:
        f.write(png)
    print('wrote', os.path.relpath(path), f'({size}x{size})')

def ascii_preview():
    n = 24
    print('bolt preview:')
    for y in range(n):
        line = ''
        for x in range(n):
            line += '#' if point_in_poly(x / n, y / n, BOLT_POLY) else '.'
        print('  ' + line)

if __name__ == '__main__':
    ascii_preview()
    write_png(os.path.join(OUT, 'icon-192.png'), 192)
    write_png(os.path.join(OUT, 'icon-512.png'), 512)
    write_png(os.path.join(OUT, 'icon-maskable-512.png'), 512, pad=0.20)
    write_png(os.path.join(OUT, 'apple-touch-icon.png'), 180)
