import {
  ISessionFromLocalStorage,
  Session,
} from '../modules/auth/models/session.model';

export const getSessionFromLS = () => {
  const rawSessionFromLocalStorage = localStorage.getItem('currentSession');
  if (rawSessionFromLocalStorage !== null) {
    const sessionFromLocalStorage: ISessionFromLocalStorage = JSON.parse(
      rawSessionFromLocalStorage
    );
    return new Session(
      sessionFromLocalStorage.id,
      sessionFromLocalStorage.token,
    );
  }
  return null;
};
