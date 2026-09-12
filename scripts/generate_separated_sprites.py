from PIL import Image, ImageDraw

def make_transparent(im):
    im = im.convert('RGBA')
    datas = im.getdata()
    new_data = []
    for item in datas:
        if item[0] > 235 and item[1] > 235 and item[2] > 235:
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append(item)
    im.putdata(new_data)
    return im

def draw_natural_glasses_side(d, x_off=0, y_off=0):
    C_BLACK = (18, 18, 24, 255)
    C_GLINT = (255, 255, 255, 230)

    def draw_pixel_circle(cx, cy, r=10):
        d.rectangle([cx - 4, cy - r, cx + 4, cy - r + 2], fill=C_BLACK)
        d.rectangle([cx - 4, cy + r - 2, cx + 4, cy + r], fill=C_BLACK)
        d.rectangle([cx - r, cy - 4, cx - r + 2, cy + 4], fill=C_BLACK)
        d.rectangle([cx + r - 2, cy - 4, cx + r, cy + 4], fill=C_BLACK)
        d.rectangle([cx - r + 2, cy - r + 2, cx - r + 4, cy - r + 4], fill=C_BLACK)
        d.rectangle([cx + r - 4, cy - r + 2, cx + r - 2, cy - r + 4], fill=C_BLACK)
        d.rectangle([cx - r + 2, cy + r - 4, cx - r + 4, cy + r - 2], fill=C_BLACK)
        d.rectangle([cx + r - 4, cy + r - 4, cx + r - 2, cy + r - 2], fill=C_BLACK)
        d.rectangle([cx - 5, cy - 7, cx - 2, cy - 4], fill=C_GLINT)

    draw_pixel_circle(144 + x_off, 114 + y_off, r=10)
    draw_pixel_circle(180 + x_off, 114 + y_off, r=10)
    d.rectangle([153 + x_off, 112 + y_off, 171 + x_off, 114 + y_off], fill=C_BLACK)

def draw_natural_glasses_front(d, cx1, cx2, cy):
    C_BLACK = (18, 18, 24, 255)
    C_GLINT = (255, 255, 255, 230)

    def draw_front_rim(cx, cy, r=10):
        d.rectangle([cx - 4, cy - r, cx + 4, cy - r + 2], fill=C_BLACK)
        d.rectangle([cx - 4, cy + r - 2, cx + 4, cy + r], fill=C_BLACK)
        d.rectangle([cx - r, cy - 4, cx - r + 2, cy + 4], fill=C_BLACK)
        d.rectangle([cx + r - 2, cy - 4, cx + r, cy + 4], fill=C_BLACK)
        d.rectangle([cx - r + 2, cy - r + 2, cx - r + 4, cy - r + 4], fill=C_BLACK)
        d.rectangle([cx + r - 4, cy - r + 2, cx + r - 2, cy - r + 4], fill=C_BLACK)
        d.rectangle([cx - r + 2, cy + r - 4, cx - r + 4, cy + r - 2], fill=C_BLACK)
        d.rectangle([cx + r - 4, cy + r - 4, cx + r - 2, cy + r - 2], fill=C_BLACK)
        d.rectangle([cx - 5, cy - 6, cx - 2, cy - 3], fill=C_GLINT)

    draw_front_rim(cx1, cy, r=10)
    draw_front_rim(cx2, cy, r=10)
    d.rectangle([cx1 + 8, cy - 1, cx2 - 8, cy + 1], fill=C_BLACK)


# ==========================================
# 1. EGY SEPARATE SPRITES (Walk, Jump, Wave)
# ==========================================
EGY_W, EGY_H = 180, 310

# Egy Walk
egy_walk_frames = []
for idx in range(4):
    raw = Image.open(rf'f:\Coding\Portofolio\public\assets\images\walk_full_{idx}.png')
    trans = make_transparent(raw)
    # Crop to just Egy
    cropped_egy = trans.crop((40, 15, 220, 325))
    d = ImageDraw.Draw(cropped_egy)
    draw_natural_glasses_side(d, x_off=-40, y_off=-15)
    egy_walk_frames.append(cropped_egy)

egy_walk_frames[0].save(
    r'f:\Coding\Portofolio\public\assets\images\egy_walk.gif',
    save_all=True,
    append_images=egy_walk_frames[1:],
    duration=250,
    loop=0,
    disposal=2
)

