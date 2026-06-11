import glob
for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    content = content.replace(
        '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&display=swap" rel="stylesheet">',
        '<link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet">'
    )
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print("Fonts updated in HTML files")
