import React, { useEffect } from 'react';
import Editor from '../Layout/Editor';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Edit = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    return (
        <Container>
            <Editor id={id} />
        </Container>
    );
};

export default Edit;
