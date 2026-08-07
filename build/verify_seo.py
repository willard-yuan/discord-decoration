"""Pre-launch SEO verification — extract key fields from all HTML files."""
import re, os, json

DIST = os.path.join(os.path.dirname(__file__), "..", "dist")

def extract_seo(path):
    with open(path) as f:
        html = f.read()
    result = {}
    m = re.search(r"<title>(.*?)</title>", html)
    result["title"] = m.group(1)[:100] if m else "MISSING"
    m = re.search(r'<meta name="description" content="(.*?)"', html)
    result["desc"] = m.group(1)[:100] if m else "MISSING"
    m = re.search(r'<link rel="canonical" href="(.*?)"', html)
    result["canon"] = m.group(1) if m else "MISSING"
    m = re.search(r'<html[^>]*lang="(.*?)"', html)
    result["lang"] = m.group(1) if m else "MISSING"
    m = re.search(r'<html.*? dir="(.*?)"', html)
    result["dir"] = m.group(1) if m else "ltr"
    m = re.search(r'<meta name="robots" content="(.*?)"', html)
    result["robots"] = m.group(1) if m else "N/A"
    hrefs = re.findall(r'<link rel="alternate" hreflang="(.*?)"', html)
    result["hreflangs"] = sorted(hrefs)
    lds = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html)
    result["ldCount"] = len(lds)
    # Check JSON-LD validity
    for i, ld in enumerate(lds):
        try:
            json.loads(ld)
        except:
            result[f"ldJson{i}_invalid"] = True
    # Check for duplicate __SSR_LANG__
    ssrLangCount = len(re.findall(r'window\.__SSR_LANG__', html))
    if ssrLangCount > 1:
        result["dupSsrLang"] = ssrLangCount
    return result

print("=" * 70)
print("EN ROUTE SEO AUDIT")
print("=" * 70)

en_routes = [
    ("/", "index.html"),
    ("/faq/", "faq/index.html"),
    ("/changelog/", "changelog/index.html"),
    ("/discord_avatar/", "discord_avatar/index.html"),
    ("/discord_avatar_decoration/", "discord_avatar_decoration/index.html"),
    ("/discord_front/", "discord_front/index.html"),
    ("/privacy-policy/", "privacy-policy/index.html"),
    ("/terms-of-service/", "terms-of-service/index.html"),
    ("/about-us/", "about-us/index.html"),
    ("/cookies-policy/", "cookies-policy/index.html"),
    ("/contact-support/", "contact-support/index.html"),
    ("/discuss/", "discuss/index.html"),
    ("/gif-extractor/", "gif-extractor/index.html"),
    ("/how-to-use/", "how-to-use/index.html"),
    ("/other-tools/", "other-tools/index.html"),
    ("/discord-profile-tips/", "discord-profile-tips/index.html"),
    ("/blog/", "blog/index.html"),
    ("/blog/discord-font/", "blog/discord-font/index.html"),
    ("/blog/discord-avatar-decorations/", "blog/discord-avatar-decorations/index.html"),
    ("/blog/how-to-split-gif-into-frames/", "blog/how-to-split-gif-into-frames/index.html"),
    ("/blog/new-free-discord-avatar-decorations/", "blog/new-free-discord-avatar-decorations/index.html"),
    ("/404/", "404/index.html"),
]

issues = []
for route, rel_path in en_routes:
    path = os.path.join(DIST, rel_path)
    if not os.path.exists(path):
        issues.append(f"MISSING FILE: {rel_path}")
        continue
    s = extract_seo(path)
    # Check canonical matches route
    expected_canon = f"https://discord-decoration.art{route.rstrip('/')}"
    if route == "/":
        expected_canon = "https://discord-decoration.art/"
    # Remove trailing slash for comparison
    actual = s["canon"].rstrip("/")
    expected = expected_canon.rstrip("/")
    
    route_issues = []
    if actual != expected:
        route_issues.append(f"canonical mismatch: {s['canon']} != {expected_canon}")
    if s["title"] == "MISSING":
        route_issues.append("title MISSING")
    if s["desc"] == "MISSING":
        route_issues.append("desc MISSING")
    if s["lang"] != "en":
        route_issues.append(f"lang={s['lang']} (expected en)")
    
    status = "OK" if not route_issues else "ISSUES"
    print(f"[{status}] {route}")
    print(f"  title: {s['title']}")
    print(f"  canon: {s['canon']}")
    print(f"  lang: {s['lang']}  robots: {s['robots']}  LD+JSON: {s['ldCount']}")
    if route_issues:
        for ri in route_issues:
            print(f"  ⚠ {ri}")
            issues.append(f"{route}: {ri}")
    if s["ldCount"] > 0:
        for i in range(s["ldCount"]):
            if s.get(f"ldJson{i}_invalid"):
                issues.append(f"{route}: JSON-LD block {i} invalid")
    if s.get("dupSsrLang"):
        issues.append(f"{route}: duplicate __SSR_LANG__ ({s['dupSsrLang']} occurrences)")

