# Survey App

## Installation and Running the Application

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)  
- npm or yarn  
- [Supabase](https://supabase.com/) account  

---

### Setup Instructions

#### 1. Clone the repository
```bash
git clone <repository-url>
cd survey-app
```

#### 2. Install frontend dependencies
```bash
cd surveyappfe
npm install
```

#### 3. Install backend dependencies
```bash
cd ../surveyappbe
npm install
```

---

### 4. Environment Variables Setup

#### Frontend (`In ROOT folder`)
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Backend (`surveyappbe/.env`)
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Running the Application

#### Start the backend server (Terminal 1)
```bash
cd surveyappbe
npm run dev
```

#### Start the frontend development server (Terminal 2)
```bash
cd surveyappfe
npm run dev
```

---

### 6. Access the Application
Open your browser and navigate to:  
👉 [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)
