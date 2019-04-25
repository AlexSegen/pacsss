import moment from 'moment';

export default {
    formatDate(val) {
        return moment(val).format('MMMM Do YYYY, h:mm:ss a')
    }
}
