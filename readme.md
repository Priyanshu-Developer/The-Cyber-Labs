# Cyber Labs

Cyber Labs is a hands-on training repository for learning web exploitation and secure coding through vulnerable applications, guided walkthroughs, and repeatable local lab environments.

The goal is to build a structured security curriculum where each topic contains 20 self-contained projects. Every project focuses on one exploit pattern, one realistic application flow, and one defensive lesson.

## Featured Video

Watch the Cyber Labs walkthrough and support the project:

[▶ Watch on YouTube](https://youtu.be/Ot4XsQmAO0c?si=2u1vYY5LZqxULMP4)

## Ask Queries and Join the Community

Have a question while practicing the labs, setting up Docker, or understanding a vulnerability?
Join the Cyber Labs Discord community and ask your queries directly:

[Join Discord and Ask Queries](https://discord.gg/4g9PJzsqz)

## What This Repository Covers

The first wave of labs focuses on the following topics:

1. SQL Injection (SQLi)
2. Cross-Site Scripting (XSS)
3. Broken Authentication & Session Management
4. Broken Access Control (IDOR/BOLA)
5. Server-Side Request Forgery (SSRF)
6. Command Injection
7. File Upload Vulnerabilities
8. Cross-Site Request Forgery (CSRF)
9. Path Traversal & File Inclusion
10. API Security

Each topic will expand into 20 projects, giving the repository a planned total of 200 labs across the core web security curriculum.

## Lab Format

Each project will follow the same learning pattern:

- A realistic vulnerable application or feature
- A clear attack objective
- One or more exploit paths
- A walkthrough of the root cause
- A mitigation section with secure alternatives
- Local deployment so the lab can be practiced safely

## Topic Roadmap

### 1. SQL Injection (20 Projects)

Authentication bypass, UNION-based attacks, error-based SQLi, blind SQLi, time-based SQLi, and second-order SQLi.

Planned coverage includes login bypasses, query manipulation, stacked query abuse where applicable, inference-based extraction, delayed-response detection, and multi-step payload persistence.

### 2. Cross-Site Scripting (20 Projects)

Reflected XSS, stored XSS, DOM-based XSS, filter bypasses, and CSP bypass scenarios.

Planned coverage includes unsafe rendering, input canonicalization failures, client-side sink abuse, JSON/script injection chains, and defense validation.

### 3. Broken Authentication & Session Management (20 Projects)

Weak JWTs, session fixation, insecure cookies, MFA bypass, and password reset flaws.

Planned coverage includes token forgery, cookie scope mistakes, account recovery weaknesses, session swapping, and authentication workflow abuse.

### 4. Broken Access Control (IDOR/BOLA) (20 Projects)

IDOR, privilege escalation, horizontal authorization bypass, and vertical authorization bypass.

Planned coverage includes object reference manipulation, forced browsing, role abuse, API authorization gaps, and multi-tenant data exposure.

### 5. Server-Side Request Forgery (SSRF) (20 Projects)

Cloud metadata attacks, internal network access, blind SSRF, and filter bypasses.

Planned coverage includes URL parsing weaknesses, redirect handling, cloud instance metadata access, internal service probing, and out-of-band confirmation techniques.

### 6. Command Injection (20 Projects)

OS command injection, shell injection, argument injection, and remote code execution chains.

Planned coverage includes unsafe process execution, metacharacter abuse, escaping input sanitizers, and platform-specific payload handling.

### 7. File Upload Vulnerabilities (20 Projects)

Web shells, MIME type bypasses, double extensions, image polyglots, and ZIP Slip.

Planned coverage includes upload validation failures, parser confusion, storage and execution mistakes, archive extraction issues, and content-type trust problems.

### 8. Cross-Site Request Forgery (CSRF) (20 Projects)

CSRF token bypasses, SameSite cookie issues, API CSRF, and login CSRF.

Planned coverage includes missing anti-CSRF checks, token reuse mistakes, browser behavior edge cases, state-changing requests, and login flow abuse.

### 9. Path Traversal & File Inclusion (20 Projects)

Directory traversal, Local File Inclusion (LFI), Remote File Inclusion (RFI), and log poisoning.

Planned coverage includes unsafe file path handling, input normalization failures, file read primitives, server-side template abuse, and chained code execution.

### 10. API Security (20 Projects)

REST and GraphQL vulnerabilities, BOLA, excessive data exposure, mass assignment, rate limiting issues, and JWT attacks.

Planned coverage includes insecure object access, over-permissive schema handling, weak input constraints, pagination abuse, broken authentication on APIs, and authorization failures.

## Repository Structure

```text
sql-injection/
├── app/
│   ├── api/
│   ├── components/
│   ├── data/
│   └── lab/
├── db/
├── labs/
├── lib/
├── public/
└── readme.md
```

## Current Foundation

The current workspace already contains the first SQL injection training track, along with the database schemas, seed data, and Next.js application scaffolding needed to support additional labs.

## Learning Goals

- Build practical exploitation skills through repeatable labs
- Understand why a vulnerability works, not just how to trigger it
- Practice secure coding and mitigation strategies alongside exploitation
- Keep each lab local, isolated, and safe to run

## Contributing the Next Labs

When adding a new project, aim to include:

- A focused vulnerability theme
- A working vulnerable flow
- Clear setup and reset instructions
- A verification step or success condition
- A defensive fix or secure version of the same logic

## Safety Notice

These labs are intended for authorized local training environments only. Do not deploy vulnerable code to production systems.

- Capabilities Abuse
- Cron Jobs
- Writable Files
- Kernel Exploits
- Docker Escapes
- PATH Hijacking

---

## 15. Windows Privilege Escalation

Learn privilege escalation on Windows systems.

Topics include:

- Unquoted Service Paths
- DLL Hijacking
- Token Impersonation
- AlwaysInstallElevated
- Scheduled Tasks
- Weak Permissions
- UAC Bypass

---

## 16. Bug Bounty Methodology

A complete practical guide to finding real-world vulnerabilities.

Topics include:

- Reconnaissance
- Asset Discovery
- Subdomain Enumeration
- Content Discovery
- Parameter Discovery
- Manual Testing
- Automation
- Reporting
- Proof of Concept Development
- Responsible Disclosure

---

# 🐳 Running Labs

Every module is self-contained.

```bash
git clone <repository>

cd <lab>

docker compose up --build
```

Open your browser and start hacking.

---

# 🚩 Challenge Format

Every lab includes:

- Scenario
- Objectives
- Difficulty Level
- Vulnerability Description
- Target Application
- Hidden Flag(s)
- Hints
- Solution Guide
- Mitigation
- References

---

# 🎓 Who Is This For?

- Beginners learning offensive security
- Cybersecurity students
- Penetration testers
- Bug bounty hunters
- Security researchers
- Red Team professionals
- CTF players
- Anyone who wants practical cybersecurity experience

---

# ⚠️ Disclaimer

These labs are intentionally vulnerable and are provided **strictly for educational purposes**.

Run them only in isolated local environments or authorized lab setups. Never attempt these techniques against systems you do not own or have explicit permission to test.

---

# 📄 License

This project is licensed under the [MIT License](LICENSE).

---

# ⭐ Support the Project

If Cyber Labs helps you learn cybersecurity:

- ⭐ Star the repository
- 🍴 Fork the project
- 🐞 Report issues
- 💡 Suggest new labs
- 🤝 Contribute improvements

Together, we can make practical cybersecurity education accessible to everyone.
