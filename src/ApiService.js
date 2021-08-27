import axios from 'axios';

const NOTICE_URL = "http://localhost:9999/back/notice";
const NC_URL = "http://localhost:9999/back/noticecomment";

class ApiService {
    fetchNotices() {
        return axios.get(NOTICE_URL + '/list');
    }

    fetchNoticeByNo(notice_no) {
        return axios.get(NOTICE_URL + '/' + notice_no);
    }
  
    addNotice(notice){
        console.log(notice);
        return axios.post(NOTICE_URL, notice);
    }

    editNotice(notice){
        return axios.put(NOTICE_URL + '/' + notice.notice_no, notice)
    }

    deleteNotice(notice_no){
        return axios.delete(NOTICE_URL + '/' + notice_no);
    }

    // Notice Comment
    // http://localhost:9999/back/noticecomment/list/공지사항번호
    fetchNC(notice_no){
        return axios.get(NC_URL + '/list/' + notice_no);
    }

    // http://localhost:9999/back/noticecomment/댓글번호
    fetchNCOne(com_no){
        return axios.get(NC_URL + '/one/' + com_no);
    }

    // http://localhost:9999/back/noticecomment
    addNC(noticeComment){
        console.log(noticeComment);
        return axios.post(NC_URL, noticeComment);
    }

    editNC(noticeComment){
        return axios.put(NC_URL + '/' + noticeComment.com_no, noticeComment);
    }

    deleteNC(com_no){
        return axios.delete(NC_URL + '/' + com_no);
    }
}

export default new ApiService();