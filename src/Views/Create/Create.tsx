import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Input, useMediaQuery, useTheme } from '@mui/material';
import { Articless } from '../../Config/article.config';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Articles from '../../Api/Articles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import styles from '../Editor/editor.module.css';

const Create = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [imageUrl, setImageUrl] = useState<any>();

    const [articlesRequest, setArticlesRequest] = useState<any>({
        mode: 'createArticle',
        payload: {}
    });

    const [form, setForm] = useState<any>({
        title: '',
        body: '',
        categories: [],
        image: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function inputsOnChange(params?: any, e?: any) {
        const value = e?.target;
        if (params === 'image') {
            const file = value.files[0];
            setImageUrl(file.name);
            if (file.name !== '') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target !== null) {
                        const base64String: any = event.target.result;
                        setForm((current: any) => ({
                            ...current,
                            image: base64String
                        }));
                    }
                };
                reader.readAsDataURL(file);
            }
        }
        if (params === 'title') {
            setForm((current: any) => ({
                ...current,
                title: value.value
            }));
        }
        if (params === 'categories') {
            setForm((current: any) => ({
                ...current,
                categories: value.value.split(',').map((v: any) => v.trim())
            }));
        }
        if (params === 'body') {
            setForm((current: any) => ({
                ...current,
                body: e
            }));
        }
    }

    const handleResponse = (response: any) => {
        // console.log('Response:', response);
    };

    const handleRequestItem = () => {
        setArticlesRequest({
            mode: 'createArticle',
            payload: form
        });
        setTimeout(() => {
            window.location.href = '/';
        }, 1500);
    };
    return (
        <Container>
            <Articles
                params={articlesRequest}
                onSuccess={(response: any) => handleResponse(response)}
            />
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {'Are you sure?'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You are about to make changes that will affect the
                            database and the main page with the changes you have
                            made.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Disagree
                        </Button>
                        <Button
                            onClick={() => {
                                handleRequestItem();
                                handleClose();
                            }}
                            autoFocus
                        >
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <h1 className={styles.editor_title}>
                Balance Network | Academy Blog Creator
            </h1>
            <FormControl className={styles.form_control}>
                <Box className={styles.little_form}>
                    <Box className={styles.input_form}>
                        <TextField
                            label="Article Title"
                            value={form.title}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {''}
                                    </InputAdornment>
                                )
                            }}
                            onChange={(e) => inputsOnChange('title', e)}
                        ></TextField>{' '}
                        <TextField
                            label="Article Tags"
                            // value={form.categories}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {''}
                                    </InputAdornment>
                                )
                            }}
                            onChange={(e) => inputsOnChange('categories', e)}
                        ></TextField>
                        <span className={styles.put_comma}>
                            Put a comma after each tag
                        </span>
                        <label htmlFor="upload" className={styles.upload_label}>
                            <div className={styles.button}>Upload File</div>
                            <Input
                                type="file"
                                name="upload"
                                id="upload"
                                placeholder="Upload File"
                                onChange={(e) => inputsOnChange('image', e)}
                                sx={{
                                    opacity: 0,
                                    visibility: 'hidden',
                                    width: 0,
                                    height: 0
                                }}
                                hidden
                            />
                            <Input
                                className={styles.image_link_input}
                                value={imageUrl}
                            />
                        </label>
                    </Box>
                    <Box className={styles.image_container}>
                        <img src={form?.image} alt="Uploaded Image" />
                    </Box>
                </Box>
                <CKEditor
                    editor={ClassicEditor}
                    // data={form?.body}
                    onChange={(event: any, editor: any) => {
                        const data = editor.getData();
                        inputsOnChange('body', data);
                    }}
                />
                <Box className={styles.button_handle}>
                    <Button
                        variant="contained"
                        className={styles.edit_button}
                        onClick={() => handleClickOpen()}
                        endIcon={<SendIcon />}
                        disabled={
                            form?.title === '' &&
                            !form?.categories &&
                            form?.body === '' &&
                            form?.image === ''
                                ? true
                                : false
                        }
                    >
                        Create Article
                    </Button>
                </Box>
            </FormControl>
        </Container>
    );
};

export default Create;
