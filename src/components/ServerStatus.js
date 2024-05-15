import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ServerStatus.css';

const ServerStatus = () => {
    const [status, setStatus] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get('/server-status.php');
                setStatus(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching server status:', error);
            }
        };

        fetchStatus();

        // Fetch data every 30 sec
        const intervalId = setInterval(fetchStatus, 30);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="server-status-container">

            <svg className="shooting-stars" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                {[...Array(50)].map((_, index) => (
                    <circle key={index} className="shooting-star" cx={Math.random() * 1000} cy={Math.random() * 1000} r={Math.random() * 2 + 1} />
                ))}
            </svg>
            <svg className="live-indicator" viewBox="0 0 50 50">
                <circle className="live-circle" cx="40" cy="10" r="10" />
            </svg>
            <h2 className="title">Server Status</h2>
            {loading ? (
                <div className="loader"></div>
            ) : (
                <div className="status-list">
                    <div className={`status-item ${status.nginx ? 'online' : 'offline'}`}>
                        <p>Nginx</p>
                        <span>{status.nginx ? 'Online' : 'Offline'}</span>
                    </div>
                    <div className={`status-item ${status.phpFpm ? 'online' : 'offline'}`}>
                        <p>PHP-FPM</p>
                        <span>{status.phpFpm ? 'Online' : 'Offline'}</span>
                    </div>
                    <div className={`status-item ${status.mysql ? 'online' : 'offline'}`}>
                        <p>MySQL</p>
                        <span>{status.mysql ? 'Online' : 'Offline'}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServerStatus;
