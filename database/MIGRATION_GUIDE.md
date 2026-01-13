# Database Migration Guide

## Quick Start

### 1. Run All Migrations

```bash
php artisan migrate
```

### 2. Run Seeders (Optional)

```bash
php artisan db:seed
```

### 3. Rollback Migrations

```bash
php artisan migrate:rollback
```

### 4. Fresh Migration (Drop all tables and re-migrate)

```bash
php artisan migrate:fresh
```

### 5. Fresh Migration with Seeders

```bash
php artisan migrate:fresh --seed
```

---

## Migration Order

Migrations are executed in this order automatically:

1. ✅ `create_kustodians_table`
2. ✅ `create_companies_table`
3. ✅ `create_departments_table`
4. ✅ `create_positions_table`
5. ✅ `create_employees_table`
6. ✅ `create_medicines_table`
7. ✅ `create_lab_test_types_table`
8. ✅ `create_diagnoses_table`
9. ✅ `create_visits_table`
10. ✅ `create_medical_records_table`
11. ✅ `create_vital_signs_table`
12. ✅ `create_prescriptions_table`
13. ✅ `create_lab_tests_table`

---

## Database Indexes

### Purpose of Indexes

Indexes are strategically placed to optimize common queries:

1. **Primary Keys**: Auto-increment BIGINT
2. **Foreign Keys**: Always indexed for JOIN performance
3. **Search Columns**: Name, code, date fields
4. **Composite Indexes**: For multi-column WHERE clauses
5. **Fulltext Indexes**: For text search (employees.name, medicines.name, etc.)

### Example Queries Optimized by Indexes

```sql
-- Fast employee search by company (uses composite index)
SELECT * FROM employees
WHERE company_id = 1 AND is_active = 1;

-- Fast visit lookup by date range (uses index on visit_date)
SELECT * FROM visits
WHERE visit_date BETWEEN '2026-01-01' AND '2026-01-31';

-- Fast medicine search (uses fulltext index)
SELECT * FROM medicines
WHERE MATCH(name, generic_name) AGAINST('paracetamol' IN NATURAL LANGUAGE MODE);

-- Fast employee name search (uses fulltext index)
SELECT * FROM employees
WHERE MATCH(name) AGAINST('budi' IN NATURAL LANGUAGE MODE);
```

---

## Performance Tips

### 1. Use Eager Loading

```php
// Bad - N+1 Query Problem
$visits = Visit::all();
foreach ($visits as $visit) {
    echo $visit->employee->name; // Each iteration queries DB
}

// Good - Eager Loading
$visits = Visit::with('employee')->get();
foreach ($visits as $visit) {
    echo $visit->employee->name; // No additional queries
}
```

### 2. Use Select Specific Columns

```php
// Bad - Fetches all columns
$employees = Employee::all();

// Good - Only fetch needed columns
$employees = Employee::select('id', 'name', 'company_id')->get();
```

### 3. Use Pagination

```php
// Bad - Loads all records
$visits = Visit::all();

// Good - Paginate results
$visits = Visit::paginate(20);
```

### 4. Use Database Transactions

```php
DB::transaction(function () {
    $visit = Visit::create([...]);
    MedicalRecord::create(['visit_id' => $visit->id, ...]);
    VitalSign::create(['visit_id' => $visit->id, ...]);
});
```

---

## Common Queries

### Get All Active Employees by Company

```php
$employees = Employee::where('company_id', $companyId)
    ->where('is_active', true)
    ->with(['company', 'department', 'position'])
    ->get();
```

### Get Recent Visits with Patient Info

```php
$visits = Visit::with(['employee.company', 'medicalRecord', 'vitalSigns'])
    ->where('visit_date', '>=', now()->subDays(30))
    ->orderBy('visit_date', 'desc')
    ->paginate(20);
```

### Search Employees by Name

```php
$employees = Employee::whereRaw('MATCH(name) AGAINST(? IN NATURAL LANGUAGE MODE)', [$searchTerm])
    ->where('is_active', true)
    ->get();
```

### Get Visit Statistics

```php
$stats = Visit::selectRaw('
        visit_type,
        COUNT(*) as total,
        COUNT(CASE WHEN status = "completed" THEN 1 END) as completed
    ')
    ->where('visit_date', '>=', now()->startOfMonth())
    ->groupBy('visit_type')
    ->get();
```

---

## Maintenance Commands

### Optimize Tables

```bash
php artisan db:optimize
```

### Check Database Size

```sql
SELECT
    table_name AS 'Table',
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.TABLES
WHERE table_schema = 'your_database_name'
ORDER BY (data_length + index_length) DESC;
```

### Analyze Slow Queries

```sql
-- Enable slow query log in MySQL
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2; -- queries taking > 2 seconds

-- Check slow queries
SELECT * FROM mysql.slow_log;
```

---

## Backup & Restore

### Backup Database

```bash
# Full backup
php artisan backup:run

# Or using mysqldump
mysqldump -u username -p database_name > backup.sql
```

### Restore Database

```bash
mysql -u username -p database_name < backup.sql
```

---

## Troubleshooting

### Foreign Key Constraint Error

```bash
# Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS=0;

# Your operations here

# Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS=1;
```

### Migration Already Exists

```bash
# Rollback specific migration
php artisan migrate:rollback --step=1

# Or reset all migrations
php artisan migrate:reset
```

### Fulltext Index Not Working

Make sure your MySQL version supports fulltext indexes:

-   MySQL 5.6+ for InnoDB tables
-   Check table engine: `SHOW TABLE STATUS WHERE Name = 'employees';`

---

## Next Steps

1. ✅ Run migrations
2. ✅ Create seeders for master data
3. ✅ Set up Laravel models with relationships
4. ✅ Create API endpoints
5. ✅ Implement frontend integration

---

_Last Updated: 2026-01-13_