# Egy Jump Front
combat_raw = Image.open(r'f:\Coding\Portofolio\public\assets\images\combat_raw_0.png')
combat_trans = make_transparent(combat_raw)

egy_jump_frames = []
for idx in range(4):
    comp = Image.new('RGBA', (EGY_W, EGY_H), (0, 0, 0, 0))
    jump_dy = [0, -22, -30, -8][idx]
    cropped = combat_trans.crop((35, 10, 215, 320))
    comp.paste(cropped, (0, jump_dy), cropped)
    d = ImageDraw.Draw(comp)
    draw_natural_glasses_front(d, cx1=96, cx2=134, cy=95 + jump_dy)
    if idx in [1, 2]:
        d.polygon([(40, 30), (44, 20), (48, 30), (44, 40)], fill=(255, 220, 50, 255))
        d.polygon([(150, 35), (154, 25), (158, 35), (154, 45)], fill=(255, 180, 220, 255))
    egy_jump_frames.append(comp)

egy_jump_frames[0].save(
    r'f:\Coding\Portofolio\public\assets\images\egy_jump_front.gif',
    save_all=True,
    append_images=egy_jump_frames[1:],
    duration=180,
    loop=0,
    disposal=2
)

# Egy Wave Front
egy_wave_frames = []
for idx in range(4):
    comp = Image.new('RGBA', (EGY_W, EGY_H), (0, 0, 0, 0))
    bob = -2 if idx % 2 == 1 else 0
    cropped = combat_trans.crop((35, 10, 215, 320))
    comp.paste(cropped, (0, bob), cropped)
    d = ImageDraw.Draw(comp)
    draw_natural_glasses_front(d, cx1=96, cx2=134, cy=95 + bob)
    wave_x = 165 if idx % 2 == 0 else 175
    wave_y = 80 if idx % 2 == 0 else 70
    d.line([(135, 130 + bob), (wave_x - 10, 100 + bob), (wave_x, wave_y)], fill=(240, 245, 255, 255), width=10)
    d.ellipse([wave_x - 6, wave_y - 8, wave_x + 8, wave_y + 6], fill=(255, 222, 195, 255))
    d.polygon([(wave_x + 12, wave_y - 6), (wave_x + 15, wave_y - 12), (wave_x + 18, wave_y - 6), (wave_x + 15, wave_y)], fill=(255, 215, 0, 255))
    egy_wave_frames.append(comp)

egy_wave_frames[0].save(
    r'f:\Coding\Portofolio\public\assets\images\egy_wave_front.gif',
    save_all=True,
    append_images=egy_wave_frames[1:],
    duration=220,
    loop=0,
    disposal=2
)


# ==========================================
# 2. CAT SEPARATE SPRITES (Walk, Run, Jump, Sit)
# ==========================================
CAT_W, CAT_H = 100, 85

