# Harvey for Sweden: Implementation Roadmap

## Phase 1: Foundation & Setup
- [ ] **Repo Setup**: Initialize a new Vite project (React + TypeScript) within the workspace.
- [ ] **Design System**: Set up a clean, professional UI (using a library like Shadcn/UI or Tailwind).
- [ ] **Architecture**: Define the data flow between Frontend (Vite) and Backend (Simulated Gemini/NotebookLM).

## Phase 2: Data Ingestion (The "Notebook")
- [ ] **Document Upload UI**: Create a drag-and-drop interface for PDF/Text files.
- [ ] **Text Extraction**: Implement client-side or server-side text extraction (OCR for scanned police reports).
- [ ] **Source Categorization**:
    - [ ] Legal Texts (SFS, NJA)
    - [ ] Evidence (Chat logs, Location data)
    - [ ] Notes (Lawyer's thoughts)

## Phase 3: The "Brain" (Gemini Integration)
- [ ] **API Connection**: Setup Google Vertex AI / Gemini API connection.
- [ ] **Prompt Engineering**:
    - [ ] "Legal Analyst Persona": Strict adherence to Swedish law.
    - [ ] "Forensic Detective Persona": Focus on timelines and facts.
- [ ] **RAG Implementation**:
    - [ ] Index uploaded documents.
    - [ ] Create a retrieval system to feed relevant context to Gemini.

## Phase 4: Visualization (Veo/Imagen)
- [ ] **Prompt Generation**: Convert case facts into image prompts (e.g., "A map showing distance between X and Y at sunset").
- [ ] **Image Generation Mockup**: Since Veo API might be restricted, simulate the generation of "Evidence Reconstructions".
- [ ] **Timeline Component**: Build an interactive timeline visualizing events vs. evidence.

## Phase 5: "Innocence" Workflow
- [ ] **Alibi Checker**: Input crime time/loc vs. suspect data -> Output probability of guilt.
- [ ] **Report Generator**: Create a PDF export summarizing the findings for the court.

## Phase 6: Legal & Compliance
- [ ] **GDPR Check**: Ensure local-first data processing where possible.
- [ ] **Disclaimer System**: "AI makes mistakes. Verify all citations."

## Future Steps
- [ ] Partner with a Swedish law firm for pilot testing.
- [ ] Fine-tune model on `lagen.nu` dataset.
