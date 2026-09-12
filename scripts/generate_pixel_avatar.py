from PIL import Image, ImageDraw

def create_frame(bob_offset=0, is_blink=False, is_wave=False):
    # Base 36x48 pixel art canvas
    W, H = 36, 48
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)

    # Color definitions from Egydia's graduation photo
    C_OUTLINE = (18, 20, 32, 255)
    C_TOGA = (28, 28, 36, 255)
    C_TOGA_LIGHT = (50, 50, 65, 255)
    C_TASSEL = (45, 45, 55, 255)
    
    C_HIJAB = (26, 48, 115, 255)
    C_HIJAB_LIGHT = (42, 75, 160, 255)
    C_HIJAB_DARK = (16, 30, 80, 255)

    C_SKIN = (255, 222, 195, 255)
    C_SKIN_SHADOW = (235, 195, 168, 255)
    C_BLUSH = (255, 175, 175, 255)
    C_EYE = (30, 24, 28, 255)
    C_EYE_SHINE = (255, 255, 255, 255)
    C_LIP = (235, 120, 125, 255)

    C_KEBAYA = (28, 62, 150, 255)
    C_KEBAYA_LIGHT = (46, 92, 198, 255)
    C_KEBAYA_DARK = (18, 40, 105, 255)
    C_PEARL = (240, 245, 255, 255)

    C_SASH = (248, 120, 68, 255)
    C_SASH_LIGHT = (255, 155, 105, 255)
    C_MEDAL = (245, 185, 25, 255)
    C_MEDAL_SHADOW = (200, 140, 15, 255)

    C_SKIRT = (242, 242, 250, 255)
    C_SKIRT_SHADOW = (210, 215, 230, 255)

    y_off = bob_offset

    # --- 1. TOPI TOGA (Graduation Mortarboard) ---
    # Top diamond plate
    top_poly = [
        (18, 2 + y_off),
        (33, 6 + y_off),
        (18, 10 + y_off),
        (3, 6 + y_off)
    ]
    d.polygon(top_poly, fill=C_TOGA, outline=C_OUTLINE)
    # Toga cap rim underneath
    d.rectangle([13, 9 + y_off, 23, 12 + y_off], fill=C_TOGA, outline=C_OUTLINE)
    # Tassel string hanging to the left
    d.line([(8, 6 + y_off), (7, 10 + y_off), (7, 14 + y_off)], fill=C_TASSEL, width=1)
    d.rectangle([6, 13 + y_off, 8, 15 + y_off], fill=C_TASSEL)

    # --- 2. HIJAB NAVY ---
    # Hijab hood contour
    d.rectangle([10, 12 + y_off, 26, 23 + y_off], fill=C_HIJAB, outline=C_OUTLINE)
    # Hijab folds and highlights
    d.line([(11, 13 + y_off), (14, 13 + y_off)], fill=C_HIJAB_LIGHT)
    d.line([(22, 13 + y_off), (25, 13 + y_off)], fill=C_HIJAB_LIGHT)

    # --- 3. FACE & EXPRESSION ---
    # Face oval
    d.rectangle([13, 14 + y_off, 23, 20 + y_off], fill=C_SKIN)
    d.point([(12, 16 + y_off), (12, 17 + y_off), (24, 16 + y_off), (24, 17 + y_off)], fill=C_SKIN)
    # Chin curve
    d.rectangle([15, 21 + y_off, 21, 21 + y_off], fill=C_SKIN)

    # Eyes
    if is_blink:
        # Closed eyes (cute curved line)
        d.line([(14, 17 + y_off), (16, 17 + y_off)], fill=C_EYE, width=1)
        d.line([(20, 17 + y_off), (22, 17 + y_off)], fill=C_EYE, width=1)
    else:
        # Big expressive pixel eyes with shine
        d.rectangle([14, 16 + y_off, 16, 18 + y_off], fill=C_EYE)
        d.point([(14, 16 + y_off)], fill=C_EYE_SHINE)
        d.rectangle([20, 16 + y_off, 22, 18 + y_off], fill=C_EYE)
        d.point([(20, 16 + y_off)], fill=C_EYE_SHINE)

    # Cute blush cheeks
    d.point([(13, 18 + y_off), (23, 18 + y_off)], fill=C_BLUSH)
    # Gentle smile
    d.line([(17, 20 + y_off), (19, 20 + y_off)], fill=C_LIP)

    # --- 4. HIJAB NECK WRAP ---
    d.rectangle([12, 22 + y_off, 24, 25 + y_off], fill=C_HIJAB_DARK, outline=C_OUTLINE)

    # --- 5. KEBAYA BIRU NAVY (Navy Blue Kebaya) ---
    # Torso
    d.rectangle([10, 26 + y_off, 26, 38 + y_off], fill=C_KEBAYA, outline=C_OUTLINE)
    # Kebaya brocade/pearl accents
    d.point([(11, 28 + y_off), (13, 30 + y_off), (23, 30 + y_off), (25, 28 + y_off)], fill=C_PEARL)
    d.point([(12, 34 + y_off), (24, 34 + y_off), (18, 36 + y_off)], fill=C_PEARL)

    # --- 6. SELEMPANG WISUDA ORANYE & MEDALI EMAS ---
    # Orange sash from right shoulder diagonally across chest
    sash_pts = [
        (22, 26 + y_off), (25, 26 + y_off),
        (18, 36 + y_off), (15, 36 + y_off)
    ]
    d.polygon(sash_pts, fill=C_SASH)
    # Second sash loop from left shoulder
    d.line([(11, 26 + y_off), (16, 35 + y_off)], fill=C_SASH, width=2)
    
    # Gold Medal (Cum Laude Medal)
    d.rectangle([15, 35 + y_off, 18, 38 + y_off], fill=C_MEDAL, outline=C_OUTLINE)
    d.point([(16, 36 + y_off)], fill=C_EYE_SHINE)

    # --- 7. ARMS & HANDS ---
    if is_wave:
        # Left arm resting
        d.rectangle([8, 27 + y_off, 10, 36 + y_off], fill=C_KEBAYA, outline=C_OUTLINE)
        d.rectangle([9, 36 + y_off, 11, 38 + y_off], fill=C_SKIN)
        # Right arm waving up!
        d.line([(26, 27 + y_off), (29, 23 + y_off), (31, 18 + y_off)], fill=C_KEBAYA, width=2)
        d.rectangle([30, 16 + y_off, 33, 19 + y_off], fill=C_SKIN, outline=C_OUTLINE)
        # Waving sparkles
        d.point([(34, 15 + y_off), (32, 13 + y_off)], fill=C_MEDAL)
    else:
        # Both hands clasped politely in front (as in photo)
        d.rectangle([8, 27 + y_off, 10, 36 + y_off], fill=C_KEBAYA, outline=C_OUTLINE)
        d.rectangle([26, 27 + y_off, 28, 36 + y_off], fill=C_KEBAYA, outline=C_OUTLINE)
        # Clasped hands with manicure/skin
        d.rectangle([14, 38 + y_off, 22, 40 + y_off], fill=C_SKIN, outline=C_OUTLINE)

    # --- 8. SKIRT (Kain Putih) ---
    d.rectangle([12, 39 + y_off, 24, 46], fill=C_SKIRT, outline=C_OUTLINE)
    d.line([(15, 41 + y_off), (15, 45)], fill=C_SKIRT_SHADOW)
    d.line([(21, 41 + y_off), (21, 45)], fill=C_SKIRT_SHADOW)

    # Feet
    d.rectangle([13, 46, 16, 47], fill=C_TOGA)
    d.rectangle([20, 46, 23, 47], fill=C_TOGA)

    return im

