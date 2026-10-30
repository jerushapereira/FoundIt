FoundIt | Lost & Found Management System

A simple, campus-focused Lost and Found Management System that helps students keep track of misplaced belongings and report items they discover within their college campus.

FoundIt brings lost and found item records into one place, making it easier to report, search, view and manage belongings.

Overview

Losing personal belongings on campus can be frustrating, especially when there is no central system to report or locate them.

FoundIt aims to solve this problem by providing a centralized platform where users can report lost items, register found belongings and search through existing records.

The project uses a Singly Linked List as its primary data structure to demonstrate dynamic record management using C.

Key Features

* Report Lost Items: Record details of belongings that have been misplaced.
* Report Found Items: Add information about items discovered on campus.
* Search Records: Find relevant entries using available item details.
* View Records: Display stored lost and found entries.
* Manage Records: Add and remove records through linked-list operations.
* Simple Interface: A web-based frontend for interacting with the application.

Tech Stack

Technology	Purpose
C	Backend logic and record management
Singly Linked List	Dynamic data storage
HTML5	Frontend structure
CSS3	Styling and layout
JavaScript	Frontend interactions

Data Structure Implementation

The core of FoundIt is built around a Singly Linked List.

Each node represents an item record and contains:

* Item-related information.
* A pointer to the next node.

The linked list allows records to be managed dynamically without requiring a fixed-size collection.

Operations Demonstrated

Operation	Application
Insertion	Adding new lost or found records
Traversal	Displaying available records
Searching	Locating specific item records
Deletion	Removing records

Why a Singly Linked List?

A linked list is suitable for this project because the number of lost and found records can change over time.

It allows dynamic memory allocation and demonstrates fundamental pointer manipulation and node-based data management.

Project Structure

FoundIt/
│
├── backend/
│   └── C source files
│
├── frontend/
│   ├── HTML files
│   ├── CSS files
│   └── JavaScript files
│
└── README.md

Getting Started

Prerequisites

* A C compiler (GCC recommended).
* A modern web browser.
* Visual Studio Code (recommended).

Installation

1. Clone the repository

git clone https://github.com/jerushapereira/FoundIt.git

2. Navigate to the project directory

cd FoundIt

3. Open the project

Open the cloned folder in Visual Studio Code.

4. Run the application

* Open the frontend HTML entry point in your browser or through Live Server.
* Compile and execute the C backend using GCC, following the source file and execution requirements in the backend directory.

Academic Context

FoundIt was developed as a Data Structures micro-project to apply fundamental concepts of linked lists to a practical, real-world problem.

The project focuses on:

* Understanding dynamic memory allocation.
* Implementing linked-list operations.
* Working with structures and pointers in C.
* Applying data structures to record management.
* Building a basic web-based user interface.

Future Scope

Potential improvements include:

* User authentication and individual user accounts.
* Integration between the frontend and backend through APIs.
* Persistent database storage.
* Item image uploads.
* Item status tracking.
* Notifications when a matching lost or found item is reported.

Author

Jerusha Pereira

B.Tech Computer Science and Engineering
Fr. Conceicao Rodrigues College of Engineering, Bandra
Mumbai-400050

GitHub: @jerushapereira

⸻

FoundIt | Making lost things easier to find.