def draw_single_cat(d, cx, cy, frame_idx=0, pose='walk'):
    C_OUTLINE = (22, 18, 14, 255)
    C_TABBY = (168, 132, 92, 255)
    C_TABBY_LIGHT = (205, 168, 125, 255)
    C_TABBY_DARK = (80, 58, 40, 255)
    C_WHITE = (248, 248, 252, 255)
    C_PINK = (245, 165, 175, 255)
    C_EYE_GREEN = (95, 185, 90, 255)
    C_PUPIL = (20, 25, 20, 255)

    bob = -2 if frame_idx % 2 == 1 else 0

    if pose == 'jump':
        jump_y = -18 if frame_idx in [1, 2] else -4
        d.line([(cx + 2, cy - 20 + jump_y), (cx - 6, cy - 36 + jump_y), (cx - 4, cy - 48 + jump_y)], fill=C_TABBY_DARK, width=6)
        d.ellipse([cx, cy - 34 + jump_y, cx + 46, cy - 2 + jump_y], fill=C_TABBY, outline=C_OUTLINE, width=3)
        d.ellipse([cx + 12, cy - 18 + jump_y, cx + 38, cy - 2 + jump_y], fill=C_WHITE)
        d.line([(cx + 4, cy - 6 + jump_y), (cx - 4, cy + 4 + jump_y)], fill=C_TABBY, width=5)
        d.line([(cx + 34, cy - 6 + jump_y), (cx + 44, cy + 4 + jump_y)], fill=C_TABBY, width=5)
        hx, hy = cx + 34, cy - 42 + jump_y
        d.ellipse([hx, hy, hx + 32, hy + 28], fill=C_TABBY, outline=C_OUTLINE, width=3)
        d.polygon([(hx + 5, hy + 2), (hx + 9, hy - 12), (hx + 17, hy + 2)], fill=C_TABBY_DARK, outline=C_OUTLINE)
        d.polygon([(hx + 19, hy + 2), (hx + 24, hy - 12), (hx + 29, hy + 2)], fill=C_TABBY_DARK, outline=C_OUTLINE)
        d.ellipse([hx + 10, hy + 12, hx + 30, hy + 26], fill=C_WHITE)
        d.polygon([(hx + 18, hy + 14), (hx + 23, hy + 14), (hx + 20, hy + 17)], fill=C_PINK)
        d.line([(hx + 9, hy + 8), (hx + 12, hy + 5), (hx + 15, hy + 8)], fill=C_OUTLINE, width=2)
        d.line([(hx + 21, hy + 8), (hx + 24, hy + 5), (hx + 27, hy + 8)], fill=C_OUTLINE, width=2)
        d.polygon([(cx + 48, cy - 46), (cx + 51, cy - 52), (cx + 54, cy - 46), (cx + 51, cy - 40)], fill=(255, 215, 0, 255))
        return

    # Normal walk, run, or sit
    tail_swing = [-5, -2, 4, 1][frame_idx % 4]
    tail_pts = [
        (cx - 2, cy - 26 + bob),
        (cx - 10, cy - 38 + bob + tail_swing),
        (cx - 16, cy - 48 + bob + tail_swing * 2),
        (cx - 12, cy - 54 + bob + tail_swing * 2)
    ]
    d.line(tail_pts, fill=C_TABBY_DARK, width=6)
    d.point([(cx - 12, cy - 54 + bob + tail_swing * 2)], fill=C_WHITE)

    d.ellipse([cx - 2, cy - 36 + bob, cx + 46, cy - 4 + bob], fill=C_TABBY, outline=C_OUTLINE, width=3)
    d.ellipse([cx + 12, cy - 20 + bob, cx + 40, cy - 4 + bob], fill=C_WHITE)
    d.line([(cx + 6, cy - 34 + bob), (cx + 8, cy - 20 + bob)], fill=C_TABBY_DARK, width=4)
    d.line([(cx + 16, cy - 35 + bob), (cx + 18, cy - 22 + bob)], fill=C_TABBY_DARK, width=4)
    d.line([(cx + 26, cy - 35 + bob), (cx + 27, cy - 22 + bob)], fill=C_TABBY_DARK, width=4)

    # Legs
    if pose == 'run':
        # Fast galloping paws
        if frame_idx % 2 == 0:
            d.line([(cx + 4, cy - 10), (cx - 6, cy + 2)], fill=C_TABBY_DARK, width=5)
            d.line([(cx + 34, cy - 10), (cx + 44, cy + 2)], fill=C_TABBY, width=5)
        else:
            d.line([(cx + 4, cy - 10), (cx + 8, cy - 2)], fill=C_TABBY_DARK, width=5)
            d.line([(cx + 34, cy - 10), (cx + 30, cy - 2)], fill=C_TABBY, width=5)
    elif pose == 'walk':
        step = frame_idx % 4
        if step in [0, 2]:
            d.line([(cx + 4, cy - 10 + bob), (cx - 2, cy)], fill=C_TABBY_DARK, width=5)
            d.line([(cx + 12, cy - 10 + bob), (cx + 14, cy - 2)], fill=C_TABBY, width=5)
            d.line([(cx + 34, cy - 10 + bob), (cx + 42, cy)], fill=C_TABBY, width=5)
            d.line([(cx + 28, cy - 10 + bob), (cx + 26, cy - 2)], fill=C_TABBY_DARK, width=5)
        else:
            d.line([(cx + 6, cy - 10 + bob), (cx + 6, cy)], fill=C_TABBY, width=5)
            d.line([(cx + 12, cy - 10 + bob), (cx + 12, cy)], fill=C_TABBY_DARK, width=5)
            d.line([(cx + 32, cy - 10 + bob), (cx + 32, cy)], fill=C_TABBY, width=5)
            d.line([(cx + 38, cy - 10 + bob), (cx + 38, cy)], fill=C_TABBY_DARK, width=5)
    else: # sit
        d.line([(cx + 8, cy - 10 + bob), (cx + 8, cy)], fill=C_TABBY, width=5)
        d.line([(cx + 32, cy - 10 + bob), (cx + 32, cy)], fill=C_TABBY, width=5)

    # Head
    hx, hy = cx + 36, cy - 38 + bob
    d.ellipse([hx - 2, hy - 4, hx + 32, hy + 26], fill=C_TABBY, outline=C_OUTLINE, width=3)
    d.polygon([(hx + 4, hy - 2), (hx + 8, hy - 16), (hx + 16, hy - 2)], fill=C_TABBY_DARK, outline=C_OUTLINE)
    d.polygon([(hx + 7, hy - 2), (hx + 9, hy - 11), (hx + 13, hy - 2)], fill=C_PINK)
    d.polygon([(hx + 18, hy - 2), (hx + 24, hy - 16), (hx + 29, hy - 2)], fill=C_TABBY_DARK, outline=C_OUTLINE)
    d.polygon([(hx + 20, hy - 2), (hx + 23, hy - 11), (hx + 26, hy - 2)], fill=C_PINK)
    d.ellipse([hx + 10, hy + 10, hx + 30, hy + 24], fill=C_WHITE)
    d.polygon([(hx + 18, hy + 12), (hx + 23, hy + 12), (hx + 20, hy + 15)], fill=C_PINK)
    d.ellipse([hx + 8, hy + 4, hx + 16, hy + 14], fill=C_EYE_GREEN, outline=C_OUTLINE, width=2)
    d.ellipse([hx + 10, hy + 6, hx + 14, hy + 12], fill=C_PUPIL)
    d.ellipse([hx + 22, hy + 4, hx + 30, hy + 14], fill=C_EYE_GREEN, outline=C_OUTLINE, width=2)
    d.ellipse([hx + 24, hy + 6, hx + 28, hy + 12], fill=C_PUPIL)


