
# 📘 Academia Tempore
---

> **“Auctoritas per Ordinem Temporum.”**
> *Authority through the Order of Time.*

---

## 🧭 Overview

**Academia Tempore** is a comprehensive, modular timetable scheduling system built to automate, validate, and intelligently manage academic schedules. Designed for institutional use, this system eliminates manual scheduling conflicts while supporting dynamic curricular structures, multi-entity relations, and constraint-based logic.

Built with precision and adaptability in mind, Academia Tempore serves as an academic utility.

---

## 🎓 Purpose

In academic institutions, scheduling is a deceptively complex problem that involves:

* Conflicting constraints across classrooms, teachers, and subjects
* Dynamic allocation of time-slots
* Logical backreferences and consistency maintenance

Academia Tempore formalizes this complexity into a clean, scalable codebase backed by:

* Graph-like entity interrelations
* Referential integrity with backlink propagation
* Collision detection using temporal logic
* Transaction-safe updates and rollbacks

---

## 🧩 Core Features

### ✅ Multi-Entity Scheduling

* Supports **Classrooms**, **Teachers**, **Subjects**, and **Slots**
* Modular Mongoose schema design with embedded schedule arrays

### 🔄 Bidirectional Integrity

* **Backlink System**: Ensures referential integrity by dynamically updating interconnected documents
  → e.g., When a classroom is assigned a slot, the subject and teacher schedules update accordingly.

* **Uplink Utility**: Safely removes orphaned references when an entity is deleted (e.g., cascading clean-up of deleted teachers from all classrooms)

### 🧠 Collision Detection

Robust constraint-checking algorithms:

* `checkTeacherCollision()`
* `checkClassroomCollision()`
* `validateSlotConflict()`

All backed by schedule parity functions and time-slot overlap analysis.

### ⚙️ Atomic Transactions

All critical operations (create, update, delete) use Mongoose session-based **transactions** to prevent partial updates and ensure data integrity.

---

## 🗃️ System Architecture

```
📦 OrdoTemporum/
├── models/
│   ├── Classroom.js
│   ├── Teacher.js
│   ├── Subject.js
│   └── Schedule.js
├── utils/
│   ├── backlinkHandlers.js
│   ├── collisionCheck.js
│   └── uplinkManager.js
├── tests/
│   └── constructors/
├── routes/
├── graphql/
│   └── schema/
├── index.js
└── README.md
```

---

## 🚀 Technologies Used

* **Node.js**, **Express.js**
* **MongoDB Atlas** with **Mongoose ODM** 
* **GraphQL** (planned integration)
* **Modular utility-driven design**

---

## 💡 Ongoing Work

* ✨ GraphQL integration for real-time schedule building
* ✨ WebSocket-based notification system
* ✨ Frontend planner (React with Next.JS)
* ✨ Constraint optimization engine for auto-generation

---

## 🧾 License

MIT License. Free to use, fork, and extend under scholarly credit.

---

Would you like this README exported as a `.md` file or further tailored to your GitHub repository and real filenames?

