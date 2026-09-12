from PIL import Image, ImageDraw

def make_transparent(im):
    im = im.convert('RGBA')
    datas = im.getdata()
    new_data = []
    for item in datas:
        # Check if white background (or near white)
        if item[0] > 235 and item[1] > 235 and item[2] > 235:
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append(item)
    im.putdata(new_data)
    return im

def draw_round_glasses(d, x_off=0, y_off=0):
    # Glasses coordinates on Egydia's face
    # Left eye ring: center ~ (146, 114)
    # Right eye ring: center ~ (182, 114)
    C_GLASSES = (20, 20, 26, 255)
    C_WHITE_LENS = (255, 255, 255, 235)
    C_LENS_TINT = (230, 245, 255, 120)

    # Pixel-style circle outlines (width ~ 3px)
    # Left rim
    d.ellipse([133 + x_off, 101 + y_off, 159 + x_off, 127 + y_off], outline=C_GLASSES, width=3)
    # Right rim
    d.ellipse([169 + x_off, 101 + y_off, 195 + x_off, 127 + y_off], outline=C_GLASSES, width=3)
    # Center bridge
    d.line([(158 + x_off, 113 + y_off), (170 + x_off, 113 + y_off)], fill=C_GLASSES, width=3)

    # White lens reflection / glare (kaca putih)
    # Diagonal gleams in both lenses
    d.polygon([(140 + x_off, 105 + y_off), (145 + x_off, 105 + y_off), (137 + x_off, 116 + y_off), (136 + x_off, 112 + y_off)], fill=C_WHITE_LENS)
    d.polygon([(176 + x_off, 105 + y_off), (181 + x_off, 105 + y_off), (173 + x_off, 116 + y_off), (172 + x_off, 112 + y_off)], fill=C_WHITE_LENS)
    # Small secondary shine points
    d.rectangle([151 + x_off, 119 + y_off, 153 + x_off, 121 + y_off], fill=C_WHITE_LENS)
    d.rectangle([187 + x_off, 119 + y_off, 189 + x_off, 121 + y_off], fill=C_WHITE_LENS)


