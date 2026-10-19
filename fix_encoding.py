from pathlib import Path
from datetime import datetime
import shutil
import sys

# Proje kökü
ROOT = Path(__file__).resolve().parent

# Düzeltilecek dosya türleri
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

# Taranmaması gereken klasörler
SKIP_DIRS = {
    "node_modules",
    ".next",
    ".git",
    ".vercel",
    "dist",
    "build",
    "coverage",
}

# Mojibake belirtileri
BAD_MARKERS = (
    "Ã",
    "Â",
    "Ä",
    "Å",
    "Æ",
    "Ç",
    "Ð",
    "Ñ",
    "Ø",
    "Ý",
    "Þ",
    "â",
    "ð",
    " ",
)


def bad_score(text: str) -> int:
    """
    Metindeki olası bozuk karakter sayısını hesaplar.
    Daha yüksek skor daha fazla bozulma anlamına gelir.
    """
    score = 0

    for marker in BAD_MARKERS:
        score += text.count(marker)

    # UTF-8 replacement karakteri güçlü bozulma belirtisidir
    score += text.count(" ") * 5

    # Sık görülen bozuk UTF-8 dizileri
    common_sequences = [
        "Ã¶",
        "Ã§",
        "Ã¼",
        "Ã¶",
        "ÃŸ",
        "Ä±",
        "ÄŸ",
        "ÅŸ",
        "Ä°",
        "Ã‡",
        "Ã–",
        "Ãœ",
        "Äž",
        "Ä°",
        "â€™",
        "â€œ",
        "â€",
    ]

    for sequence in common_sequences:
        score += text.count(sequence) * 3

    return score


def try_repair(text: str) -> str:
    """
    Metin yanlışlıkla Latin-1/Windows-1252 olarak okunmuşsa
    UTF-8'e geri çevirmeyi dener.
    Birden fazla kez bozulmuş metinler için birkaç tur çalışır.
    """
    current = text

    for _ in range(3):
        candidates = []

        # En yaygın bozulma: UTF-8 bytes -> Latin-1 text
        try:
            repaired_latin1 = current.encode("latin1").decode("utf-8")
            candidates.append(repaired_latin1)
        except (UnicodeEncodeError, UnicodeDecodeError):
            pass

        # Windows-1252 varyasyonu
        try:
            repaired_cp1252 = current.encode("cp1252").decode("utf-8")
            candidates.append(repaired_cp1252)
        except (UnicodeEncodeError, UnicodeDecodeError):
            pass

        if not candidates:
            break

        best = min(candidates, key=bad_score)

        # Sadece gerçekten daha iyi bir sonuç varsa uygula
        if bad_score(best) < bad_score(current):
            current = best
        else:
            break

    return current


def main():
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    backup_dir = ROOT / f".encoding-backup-{timestamp}"
    changed_files = []
    skipped_files = []

    print(f"Proje: {ROOT}")
    print(f"Yedek klasörü: {backup_dir}")
    print()

    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue

        if any(part in SKIP_DIRS for part in path.parts):
            continue

        if path.suffix.lower() not in TEXT_EXTENSIONS:
            continue

        try:
            original = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            skipped_files.append(path)
            continue

        original_score = bad_score(original)

        if original_score == 0:
            continue

        repaired = try_repair(original)
        repaired_score = bad_score(repaired)

        if repaired == original or repaired_score >= original_score:
            continue

        # Orijinal dosyayı yedekle
        relative_path = path.relative_to(ROOT)
        backup_path = backup_dir / relative_path
        backup_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, backup_path)

        # UTF-8 BOM olmadan yaz
        path.write_text(repaired, encoding="utf-8", newline="")

        changed_files.append((relative_path, original_score, repaired_score))
        print(f"Düzeltildi: {relative_path}")
        print(f"  skor: {original_score} -> {repaired_score}")

    print()
    print("=" * 60)
    print(f"Düzeltilen dosya sayısı: {len(changed_files)}")
    print(f"Yedek klasörü: {backup_dir}")

    if skipped_files:
        print()
        print("UTF-8 olarak okunamayan dosyalar:")
        for path in skipped_files:
            print(f"  {path.relative_to(ROOT)}")

    if not changed_files:
        print()
        print("Otomatik düzeltilecek mojibake metin bulunamadı.")


if __name__ == "__main__":
    main()
