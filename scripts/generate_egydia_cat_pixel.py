from PIL import Image, ImageDraw

def draw_egydia(d, x, y, pose='stand', frame=0):
    # Palette based on reference photos
    C_OUTLINE = (18, 20, 28, 255)
    C_HIJAB = (24, 24, 30, 255)
    C_HIJAB_LIGHT = (45, 45, 55, 255)
    C_HIJAB_DARK = (14, 14, 18, 255)

    C_SKIN = (255, 222, 195, 255)
    C_SKIN_SHADOW = (235, 195, 168, 255)
    C_BLUSH = (255, 175, 175, 255)
    C_EYE = (32, 26, 28, 255)
    C_EYE_SHINE = (255, 255, 255, 255)
    C_LIP = (235, 115, 120, 255)

    # Glasses: Iconic round black glasses
    C_GLASSES = (20, 20, 24, 255)
    C_GLASSES_SHINE = (210, 235, 255, 180)

    # Shirt: Blue striped shirt from photo
    C_SHIRT_BLUE = (68, 128, 210, 255)
    C_SHIRT_WHITE = (240, 245, 255, 255)
    C_SHIRT_SHADOW = (48, 98, 175, 255)

    # Pants & Shoes
    C_PANTS = (35, 40, 52, 255)
    C_SHOE = (245, 245, 250, 255)

    bob = 0
    if pose in ['walk', 'run']:
        bob = 1 if frame % 2 == 1 else 0

    # 1. HIJAB HEAD & DRAPE
    # Drape behind back
    d.rectangle([x + 6, y + 10 + bob, x + 18, y + 26 + bob], fill=C_HIJAB)
    # Hijab main hood
    d.rectangle([x + 4, y + 2 + bob, x + 20, y + 15 + bob], fill=C_HIJAB, outline=C_OUTLINE)
    d.rectangle([x + 5, y + 3 + bob, x + 19, y + 14 + bob], fill=C_HIJAB)
    # Hijab top highlight
    d.line([(x + 8, y + 3 + bob), (x + 16, y + 3 + bob)], fill=C_HIJAB_LIGHT)

    # 2. FACE
    d.rectangle([x + 7, y + 6 + bob, x + 17, y + 13 + bob], fill=C_SKIN)
    d.point([(x + 6, y + 8 + bob), (x + 18, y + 8 + bob)], fill=C_SKIN)
    # Chin
    d.rectangle([x + 9, y + 14 + bob, x + 15, y + 14 + bob], fill=C_SKIN)

    # 3. ICONIC ROUND GLASSES
    # Left round frame
    d.rectangle([x + 7, y + 8 + bob, x + 11, y + 11 + bob], outline=C_GLASSES)
    d.point([(x + 8, y + 8 + bob), (x + 10, y + 8 + bob)], fill=C_GLASSES_SHINE)
    # Right round frame
    d.rectangle([x + 13, y + 8 + bob, x + 17, y + 11 + bob], outline=C_GLASSES)
    d.point([(x + 14, y + 8 + bob), (x + 16, y + 8 + bob)], fill=C_GLASSES_SHINE)
    # Bridge
    d.line([(x + 11, y + 9 + bob), (x + 13, y + 9 + bob)], fill=C_GLASSES)

    # 4. EYES (behind glasses)
    if pose == 'blink' or (pose == 'cuddle' and frame % 4 == 2):
        d.line([(x + 8, y + 9 + bob), (x + 10, y + 9 + bob)], fill=C_EYE)
        d.line([(x + 14, y + 9 + bob), (x + 16, y + 9 + bob)], fill=C_EYE)
    else:
        d.point([(x + 9, y + 9 + bob), (x + 15, y + 9 + bob)], fill=C_EYE)
        d.point([(x + 9, y + 10 + bob), (x + 15, y + 10 + bob)], fill=C_EYE)
        d.point([(x + 8, y + 9 + bob), (x + 14, y + 9 + bob)], fill=C_EYE_SHINE)

    # Blush & Smile
    d.point([(x + 7, y + 12 + bob), (x + 17, y + 12 + bob)], fill=C_BLUSH)
    d.line([(x + 11, y + 13 + bob), (x + 13, y + 13 + bob)], fill=C_LIP)

    # Hijab wrap under chin and chest drape (pashmina fold)
    d.rectangle([x + 8, y + 15 + bob, x + 16, y + 18 + bob], fill=C_HIJAB_DARK, outline=C_OUTLINE)
    d.line([(x + 10, y + 18 + bob), (x + 12, y + 25 + bob)], fill=C_HIJAB_LIGHT, width=2)

    # 5. BLUE STRIPED SHIRT (Torso)
    d.rectangle([x + 6, y + 18 + bob, x + 18, y + 27 + bob], fill=C_SHIRT_BLUE, outline=C_OUTLINE)
    # Vertical stripes
    for sx in [x + 8, x + 11, x + 14, x + 16]:
        d.line([(sx, y + 19 + bob), (sx, y + 26 + bob)], fill=C_SHIRT_WHITE)

    # 6. ARMS & HANDS
    if pose == 'wave':
        # Left arm relaxed
        d.rectangle([x + 4, y + 19 + bob, x + 6, y + 26 + bob], fill=C_SHIRT_BLUE, outline=C_OUTLINE)
        d.rectangle([x + 4, y + 26 + bob, x + 6, y + 28 + bob], fill=C_SKIN)
        # Right arm waving high!
        wave_dy = -3 if frame % 2 == 0 else -1
        d.line([(x + 18, y + 19 + bob), (x + 22, y + 15 + wave_dy), (x + 24, y + 9 + wave_dy)], fill=C_SHIRT_BLUE, width=2)
        d.rectangle([x + 23, y + 7 + wave_dy, x + 26, y + 10 + wave_dy], fill=C_SKIN, outline=C_OUTLINE)
        # Sparkle near waving hand
        d.point([(x + 27, y + 6 + wave_dy), (x + 25, y + 4 + wave_dy)], fill=(255, 215, 0, 255))
    elif pose == 'cuddle':
        # Arms curved holding the cat in front of chest!
        d.rectangle([x + 5, y + 20 + bob, x + 9, y + 25 + bob], fill=C_SHIRT_BLUE)
        d.rectangle([x + 15, y + 20 + bob, x + 19, y + 25 + bob], fill=C_SHIRT_BLUE)
        d.rectangle([x + 7, y + 25 + bob, x + 17, y + 27 + bob], fill=C_SKIN, outline=C_OUTLINE)
    elif pose == 'walk':
        if frame % 4 in [0, 1]:
            # Arm forward
            d.line([(x + 5, y + 19 + bob), (x + 3, y + 25 + bob)], fill=C_SHIRT_BLUE, width=2)
            d.point([(x + 3, y + 26 + bob)], fill=C_SKIN)
            d.line([(x + 18, y + 19 + bob), (x + 20, y + 24 + bob)], fill=C_SHIRT_BLUE, width=2)
            d.point([(x + 20, y + 25 + bob)], fill=C_SKIN)
        else:
            # Arm backward
            d.line([(x + 5, y + 19 + bob), (x + 7, y + 25 + bob)], fill=C_SHIRT_BLUE, width=2)
            d.point([(x + 7, y + 26 + bob)], fill=C_SKIN)
            d.line([(x + 18, y + 19 + bob), (x + 16, y + 24 + bob)], fill=C_SHIRT_BLUE, width=2)
            d.point([(x + 16, y + 25 + bob)], fill=C_SKIN)
    elif pose == 'run':
        if frame % 2 == 0:
            d.line([(x + 4, y + 19 + bob), (x + 1, y + 23 + bob)], fill=C_SHIRT_BLUE, width=2)
            d.line([(x + 18, y + 19 + bob), (x + 22, y + 23 + bob)], fill=C_SHIRT_BLUE, width=2)
        else:
            d.line([(x + 4, y + 19 + bob), (x + 7, y + 23 + bob)], fill=C_SHIRT_BLUE, width=2)
            d.line([(x + 18, y + 19 + bob), (x + 15, y + 23 + bob)], fill=C_SHIRT_BLUE, width=2)
    else:
        # Stand/idle hands
        d.rectangle([x + 4, y + 19 + bob, x + 6, y + 26 + bob], fill=C_SHIRT_BLUE, outline=C_OUTLINE)
        d.rectangle([x + 4, y + 26 + bob, x + 6, y + 28 + bob], fill=C_SKIN)
        d.rectangle([x + 18, y + 19 + bob, x + 20, y + 26 + bob], fill=C_SHIRT_BLUE, outline=C_OUTLINE)
        d.rectangle([x + 18, y + 26 + bob, x + 20, y + 28 + bob], fill=C_SKIN)

    # 7. LEGS & SHOES
    if pose == 'walk':
        step = frame % 4
        if step == 0:
            # Left leg forward, right leg back
            d.rectangle([x + 7, y + 28, x + 10, y + 36], fill=C_PANTS, outline=C_OUTLINE)
            d.rectangle([x + 6, y + 36, x + 10, y + 38], fill=C_SHOE)
            d.rectangle([x + 14, y + 28, x + 17, y + 35], fill=C_PANTS, outline=C_OUTLINE)
            d.rectangle([x + 15, y + 35, x + 19, y + 37], fill=C_SHOE)
        elif step == 1 or step == 3:
            # Passing step
            d.rectangle([x + 8, y + 28, x + 11, y + 37], fill=C_PANTS, outline=C_OUTLINE)
            d.rectangle([x + 8, y + 37, x + 12, y + 39], fill=C_SHOE)
            d.rectangle([x + 13, y + 28, x + 16, y + 37], fill=C_PANTS, outline=C_OUTLINE)
            d.rectangle([x + 13, y + 37, x + 17, y + 39], fill=C_SHOE)
        elif step == 2:
            # Right leg forward, left leg back
            d.rectangle([x + 7, y + 28, x + 10, y + 35], fill=C_PANTS, outline=C_OUTLINE)
            d.rectangle([x + 5, y + 35, x + 9, y + 37], fill=C_SHOE)
            d.rectangle([x + 14, y + 28, x + 17, y + 36], fill=C_PANTS, outline=C_OUTLINE)
            d.rectangle([x + 14, y + 36, x + 18, y + 38], fill=C_SHOE)
    elif pose == 'run':
        if frame % 2 == 0:
            d.line([(x + 8, y + 28), (x + 4, y + 34), (x + 3, y + 37)], fill=C_PANTS, width=3)
            d.rectangle([x + 1, y + 36, x + 4, y + 38], fill=C_SHOE)
            d.line([(x + 15, y + 28), (x + 19, y + 33), (x + 22, y + 36)], fill=C_PANTS, width=3)
            d.rectangle([x + 21, y + 35, x + 24, y + 37], fill=C_SHOE)
        else:
            d.line([(x + 8, y + 28), (x + 12, y + 33), (x + 15, y + 36)], fill=C_PANTS, width=3)
            d.rectangle([x + 14, y + 35, x + 17, y + 37], fill=C_SHOE)
            d.line([(x + 15, y + 28), (x + 10, y + 34), (x + 8, y + 37)], fill=C_PANTS, width=3)
            d.rectangle([x + 7, y + 36, x + 10, y + 38], fill=C_SHOE)
    else:
        # Standing straight
        d.rectangle([x + 8, y + 28 + bob, x + 11, y + 37], fill=C_PANTS, outline=C_OUTLINE)
        d.rectangle([x + 7, y + 37, x + 11, y + 39], fill=C_SHOE)
        d.rectangle([x + 13, y + 28 + bob, x + 16, y + 37], fill=C_PANTS, outline=C_OUTLINE)
        d.rectangle([x + 13, y + 37, x + 17, y + 39], fill=C_SHOE)


