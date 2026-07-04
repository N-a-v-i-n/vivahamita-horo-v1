from langchain_text_splitters import RecursiveCharacterTextSplitter

with open("output.md", "r", encoding="utf-8") as f:
    markdown = f.read()

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1200,
    chunk_overlap=200,
)

chunks = splitter.split_text(markdown)

print(f"Chunks: {len(chunks)}")

for i, chunk in enumerate(chunks):
    with open(f"chunks/chunk_{i:04d}.md", "w", encoding="utf-8") as f:
        f.write(chunk)