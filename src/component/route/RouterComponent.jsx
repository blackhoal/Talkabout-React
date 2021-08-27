import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NoticeListComponent from '../notice/NoticeListComponent';
import AddNoticeComponent from '../notice/AddNoticeComponent';
import EditNoticeComponent from '../notice/EditNoticeComponent';
import DetailNoticeComponent from '../notice/DetailNoticeComponent';

const AppRouter = () => {
    return (     
        <div style={style}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={NoticeListComponent} />
                    <Route exact path="/notices" component={DetailNoticeComponent} />
                    <Route exact path='/notices/:no' component={DetailNoticeComponent} />
                    <Route path="/add-notice" component={AddNoticeComponent} />
                    <Route path="/edit-notice" component={EditNoticeComponent} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

const style = {
    marginTop : '20px'
}

export default AppRouter;