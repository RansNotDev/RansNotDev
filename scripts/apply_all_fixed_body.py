import os
from PIL import Image

os.makedirs('public/profile-gaze-fixed', exist_ok=True)

# Master body is center.webp (800x800)
master_center = Image.open('public/profile-gaze/center.webp').convert('RGBA')
w, h = master_center.size

# Head sources
gen_right_raw = Image.open(r'C:\Users\ranyb\.gemini\antigravity\brain\62a8bc91-e583-4fdd-8839-6b8f83073c34\rany_head_fixed_right_1791685128021.png').convert('RGBA')
gen_right = gen_right_raw.resize((800, 800), Image.Resampling.LANCZOS)
gen_left = gen_right.transpose(Image.FLIP_LEFT_RIGHT)

sources = {
    'center': master_center,
    'right': gen_right,
    'left': gen_left,
    'up': Image.open('public/profile-gaze/up.webp').convert('RGBA'),
    'down': Image.open('public/profile-gaze/down.webp').convert('RGBA'),
    'up-left': Image.open('public/profile-gaze/up-left.webp').convert('RGBA'),
    'up-right': Image.open('public/profile-gaze/up-right.webp').convert('RGBA'),
    'down-left': Image.open('public/profile-gaze/down-left.webp').convert('RGBA'),
    'down-right': Image.open('public/profile-gaze/down-right.webp').convert('RGBA'),
}

# Vertical offsets to align neck perfectly with master collar:
offsets = {
    'center': (0, 0),
    'right': (0, 0),
    'left': (0, 0),
    'up': (0, 0),
    'down': (0, 38),
    'up-left': (0, 0),
    'up-right': (0, 0),
    'down-left': (0, 0),
    'down-right': (0, 0),
}

def render_fixed_body(head_img, offset):
    ox, oy = offset
    
    positioned_head = Image.new('RGBA', (w, h), (0, 0, 0, 255))
    positioned_head.paste(head_img, (ox, oy))
    
    out = Image.new('RGBA', (w, h))
    
    for y in range(h):
        for x in range(w):
            c_px = master_center.getpixel((x, y))
            h_px = positioned_head.getpixel((x, y))
            
            # Master Foreground Rule:
            # 1. Lower suit & tie (y >= 600)
            # 2. Crisp white collar in center (y >= 480 and c_px is white)
            # 3. Satin black tie knot (y >= 570 and 370 <= x <= 430 and c_px is dark)
            # 4. Shoulders (y >= 460 and (x < 260 or x > 540) and c_px is dark suit)
            is_foreground = False
            if y >= 600:
                is_foreground = True
            elif y >= 480 and c_px[0] > 165 and c_px[1] > 165 and c_px[2] > 165:
                is_foreground = True
            elif y >= 570 and 370 <= x <= 430 and c_px[0] < 50:
                is_foreground = True
            elif y >= 460 and (x < 260 or x > 540) and c_px[0] < 50:
                is_foreground = True
                
            if is_foreground:
                out.putpixel((x, y), c_px)
            else:
                out.putpixel((x, y), h_px)
                
    return out

for name, img in sources.items():
    print(f'Rendering {name} with 100% fixed body...')
    res = render_fixed_body(img, offsets[name])
    res.convert('RGB').save(f'public/profile-gaze-fixed/{name}.webp', 'WEBP', quality=92)
    res.save(f'public/profile-gaze-fixed/{name}.png')

print('All 9 fixed-body frames completed successfully!')
