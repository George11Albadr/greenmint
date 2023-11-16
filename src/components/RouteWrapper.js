// RouteWrapper.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function RouteWrapper({ showLoginForm, setShowLoginForm, children }) {
    const location = useLocation();

    useEffect(() => {
        if (showLoginForm) {
            setShowLoginForm(false);
        }
    }, [location, setShowLoginForm, showLoginForm]);

    return <>{children}</>;
}

export default RouteWrapper;
