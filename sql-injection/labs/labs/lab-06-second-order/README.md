# Lab 06: Second-order SQLi - CyberShop Fulfillment Portal

## Overview

| Field          | Value                                  |
|----------------|----------------------------------------|
| **Lab ID**     | 06                                     |
| **Title**      | CyberShop Fulfillment Portal           |
| **Difficulty** | Advanced                               |
| **Category**   | SQL Injection - Second-order SQLi      |
| **Target**     | Registration and profile update flow   |
| **Database**   | PostgreSQL                             |
| **Framework**  | Next.js 15 + TypeScript                |

## Scenario

CyberShop allows customers to register accounts, browse products, and update
their profile before checkout. Registration appears to accept and store account
data safely.

The risk appears later. A legacy profile update query reloads the stored
username and concatenates it into SQL. A payload that looked harmless when it
was stored can execute during a different workflow.

## Mission Objectives

Primary objective:

- Register a new account with a stored SQL payload in the username.
- Log in with that account.
- Trigger the payload from the profile update page.
- Recover the `FULFILLMENT_FLAG` value from `shop_admin_notes`.

Secondary objective:

- Understand the difference between first-order and second-order SQLi.
- Identify the storage point and the execution point.
- Explain why all SQL execution points need parameterization.

## Target

Second-order workflow:

```text
Register -> Login -> Edit Profile -> Stored payload executes
```

Start at:

```text
http://localhost:3000/lab/06-second-order
```

## Rules

- Do not modify server files while solving.
- Do not use automated SQL injection tools.
- Use only the registration, login, and profile workflows.
- The payload should execute after storage, not during registration.

## Hints

### Hint 1

The username is the stored value that later reaches a vulnerable query.

### Hint 2

The profile update is the trigger point.

### Hint 3

The target data is in `shop_admin_notes`.

### Hint 4

PostgreSQL errors can reveal text when a cast fails.

## Learning Goals

After completing this lab, you should understand:

- Second-order SQL injection.
- Stored payloads and delayed execution.
- Why safe storage does not guarantee safe later use.
- Error-based extraction from a second-order sink.
- Secure profile updates with parameterized queries.

## Success Conditions

- Register and log in with a payload-bearing username.
- Trigger the stored payload from profile update.
- Recover the full `FLAG{...}` value from `shop_admin_notes`.

## Reset

```bash
./reset.sh
```

This drops and recreates all lab data.
