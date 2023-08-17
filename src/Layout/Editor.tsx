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
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function Editor({ id }: { id: any }) {
    const content = Articless.find((article: any) => article.id === +id);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const invalidForm = {
        title: content?.title,
        tags: [content?.tags],
        description: content?.description,
        image: ''
    };

    const [form, setForm] = useState<any>(invalidForm);
    const blogContent = `<p>${content?.description}</p>`;
    function inputsOnChange(params: any, e: any) {
        const value = e?.target?.value;
        if (params === 'title') {
            setForm((current: any) => {
                return {
                    ...current,
                    title: value
                };
            });
        }
        if (params === 'tags') {
            setForm((current: any) => {
                return {
                    ...current,
                    tags: value.split(',').map((v: any) => v.trim())
                };
            });
        }
        if (params === 'description') {
            setForm((current: any) => {
                const value = e;
                return {
                    ...current,
                    description: value
                };
            });
        }
        if (params === 'image') {
            console.log('value', value);
            setForm((current: any) => {
                return {
                    ...current,
                    image: value
                };
            });
            console.log(form.image);
        }
    }

    return (
        <Container>
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
                        <Button onClick={handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
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
                            gap: '32px',
                            width: '300px'
                        }}
                    >
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
                            value={form.tags}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {''}
                                    </InputAdornment>
                                )
                            }}
                            onChange={(e) => inputsOnChange('tags', e)}
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
                        <label htmlFor="upload">
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
                            <span
                                style={{
                                    display: 'flex',
                                    flex: 1,
                                    border: '1px solid red',
                                    padding: '0.5rem 1.5rem',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {!form?.image
                                    ? content?.image.split('/').pop()
                                    : form?.image.split('\\').pop()}
                            </span>
                        </label>
                    </Box>
                    <Box>
                        <img
                            src={
                                !form?.image
                                    ? content?.image
                                    : form?.image.split('\\').pop()
                            }
                            alt="article"
                            height={280}
                            width={280}
                        />
                    </Box>
                </Box>
                <CKEditor
                    editor={ClassicEditor}
                    data={blogContent}
                    // onReady={(editor: any) => {
                    //     console.log(
                    //         'CKEditor5 React Component is ready to use!',
                    //         editor
                    //     );
                    // }}
                    onChange={(event: any, editor: any) => {
                        const data = editor.getData();
                        // console.log({ event, editor, data });
                        inputsOnChange('description', data);
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
                        onClick={() => handleClickOpen()}
                    >
                        Edit Article
                    </Button>
                </Box>
            </FormControl>
        </Container>
    );
}