frames = []
# 8 frames loop: Idle -> Bob -> Blink -> Wave -> Return
f1 = create_frame(bob_offset=0, is_blink=False, is_wave=False)
f2 = create_frame(bob_offset=1, is_blink=False, is_wave=False)
f3 = create_frame(bob_offset=1, is_blink=True, is_wave=False)
f4 = create_frame(bob_offset=0, is_blink=False, is_wave=False)
f5 = create_frame(bob_offset=0, is_blink=False, is_wave=True)
f6 = create_frame(bob_offset=1, is_blink=False, is_wave=True)
f7 = create_frame(bob_offset=0, is_blink=False, is_wave=True)
f8 = create_frame(bob_offset=0, is_blink=False, is_wave=False)

raw_frames = [f1, f2, f3, f4, f5, f6, f7, f8]
scaled_frames = []

SCALE = 8
for f in raw_frames:
    sf = f.resize((f.width * SCALE, f.height * SCALE), Image.Resampling.NEAREST)
    scaled_frames.append(sf)

scaled_frames[0].save(
    r'f:\Coding\Portofolio\public\assets\images\egydia_pixel_animated.gif',
    save_all=True,
    append_images=scaled_frames[1:],
    duration=[250, 250, 180, 250, 250, 250, 250, 250],
    loop=0,
    disposal=2
)

# Also save high-res static PNG for crystal-clear preview
scaled_frames[0].save(r'f:\Coding\Portofolio\public\assets\images\egydia_pixel_standing.png')
scaled_frames[4].save(r'f:\Coding\Portofolio\public\assets\images\egydia_pixel_waving.png')

print('Pixel art character generated successfully!')
