# Citizen Defense: The "Normal Person" Interface

## The Problem
Legal systems are designed for lawyers, not people. When a normal person is accused of a crime, they are overwhelmed. They know they are innocent, but they don't know how to *prove* it in a way that the legal system accepts.

## The Solution: "Alibi Builder"
Instead of asking for "Evidence" (a legal term), we ask for "The Story" (a human term).

### The Workflow
1.  **The Narrative (The Hook)**
    *   *System:* "Tell us where you were on Friday night."
    *   *User:* "I was at home gaming with my friends online."
2.  **AI Fact Extraction (The Bridge)**
    *   *AI:* I detected two claims:
        *   Claim 1: You were at **Home**.
        *   Claim 2: You were **Online** interacting with friends.
3.  **Proof Generation (The Evidence)**
    *   *System:* "Can we connect to **Steam/Discord** to verify your login times?"
    *   *System:* "Can we check your **WiFi router logs**?"
    *   *System:* "Did you order **Foodora**?"
4.  **The "Innocence Card" (The Output)**
    *   A clean, visual PDF/Webpage that summarizes:
        *   **Time**: 20:00 - 23:00
        *   **Location**: Home (Verified by 3 data points)
        *   **Witnesses**: user_x, user_y (Discord Logs)
    *   *Goal:* Something a public defender can hand to a prosecutor and say "Drop the case."

## Technical Features for 2025
*   **Swish Integration**: In Sweden, Swish (payments) is the ultimate alibi. "I paid for the bus at 14:02".
*   **SL / Västtrafik / Skånetrafiken**: Public transport logs.
*   **BankID Signatures**: Prove you were the one holding the phone.
*   **Google Takeout Helper**: Automated parsing of Location History JSON.

## UX Philosophy
*   **No Legalese**: Don't say "Exculpatory Evidence". Say "Proof you weren't there".
*   **Visual Confidence**: Use green checks, maps, and clear timelines.
*   **Empowerment**: Make the user feel like they have a team of experts helping them.
