import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        try {
            const response = await api.get('/GET/students');
            setStudents(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des étudiants", error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
            try {
                await api.delete(`/DELETE/students/${id}`);
                fetchStudents();
            } catch (error) {
                console.error("Erreur lors de la suppression de l'étudiant", error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Liste des Étudiants</h2>
                <Link to="/students/add" className="btn btn-primary">
                    Ajouter un étudiant
                </Link>
            </div>

            <div className="table-responsive shadow-sm rounded">
                <table className="table table-hover table-bordered mb-0">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Âge</th>
                            <th scope="col">Filière</th>
                            <th scope="col">Email</th>
                            <th scope="col" className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? students.map((student) => (
                            <tr key={student.id || student._id}>
                                <td>{student.id || student._id}</td>
                                <td>{student.nom}</td>
                                <td>{student.age}</td>
                                <td>{student.filiere}</td>
                                <td>{student.email}</td>
                                <td className="text-center">
                                    <div className="btn-group" role="group">
                                        <Link
                                            to={`/students/${student.id || student._id}/edit`}
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            Modifier
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(student.id || student._id)}
                                            className="btn btn-sm btn-outline-danger"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-muted">Aucun étudiant trouvé</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;
