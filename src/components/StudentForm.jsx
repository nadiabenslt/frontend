import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [student, setStudent] = useState({
        nom: '',
        age: '',
        filiere: '',
        email: '',
        mot_de_passe: ''
    });

    useEffect(() => {
        if (isEdit) {
            const fetchStudent = async () => {
                try {
                    const response = await api.get('/GET/students');
                    const found = response.data.find(s => String(s.id) === String(id) || String(s._id) === String(id));
                    if (found) {
                        setStudent({
                            nom: found.nom || '',
                            age: found.age || '',
                            filiere: found.filiere || '',
                            email: found.email || '',
                            mot_de_passe: ''
                        });
                    }
                } catch (error) {
                    console.error("Erreur", error);
                }
            };
            fetchStudent();
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await api.put(`/PUT/students/${id}`, student);
            } else {
                await api.post('/POST/students', student);
            }
            navigate('/students');
        } catch (error) {
            console.error("Erreur", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-header bg-white py-3">
                            <h4 className="mb-0 text-center">
                                {isEdit ? "Modifier l'étudiant" : "Ajouter un étudiant"}
                            </h4>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nom" className="form-label">Nom</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nom"
                                        name="nom"
                                        required
                                        value={student.nom}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="age" className="form-label">Âge</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="age"
                                        name="age"
                                        required
                                        value={student.age}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="filiere" className="form-label">Filière</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="filiere"
                                        name="filiere"
                                        required
                                        value={student.filiere}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        required
                                        value={student.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="mot_de_passe" className="form-label">Mot de passe</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="mot_de_passe"
                                        name="mot_de_passe"
                                        required={!isEdit || true}
                                        value={student.mot_de_passe}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary py-2">
                                        {isEdit ? "Mettre à jour" : "Ajouter"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-light py-2"
                                        onClick={() => navigate('/students')}
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentForm;
