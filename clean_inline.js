const fs = require('fs');
['index.html', 'article.html'].forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(/<img alt="InPunjab News Logo" src="OFFICIAL LOGO.png" style="height: 48px;"\/>/g, '<img alt="InPunjab News Logo" src="OFFICIAL LOGO.png"/>');
    fs.writeFileSync(file, html);
    console.log('Fixed ' + file);
});
