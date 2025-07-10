
# 📘 Academia Tempore
---

> **“Auctoritas per Ordinem Temporum.”**
> *Authority through the Order of Time.*

---
## Current Screenshots of the UI(responsive)
<img width="958" alt="Screenshot 2025-06-09 120042" src="https://github.com/user-attachments/assets/217e8acf-37b1-4cc7-b960-266a6380adc4" />
<img width="947" alt="Screenshot 2025-06-09 120131" src="https://github.com/user-attachments/assets/ccf2e84f-be9d-4967-9f8a-af8064fd9c79" />
<img width="949" alt="Screenshot 2025-06-09 120022" src="https://github.com/user-attachments/assets/80046bed-9301-4436-ae50-915badf249ee" />

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
## 📁 Project Structure
Academia Tempore
.
|-- README.md
|-- components.json
|-- eslint.config.mjs
|-- jsconfig.json
|-- lib
|   |-- utils
|   |   |-- capitalizeString.js
|   |   |-- lowercaseString.js
|   |   `-- uppercaseString.js
|   `-- validations
|       |-- admin.js
|       |-- classroom.js
|       |-- schedule.js
|       |-- slot.js
|       |-- subject.js
|       `-- teacher.js
|-- next.config.mjs
|-- package.json
|-- pnpm-lock.yaml
|-- postcss.config.cjs
|-- public
|   |-- favicon.ico
|   |-- github_icon.svg
|   `-- logo.png
|-- server
|   |-- controllers
|   |   |-- admin.js
|   |   `-- teacher.js
|   |-- graphql
|   |   |-- inputs
|   |   |   |-- DayScheduleInputType.js
|   |   |   |-- RemoveSlotInputType.js
|   |   |   |-- ScheduleInputType.js
|   |   |   |-- SlotInputNestedType.js
|   |   |   `-- SlotInputType.js
|   |   |-- schema.js
|   |   `-- types
|   |       |-- Classroom.js
|   |       |-- Schedule.js
|   |       |-- Subject.js
|   |       `-- Teacher.js
|   |-- index.js
|   |-- models
|   |   |-- Admins.js
|   |   |-- Classrooms.js
|   |   |-- Schedule.js
|   |   |-- Subjects.js
|   |   `-- Teachers.js
|   |-- registerModels.js
|   |-- seeds
|   |   |-- admins.js
|   |   |-- classroom_schedule.js
|   |   |-- seeds.js
|   |   |-- subjects.js
|   |   `-- teachers.js
|   |-- services
|   |   |-- admins
|   |   |   |-- create.js
|   |   |   `-- read.js
|   |   |-- auth
|   |   |   |-- generatePayload.js
|   |   |   `-- readPayload.js
|   |   |-- classroom
|   |   |   |-- create.js
|   |   |   |-- delete.js
|   |   |   |-- read.js
|   |   |   `-- utils
|   |   |       |-- injectRoomId.js
|   |   |       |-- stripRoomId.js
|   |   |       `-- verifyAndLinkClassroom.js
|   |   |-- schedule
|   |   |   |-- create.js
|   |   |   |-- delete.js
|   |   |   |-- slot
|   |   |   |   `-- create.js
|   |   |   |-- update.js
|   |   |   `-- utils
|   |   |       |-- handleScheduleSlotUpdate.js
|   |   |       |-- insertNewSlot.js
|   |   |       `-- updateExistingSlot.js
|   |   |-- subject
|   |   |   |-- create.js
|   |   |   |-- delete.js
|   |   |   `-- read.js
|   |   |-- teacher
|   |   |   |-- create.js
|   |   |   |-- delete.js
|   |   |   |-- read.js
|   |   |   `-- utils
|   |   |       `-- getTeacherSchedule.js
|   |   `-- utils
|   |       |-- backlink
|   |       |   `-- addBacklink.js
|   |       |-- collisionDetection
|   |       |   |-- isClassroomFree.js
|   |       |   `-- isTeacherFree.js
|   |       `-- objToID
|   |           |-- subjectToID.js
|   |           `-- teacherToID.js
|   `-- test.js
|-- src
|   |-- app
|   |   |-- dashboard
|   |   |   |-- classrooms
|   |   |   |   |-- [roomCode]
|   |   |   |   |   `-- page.jsx
|   |   |   |   `-- page.jsx
|   |   |   |-- layout.jsx
|   |   |   |-- page.jsx
|   |   |   |-- subjects
|   |   |   |   `-- page.jsx
|   |   |   `-- teachers
|   |   |       |-- [teacherCode]
|   |   |       |   `-- page.jsx
|   |   |       `-- page.jsx
|   |   |-- globals.css
|   |   |-- layout.js
|   |   |-- login
|   |   |   `-- [type]
|   |   |       `-- page.jsx
|   |   `-- page.js
|   |-- components
|   |   |-- app-sidebar.jsx
|   |   |-- classrooms
|   |   |   |-- AddCard.jsx
|   |   |   |-- AllClassrooms.jsx
|   |   |   |-- ClassroomItem.jsx
|   |   |   `-- ScrollContent.jsx
|   |   |-- login-form.jsx
|   |   |-- schedule
|   |   |   |-- PlotSchedule.jsx
|   |   |   |-- ScheduleGrid.jsx
|   |   |   |-- ScheduleHeaderRow.jsx
|   |   |   |-- ScheduleSlotCell.jsx
|   |   |   `-- utils.js
|   |   |-- search-form.jsx
|   |   |-- subjects
|   |   |   |-- AddCard.jsx
|   |   |   |-- AllSubjects.jsx
|   |   |   `-- ScrollContent.jsx
|   |   |-- teachers
|   |   |   |-- AddCard.jsx
|   |   |   |-- AllTeachers.jsx
|   |   |   |-- ScrollContent.jsx
|   |   |   `-- TeacherItem.jsx
|   |   `-- ui
|   |       |-- accordion.jsx
|   |       |-- avatar.jsx
|   |       |-- breadcrumb.jsx
|   |       |-- button.jsx
|   |       |-- card.jsx
|   |       |-- collapsible.jsx
|   |       |-- dialog.jsx
|   |       |-- dropdown-menu.jsx
|   |       |-- hover-card.jsx
|   |       |-- input.jsx
|   |       |-- label.jsx
|   |       |-- scroll-area.jsx
|   |       |-- separator.jsx
|   |       |-- sheet.jsx
|   |       |-- sidebar.jsx
|   |       |-- skeleton.jsx
|   |       |-- spinner.jsx
|   |       `-- tooltip.jsx
|   |-- constructors
|   |   |-- Schedule
|   |   |   `-- slot.js
|   |   |-- finalConstructors
|   |   |   |-- classroomConstructor.js
|   |   |   |-- scheduleConstructor.js
|   |   |   |-- slotConstructor.js
|   |   |   |-- subjectConstructor.js
|   |   |   `-- teacherConstructor.js
|   |   `-- utils
|   |       |-- capitalizeString.js
|   |       `-- normalizeString.js
|   |-- hooks
|   |   `-- use-mobile.js
|   |-- lib
|   |   |-- graphqlClient.js
|   |   `-- utils.js
|   |-- queries
|   |   |-- allClassrooms.gql
|   |   |-- allSubjects.gql
|   |   |-- allTeachers.graphql
|   |   |-- classroomSchedule.gql
|   |   |-- createClassroomByRoom.gql
|   |   |-- createSubject.gql
|   |   |-- createTeacher.gql
|   |   |-- deleteClassroom.gql
|   |   |-- deleteSubject.gql
|   |   |-- deleteTeacher.gql
|   |   |-- removeSlot.gql
|   |   |-- teacherSchedule.gql
|   |   `-- updateSchedule.gql
|   |-- stores
|   |   `-- useScheduleStore.js
|   `-- utils
|       |-- createClassroomByRoom.js
|       |-- createSubject.js
|       |-- createTeacher.js
|       |-- deleteClassroom.js
|       |-- deleteSubject.js
|       |-- deleteTeacher.js
|       |-- getAllClassrooms.js
|       |-- getAllSubjects.js
|       |-- getAllTeachers.js
|       |-- getClasssroomSchedule.js
|       |-- getTeacherSchedule.js
|       |-- removeSlot.js
|       `-- updateSchedule.js
`-- tailwind.config.js

51 directories, 161 files
```

---

## 🚀 Technologies Used

* **Node.js**, **Express.js**
* **MongoDB Atlas** with **Mongoose ODM** 
* **GraphQL** (Apollo Server)
* **Modular utility-driven design**

---

## 💡 Ongoing Work
* ✨ Authentication and Authorization
* ✨ WebHook-based notification system
* ✨ Constraint optimization engine for auto-generation

---

![GitHub Repo stars](https://img.shields.io/github/stars/Vishisht-Dwivedi/Academia_Tempore?style=social)
![GitHub forks](https://img.shields.io/github/forks/Vishisht-Dwivedi/Academia_Tempore?style=social)

> Over 100 developers have cloned this project—that’s unreal.
Whether you’re exploring, learning, or building something on top of it—thank you.
Feel free to open issues, ask questions, or just say hi. I’d love to hear how you’re using it. 🙌
> The project is under development, I'll work on the constraint optimization engine once dashboard is live.
> ❤️ Cloning this repo? Consider giving it a ⭐ — it means a lot!

## 🧾 License

MIT License. Free to use, fork, and extend under scholarly credit.

---

