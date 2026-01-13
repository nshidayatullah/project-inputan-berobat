# Database Schema - VPS Clinic Management System

## Business Structure

```
BIB (Klien/Project Owner)
└── PT Putra Perkasa Abadi [Main Contractor]
    ├── Departments PPA (internal)
    │   └── Karyawan PPA + Jabatan PPA
    ├── Kustodian (Department PPA dengan is_kustodian = true)
    │   └── Membawahi Subkontraktor (many-to-many)
    └── Subkontraktor
        ├── Departments Internal
        └── Karyawan + Jabatan Subkontraktor
```

---

## Entity Relationship Diagram

```mermaid
erDiagram
    COMPANIES ||--o{ DEPARTMENTS : has
    COMPANIES ||--o{ POSITIONS : has
    COMPANIES ||--o{ EMPLOYEES : has
    COMPANIES }o--o{ DEPARTMENTS : "subcontractor_kustodian"

    DEPARTMENTS ||--o{ EMPLOYEES : has
    POSITIONS ||--o{ EMPLOYEES : has

    EMPLOYEES ||--o{ VISITS : has
    VISITS ||--|| MEDICAL_RECORDS : has
    VISITS ||--o{ VITAL_SIGNS : has
    VISITS ||--o{ PRESCRIPTIONS : has
    VISITS ||--o{ LAB_TESTS : has

    MEDICINES ||--o{ PRESCRIPTIONS : has
    LAB_TEST_TYPES ||--o{ LAB_TESTS : has

    COMPANIES {
        bigint id PK
        string code UK
        string name
        enum type "main_contractor|sub_contractor"
        boolean is_active
    }

    DEPARTMENTS {
        bigint id PK
        bigint company_id FK
        string code
        string name
        boolean is_kustodian
        boolean is_active
    }

    SUBCONTRACTOR_KUSTODIAN {
        bigint id PK
        bigint subcontractor_id FK
        bigint kustodian_id FK
    }

    POSITIONS {
        bigint id PK
        bigint company_id FK
        string code
        string name
        string level
        boolean is_active
    }

    EMPLOYEES {
        bigint id PK
        bigint company_id FK
        bigint department_id FK
        bigint position_id FK
        string employee_number UK
        string nik UK
        string name
        date date_of_birth
        enum gender
        boolean is_active
    }

    VISITS {
        bigint id PK
        bigint employee_id FK
        string visit_number UK
        date visit_date
        time visit_time
        enum visit_type
        enum status
        enum action_status
    }

    MEDICAL_RECORDS {
        bigint id PK
        bigint visit_id FK UK
        text subjective
        text objective
        text assessment
        text plan
    }
```

---

## Migration Files

| Order | File                                                      | Description                        |
| ----- | --------------------------------------------------------- | ---------------------------------- |
| 1     | `2026_01_13_001_create_companies_table.php`               | Main & Sub contractors             |
| 2     | `2026_01_13_002_create_departments_table.php`             | Departments with is_kustodian flag |
| 3     | `2026_01_13_003_create_subcontractor_kustodian_table.php` | Pivot table (M:N)                  |
| 4     | `2026_01_13_004_create_positions_table.php`               | Positions per company              |
| 5     | `2026_01_13_005_create_employees_table.php`               | Employee data                      |
| 6     | `2026_01_13_006_create_medicines_table.php`               | Medicine master data               |
| 7     | `2026_01_13_007_create_lab_test_types_table.php`          | Lab test types                     |
| 8     | `2026_01_13_008_create_diagnoses_table.php`               | ICD-10 diagnoses                   |
| 9     | `2026_01_13_009_create_visits_table.php`                  | Visit records                      |
| 10    | `2026_01_13_010_create_medical_records_table.php`         | SOAP records                       |
| 11    | `2026_01_13_011_create_vital_signs_table.php`             | Vital signs                        |
| 12    | `2026_01_13_012_create_prescriptions_table.php`           | Prescriptions                      |
| 13    | `2026_01_13_013_create_lab_tests_table.php`               | Lab test results                   |

---

## Key Indexes

| Table       | Index                                               | Purpose          |
| ----------- | --------------------------------------------------- | ---------------- |
| companies   | `type`, `is_active`                                 | Filter by type   |
| departments | `is_kustodian`, `(company_id, is_active)`           | Filter kustodian |
| employees   | `(company_id, is_active)`, `FULLTEXT(name)`         | Fast search      |
| visits      | `(employee_id, visit_date)`, `(visit_type, status)` | Common queries   |

---

## Run Migrations

```bash
php artisan migrate
```

---

_Last Updated: 2026-01-13_
