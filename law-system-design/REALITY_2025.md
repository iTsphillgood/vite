# LagbokAI: Reality 2025 (The Practical Roadmap)

To make LagbokAI a viable product for Swedish law firms in 2025-2026, we move from "Science Fiction" to "High-Performance Reality". The focus is on friction-less workflows, compliance, and specific Swedish integrations.

## 1. Authentication & Security (The "BankID" Standard)
**The Shift:** Biometric sci-fi -> **Mobile BankID**.
*   **Why:** Every Swedish lawyer uses BankID daily. It establishes immediate trust.
*   **Implementation:** Use the BankID API (v6) for authentication.
    *   *Feature:* "Säker Start" (Secure Start) using QR codes to prevent remote fraud.
    *   *Role Based Access Control (RBAC):* Integration with the firm's Active Directory (AD).

## 2. Data Ingestion: "The FUP Engine"
**The Shift:** Manual folder browsing -> **Intelligent OCR & Entity Extraction**.
*   **Problem:** Police reports (FUP) are often 500+ page scanned PDFs with poor quality.
*   **Solution:**
    *   **Auto-OCR:** Automatically convert scanned PDFs to searchable text using Google Cloud Vision or Tesseract.
    *   **Timeline Extraction:** The AI scrapes timestamps ("2024-05-12 14:00") and maps them.
    *   **Person Identification:** Recognizes names (Masked: "Målsägande M") and maps relationships.

## 3. Legal Research: "Lagrummet.se on Steroids"
**The Shift:** Generic AI chat -> **Citation-Grounded Search**.
*   **Source:** Index `Svensk Författningssamling (SFS)`, `Nytt Juridiskt Arkiv (NJA)`, and EU directives.
*   **Data Partners:** Integration with `Lagen.nu` (open data) or `Juno/Karnov` (via API if licensed).
*   **Feature: "Prejudikat-Finder":**
    *   User: "Find cases regarding self-defense (nödvärn) with a knife in a hallway."
    *   System: "Found NJA 2009 s. 266 (The 'Bajonett' case) - Not excessive force."

## 4. Workflows & Output
**The Shift:** Passive dashboard -> **Active Document Generation**.
*   **Drafting:** "Write a 'Svarsinlaga' (Defense Statement) denying the allegation based on Chapter 24 of Brottsbalken."
*   **Court Presentation:** Export the timeline to PowerPoint/Keynote for the main hearing (Huvudförhandling).

## 5. Compliance (GDPR & Ethics)
*   **Local Processing:** Use "Private Cloud" instances (Google Cloud Stockholm Region) so client data never leaves Sweden.
*   **Data Retention:** Auto-delete sensitive FUP data after the case is closed (Arkiveringsregler).

---
## Suggested Features for Version 1.0 (2025)
1.  **BankID Login**: The only way to enter.
2.  **Drag-and-Drop FUP Analyzer**: Drop a 500mb PDF -> Get a 2-page summary + interactive timeline.
3.  **Chat with Law**: A sidebar specifically for querying Swedish law while reading documents.
