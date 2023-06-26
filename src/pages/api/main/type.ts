export interface CalendarScheduleResponse {
  id: number;
  channelId: number;
  date: string;
  content: string;
  userId: number;
  userName: string;
}

export interface AddSchedule {
  addSchedule: string;
}
