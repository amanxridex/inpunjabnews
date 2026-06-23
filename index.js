// ── REGION DATA ──
        const regionData = {
            amritsar: [
                { cat: 'Amritsar', title: 'Sri Harmandir Sahib Trust Announces ₹500 Crore Heritage Conservation Project Spanning Next 5 Years', time: '2 hrs ago', img: 'https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?w=400&q=70' },
                { cat: 'Amritsar', title: 'Wagah Border Ceremony Draws Record 50,000 Visitors; Tourism Ministry Plans Expansion of Viewing Area', time: '4 hrs ago', img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&q=70' },
                { cat: 'Amritsar', title: 'Amritsar Airport Handles Millionth International Passenger of 2026 — New Dubai and London Flights Announced', time: '6 hrs ago', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=70' },
            ],
            ludhiana: [
                { cat: 'Ludhiana', title: 'Ludhiana Bicycle Industry Rebounds with ₹800 Crore Export Orders — Hero Cycles Adds 2,000 Jobs', time: '3 hrs ago', img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=70' },
                { cat: 'Ludhiana', title: 'Smart City Mission: Ludhiana Gets ₹340 Crore for Integrated Traffic and Waste Management System', time: '5 hrs ago', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=70' },
                { cat: 'Ludhiana', title: 'Punjab Agricultural University Ludhiana Develops Drought-Resistant Wheat Variety — Trial Shows 35% Higher Yield', time: '7 hrs ago', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=70' },
            ],
            chandigarh: [
                { cat: 'Chandigarh', title: 'Chandigarh Administration Announces EV-Only Zone in Sector 17 — Pilot Starts Next Month', time: '1 hr ago', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=70' },
                { cat: 'Chandigarh', title: 'Sukhna Lake Revitalization: ₹150 Crore Eco-Tourism Project Gets Environment Clearance', time: '3 hrs ago', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=70' },
                { cat: 'Chandigarh', title: 'PGI Chandigarh Installs India\'s First AI-Powered Cardiac Surgery Robot — Successful First Operation Performed', time: '5 hrs ago', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=70' },
            ],
            jalandhar: [
                { cat: 'Jalandhar', title: 'Jalandhar Sports Goods Industry Records ₹1,200 Crore Export — Supplies 40% of FIFA World Cup Equipment', time: '2 hrs ago', img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=70' },
                { cat: 'Jalandhar', title: 'NRI Community Donates ₹75 Crore for New Jalandhar Cancer Hospital — Construction Begins Next Month', time: '4 hrs ago', img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=70' },
                { cat: 'Jalandhar', title: 'Jalandhar Heritage Walk Project to Restore 12 Colonial-Era Buildings in Old City Area', time: '6 hrs ago', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=70' },
            ],
            patiala: [
                { cat: 'Patiala', title: 'Patiala Royal Palace Complex Gets UNESCO World Heritage Site Nomination — Decision Expected Next Year', time: '3 hrs ago', img: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&q=70' },
                { cat: 'Patiala', title: 'Rajindra Hospital Patiala to Open Punjab\'s Largest Burn and Trauma Center with 200 New Beds', time: '5 hrs ago', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=70' },
                { cat: 'Patiala', title: 'Punjabi University Patiala Launches Free Online Courses in Punjabi Language and Literature for Global Diaspora', time: '7 hrs ago', img: 'https://images.unsplash.com/photo-1565843708714-52ecf69ab81f?w=400&q=70' },
            ],
            mohali: [
                { cat: 'Mohali', title: 'Mohali IT City Attracts 12 Fortune 500 Companies — 18,000 Tech Jobs Expected by End of Year', time: '2 hrs ago', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=70' },
                { cat: 'Mohali', title: 'PCA Stadium Mohali to Host 3 India-Pakistan T20 Matches in New Series — Tickets Sold Out in 4 Minutes', time: '4 hrs ago', img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=70' },
                { cat: 'Mohali', title: 'Mohali-Chandigarh Metro Project Approved: ₹8,200 Crore, 18 Stations, Operations Begin 2028', time: '6 hrs ago', img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=70' },
            ],
            firozpur: [
                { cat: 'Firozpur', title: 'Firozpur Cantonment Upgraded to Brigade Headquarters — Strategic Importance Grows Along Border', time: '3 hrs ago', img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&q=70' },
                { cat: 'Firozpur', title: 'Hussainiwala National Martyrs Memorial Gets Major Renovation; Memorial to Bhagat Singh Expanded', time: '5 hrs ago', img: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=400&q=70' },
                { cat: 'Firozpur', title: 'Firozpur District Achieves 100% Organic Farming in 3 Villages — Template for State-Wide Rollout', time: '7 hrs ago', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=70' },
            ],
            bathinda: [
                { cat: 'Bathinda', title: 'Guru Gobind Singh Refinery Bathinda Achieves Record Production — Processes 10 Million Tonnes Annually', time: '2 hrs ago', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=70' },
                { cat: 'Bathinda', title: 'Bathinda to Get North India\'s Largest Solar Park — 500 MW Project Will Power 4 Lakh Homes', time: '4 hrs ago', img: 'https://images.unsplash.com/photo-1542601906897-ecd20a0c7b21?w=400&q=70' },
                { cat: 'Bathinda', title: 'Cancer Treatment Drive: AIIMS Bathinda Begins Free Screening Camp for Malwa Region\'s Rural Population', time: '6 hrs ago', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=70' },
            ],
            hoshiarpur: [
                { cat: 'Hoshiarpur', title: 'Hoshiarpur Wooden Craft Artists Get GI Tag Recognition — Traditional Phulkari Gets Global Platform', time: '3 hrs ago', img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=70' },
                { cat: 'Hoshiarpur', title: 'Eco-Tourism in Shivalik Hills: Hoshiarpur\'s Forest Department Launches Guided Trekking Circuits', time: '5 hrs ago', img: 'https://images.unsplash.com/photo-1496347646636-ea47f7d6b37b?w=400&q=70' },
                { cat: 'Hoshiarpur', title: 'Hoshiarpur Youth Win 3 Gold Medals at National Athletics Championship — Coaches Credit District Academy', time: '7 hrs ago', img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=70' },
            ],
            gurdaspur: [
                { cat: 'Gurdaspur', title: 'Gurdaspur Winery District: 12 New Vineyards Licensed as Punjab\'s Wine Tourism Route Takes Shape', time: '2 hrs ago', img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=70' },
                { cat: 'Gurdaspur', title: 'Pathankot Air Base Gets Major Upgrade — Advanced Fighter Squadron Inducted Amid Border Security Push', time: '4 hrs ago', img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=70' },
                { cat: 'Gurdaspur', title: 'Dalhousie Eco-Tourism Zone Extends to Gurdaspur District — 40 New Homestay Licenses Issued', time: '6 hrs ago', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=70' },
            ],
            moga: [
                { cat: 'Moga', title: 'Moga Dairy Cooperative Supplies 2 Million Litres Daily — Partners with Nestle for New Cheese Plant', time: '3 hrs ago', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=70' },
                { cat: 'Moga', title: 'Kisan Andolan\'s Legacy: Moga Farmers Form 400-Member FPO, Bypass Middlemen to Earn 60% More', time: '5 hrs ago', img: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&q=70' },
                { cat: 'Moga', title: 'New Moga-Ferozpur National Highway to Cut Travel Time to 40 Minutes — Foundation Stone Laid Today', time: '7 hrs ago', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=70' },
            ],
            ferozepur: [
                { cat: 'Ferozepur', title: 'Ferozepur Cantonment Hosts Military Tattoo — 10,000 Spectators Attend Rare Joint Forces Display', time: '2 hrs ago', img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&q=70' },
                { cat: 'Ferozepur', title: 'Historic Ferozepur Bridge Declared Heritage Site — Tourism Package to Include Partition Walks', time: '4 hrs ago', img: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=400&q=70' },
                { cat: 'Ferozepur', title: 'Ferozepur District Wins National Award for Best Sanitation Performance — Open Defecation Free for 4 Years', time: '6 hrs ago', img: 'https://images.unsplash.com/photo-1542601906897-ecd20a0c7b21?w=400&q=70' },
            ],
        };

        function switchRegion(region, tabEl) {
            document.querySelectorAll('.region-tab').forEach(t => t.classList.remove('active'));
            tabEl.classList.add('active');
            const content = document.getElementById('regionContent');
            const stories = regionData[region] || regionData.amritsar;
            content.style.opacity = '0';
            setTimeout(() => {
                content.innerHTML = stories.map(s => `
      <div class="news-card" style="cursor:pointer;" onclick="showToast('Reading...','Opening ${s.cat} story')">
        <img class="news-card-img" src="${s.img}" alt="">
        <div class="news-card-body">
          <div class="news-card-cat">📍 ${s.cat}</div>
          <div class="news-card-title">${s.title}</div>
          <div class="news-card-footer">
            <span class="time">🕐 ${s.time}</span>
            <div class="news-card-actions">
              <button class="action-btn" onclick="event.stopPropagation();likeCard(this)">🤍</button>
              <button class="action-btn" onclick="event.stopPropagation()">🔗</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
                content.style.opacity = '1';
                content.style.transition = 'opacity 0.3s';
            }, 200);
        }

        // Init region
        switchRegion('amritsar', document.querySelector('.region-tab'));

        // ── POLL ──
        let voted = false;
        function vote(el, pct) {
            if (voted) return;
            voted = true;
            const options = document.querySelectorAll('.poll-option');
            const percents = [42, 28, 19, 11];
            options.forEach((opt, i) => {
                opt.classList.add('voted');
                opt.querySelector('.poll-bar').style.width = percents[i] + '%';
                opt.style.cursor = 'default';
            });
            el.style.borderColor = 'var(--saffron)';
            document.getElementById('pollTotal').textContent = '4,822 votes cast • Thank you for voting!';
            showToast('✅ Vote Cast', 'Your vote has been recorded successfully.');
        }

        // ── LIKE ──
        function likeCard(btn) {
            btn.textContent = btn.textContent === '🤍' ? '🧡' : '🤍';
            if (btn.textContent === '🧡') {
                btn.style.transform = 'scale(1.4)';
                setTimeout(() => btn.style.transform = '', 300);
                showToast('❤️ Liked', 'Story added to your saved articles.');
            }
        }

        // ── TOAST ──
        function showToast(title, body, delay = 0) {
            setTimeout(() => {
                const container = document.getElementById('toastContainer');
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.innerHTML = `<div class="toast-icon">📰</div><div class="toast-content"><div class="toast-title">${title}</div><div class="toast-body">${body}</div></div>`;
                container.appendChild(toast);
                toast.addEventListener('click', () => removeToast(toast));
                setTimeout(() => removeToast(toast), 5000);
            }, delay);
        }
        function removeToast(toast) {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }

        // ── SUBSCRIBE ──
        function subscribeEmail() {
            const input = document.querySelector('.subscribe-input');
            if (!input.value || !input.value.includes('@')) {
                showToast('⚠️ Invalid Email', 'Please enter a valid email address.');
                return;
            }
            showToast('🎉 Subscribed!', 'Welcome to InPunjab News. Check your inbox for confirmation.');
            input.value = '';
        }

        // ── SEARCH ──
        function doSearch() {
            const q = document.getElementById('searchBox').value.trim();
            if (!q) return;
            showToast('🔍 Searching', `Finding stories about "${q}"...`);
            document.getElementById('searchBox').value = '';
        }
        document.getElementById('searchBox').addEventListener('keydown', e => {
            if (e.key === 'Enter') doSearch();
        });

        // ── SCROLL NAV ──
        function scrollToSection(id) {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // ── READING PROGRESS ──
        window.addEventListener('scroll', () => {
            const total = document.body.scrollHeight - window.innerHeight;
            const pct = (window.scrollY / total) * 100;
            document.getElementById('readingProgress').style.width = pct + '%';
            const btn = document.getElementById('back-top');
            btn.classList.toggle('show', window.scrollY > 400);
        });

        // ── FADE IN SCROLL ──
        const fadeEls = document.querySelectorAll('.fade-up');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        fadeEls.forEach(el => observer.observe(el));

        // ── WELCOME TOASTS ──
        showToast('👋 Welcome!', 'You\'re reading InPunjab News — ਪੰਜਾਬ ਦੀ ਆਵਾਜ਼', 1000);
        showToast('🔴 Breaking', 'PBKS vs CSK Live — Punjab Kings need 46 off 24 balls!', 3500);
        showToast('⚡ Alert', 'Heavy rain warning for Ludhiana, Jalandhar tonight', 6000);

// ── MOBILE MENU ──
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    if(nav) {
        nav.classList.toggle('show-menu');
    }
}
