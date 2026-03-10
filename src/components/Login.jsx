import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/POST/login', { email, mot_de_passe: motDePasse });
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/students');
            } else {
                setError("Token manquant dans la réponse.");
            }
        } catch (err) {
            setError("Échec de l'authentification. Veuillez vérifier vos identifiants.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h3 className="card-title text-center mb-4">Connexion</h3>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Adresse Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        required
                                        autoFocus
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="mot_de_passe" className="form-label">Mot de passe</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="mot_de_passe"
                                        name="mot_de_passe"
                                        required
                                        value={motDePasse}
                                        onChange={(e) => setMotDePasse(e.target.value)}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100 py-2">
                                    Se Connecter
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
