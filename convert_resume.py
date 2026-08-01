import sys
try:
    from markitdown import MarkItDown
    md = MarkItDown()
    result = md.convert("Arnur_Jumabekov_Resume-1.pdf")
    text = result.text_content
    with open("resume.md", "w") as f:
        f.write(text)
    print("OK markitdown, length:", len(text))
except ImportError:
    import PyPDF2
    r = PyPDF2.PdfReader("Arnur_Jumabekov_Resume-1.pdf")
    text = "\n".join(p.extract_text() or "" for p in r.pages)
    with open("resume.md", "w") as f:
        f.write(text)
    print("OK PyPDF2, length:", len(text))
