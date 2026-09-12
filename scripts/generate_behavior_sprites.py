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


# 1. EGY IDLE STAND & LISTEN TO MUSIC (Head bobbing with music notes)
raw0 = Image.open(r'f:\Coding\Portofolio\public\assets\images\walk_full_0.png')
trans0 = make_transparent(raw0)
cropped_base = trans0.crop((40, 15, 220, 325))

W, H = 180, 310
idle_frames = []
for idx in range(4):
    comp = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    bob = 0 if idx % 2 == 0 else 2
    comp.paste(cropped_base, (0, bob), cropped_base)
    d = ImageDraw.Draw(comp)
    draw_natural_glasses_side(d, x_off=-40, y_off=-15 + bob)

    # Pixel Music Note floating up
    note_y = 60 - idx * 12
    note_x = 135 + (idx % 2) * 8
    # Draw cute musical note ♪
    d.rectangle([note_x, note_y + 4, note_x + 4, note_y + 8], fill=(129, 140, 248, 255))
    d.line([(note_x + 4, note_y + 4), (note_x + 4, note_y - 8)], fill=(129, 140, 248, 255), width=2)
    d.line([(note_x + 4, note_y - 8), (note_x + 9, note_y - 5)], fill=(129, 140, 248, 255), width=2)

    idle_frames.append(comp)

idle_frames[0].save(
    r'f:\Coding\Portofolio\public\assets\images\egy_idle_music.gif',
    save_all=True,
    append_images=idle_frames[1:],
    duration=320,
    loop=0,
    disposal=2
)


# 2. EGY PETTING CAT (Bending down to pet cat with hearts)
pet_frames = []
for idx in range(4):
    comp = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    # Slight downward bend
    bend_dy = 6 if idx % 2 == 0 else 8
    comp.paste(cropped_base, (0, bend_dy), cropped_base)
    d = ImageDraw.Draw(comp)
    draw_natural_glasses_side(d, x_off=-40, y_off=-15 + bend_dy)

    # Hand extended forward to pet cat
    hand_x = 135 + (idx % 2) * 3
    hand_y = 195 + bend_dy
    d.line([(100, 180 + bend_dy), (hand_x - 10, hand_y - 5), (hand_x, hand_y)], fill=(240, 245, 255, 255), width=8)
    d.ellipse([hand_x - 4, hand_y - 4, hand_x + 8, hand_y + 6], fill=(255, 222, 195, 255))

    # Heart floating above cat
    heart_y = 130 - idx * 8
    d.polygon([(145, heart_y + 4), (150, heart_y), (155, heart_y + 4), (150, heart_y + 10)], fill=(251, 113, 133, 255))

    pet_frames.append(comp)

pet_frames[0].save(
    r'f:\Coding\Portofolio\public\assets\images\egy_pet_cat.gif',
    save_all=True,
    append_images=pet_frames[1:],
    duration=300,
    loop=0,
    disposal=2
)


# 3. CAT PURRING & HAPPY (Eyes closed in joy, tail wagging, heart)
CAT_W, CAT_H = 100, 85

def draw_happy_cat(d, cx, cy, idx):
    C_OUTLINE = (22, 18, 14, 255)
    C_TABBY = (168, 132, 92, 255)
    C_TABBY_LIGHT = (205, 168, 125, 255)
    C_TABBY_DARK = (80, 58, 40, 255)
    C_WHITE = (248, 248, 252, 255)
    C_PINK = (245, 165, 175, 255)

    bob = 1 if idx % 2 == 1 else 0

    # Tail happy sway
    tail_swing = [-6, -2, 5, 1][idx % 4]
    tail_pts = [
        (cx - 2, cy - 26 + bob),
        (cx - 8, cy - 38 + bob + tail_swing),
        (cx - 14, cy - 50 + bob + tail_swing * 2),
        (cx - 10, cy - 56 + bob + tail_swing * 2)
    ]
    d.line(tail_pts, fill=C_TABBY_DARK, width=6)
    d.point([(cx - 10, cy - 56 + bob + tail_swing * 2)], fill=C_WHITE)

    # Body resting comfortably
    d.ellipse([cx - 2, cy - 36 + bob, cx + 46, cy - 4 + bob], fill=C_TABBY, outline=C_OUTLINE, width=3)
    d.ellipse([cx + 12, cy - 20 + bob, cx + 40, cy - 4 + bob], fill=C_WHITE)
    d.line([(cx + 6, cy - 34 + bob), (cx + 8, cy - 20 + bob)], fill=C_TABBY_DARK, width=4)
    d.line([(cx + 16, cy - 35 + bob), (cx + 18, cy - 22 + bob)], fill=C_TABBY_DARK, width=4)

    # Front & back paws neatly tucked
    d.ellipse([cx + 2, cy - 8 + bob, cx + 18, cy], fill=C_WHITE)
    d.ellipse([cx + 28, cy - 8 + bob, cx + 44, cy], fill=C_WHITE)

    # Head tilted happily
    hx, hy = cx + 34, cy - 36 + bob
    d.ellipse([hx - 2, hy - 4, hx + 32, hy + 26], fill=C_TABBY, outline=C_OUTLINE, width=3)
    d.polygon([(hx + 4, hy - 2), (hx + 8, hy - 16), (hx + 16, hy - 2)], fill=C_TABBY_DARK, outline=C_OUTLINE)
    d.polygon([(hx + 7, hy - 2), (hx + 9, hy - 11), (hx + 13, hy - 2)], fill=C_PINK)
    d.polygon([(hx + 18, hy - 2), (hx + 24, hy - 16), (hx + 29, hy - 2)], fill=C_TABBY_DARK, outline=C_OUTLINE)
    d.polygon([(hx + 20, hy - 2), (hx + 23, hy - 11), (hx + 26, hy - 2)], fill=C_PINK)

    d.ellipse([hx + 10, hy + 10, hx + 30, hy + 24], fill=C_WHITE)
    d.polygon([(hx + 18, hy + 12), (hx + 23, hy + 12), (hx + 20, hy + 15)], fill=C_PINK)

    # Happy closed eyes ^ ^ (purring)
    d.line([(hx + 8, hy + 8), (hx + 11, hy + 5), (hx + 14, hy + 8)], fill=C_OUTLINE, width=2)
    d.line([(hx + 20, hy + 8), (hx + 23, hy + 5), (hx + 26, hy + 8)], fill=C_OUTLINE, width=2)

    # Purr vibration lines ~ ~
    d.line([(hx + 34, hy - 2), (hx + 38, hy - 4)], fill=(251, 146, 60, 255), width=2)
    d.line([(hx + 36, hy + 4), (hx + 40, hy + 2)], fill=(251, 146, 60, 255), width=2)

cat_purr_frames = []
for idx in range(4):
    comp = Image.new('RGBA', (CAT_W, CAT_H), (0, 0, 0, 0))
    d = ImageDraw.Draw(comp)
    draw_happy_cat(d, cx=20, cy=78, idx=idx)
    cat_purr_frames.append(comp)

cat_purr_frames[0].save(
    r'f:\Coding\Portofolio\public\assets\images\cat_purr.gif',
    save_all=True,
    append_images=cat_purr_frames[1:],
    duration=280,
    loop=0,
    disposal=2
)

print('Natural behavioral sprites generated successfully!')