def draw_cat(d, x, y, pose='stand', frame=0):
    # Palette of Tabby Cat from photo
    C_OUTLINE = (20, 16, 12, 255)
    C_TABBY_BASE = (158, 125, 88, 255)
    C_TABBY_LIGHT = (195, 160, 120, 255)
    C_TABBY_DARK = (75, 55, 38, 255)
    C_WHITE_FUR = (248, 245, 240, 255)
    C_PINK_NOSE = (245, 160, 170, 255)
    C_CAT_EYE = (90, 175, 85, 255)
    C_CAT_PUPIL = (20, 25, 20, 255)

    bob = 0
    if pose in ['walk', 'run']:
        bob = 1 if frame % 2 == 1 else 0

    if pose == 'held':
        # Cat is held by Egydia in her arms
        cx, cy = x, y
        # Cat body curled in arms
        d.rectangle([cx, cy + 2, cx + 12, cy + 10], fill=C_TABBY_BASE, outline=C_OUTLINE)
        # White belly/chest
        d.rectangle([cx + 3, cy + 5, cx + 9, cy + 10], fill=C_WHITE_FUR)
        # Stripes
        d.line([(cx + 2, cy + 3), (cx + 2, cy + 5)], fill=C_TABBY_DARK)
        d.line([(cx + 10, cy + 3), (cx + 10, cy + 5)], fill=C_TABBY_DARK)
        # Cat head resting
        d.rectangle([cx + 8, cy - 2, cx + 15, cy + 5], fill=C_TABBY_BASE, outline=C_OUTLINE)
        # Ears
        d.polygon([(cx + 9, cy - 2), (cx + 11, cy - 5), (cx + 12, cy - 2)], fill=C_TABBY_DARK)
        d.polygon([(cx + 13, cy - 2), (cx + 15, cy - 5), (cx + 15, cy - 2)], fill=C_TABBY_DARK)
        # White muzzle & nose
        d.rectangle([cx + 12, cy + 2, cx + 15, cy + 4], fill=C_WHITE_FUR)
        d.point([(cx + 13, cy + 2)], fill=C_PINK_NOSE)
        # Sleeping/happy closed eye
        d.line([(cx + 10, cy + 1), (cx + 12, cy + 1)], fill=C_OUTLINE)
        # Curled tail hanging down
        tail_wave = frame % 2
        d.line([(cx - 1, cy + 6), (cx - 3, cy + 9 + tail_wave), (cx - 2, cy + 12 + tail_wave)], fill=C_TABBY_DARK, width=2)
        # Little heart bubble
        d.polygon([(cx + 15, cy - 6), (cx + 17, cy - 8), (cx + 19, cy - 6), (cx + 17, cy - 4)], fill=(255, 105, 135, 255))
        return

    # Cat standing / walking on ground
    # 1. BODY
    d.rectangle([x + 3, y + 6 + bob, x + 14, y + 14 + bob], fill=C_TABBY_BASE, outline=C_OUTLINE)
    # White belly
    d.rectangle([x + 5, y + 11 + bob, x + 11, y + 14 + bob], fill=C_WHITE_FUR)
    # Tabby stripes on back
    d.line([(x + 5, y + 6 + bob), (x + 5, y + 9 + bob)], fill=C_TABBY_DARK)
    d.line([(x + 8, y + 6 + bob), (x + 8, y + 9 + bob)], fill=C_TABBY_DARK)
    d.line([(x + 11, y + 6 + bob), (x + 11, y + 9 + bob)], fill=C_TABBY_DARK)

    # 2. HEAD
    d.rectangle([x + 12, y + 2 + bob, x + 19, y + 9 + bob], fill=C_TABBY_BASE, outline=C_OUTLINE)
    # Ears
    d.polygon([(x + 13, y + 2 + bob), (x + 14, y - 1 + bob), (x + 16, y + 2 + bob)], fill=C_TABBY_DARK)
    d.polygon([(x + 17, y + 2 + bob), (x + 18, y - 1 + bob), (x + 20, y + 2 + bob)], fill=C_TABBY_DARK)
    # White muzzle
    d.rectangle([x + 15, y + 6 + bob, x + 19, y + 8 + bob], fill=C_WHITE_FUR)
    d.point([(x + 17, y + 6 + bob)], fill=C_PINK_NOSE)

    # Cat eyes
    if pose == 'sleep':
        d.line([(x + 14, y + 5 + bob), (x + 16, y + 5 + bob)], fill=C_OUTLINE)
    else:
        d.rectangle([x + 14, y + 4 + bob, x + 16, y + 6 + bob], fill=C_CAT_EYE)
        d.point([(x + 15, y + 4 + bob), (x + 15, y + 5 + bob)], fill=C_CAT_PUPIL)

    # 3. TAIL (Animated sway)
    tail_step = frame % 4
    tail_pts = [
        (x + 3, y + 8 + bob),
        (x + 1, y + 4 - tail_step + bob),
        (x + 0, y + 1 - tail_step + bob)
    ]
    d.line(tail_pts, fill=C_TABBY_DARK, width=2)
    d.point([(x + 0, y + 0 - tail_step + bob)], fill=C_TABBY_LIGHT)

    # 4. PAWS / LEGS
    if pose == 'walk':
        if frame % 2 == 0:
            d.line([(x + 5, y + 14), (x + 4, y + 18)], fill=C_TABBY_BASE, width=2)
            d.point([(x + 4, y + 18)], fill=C_WHITE_FUR)
            d.line([(x + 12, y + 14), (x + 14, y + 18)], fill=C_TABBY_BASE, width=2)
            d.point([(x + 14, y + 18)], fill=C_WHITE_FUR)
        else:
            d.line([(x + 5, y + 14), (x + 6, y + 18)], fill=C_TABBY_BASE, width=2)
            d.point([(x + 6, y + 18)], fill=C_WHITE_FUR)
            d.line([(x + 12, y + 14), (x + 10, y + 18)], fill=C_TABBY_BASE, width=2)
            d.point([(x + 10, y + 18)], fill=C_WHITE_FUR)
    elif pose == 'run':
        if frame % 2 == 0:
            d.line([(x + 4, y + 14), (x + 1, y + 17)], fill=C_TABBY_BASE, width=2)
            d.line([(x + 13, y + 14), (x + 16, y + 17)], fill=C_TABBY_BASE, width=2)
        else:
            d.line([(x + 4, y + 14), (x + 6, y + 17)], fill=C_TABBY_BASE, width=2)
            d.line([(x + 13, y + 14), (x + 11, y + 17)], fill=C_TABBY_BASE, width=2)
    else:
        # Standing paws
        d.line([(x + 5, y + 14 + bob), (x + 5, y + 18)], fill=C_TABBY_BASE, width=2)
        d.point([(x + 5, y + 18)], fill=C_WHITE_FUR)
        d.line([(x + 12, y + 14 + bob), (x + 12, y + 18)], fill=C_TABBY_BASE, width=2)
        d.point([(x + 12, y + 18)], fill=C_WHITE_FUR)