# Cat Walk
cat_walk_frames = []
for idx in range(4):
    comp = Image.new('RGBA', (CAT_W, CAT_H), (0, 0, 0, 0))
    d = ImageDraw.Draw(comp)
    draw_single_cat(d, cx=20, cy=78, frame_idx=idx, pose='walk')
    cat_walk_frames.append(comp)

cat_walk_frames[0].save(
    r'f:\Coding\Portofolio\public\assets\images\cat_walk.gif',
    save_all=True,
    append_images=cat_walk_frames[1:],
    duration=250,
    loop=0,
    disposal=2
)

# Cat Run (when catching up!)
cat_run_frames = []
for idx in range(4):
    comp = Image.new('RGBA', (CAT_W, CAT_H), (0, 0, 0, 0))
    d = ImageDraw.Draw(comp)
    draw_single_cat(d, cx=20, cy=78, frame_idx=idx, pose='run')
    cat_run_frames.append(comp)

cat_run_frames[0].save(
    r'f:\Coding\Portofolio\public\assets\images\cat_run.gif',
    save_all=True,
    append_images=cat_run_frames[1:],
    duration=130,
    loop=0,
    disposal=2
)

# Cat Jump
cat_jump_frames = []
for idx in range(4):
    comp = Image.new('RGBA', (CAT_W, CAT_H), (0, 0, 0, 0))
    d = ImageDraw.Draw(comp)
    draw_single_cat(d, cx=20, cy=78, frame_idx=idx, pose='jump')
    cat_jump_frames.append(comp)

cat_jump_frames[0].save(
    r'f:\Coding\Portofolio\public\assets\images\cat_jump.gif',
    save_all=True,
    append_images=cat_jump_frames[1:],
    duration=180,
    loop=0,
    disposal=2
)

# Cat Sit
cat_sit_frames = []
for idx in range(4):
    comp = Image.new('RGBA', (CAT_W, CAT_H), (0, 0, 0, 0))
    d = ImageDraw.Draw(comp)
    draw_single_cat(d, cx=20, cy=78, frame_idx=idx, pose='sit')
    cat_sit_frames.append(comp)

cat_sit_frames[0].save(
    r'f:\Coding\Portofolio\public\assets\images\cat_sit.gif',
    save_all=True,
    append_images=cat_sit_frames[1:],
    duration=300,
    loop=0,
    disposal=2
)

print('Separated sprites created successfully!')
