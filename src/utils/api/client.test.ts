import axios from 'axios';
import {
  mockAtlassianCloudAccount,
  mockSettings,
} from '../../__mocks__/state-mocks';
import {
  checkIfCredentialsAreValid,
  getAuthenticatedUser,
  getNotificationsForUser,
  markNotificationsAsRead,
  markNotificationsAsUnread,
} from './client';

jest.mock('axios');

const mockNotificationID = '1234';

// TODO - Improve assertions of data request object sent
describe('utils/api/client.ts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('checkIfCredentialsAreValid', () => {
    it('should validate credentials', async () => {
      await checkIfCredentialsAreValid(
        mockAtlassianCloudAccount.user.login,
        mockAtlassianCloudAccount.token,
      );

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://team.atlassian.net/gateway/api/graphql',
          method: 'HEAD',
        }),
      );

      expect(axios.defaults.headers.common).toMatchSnapshot();
    });
  });

  describe('getAuthenticatedUser', () => {
    it('should fetch authenticated user details', async () => {
      await getAuthenticatedUser(mockAtlassianCloudAccount);

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://team.atlassian.net/gateway/api/graphql',
          method: 'POST',
        }),
      );

      expect(axios.defaults.headers.common).toMatchSnapshot();
    });
  });

  describe('listNotificationsForAuthenticatedUser', () => {
    it('should list notifications for user', async () => {
      await getNotificationsForUser(mockAtlassianCloudAccount, mockSettings);

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://team.atlassian.net/gateway/api/graphql',
          method: 'POST',
        }),
      );

      expect(axios.defaults.headers.common).toMatchSnapshot();
    });
  });

  describe('markNotificationsAsRead', () => {
    it('should mark notifications as read', async () => {
      await markNotificationsAsRead(mockAtlassianCloudAccount, [
        mockNotificationID,
      ]);

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://team.atlassian.net/gateway/api/graphql',
          method: 'POST',
        }),
      );

      expect(axios.defaults.headers.common).toMatchSnapshot();
    });
  });

  describe('markNotificationsAsUnread', () => {
    it('should mark repository notifications as read - github', async () => {
      await markNotificationsAsUnread(mockAtlassianCloudAccount, [
        mockNotificationID,
      ]);

      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://team.atlassian.net/gateway/api/graphql',
          method: 'POST',
        }),
      );

      expect(axios.defaults.headers.common).toMatchSnapshot();
    });
  });
});
