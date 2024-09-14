import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  mockAtlassianCloudAccount,
  mockSettings,
} from '../__mocks__/state-mocks';
import { ensureStableEmojis, mockDirectoryPath } from '../__mocks__/utils';
import { AppContext } from '../context/App';
import { GroupBy } from '../types';
import { mockAtlasifyNotification } from '../utils/api/__mocks__/response-mocks';
import * as links from '../utils/links';
import { AccountNotifications } from './AccountNotifications';

jest.mock('./ProductNotifications', () => ({
  ProductNotifications: () => <div>Product Notifications</div>,
}));

describe('components/AccountNotifications.tsx', () => {
  beforeEach(() => {
    ensureStableEmojis();
    mockDirectoryPath();
  });

  it('should render itself - group notifications by products', () => {
    const props = {
      account: mockAtlassianCloudAccount,
      notifications: mockAtlasifyNotification,
      error: null,
    };

    const tree = render(
      <AppContext.Provider
        value={{ settings: { ...mockSettings, groupBy: GroupBy.PRODUCT } }}
      >
        <AccountNotifications {...props} />
      </AppContext.Provider>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render itself - group notifications by date', () => {
    const props = {
      account: mockAtlassianCloudAccount,
      notifications: mockAtlasifyNotification,
      error: null,
    };

    const tree = render(
      <AppContext.Provider
        value={{ settings: { ...mockSettings, groupBy: GroupBy.DATE } }}
      >
        <AccountNotifications {...props} />
      </AppContext.Provider>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render itself - no notifications', () => {
    const props = {
      account: mockAtlassianCloudAccount,
      notifications: [],
      error: null,
    };

    const tree = render(
      <AppContext.Provider value={{ settings: mockSettings }}>
        <AccountNotifications {...props} />
      </AppContext.Provider>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render itself - account error', () => {
    const props = {
      account: mockAtlassianCloudAccount,
      notifications: [],
      error: {
        title: 'Error title',
        descriptions: ['Error description'],
        emojis: ['🔥'],
      },
    };

    const tree = render(
      <AppContext.Provider value={{ settings: mockSettings }}>
        <AccountNotifications {...props} />
      </AppContext.Provider>,
    );
    expect(tree).toMatchSnapshot();
  });

  it.skip('should open profile when clicked', async () => {
    const openAccountProfileMock = jest
      .spyOn(links, 'openAccountProfile')
      .mockImplementation();

    const props = {
      account: mockAtlassianCloudAccount,
      notifications: [],
      error: null,
    };

    await act(async () => {
      render(
        <AppContext.Provider value={{ settings: mockSettings }}>
          <AccountNotifications {...props} />
        </AppContext.Provider>,
      );
    });

    fireEvent.click(screen.getByTitle('Open Profile'));

    expect(openAccountProfileMock).toHaveBeenCalledTimes(1);
    expect(openAccountProfileMock).toHaveBeenCalledWith(
      mockAtlassianCloudAccount,
    );
  });

  it.skip('should toggle account notifications visibility', async () => {
    const props = {
      account: mockAtlassianCloudAccount,
      notifications: mockAtlasifyNotification,
      error: null,
    };

    await act(async () => {
      render(
        <AppContext.Provider value={{ settings: mockSettings }}>
          <AccountNotifications {...props} />
        </AppContext.Provider>,
      );
    });

    fireEvent.click(screen.getByTitle('Hide account notifications'));

    const tree = render(
      <AppContext.Provider value={{ settings: mockSettings }}>
        <AccountNotifications {...props} />
      </AppContext.Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
