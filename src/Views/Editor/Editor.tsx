import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Input } from '@mui/material';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useAppSelector } from '../../Store/hooks';
import Articles from '../../Api/Articles';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from 'react-router-dom';
import styles from './editor.module.css';

export default function Editor() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [imageUrl, setImageUrl] = useState<any>();
    const [form, setForm] = useState<any>({});
    const [buttonType, setButtonType] = useState<any>('');

    const handleResponse = (response: any) => {
        console.log('Response:', response);
    };

    const [articlesRequest, setArticlesRequest] = useState<any>({
        mode: '',
        payload: {}
    });

    useEffect(() => {
        setArticlesRequest({
            mode: 'articleList',
            payload: {}
        });
    }, []);

    const articleList: any[] = useAppSelector(
        (state) => (state.articlesReducer as any).list?.result
    );

    const content = Array.isArray(articleList)
        ? articleList?.find((article: any) => article.id === id)
        : 0;

    const handleClickOpen = (type: any) => {
        setButtonType(type);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setForm({
            id: content?.id,
            title: content?.title,
            categories: [content?.categories],
            body: content?.body,
            image: ''
        });
    }, [content]);

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

    const handleRequestItem = (type: any) => {
        if (type === 'edit') {
            setArticlesRequest({
                mode: 'editArticle',
                payload: form
            });
            window.location.href = '/';
        }
        if (type === 'delete') {
            setArticlesRequest({
                mode: 'deleteArticle',
                payload: form
            });
            window.location.href = '/';
        }
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
                                handleRequestItem(buttonType);
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
                Balance Network | Academy Blog Editor
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
                            value={form.categories}
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
                                value={
                                    form?.image ? imageUrl : content?.imageUrl
                                }
                            />
                        </label>
                    </Box>
                    <Box className={styles.image_container}>
                        {form?.image ? (
                            <img src={form?.image} alt="Uploaded Image" />
                        ) : (
                            <img src={content?.imageUrl} alt="Default Image" />
                        )}
                    </Box>
                </Box>
                <CKEditor
                    editor={ClassicEditor}
                    data={form?.body}
                    onChange={(event: any, editor: any) => {
                        const data = editor.getData();
                        inputsOnChange('body', data);
                    }}
                />
                <Box className={styles.button_handle}>
                    <Button
                        variant="contained"
                        className={styles.edit_button}
                        onClick={() => handleClickOpen('edit')}
                        endIcon={<SendIcon />}
                    >
                        Edit Article
                    </Button>
                    <Button
                        variant="contained"
                        className={styles.edit_button}
                        onClick={() => handleClickOpen('delete')}
                        endIcon={<DeleteIcon />}
                    >
                        Delete Article
                    </Button>
                </Box>
            </FormControl>
        </Container>
    );
}
