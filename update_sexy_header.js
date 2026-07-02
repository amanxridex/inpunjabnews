const fs = require('fs');

try {
    let css = fs.readFileSync('index.css', 'utf8');
    
    // 1. Update top bar background and text colors
    const topBarRegex = /\.top-bar\s*\{[^}]+\}/;
    css = css.replace(topBarRegex, `.top-bar {
            background: linear-gradient(90deg, #0f172a 0%, #1e1b4b 100%);
            padding: 6px 0;
            font-size: 11px;
            color: #e2e8f0;
            border-bottom: none;
        }`);
        
    css = css.replace(/\.top-bar-right a\s*\{[^}]+\}/, `.top-bar-right a {
            color: #cbd5e1;
            text-decoration: none;
            transition: color 0.2s;
            font-size: 11px;
            font-weight: 500;
        }`);
        
    css = css.replace(/\.top-bar-right a:hover\s*\{[^}]+\}/, `.top-bar-right a:hover {
            color: #fff;
        }`);
        
    css = css.replace(/\.weather-badge, \.currency-badge\s*\{[^}]+\}/, `.weather-badge, .currency-badge {
            color: #fff;
            background: rgba(255, 255, 255, 0.15);
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
        }`);

    // 2. Enlarge Logo
    css = css.replace(/\.logo-block img\s*\{[^}]+\}/, `.logo-block img {
            height: 72px !important;
            transition: transform 0.3s;
        }`);

    // 3. Search Box styling
    css = css.replace(/\.search-box\s*\{[^}]+\}/, `.search-box {
            height: 38px;
            width: 240px;
            padding: 0 44px 0 16px;
            border-radius: 19px;
            border: 2px solid transparent;
            background: #ffffff;
            color: #0f172a;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            outline: none;
        }`);
        
    css = css.replace(/\.search-box:focus\s*\{[^}]+\}/, `.search-box:focus {
            background: #ffffff;
            border-color: var(--saffron);
            box-shadow: 0 6px 20px rgba(255, 107, 0, 0.2);
            width: 290px;
        }`);
        
    css = css.replace(/\.search-btn\s*\{[^}]+\}/, `.search-btn {
            background: var(--saffron);
            border: none;
            color: #fff;
            cursor: pointer;
            position: absolute;
            right: 6px;
            top: 50%;
            transform: translateY(-50%);
            width: 28px;
            height: 28px;
            border-radius: 50%;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }`);
        
    css = css.replace(/\.search-btn:hover\s*\{[^}]+\}/, `.search-btn:hover {
            background: #d85c00;
            transform: translateY(-50%) scale(1.05);
        }`);

    // 4. Vibrant Nav Items
    css = css.replace(/\.nav-item\s*\{[^}]+\}/, `.nav-item {
            color: var(--text-primary);
            text-decoration: none;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0.2px;
            padding: 8px 18px;
            border-radius: 20px;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            white-space: nowrap;
            cursor: pointer;
            background: transparent;
        }`);
        
    css = css.replace(/\.nav-item:hover,\s*\.nav-item\.active\s*\{[^}]+\}/, `.nav-item:hover,
        .nav-item.active {
            color: #ffffff !important;
            background: linear-gradient(135deg, #2563eb, #3b82f6);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            transform: translateY(-2px);
        }`);
        
    // Add breaking nav-item explicit override
    if (!css.includes('.nav-item.breaking:hover')) {
        css += `
        .nav-item.breaking {
            color: #dc2626;
        }
        .nav-item.breaking:hover, .nav-item.breaking.active {
            background: linear-gradient(135deg, #dc2626, #ef4444) !important;
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3) !important;
        }`;
    }

    // 5. Sponsored Label Update
    css = css.replace(/\.header-ad-banner\s*\{[^}]+\}/, `.header-ad-banner {
            display: flex;
            align-items: center;
            gap: 12px;
            background: linear-gradient(135deg, #fffbeb, #fef3c7);
            border: 1px solid #fde68a;
            padding: 8px 18px;
            border-radius: 30px;
            text-align: center;
            flex-shrink: 0;
            margin: 0 20px;
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15);
        }`);
        
    css = css.replace(/\.ad-label\s*\{[^}]+\}/, `.ad-label {
            color: #b45309;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 800;
            background: #fef08a;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 10px;
        }`);
        
    css = css.replace(/\.ad-content\s*\{[^}]+\}/, `.ad-content {
            font-size: 14px;
            font-weight: 800;
            color: #92400e;
        }`);
        
    // Dark mode specific adjustments for the new vibrant elements
    if (!css.includes('[data-theme="dark"] .search-box')) {
        css += `
        [data-theme="dark"] .search-box {
            background: #1e293b;
            color: #f8fafc;
            border-color: #334155;
        }
        [data-theme="dark"] .nav-item {
            color: #e2e8f0;
        }
        [data-theme="dark"] .header-ad-banner {
            background: linear-gradient(135deg, #422006, #78350f);
            border-color: #92400e;
        }
        [data-theme="dark"] .ad-label {
            background: #92400e;
            color: #fef3c7;
        }
        [data-theme="dark"] .ad-content {
            color: #fef3c7;
        }`;
    }

    fs.writeFileSync('index.css', css);
    console.log("Updated index.css");
} catch(e) {
    console.error(e);
}