print()
print("=" * 70)
print("LANGUAGE VARIANT SPOT CHECK (fr, ar, ja, pt-BR)")
print("=" * 70)

spot_routes = ["faq", "changelog", "discord_avatar"]
spot_langs = ["fr", "ar", "ja", "pt-BR"]

for lang in spot_langs:
    print(f"\n--- {lang} ---")
    for rte in spot_routes:
        path = os.path.join(DIST, lang, rte, "index.html")
        if not os.path.exists(path):
            issues.append(f"MISSING: {path}")
            print(f"  [{rte}] MISSING FILE!")
            continue
        s = extract_seo(path)
        expected_canon = f"https://discord-decoration.art/{lang}/{rte}"
        actual_canon = s["canon"].rstrip("/")
        expected_canon_clean = expected_canon.rstrip("/")
        
        rt_issues = []
        if actual_canon != expected_canon_clean:
            rt_issues.append(f"canon: {s['canon']} != {expected_canon}")
        if s["lang"] != lang and not (lang == "pt-BR" and s["lang"] == "pt-BR"):
            rt_issues.append(f"lang={s['lang']} expected {lang}")
        if lang == "ar" and s["dir"] != "rtl":
            rt_issues.append(f"dir={s['dir']} expected rtl")
        if len(s["hreflangs"]) < 10:
            rt_issues.append(f"hreflangs={len(s['hreflangs'])} expected >=10")
        if s["ldCount"] < 1:
            rt_issues.append(f"no JSON-LD")
        
        status = "OK" if not rt_issues else "ISSUES"
        print(f"  [{status}] {rte}: lang={s['lang']} dir={s['dir']} canon={s['canon']} hreflangs={len(s['hreflangs'])} LD={s['ldCount']}")
        for ri in rt_issues:
            print(f"    ⚠ {ri}")
            issues.append(f"{lang}/{rte}: {ri}")

# Check root language variants
print("\n--- Root language variants (/) ---")
for lang in spot_langs:
    path = os.path.join(DIST, lang, "index.html")
    if not os.path.exists(path):
        issues.append(f"MISSING: {path}")
        print(f"  [{lang}] MISSING!")
        continue
    s = extract_seo(path)
    print(f"  [{lang}] lang={s['lang']} dir={s['dir']} title={s['title'][:70]} hreflangs={len(s['hreflangs'])}")

print()
print("=" * 70)
print("ROBOTS.TXT & SITEMAP CHECK")
print("=" * 70)

robots_path = os.path.join(DIST, "robots.txt")
if os.path.exists(robots_path):
    with open(robots_path) as f:
        print(f.read())
else:
    issues.append("robots.txt MISSING")

sitemap_path = os.path.join(DIST, "sitemap.xml")
if os.path.exists(sitemap_path):
    with open(sitemap_path) as f:
        sm = f.read()
    url_count = sm.count("<url>")
    link_count = sm.count("xhtml:link")
    print(f"\nSitemap: {url_count} URLs, {link_count} xhtml:link alternates")
    # Check XML validity
    if sm.startswith('<?xml'):
        print("Sitemap XML: looks valid")
    else:
        issues.append("Sitemap does not start with <?xml")
else:
    issues.append("sitemap.xml MISSING")

print()
print("=" * 70)
print(f"SUMMARY: {len(issues)} issues found")
print("=" * 70)
for i in issues:
    print(f"  ⚠ {i}")

if not issues:
    print("  ALL CLEAR — ready to deploy!")
