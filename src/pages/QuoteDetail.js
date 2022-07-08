import React, { useEffect } from 'react';
import { Route, useParams, Link, useRouteMatch } from 'react-router-dom';

import Comments from '../components/comments/Comments';
import HighLightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';


const QuoteDetail = () => {
    const match = useRouteMatch();
    const param = useParams();

    const { quoteId } = param;

    const { sendRequest, status, data :loadedQuotes, error} = useHttp(getSingleQuote, true);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if(status === 'pending') {
        return <div className='centered'>
            <LoadingSpinner />
        </div>
    };
     
    if(error) {
        return <p className='centered focused'>{error}</p>
    };


    if (!loadedQuotes.text) {
        return <p>No Quote Found!</p>
    };

    return (
        <React.Fragment>
            <HighLightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />
            <Route path={match.path} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comment`}>
                        Load Comments
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comment`}>
                <Comments />
            </Route>
        </React.Fragment>
    );
};

export default QuoteDetail;