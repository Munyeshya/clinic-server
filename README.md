# Dental Clinic Management System

A modern, full-stack dental clinic booking and management system built with Next.js, React, Express.js, and MySQL.

## Features

- **Dashboard Overview**: Real-time clinic statistics and analytics
- **Patient Management**: CRUD operations for patient records
- **Appointment Scheduling**: Manage patient appointments by department
- **Department Analytics**: Visual representation of department distribution
- **Interactive Charts**: Monthly appointments and department statistics
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Recharts** - Chart library for data visualization
- **Lucide React** - Icon library

### Backend
- **Express.js** - Node.js web framework
- **MySQL** - Relational database
- **CORS** - Cross-origin resource sharing

## Project Structure

```
dentalnext/
├── royalclinc/          # Frontend (Next.js)
│   ├── app/            # App Router pages
│   ├── components/     # React components
│   ├── public/         # Static assets
│   └── ...
└── server/             # Backend (Express.js)
    ├── server.js       # Main server file
    ├── database.sql    # Database schema
    └── ...
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### 1. Database Setup

1. **Install MySQL** if you haven't already
2. **Create a MySQL user**:
   ```sql
   CREATE USER 'royaluser'@'localhost' IDENTIFIED BY 'royal123';
   GRANT ALL PRIVILEGES ON royal.* TO 'royaluser'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Import the database schema**:
   ```bash
   cd server
   mysql -u royaluser -p < database.sql
   ```

### 2. Backend Setup

1. **Navigate to server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`

### 3. Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd royalclinc
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

## API Endpoints

### Patients
- `GET /patients` - Get all patients
- `POST /add-patient` - Add new patient
- `PUT /update-patient/:id` - Update patient
- `DELETE /delete-patient/:id` - Delete patient

### Appointments
- `GET /appointments` - Get all appointments
- `POST /add_appointment` - Add new appointment

### Analytics
- `GET /dashboard-stats` - Get dashboard statistics
- `GET /monthly-appointments` - Get monthly appointment data for charts
- `GET /department-stats` - Get department distribution data
- `GET /departments` - Get list of available departments

## Database Schema

### Patients Table
- `id` - Primary key
- `first_name` - Patient's first name
- `last_name` - Patient's last name
- `email` - Unique email address
- `phone` - Phone number
- `date_of_birth` - Date of birth
- `address` - Patient address
- `medical_history` - Medical history notes
- `created_at` - Record creation timestamp

### Appointments Table
- `id` - Primary key
- `first_name` - Patient's first name
- `last_name` - Patient's last name
- `email` - Email address
- `phone` - Phone number
- `preferred_date` - Appointment date
- `department` - Department (Orthodontics, Prosthodontics, Restorative, Conservative, Periodontology, Oral maxillofacial surgery)
- `disease_description` - Description of issue
- `status` - Appointment status (pending, confirmed, completed, cancelled)

## Available Departments

- **Orthodontics** - Braces, aligners, jaw alignment
- **Prosthodontics** - Dental implants, crowns, bridges
- **Restorative** - Fillings, crowns, cosmetic procedures
- **Conservative** - Root canals, cavity treatments
- **Periodontology** - Gum disease treatment
- **Oral maxillofacial surgery** - Wisdom teeth, jaw surgery

## Features in Detail

### Dashboard
- Real-time statistics from database
- Interactive charts showing monthly appointments
- Department distribution visualization
- Responsive design for all screen sizes

### Patient Management
- Add, edit, and delete patient records
- Search and filter patients
- Modal forms for data entry
- Form validation and error handling

### Charts and Analytics
- Line chart for monthly appointments overview
- Pie chart for department distribution
- Real-time data fetching from backend
- Fallback to static data if backend unavailable

### Responsive Design
- Mobile-first approach
- Collapsible sidebar
- Responsive tables and forms
- Touch-friendly interface

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL is running
   - Check database credentials in `server.js`
   - Ensure database and tables exist

2. **CORS Errors**
   - Backend CORS is configured for development
   - Check if frontend and backend ports match

3. **Charts Not Loading**
   - Verify backend is running on port 5000
   - Check browser console for errors
   - Charts will show fallback data if backend unavailable

4. **Patient Table Not Loading**
   - Check if patients table exists in database
   - Verify API endpoint is accessible
   - Check browser network tab for errors

### Development Tips

1. **Hot Reload**: Both frontend and backend support hot reloading
2. **Database Changes**: Restart backend after schema changes
3. **Environment Variables**: Consider using `.env` files for production
4. **Error Handling**: Check browser console and server logs for debugging

## Production Deployment

### Backend
- Use PM2 or similar process manager
- Set up environment variables
- Configure reverse proxy (nginx)
- Enable HTTPS

### Frontend
- Build for production: `npm run build`
- Deploy to Vercel, Netlify, or similar
- Configure environment variables
- Set up custom domain

### Database
- Use managed MySQL service
- Set up automated backups
- Configure connection pooling
- Monitor performance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 