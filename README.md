# 🎓 AI Internship Recommendation System

### AI-Powered Personalized Internship Discovery Platform

An intelligent internship recommendation system designed to help students find internships that match their **skills, interests, projects, education, and career goals**.

Instead of making students manually search through hundreds of internship opportunities, our system analyzes the student's profile and recommends the most relevant internships with a personalized **Match Score**, recommendation explanation, and **Skill Gap Analysis**.

---

## 📌 Problem Statement

Students have access to many internship opportunities through platforms such as LinkedIn, Internshala, and other job portals.

However, students often face difficulty in identifying:

* Which internship matches their skills?
* Which internship matches their interests?
* What skills are missing?
* Why is a particular internship suitable for them?
* Which skills should they learn before applying?

Existing platforms mainly provide **search and filter-based internship discovery**.

Our project aims to provide a more personalized solution using **Artificial Intelligence and Natural Language Processing**.

---

## 💡 Our Solution

Our system analyzes the student's:

* Resume
* Technical skills
* Projects
* Education
* CGPA
* Interests
* Preferred career domain

It then compares the student's profile with internship requirements and generates personalized recommendations.

### 🔥 Our Key Idea

> **Existing platforms help students find internships.
> Our system helps students find the RIGHT internship.**

---

## ⭐ Key Features

### 1. 📄 Resume Analysis

Students can upload their resume.

The system extracts useful information such as:

* Skills
* Projects
* Education
* Experience
* Interests

---

### 2. 🤖 AI-Based Skill Matching

The system compares student skills with internship requirements using AI and NLP techniques.

Example:

```text
Student Skills:
Python
SQL
Machine Learning
Pandas

Internship Requirements:
Python
SQL
Machine Learning
TensorFlow
```

The system identifies matching and missing skills.

---

### 3. 📊 Internship Match Score

Each internship receives a personalized score.

Example:

```text
AI/ML Internship       → 92%
Data Science Internship → 87%
DevOps Internship       → 65%
```

This helps students quickly identify the most suitable opportunities.

---

### 4. 💬 Explainable Recommendations

The system explains why an internship was recommended.

Example:

```text
Why Recommended?

✓ Python matches
✓ SQL matches
✓ Machine Learning matches
✓ Project experience matches

Missing Skill:
✗ TensorFlow
```

---

### 5. 🎯 Skill Gap Analysis

The system identifies skills that the student is missing.

Example:

```text
Required:
Python ✓
SQL ✓
Machine Learning ✓
TensorFlow ✗

Skill Gap:
TensorFlow
```

---

### 6. 📚 Learning Suggestions

Based on the skill gap, the system can suggest what the student should learn next.

Example:

```text
Recommended Learning:

1. TensorFlow Basics
2. Neural Networks
3. Build an ML Project
```

---

## 🔄 System Workflow

```text
Student
   ↓
Upload Resume
   ↓
Resume Processing
   ↓
AI Skill Extraction
   ↓
Student Profile
   ↓
Internship Dataset
   ↓
Requirement Extraction
   ↓
AI Matching Engine
   ↓
Match Score
   ↓
Skill Gap Analysis
   ↓
Personalized Recommendations
```

---

## 🏗️ System Architecture

```text
                   STUDENT
                      │
                      ▼
              React Frontend
                      │
                      ▼
               FastAPI Backend
                      │
              ┌───────┴───────┐
              ▼               ▼
        Resume Parser      Supabase
              │               │
              ▼               │
          AI / NLP             │
              │               │
              ▼               │
      Recommendation Engine ◄──┘
              │
              ▼
       Personalized Results
              │
      ┌───────┼────────┐
      ▼       ▼        ▼
   Match    Skill     Why
   Score     Gap    Recommended
```

---

## 🛠️ Technology Stack

### Frontend

* React.js
* HTML
* CSS
* JavaScript

### Backend

* Python
* FastAPI

### AI / Machine Learning

* Python
* Natural Language Processing
* Sentence Transformers
* Scikit-learn

### Resume Processing

* PyMuPDF
* PDF text extraction

### Database & Authentication

* Supabase
* PostgreSQL
* Supabase Authentication
* Supabase Storage

### Development Tools

* Git
* GitHub
* Docker
* VS Code / Antigravity

---

## 🗄️ Database

The project uses **Supabase PostgreSQL** to manage application data.

Main tables include:

```text
profiles
internships
student_skills
recommendations
```

### Profiles

Stores student information.

### Internships

Stores internship opportunities and requirements.

### Student Skills

Stores extracted student skills.

### Recommendations

Stores personalized internship recommendations and match scores.

---

## 📊 Example Recommendation

### Student Profile

```text
Skills:
Python
SQL
Machine Learning
Pandas

Interest:
Artificial Intelligence
```

### Recommended Internship

```text
AI/ML Intern

Match Score: 92%

Matching Skills:
✓ Python
✓ SQL
✓ Machine Learning
✓ Pandas

Missing Skill:
✗ TensorFlow
```

### Recommendation

```text
Highly suitable internship.

Suggested next step:
Learn TensorFlow basics.
```

---

## 🚀 Development Plan

### Phase 1 – Requirement Analysis

Understand the internship recommendation problem and identify user requirements.

### Phase 2 – Dataset Collection

Collect and prepare internship information from suitable public datasets and manually curated data.

### Phase 3 – Data Processing

Clean and organize internship data using Python and Pandas.

### Phase 4 – Resume Processing

Extract text and skills from uploaded resumes.

### Phase 5 – AI Recommendation Engine

Develop the skill matching and recommendation logic.

### Phase 6 – Backend Development

Build APIs using FastAPI.

### Phase 7 – Frontend Development

Create the student dashboard using React.js.

### Phase 8 – Supabase Integration

Connect authentication, database and storage.

### Phase 9 – Testing

Test recommendations using different student profiles.

### Phase 10 – Deployment

Containerize and deploy the application using Docker.

---

## 🎯 Expected Outcome

The system aims to:

* Reduce the time students spend searching for internships.
* Provide personalized internship recommendations.
* Help students understand their skill gaps.
* Explain why an internship is recommended.
* Support students in making better career decisions.

---

## 🔮 Future Scope

Future versions can include:

* Real-time internship updates
* College placement-cell integration
* AI-powered interview preparation
* Personalized learning roadmaps
* Recruiter-side candidate matching
* Internship application tracking
* Feedback-based recommendation improvement
* Multi-language support

---

## 👩‍💻 Team Members

### Project Team

* **Subalakshmi K**
* **Monisha N**
* **Vidharshana Shree R**
* **Niranjani**

---

## 📌 Project Status

🚧 **Currently Under Development**

The project is being developed as a college project based on the **AI Internship Recommendation** problem statement.

---

## 🌟 Vision

Our vision is to make internship discovery more intelligent and personalized.

> **“Right Student. Right Internship. Right Opportunity.”**

---

## 📜 License

This project is developed for educational and academic purposes.

---

## 👩‍💻 Author

**Subalakshmi K**

AI Internship Recommendation System
College Project – 2026
