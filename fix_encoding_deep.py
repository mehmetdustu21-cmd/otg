from pathlib import Path
from datetime import datetime
import shutil
import re

ROOT = Path(__file__).resolve().parent

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

# Bozuk UTF-8 / mojibake işaretleri
BAD_PATTERNS = [
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
    "™",
    "š",
    "œ",
]

# Özellikle sık görülen bozuk diziler
BAD_SEQUENCES = [
    "Ã¶",
    "Ã§",
    "Ã¼",
    "ÃŸ",
    "Ã…",
    "Ã„",
    "Ã‡",
    "Ã–",
    "Ãœ",
    "Ä±",
    "ÄŸ",
    "Ä°",
    "ÅŸ",
    "Åž",
    "â€™",
    "â€œ",
    "â€",
    "Ãƒ",
    "Ã‚",
    "Ã‚Â",
]


def mojibake_score(text: str) -> int:
    score = 0

    for char in BAD_PATTERNS:
        score += text.count(char)

    for sequence in BAD_SEQUENCES:
        score += text.count(sequence) * 4

    # Replacement karakteri güçlü bozulma belirtisidir
    score += text.count(" ") * 20

    # Bozuk metinlerde sık görülen kalıplar
    score += len(re.findall(r"Ã.", text)) * 2
    score += len(re.findall(r"Ä.", text)) * 2
    score += len(re.findall(r"Å.", text)) * 2
    score += len(re.findall(r"â.", text)) * 2

    return score


def candidates(text: str):
    results = []

    # UTF-8 -> Latin-1 -> UTF-8 bozulmasını tersine çevir
    try:
        results.append(text.encode("latin1").decode("utf-8"))
    except (UnicodeEncodeError, UnicodeDecodeError):
        pass

    # UTF-8 -> Windows-1252 -> UTF-8 bozulmasını tersine çevir
    try:
        results.append(text.encode("cp1252").decode("utf-8"))
    except (UnicodeEncodeError, UnicodeDecodeError):
        pass

    return results


def repair_deep(text: str) -> str:
    current = text

    # Çift/triple bozulma için birçok tur dene
    for _ in range(10):
        current_score = mojibake_score(current)
        possible = candidates(current)

        if not possible:
            break

        best = min(possible, key=mojibake_score)
        best_score = mojibake_score(best)

        # Sadece gerçekten iyileşme varsa uygula
        if best_score < current_score:
            current = best
        else:
            break

    return current


def main():
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    backup_dir = ROOT.parent / f"{ROOT.name}-encoding-backup-{timestamp}"
    changed = []
    unchanged = []
    skipped = []

    print(f"Proje klasörü: {ROOT}")
    print(f"Yedek klasörü: {backup_dir}")
    print()

    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue

        if any(part in SKIP_DIRS for part in path.parts):
            continue
     
        if any(part in SKIP_DIRS for part in path.parts):
           continue

        if path.suffix.lower() not in TEXT_EXTENSIONS:
            continue

        try:
            original = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            skipped.append(path)
            continue

        before_score = mojibake_score(original)

        if before_score == 0:
            continue

        repaired = repair_deep(original)
        after_score = mojibake_score(repaired)

        if repaired == original or after_score >= before_score:
            unchanged.append(path)
            continue

        relative = path.relative_to(ROOT)
        backup_path = backup_dir / relative
        backup_path.parent.mkdir(parents=True, exist_ok=True)

        shutil.copy2(path, backup_path)

        # UTF-8 BOM olmadan kaydet
        path.write_text(
            repaired,
            encoding="utf-8",
            newline=""
        )

        changed.append((relative, before_score, after_score))
        print(f"Düzeltildi: {relative}")
        print(f"  skor: {before_score} -> {after_score}")

    print()
    print("=" * 70)
    print(f"Toplam düzeltilen dosya: {len(changed)}")
    print(f"Yedek klasörü: {backup_dir}")

    if skipped:
        print()
        print("Okunamayan dosyalar:")
        for path in skipped:
            print(f"  {path.relative_to(ROOT)}")

    if unchanged:
        print()
        print("Bozukluk tespit edilip otomatik düzeltilemeyen dosyalar:")
        for path in unchanged:
            print(f"  {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
