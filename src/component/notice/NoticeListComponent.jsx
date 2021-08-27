import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiService from "../../ApiService";

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'

import '../../css/bootstrap.css'

class NoticeListComponent extends Component {

    /*
        Constructor
        - 생성자 메소드로 컴포넌트가 처음 생성 시 실행
        - 이 메소드에서 기본 state를 설정 가능

        state
    */
    constructor(props){
        super(props);

        this.state = {
            notices : [],
            message : null 
        }
    }

    /*
        componentDidMount
        - 컴포넌트가 만들어지고 첫 렌더링을 완료 후 실행되는 메소드
        - 이 메소드 내에서 다른 JS 프레임워크를 연동하거나 setTimeout, setInterval 및 AJAX 처리 등을 삽입
    */

    componentDidMount() {
        this.reloadNoticeList();
    }

    reloadNoticeList = () => {
        ApiService.fetchNotices()
            .then( res => {
                this.setState({
                  notices: res.data.notices
                })
            })
            .catch(err => {
                console.log('reloadNoticeList() Error!', err);
            })
    }

    addNotice = () => {
      window.localStorage.removeItem("noticeNo");
      this.props.history.push('/add-notice');
    }

    /*
        Edit 버튼을 누르면 브라우저 로컬스토리지를 사용하여 해당 유저 id를 일시적으로 저장
        route를 통해 EditUserComponent.jsx로 이동
        route에서 "/edit-user" url로 이동 시 EditUserComponent.jsx를 출력하도록 설정
    */

    editNotice = (noticeNo) => {
        window.localStorage.setItem("noticeNo", noticeNo);
        this.props.history.push('/edit-notice');
    }

    /*
        Delete 버튼을 누르면 API 통신을 사용하여 DB에서 해당 유저를 삭제
        filter 기능을 통해 state에 있는 users 배열에서 삭제된 해당 유저 id를 제외하고 다시 배열로 표현
    */
    deleteNotice = (noticeNo) => {
        ApiService.deleteNotice(noticeNo)
          .then( res => {
            this.setState({
              message: 'Notice Deleted Successfully.'
            });
            this.setState({
              notices: this.state.notices.filter( notice =>
                notice.notice_no !== noticeNo)
              });
            })
          .catch(err => {
            console.log('deleteNotice() Error!', err);
        })
    }
    render(){
      return(
        <div>
          <Typography variant="h4" style={style}>공지사항</Typography>
          <Button variant="contained" color="primary" onClick={this.addNotice}> Add Notice </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>게시글 번호</TableCell>
                <TableCell>게시글 종류</TableCell>
                <TableCell align="center">제목</TableCell>
                <TableCell align="center">작성일</TableCell>
                <TableCell align="center">조회수</TableCell>
                <TableCell align="center">작성자</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.notices.map( notice => 
                <TableRow key={notice.notice_no}>
                  <TableCell component="th" scope="notice">{notice.notice_no}</TableCell>
                  <TableCell align="center">{notice.notice_type}</TableCell>
                  <TableCell align="center">
                    <Link to={`/notices/${notice.notice_no}`}>{ notice.notice_title }</Link>
                  </TableCell>
                  <TableCell align="center">{notice.notice_date}</TableCell>
                  <TableCell align="center">{notice.notice_views}</TableCell>
                  <TableCell align="center">{notice.notice_admin}</TableCell>
                  <TableCell align="center" onClick={()=> this.editNotice(notice.notice_no)}>
                    <CreateIcon />
                  </TableCell>
                  <TableCell align="center" onClick={()=> this.deleteNotice(notice.notice_no)}>
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
        </div>
      )
    }
}

const style = {
  display: 'flex',
  justifyContent: 'center'
}

export default NoticeListComponent;