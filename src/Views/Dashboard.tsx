import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid, Input } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Articles from '../Api/Articles';
import { Articless } from '../Config/article.config';
import { useAppSelector } from '../Store/hooks';

export default function Dashboard() {
    const articleList: any = useAppSelector(
        (state) => (state.articlesReducer as any).list?.result
    );
    console.log(articleList, 'articleList');

    const [searchTerm, setSearchTerm] = useState('');
    const [blogData, setBlogData] = useState(articleList);

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

    return (
        <Container>
            <Articles
                params={articlesRequest}
                onSuccess={(response: any) => handleResponse(response)}
            />
            <div className="container">
                <h1
                    style={{
                        color: 'rgb(22, 22, 22)',
                        width: '100%',
                        textAlign: 'center',
                        fontSize: '52px',
                        fontWeight: '500'
                    }}
                >
                    Academy Blog
                </h1>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '28px'
                }}
            >
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

            <Grid container spacing={4}>
                {blogData?.map((article: any) => (
                    <Grid item xs={4} key={article.id}>
                        <Card sx={{ maxWidth: 345, padding: '24px' }}>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: 240,
                                    objectFit: 'contain',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                image="./academy.svg"
                                title="photo"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {article.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 5,
                                        padding: 0,
                                        margin: 0,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    {ReactHtmlParser(article.description)}
                                </Typography>
                            </CardContent>
                            <Link to={`/edit?id=${article.id}`}>
                                <Button size="small">Edit Article</Button>
                            </Link>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
