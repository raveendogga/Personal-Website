import glob
import os

files = glob.glob('*.html')
content_to_find = '<link rel="stylesheet" href="styles.css">'
content_to_replace = """<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">"""

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    new_content = content.replace(content_to_find, content_to_replace)
    with open(f, 'w', encoding='utf-8') as file:
        file.write(new_content)
print(f"Updated {len(files)} files.")
