# Harvey for Sweden: System Analysis & Design

## 1. Executive Summary

"Harvey for Sweden" (working title: **LagbokAI**) is a proposed conceptual AI-powered legal system tailored for the Swedish market. It aims to replicate the capabilities of **Harvey AI** (used by elite global firms) but adapted for Swedish law (Svensk Lag), utilizing Google's advanced AI ecosystem (Gemini, NotebookLM, Veo/Imagen).

The system serves two main purposes:
1.  **Professional Legal Assistance**: Helping law firms research, draft, and analyze cases efficiently.
2.  **Justice & Innocence Verification**: A specialized module for analyzing evidence (time, location, relationships) to reconstruct events and potentially prove innocence in criminal cases.

## 2. Market Context: The Swedish Legal Landscape

### Top Law Firms (Potential Clients/Integrators)
*   **Mannheimer Swartling**: The largest and most prestigious firm in Sweden.
*   **Advokatfirman Vinge**: A powerhouse in M&A and corporate law.
*   **Roschier**: Pan-Nordic firm with strong cross-border capabilities.
*   **Advokatfirman Delphi**: Known for TMT (Technology, Media, Telecom) focus, likely early adopters.
*   **Advokatfirman Cederquist**: Top-tier business law firm.

### Current AI State
*   Swedish firms are cautious but interested.
*   **EU AI Act**: Strict regulations on "High Risk" AI systems (which legal AI often falls under).
*   **GDPR**: Massive focus on data privacy (Dataskyddsförordningen).
*   **Copyright**: Only human works are copyrightable in Sweden, posing challenges for AI-generated drafts.

## 3. System Architecture

The system leverages the **Google Cloud AI ecosystem**:

### Core Components
*   **Frontend**: Built with **Vite** (React/Vue) for a fast, responsive interface.
*   **Knowledge Base (The "Brain")**:
    *   **NotebookLM integration**: "Grounding" the AI.
    *   *Sources*: Svensk Författningssamling (SFS), NJA (Nytt Juridiskt Arkiv - Supreme Court cases), EU Law.
    *   *User Data*: Case files, police reports (FUP - Förundersökningsprotokoll), chat logs.
*   **Reasoning Engine**: **Google Gemini Pro/Ultra** (1.5)
    *   Handles complex reasoning, legislative interpretation, and cross-referencing.
*   **Visual Forensics Engine**: **Google Veo / Imagen 3**
    *   *Input*: Police reports, witness statements, timestamped data.
    *   *Output*: Visual reconstruction of crime scenes, timeline videos (using NotebookLM "Video Overview" tech), and relationship maps.

## 4. Feature Breakdown

### A. The "Innocence Project" Module
*   **Goal**: Show "what really happened" to clear an innocent suspect.
*   **Data Ingestion**: Upload Google Location History, BankID logs, Call records, Chat logs.
*   **Timeline Analysis**:
    *   AI correlates location data with the alleged crime time.
    *   *Example*: "Subject was at `Location A` (ICA Maxi) at `14:00`, confirmed by BankID transaction. Crime occurred at `Location B` at `14:05`. Distance is 20km. Conclusion: Physically impossible."
*   **Visual Explainer**:
    *   Generates a **Veo** video or **Imagen** storyboard showing the subject's actual movements vs. the prosecution's timeline.

### B. Legal Research & Strategy
*   **Question**: "What is the precedent for self-defense in home invasion cases (Nödvärn) in Sweden?"
*   **Process**: Search NJA cases -> Summarize with NotebookLM -> Draft legal argument.
*   **Relationship Mapping**: Analyze complex corporate structures or criminal networks using graph theory + LLM extraction.

## 5. Why This is "Good" (Value Proposition)

1.  **Democratization of Justice**: High-quality legal analysis is expensive. This system could provide public defenders (Offentliga försvarare) with "Big Law" resources.
2.  **Visual Evidence**: Juries (Nämndemän) and Judges are human. Visualizing data (photos/videos) makes abstract alibis concrete and convincing.
3.  **Efficiency**: Swedish courts are backlogged. AI can process FUPs (often 1000+ pages) in minutes to find contradictions.
4.  **Error Reduction**: Humans miss details in massive datasets. AI finds the "needle in the haystack" (e.g., a timestamp discrepancy).

## 6. Implementation Strategy (The Todo List)

See `TODO.md` for the step-by-step technical plan.
