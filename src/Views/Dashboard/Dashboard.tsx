import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid, Input, colors } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Articles from '../../Api/Articles';
import { useAppSelector } from '../../Store/hooks';
import styles from './dashboard.module.css';

export default function Dashboard() {
    const articleList: any = useAppSelector(
        (state) => (state.articlesReducer as any).list?.result
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        setBlogData(articleList);
    }, [articleList]);

    const handleChange = (event: any) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        const filteredTitles = articleList?.filter((article: any) =>
            article.title.toLowerCase().includes(newSearchTerm.toLowerCase())
        );
        setBlogData(filteredTitles);
    };

    useEffect(() => {
        setArticlesRequest({
            mode: 'articleList',
            payload: {}
        });
    }, []);

    const handleResponse = (response: any) => {
        // console.log('Response:', response);
    };

    const [articlesRequest, setArticlesRequest] = useState<any>({
        mode: 'articleList',
        payload: {}
    });

    function shortenText(text: any, maxLength: any) {
        if (text.length > maxLength) {
            return text.slice(0, maxLength - 3) + '...';
        } else {
            return text;
        }
    }

    return (
        <div className={styles.container}>
            <Articles
                params={articlesRequest}
                onSuccess={(response: any) => handleResponse(response)}
            />
            <h1 className={styles.academy_title}>Academy Blog</h1>
            <div className={styles.search_input}>
                <Input
                    type="text"
                    name="title"
                    value={searchTerm}
                    // ref={inputRef}
                    placeholder="Search name"
                    onChange={handleChange}
                    sx={{
                        width: '400px'
                    }}
                />
            </div>

            <Grid container spacing={4} className={styles.articles_container}>
                {blogData?.length === 0 ? (
                    <div className={styles.not_found}>Not Found</div>
                ) : (
                    blogData?.map((article: any) => (
                        <Grid item xs={4} key={article.id}>
                            <Link
                                to={`/edit?id=${article.id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <Card className={styles.article_card}>
                                    <CardMedia
                                        component="img"
                                        className={styles.card_media}
                                        image={article.imageUrl}
                                        title="photo"
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                            className={styles.article_title}
                                        >
                                            {shortenText(article.title, 25)}
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            color="text.secondary"
                                            className={styles.article_body}
                                            dangerouslySetInnerHTML={{
                                                __html: article.body
                                            }}
                                        ></Typography>
                                    </CardContent>
                                    <Box className={styles.edit_button}>
                                        <Button
                                            size="medium"
                                            variant="outlined"
                                            className={styles.button}
                                        >
                                            Edit Article
                                        </Button>
                                    </Box>
                                </Card>
                            </Link>
                        </Grid>
                    ))
                )}
            </Grid>
        </div>
    );
}
