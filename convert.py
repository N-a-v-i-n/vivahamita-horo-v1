import pymupdf4llm

md = pymupdf4llm.to_markdown("vedic_astro_textbook.pdf")

with open("output.md", "w", encoding="utf-8") as f:
    f.write(md)