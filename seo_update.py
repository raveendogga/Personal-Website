import glob
import re

for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Add favicon if not present
    if '<link rel="icon"' not in content:
        content = content.replace('</head>', '    <link rel="icon" type="image/x-icon" href="assets/favicon.ico">\n  </head>')
    
    # 2. Extract page name to make title more meaningful
    # Using the data-page attribute on body to determine the page type
    match = re.search(r'<body data-page="([^"]+)">', content)
    if match:
        page_key = match.group(1)
        if page_key == 'home':
            new_title = 'Dr. Dogga Raveendhra | Assistant Professor | NIT Warangal'
        else:
            page_title_map = {
                'education': 'Education',
                'experience': 'Work Experience',
                'publications': 'Publications',
                'awards': 'Awards & Honors',
                'projects': 'Sponsored Projects',
                'talks': 'Invited Talks',
                'reviewer': 'Reviewer Activity',
                'memberships': 'Professional Memberships',
                'thesis': 'Thesis Guidance',
                'courses': 'Courses Handled',
                'admin': 'Administrative Roles',
                'completeCv': 'Complete CV'
            }
            sub_title = page_title_map.get(page_key, page_key.title())
            new_title = f'{sub_title} | Dr. Dogga Raveendhra'
            
        content = re.sub(r'<title>.*?</title>', f'<title>{new_title}</title>', content)

    # 3. Ensure standard OG tags exist (index.html already has them, others might not)
    if '<meta property="og:title"' not in content:
        og_tags = f"""
    <meta name="description" content="Academic profile of Dr. Dogga Raveendhra, Assistant Professor, Electrical Engineering, NIT Warangal.">
    <meta property="og:title" content="{new_title}">
    <meta property="og:description" content="Power electronics, electric vehicles, renewable energy systems, converters, drives, and AI-enabled energy systems.">
    <meta property="og:image" content="assets/profile.png">
    <meta name="theme-color" content="#7f1146">
"""
        content = content.replace('<link rel="preconnect" href="https://fonts.googleapis.com">', f'{og_tags}\n    <link rel="preconnect" href="https://fonts.googleapis.com">')

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("SEO update applied to all HTML files.")
