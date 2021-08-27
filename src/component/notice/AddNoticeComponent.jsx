import React, { Component } from 'react';
import ApiService from "../../ApiService";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AddNoticeComponent extends Component{

  constructor(props){
    super(props);

    this.state = {
      notice_type: '',
      notice_title: '',
      notice_contents: '',
      notice_admin: '',
      message: null
    }

  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  saveNotice = (e) => {
    e.preventDefault();

    let notice = {
      notice_type: this.state.notice_type,
      notice_title: this.state.notice_title,
      notice_contents: this.state.notice_contents,
      notice_admin: 'ad3', // Session으로 변경 필요
    }

    ApiService.addNotice(notice)
    .then( res => {
        this.setState({
          message: 'addNotice Completed'
        })
        console.log(this.state.message);
        this.props.history.push('/');
    })
    .catch( err => {
      console.log('saveNotice() 에러', err);
    });

  }

  render(){
    return(
      <div>
        <Typography variant="h4" style={style}>Add Notice</Typography>
        <form style={formContainer}>

          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="demo-simple-select-outlined-label">공지사항 분류</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.notice_type}
              onChange={this.onChange}
              label="Age"
              name="notice_type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'공지사항'}>공지사항</MenuItem>
              <MenuItem value={'이벤트'}>이벤트</MenuItem>
              <MenuItem value={'업데이트'}>업데이트</MenuItem>
              <MenuItem value={'점검'}>점검</MenuItem>
            </Select>
          </FormControl>
          <TextField type="text" placeholder="please input type" name="notice_type" 
          fullWidth margin="normal" value={this.state.notice_type} onChange={this.onChange} />

          <TextField type="text" placeholder="please input title" name="notice_title" 
          fullWidth margin="normal" value={this.state.notice_title} onChange={this.onChange} />

          <TextField type="text" placeholder="please input contents" name="notice_contents" 
          fullWidth margin="normal" value={this.state.notice_contents} onChange={this.onChange} />
          
          <Button variant="contained" color="primary" onClick={this.saveNotice}>Save</Button>

        </form>
      </div>
    );
  }
}

const formContainer = {
  display : 'flex',
  flexFlow : 'row wrap'
}

const style = {
  display : 'flex',
  justifyContent : 'center'
}

export default AddNoticeComponent;