def draw_tabby_cat(d, cx, cy, frame_idx=0):
    # cx, cy is ground/anchor position for cat (e.g. cat paws at cy=298)
    # Cat size: ~90w x 75h pixels, proportional to Egydia (~280h)
    C_OUTLINE = (22, 18, 14, 255)
    C_TABBY = (168, 132, 92, 255)
    C_TABBY_LIGHT = (205, 168, 125, 255)
    C_TABBY_DARK = (80, 58, 40, 255)
    C_WHITE = (248, 248, 252, 255)
    C_PINK = (245, 165, 175, 255)
    C_EYE_GREEN = (95, 185, 90, 255)
    C_PUPIL = (20, 25, 20, 255)

    bob = -2 if frame_idx % 2 == 1 else 0

    # 1. TAIL (Wagging tail)
    tail_swing = [-4, -1, 3, 0][frame_idx % 4]
    tail_pts = [
        (cx - 2, cy - 26 + bob),
        (cx - 10, cy - 38 + bob + tail_swing),
        (cx - 16, cy - 48 + bob + tail_swing * 2),
        (cx - 12, cy - 54 + bob + tail_swing * 2)
    ]
    d.line(tail_pts, fill=C_TABBY_DARK, width=6)
    d.point([(cx - 12, cy - 54 + bob + tail_swing * 2)], fill=C_WHITE)

    # 2. BODY
    # Oval body
    d.ellipse([cx - 2, cy - 36 + bob, cx + 46, cy - 4 + bob], fill=C_TABBY, outline=C_OUTLINE, width=3)
    # White belly & chest
    d.ellipse([cx + 12, cy - 20 + bob, cx + 40, cy - 4 + bob], fill=C_WHITE)
    # Tabby stripes on back
    d.line([(cx + 6, cy - 34 + bob), (cx + 8, cy - 20 + bob)], fill=C_TABBY_DARK, width=4)
    d.line([(cx + 16, cy - 35 + bob), (cx + 18, cy - 22 + bob)], fill=C_TABBY_DARK, width=4)
    d.line([(cx + 26, cy - 35 + bob), (cx + 27, cy - 22 + bob)], fill=C_TABBY_DARK, width=4)

    # 3. LEGS / PAWS (Walking cycle)
    # 4 legs: front-left, front-right, back-left, back-right
    step = frame_idx % 4
    if step == 0:
        # Back leg 1
        d.line([(cx + 4, cy - 10 + bob), (cx - 2, cy)], fill=C_TABBY_DARK, width=5)
        d.rectangle([cx - 5, cy - 2, cx + 1, cy], fill=C_WHITE)
        # Back leg 2
        d.line([(cx + 12, cy - 10 + bob), (cx + 14, cy - 2)], fill=C_TABBY, width=5)
        d.rectangle([cx + 12, cy - 4, cx + 17, cy - 2], fill=C_WHITE)
        # Front leg 1
        d.line([(cx + 34, cy - 10 + bob), (cx + 42, cy)], fill=C_TABBY, width=5)
        d.rectangle([cx + 39, cy - 2, cx + 45, cy], fill=C_WHITE)
        # Front leg 2
        d.line([(cx + 28, cy - 10 + bob), (cx + 26, cy - 2)], fill=C_TABBY_DARK, width=5)
        d.rectangle([cx + 24, cy - 4, cx + 29, cy - 2], fill=C_WHITE)
    elif step == 1 or step == 3:
        # Passing step
        d.line([(cx + 6, cy - 10 + bob), (cx + 6, cy)], fill=C_TABBY, width=5)
        d.rectangle([cx + 4, cy - 2, cx + 9, cy], fill=C_WHITE)
        d.line([(cx + 12, cy - 10 + bob), (cx + 12, cy)], fill=C_TABBY_DARK, width=5)
        d.rectangle([cx + 10, cy - 2, cx + 15, cy], fill=C_WHITE)
        d.line([(cx + 32, cy - 10 + bob), (cx + 32, cy)], fill=C_TABBY, width=5)
        d.rectangle([cx + 30, cy - 2, cx + 35, cy], fill=C_WHITE)
        d.line([(cx + 38, cy - 10 + bob), (cx + 38, cy)], fill=C_TABBY_DARK, width=5)
        d.rectangle([cx + 36, cy - 2, cx + 41, cy], fill=C_WHITE)
    elif step == 2:
        # Reversed stride
        d.line([(cx + 4, cy - 10 + bob), (cx + 10, cy)], fill=C_TABBY, width=5)
        d.rectangle([cx + 7, cy - 2, cx + 13, cy], fill=C_WHITE)
        d.line([(cx + 12, cy - 10 + bob), (cx + 6, cy - 2)], fill=C_TABBY_DARK, width=5)
        d.rectangle([cx + 3, cy - 4, cx + 9, cy - 2], fill=C_WHITE)
        d.line([(cx + 34, cy - 10 + bob), (cx + 28, cy)], fill=C_TABBY_DARK, width=5)
        d.rectangle([cx + 25, cy - 2, cx + 31, cy], fill=C_WHITE)
        d.line([(cx + 28, cy - 10 + bob), (cx + 36, cy - 2)], fill=C_TABBY, width=5)
        d.rectangle([cx + 33, cy - 4, cx + 39, cy - 2], fill=C_WHITE)

    # 4. HEAD
    # Cat head positioned forward and looking happy
    hx, hy = cx + 36, cy - 38 + bob
    d.ellipse([hx - 2, hy - 4, hx + 32, hy + 26], fill=C_TABBY, outline=C_OUTLINE, width=3)
    
    # Pointy Cat Ears
    # Left Ear
    d.polygon([(hx + 4, hy - 2), (hx + 8, hy - 16), (hx + 16, hy - 2)], fill=C_TABBY_DARK, outline=C_OUTLINE)
    d.polygon([(hx + 7, hy - 2), (hx + 9, hy - 11), (hx + 13, hy - 2)], fill=C_PINK)
    # Right Ear
    d.polygon([(hx + 18, hy - 2), (hx + 24, hy - 16), (hx + 29, hy - 2)], fill=C_TABBY_DARK, outline=C_OUTLINE)
    d.polygon([(hx + 20, hy - 2), (hx + 23, hy - 11), (hx + 26, hy - 2)], fill=C_PINK)

    # Forehead stripes
    d.line([(hx + 14, hy - 2), (hx + 14, hy + 4)], fill=C_TABBY_DARK, width=3)
    d.line([(hx + 19, hy - 2), (hx + 19, hy + 4)], fill=C_TABBY_DARK, width=3)

    # White Muzzle / Cheeks
    d.ellipse([hx + 10, hy + 10, hx + 30, hy + 24], fill=C_WHITE)
    # Cute Pink Nose
    d.polygon([(hx + 18, hy + 12), (hx + 23, hy + 12), (hx + 20, hy + 15)], fill=C_PINK)

    # Big Shiny Green Cat Eyes
    d.ellipse([hx + 8, hy + 4, hx + 16, hy + 14], fill=C_EYE_GREEN, outline=C_OUTLINE, width=2)
    d.ellipse([hx + 10, hy + 6, hx + 14, hy + 12], fill=C_PUPIL)
    d.point([(hx + 10, hy + 6)], fill=(255, 255, 255, 255))

    d.ellipse([hx + 22, hy + 4, hx + 30, hy + 14], fill=C_EYE_GREEN, outline=C_OUTLINE, width=2)
    d.ellipse([hx + 24, hy + 6, hx + 28, hy + 12], fill=C_PUPIL)
    d.point([(hx + 24, hy + 6)], fill=(255, 255, 255, 255))

    # Whiskers
    d.line([(hx + 28, hy + 14), (hx + 38, hy + 12)], fill=C_OUTLINE, width=1)
    d.line([(hx + 28, hy + 17), (hx + 38, hy + 18)], fill=C_OUTLINE, width=1)
    d.line([(hx + 10, hy + 14), (hx + 0, hy + 12)], fill=C_OUTLINE, width=1)
    d.line([(hx + 10, hy + 17), (hx + 0, hy + 18)], fill=C_OUTLINE, width=1)


