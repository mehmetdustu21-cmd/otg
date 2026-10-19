from pathlib import Path
from datetime import datetime
import shutil
from ftfy import fix_text

ROOT = Path(__file__).resolve().parent
BACKUP_ROOT = ROOT.parent / f"{ROOT.name}-encoding-backup-{datetime.now():%Y%m%d-%H%M%S}"

TEXT_EXTENSIONS = {
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".css",
    ".scss",
    ".json",
    ".md",
    ".sql",
    ".html",
    ".txt",
    ".yml",
    ".yaml",
    ".d.ts",
}

SKIP_DIRS = {
    "node_modules",
    ".next",
    ".git",
    ".vercel",
    "dist",
    "build",
    "coverage",
}

BAD_MARKERS = (
    "Ã",
    "Â",
    "Ä",
    "Å",
    "Æ",
    "Ð",
    "Ñ",
    "Ø",
    "Ý",
    "Þ",
    "â",
    "ð",
    " ",
)


def looks_broken(text: str) -> bool:
    return any(marker in text for marker in BAD_MARKERS)


changed = 0
checked = 0

print(f"Proje: {ROOT}")
print(f"Yedek: {BACKUP_ROOT}")
print()

for path in ROOT.rglob("*"):
    if not path.is_file():
        continue

    if any(part in SKIP_DIRS for part in path.parts):
        continue

    if any(part.startswith(".encoding-backup-") for part in path.parts):
        continue

    if path.suffix.lower() not in TEXT_EXTENSIONS:
        continue

    try:
        original = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        continue

    checked += 1

    if not looks_broken(original):
        continue

    repaired = fix_text(original)

    if repaired == original:
        print(f"Değişmedi: {path.relative_to(ROOT)}")
        continue

    backup_path = BACKUP_ROOT / path.relative_to(ROOT)
    backup_path.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(path, backup_path)

    path.write_text(repaired, encoding="utf-8", newline="")
    changed += 1

    print(f"Düzeltildi: {path.relative_to(ROOT)}")

print()
print("=" * 60)
print(f"Taranan dosya: {checked}")
print(f"Düzeltilen dosya: {changed}")
print(f"Yedek klasörü: {BACKUP_ROOT}")
