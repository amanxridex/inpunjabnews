# -*- coding: utf-8 -*-
with open('index.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace height: 100vh with height: 100dvh
css = css.replace(
    '.short-slide {\n    width: 100%;\n    height: 100vh;',
    '.short-slide {\n    width: 100%;\n    height: 100vh;\n    height: 100dvh;'
)

css = css.replace(
    '.short-bg {\n    flex: 0 0 50vh;',
    '.short-bg {\n    flex: 0 0 50dvh;'
)

# Add padding-bottom to short-content
css = css.replace(
    '.short-content {\n    flex: 1; /* Take the remaining 50% height */\n    padding: 30px 20px;',
    '.short-content {\n    flex: 1; /* Take the remaining 50% height */\n    padding: 30px 20px;\n    padding-bottom: 40px; /* Fix for mobile address bar */'
)

# Append the new buttons CSS
new_css = """
.short-actions {
    display: flex;
    gap: 12px;
    margin-top: auto;
}

.short-action-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    border: none;
    outline: none;
}

.btn-views {
    background: #f0f0f0;
    color: #333;
}

.btn-whatsapp {
    background: #25D366;
    color: white;
}
"""

with open('index.css', 'w', encoding='utf-8') as f:
    f.write(css + new_css)

print("Updated index.css")
