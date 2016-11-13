import moment from 'moment';

class UserUtils {
  isAuthenticated(userData) {
    if (!userData) {
      return false;
    }
    const now = moment();
    const isExpired = userData.get('expires') && now.isBefore(moment(userData.get('expires')));

    return userData.get('login') && !isExpired;
  }
}


export default new UserUtils();