def render_gif(frames_data, filename, scale=8, duration=200):
    W, H = 54, 44
    scaled_frames = []
    for f_info in frames_data:
        im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        d = ImageDraw.Draw(im)

        egydia_pose = f_info.get('egydia_pose', 'stand')
        cat_pose = f_info.get('cat_pose', 'stand')
        f_idx = f_info.get('frame', 0)

        if egydia_pose == 'cuddle':
            # Egydia holds the cat in her arms
            draw_egydia(d, 14, 4, pose='cuddle', frame=f_idx)
            draw_cat(d, 21, 21, pose='held', frame=f_idx)
        else:
            # Egydia on the left, Cat on the right
            draw_egydia(d, 8, 4, pose=egydia_pose, frame=f_idx)
            draw_cat(d, 32, 24, pose=cat_pose, frame=f_idx)

        sf = im.resize((W * scale, H * scale), Image.Resampling.NEAREST)
        scaled_frames.append(sf)

    scaled_frames[0].save(
        filename,
        save_all=True,
        append_images=scaled_frames[1:],
        duration=duration,
        loop=0,
        disposal=2
    )


# 1. WALK ANIMATION (Egydia & Cat walking together)
walk_frames = [
    {'egydia_pose': 'walk', 'cat_pose': 'walk', 'frame': 0},
    {'egydia_pose': 'walk', 'cat_pose': 'walk', 'frame': 1},
    {'egydia_pose': 'walk', 'cat_pose': 'walk', 'frame': 2},
    {'egydia_pose': 'walk', 'cat_pose': 'walk', 'frame': 3},
]
render_gif(walk_frames, r'f:\Coding\Portofolio\public\assets\images\egydia_cat_walk.gif', duration=180)

