import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Input } from '@mui/material';
import { Articless } from '../Config/article.config';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Articles from '../Api/Articles';

const Create = () => {
    useEffect(() => {
        setArticlesRequest({
            mode: 'articleCreate',
            payload: {}
        });
    }, []);

    const handleResponse = (response: any) => {
        // console.log('Response:', response);
    };

    const [articlesRequest, setArticlesRequest] = useState<any>({
        mode: 'articleCreate',
        payload: {}
    });
    return (
        <Container>
            <Articles
                params={articlesRequest}
                onSuccess={(response: any) => handleResponse(response)}
            />
            <h1
                style={{
                    color: 'rgb(22, 22, 22)',
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '52px',
                    fontWeight: '500'
                }}
            >
                Balance Network | Academy Blog Editor
            </h1>
            <FormControl
                sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '100px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '32px'
                        }}
                    >
                        <TextField
                            label="Article Title"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {''}
                                    </InputAdornment>
                                )
                            }}
                        ></TextField>{' '}
                        <TextField
                            label="Article Tags"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {''}
                                    </InputAdornment>
                                )
                            }}
                        ></TextField>
                        <span
                            style={{
                                fontSize: '12px',
                                marginBlockStart: '-32px',
                                fontWeight: 200,
                                color: '#b52634'
                            }}
                        >
                            Put a comma after each tag
                        </span>
                    </Box>
                    <Box>
                        <Input
                            type="file"
                            name="upload"
                            placeholder="Upload File"
                            onChange={() => console.log('ciguli')}
                        />
                    </Box>
                </Box>
                <CKEditor
                    editor={ClassicEditor}
                    // data={blogContent}
                    // onReady={(editor: any) => {
                    //     console.log(
                    //         'CKEditor5 React Component is ready to use!',
                    //         editor
                    //     );
                    // }}
                    onChange={(event: any, editor: any) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: 'white',
                            width: '300px',
                            color: 'black',
                            '&:hover': {
                                bgcolor: 'rgb(225, 225, 225)'
                            }
                        }}
                    >
                        Create Article
                    </Button>
                </Box>
            </FormControl>
        </Container>
    );
};

export default Create;
