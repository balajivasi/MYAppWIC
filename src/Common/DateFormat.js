import Moment from 'moment';

export const formatDate = (dateString) => {
    const date = Moment(dateString, 'M/D/YYYY hh:mm:ss A');
    if (!date.isValid()) {
        return ''; // Return empty string for invalid date
    }
    return date.format('M/D/YYYY');
};

export const formatTime = (dateString) => {
    const date = Moment(dateString, 'M/D/YYYY hh:mm:ss A');
    if (!date.isValid()) {
      return ''; // Return empty string for invalid date
    }
    return date.format('hh:mm A');
  };