# 2. RUN ANIMATION (Egydia & Cat running together)
run_frames = [
    {'egydia_pose': 'run', 'cat_pose': 'run', 'frame': 0},
    {'egydia_pose': 'run', 'cat_pose': 'run', 'frame': 1},
    {'egydia_pose': 'run', 'cat_pose': 'run', 'frame': 2},
    {'egydia_pose': 'run', 'cat_pose': 'run', 'frame': 3},
]
render_gif(run_frames, r'f:\Coding\Portofolio\public\assets\images\egydia_cat_run.gif', duration=130)

# 3. WAVE ANIMATION (Egydia waves, Cat wags tail & blinks)
wave_frames = [
    {'egydia_pose': 'wave', 'cat_pose': 'stand', 'frame': 0},
    {'egydia_pose': 'wave', 'cat_pose': 'stand', 'frame': 1},
    {'egydia_pose': 'wave', 'cat_pose': 'stand', 'frame': 2},
    {'egydia_pose': 'wave', 'cat_pose': 'stand', 'frame': 3},
]
render_gif(wave_frames, r'f:\Coding\Portofolio\public\assets\images\egydia_cat_wave.gif', duration=220)

# 4. CUDDLE ANIMATION (Egydia holds cat in arms like photo!)
cuddle_frames = [
    {'egydia_pose': 'cuddle', 'cat_pose': 'held', 'frame': 0},
    {'egydia_pose': 'cuddle', 'cat_pose': 'held', 'frame': 1},
    {'egydia_pose': 'cuddle', 'cat_pose': 'held', 'frame': 2},
    {'egydia_pose': 'cuddle', 'cat_pose': 'held', 'frame': 3},
]
render_gif(cuddle_frames, r'f:\Coding\Portofolio\public\assets\images\egydia_cat_cuddle.gif', duration=240)

print('All 4 animations created successfully!')
