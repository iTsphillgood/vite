# Lawyer Strategy: The Professional Workflow (LagbokAI Pro)

To assist Swedish lawyers effectively, we must mirror their mental model: **Deconstruct -> Analyze -> Strategize -> Persuade**.

## 1. The Challenge: Information Overload
A typical Swedish criminal case involves a "Förundersökningsprotokoll" (FUP) that can be 500-2000 pages of unstructured scanned PDFs (förhör, teknisk bevisning, analyser).
*   **Current Workflow:** CTRL+F, Post-it notes, manual timelines in Excel.
*   **The AI Solution:** "FUP X-Ray".

## 2. The Solution: "FUP X-Ray" & Relationship Mapping
Instead of reading linear text, the lawyer sees the *structure* of the case.

### A. The "Network Graph" (Relationship Map)
*   **Nodes:** People (Målsägande, Tilltalad, Vittnen), Locations, Physical Evidence (Kniv, Mobil).
*   **Edges:** Relationships (Friend, Enemy, Sambo) and Interactions (Called at 14:00, Seen at 14:15).
*   **Value:** Instantly spot conflicts. "Why did Witness A call the Victim if they claim they don't know each other?"

### B. The "Inconsistency Timeline"
*   The AI overlays multiple data sources on a single timeline.
    *   *Row 1:* Witness Statement (Svensson).
    *   *Row 2:* Mobile Location Data (BTS logs).
    *   *Row 3:* CCTV timestamps.
*   **Conflict Detection:** The system highlights time ranges in RED where sources disagree.
    *   *Alert:* "Witness claims to be home at 20:00, but Swish log shows payment at 7-Eleven at 20:05."

## 3. Strategy Generation (The "Second Chair")
The AI acts as a junior partner (biträdande jurist) brainstorming defenses.
*   **Scenario Modeling:** "What if we argue self-defense (Nödvärn)?"
    *   *AI Response:* "Risky. FUP page 45 shows the defendant brought the knife from the kitchen (lack of immediate threat)."
*   **Precedent Matching:** "Show me 3 NJA cases where 'excessive force' was excused due to panic (excess)."

## 4. The "Client Link" (Connecting Citizen -> Lawyer)
Bridging the gap between the "Alibi Builder" and the Professional Dashboard.
*   **The Handover:** The client generates a digital "Alibi Card". The lawyer receives a secure link.
*   **Integration:** The client's self-reported timeline is automatically ingested into the Lawyer's Master Timeline for verification.

---
## Implementation Plan for `App.tsx`
1.  **Toggle Switch**: "Citizen Mode" <-> "Professional Mode".
2.  **Dashboard**:
    *   **Graph View**: Interactive node link diagram.
    *   **Strategy Box**: Chat interface for legal strategy.
    *   **Evidence Matrix**: Grid comparing witness statements.
