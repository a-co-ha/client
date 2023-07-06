import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MainCalendar } from '@/components/project-main/Calendar';
import { renderWithQueryClient } from '../test-utils';
import { faker } from '@faker-js/faker';

import '@testing-library/user-event';
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: { channelId: 1, pageId: 'pageId', type: 'type' },
  }),
}));

beforeAll(() => {
  renderWithQueryClient(<MainCalendar />);
});
afterEach(() => {
  jest.clearAllMocks();
});
describe(`<Calendar />`, () => {
  it(`캘린더의 날짜를 클릭하기 전에는 일정 추가 버튼은 비활성 상태이다`, () => {
    const addBtn = screen.getByRole('button', { name: '일정 추가' });
    expect(addBtn).not.toBeEnabled();
  });
  it(`캘린더의 날짜를 클릭하면 일정 추가 버튼은 활성화 상태로 바뀌고 내용은 '닫기'로 바뀐다`, async () => {
    // const container = await screen.findByRole(`button`);
    // userEvent.click(container);
    // const addBtn = screen.getByRole('button', { name: '닫기' });
    // expect(addBtn).toBeInTheDocument();
    // userEvent.click(date);
  });
});