# BUILD ANIMATED FRAMES
# Canvas size: Egydia (w ~ 160) + Cat (w ~ 90) + Spacing = 320w x 330h
CANVAS_W, CANVAS_H = 330, 330
final_frames = []

for idx in range(4):
    raw_frame = Image.open(rf'f:\Coding\Portofolio\public\assets\images\walk_full_{idx}.png')
    trans_frame = make_transparent(raw_frame)

    # Create new transparent canvas
    comp = Image.new('RGBA', (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    
    # Paste Egydia on the left (x=10, y=0)
    comp.paste(trans_frame, (10, 0), trans_frame)

    d = ImageDraw.Draw(comp)
    # Add round black glasses with white glass reflections onto Egydia
    draw_round_glasses(d, x_off=10, y_off=0)

    # Draw full-body tabby cat walking alongside her on the right (cx=225, cy=300)
    draw_tabby_cat(d, cx=225, cy=300, frame_idx=idx)

    final_frames.append(comp)

# Save animated transparent GIF
final_frames[0].save(
    r'f:\Coding\Portofolio\public\assets\images\egydia_cat_walking_duo.gif',
    save_all=True,
    append_images=final_frames[1:],
    duration=180,
    loop=0,
    disposal=2
)

# Also save static preview PNG
final_frames[0].save(r'f:\Coding\Portofolio\public\assets\images\egydia_cat_walking_duo.png')

# Also create flipped version (walking to the left) so the character can roam back and forth!
flipped_frames = [f.transpose(Image.FLIP_LEFT_RIGHT) for f in final_frames]
flipped_frames[0].save(
    r'f:\Coding\Portofolio\public\assets\images\egydia_cat_walking_duo_left.gif',
    save_all=True,
    append_images=flipped_frames[1:],
    duration=180,
    loop=0,
    disposal=2
)

print('Successfully generated walking duo GIF with glasses and full-body cat!')
