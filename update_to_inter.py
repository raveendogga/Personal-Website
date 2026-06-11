import glob
for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace PT Sans/Merriweather with Inter
    old_font = '<link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet">'
    new_font = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">'
    content = content.replace(old_font, new_font)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print("Fonts updated to Inter in all HTML files.")
