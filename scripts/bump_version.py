# Cache-busting: stamps ?v=<timestamp> on local css/js links in app/*.html. Run before each deploy.
import re, glob, os, time
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
v = time.strftime("%Y%m%d%H%M")
for p in glob.glob(os.path.join(ROOT, "app", "*.html")):
    s = open(p, encoding="utf-8").read()
    s = re.sub(r'((?:src|href)="(?!https?:)(?:css|js)/[^"?]+\.(?:css|js))(?:\?v=\d+)?"', rf'\1?v={v}"', s)
    open(p, "w", encoding="utf-8").write(s)
print("version", v)
