# Lab 04: Boolean Blind SQLi - MediRecord Incident Desk

## Overview

| Field          | Value                                      |
|----------------|--------------------------------------------|
| **Lab ID**     | 04                                         |
| **Title**      | MediRecord Incident Desk                   |
| **Difficulty** | Intermediate+                              |
| **Category**   | SQL Injection - Boolean-based Blind SQLi   |
| **Target**     | Patient lookup                             |
| **Database**   | PostgreSQL                                 |
| **Framework**  | Next.js 15 + TypeScript                    |

## Scenario

MediRecord operates a hospital incident desk where staff can check whether a
patient ID exists. The application does not display medical records, stack
traces, or SQL errors. It only returns:

```text
Patient Found
Patient Not Found
```

The hospital security team believes the lack of visible output protects the
confidential incident table. Your task is to prove whether a single true/false
signal can still reveal the incident lockbox phrase.

## Mission Objectives

Primary objective:

- Investigate the patient lookup behavior.
- Establish one payload that returns true and one that returns false.
- Use boolean conditions to infer hidden values.
- Extract the `INCIDENT_LOCKBOX` value from `hospital_confidential`.

Secondary objective:

- Understand why blind SQL injection is slower than visible data extraction.
- Practice extracting values character-by-character.
- Explain why hiding errors is not a complete defense.

## Target

Patient Lookup Portal

```text
Patient ID:
____________________

[ Lookup ]
```

Start at:

```text
http://localhost:3000/lab/04-boolean-blind
```

## Rules

- Do not modify server files while solving.
- Do not brute force credentials.
- Do not use automated SQL injection tools.
- Use only the Found and Not Found response as your signal.

## Hints

### Hint 1

Begin with a patient ID that exists.

### Hint 2

Append an `AND` condition. If the condition is true, the valid patient still
matches.

### Hint 3

`SUBSTRING` can test one character position at a time.

### Hint 4

The target row has `record_type = 'INCIDENT_LOCKBOX'`.

## Learning Goals

After completing this lab, you should understand:

- Boolean-based blind SQL injection.
- True/false data inference.
- Character-by-character extraction.
- Why blind SQLi can work without visible errors or result rows.
- How parameterized queries stop injected conditions from changing SQL logic.

## Success Conditions

- Confirm true and false injected conditions.
- Recover the full incident lockbox value.
- Explain the vulnerable query and the secure fix.

## Reset

```bash
./reset.sh
```

This drops and recreates all lab data.
