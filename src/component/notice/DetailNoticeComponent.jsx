import React, { Component } from 'react';
import ApiService from "../../ApiService";
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import TextField from '@material-ui/core/TextField';

const styles = () => ({
    boardTopBackground: {
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '12rem',
        position: 'absolute'
    },
    boardTop: {
        height: '12em',
        width: '100%',
        position: 'relative',
    },
    boardTopText: {
        zIndex: 2,
        position: 'absolute',
        bottom: '3rem',
        left: '3rem',
        fontSize: "2rem",
        fontWeight: 'bold',
        color: 'white',
    },
})

class DetailNoticeComponent extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            notice_no: this.props.match.params.no,
            notice_type: '',
            notice_title: '',
            notice_contents: '',
            notice_admin: '',
            notice_comments: [],
            input_comment: '',
            message:'',
        }
    }

    componentDidMount() {
        this.reloadNotice();
    }

    reloadNotice = () => {
        ApiService.fetchNoticeByNo(this.state.notice_no)
            .then( res => {
                this.setState({
                    notice_type: res.data.notice.notice_type,
                    notice_title: res.data.notice.notice_title,
                    notice_contents: res.data.notice.notice_contents,
                    notice_admin: res.data.notice.notice_admin,
                })
            })
            .catch(err => {
                console.log('reloadNotice() Error!', err);
            })
        ApiService.fetchNC(this.state.notice_no)
            .then( res => {
                this.setState({
                    notice_comments: res.data.list
                })
            })
            .catch(err => {
                console.log('reloadNoticeList() Error!', err);
            })
    }

    deleteNC = (comNo) => {
        ApiService.deleteNC(comNo)
            .then( res => {
                this.setState({
                    notice_comments: this.state.notice_comments.filter( comment =>
                        comment.com_no !== comNo)
                });
            })
            .catch(err => {
                console.log('deleteNC() Error!', err);
            })
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value, // <- 변경 후
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        let noticeComment = {
            com_notice:this.state.notice_no,
            com_contents:this.state.input_comment,
            com_mem:{
                member_no:2,
            },
        }

        ApiService.addNC(noticeComment)
            .then( res => {
                this.setState({
                    message: 'addNC Completed'
                })
                console.log(this.state.message);
            })
            .catch( err => {
                console.log('addNC() 에러', err);
            });
        
        this.reloadNotice();

        this.setState({
            input_comment: ''
        })
    }

    render(){
        return(
            <div>
                <form>
                    <h2 align="center">Notice Detail</h2>
                    <fieldset>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">번호</TableCell>
                                    <TableCell align="center">종류</TableCell>
                                    <TableCell align="center">제목</TableCell>
                                    <TableCell align="center">내용</TableCell>
                                    <TableCell align="center">작성자</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={this.state.notice_no}>
                                    <TableCell align="center">{this.state.notice_no}</TableCell>
                                    <TableCell align="center">{this.state.notice_type}</TableCell>
                                    <TableCell align="center">{this.state.notice_title}</TableCell>
                                    <TableCell align="center">{this.state.notice_contents}</TableCell>
                                    <TableCell align="center">{this.state.notice_admin}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </fieldset>
                </form>
                <Link to="/">
                    <Button className="lunchBox-btn-rec-line" variant="contained" color="primary">
                        Back
                    </Button>
                </Link>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        required 
                        placeholder='댓글을 입력하세요' 
                        name='input_comment' 
                        value={this.state.input_comment}
                        onChange={this.handleChange}
                    ></TextField>
                    <Button type="submit" variant="contained" color="primary">입력</Button>
                </form>
                
                <form>
                    <h2 align="center">Notice Comment</h2>
                    <fieldset>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">작성자</TableCell>
                                    <TableCell align="center">내용</TableCell>
                                    <TableCell align="center">작성일</TableCell>
                                    <TableCell align="center">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.notice_comments.map( comment => 
                                    <TableRow key={comment.com_no}>
                                        <TableCell align="center">{comment.com_mem.member_nickName}</TableCell>
                                        <TableCell align="center">{comment.com_contents}</TableCell>
                                        <TableCell align="center">{comment.com_date}</TableCell>
                                        
                                        <TableCell align="center" onClick={()=> this.deleteNC(comment.com_no)}>
                                            <DeleteIcon />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </fieldset>
                </form>
            </div>  
        )
      }
}

export default withStyles(styles)(DetailNoticeComponent);