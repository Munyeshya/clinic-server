const express=require('express');
const cors=require('cors');
const mysql=require('mysql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const path=require('path');

const app=express()

app.use(express.static(path.join(__dirname,"public")))
app.use(cors())
app.use(express.json())

const port=process.env.PORT;

const db=mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

app.post('/add_appointment',(req,res)=>{
    const sql = "INSERT INTO patient_appointments (first_name, last_name, email, phone, preferred_date, department, disease_description) VALUES (?,?,?,?,?,?,?)"
    const values=[
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.phone,
        req.body.date,
        req.body.department,
        req.body.message

    ]

    db.query(sql,values,(err,result)=>{
        if(err) return res.json({message:'Unable to register'+err})
            return res.json({success:'booking done'})
    })
})

app.get('/appointments',(req,res)=>{
    const sql="SELECT * FROM patient_appointments ORDER BY preferred_date DESC";
    db.query(sql,(err,result)=>{
        if(err) return res.json({message:'server error'})
            return res.json(result)
    })
})

app.get('/patients', (req, res) => {
  const sql = `
    SELECT * FROM patient_appointments pa
    WHERE pa.id = (
      SELECT MAX(id)
      FROM patient_appointments
      WHERE email = pa.email
    )
    ORDER BY pa.created_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.json({ message: 'server error' });
    return res.json(result);
  });
});



app.get('/department-stats',(req,res)=>{
    const sql="SELECT department, COUNT(*) as count FROM patient_appointments GROUP BY department";
    db.query(sql,(err,result)=>{
        if(err) return res.json({message:'server error'})
            return res.json(result)
    })
})

app.get('/monthly-appointments',(req,res)=>{
    const sql="SELECT MONTH(preferred_date) as month, COUNT(*) as appointments FROM patient_appointments GROUP BY MONTH(preferred_date) ORDER BY month";
    db.query(sql,(err,result)=>{
        if(err) return res.json({message:'server error'})
            return res.json(result)
    })
})

app.get('/dashboard-stats',(req,res)=>{
    const stats = {};
    
    db.query("SELECT COUNT(DISTINCT email) AS total FROM patient_appointments", (err, result) => {
        if(err) return res.json({message:'server error'})
        stats.totalPatients = result[0].total;
        
        db.query("SELECT COUNT(*) as total FROM patient_appointments", (err, result) => {
            if(err) return res.json({message:'server error'})
            stats.totalAppointments = result[0].total;
            
            db.query("SELECT COUNT(*) as total FROM patient_appointments WHERE MONTH(preferred_date) = MONTH(CURRENT_DATE())", (err, result) => {
                if(err) return res.json({message:'server error'})
                stats.thisMonthAppointments = result[0].total;
                
                db.query("SELECT COUNT(*) as total FROM patient_appointments WHERE status = 'pending'", (err, result) => {
                    if(err) return res.json({message:'server error'})
                    stats.pendingAppointments = result[0].total;
                    
                    return res.json(stats);
                });
            });
        });
    });
})

app.put('/update-appointment-status/:id', (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    if (!status || !['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }
    const sql = 'UPDATE patient_appointments SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Unable to update appointment status: ' + err });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Appointment not found' });
        return res.json({ success: 'Appointment status updated successfully' });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    const sql = 'SELECT * FROM users WHERE email = ? LIMIT 1';
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
        const user = results[0];
        if (user.password_hash !== password) return res.status(401).json({ message: 'Invalid credentials' });
        // Generate JWT
        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '2h' });
        return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    });
});

// app.post('/add-patient',(req,res)=>{
//     const sql = "INSERT INTO patients (first_name, last_name, email, phone, date_of_birth, address, medical_history) VALUES (?,?,?,?,?,?,?)"
//     const values=[
//         req.body.firstName,
//         req.body.lastName,
//         req.body.email,
//         req.body.phone,
//         req.body.dateOfBirth,
//         req.body.address,
//         req.body.medicalHistory
//     ]

//     db.query(sql,values,(err,result)=>{
//         if(err) return res.json({message:'Unable to add patient: '+err})
//             return res.json({success:'Patient added successfully'})
//     })
// })

// app.put('/update-patient/:id',(req,res)=>{
//     const sql = "UPDATE patients SET first_name=?, last_name=?, email=?, phone=?, date_of_birth=?, address=?, medical_history=? WHERE id=?"
//     const values=[
//         req.body.firstName,
//         req.body.lastName,
//         req.body.email,
//         req.body.phone,
//         req.body.dateOfBirth,
//         req.body.address,
//         req.body.medicalHistory,
//         req.params.id
//     ]

//     db.query(sql,values,(err,result)=>{
//         if(err) return res.json({message:'Unable to update patient: '+err})
//             return res.json({success:'Patient updated successfully'})
//     })
// })

// app.delete('/delete-patient/:id',(req,res)=>{
//     const sql = "DELETE FROM patients WHERE id=?"
//     db.query(sql,[req.params.id],(err,result)=>{
//         if(err) return res.json({message:'Unable to delete patient: '+err})
//             return res.json({success:'Patient deleted successfully'})
//     })
// })

app.get('/departments',(req,res)=>{
    const departments = [
        "Orthodontics",
        "Prosthodontics", 
        "Restorative",
        "Conservative",
        "Periodontology",
        "Oral maxillofacial surgery"
    ];
    res.json(departments);
})

